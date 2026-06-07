// components/Checkout/UserProfile.jsx (updated - no Continue button)
"use client";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSignOutAlt, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Authentication/AuthenticationSlice";

const UserProfile = ({ isDesktop, userData }) => {
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

  if (isDesktop) {
    return (
      <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
        {/* Step Indicator */}
        <div className="mb-3">
          <p className="text-sm text-green-600 font-semibold">✓ STEP 1 • COMPLETED</p>
        </div>

        {/* Header with Avatar */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <FaCheckCircle className="text-white text-xs" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Welcome back, {userData?.name || userData?.fullName || "User"}
              </h3>
              <p className="text-sm text-gray-600">
                {userData?.phone || userData?.mobileNumber || "+91 XXXXXXX"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <FaSignOutAlt className="text-sm" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        {/* Contact Information - Simplified */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-gray-400 text-sm" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium">{userData?.email || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhone className="text-gray-400 text-sm" />
              <div>
                <p className="text-xs text-gray-400">Mobile</p>
                <p className="text-sm font-medium">{userData?.phone || userData?.mobileNumber || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }

  // Mobile Version
  return (
    <div className="mb-6 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Step Indicator */}
      <div className="mb-3">
        <p className="text-xs text-green-600 font-semibold">✓ STEP 1 COMPLETED</p>
      </div>

      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <FaUser className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Welcome back, {userData?.name || userData?.fullName || "User"}
            </h3>
            <p className="text-xs text-gray-500">
              {userData?.phone || userData?.mobileNumber || "+91 XXXXXXX"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info - Simplified */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <FaEnvelope className="text-[#ff581b] text-sm" />
          <p className="text-sm text-gray-700">{userData?.email || "Email not provided"}</p>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;