// components/Checkout/LoginPrompt.jsx
"use client";
import React from "react";
import { FaUser } from "react-icons/fa";

const LoginPrompt = ({ isDesktop, isUserAuth, userData, onLogin }) => {
  if (isDesktop) {
    return (
      <div className="mb-6 p-6 bg-gray-50 rounded-2xl text-center border border-gray-200">
        <FaUser className="text-[#ff581b] text-4xl mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {isUserAuth ? "Continue to Checkout" : "Login to Continue"}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {isUserAuth ? `Welcome back, ${userData?.name || "User"}!` : "Please login to fill your contact details"}
        </p>
        <button onClick={onLogin} className="bg-[#ff581b] text-white px-8 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">
          {isUserAuth ? "Continue" : "Login / Sign Up"}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 p-6 bg-gray-50 rounded-2xl text-center border border-gray-200">
      <FaUser className="text-[#ff581b] text-4xl mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {isUserAuth ? "Continue to Checkout" : "Login to Continue"}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {isUserAuth ? `Welcome back, ${userData?.name || "User"}!` : "Please login to fill your contact details"}
      </p>
      <button onClick={onLogin} className="bg-[#ff581b] text-white px-8 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">
        {isUserAuth ? "Continue" : "Login / Sign Up"}
      </button>
    </div>
  );
};

export default LoginPrompt;