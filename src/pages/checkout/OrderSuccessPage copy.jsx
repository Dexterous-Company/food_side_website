"use client";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
  FaTruck,
} from "react-icons/fa";
import { MdPayments, MdCreditCard } from "react-icons/md";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import successAnimation from "../animations/success.json";
import axios from "axios";

const OrderSuccessPage = ({ onContinueShopping }) => {
  const router = useRouter();
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Get order ID from localStorage
        const storedOrderJson = localStorage.getItem("currentOrder");
        
        if (!storedOrderJson) {
          setError("No order found");
          setLoading(false);
          return;
        }

        const storedOrder = JSON.parse(storedOrderJson);
        const orderNumber = storedOrder?.orderNumber || storedOrder?._id;
        
        if (!orderNumber) {
          setError("Invalid order number");
          setLoading(false);
          return;
        }

        // Fetch complete order details from API
        const response = await axios.get(`${BaseUrl}/api/v1/orders/${orderNumber}/new`);
        
        if (response.data?.success || response.data?.data) {
          const apiOrder = response.data.data;
          setOrderData(apiOrder);
        } else {
          // Fallback to stored order if API fails
          setOrderData(storedOrder);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        // Try to use localStorage data as fallback
        const fallbackOrder = localStorage.getItem("currentOrder");
        if (fallbackOrder) {
          setOrderData(JSON.parse(fallbackOrder));
        } else {
          setError("Failed to load order details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [BaseUrl]);

  const handleBackToHome = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      router.push("/");
    }
  };

  const handleTrackOrder = () => {
    // if (orderData?.orderNumber) {
    //   router.push(`/order-tracking?orderId=${orderData.orderNumber}`);
    // } else {
      router.push("/accounts/orders");
    // }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error || "Order not found"}</p>
          <button
            onClick={handleBackToHome}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Extract data from API response
  const orderNumber = orderData.orderNumber || "#NA";
  const paymentMethod = orderData.paymentMethod || "cod";
  const paymentStatus = orderData.paymentStatus || "pending";
  const totalAmount = orderData.totalAmount || orderData.amount || 0;
  const subtotal = orderData.subtotal || 0;
  const deliveryFee = orderData.deliveryFee || 0;
  
  // Get restaurant info
  const restaurantName = orderData.restaurant?.name || "Restaurant";
  const restaurantAddress = orderData.restaurant?.address 
    ? `${orderData.restaurant.address.area || ""}, ${orderData.restaurant.address.city || ""}` 
    : "Restaurant address not available";
  
  // Get delivery point info
  const deliveryPointName = orderData.deliveryPoint?.name || "Delivery Point";
  const deliveryAddress = orderData.deliveryPoint?.address?.fullAddress || 
                         orderData.deliveryPointId?.address?.fullAddress ||
                         "Delivery address not available";
  
  // Get journey info
  const journeyDate = orderData.journey?.formattedDate || 
                     (orderData.journey?.date ? new Date(orderData.journey.date).toLocaleDateString() : "NA");
  const journeyTime = orderData.journey?.formattedTime || 
                     (orderData.journey?.time ? new Date(orderData.journey.time).toLocaleTimeString() : "NA");
  
  // Get items
  const cartItems = (orderData.items || []).map(item => ({
    id: item.menuId?._id || item.menuId,
    name: item.name,
    qty: item.quantity,
    price: item.price,
    total: item.total,
    isVeg: item.isVeg,
    image: item.image
  }));
  
  // Get user info
  const userName = orderData.user?.name || orderData.userName || "Customer";
  
  // Get ETA
  const eta = orderData.eta ? new Date(orderData.eta).toLocaleTimeString() : null;

  const paymentLabel = paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment";
  const paymentBadgeLabel = paymentStatus === "pending" ? "PENDING" : paymentStatus.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Order Success</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 py-6">
        {/* Success Animation */}
        <div className="flex justify-center mb-4">
          <div className="w-48 h-48">
            <Lottie
              animationData={successAnimation}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Successful!
          </h2>
          <p className="text-sm text-gray-500">
            {paymentMethod === "cod"
              ? "Your cash on delivery order has been confirmed successfully."
              : "Your payment request has been created successfully."}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Thank you, {userName}!
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          {/* Order Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 font-semibold">ORDER ID</p>
              <p className="text-base font-bold text-gray-900">{orderNumber}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full ${
                paymentMethod === "cod" ? "bg-green-100" : "bg-orange-100"
              }`}
            >
              <span
                className={`text-xs font-bold ${
                  paymentMethod === "cod" ? "text-green-600" : "text-orange-600"
                }`}
              >
                {paymentBadgeLabel}
              </span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              {paymentMethod === "cod" ? (
                <MdPayments className="text-green-500 text-xl" />
              ) : (
                <MdCreditCard className="text-orange-600 text-xl" />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold">
                PAYMENT METHOD
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {paymentLabel}
              </p>
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="mb-4 p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-600 font-semibold">RESTAURANT</p>
            <p className="text-sm font-medium text-gray-800 mt-1">
              {restaurantName}
            </p>
            <p className="text-xs text-gray-500 mt-1">{restaurantAddress}</p>
          </div>

          {/* Location Flow */}
          <div className="flex gap-3 mb-5">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="w-0.5 h-16 bg-gray-200 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-xs text-green-600 font-semibold">
                  PICKUP LOCATION
                </p>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {restaurantName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {restaurantAddress}
                </p>
              </div>
              <div>
                <p className="text-xs text-red-500 font-semibold">
                  DELIVERY LOCATION
                </p>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {deliveryPointName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {deliveryAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="bg-gray-50 rounded-xl py-3 text-center">
              <FaCalendarAlt className="text-indigo-500 text-lg mx-auto mb-1" />
              <p className="text-xs text-gray-400 font-semibold">DATE</p>
              <p className="text-sm font-bold text-gray-800">{journeyDate}</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-3 text-center">
              <FaClock className="text-orange-500 text-lg mx-auto mb-1" />
              <p className="text-xs text-gray-400 font-semibold">TIME</p>
              <p className="text-sm font-bold text-gray-800">{journeyTime}</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-3 text-center">
              <FaRupeeSign className="text-emerald-500 text-lg mx-auto mb-1" />
              <p className="text-xs text-gray-400 font-semibold">AMOUNT</p>
              <p className="text-sm font-bold text-[#ff581b]">₹{totalAmount}</p>
            </div>
          </div>

          {/* Price Breakdown */}
          {(subtotal > 0 || deliveryFee > 0) && (
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs font-semibold text-gray-600 mb-2">PRICE DETAILS</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₹{deliveryFee}</span>
                </div>
              )}
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-[#ff581b]">₹{totalAmount}</span>
              </div>
            </div>
          )}

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-sm font-bold text-gray-800 mb-2">
                Items in Order ({cartItems.length})
              </p>
              {cartItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="flex justify-between items-center py-2 border-b border-orange-100 last:border-0"
                >
                  <div className="flex items-center gap-2 flex-1">
                    {item.isVeg !== undefined && (
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.isVeg ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                    )}
                    <p className="text-sm text-gray-700 flex-1">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      x{item.qty}
                    </p>
                    <p className="text-xs text-gray-500">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ETA */}
          {eta && (
            <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center">
              <p className="text-xs text-blue-600">
                Estimated Delivery by {eta}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTrackOrder}
            className="w-full bg-gradient-to-r from-[#ff581b] to-[#e04e14] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <FaTruck className="text-white" />
            Track Order
          </button>
          <button
            onClick={handleBackToHome}
            className="w-full bg-white border border-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;