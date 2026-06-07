// components/Checkout/AuthModal.jsx
"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  send_otp,
  verify_otp,
  setMobileNumber as setAuthMobileNumber,
} from "../../redux/Authentication/AuthenticationSlice";

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

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
      
      if (result.success) {
        showToast("Login successful! Welcome back!");
        onSuccess();
        onClose();
      } else {
        setOtpError(result.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setOtpError(error.message || "OTP verification failed");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    await handleSendOtp();
  };

  if (!isOpen) return null;

  return (
    <>
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
          toastMessage.isError ? "bg-red-500" : "bg-green-500"
        } text-white`}>
          {toastMessage.isError ? "❌" : "✓"}
          <span className="text-sm">{toastMessage.message}</span>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <FaUser className="h-8 w-8 text-[#ff581b]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-500">
              {!showOtpInput ? "Enter your mobile number to login" : "Enter the 6-digit code sent to your phone"}
            </p>
          </div>

          {otpError && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {otpError}
            </div>
          )}

          {!showOtpInput ? (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Mobile Number
                </label>
                <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-3 focus-within:border-[#ff581b]">
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
                {isAuthLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Enter OTP
                </label>
                <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-3 focus-within:border-[#ff581b]">
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
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtp("");
                    setOtpError("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Change number
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
                {isAuthLoading ? "Verifying..." : "Verify & Login"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;