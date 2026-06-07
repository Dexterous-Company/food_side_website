// components/Checkout/LoginPrompt.jsx (COMPLETE WORKING CODE)
"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaLock, FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  send_otp,
  verify_otp,
  create_user,
  checkEmailExists,
  setMobileNumber as setAuthMobileNumber,
} from "../../redux/Authentication/AuthenticationSlice";

const LoginPrompt = ({ isDesktop, isUserAuth, userData, onLogin }) => {
  const dispatch = useDispatch();
  
  // Authentication states
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuth);
  
  // Registration states
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationErrors, setRegistrationErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [verifiedMobileNumber, setVerifiedMobileNumber] = useState("");

  useEffect(() => {
    setIsAuthenticated(isUserAuth);
  }, [isUserAuth]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timerId = setInterval(() => {
      setResendTimer(prevTimer => (prevTimer > 1 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [resendTimer]);

  const showToast = (message, isError = false) => {
    setToastMessage({ message, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const checkEmailIdExists = async (emailId) => {
    try {
      const exists = await checkEmailExists(emailId);
      return exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSendOtp = async () => {
    if (mobileNumber.length !== 10) {
      showToast("Please enter a valid 10-digit mobile number", true);
      return;
    }
    
    setIsAuthLoading(true);
    try {
      const result = await dispatch(send_otp({
        mobKey: mobileNumber,
        userType: "user",
      })).unwrap();
      
      if (result.success) {
        setShowOtpInput(true);
        setResendTimer(30);
        dispatch(setAuthMobileNumber(mobileNumber));
        showToast("OTP sent successfully!");
      } else {
        showToast(result.message || "Failed to send OTP", true);
      }
    } catch (error) {
      showToast(error.message || "Something went wrong", true);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsAuthLoading(true);
    setOtpError("");
    
    try {
      const result = await dispatch(verify_otp({
        mobKey: mobileNumber,
        userType: "user",
        otp: otp,
      })).unwrap();
      
      console.log("Verify OTP Response:", result);
      
      if (result.success) {
        // Check if user already has name (existing user)
        const hasName = result.data?.name && result.data.name.trim() !== "";
        
        if (hasName) {
          // Existing user - login successful
          showToast("Login successful! Welcome back!");
          setIsAuthenticated(true);
          if (onLogin) onLogin(result.data);
        } else {
          // New user - show registration form
          setVerifiedMobileNumber(mobileNumber);
          setShowRegistrationForm(true);
          setShowOtpInput(false);
          setOtp("");
          showToast("OTP verified! Please complete your registration");
        }
      } else {
        setOtpError(result.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setOtpError(error.message || "OTP verification failed");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const validateRegistration = async () => {
    const errors = {};
    
    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (fullName.trim().length < 3) {
      errors.fullName = "Name must be at least 3 characters";
    }
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Enter a valid email address";
      } else {
        const emailExists = await checkEmailIdExists(email);
        if (emailExists) {
          errors.email = "Email already registered. Please use another email.";
        }
      }
    }
    
    setRegistrationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteRegistration = async () => {
    const isValid = await validateRegistration();
    if (!isValid) return;
    
    setIsRegistering(true);
    
    try {
      const newUserData = {
        name: fullName.trim(),
        phone: verifiedMobileNumber,
        email: email.toLowerCase().trim(),
        isVerified: true,
      };
      
      console.log("Creating user:", newUserData);
      
      const createResult = await dispatch(create_user(newUserData)).unwrap();
      
      console.log("Create user response:", createResult);
      
      if (createResult.success) {
        const createdUser = createResult.user || createResult.data || newUserData;
        
        showToast(`Welcome ${fullName}! Account created successfully!`);
        setIsAuthenticated(true);
        
        if (onLogin) onLogin(createdUser);
      } else {
        setRegistrationErrors({ 
          form: createResult.message || "Failed to create account" 
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationErrors({ 
        form: error.message || "Something went wrong" 
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsAuthLoading(true);
    try {
      const result = await dispatch(send_otp({
        mobKey: mobileNumber,
        userType: "user",
      })).unwrap();
      
      if (result.success) {
        setResendTimer(30);
        showToast("OTP resent successfully!");
      } else {
        showToast(result.message || "Failed to resend OTP", true);
      }
    } catch (error) {
      showToast("Failed to resend OTP", true);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleBackToMobile = () => {
    setShowOtpInput(false);
    setOtp("");
    setOtpError("");
    setMobileNumber("");
  };

  const handleBackToOtp = () => {
    setShowRegistrationForm(false);
    setShowOtpInput(true);
    setFullName("");
    setEmail("");
    setRegistrationErrors({});
  };

  // If authenticated, show nothing
  if (isAuthenticated) {
    return null;
  }

  // Show registration form for new users
  if (showRegistrationForm) {
    return (
      <div className={isDesktop ? "mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200" : "mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"}>
        {toastMessage && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
            toastMessage.isError ? "bg-red-500" : "bg-green-500"
          } text-white`}>
            {toastMessage.isError ? "❌" : "✓"}
            <span className="text-sm">{toastMessage.message}</span>
          </div>
        )}

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FaCheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Complete Your Profile</h3>
          <p className="mt-2 text-sm text-gray-500">
            Please provide your details to create an account
          </p>
        </div>

        {registrationErrors.form && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {registrationErrors.form}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 focus-within:border-[#ff581b]">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Enter your full name"
                autoFocus
              />
            </div>
            {registrationErrors.fullName && (
              <p className="mt-1 text-xs text-red-500">{registrationErrors.fullName}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 focus-within:border-[#ff581b]">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>
            {registrationErrors.email && (
              <p className="mt-1 text-xs text-red-500">{registrationErrors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Mobile Number
            </label>
            <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-100 px-5 py-3">
              <FaPhone className="text-gray-400" />
              <input
                type="tel"
                value={verifiedMobileNumber}
                disabled
                className="w-full bg-transparent outline-none text-gray-600"
              />
            </div>
            <p className="mt-1 text-xs text-green-600">✓ Verified with OTP</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBackToOtp}
              className="flex-1 rounded-xl border-2 border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </button>
            <button
              onClick={handleCompleteRegistration}
              disabled={!fullName.trim() || !email.trim() || isRegistering}
              className="flex-1 rounded-xl bg-[#ff581b] py-3 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
            >
              {isRegistering ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show OTP input
  if (showOtpInput) {
    return (
      <div className={isDesktop ? "mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200" : "mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"}>
        {toastMessage && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
            toastMessage.isError ? "bg-red-500" : "bg-green-500"
          } text-white`}>
            {toastMessage.isError ? "❌" : "✓"}
            <span className="text-sm">{toastMessage.message}</span>
          </div>
        )}

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <FaLock className="h-8 w-8 text-[#ff581b]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Enter OTP</h3>
          <p className="mt-2 text-sm text-gray-500">
            Enter the 6-digit code sent to {mobileNumber}
          </p>
        </div>

        {otpError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {otpError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 focus-within:border-[#ff581b]">
              <FaLock className="text-gray-400" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full bg-transparent text-center text-lg tracking-widest outline-none"
                placeholder="••••••"
                autoFocus
              />
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <button
              onClick={handleBackToMobile}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <FaArrowLeft className="text-xs" />
              Change number
            </button>
            {resendTimer > 0 ? (
              <span className="text-gray-400">Resend in {resendTimer}s</span>
            ) : (
              <button onClick={handleResendOtp} className="text-[#ff581b] hover:underline">
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6 || isAuthLoading}
            className="w-full rounded-xl bg-[#ff581b] py-3 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
          >
            {isAuthLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    );
  }

  // Show mobile number input (initial state)
  return (
    <div className={isDesktop ? "mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200" : "mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"}>
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
          toastMessage.isError ? "bg-red-500" : "bg-green-500"
        } text-white`}>
          {toastMessage.isError ? "❌" : "✓"}
          <span className="text-sm">{toastMessage.message}</span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
          <FaUser className="h-8 w-8 text-[#ff581b]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Welcome Back</h3>
        <p className="mt-2 text-sm text-gray-500">
          Enter your mobile number to continue
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Mobile Number
          </label>
          <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 focus-within:border-[#ff581b]">
            <FaPhone className="text-gray-400" />
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength={10}
              className="w-full bg-transparent outline-none"
              placeholder="Enter 10-digit mobile number"
              autoFocus
            />
          </div>
        </div>

        <button
          onClick={handleSendOtp}
          disabled={mobileNumber.length !== 10 || isAuthLoading}
          className="w-full rounded-xl bg-[#ff581b] py-3 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
        >
          {isAuthLoading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPrompt;