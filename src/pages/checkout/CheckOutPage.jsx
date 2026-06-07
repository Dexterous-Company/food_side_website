// app/checkout/page.jsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { createOrder, clearOrderState } from "../../redux/Order/OrderSlice";
import {
  processCODOrder,
  clearPaymentState,
} from "../../redux/payment/paymentSlice";
import { selectCompleteDeliveryData } from "../../redux/delivery/deliverySlice";
import Toast from "../../UI/Toast";
import OrderOverview from "./OrderOverview";
import LoginPrompt from "./LoginPrompt";
import UserProfile from "./UserProfile";
import PaymentMethods from "./PaymentMethods";
import OrderSummary from "./OrderSummary";
import BillSummary from "./BillSummary";

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;
const RUPEE = "₹";

const formatRouteName = (routeName) => {
  if (!routeName) return "Selected route";
  return routeName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const CheckOutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartList, clearCart, hasItems, cartSummary } = useCart();
  const { isUserAuth, userData } = useSelector(
    (state) => state.Authentication || {},
  );
  const deliveryData = useSelector(selectCompleteDeliveryData);
  const { isLoading: orderLoading, error: orderError } = useSelector(
    (state) => state.order || {},
  );
  const { isLoading: paymentLoading, error: paymentError } = useSelector(
    (state) => state.payment || {},
  );

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [toastMessage, setToastMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const isLoading = orderLoading || paymentLoading || isProcessing;

  // Debug logging
  useEffect(() => {
    console.log("=== Checkout Debug Info ===");
    console.log("Cart List:", cartList);
    console.log("Has Items:", hasItems);
    console.log("Cart Summary:", cartSummary);
    console.log("User Auth:", isUserAuth);
    console.log("User Data:", userData);
    console.log("Delivery Data:", deliveryData);
    console.log(
      "Route Params from storage:",
      localStorage.getItem("deliverySelection"),
    );
  }, [cartList, hasItems, isUserAuth, userData, deliveryData]);

  // Get route params from Redux or localStorage
  const routeParams = useMemo(() => {
    if (deliveryData?.deliveryPoint?._id) return deliveryData;
    try {
      const saved = localStorage.getItem("deliverySelection");
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Loaded delivery selection from localStorage:", parsed);
        return parsed;
      }
    } catch (error) {
      console.error("Error parsing delivery selection:", error);
    }
    return {};
  }, [deliveryData]);

  // Format cart items with better validation
  const cartItems = useMemo(() => {
    if (!Array.isArray(cartList) || cartList.length === 0) {
      console.warn("Cart is empty or invalid");
      return [];
    }

    return cartList.map((item) => ({
      ...item,
      newPrice: item.newPrice || item.price || 0,
      oldPrice: item.oldPrice || item.mrp || item.price || 0,
      qty: item.qty || 1,
      productId: item.productId || item.id,
      restaurantId: item.restaurantId || item.restaurantMongoId,
    }));
  }, [cartList]);

  // Calculate totals
  const totals = useMemo(() => {
    if (!cartItems.length) {
      return {
        subtotal: 0,
        deliveryFee: 0,
        finalTotal: 0,
        remainingForFreeDelivery: FREE_DELIVERY_THRESHOLD,
        itemCount: 0,
      };
    }

    const subtotal = cartItems.reduce((sum, item) => {
      const price = Number(item?.newPrice) || Number(item?.price) || 0;
      const qty = Number(item?.qty) || 1;
      return sum + price * qty;
    }, 0);

    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const finalTotal = subtotal + deliveryFee;
    const remainingForFreeDelivery =
      subtotal >= FREE_DELIVERY_THRESHOLD
        ? 0
        : FREE_DELIVERY_THRESHOLD - subtotal;

    console.log("Totals calculated:", {
      subtotal,
      deliveryFee,
      finalTotal,
      itemCount: cartItems.length,
    });

    return {
      subtotal,
      deliveryFee,
      finalTotal,
      remainingForFreeDelivery,
      itemCount: cartItems.length,
    };
  }, [cartItems]);

  // Prepare order overview
  const orderOverview = useMemo(() => {
    return {
      pickupLocation:
        routeParams?.pickup?.location ||
        routeParams?.pickupLocation ||
        "Pickup location not selected",
      routeName:
        routeParams?.route?.name || routeParams?.routeName || "Selected route",
      deliveryPointName:
        routeParams?.deliveryPoint?.name ||
        routeParams?.deliveryPointName ||
        "Delivery point",
      deliveryPointAddress:
        routeParams?.deliveryPoint?.address?.fullAddress ||
        routeParams?.deliveryAddress ||
        "Delivery address not selected",
      dateLabel:
        routeParams?.journey?.formattedDate ||
        routeParams?.date ||
        new Date().toLocaleDateString(),
      timeLabel:
        routeParams?.journey?.formattedTime ||
        routeParams?.time ||
        new Date().toLocaleTimeString(),
      distanceKm:
        routeParams?.route?.distanceKm || routeParams?.distanceKm || 0,
      durationMinutes:
        routeParams?.route?.durationMinutes ||
        routeParams?.durationMinutes ||
        30,
    };
  }, [routeParams]);

  const showToast = (message, isError = false) => {
    setToastMessage({ message, isError });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Validate order before placing
  const validateOrder = useCallback(() => {
    const errors = [];

    // Check cart
    if (!cartItems.length) {
      errors.push("Please add items to your cart");
    }

    // Check delivery point
    const deliveryPointId =
      routeParams?.deliveryPoint?._id || routeParams?.deliveryPointId;
    if (!deliveryPointId) {
      errors.push("Please select a delivery point");
    }

    // Check route
    const routeId = routeParams?.route?._id || routeParams?.routeId;
    if (!routeId) {
      errors.push("Please select a delivery route");
    }

    // Check journey date/time
    const journeyDate =
      routeParams?.journey?.date ||
      routeParams?.selectedDate ||
      routeParams?.date;
    if (!journeyDate) {
      errors.push("Please select delivery date and time");
    }

    // Check restaurant info
    const activeCartItem = cartItems[0] || {};
    const restaurantId =
      activeCartItem?.restaurantId || activeCartItem?.restaurantMongoId;
    const RESTID = activeCartItem?.RESTID;

    if (!restaurantId) {
      errors.push("Restaurant details are missing for this order");
    }

    if (!RESTID) {
      errors.push("Restaurant business ID is missing");
    }

    // Check user auth
    if (!isUserAuth || (!userData?._id && !userData?.id)) {
      errors.push("Please login to place order");
    }

    // Check payment method
    if (selectedPayment === "online") {
      errors.push("Online payment will be available soon. Please select COD");
    }

    setValidationErrors(errors);

    if (errors.length > 0) {
      errors.forEach((error) => showToast(error, true));
      return false;
    }

    return true;
  }, [
    cartItems,
    routeParams,
    userData,
    selectedPayment,
    isUserAuth,
    showToast,
  ]);

  // Prepare order data for backend
  const prepareOrderData = useCallback(() => {
    const activeCartItem = cartItems[0] || {};
    const restaurantId =
      activeCartItem?.restaurantId || activeCartItem?.restaurantMongoId;
    const RESTID = activeCartItem?.RESTID;

    // Validate each item and prepare
    const items = cartItems.map((item, index) => {
      const price = Number(item?.newPrice) || Number(item?.price) || 0;
      const mrp = Number(item?.oldPrice) || Number(item?.mrp) || price;
      const quantity = Number(item?.qty) || 1;

      // Extract menuId properly
      let menuId = item?.productId || item?.id;
      if (menuId && menuId.includes("-")) {
        menuId = menuId.split("-").pop();
      }

      // Validate menuId format (MongoDB ObjectId)
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(menuId);
      if (!isValidObjectId) {
        console.warn(`Invalid menuId format for item ${index}:`, menuId);
      }

      return {
        menuId: menuId,
        name: item?.name || `Item ${index + 1}`,
        price: price,
        mrp: mrp,
        quantity: quantity,
        total: price * quantity,
        image: item?.image || null,
        isVeg: item?.isVeg === false ? false : true,
      };
    });

    // Get delivery IDs
    const deliveryPointId =
      routeParams?.deliveryPoint?._id || routeParams?.deliveryPointId;
    const routeId = routeParams?.route?._id || routeParams?.routeId;
    const journeyDate =
      routeParams?.journey?.date ||
      routeParams?.selectedDate ||
      routeParams?.date;
    const journeyTime =
      routeParams?.journey?.time ||
      routeParams?.selectedTime ||
      routeParams?.time;
    const formattedDate =
      routeParams?.journey?.formattedDate || routeParams?.date;
    const formattedTime =
      routeParams?.journey?.formattedTime || routeParams?.time;

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // FIX: Convert Date to ISO string for serialization
    const etaDate = new Date(
      Date.now() + (orderOverview.durationMinutes || 30) * 60000,
    );

    const orderData = {
      orderNumber,
      userId: userData?._id || userData?.id,
      userName: userData?.name || userData?.fullName || "Guest",
      userPhone: userData?.phone || userData?.mobile || "",
      userEmail: userData?.email || "",
      deliveryPointId: deliveryPointId,
      routeId: routeId,
      journey: {
        date: journeyDate,
        formattedDate: formattedDate || new Date().toLocaleDateString(),
        time: journeyTime,
        formattedTime: formattedTime || new Date().toLocaleTimeString(),
      },
      RESTID: RESTID,
      restaurantId: restaurantId,
      items: items,
      totalAmount: totals.finalTotal,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      paymentMethod: selectedPayment,
      paymentStatus: "pending",
      status: "placed",
      tracking: [
        {
          status: "placed",
          message: "Order has been placed successfully",
          updatedBy: "system",
          createdAt: new Date().toISOString(),
        },
      ],
      eta: etaDate.toISOString(),
    };

    console.log(
      "Prepared order data (serializable):",
      JSON.stringify(orderData, null, 2),
    );
    return orderData;
  }, [
    cartItems,
    routeParams,
    userData,
    totals,
    selectedPayment,
    orderOverview.durationMinutes,
  ]);

  // Handle place order
  const handlePlaceOrder = async () => {
    console.log("=== Placing Order ===");

    // Validate first
    if (!validateOrder()) {
      console.log("Validation failed:", validationErrors);
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = prepareOrderData();

      // Additional validation for required fields
      if (!orderData.userId) {
        throw new Error("User ID is missing. Please login again.");
      }

      if (!orderData.deliveryPointId) {
        throw new Error(
          "Delivery point is missing. Please select a delivery location.",
        );
      }

      if (!orderData.routeId) {
        throw new Error("Route is missing. Please select a delivery route.");
      }

      if (!orderData.RESTID) {
        throw new Error("Restaurant business ID is missing.");
      }

      if (!orderData.restaurantId) {
        throw new Error("Restaurant ID is missing.");
      }

      if (!orderData.items || orderData.items.length === 0) {
        throw new Error("No items in order.");
      }

      console.log("Creating order with data:", orderData);

      // Create order via Redux
      const createdOrder = await dispatch(createOrder(orderData)).unwrap();
      console.log("Order creation result:", createdOrder);

      if (createdOrder?._id) {
        console.log("Order created successfully, navigating to success page");

        // Process COD payment if selected
        if (selectedPayment === "cod") {
          await dispatch(
            processCODOrder({
              orderId: createdOrder._id,
              orderNumber: createdOrder.orderNumber,
            }),
          ).unwrap();
          console.log("COD payment processed successfully");
        }

        // Clear cart
        await clearCart();
        console.log("Cart cleared");

        // Clear delivery data from localStorage
        localStorage.removeItem("deliverySelection");
        sessionStorage.removeItem("deliverySelection");

        // Store order data in sessionStorage to pass to success page
        const successData = {
          orderNumber: createdOrder.orderNumber,
          orderId: createdOrder._id,
          paymentMethod: selectedPayment,
          paymentStatus: "pending",
          amount: totals.finalTotal,
          orderOverview: orderOverview,
          cartItems: cartItems,
          orderData: createdOrder,
        };

        sessionStorage.setItem("lastOrder", JSON.stringify(successData));

        showToast(
          `Order placed successfully! Order ID: ${createdOrder.orderNumber}`,
        );
        localStorage.setItem("currentOrder", JSON.stringify(orderData));
        router.push("/order_success");
        // Navigate to order success page
        // router.push(`/order_success?orderId=${createdOrder._id}&orderNumber=${createdOrder.orderNumber}`);
        return;
      }

      throw new Error("Order was created, but no order ID was returned.");
    } catch (error) {
      console.error("Order placement error details:", error);

      let errorMessage = "Unable to place order. Please try again.";

      if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error) {
        errorMessage = error.error;
      } else if (orderError) {
        errorMessage = orderError;
      } else if (paymentError) {
        errorMessage = paymentError;
      }

      // Specific error handling
      if (errorMessage.includes("validation failed")) {
        errorMessage =
          "Order validation failed. Please check all details and try again.";
      }

      if (errorMessage.includes("mrp") || errorMessage.includes("price")) {
        errorMessage =
          "Pricing information is missing. Please try adding items to cart again.";
      }

      if (errorMessage.includes("restaurant")) {
        errorMessage = "Restaurant information is missing. Please try again.";
      }

      showToast(errorMessage, true);

      // Navigate to failed page instead of showing inline
      router.push(`/order_failed?error=${encodeURIComponent(errorMessage)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Show empty cart message
  if (!cartItems.length && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some delicious items to your cart to place an order
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
            toastMessage.isError ? "bg-red-500" : "bg-green-500"
          } text-white animate-slide-in`}
        >
          <span>{toastMessage.isError ? "❌" : "✓"}</span>
          <span className="text-sm">{toastMessage.message}</span>
        </div>
      )}

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-8 pt-6 pb-4">
          <OrderOverview
            isDesktop={true}
            orderOverview={orderOverview}
            totals={totals}
            formatRouteName={formatRouteName}
            RUPEE={RUPEE}
          />
        </div>

        <div className="flex max-w-[1400px] mx-auto gap-6 pb-12">
          <div className="w-[58%] bg-white rounded-2xl shadow-sm p-6">
            {!isUserAuth ? (
              <LoginPrompt
                isDesktop={true}
                isUserAuth={isUserAuth}
                userData={userData}
                onLogin={() => router.push("/login")}
              />
            ) : (
              <>
                <UserProfile isDesktop={true} userData={userData} />

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>STEP 2 •</span>
                    <span className="text-gray-500 font-normal">
                      Payment Method
                    </span>
                  </h2>
                  <PaymentMethods
                    selectedPayment={selectedPayment}
                    onSelectPayment={setSelectedPayment}
                    isEnabled={true}
                  />
                </div>
              </>
            )}
          </div>

          <div className="w-[38%] lg:sticky lg:top-24">
            <OrderSummary
              cartItems={cartItems}
              subtotal={totals.subtotal}
              deliveryFee={totals.deliveryFee}
              total={totals.finalTotal}
              isContactSubmitted={true}
              isProcessing={isLoading}
              onPlaceOrder={handlePlaceOrder}
              RUPEE={RUPEE}
            />
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden max-w-md mx-auto bg-white min-h-screen">
        <div className="px-5 pt-6 pb-2">
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
        </div>
        <div className="px-5 pb-8">
          <OrderOverview
            isDesktop={false}
            orderOverview={orderOverview}
            totals={totals}
            formatRouteName={formatRouteName}
            RUPEE={RUPEE}
          />

          {!isUserAuth ? (
            <LoginPrompt
              isDesktop={false}
              isUserAuth={isUserAuth}
              userData={userData}
              onLogin={() => router.push("/login")}
            />
          ) : (
            <>
              <UserProfile isDesktop={false} userData={userData} />

              <div className="mt-6">
                <BillSummary
                  totals={totals}
                  selectedPayment={selectedPayment}
                  onSelectPayment={setSelectedPayment}
                  isContactSubmitted={true}
                  orderOverview={orderOverview}
                  RUPEE={RUPEE}
                />
                <div className="mt-2 mb-4">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="w-full bg-[#ff581b] hover:bg-[#e04e14] transition-all rounded-2xl py-4 shadow-md flex items-center justify-center gap-2 text-white font-semibold disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Place Order</span>
                        <svg
                          className="w-5 h-5 text-white animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
