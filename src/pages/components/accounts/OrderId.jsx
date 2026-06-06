"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiClock,
  FiMapPin,
  FiPhone,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiMap,
  FiChevronRight,
  FiRefreshCw,
  FiPackage,
  FiTruck,
  FiMessageCircle,
  FiMail,
  FiCheckCircle,
  FiCopy,
  FiHeadphones,
  FiHelpCircle,
  FiAlertCircle,
} from "react-icons/fi";

const orders = [
  {
    _id: "6a23c582b8af4ff5129024df",
    orderNumber: "ORD-1780729217071-9443",
    userName: "Musku Nishitha Reddy",
    userPhone: "7998912344",
    userEmail: "mnishithareddy8764@gmail.com",
    paymentMethod: "cod",
    paymentStatus: "pending",
    status: "placed",
    totalAmount: 848,
    journey: {
      formattedDate: "06-Jun-2026",
      formattedTime: "12:30 PM",
    },
    items: [
      {
        name: "Chicken Bucket Combo",
        quantity: 1,
        price: 499,
        image:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100&h=100&fit=crop",
      },
      {
        name: "Zinger Burger Meal",
        quantity: 1,
        price: 349,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
      },
    ],
    restaurant: {
      name: "Bangalore KFC",
      address: "Whitefield Muthkur, Karnataka",
      phone: "8431347469",
    },
    deliveryAddress: {
      location: "Bengaluru Delivery Point",
      address:
        "Plot No 75, 8th Rd, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066, India",
    },
    estimatedDelivery: "07-Jun-2026",
    deliveryOtp: "482716",
    deliveryPartner: {
      name: "Ramesh Kumar",
      phone: "9876543210",
      vehicleNumber: "KA-05-AB-1234",
    },
  },
];

