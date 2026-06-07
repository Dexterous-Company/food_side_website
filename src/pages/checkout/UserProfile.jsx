// components/Checkout/UserProfile.jsx
"use client";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSignOutAlt, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Authentication/AuthenticationSlice";

const UserProfile = ({ userData }) => {
  const dispatch = useDispatch();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState(userData?.address?.[0] || "");
  
  const handleLogout = () => {
    dispatch(logout());
    // window.location.reload();
  };

  const handleSaveAddress = () => {
    // TODO: Save address to backend
    setShowAddressForm(false);
  };

  return (
    <div className="mb-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Responsive layout - changes based on breakpoints */}
      <div className="flex flex-col gap-4">
        
        {/* Step Indicator and Header Row - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col gap-3">
            {/* Step Indicator */}
            <div>
              <p className="text-[10px] text-green-600 font-semibold">✓ STEP 1 • COMPLETED</p>
            </div>

            {/* Header with Avatar - Responsive */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <FaUser className="text-white text-base" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-0.5">
                  <FaCheckCircle className="text-white text-[8px]" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Welcome back, {userData?.name || userData?.fullName || "User"}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {userData?.phone || userData?.mobileNumber || "+91 XXXXXXX"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information - Responsive Grid/Side by side */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-[#ff581b] sm:text-gray-400 text-xs sm:text-sm" />
              <div>
                <p className="text-[8px] sm:text-[10px] text-gray-400">Email</p>
                <p className="text-[11px] sm:text-[12px] font-medium truncate max-w-[150px] sm:max-w-none">
                  {userData?.email || "Not provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone className="text-[#ff581b] sm:text-gray-400 text-xs sm:text-sm" />
              <div>
                <p className="text-[8px] sm:text-[10px] text-gray-400">Mobile</p>
                <p className="text-[11px] sm:text-[12px] font-medium">
                  {userData?.phone || userData?.mobileNumber || "Not provided"}
                </p>
              </div>
            </div>
            
            {/* Logout button - hide on mobile, show on desktop if needed */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition text-xs"
            >
              <FaSignOutAlt className="text-[14px]" />
              <span className="text-[10px] font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Logout Button - visible only on mobile */}
        <div className="flex sm:hidden justify-end pt-2 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md transition"
          >
            <FaSignOutAlt className="text-sm" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;