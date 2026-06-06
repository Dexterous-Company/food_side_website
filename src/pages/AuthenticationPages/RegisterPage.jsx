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
    {/* Background Image and Overlays */}
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
      {/* Logo */}
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

      {/* Content */}
      <div className="space-y-6">
        <div className="space-y-3">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-1 backdrop-blur-sm">
            <Star className="h-3 w-3 text-amber-400" />
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
              Trusted by Food Businesses
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-5xl font-bold leading-tight text-white">
            Take Your
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Food Business Online
            </span>
            <br />& Scale Faster
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-200/90">
          Join Food Side, operated by Bollineni Ventures, and reach more
          customers with a complete food ordering and logistics ecosystem.
          Manage orders, streamline operations, and grow your revenue with our
          all-in-one platform.
        </p>

        {/* Extra Line */}
        <p className="text-xs text-amber-300/80">
          No setup fees • Easy onboarding • Full ecosystem • 24/7 support
        </p>

        {/* Stats */}
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

// Registration Form Component with Name, Email (Mandatory), Phone and OTP
const RegisterForm = ({ onRegisterSuccess }) => {
  // --- State Management ---
  const [step, setStep] = useState("details"); // "details" or "otp"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  // Field specific errors
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  });

  // Timer logic for OTP resend
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Helper to show temporary toast messages
  const showToast = (message, isError = false) => {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2 ${
      isError ? "bg-red-500 text-white" : "bg-green-500 text-white"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) {
      return "Please enter your name";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
      return "Name should only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (value) => {
    if (!value) {
      return "Phone number is required";
    }
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateOtp = (value) => {
    if (!value) {
      return "Please enter OTP";
    }
    if (!/^\d{6}$/.test(value)) {
      return "OTP must be exactly 6 digits";
    }
    return "";
  };

  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    setFieldErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      otp: "",
    });

    return !nameError && !emailError && !phoneError;
  };

  const sendOtp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call to send OTP
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if phone already exists (simulated)
      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]",
      );
      const phoneExists = existingUsers.some((user) => user.phone === phone);
      const emailExists = existingUsers.some((user) => user.email === email);

      if (phoneExists) {
        setError(
          "This phone number is already registered. Please login instead.",
        );
        showToast("Phone number already registered", true);
        setIsLoading(false);
        return;
      }

      if (emailExists) {
        setError("This email is already registered. Please login instead.");
        showToast("Email already registered", true);
        setIsLoading(false);
        return;
      }

      console.log(`Sending OTP to ${phone} for registration`);
      setStep("otp");
      setTimeLeft(30);
      showToast("OTP sent successfully to your mobile number");

      // For demo, auto-fill a test OTP (123456) for convenience
      // setOtp("123456");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      showToast("Failed to send OTP", true);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async () => {
    const otpError = validateOtp(otp);
    if (otpError) {
      setFieldErrors((prev) => ({ ...prev, otp: otpError }));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo, OTP "123456" is valid
      if (otp === "123456") {
        // Save user data
        const newUser = {
          name: name.trim(),
          email: email.trim(),
          phone: phone,
          registeredAt: new Date().toISOString(),
        };

        const existingUsers = JSON.parse(
          localStorage.getItem("registeredUsers") || "[]",
        );
        existingUsers.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

        // Store current user session
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        showToast("Registration successful! Welcome to Food Side!");
        onRegisterSuccess?.();
      } else {
        setError("Invalid OTP. Please try again.");
        setFieldErrors((prev) => ({ ...prev, otp: "Invalid OTP" }));
        showToast("Invalid OTP", true);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      showToast("Registration failed", true);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timeLeft > 0) return;

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimeLeft(30);
      setOtp("");
      showToast("OTP resent successfully");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      showToast("Failed to resend OTP", true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: validatePhone(cleaned) }));
    }
    if (error) setError("");
  };

  const handleNameChange = (value) => {
    setName(value);
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: validateName(value) }));
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleOtpChange = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 6);
    setOtp(cleaned);
    if (fieldErrors.otp) {
      setFieldErrors((prev) => ({ ...prev, otp: validateOtp(cleaned) }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      step === "details" ? sendOtp() : register();
    }
  };

  const handleBackToDetails = () => {
    setStep("details");
    setOtp("");
    setTimeLeft(0);
    setError("");
    setFieldErrors((prev) => ({ ...prev, otp: "" }));
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="relative z-10 w-full max-w-md">
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
              : `We've sent a 6-digit code to ${phone}`}
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
          <div className="space-y-2">
            {/* Name Field */}
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
                      : fieldErrors.name
                        ? "border-red-300"
                        : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <User
                    size={20}
                    className={`transition-colors ${
                      focusedField === "name"
                        ? "text-amber-500"
                        : fieldErrors.name
                          ? "text-red-400"
                          : "text-stone-400"
                    }`}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => {
                      setFocusedField(null);
                      setFieldErrors((prev) => ({
                        ...prev,
                        name: validateName(name),
                      }));
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                    placeholder="Enter your full name"
                    autoFocus
                  />
                  {name && !fieldErrors.name && (
                    <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                  )}
                </div>
              </div>
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email Field - MANDATORY */}
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
                        email: validateEmail(email),
                      }));
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                    placeholder="your@email.com"
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
                      : fieldErrors.phone
                        ? "border-red-300"
                        : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <Phone
                    size={20}
                    className={`transition-colors ${
                      focusedField === "phone"
                        ? "text-amber-500"
                        : fieldErrors.phone
                          ? "text-red-400"
                          : "text-stone-400"
                    }`}
                  />
                  <input
                    type="tel"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => {
                      setFocusedField(null);
                      setFieldErrors((prev) => ({
                        ...prev,
                        phone: validatePhone(phone),
                      }));
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                    placeholder="Enter 10-digit mobile number"
                  />
                  {phone.length === 10 && !fieldErrors.phone && (
                    <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                  )}
                </div>
              </div>
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          </div>
        )}
        {/* Action Button */}
        <button
          type="button"
          onClick={step === "details" ? sendOtp : register}
          disabled={
            isLoading ||
            (step === "details"
              ? !name ||
                !email ||
                !phone ||
                !!fieldErrors.name ||
                !!fieldErrors.email ||
                !!fieldErrors.phone
              : !otp)
          }
          className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {step === "details" && "Verifying..."}
              </>
            ) : (
              <>
                {step === "details" && "Verify & Register"}
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

// --- Main RegisterPage Component ---
const RegisterPage = ({ onRegister }) => {
  // Decorative circles for mobile background
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

export default RegisterPage;
