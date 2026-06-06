"use client";
import React, { useState, useEffect } from "react";
import {
  LockKeyhole,
  Phone,
  ArrowRight,
  Shield,
  Star,
  Utensils,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Store,
  Users,
  Layers,
  TrendingUp,
  User,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  create_user,
  send_otp,
  verify_otp,
  setMobileNumber as setAuthMobileNumber,
  checkEmailExists,
  checkMobileExists,
} from "../../redux/Authentication/AuthenticationSlice";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// --- Helper Components for Responsive Design ---
const MobileHeader = () => (
  <div className="mb-8 text-center lg:hidden">
    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 shadow-sm">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-amber-400/30" />
        <Utensils className="relative h-5 w-5 text-amber-600" />
      </div>
      <span className="text-lg font-semibold text-stone-800">Food Side</span>
    </div>
    <p className="mt-3 text-sm text-stone-600">Trusted by Food Businesses</p>
  </div>
);

const DesktopLeftPanel = () => (
  <div className="relative hidden w-3xl flex-col justify-between overflow-hidden lg:flex">
    <div className="absolute inset-0">
      <img
        src="/assets/images/loginimages/login_Desktop.png"
        alt="Restaurant Interior"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/50 to-black/50" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
    <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
    <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse delay-1000" />

    <div className="relative z-10 flex h-full flex-col justify-between p-8">
      <div className="group flex cursor-pointer items-center gap-3 transition-all hover:scale-105">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-amber-400/30" />
          <div className="relative rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 shadow-xl">
            <Utensils className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-3xl font-bold tracking-tight text-white">
            Food<span className="text-amber-400">Side</span>
          </p>
          <p className="text-xs tracking-wider text-amber-300/80">
            ---- Good Food , Good Life ----
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-1 backdrop-blur-sm">
            <Star className="h-3 w-3 text-amber-400" />
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
              Trusted by Food Businesses
            </p>
          </div>

          <h2 className="text-5xl font-bold leading-tight text-white">
            Take Your
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Food Business Online
            </span>
            <br />& Scale Faster
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-gray-200/90">
          Join Food Side, operated by Bollineni Ventures, and reach more
          customers with a complete food ordering and logistics ecosystem.
          Manage orders, streamline operations, and grow your revenue with our
          all-in-one platform.
        </p>

        <p className="text-xs text-amber-300/80">
          No setup fees • Easy onboarding • Full ecosystem • 24/7 support
        </p>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Store, value: "3000+", label: "Partner Restaurants" },
            { icon: Users, value: "150K+", label: "Orders Per Day" },
            { icon: Layers, value: "8+", label: "Platform Systems" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm"
            >
              <stat.icon className="mx-auto h-5 w-5 text-amber-400" />
              <p className="mt-1 text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileFloatingImages = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden">
    <img
      src="/assets/images/shape/pizza.png"
      alt="pizza"
      className="absolute right-4 top-6 w-35 animate-floatSlow opacity-80"
    />
    <img
      src="/assets/images/shape/tacos.png"
      alt="tacos"
      className="absolute bottom-6 left-4 w-35 animate-floatFast opacity-80"
    />
  </div>
);

// Toast component for web
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg animate-in slide-in-from-top-2 ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {type === "error" ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      <span className="text-sm">{message}</span>
    </div>
  );
};

const RESEND_OTP_SECONDS = 30;

// Check email exists function

