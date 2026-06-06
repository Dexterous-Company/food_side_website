"use client";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const OrderFailedPage = ({ onTryAgain }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-8 text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <FaTimesCircle className="text-red-500 text-6xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Failed!</h2>
        <p className="text-gray-500 text-sm mb-8">Something went wrong. Please try again.</p>
        <button
          onClick={onTryAgain}
          className="w-full bg-[#ff581b] text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default OrderFailedPage;