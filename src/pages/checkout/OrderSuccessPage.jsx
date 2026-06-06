"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import {
    FaArrowLeft,
    FaCalendarAlt,
    FaClock,
    FaRupeeSign,
    FaTruck
} from "react-icons/fa";
import { MdPayments, MdCreditCard } from "react-icons/md";

// Correct import path for public folder
import successAnimation from "../../../public/assets/animations/success-animation.json";

const OrderSuccessPage = ({ orderDetails, onContinueShopping }) => {
    const router = useRouter();

    const handleBackToHome = () => {
        if (onContinueShopping) {
            onContinueShopping();
        } else {
            router.push("/");
        }
    };

    const {
        orderNumber = "#HYD20345",
        paymentMethod = "cod",
        paymentStatus = "pending",
        amount = 319,
        orderOverview = {},
        cartItems = []
    } = orderDetails || {};

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
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>

                {/* Rest of the component same as above */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
                    <p className="text-sm text-gray-500">
                        {paymentMethod === "cod"
                            ? "Your cash on delivery order has been confirmed successfully."
                            : "Your payment request has been created successfully."}
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
                        <div className={`px-3 py-1 rounded-full ${paymentMethod === "cod" ? "bg-green-100" : "bg-orange-100"
                            }`}>
                            <span className={`text-xs font-bold ${paymentMethod === "cod" ? "text-green-600" : "text-orange-600"
                                }`}>
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
                            <p className="text-xs text-gray-400 font-semibold">PAYMENT METHOD</p>
                            <p className="text-sm font-semibold text-gray-900">{paymentLabel}</p>
                        </div>
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
                                <p className="text-xs text-green-600 font-semibold">Current LOCATION</p>
                                <p className="text-sm font-medium text-gray-800 mt-1">
                                    {orderOverview.pickupLocation || "203, Street No. 4, Kalyan Nagar Phase 1, Siddarth Nagar, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038, India"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-red-500 font-semibold">DELIVERY POINT LOCATION</p>
                                <p className="text-sm font-medium text-gray-800 mt-1">
                                    {orderOverview.deliveryPointAddress || "Plot No 75, 8th Rd, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066, India"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                        <div className="bg-gray-50 rounded-xl py-3 text-center">
                            <FaCalendarAlt className="text-indigo-500 text-lg mx-auto mb-1" />
                            <p className="text-xs text-gray-400 font-semibold">DATE</p>
                            <p className="text-sm font-bold text-gray-800">
                                {orderOverview.dateLabel || "06-06-2026"}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl py-3 text-center">
                            <FaClock className="text-orange-500 text-lg mx-auto mb-1" />
                            <p className="text-xs text-gray-400 font-semibold">TIME</p>
                            <p className="text-sm font-bold text-gray-800">
                                {orderOverview.timeLabel || "10:54 AM"}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl py-3 text-center">
                            <FaRupeeSign className="text-emerald-500 text-lg mx-auto mb-1" />
                            <p className="text-xs text-gray-400 font-semibold">AMOUNT</p>
                            <p className="text-sm font-bold text-[#ff581b]">₹{amount}</p>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    {cartItems.length > 0 && (
                        <div className="bg-orange-50 rounded-xl p-4">
                            <p className="text-sm font-bold text-gray-800 mb-2">
                                Items in Order ({cartItems.length})
                            </p>
                            {cartItems.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-1.5">
                                    <p className="text-sm text-gray-600 flex-1">
                                        {item.name}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800 ml-2">
                                        x{item.qty || item.quantity || 1}
                                    </p>
                                </div>
                            ))}
                            {cartItems.length > 3 && (
                                <p className="text-xs text-orange-600 font-semibold mt-2">
                                    +{cartItems.length - 3} more items
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => router.push("/order-tracking")}
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