export default function OrderId() {
  const router = useRouter();
  const order = orders[0];
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [copied, setCopied] = useState(false);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: FiTruck,
          label: "DELIVERED",
        };
      case "preparing":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: FiRefreshCw,
          label: "PREPARING",
        };
      case "ready":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: FiClock,
          label: "READY",
        };
      case "cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: FiClock,
          label: "CANCELLED",
        };
      default:
        return {
          bg: "bg-orange-100",
          text: "text-[#FF581B]",
          icon: FiClock,
          label: "PLACED",
        };
    }
  };

  const statusStyle = getStatusStyle(order.status);
  const StatusIcon = statusStyle.icon;

  const handleVerifyOtp = () => {
    if (enteredOtp === order.deliveryOtp) {
      setOtpVerified(true);
      setShowOtpInput(false);
      alert("OTP verified successfully! Order has been delivered.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(order.deliveryOtp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SupportModal = () => {
    if (!showSupport) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowSupport(false)}
      >
        <div
          className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-orange-100 sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiHeadphones className="text-[#FF581B] text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">
                  Contact Support
                </h3>
              </div>
              <button
                onClick={() => setShowSupport(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <FiAlertCircle className="text-[#FF581B] text-xl" />
                <p className="font-semibold text-gray-800">
                  Order #{order.orderNumber}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                We're here to help! Choose your preferred contact method:
              </p>
            </div>

            {/* Phone Support */}
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiPhone className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Call Support</p>
                  <p className="text-sm text-gray-500">
                    Talk to our customer care executive
                  </p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>

            {/* WhatsApp Support */}
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiMessageCircle className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">WhatsApp Chat</p>
                  <p className="text-sm text-gray-500">
                    Quick response via WhatsApp
                  </p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>

            {/* Email Support */}
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiMail className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Email Support</p>
                  <p className="text-sm text-gray-500">
                    support@restaurant.com
                  </p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>

            {/* FAQ */}
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FiHelpCircle className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">FAQs</p>
                  <p className="text-sm text-gray-500">
                    Find answers to common questions
                  </p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-hit bg-[#FFF8F2]">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-orange-100 shadow-sm md:hidden">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
          >
            <FiArrowLeft size={18} className="text-[#FF581B]" />
          </button>

          <h1 className="font-semibold text-lg text-[#FF581B]">
            Order Details
          </h1>

          <button className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors relative">
            <FiShoppingCart size={18} className="text-[#FF581B]" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-white border-b border-orange-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-[#FF581B] transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Back to Orders</span>
            </button>
            <h1 className="text-2xl font-bold text-[#FF581B]">Order Details</h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-orange-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                    <StatusIcon className="text-[#FF581B] text-xl" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm md:text-base">
                      {order.orderNumber}
                    </h2>
                    <span
                      className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      {statusStyle.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiClock className="text-[#F4B400]" />
                  Ordered on: {order.journey.formattedDate},{" "}
                  {order.journey.formattedTime}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 md:mt-6">
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-[#FF581B] rounded-full" />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span className="text-[#FF581B] font-medium">
                    Order Placed
                  </span>
                  <span>Preparing</span>
                  <span>Ready</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>

            {/* Delivery OTP Section */}
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-orange-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <FiCheckCircle className="text-[#FF581B]" />
                    Delivery OTP
                  </h3>
                  {!otpVerified && (
                    <button
                      onClick={() => setShowOtpInput(!showOtpInput)}
                      className="text-xs text-[#FF581B] font-medium"
                    >
                      {showOtpInput ? "Cancel" : "Enter OTP"}
                    </button>
                  )}
                </div>

                {otpVerified ? (
                  <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 text-xl" />
                    <div>
                      <p className="font-semibold text-green-700">
                        Delivery Confirmed!
                      </p>
                      <p className="text-sm text-green-600">
                        Order has been successfully delivered
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-orange-50 rounded-xl p-4 mb-3">
                      <p className="text-sm text-gray-700 mb-2">
                        Share this OTP with the delivery partner to confirm
                        delivery:
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-2xl font-bold text-[#FF581B] tracking-wider">
                          {order.deliveryOtp.split("").join(" ")}
                        </div>
                        <button
                          onClick={handleCopyOtp}
                          className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-[#FF581B] flex items-center gap-1"
                        >
                          <FiCopy size={14} />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    {showOtpInput && (
                      <div className="mt-3">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Enter OTP to confirm delivery
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="flex-1 px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:border-[#FF581B] focus:ring-2 focus:ring-[#FF581B]/20"
                          />
                          <button
                            onClick={handleVerifyOtp}
                            className="px-4 py-2 bg-[#FF581B] text-white rounded-lg font-medium hover:bg-[#E04A10] transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Delivery Partner Info */}
            {order.deliveryPartner && (
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-orange-100">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <FiTruck className="text-[#FF581B]" />
                  Delivery Partner
                </h3>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <FiUser className="text-[#FF581B] text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {order.deliveryPartner.name}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{order.deliveryPartner.phone}</span>
                      <span>{order.deliveryPartner.vehicleNumber}</span>
                    </div>
                  </div>
                  <button className="text-[#FF581B]">
                    <FiPhone size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Restaurant Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-orange-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  🍴 Restaurant Details
                </h3>
              </div>
              <div className="p-4 md:p-5">
                <h4 className="font-semibold text-gray-800 text-base md:text-lg mb-3">
                  {order.restaurant.name}
                </h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-[#FF581B] mt-0.5" />
                    <span>{order.restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-[#FF581B]" />
                    <span>{order.restaurant.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-orange-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FiMapPin className="text-[#FF581B]" />
                  Delivery Location
                </h3>
              </div>
              <div className="p-4 md:p-5">
                <h4 className="font-semibold text-gray-800 text-base md:text-lg">
                  {order.deliveryAddress.location}
                </h4>
                <div className="mt-3 space-y-3">
                  <div className="flex gap-3 text-sm text-gray-600">
                    <FiMapPin className="text-[#FF581B] mt-0.5 shrink-0" />
                    <p>{order.deliveryAddress.address}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiUser className="text-[#FF581B]" />
                      <span>{order.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FiPhone className="text-[#FF581B]" />
                      <span className="text-[#FF581B]">{order.userPhone}</span>
                    </div>
                  </div>
                  <button className="w-full bg-orange-50 rounded-xl p-3 flex items-center justify-between hover:bg-orange-100 transition-colors mt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <FiMap className="text-[#FF581B] text-lg" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-[#FF581B] text-sm">
                          View on Map
                        </p>
                        <p className="text-xs text-gray-500">
                          Tap to see route from your location
                        </p>
                      </div>
                    </div>
                    <FiChevronRight className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Summary & Items */}
          <div className="space-y-4">
            {/* Contact Support Button */}
            <button
              onClick={() => setShowSupport(true)}
              className="w-full bg-gradient-to-r from-[#FF581B] to-[#F4B400] rounded-2xl p-4 shadow-sm text-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FiHeadphones className="text-xl" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Need Help?</p>
                    <p className="text-xs text-white/90">
                      Contact our support team
                    </p>
                  </div>
                </div>
                <FiChevronRight className="text-xl" />
              </div>
            </button>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-4 md:p-5 shadow-sm border border-orange-100">
              <h3 className="font-semibold text-gray-800 mb-3">
                Order Summary
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF581B]">₹</div>
                  <p className="font-bold text-lg text-gray-800 mt-1">
                    ₹{order.totalAmount}
                  </p>
                  <span className="text-xs text-gray-500">Total</span>
                </div>
                <div className="text-center border-x border-orange-200">
                  <FiCalendar className="mx-auto text-[#F4B400] text-2xl" />
                  <p className="font-semibold text-sm text-gray-700 mt-1">
                    {order.journey.formattedDate}
                  </p>
                  <span className="text-xs text-gray-500">Date</span>
                </div>
                <div className="text-center">
                  <FiCreditCard className="mx-auto text-[#FF581B] text-2xl" />
                  <p className="font-semibold text-sm text-gray-700 mt-1 uppercase">
                    {order.paymentMethod}
                  </p>
                  <span className="text-xs text-gray-500">Payment</span>
                </div>
              </div>
              {order.paymentStatus === "pending" && (
                <div className="mt-3 pt-3 border-t border-orange-200">
                  <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg text-center">
                    Payment pending - Cash on delivery
                  </p>
                </div>
              )}
            </div>

            {/* Ordered Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-orange-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FiPackage className="text-[#FF581B]" />
                  Ordered Items
                </h3>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-orange-50 flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiPackage size={20} className="text-orange-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
                <div className="pt-3 border-t border-orange-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-800">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="font-medium text-gray-800">
                      ₹{Math.round(order.totalAmount * 0.18)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t border-orange-100">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-[#FF581B]">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ETA Notice */}
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <div className="flex items-center gap-2">
                  <FiTruck className="text-[#FF581B]" />
                  <span className="text-sm text-gray-700">
                    Expected delivery by{" "}
                    <strong>{order.estimatedDelivery}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 p-3 md:hidden">
        <button className="w-full h-12 rounded-xl bg-[#FF581B] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#E04A10] transition-colors">
          <FiRefreshCw size={16} />
          Reorder
        </button>
      </div>

      {/* Bottom Button - Desktop */}
      <div className="hidden md:block fixed bottom-0 right-0 p-6">
        <button className="px-6 py-3 rounded-xl bg-[#FF581B] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#E04A10] transition-colors shadow-lg">
          <FiRefreshCw size={18} />
          Reorder Now
        </button>
      </div>

      {/* Support Modal */}
      <SupportModal />
    </div>
  );
}
