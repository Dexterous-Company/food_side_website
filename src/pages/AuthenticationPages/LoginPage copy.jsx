"use client"
import React, { useState, useEffect } from 'react';
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
  TrendingUp,
} from "lucide-react";

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
    <p className="mt-3 text-sm text-stone-600">Premium Restaurant Management</p>
  </div>
);

const DesktopLeftPanel = () => (
  <div className="relative hidden w-3xl flex-col justify-between overflow-hidden lg:flex">
    {/* Background Image and Overlays */}
    <div className="absolute inset-0">
      <img
        // src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
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
            Restaurant Partner Program
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
              Trusted by Growing Restaurants
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-5xl font-bold leading-tight text-white">
            Take Your
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Restaurant Online
            </span>
            <br />& Boost Sales
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-200/90">
          Join Food Side and reach more customers in your city. Manage
          orders, increase visibility, and grow your revenue with our
          all-in-one platform, smart marketing tools, and reliable delivery
          support.
        </p>

        {/* Extra Line */}
        <p className="text-xs text-amber-300/80">
          No setup fees • Easy onboarding • 24/7 support
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Store, value: "3000+", label: "Partnered Restaurants" },
            { icon: Users, value: "150K+", label: "Orders Per Day" },
            { icon: TrendingUp, value: "50%", label: "Avg Growth" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm"
            >
              <stat.icon className="mx-auto h-5 w-5 text-amber-400" />
              <p className="mt-1 text-lg font-bold text-white">
                {stat.value}
              </p>
              <p className="text-xs text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LoginForm = ({ onLoginSuccess }) => {
  // --- State Management (Copied from provided code, without Redux) ---
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile"); // "mobile" or "otp"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Load saved mobile number if "remember me" was checked
  useEffect(() => {
    const savedMobile = localStorage.getItem("restaurant_mobile");
    if (savedMobile) {
      setMobile(savedMobile);
      setRememberMe(true);
    }
  }, []);

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

  const sendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call to send OTP
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, any 10-digit number is accepted
      // In a real app, you'd call your actual API endpoint
      console.log(`Sending OTP to ${mobile} for restaurant login`);
      
      setStep("otp");
      setTimeLeft(30);
      showToast("OTP sent successfully to your mobile number");
      
      // Optional: For demo, auto-fill a test OTP (123456) for convenience
      // setOtp("123456");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      showToast("Failed to send OTP", true);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call to verify OTP
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, OTP "123456" is valid (matches the optional auto-fill from above)
      if (otp === "123456") {
        if (rememberMe && mobile) {
          localStorage.setItem("restaurant_mobile", mobile);
        } else {
          localStorage.removeItem("restaurant_mobile");
        }
        
        showToast("Login successful! Welcome back!");
        onLoginSuccess?.();
      } else {
        setError("Invalid OTP. Please try again.");
        showToast("Invalid OTP", true);
      }
    } catch (err) {
      setError("OTP verification failed. Please try again.");
      showToast("Login failed", true);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timeLeft > 0) return;

    setIsLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  const handleMobileChange = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    setMobile(cleaned);
    // Reset to mobile step if user changes number while in OTP step
    if (step === "otp") {
      setStep("mobile");
      setOtp("");
      setTimeLeft(0);
    }
    if (error) setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      step === "mobile" ? sendOtp() : login();
    }
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full max-w-md z-10">
      <MobileHeader />

      <div className="relative rounded-3xl bg-white p-8 shadow-2xl lg:p-10">
        <div className="mb-6">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-stone-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-stone-500">
            {step === "mobile"
              ? "Enter your mobile number to access your dashboard"
              : "Enter the 6-digit code sent to your phone"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 animate-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="group">
            <label className="mb-2 block text-sm font-semibold text-stone-700">
              Mobile Number
            </label>
            <div
              className={`relative transition-all duration-300 ${
                focusedField === "mobile" ? "scale-[1.02]" : ""
              }`}
            >
              <div
                className={`flex items-center gap-3 rounded-xl border-2 bg-stone-50 px-5 py-3 transition-all duration-300 ${
                  focusedField === "mobile"
                    ? "border-amber-400 shadow-lg bg-white"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <Phone
                  size={20}
                  className={`transition-colors ${
                    focusedField === "mobile"
                      ? "text-amber-500"
                      : "text-stone-400"
                  }`}
                />
                <input
                  type="tel"
                  value={mobile}
                  maxLength={10}
                  disabled={step === "otp"}
                  onChange={(e) => handleMobileChange(e.target.value)}
                  onFocus={() => setFocusedField("mobile")}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your Mobile Number"
                  autoFocus={step === "mobile"}
                />
                {mobile.length === 10 && step === "mobile" && (
                  <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                )}
              </div>
            </div>
          </div>

          {step === "otp" && (
            <div className="animate-in slide-in-from-top-5 fade-in duration-300">
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                Enter OTP Code
              </label>
              <div className="relative">
                <div className="flex items-center gap-3 rounded-xl border-2 border-stone-200 bg-stone-50 px-5 py-3 transition-all duration-300 focus-within:border-amber-400 focus-within:shadow-lg focus-within:bg-white">
                  <LockKeyhole size={20} className="text-amber-500" />
                  <input
                    type={showPassword ? "text" : "tel"}
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                    placeholder="123456"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-stone-400 transition-colors hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-stone-500">6-digit code</span>
                  {timeLeft > 0 ? (
                    <span className="font-semibold text-amber-600">
                      Resend code in {timeLeft}s
                    </span>
                  ) : (
                    <button
                      onClick={resendOtp}
                      className="font-semibold text-amber-600 transition-colors hover:text-amber-700"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Remember Me */}
        {step === "mobile" && (
          <div className="mt-4 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="hidden"
              />
              <div className="flex h-4 w-4 items-center justify-center rounded border-2 border-orange-500 bg-white">
                {rememberMe && (
                  <svg
                    className="h-3 w-3 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-stone-600">Remember me</span>
            </label>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={step === "mobile" ? sendOtp : login}
          disabled={
            isLoading ||
            (step === "mobile"
              ? !mobile || mobile.length !== 10
              : otp.length !== 6)
          }
          className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {step === "mobile" ? "Sending OTP..." : "Verifying..."}
              </>
            ) : (
              <>
                {step === "mobile" ? "Send OTP" : "Verify & Login"}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </span>
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        </button>

        {/* Terms and Sign Up Links */}
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-400">
            By continuing, you agree to our{" "}
            <a href="#" className="text-amber-600 transition-colors hover:text-amber-700 hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-amber-600 transition-colors hover:text-amber-700 hover:underline">
              Privacy
            </a>
          </p>
          <p className="mt-2 text-xs text-stone-400">
            Don't have an account?{" "}
            <a href="#" className="text-amber-600 transition-colors hover:text-amber-700 hover:underline">
              Sign up
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

// --- Main LoginPage Component ---
const LoginPage = ({ onLogin }) => {
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
      {/* Left Panel - Desktop Only (Restaurant Image) */}
      <DesktopLeftPanel />

      {/* Right Panel - Login Form (Responsive) */}
      <div className="relative flex flex-1 items-center justify-center bg-white p-6 sm:p-10">
        <MobileBackgroundDecorations />
        <LoginForm onLoginSuccess={() => onLogin?.(true)} />
      </div>
    </div>
  );
};

export default LoginPage;