// Registration Form Component with OTP
const RegisterForm = ({ onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const { login_token, isUserAuth, mobileNumber: savedMobileNumber } = useSelector(
    (state) => state.Authentication || {}
  );

  // Step management
  const [step, setStep] = useState("details"); // "details" or "otp"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [toast, setToast] = useState(null);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  // Field specific errors
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    otp: "",
  });

  // Get route params (if coming from login with mobile number)
  const routeParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const routeMobileNumber = routeParams?.get("mobileNumber") || "";
  const lockPhoneNumber = routeParams?.get("lockPhoneNumber") === "true";
  const isPhoneEditable = !lockPhoneNumber && !isLoading && step === "details";

  // Redirect if already authenticated
  useEffect(() => {
    if (isUserAuth && login_token) {
      router.replace("/SelectRouteDelivery");
    }
  }, [isUserAuth, login_token, router]);

  // Set phone number from route params or saved mobile number
  useEffect(() => {
    const nextPhoneNumber = lockPhoneNumber
      ? routeMobileNumber || savedMobileNumber || ""
      : routeMobileNumber || "";

    if (nextPhoneNumber) {
      setPhoneNumber(
        String(nextPhoneNumber)
          .replace(/[^0-9]/g, "")
          .slice(0, 10)
      );
    }
  }, [lockPhoneNumber, routeMobileNumber, savedMobileNumber]);

  // Timer logic for OTP resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    
    const timerId = setInterval(() => {
      setResendTimer(prevTimer => (prevTimer > 1 ? prevTimer - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [resendTimer]);

  const showToastMessage = (message, isError = false) => {
    setToast({ message, isError });
  };

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  const startResendTimer = () => {
    setResendTimer(RESEND_OTP_SECONDS);
  };

  // Validation functions
  const validateFullName = (value) => {
    if (!value.trim()) {
      return "Full name is required";
    }
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
      return "Name should only contain letters and spaces";
    }
    return "";
  };

  const validateEmailField = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhoneField = (value) => {
    if (!value) {
      return "Phone number is required";
    }
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateOtpField = (value) => {
    if (!value) {
      return "Please enter OTP";
    }
    if (!/^\d{6}$/.test(value)) {
      return "OTP must be exactly 6 digits";
    }
    return "";
  };

  // Handle input changes
  const handleFullNameChange = (text) => {
    const cleaned = text.replace(/[^a-zA-Z\s]/g, "");
    setFullName(cleaned);
    if (fieldErrors.fullName) {
      setFieldErrors({ ...fieldErrors, fullName: validateFullName(cleaned) });
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text.trim().toLowerCase());
    if (fieldErrors.email) {
      setFieldErrors({ ...fieldErrors, email: validateEmailField(text) });
    }
  };

  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
      if (fieldErrors.phoneNumber) {
        setFieldErrors({ ...fieldErrors, phoneNumber: validatePhoneField(cleaned) });
      }
    }
  };

  const handleOtpChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 6) {
      setOtp(cleaned);
      if (fieldErrors.otp) {
        setFieldErrors({ ...fieldErrors, otp: validateOtpField(cleaned) });
      }
    }
  };

  const getErrorMessage = (error) => {
    if (typeof error === 'string') {
      return error;
    }
    return error?.message || 'Something went wrong. Please try again.';
  };

  // Send OTP - using Redux action
  const handleSendOtp = async () => {
    // Validate form first
    const nameError = validateFullName(fullName);
    const emailError = validateEmailField(email);
    const phoneError = validatePhoneField(phoneNumber);

    if (nameError || emailError || phoneError) {
      setFieldErrors({
        fullName: nameError,
        email: emailError,
        phoneNumber: phoneError,
        otp: "",
      });
      return;
    }

    // Check if mobile already exists
    const mobileExists = await checkMobileExists(phoneNumber);
    if (mobileExists) {
      setFieldErrors({
        ...fieldErrors,
        phoneNumber: "This mobile number is already registered. Please login instead.",
      });
      return;
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setFieldErrors({
        ...fieldErrors,
        email: "This email is already registered. Please use a different email or login.",
      });
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await dispatch(
        send_otp({
          mobKey: phoneNumber,
          userType: "user",
        })
      ).unwrap();

      if (result.success) {
        setStep("otp");
        setOtp("");
        startResendTimer();
        dispatch(setAuthMobileNumber(phoneNumber));
        showToastMessage("OTP sent successfully to your mobile number");
      } else {
        showToastMessage(result.message || "Failed to send OTP", true);
      }
    } catch (error) {
      showToastMessage(getErrorMessage(error), true);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setOtp("");
    setFieldErrors({ ...fieldErrors, otp: "" });
    setIsLoading(true);

    try {
      const result = await dispatch(
        send_otp({
          mobKey: phoneNumber,
          userType: "user",
        })
      ).unwrap();

      if (result.success) {
        startResendTimer();
        showToastMessage("OTP resent successfully");
      } else {
        showToastMessage(result.message || "Failed to resend OTP", true);
      }
    } catch (error) {
      showToastMessage(getErrorMessage(error), true);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP and create user
  const handleVerifyOtp = async () => {
    const otpError = validateOtpField(otp);
    if (otpError) {
      setFieldErrors({ ...fieldErrors, otp: otpError });
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // First verify OTP
      const verifyResult = await dispatch(
        verify_otp({
          mobKey: phoneNumber,
          userType: "user",
          otp: otp,
        })
      ).unwrap();

      if (verifyResult.success) {
        // OTP verified, now create user
        const userData = {
          name: fullName.trim(),
          phone: phoneNumber,
          email: email.toLowerCase().trim(),
          isVerified: true,
        };

        const createResult = await dispatch(create_user(userData)).unwrap();

        if (createResult.success) {
          showToastMessage(`Welcome ${fullName}! Registration successful!`);
          setTimeout(() => {
            router.replace("/SelectRouteDelivery");
          }, 500);
        } else {
          showToastMessage(
            createResult.message || "Unable to create account. Please try again.",
            true
          );
        }
      } else {
        setFieldErrors({ ...fieldErrors, otp: verifyResult.message || "Invalid OTP. Please try again." });
      }
    } catch (error) {
      const message = getErrorMessage(error);
      if (message.toLowerCase().includes("email already exists")) {
        setFieldErrors((prev) => ({
          ...prev,
          email: "This email is already registered. Please use a different email or login.",
        }));
        setStep("details");
      } else if (message.toLowerCase().includes("mobile number already exists")) {
        setFieldErrors((prev) => ({
          ...prev,
          phoneNumber: "This mobile number is already registered. Please login instead.",
        }));
        setStep("details");
      } else {
        setFieldErrors({ ...fieldErrors, otp: message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDetails = () => {
    setStep("details");
    setOtp("");
    setResendTimer(0);
    setError("");
    setFieldErrors({ ...fieldErrors, otp: "" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      step === "details" ? handleSendOtp() : handleVerifyOtp();
    }
  };

  const isDetailsDisabled = !fullName.trim() || !email.trim() || phoneNumber.length !== 10 || isLoading;
  const isOtpDisabled = otp.length !== 6 || isLoading;

  return (
    <div className="relative z-10 w-full max-w-md">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.isError ? "error" : "success"}
          onClose={() => setToast(null)}
        />
      )}

      <MobileHeader />

      <div className="relative rounded-3xl bg-white p-8 shadow-2xl lg:p-10">
        <Image
          src="/main_log_fd.png"
          alt="Food Side"
          className="mx-auto mb-4 h-13 w-auto object-contain"
          width={150}
          height={100}
        />

        <div className="mb-6">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-stone-900">
            {step === "details" ? "Create Account" : "Verify Your Number"}
          </h1>
          <p className="mt-2 text-stone-500">
            {step === "details"
              ? "Enter your details to get started with Food Side"
              : `We've sent a 6-digit code to ${phoneNumber}`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 animate-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: User Details Form */}
        {step === "details" && (
          <div className="space-y-5">
            {/* Full Name Field */}
            <div className="group">
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focusedField === "name" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`flex items-center gap-3 rounded-xl border-2 bg-stone-50 px-5 py-3 transition-all duration-300 ${
                    focusedField === "name"
                      ? "border-amber-400 shadow-lg bg-white"
                      : fieldErrors.fullName
                      ? "border-red-300"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <User
                    size={20}
                    className={`transition-colors ${
                      focusedField === "name"
                        ? "text-amber-500"
                        : fieldErrors.fullName
                        ? "text-red-400"
                        : "text-stone-400"
                    }`}
                  />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => {
                      setFocusedField(null);
                      setFieldErrors((prev) => ({
                        ...prev,
                        fullName: validateFullName(fullName),
                      }));
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                    placeholder="Enter your full name"
                    autoFocus
                    disabled={isLoading}
                  />
                  {fullName && !fieldErrors.fullName && (
                    <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                  )}
                </div>
              </div>
              {fieldErrors.fullName && (
                <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focusedField === "email" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`flex items-center gap-3 rounded-xl border-2 bg-stone-50 px-5 py-3 transition-all duration-300 ${
                    focusedField === "email"
                      ? "border-amber-400 shadow-lg bg-white"
                      : fieldErrors.email
                      ? "border-red-300"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <Mail
                    size={20}
                    className={`transition-colors ${
                      focusedField === "email"
                        ? "text-amber-500"
                        : fieldErrors.email
                        ? "text-red-400"
                        : "text-stone-400"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => {
                      setFocusedField(null);
                      setFieldErrors((prev) => ({
                        ...prev,
                        email: validateEmailField(email),
                      }));
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                  {email && !fieldErrors.email && (
                    <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                  )}
                </div>
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="group">
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focusedField === "phone" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`flex items-center gap-3 rounded-xl border-2 bg-stone-50 px-5 py-3 transition-all duration-300 ${
                    focusedField === "phone"
                      ? "border-amber-400 shadow-lg bg-white"
                      : fieldErrors.phoneNumber
                      ? "border-red-300"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <Phone
                    size={20}
                    className={`transition-colors ${
                      focusedField === "phone"
                        ? "text-amber-500"
                        : fieldErrors.phoneNumber
                        ? "text-red-400"
                        : "text-stone-400"
                    }`}
                  />
                  <input
                    type="tel"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => {
                      setFocusedField(null);
                      setFieldErrors((prev) => ({
                        ...prev,
                        phoneNumber: validatePhoneField(phoneNumber),
                      }));
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                    placeholder="Enter 10-digit mobile number"
                    disabled={!isPhoneEditable}
                  />
                  {phoneNumber.length === 10 && !fieldErrors.phoneNumber && (
                    <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                  )}
                </div>
              </div>
              {fieldErrors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                  {fieldErrors.phoneNumber}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <div className="animate-in slide-in-from-top-5 fade-in duration-300">
            <label className="mb-2 block text-sm font-semibold text-stone-700">
              Enter OTP Code
            </label>
            <div className="relative">
              <div
                className={`flex items-center gap-3 rounded-xl border-2 bg-stone-50 px-5 py-3 transition-all duration-300 ${
                  fieldErrors.otp
                    ? "border-red-500 focus-within:border-red-500"
                    : "border-stone-200 focus-within:border-amber-400 focus-within:shadow-lg focus-within:bg-white"
                }`}
              >
                <LockKeyhole size={20} className="text-amber-500" />
                <input
                  type={showPassword ? "text" : "tel"}
                  value={otp}
                  maxLength={6}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400 tracking-widest text-center text-lg"
                  placeholder="******"
                  autoFocus
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-400 transition-colors hover:text-stone-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {fieldErrors.otp && (
                <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                  {fieldErrors.otp}
                </p>
              )}

              <div className="mt-3 flex justify-between items-center">
                <button
                  onClick={handleBackToDetails}
                  className="text-sm text-amber-600 transition-colors hover:text-amber-700 flex items-center gap-1"
                  disabled={isLoading}
                >
                  <ArrowRight size={14} className="rotate-180" />
                  Edit number
                </button>

                {resendTimer > 0 ? (
                  <span className="text-sm font-semibold text-amber-600">
                    Resend code in {formatCountdown(resendTimer)}
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0 || isLoading}
                    className={`text-sm font-semibold transition-colors ${
                      resendTimer === 0 && !isLoading
                        ? "text-amber-600 hover:text-amber-700"
                        : "text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={step === "details" ? handleSendOtp : handleVerifyOtp}
          disabled={step === "details" ? isDetailsDisabled : isOtpDisabled}
          className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {step === "details" ? "Sending OTP..." : "Verifying..."}
              </>
            ) : (
              <>
                {step === "details" ? "Send OTP" : "Verify & Register"}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </span>
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        </button>

        {/* Terms and Login Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-400">
            By registering, you agree to our{" "}
            <Link
              href="/terms_conditions"
              className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
            >
              Terms
            </Link>{" "}
            &{" "}
            <Link
              href="/privacypolicy"
              className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
            >
              Privacy
            </Link>
          </p>
          <p className="mt-2 text-xs text-stone-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-6 hidden grid-cols-3 gap-3 lg:grid">
        {[
          {
            icon: Shield,
            title: "Secure",
            desc: "100% protected data",
          },
          {
            icon: TrendingUp,
            title: "Grow Sales",
            desc: "Reach more customers",
          },
          {
            icon: Users,
            title: "Support",
            desc: "24/7 assistance",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4"
          >
            <item.icon className="h-6 w-6 text-[#FF581B]" />
            <h4 className="mt-2 text-sm font-semibold">{item.title}</h4>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main RegisterPageNew Component ---
const RegisterPageNew = ({ onRegister }) => {
  const MobileBackgroundDecorations = () => (
    <div className="absolute inset-0 overflow-hidden lg:hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-100/50" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-100/50" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/30" />
    </div>
  );

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      {/* Left Panel - Desktop Only */}
      <DesktopLeftPanel />

      {/* Right Panel - Registration Form */}
      <div className="relative flex flex-1 items-center justify-center bg-white p-6 sm:p-10">
        <MobileBackgroundDecorations />
        <MobileFloatingImages />
        <RegisterForm onRegisterSuccess={() => onRegister?.(true)} />
      </div>
    </div>
  );
};

export default RegisterPageNew;