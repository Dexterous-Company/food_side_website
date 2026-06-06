"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiEdit2,
  FiCheck,
  FiUser,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Tejbhan Kushwaha",
    phone: "8982471422",
    email: "kushwahatejbhan97@gmail.com",
    profileImage:
      "https://res.cloudinary.com/dssdvnei1/image/upload/v1779258906/user_profiles/ew3xtccbogfye57wxhj1.jpg",
  });

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setUser((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setUser((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "" || /^[a-z0-9._%+-]*@?g?m?a?i?l?\.?c?o?m?$/.test(value)) {
      setUser((prev) => ({
        ...prev,
        email: value,
      }));
    }
  };

  const handleSave = () => {
    if (!user.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (user.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (!user.email.endsWith("@gmail.com")) {
      alert("Only Gmail addresses are allowed");
      return;
    }

    setIsEditing(false);

    // API Call Here
    console.log("Updated User:", user);
  };

  return (
    <div className="h-fit bg-[#FFF8F2] p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="flex items-center gap-2 mb-3 sm:hidden">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
          >
            <FiArrowLeft size={18} className="text-[#FF581B]" />
          </button>

          <h1 className="text-lg font-bold text-[#FF581B]">My Profile</h1>
        </div>

        {/* Desktop Header */}
        <h1 className="hidden sm:block text-2xl font-bold text-[#FF581B] mb-4">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-3 mb-2">
          <div className="flex items-center gap-3 sm:gap-4">
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt={user.name}
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#F4B400]"
              />
            ) : (
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#F4B400] to-[#FF581B] flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                {user.name?.charAt(0)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                {user.name}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600">Customer</p>

              <p className="text-[11px] sm:text-sm text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-3">
          <div className="flex items-center justify-between border-b border-orange-100 pb-3">
            <h3 className="text-base sm:text-xl font-semibold text-[#FF581B]">
              Personal Information
            </h3>

            {isEditing ? (
              <button
                onClick={handleSave}
                className="h-8 sm:h-9 px-3 bg-[#F4B400] hover:bg-[#e0a500] text-white rounded-lg flex items-center gap-1 text-xs sm:text-sm font-medium transition-all"
              >
                <FiCheck size={12} />
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="h-8 sm:h-9 px-3 bg-[#FF581B] hover:bg-[#f04d12] text-white rounded-lg flex items-center gap-1 text-xs sm:text-sm font-medium transition-all"
              >
                <FiEdit2 size={12} />
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Full Name */}
            <div>
              <label className="text-[11px] sm:text-xs text-gray-500 mb-1 flex items-center gap-2">
                <FiUser size={13} className="text-[#FF581B]" />
                Full Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={handleNameChange}
                  className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-1 text-sm sm:text-base font-semibold focus:outline-none focus:border-[#FF581B] rounded-none"
                />
              ) : (
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {user.name}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-[11px] sm:text-xs text-gray-500 mb-1 flex items-center gap-2">
                <FiPhone size={13} className="text-[#FF581B]" />
                Phone Number
              </label>

              {isEditing ? (
                <input
                  type="text"
                  value={user.phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-1 text-sm sm:text-base font-semibold focus:outline-none focus:border-[#FF581B] rounded-none"
                />
              ) : (
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {user.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="text-[11px] sm:text-xs text-gray-500 mb-1 flex items-center gap-2">
                <FiMail size={13} className="text-[#FF581B]" />
                Email Address
              </label>

              {isEditing ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={handleEmailChange}
                  placeholder="example@gmail.com"
                  className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-1 text-sm sm:text-base font-semibold focus:outline-none focus:border-[#FF581B] rounded-none"
                />
              ) : (
                <p className="text-sm sm:text-base font-semibold text-gray-800 break-all">
                  {user.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
