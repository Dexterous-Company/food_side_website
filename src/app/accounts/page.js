"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiEdit2,
  FiCheck,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiLoader,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  restaurant_auth,
  logout as logoutAction,
  loadUserFromStorage,
  checkEmailExists,
} from "@/redux/Authentication/AuthenticationSlice";
import axios from "axios";
import toast from "react-hot-toast";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const { isUserAuth, userData } = useSelector((state) => state.Authentication);
  const deliveryState = useSelector((state) => state.delivery);
  
  const currentAddress = useSelector((state) => state.Authentication.current_Address);
  const selectedDeliveryPoint = deliveryState?.selectedDeliveryPoint || null;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [formErrors, setFormErrors] = useState({ email: "" });
  const [isCheckingEmail, setIsCheckingEmail] = useState(false); // Add email checking state

  // Check if email exists (async function)


  // Load user data from storage on mount
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      await dispatch(loadUserFromStorage());
      setIsLoading(false);
    };
    loadUser();
  }, [dispatch]);

  // Memoized user data
  const user = useMemo(() => {
    const phoneNumber = userData?.phone || userData?.mobile || "";
    const formattedPhone = phoneNumber && String(phoneNumber).startsWith("+91")
      ? String(phoneNumber)
      : phoneNumber
      ? `+91 ${phoneNumber}`
      : "Phone not added";

    return {
      _id: userData?._id || userData?.id || null,
      name: userData?.name || userData?.fullName || "Guest User",
      phone: formattedPhone,
      email: userData?.email || "Email not added",
      profileImage: isUserAuth
        ? userData?.profileImage || userData?.avatar || userData?.image || null
        : null,
      isVerified: Boolean(userData?.isVerified ?? isUserAuth),
      joinedAt: userData?.createdAt || userData?.updatedAt || null,
      selectedPointName:
        selectedDeliveryPoint?.name ||
        selectedDeliveryPoint?.fullPointObject?.name ||
        currentAddress?.name ||
        "",
      selectedPointAddress:
        selectedDeliveryPoint?.address?.fullAddress ||
        selectedDeliveryPoint?.fullPointObject?.address?.fullAddress ||
        currentAddress?.address ||
        currentAddress?.fullAddress ||
        currentAddress?.street ||
        "",
    };
  }, [isUserAuth, currentAddress, selectedDeliveryPoint, userData]);

  const [editForm, setEditForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    profileImage: user.profileImage,
  });

  useEffect(() => {
    if (!isLoading) {
      setEditForm({
        name: user.name,
        phone: user.phone,
        email: user.email,
        profileImage: user.profileImage,
      });
      setFormErrors({ email: "" });
    }
  }, [user.email, user.name, user.phone, user.profileImage, isLoading]);

  const memberSince = useMemo(() => {
    if (!user.joinedAt) return "Not available";
    const joinedDate = new Date(user.joinedAt);
    if (isNaN(joinedDate.getTime())) return "Not available";
    return joinedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [user.joinedAt]);

  // Email validation functions
  const getEmailValidationMessage = (email) => {
    const normalizedEmail = String(email || "").trim();
    if (!normalizedEmail) return "Email address is required";
    if (normalizedEmail.length > 254) return "Email address is too long (maximum 254 characters)";
    if (!normalizedEmail.includes("@")) return 'Email must contain an "@" symbol';
    
    const [localPart, domain] = normalizedEmail.split("@");
    if (!localPart || localPart.length === 0) return 'Email must have a local part before "@"';
    if (!domain || domain.length === 0) return 'Email must have a domain after "@"';
    if (localPart.length > 64) return "Email local part is too long (maximum 64 characters)";
    if (domain.length > 255) return "Email domain is too long (maximum 255 characters)";
    if (localPart.includes("..")) return "Email cannot contain consecutive dots in the local part";
    if (domain.includes("..")) return "Email cannot contain consecutive dots in the domain";
    if (!domain.includes(".")) return "Email domain must contain a dot (e.g., example.com)";
    if (domain.startsWith(".")) return "Email domain cannot start with a dot";
    if (domain.endsWith(".")) return "Email domain cannot end with a dot";
    
    const lastDotIndex = domain.lastIndexOf(".");
    const tld = domain.substring(lastDotIndex + 1);
    if (tld.length < 2) return "Email domain must have a valid top-level domain (e.g., .com, .org)";
    
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if (!emailRegex.test(normalizedEmail)) return "Please enter a valid email address (e.g., name@example.com)";
    
    return "";
  };

  const sanitizeEmailInput = (value) => {
    let sanitized = String(value || "").toLowerCase().replace(/\s/g, "");
    sanitized = sanitized.replace(/[^a-z0-9@._+-]/g, "");
    
    const atIndex = sanitized.indexOf("@");
    if (atIndex !== -1) {
      const afterAt = sanitized.substring(atIndex + 1).replace(/@/g, "");
      sanitized = sanitized.substring(0, atIndex + 1) + afterAt;
    }
    
    return sanitized;
  };

  // Debounced email check function
  useEffect(() => {
    const checkEmail = async () => {
      const email = editForm.email.trim();
      
      // Skip if email is empty or same as current user's email
      if (!email || email === user.email) {
        setFormErrors(prev => ({ ...prev, email: "" }));
        return;
      }

      // First validate format
      const validationMessage = getEmailValidationMessage(email);
      if (validationMessage) {
        setFormErrors({ email: validationMessage });
        return;
      }

      // Check if email exists in database
      setIsCheckingEmail(true);
      try {
        const exists = await checkEmailExists(email);
        console.log(exists ,"exists");
        
        if (exists) {
          setFormErrors({ email: "This email is already registered. Please use a different email address." });
        } else {
          setFormErrors({ email: "" });
        }
      } catch (error) {
        console.error("Error checking email:", error);
        setFormErrors({ email: "" });
      } finally {
        setIsCheckingEmail(false);
      }
    };

    // Debounce the email check to avoid too many API calls
    const timeoutId = setTimeout(() => {
      checkEmail();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [editForm.email, user.email]);

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setEditForm((prev) => ({ ...prev, name: value }));
  };

  const handleEmailChange = (e) => {
    const sanitizedEmail = sanitizeEmailInput(e.target.value);
    setEditForm((prev) => ({ ...prev, email: sanitizedEmail }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    const imageFormData = new FormData();
    imageFormData.append("profileImage", file);
    
    try {
      const response = await axios.put(
        `${BaseUrl}/api/v1/user/users/${user._id}/profile-image`,
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Unable to upload profile image.");
      }
      
      return response?.data?.profileImage || response?.data?.user?.profileImage;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  // const handleSave = async () => {
  //   if (!editForm.name.trim()) {
  //     alert("Please enter your name");
  //     return;
  //   }

  //   const trimmedEmail = editForm.email.trim();
  //   if (!trimmedEmail) {
  //     alert("Please enter your email address");
  //     return;
  //   }

  //   // Check format validation
  //   const validationMessage = getEmailValidationMessage(trimmedEmail);
  //   if (validationMessage) {
  //     alert(validationMessage);
  //     return;
  //   }

  //   // Check if email exists (only if email changed)
  //   if (trimmedEmail.toLowerCase() !== user.email.toLowerCase()) {
  //     const emailExists = await checkEmailExists(trimmedEmail);
  //     if (emailExists) {
  //       alert("This email is already registered. Please use a different email address.");
  //       return;
  //     }
  //   }

  //   if (!user._id) {
  //     alert("User ID not found. Please login again.");
  //     return;
  //   }

  //   setIsSaving(true);

  //   try {
  //     let uploadedProfileImageUrl = editForm.profileImage;

  //     // Handle image upload if a new file was selected
  //     if (profileImageFile) {
  //       uploadedProfileImageUrl = await handleImageUpload(profileImageFile);
  //     }

  //     const payload = {
  //       name: editForm.name.trim(),
  //       email: trimmedEmail.toLowerCase(),
  //       profileImage: uploadedProfileImageUrl,
  //     };

  //     const response = await axios.put(
  //       `${BaseUrl}/api/v1/user/users/${user._id}`,
  //       payload
  //     );

  //     const updatedUser = response?.data?.user;

  //     if (!response?.data?.success || !updatedUser) {
  //       throw new Error(response?.data?.message || "Unable to update profile.");
  //     }

  //     // Update Redux state
  //     dispatch(
  //       restaurant_auth({
  //         ...(userData || {}),
  //         ...updatedUser,
  //         isUserAuth: true,
  //       })
  //     );

  //     setEditForm((prev) => ({ ...prev, profileImage: uploadedProfileImageUrl }));
  //     setProfileImageFile(null);
  //     setIsEditing(false);
  //     alert("Your profile has been updated successfully!");
  //   } catch (error) {
  //     console.error("Save error:", error);
  //     alert(error?.response?.data?.message || error?.message || "Unable to update profile right now.");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };


  const handleSave = async () => {
  if (!editForm.name.trim()) return toast.error("Please enter your name");

  const trimmedEmail = editForm.email.trim();
  if (!trimmedEmail) return toast.error("Please enter your email");

  const validationMessage = getEmailValidationMessage(trimmedEmail);
  if (validationMessage) return toast.error(validationMessage);

  if (trimmedEmail.toLowerCase() !== user.email.toLowerCase()) {
    const emailExists = await checkEmailExists(trimmedEmail);
    if (emailExists) return toast.error("Email already registered");
  }

  if (!user._id) return toast.error("User ID not found. Login again");

  setIsSaving(true);

  try {
    let uploadedProfileImageUrl = editForm.profileImage;

    if (profileImageFile) {
      uploadedProfileImageUrl = await handleImageUpload(profileImageFile);
    }

    const payload = {
      name: editForm.name.trim(),
      email: trimmedEmail.toLowerCase(),
      profileImage: uploadedProfileImageUrl,
    };

    const response = await axios.put(
      `${BaseUrl}/api/v1/user/users/${user._id}`,
      payload
    );

    const updatedUser = response?.data?.user;

    if (!response?.data?.success || !updatedUser) {
      throw new Error(response?.data?.message || "Update failed");
    }

    dispatch(
      restaurant_auth({
        ...(userData || {}),
        ...updatedUser,
        isUserAuth: true,
      })
    );

    setEditForm((prev) => ({ ...prev, profileImage: uploadedProfileImageUrl }));
    setProfileImageFile(null);
    setIsEditing(false);

    toast.success("Profile updated successfully");
  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || error?.message || "Update failed"
    );
  } finally {
    setIsSaving(false);
  }
};
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      
      setProfileImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setEditForm((prev) => ({ ...prev, profileImage: previewUrl }));
    }
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (editForm.profileImage && editForm.profileImage.startsWith('blob:')) {
        URL.revokeObjectURL(editForm.profileImage);
      }
    };
  }, [editForm.profileImage]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <FiLoader size={40} className="animate-spin text-[#FF581B] mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!isUserAuth) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your profile</p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-[#FF581B] text-white rounded-lg hover:bg-[#f04d12] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F2] p-2 sm:p-4">
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
            <div className="relative">
              {editForm.profileImage ? (
                <Image
                  src={editForm.profileImage}
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
              {isEditing && (
                <label className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#FF581B] rounded-full flex items-center justify-center cursor-pointer border-2 border-white hover:bg-[#f04d12] transition-colors">
                  <FiEdit2 size={10} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                  {user.name}
                </h2>
                {user.isVerified && (
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full text-white text-xs">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Customer</p>
              <p className="text-[11px] sm:text-sm text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Point Card (if available) */}
        {user.selectedPointName && (
          <div className="bg-white rounded-2xl p-3 mb-2">
            <div className="flex items-start gap-2">
              <FiMapPin className="text-[#FF581B] mt-0.5 flex-shrink-0" size={16} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-700">{user.selectedPointName}</p>
                <p className="text-[11px] text-gray-500 truncate">{user.selectedPointAddress}</p>
              </div>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-3">
          <div className="flex items-center justify-between border-b border-orange-100 pb-3">
            <h3 className="text-base sm:text-xl font-semibold text-[#FF581B]">
              Personal Information
            </h3>

            {isEditing ? (
              <button
                onClick={handleSave}
                disabled={isSaving || !!formErrors.email || isCheckingEmail}
                className="h-8 sm:h-9 px-3 bg-[#F4B400] hover:bg-[#e0a500] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-1 text-xs sm:text-sm font-medium transition-all"
              >
                <FiCheck size={12} />
                {isSaving ? "Saving..." : "Save"}
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
                  value={editForm.name}
                  onChange={handleNameChange}
                  className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-1 text-sm sm:text-base font-semibold focus:outline-none focus:border-[#FF581B] rounded-none"
                />
              ) : (
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {user.name}
                </p>
              )}
            </div>

            {/* Phone Number - Readonly in web version */}
            <div>
              <label className="text-[11px] sm:text-xs text-gray-500 mb-1 flex items-center gap-2">
                <FiPhone size={13} className="text-[#FF581B]" />
                Phone Number
              </label>
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-800">
                <span>{user.phone}</span>
                <span className="text-xs text-gray-400">(locked)</span>
              </div>
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="text-[11px] sm:text-xs text-gray-500 mb-1 flex items-center gap-2">
                <FiMail size={13} className="text-[#FF581B]" />
                Email Address
              </label>

              {isEditing ? (
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={handleEmailChange}
                      placeholder="example@gmail.com"
                      className={`w-full bg-transparent border-0 border-b ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      } px-0 py-1 text-sm sm:text-base font-semibold focus:outline-none focus:border-[#FF581B] rounded-none pr-6`}
                    />
                    {isCheckingEmail && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <FiLoader size={14} className="animate-spin text-gray-400" />
                      </div>
                    )}
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                  )}
                  {!formErrors.email && editForm.email && editForm.email !== user.email && !isCheckingEmail && (
                    <p className="text-xs text-green-500 mt-1">✓ Email is available</p>
                  )}
                </div>
              ) : (
                <p className="text-sm sm:text-base font-semibold text-gray-800 break-all">
                  {user.email}
                </p>
              )}
            </div>

            {/* Member Since */}
            <div className="sm:col-span-2">
              <label className="text-[11px] sm:text-xs text-gray-500 mb-1 flex items-center gap-2">
                <FiCalendar size={13} className="text-[#FF581B]" />
                Member Since
              </label>
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                {memberSince}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}