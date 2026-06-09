// app/checkout/page.jsx
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { FaBagShopping } from "react-icons/fa6";

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;
const RUPEE = "₹";

const formatRouteName = (routeName) => {
  if (!routeName) return "Selected route";
  return routeName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const CheckOutPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const toastTimeoutRef = useRef(null);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Memoize showToast to prevent unnecessary re-renders
  const showToast = useCallback((message, isError = false) => {
    // Clear existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    setToastMessage({ message, isError });
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 5000);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Debug logging (keep for debugging, remove in production)
  useEffect(() => {
    console.log("=== Checkout Debug Info ===");
    console.log("Cart List:", cartList);
    console.log("Has Items:", hasItems);
    console.log("Cart Summary:", cartSummary);
    console.log("User Auth:", isUserAuth);
    console.log("User Data:", userData);
    console.log("Delivery Data:", deliveryData);
  }, [cartList, hasItems, isUserAuth, userData, deliveryData]);

  // Get route params from Redux or localStorage
  const routeParams = useMemo(() => {
    if (deliveryData?.deliveryPoint?._id) return deliveryData;
    if (typeof window === "undefined") return {};

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

  // Helper function to extract date and time from journey object
  const getJourneyDateTime = useCallback(() => {
    const journeyDate = routeParams?.journey?.date;
    const journeyTime = routeParams?.journey?.time;
    
    if (!journeyDate) return null;
    
    try {
      // Handle ISO string or full datetime strings
      if (journeyTime && typeof journeyTime === "string" && journeyTime.includes('T')) {
        return new Date(journeyTime);
      }

      // If journeyTime is already a Date object (can happen from in-memory state), merge with journeyDate
      if (journeyTime instanceof Date) {
        const baseDate =
          journeyDate && journeyDate instanceof Date
            ? new Date(journeyDate)
            : journeyDate && typeof journeyDate === 'string' && journeyDate.includes('T')
            ? new Date(journeyDate)
            : new Date();
        baseDate.setHours(journeyTime.getHours(), journeyTime.getMinutes(), 0, 0);
        return baseDate;
      }
      
      if (journeyDate.includes('T')) {
        return new Date(journeyDate);
      }
      
      let dateStr = journeyDate;
      if (typeof journeyDate === "object" && journeyDate instanceof Date) {
        dateStr = journeyDate.toISOString();
      }
      
      let hours = 0, minutes = 0;
      
      if (journeyTime) {
        // Normalize when journeyTime is an object-like (e.g., firebase timestamp) with toDate
        if (typeof journeyTime === 'object' && typeof journeyTime.toDate === 'function') {
          const dt = journeyTime.toDate();
          hours = dt.getHours();
          minutes = dt.getMinutes();
        } else if (typeof journeyTime === 'string' && (journeyTime.includes('AM') || journeyTime.includes('PM'))) {
          const [timePart, period] = journeyTime.split(" ");
          let [hourPart, minutePart] = timePart.split(":").map(Number);
          hours = hourPart;
          minutes = minutePart || 0;
          if (period === "PM" && hours !== 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;
        } else if (typeof journeyTime === 'string' && journeyTime.includes(':')) {
          const [hourPart, minutePart] = journeyTime.split(":").map(Number);
          hours = hourPart;
          minutes = minutePart || 0;
        }
      }
      
      const dateObj = new Date(dateStr);
      dateObj.setHours(hours, minutes, 0, 0);
      return dateObj;
    } catch (error) {
      console.error("Error parsing journey date/time:", error);
      return null;
    }
  }, [routeParams]);

  // ✅ Improved time validation function
  const isTimeValidForToday = useCallback(() => {
    const selectedDateTime = getJourneyDateTime();
    
    if (!selectedDateTime) {
      console.log("No date/time selected");
      return false;
    }
    
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(selectedDateTime);
    selectedDate.setHours(0, 0, 0, 0);
    
    // ✅ MINIMUM 1 HOUR (3600000 milliseconds) - can adjust based on business rules
    const MIN_ADVANCE_TIME_MS = 60 * 60 * 1000; // 1 hour
    const minAllowedTime = new Date(now.getTime() + MIN_ADVANCE_TIME_MS);
    
    console.log("=== Time Validation Debug ===");
    console.log("Selected DateTime:", selectedDateTime);
    console.log("Current Time:", now);
    console.log("Min Allowed Time:", minAllowedTime);
    console.log("Selected Date:", selectedDate);
    console.log("Today Date:", today);
    
    // For future dates (tomorrow or later), always valid
    if (selectedDate.getTime() > today.getTime()) {
      console.log("Future date detected - valid:", selectedDateTime);
      return true;
    }
    
    // For today's date, check if time is at least MIN_ADVANCE_TIME_MS from now
    if (selectedDate.getTime() === today.getTime()) {
      const isValid = selectedDateTime.getTime() >= minAllowedTime.getTime();
      const timeDiffMinutes = Math.round((selectedDateTime.getTime() - now.getTime()) / 60000);
      
      console.log(`Time difference: ${timeDiffMinutes} minutes from now`);
      console.log(`Time valid? ${isValid} (need >= ${MIN_ADVANCE_TIME_MS/60000} minutes advance)`);
      
      if (!isValid) {
        console.warn(`BLOCKING ORDER: Selected time ${selectedDateTime} is less than ${MIN_ADVANCE_TIME_MS/60000} minutes from now`);
      }
      
      return isValid;
    }
    
    // For past dates
    console.log("Past date detected - invalid");
    return false;
  }, [getJourneyDateTime]);

  // Show warning if time is invalid for today
  useEffect(() => {
    const selectedDateTime = getJourneyDateTime();
    
    if (!selectedDateTime) return;
    
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(selectedDateTime);
    selectedDate.setHours(0, 0, 0, 0);
    
    const MIN_ADVANCE_TIME_MS = 60 * 60 * 1000; // 1 hour
    const minAllowedTime = new Date(now.getTime() + MIN_ADVANCE_TIME_MS);
    
    // Only check for today's date
    if (selectedDate.getTime() === today.getTime()) {
      if (selectedDateTime.getTime() < minAllowedTime.getTime()) {
        const formattedMinTime = minAllowedTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        
        const minutesDiff = Math.round((minAllowedTime.getTime() - selectedDateTime.getTime()) / 60000);
        
        showToast(
          `⚠️ Delivery time must be at least 1 hour from now. Please select time after ${formattedMinTime} (${minutesDiff} minutes remaining)`,
          true
        );
      }
    }
  }, [getJourneyDateTime, showToast]);

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
    let displayTime = routeParams?.journey?.formattedTime || routeParams?.time;
    if (!displayTime && routeParams?.journey?.time) {
      const timeObj = new Date(routeParams.journey.time);
      if (!isNaN(timeObj.getTime())) {
        displayTime = timeObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }
    
    return {
      CurrentLocation:
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
      timeLabel: displayTime || new Date().toLocaleTimeString(),
      distanceKm:
        routeParams?.route?.distanceKm || routeParams?.distanceKm || 0,
      durationMinutes:
        routeParams?.route?.durationMinutes ||
        routeParams?.durationMinutes ||
        30,
    };
  }, [routeParams]);

  // ✅ Fixed validateOrder with proper dependencies
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
    
    // ✅ CRITICAL: Check if time is valid for today's delivery - THIS BLOCKS THE ORDER
    const isValidTime = isTimeValidForToday();
    if (!isValidTime) {
      const now = new Date();
      const MIN_ADVANCE_TIME_MS = 60 * 60 * 1000; // 1 hour
      const minAllowedTime = new Date(now.getTime() + MIN_ADVANCE_TIME_MS);
      const formattedMinTime = minAllowedTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      errors.push(`❌ For today's delivery, time must be at least 1 hour from now. Please select time after ${formattedMinTime}`);
      
      console.error("Order blocked - time validation failed");
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
    isTimeValidForToday,
    showToast, // ✅ Added missing dependency
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

      let menuId = item?.productId || item?.id;
      if (menuId && menuId.includes("-")) {
        menuId = menuId.split("-").pop();
      }

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
      "Prepared order data:",
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

    // ✅ Validate first - THIS WILL BLOCK ORDER IF TIME INVALID
    const isValid = validateOrder();
    if (!isValid) {
      console.log("Validation failed:", validationErrors);
      return;
    }

    setIsProcessing(true);
    let navigationCompleted = false;

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

      const createdOrder = await dispatch(createOrder(orderData)).unwrap();
      console.log("Order creation result:", createdOrder);

      if (createdOrder?._id) {
        console.log("Order created successfully, navigating to success page");

        if (selectedPayment === "cod") {
          await dispatch(
            processCODOrder({
              orderId: createdOrder._id,
              orderNumber: createdOrder.orderNumber,
            }),
          ).unwrap();
          console.log("COD payment processed successfully");
        }

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
          `✅ Order placed successfully! Order ID: ${createdOrder.orderNumber}`,
        );
        localStorage.setItem("currentOrder", JSON.stringify(orderData));

        await router.push("/order_success");
        navigationCompleted = true;

        await clearCart();
        console.log("Cart cleared");

        localStorage.removeItem("deliverySelection");
        sessionStorage.removeItem("deliverySelection");

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

      if (errorMessage.includes("validation failed")) {
        errorMessage = "Order validation failed. Please check all details and try again.";
      }

      if (errorMessage.includes("mrp") || errorMessage.includes("price")) {
        errorMessage = "Pricing information is missing. Please try adding items to cart again.";
      }

      if (errorMessage.includes("restaurant")) {
        errorMessage = "Restaurant information is missing. Please try again.";
      }

      showToast(errorMessage, true);
      router.push(`/order_failed?error=${encodeURIComponent(errorMessage)}`);
    } finally {
      if (!navigationCompleted) {
        setIsProcessing(false);
      }
    }
  };

  // ✅ Add a test button for debugging (remove in production)
  const testTimeValidation = () => {
    const isValid = isTimeValidForToday();
    const selectedDateTime = getJourneyDateTime();
    console.log("=== Time Validation Test ===");
    console.log("Selected DateTime:", selectedDateTime);
    console.log("Is Valid:", isValid);
    showToast(`Time validation: ${isValid ? "✅ Valid" : "❌ Invalid"}`, !isValid);
  };

  // Don't render checkout content until the client cart/storage state is ready.
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

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
    <div
      className="min-h-screen md:pt-5 pb-20 md:pb-0"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      {/* ✅ Add debug button (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={testTimeValidation}
            className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs shadow-lg"
          >
            🐛 Test Time
          </button>
        </div>
      )}

      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 mt-2 ">
        <div className="h-12 px-3 flex items-center justify-between ">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <FaArrowLeft className="text-gray-700 text-xs" />
          </button>
          <h1 className="text-lg font-black text-gray-900">Checkout</h1>
          <Link href="/">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBagShopping className="text-gray-700 text-xs" />
            </button>
          </Link>
        </div>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-3 sm:px-6">
        <div className="md:col-span-2 flex flex-col gap-3">
          <OrderOverview
            isDesktop={true}
            orderOverview={orderOverview}
            totals={totals}
            formatRouteName={formatRouteName}
            RUPEE={RUPEE}
          />

          <div className=" bg-white rounded-2xl shadow-sm p-3">
            {!isUserAuth ? (
              <LoginPrompt
                isDesktop={true}
                isUserAuth={isUserAuth}
                userData={userData}
              />
            ) : (
              <>
                <UserProfile isDesktop={true} userData={userData} />

                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="mb-2">
                    <p className="text-[9px] text-green-600 font-semibold">
                      ✓ STEP 2 Payment Method
                    </p>
                  </div>

                  <PaymentMethods
                    selectedPayment={selectedPayment}
                    onSelectPayment={setSelectedPayment}
                    isEnabled={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <OrderSummary
          cartItems={cartItems}
          subtotal={totals.subtotal}
          deliveryFee={totals.deliveryFee}
          total={totals.finalTotal}
          isContactSubmitted={true}
          isProcessing={isLoading}
          onPlaceOrder={handlePlaceOrder}
          RUPEE={RUPEE}
          selectedPayment={selectedPayment}
          onSelectPayment={setSelectedPayment}
          isEnabled={true}
        />
      </div>
    </div>
  );
};

export default CheckOutPage;