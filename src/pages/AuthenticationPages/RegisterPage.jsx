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
  checkEmailExists,
  checkMobileExists,
  create_user,
  setMobileNumber as setAuthMobileNumber,
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

// Check email exists function


// Check mobile exists function


// Registration Form Component with Redux
const RegisterForm = ({ onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const { login_token, isUserAuth, mobileNumber: savedMobileNumber } = useSelector(
    (state) => state.Authentication || {}
  );

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  // Get route params (if coming from login with mobile number)
  const routeParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const routeMobileNumber = routeParams?.get("mobileNumber") || "";
  const lockPhoneNumber = routeParams?.get("lockPhoneNumber") === "true";
  const isPhoneEditable = !lockPhoneNumber && !isLoading;

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
    } else {
      setPhoneNumber("");
    }
  }, [lockPhoneNumber, routeMobileNumber, savedMobileNumber]);

  const showToastMessage = (message, isError = false) => {
    setToast({ message, isError });
  };

  // Handle full name input
  const handleFullNameChange = (text) => {
    const cleaned = text.replace(/[^a-zA-Z\s]/g, "");
    setFullName(cleaned);
    if (errors.fullName) {
      setErrors({ ...errors, fullName: "" });
    }
  };

  // Handle phone number input
  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
      if (errors.phoneNumber) {
        setErrors({ ...errors, phoneNumber: "" });
      }
    }
  };

  // Handle email input
  const handleEmailChange = (text) => {
    setEmail(text.trim().toLowerCase());
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  // Validate email format
  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr.trim());
  };

  // Validate form - exactly like your React Native app
  const validateForm = async () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    } else {
      // Check if mobile already exists
      const mobileExists = await checkMobileExists(phoneNumber);
      if (mobileExists) {
        newErrors.phoneNumber =
          "This mobile number is already registered. Please login instead.";
      }
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        newErrors.email =
          "This email is already registered. Please use a different email or login.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Register button press - using Redux action exactly like your app
  const handleRegister = async () => {
    const isValid = await validateForm();
    if (isValid) {
      setIsLoading(true);

      try {
        const userData = {
          name: fullName.trim(),
          phone: phoneNumber,
          email: email.toLowerCase().trim(),
          isVerified: true,
        };

        const result = await dispatch(create_user(userData)).unwrap();

        if (result.success) {
          showToastMessage(`Welcome ${fullName}! Registration successful!`);
          setTimeout(() => {
            router.replace("/SelectRouteDelivery");
          }, 500);
        } else {
          showToastMessage(
            result.message || "Unable to create account. Please try again.",
            true
          );
        }
      } catch (error) {
        const message =
          typeof error === "string"
            ? error
            : error?.message || "Something went wrong. Please try again.";

        if (message.toLowerCase().includes("email already exists")) {
          setErrors((prev) => ({
            ...prev,
            email:
              "This email is already registered. Please use a different email or login.",
          }));
        } else if (
          message.toLowerCase().includes("mobile number already exists")
        ) {
          setErrors((prev) => ({
            ...prev,
            phoneNumber:
              "This mobile number is already registered. Please login instead.",
          }));
        } else {
          showToastMessage(message, true);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  // Check if register button should be disabled
  const isRegisterDisabled =
    !fullName.trim() ||
    phoneNumber.length !== 10 ||
    !email.trim() ||
    !isValidEmail(email) ||
    isLoading;

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
            Create Account
          </h1>
          <p className="mt-2 text-stone-500">
            Join FoodSide and start ordering your favorite meals
          </p>
        </div>

        {/* Error Message */}
        {errors.formError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 animate-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errors.formError}</span>
          </div>
        )}

        <div className="space-y-2">
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
                    : errors.fullName
                      ? "border-red-300"
                      : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <User
                  size={20}
                  className={`transition-colors ${
                    focusedField === "name"
                      ? "text-amber-500"
                      : errors.fullName
                        ? "text-red-400"
                        : "text-stone-400"
                  }`}
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => handleFullNameChange(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                  placeholder="Enter your full name"
                  autoFocus
                  disabled={isLoading}
                />
                {fullName && !errors.fullName && (
                  <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                )}
              </div>
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
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
                    : errors.phoneNumber
                      ? "border-red-300"
                      : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <Phone
                  size={20}
                  className={`transition-colors ${
                    focusedField === "phone"
                      ? "text-amber-500"
                      : errors.phoneNumber
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
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                  placeholder="Enter 10-digit mobile number"
                  disabled={!isPhoneEditable}
                />
                {phoneNumber.length === 10 && !errors.phoneNumber && (
                  <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                )}
              </div>
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                {errors.phoneNumber}
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
                    : errors.email
                      ? "border-red-300"
                      : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <Mail
                  size={20}
                  className={`transition-colors ${
                    focusedField === "email"
                      ? "text-amber-500"
                      : errors.email
                        ? "text-red-400"
                        : "text-stone-400"
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
                {email && !errors.email && isValidEmail(email) && (
                  <CheckCircle className="h-5 w-5 text-green-500 animate-in zoom-in" />
                )}
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Register Button */}
        <button
          type="button"
          onClick={handleRegister}
          disabled={isRegisterDisabled}
          className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </span>
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        </button>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-sm text-stone-400">Or</span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-amber-600 transition-colors hover:text-amber-700"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-400">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms_conditions"
              className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacypolicy"
              className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
            >
              Privacy Policy
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