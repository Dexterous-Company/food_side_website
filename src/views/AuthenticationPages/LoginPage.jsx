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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setMobileNumber as setAuthMobileNumber,
  send_otp,
  verify_otp,
} from "../../redux/Authentication/AuthenticationSlice"; // Adjust the import path as needed
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { MdError } from "react-icons/md";

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
  <div className="pointer-events-none absolute inset-0 lg:hidden overflow-hidden z-0">
    <img
      src="/foof.png"
      alt="pizza"
      className="absolute -top-5 -right-3 w-65 rounded-4xl  animate-floatSlow"
    />
    <img
      src="/assets/images/shape/tacos.png"
      alt="tacos"
      className="absolute bottom-6 left-4 w-35 opacity-80 animate-floatFast"
    />
  </div>
);

const Toast = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const config = {
    success: {
      icon: <FaCheckCircle className="h-5 w-5" />,
      bgClass: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    error: {
      icon: <MdError className="h-5 w-5" />,
      bgClass: "bg-gradient-to-r from-red-500 to-rose-500",
    },
    warning: {
      icon: <FaExclamationCircle className="h-5 w-5" />,
      bgClass: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
  };

  const { icon, bgClass } = config[type] || config.success;

  return (
    <div className="fixed top-6 left-6 right-6 z-50">
      <div
        className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg ${bgClass} text-white min-w-[280px] max-w-md`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/70 hover:text-white"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const RESEND_OTP_SECONDS = 30;

const LoginForm = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state - exactly like your app
  const { login_token, isUserAuth } = useSelector(
    (state) => state.Authentication || {},
  );

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [toast, setToast] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved mobile number if "remember me" was checked
  useEffect(() => {
    const savedMobile = localStorage.getItem("restaurant_mobile");
    if (savedMobile) {
      setMobileNumber(savedMobile);
      setRememberMe(true);
    }
  }, []);

  // Redirect if already authenticated - exactly like your app
  useEffect(() => {
    if (isUserAuth && login_token) {
      router.replace("/");
    }
  }, [isUserAuth, login_token, router]);

  // Timer logic for OTP resend - exactly like your app
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timerId = setInterval(() => {
      setResendTimer((prevTimer) => (prevTimer > 1 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendTimer]);

  const showToastMessage = (message, isSuccess = true) => {
    setToast({ message, isError: !isSuccess });
  };

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const startResendTimer = () => {
    setResendTimer(RESEND_OTP_SECONDS);
  };

  const handleMobileChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) {
      setMobileNumber(cleaned);
    }

    if (showOtpInput) {
      setShowOtpInput(false);
      setOtp("");
      setResendTimer(0);
    }

    if (otpError) {
      setOtpError("");
    }
  };

  const handleOtpChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 6) {
      setOtp(cleaned);
    }

    if (otpError) {
      setOtpError("");
    }
  };

  const getErrorMessage = (error) => {
    if (typeof error === "string") {
      return error;
    }
    return error?.message || "OTP verification failed. Please try again.";
  };

  const handleChangeMobileNumber = () => {
    setShowOtpInput(false);
    setOtp("");
    setOtpError("");
    setResendTimer(0);
  };

  // Handle Send OTP - using Redux action exactly like your app
  const handleSendOtp = async () => {
    if (mobileNumber.length === 10) {
      setIsLoading(true);
      setOtpError("");

      try {
        const result = await dispatch(
          send_otp({
            mobKey: mobileNumber,
            userType: "user",
          }),
        ).unwrap();

        if (result.success) {
          setShowOtpInput(true);
          setOtp("");
          startResendTimer();
          dispatch(setAuthMobileNumber(mobileNumber));

          // Save mobile number in localStorage if remember me is checked
          if (rememberMe) {
            localStorage.setItem("restaurant_mobile", mobileNumber);
          }

          showToastMessage("OTP sent successfully to your mobile number");
        } else {
          showToastMessage(result.message || "Failed to send OTP", false);
        }
      } catch (error) {
        showToastMessage(
          error.message || "Something went wrong. Please try again.",
          false,
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      showToastMessage("Please enter a valid 10-digit mobile number", false);
    }
  };

  // Handle Resend OTP - using Redux action exactly like your app
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setOtp("");
    setOtpError("");
    setIsLoading(true);

    try {
      const result = await dispatch(
        send_otp({
          mobKey: mobileNumber,
          userType: "user",
        }),
      ).unwrap();

      if (result.success) {
        startResendTimer();
        showToastMessage("OTP resent successfully");
      } else {
        showToastMessage(result.message || "Failed to resend OTP", false);
      }
    } catch (error) {
      showToastMessage(
        error.message || "Something went wrong. Please try again.",
        false,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Submit/Verify OTP - using Redux action exactly like your app
  const handleSubmit = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      setOtpError("");

      try {
        const result = await dispatch(
          verify_otp({
            mobKey: mobileNumber,
            userType: "user",
            otp: otp,
          }),
        ).unwrap();

        if (result.success) {
          const userData = result?.data;

          if (userData) {
            showToastMessage("Login successful! Welcome back!");
            router.replace("/");
          } else {
            showToastMessage("Please complete your registration");
            dispatch(setAuthMobileNumber(mobileNumber));
            router.push(
              `/register?mobileNumber=${mobileNumber}&lockPhoneNumber=true`,
            );
          }
        } else {
          setOtpError(result.message || "Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.log("Submit error:", error);
        setOtpError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    } else {
      setOtpError("Please enter a valid 6-digit OTP");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      showOtpInput ? handleSubmit() : handleSendOtp();
    }
  };

  const isSubmitDisabled = otp.length !== 6;
  const isSendOtpEnabled = mobileNumber.length === 10;
  const canResendOtp = resendTimer === 0 && !isLoading;

  return (
    <div className="relative w-full max-w-md z-10">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.isError ? "error" : "success"}
          onClose={() => setToast(null)}
        />
      )}

      <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-2xl lg:p-10">
        <Image
          src="/main_log_fd.png"
          alt="Food Side"
          className="mx-auto h-13 w-auto object-contain mb-4"
          width={150}
          height={100}
        />

        <div className="mb-3 sm:mb-6">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-stone-900">
            Login
          </h1>
          <p className="mt-2 text-stone-500 sm:text-base text-sm">
            {!showOtpInput
              ? "Enter your mobile number to access your dashboard"
              : "Enter the 6-digit code sent to your phone"}
          </p>
        </div>

        {/* Error Message */}
        {otpError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 animate-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{otpError}</span>
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
                  value={mobileNumber}
                  maxLength={10}
                  onChange={(e) => handleMobileChange(e.target.value)}
                  onFocus={() => setFocusedField("mobile")}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                  placeholder="Enter your Mobile Number"
                  autoFocus={!showOtpInput}
                />
                {mobileNumber.length === 10 && !showOtpInput && (
                  <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                )}
              </div>
            </div>
          </div>

          {showOtpInput && (
            <div className="animate-in slide-in-from-top-5 fade-in duration-300">
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                Enter OTP Code
              </label>
              <div className="relative">
                <div
                  className={`flex items-center gap-3 rounded-xl border-2 bg-stone-50 px-5 py-3 transition-all duration-300 ${
                    otpError
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-stone-400 transition-colors hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={handleChangeMobileNumber}
                    className="sm:text-sm text-xs text-amber-600 transition-colors hover:text-amber-700 flex items-center gap-1"
                  >
                    <ArrowRight size={14} className="rotate-180" />
                    Change mobile number
                  </button>

                  {resendTimer > 0 ? (
                    <span className="sm:text-sm text-xs font-semibold text-amber-600">
                      Resend otp in {formatCountdown(resendTimer)}
                    </span>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={!canResendOtp}
                      className={`sm:text-sm text-xs font-semibold transition-colors ${
                        canResendOtp
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
        </div>

        {/* Remember Me - Only show when not in OTP step */}
        {!showOtpInput && (
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
          onClick={showOtpInput ? handleSubmit : handleSendOtp}
          disabled={
            isLoading || (showOtpInput ? isSubmitDisabled : !isSendOtpEnabled)
          }
          className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 ">
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {showOtpInput ? "Verifying..." : "Sending OTP..."}
              </>
            ) : (
              <>
                {showOtpInput ? "Verify & Login" : "Send OTP"}
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
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-3 mt-6">
        {[
          {
            icon: Shield,
            title: "Secure",
            desc: "100% protected login",
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

// --- Main LoginPage Component ---
const LoginPage = ({ onLogin }) => {
  const MobileBackgroundDecorations = () => (
    <div className="absolute inset-0 overflow-hidden lg:hidden">
      {/* Top Right Circle */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-100/50">
        <img
          src="/foof.png"
          alt="pizza"
          className="w-full h-full rounded-full "
        />
      </div>

      {/* Bottom Left Circle */}
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-100/50">
        <img
          src="/fooddd.avif"
          alt="tacos"
          className="w-full h-full object-contain rounded-full "
        />
      </div>

      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/30" />
    </div>
  );

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      {/* Left Panel - Desktop Only */}
      <DesktopLeftPanel />

      {/* Right Panel - Login Form (Responsive) */}
      <div className="relative flex flex-1 items-center justify-center bg-white p-3 sm:p-10">
        <MobileBackgroundDecorations />
        {/* <MobileFloatingImages /> */}
        <LoginForm onLoginSuccess={() => onLogin?.(true)} />
      </div>
    </div>
  );
};

export default LoginPage;
