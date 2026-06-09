"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useSelector } from "react-redux";
import {
  selectCompleteDeliveryData,
  selectFormattedDate,
  selectFormattedTime,
  selectSelectedRoute,
  selectSelectedDeliveryPoint,
  selectFromLocationDetailed,
  selectTowardsLocation,
} from "@/redux/delivery/deliverySlice";
import {
  HiMapPin,
  HiTruck,
  HiCalendar,
  HiClock,
  HiBuildingStorefront,
} from "react-icons/hi2";
import {
  MdLocationOn,
  MdDeliveryDining,
  MdRoute,
  MdOutlineLocationCity,
} from "react-icons/md";
import {
  FaBoxOpen,
  FaRegCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { GiPathDistance, GiDuration } from "react-icons/gi";
import {
  FaLock,
  FaSnowflake,
  FaRotateLeft,
  FaBagShopping,
  FaChevronRight,
  FaTrashCan,
  FaUsers,
  FaFire,
  FaClock,
  FaTag,
  FaCircleCheck,
  FaArrowLeft,
  FaReceipt,
  FaTruckFast,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaApplePay,
  FaGooglePay,
  FaLeaf,
  FaLocationDot,
  FaDrumstickBite,
} from "react-icons/fa6";
import { PiPlus, PiMinus } from "react-icons/pi";
import { useRouter } from "next/navigation";

const RUPEE = "₹";
const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;

// Skeleton Loader Component
const CartSkeleton = () => {
  const router = useRouter();

  return (
    <>
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 mt-2">
        <div className="h-12 px-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <FaArrowLeft className="text-gray-700 text-xs" />
          </button>
          <h1 className="text-lg font-black text-gray-900">My Cart</h1>
          <Link href="/">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBagShopping className="text-gray-700 text-xs" />
            </button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-[1480px] py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Skeleton Delivery Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-40"></div>
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Skeleton Cart Items */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-2xl animate-pulse">
              <div className="bg-gray-900 rounded-t-2xl p-3">
                <div className="h-6 bg-gray-700 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-32"></div>
              </div>
              <div className="p-3 space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3 p-2">
                    <div className="w-[80px] h-[80px] bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skeleton Bill Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
              <div className="bg-gray-900 p-3 sm:p-4">
                <div className="h-6 bg-gray-700 rounded w-28"></div>
              </div>
              <div className="p-3 sm:p-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const {
    cartList,
    cartSummary,
    increaseItem,
    decreaseItem,
    removeItem,
    hasItems,
    isLoading,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Redux selectors for delivery information
  const completeDeliveryData = useSelector(selectCompleteDeliveryData);
  const fromLocationDetailed = useSelector(selectFromLocationDetailed);
  const towardsLocation = useSelector(selectTowardsLocation);
  const selectedRoute = useSelector(selectSelectedRoute);
  const selectedDeliveryPoint = useSelector(selectSelectedDeliveryPoint);
  const formattedDate = useSelector(selectFormattedDate);
  const formattedTime = useSelector(selectFormattedTime);

  // Get cart items from CartProvider
  const cartItems = useMemo(() => cartList ?? [], [cartList]);

  // Show skeleton while loading initially
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.newPrice || item.price || 0) * item.qty,
    0,
  );
  const formatRouteName = (value) =>
    String(value || "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  const totalSavings = cartItems.reduce(
    (sum, item) =>
      sum +
      ((item.oldPrice || item.price || 0) -
        (item.newPrice || item.price || 0)) *
        item.qty,
    0,
  );

  const total = subtotal - promoDiscount + deliveryCharge;
  const grandTotal = total;

  // Delivery information from Redux
  const pickupLocation = fromLocationDetailed || "Not selected yet";

  const route = {
    name: selectedRoute?.name || "No route selected",
    origin: selectedRoute?.origin || "Origin not set",
    destination: selectedRoute?.destination || "Destination not set",
    distanceKm: selectedRoute?.distanceKm || 0,
    durationMinutes: selectedRoute?.durationMinutes || 0,
  };

  const deliveryPoint = {
    name: selectedDeliveryPoint?.name || "No delivery point selected",
    fullAddress:
      selectedDeliveryPoint?.address?.fullAddress || "Address not available",
    city: selectedDeliveryPoint?.address?.city || "",
    state: selectedDeliveryPoint?.address?.state || "",
    pincode: selectedDeliveryPoint?.address?.pincode || "",
  };

  const journey = {
    date: formattedDate || "Date not set",
    time: formattedTime || "Time not set",
  };

  const isDeliveryComplete = completeDeliveryData?.isComplete || false;

  const formatDuration = (minutes) => {
    if (!minutes || minutes === 0) return "Duration not available";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDistance = (km) => {
    if (!km || km === 0) return "Distance not available";
    return `${km} km`;
  };

  const getFullDeliveryAddress = () => {
    const parts = [
      deliveryPoint.fullAddress,
      deliveryPoint.city,
      deliveryPoint.state,
      deliveryPoint.pincode,
    ].filter(Boolean);
    return parts.join(", ") || "Address not available";
  };

  const getPickupDisplay = () => {
    if (pickupLocation === "Not selected yet") return pickupLocation;
    return pickupLocation.length > 60
      ? `${pickupLocation.substring(0, 57)}...`
      : pickupLocation;
  };

  // Cart actions
  const updateQuantity = (id, delta) => {
    const item = cartItems.find((entry) => entry.id === id);
    if (item) {
      if (delta > 0) {
        increaseItem(item.restaurantId, item.productId);
      } else {
        decreaseItem(item.restaurantId, item.productId);
      }
    }
  };

  const removeCartItem = (id) => {
    const item = cartItems.find((entry) => entry.id === id);
    if (item) {
      removeItem(item.restaurantId, item.productId);
    }
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      cartItems.forEach((item) => {
        removeItem(item.restaurantId, item.productId);
      });
    }
  };

  const applyPromo = () => {
    if (promoCode === "RESTROVA20") {
      setAppliedPromo("RESTROVA20");
      setPromoDiscount(subtotal * 0.2);
    } else if (promoCode === "WELCOME10") {
      setAppliedPromo("WELCOME10");
      setPromoDiscount(subtotal * 0.1);
    } else if (promoCode === "" && appliedPromo) {
      // handled by remove
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const router = useRouter();

  // Veg/Non-veg badge component
  const VegBadge = ({ isVeg }) => (
    <div
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
        isVeg
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-red-100 text-red-700 border border-red-300"
      }`}
    >
      {isVeg ? (
        <FaLeaf className="text-[8px]" />
      ) : (
        <FaDrumstickBite className="text-[8px]" />
      )}
      {isVeg ? "VEG" : "NON-VEG"}
    </div>
  );

  // SVG Icons
  const FastDeliveryIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="#ff581b"
      />
      <path
        d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4z"
        fill="#ff581b"
        opacity="0.7"
      />
    </svg>
  );

  const TodayIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fill="#ff581b"
      />
      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#ff581b" />
    </svg>
  );

  const FreeShippingIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63c-.75.51-1.38 1.18-1.82 1.96H4c-1.1 0-2 .9-2 2v6h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-6c0-1.1-.9-2-2-2zm-11 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
        fill="#ff581b"
      />
    </svg>
  );

  // Show skeleton while loading
  if (isInitialLoading || isLoading) {
    return <CartSkeleton />;
  }

  // Check if cart is empty
  const isEmpty = !cartItems || cartItems.length === 0;

  if (isEmpty) {
    return (
      <>
        <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 mt-2">
          <div className="h-12 px-3 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <FaArrowLeft className="text-gray-700 text-xs" />
            </button>
            <h1 className="text-lg font-black text-gray-900">My Cart</h1>
            <Link href="/">
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <FaBagShopping className="text-gray-700 text-xs" />
              </button>
            </Link>
          </div>
        </div>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50">
          <div className="text-center p-6 max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff581b] to-orange-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaBagShopping className="text-6xl text-gray-300" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
              Looks like you haven't added anything to your cart yet. Add items
              from any restaurant and they will appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff581b] to-orange-500 text-white px-8 py-3.5 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Browse Menu
              <FaChevronRight className="text-xs" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="font-sans text-gray-600 bg-white pb-10 md:pb-0">
      {/* Mobile Cart Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 mt-2">
        <div className="h-12 px-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <FaArrowLeft className="text-gray-700 text-xs" />
          </button>
          <h1 className="text-lg font-black text-gray-900">My Cart</h1>
          <Link href="/">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBagShopping className="text-gray-700 text-xs" />
            </button>
          </Link>
        </div>
      </div>

      {/* Main Three Grid Layout */}
      <div className="container mx-auto px-4 max-w-[1480px] py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Grid 1: Delivery Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <div className="p-3 sm:p-4">
                {/* Delivery Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-gradient-to-r from-[#ff581b] to-orange-500 p-1.5 rounded-lg">
                    <FaBoxOpen className="text-white text-sm sm:text-base" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-none">
                      Delivery Information
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {subtotal >= 500
                        ? "✨ Free delivery on this order!"
                        : `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery`}
                    </p>
                  </div>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      deliveryCharge === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>

                {/* Incomplete Delivery Warning */}
                {!isDeliveryComplete && (
                  <div className="mb-4 p-2.5 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                    <div className="flex items-center gap-2">
                      <FaExclamationTriangle className="text-amber-500 text-sm" />
                      <p className="text-xs text-amber-800 font-medium">
                        Please complete all delivery details (pickup,
                        destination, route, and delivery point)
                      </p>
                    </div>
                  </div>
                )}

                {/* Savings Banner */}
                {totalSavings > 0 && (
                  <div className="bg-[#fff3ed] rounded-lg py-1.5 sm:py-2 text-center mb-3 sm:mb-4">
                    <span className="text-[#ff581b] text-xs font-bold">
                      ✨ You saved ₹{totalSavings.toFixed(2)} on this order!
                    </span>
                  </div>
                )}

                {/* Delivery Cards Grid */}
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {/* Pickup Location Card */}
                  <div className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-2 p-3">
                      <div className="bg-emerald-100 p-1.5 rounded-md">
                        <HiMapPin className="text-emerald-600 text-base sm:text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
                          Current Location
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed break-words">
                          {getPickupDisplay()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Route Card */}
                  <div className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-2 p-3">
                      <div className="bg-blue-100 p-1.5 rounded-md">
                        <MdRoute className="text-blue-600 text-base sm:text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-0.5">
                          Selected Route
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 mb-1 break-words">
                          {formatRouteName(
                            route.name !== "No route selected"
                              ? route.name
                              : `${route.origin} → ${route.destination}`,
                          )}
                        </p>
                        {route.distanceKm > 0 && (
                          <div className="flex items-center gap-3 text-[10px] text-gray-500">
                            <span className="flex items-center gap-0.5">
                              <GiPathDistance className="text-blue-500 text-[10px]" />
                              {formatDistance(route.distanceKm)}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <GiDuration className="text-blue-500 text-[10px]" />
                              {formatDuration(route.durationMinutes)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Point Card */}
                  <div className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-2 p-3">
                      <div className="bg-purple-100 p-1.5 rounded-md">
                        <MdDeliveryDining className="text-purple-600 text-base sm:text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide mb-0.5">
                          Delivery Point
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 mb-0.5 break-words">
                          {deliveryPoint.name}
                        </p>
                        {deliveryPoint.city && (
                          <p className="text-[10px] text-gray-500 flex items-center gap-0.5">
                            <MdOutlineLocationCity className="text-gray-400 text-[10px]" />
                            {deliveryPoint.city}
                            {deliveryPoint.state && `, ${deliveryPoint.state}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Card */}
                  <div className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-2 gap-2 p-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-indigo-100 p-1.5 rounded-md">
                          <HiCalendar className="text-indigo-600 text-base sm:text-lg" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide">
                            Delivery Date
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-gray-800 mt-0.5">
                            {journey.date !== "Date not set"
                              ? journey.date
                              : "Not set"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-rose-100 p-1.5 rounded-md">
                          <HiClock className="text-rose-600 text-base sm:text-lg" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-rose-600 uppercase tracking-wide">
                            Delivery Time
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-gray-800 mt-0.5">
                            {journey.time !== "Time not set"
                              ? journey.time
                              : "Not set"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100">
                  <div className="bg-[#fff3ed] text-[#ff581b] text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <FastDeliveryIcon /> Fast Delivery
                  </div>
                  <div className="bg-[#fff3ed] text-[#ff581b] text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <TodayIcon />{" "}
                    {journey.date !== "Date not set" ? journey.date : "Today"}
                  </div>
                  <div className="bg-[#fff3ed] text-[#ff581b] text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <FreeShippingIcon />{" "}
                    {subtotal >= 500
                      ? "Free shipping"
                      : `₹${deliveryCharge} shipping`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid 2: Cart Items */}
          <div className="lg:col-span-1 bg-white shadow-md rounded-2xl">
            {/* Cart Header */}
            <div className="flex bg-gray-900 rounded-t-2xl p-3 items-center justify-between gap-4 flex-wrap mb-3 sm:mb-4">
              <div>
                <div className="text-base sm:text-lg font-black text-white tracking-tight">
                  Order Items
                </div>
                <div className="text-[10px] text-gray-500 font-medium">
                  <strong className="text-[#ff581b]">{cartItems.length}</strong>{" "}
                  {cartItems.length === 1 ? "product" : "products"} in your cart
                </div>
              </div>
              <button
                onClick={clearCart}
                className="text-[10px] font-bold text-white/70 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <FaTrashCan className="text-[10px]" /> Clear Cart
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-2 sm:space-y-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2 px-2 pb-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="p-2 sm:p-3">
                    <div className="flex gap-2 sm:gap-3">
                      {/* Item Image */}
                      <div className="relative w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={
                            item.image ||
                            "https://via.placeholder.com/100x100?text=No+Image"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/100x100?text=No+Image";
                          }}
                        />
                        {item.discount && (
                          <span className="absolute top-1 left-1 bg-[#ff581b] text-white font-bold text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded-full">
                            {item.discount}
                          </span>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <VegBadge isVeg={item.isVeg} />
                            {item.oldPrice > item.newPrice && (
                              <span className="text-[8px] sm:text-[9px] font-bold bg-[#fff3ed] text-[#ff581b] px-1.5 py-0.5 rounded-full">
                                ₹{(item.oldPrice - item.newPrice).toFixed(2)}{" "}
                                OFF
                              </span>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm font-extrabold text-gray-900 mb-0.5 sm:mb-1 truncate">
                            {item.name}
                          </div>
                          <div className="text-[9px] sm:text-[10px] text-gray-500 line-clamp-1 hidden sm:block">
                            {item.subTitle}
                          </div>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between gap-2 mt-1 sm:mt-2">
                          <div>
                            <div className="text-sm sm:text-base lg:text-lg font-black text-gray-900">
                              <sup className="text-[8px] sm:text-[9px] text-[#ff581b]">
                                ₹
                              </sup>
                              {item.newPrice?.toFixed(2) ||
                                item.price?.toFixed(2)}
                            </div>
                            {item.oldPrice > item.newPrice && (
                              <div className="text-[8px] sm:text-[9px] text-gray-400 line-through">
                                ₹{item.oldPrice?.toFixed(2)}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 text-gray-700 grid place-items-center hover:bg-gray-200 transition-colors"
                            >
                              <PiMinus className="text-[10px]" />
                            </button>
                            <span className="text-xs sm:text-sm font-black text-gray-900 min-w-[20px] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ff581b] text-white grid place-items-center hover:bg-[#e84d15] transition-colors"
                            >
                              <PiPlus className="text-[10px]" />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-gray-400 hover:text-red-600 mt-1 transition-colors"
                        >
                          <FaTrashCan className="text-[9px] sm:text-[10px]" />{" "}
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid 3: Bill Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-24">
              {/* Summary Header */}
              <div className="bg-gray-900 text-white p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-black">
                  Bill Summary
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                  Review your order details
                </p>
              </div>

              <div className="p-3 sm:p-4">
                {/* Bill Details */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
                    <div className="text-xs sm:text-sm font-semibold text-gray-500">
                      Items Total
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </div>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
                      <div className="text-xs sm:text-sm font-semibold text-gray-500">
                        Items Savings
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-600">
                        - ₹{totalSavings.toFixed(2)}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
                    <div className="text-xs sm:text-sm font-semibold text-gray-500">
                      Subtotal
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      ₹{(subtotal - totalSavings).toFixed(2)}
                    </div>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
                      <div className="text-xs sm:text-sm font-semibold text-gray-500">
                        Promo Discount
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-600">
                        −₹{promoDiscount.toFixed(2)}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
                    <div className="text-xs sm:text-sm font-semibold text-gray-500">
                      Delivery Fee
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-bold ${
                        deliveryCharge === 0
                          ? "text-emerald-600"
                          : "text-gray-900"
                      }`}
                    >
                      {deliveryCharge === 0
                        ? "FREE ✓"
                        : `₹${deliveryCharge.toFixed(2)}`}
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="py-3 sm:py-4 mt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">
                        Total Amount
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[#ff581b] font-bold text-base sm:text-lg">
                          ₹
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-gray-900">
                          {grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Code Section */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex gap-2 items-stretch">
                    <div className="flex-1 relative">
                      <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px]" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code…"
                        className="w-full py-2 sm:py-2.5 pl-9 pr-3 border border-gray-200 rounded-lg sm:rounded-xl bg-white text-gray-900 text-xs outline-none focus:border-[#ff581b] focus:ring-1 focus:ring-[#ff581b]"
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-900 text-white rounded-lg sm:rounded-xl font-bold text-xs hover:bg-[#ff581b] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center gap-2 mt-2 bg-emerald-50 border border-emerald-200 rounded-lg sm:rounded-xl px-3 py-2">
                      <FaCircleCheck className="text-emerald-600 text-[11px] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] sm:text-[11px] font-extrabold text-emerald-800">
                          {appliedPromo}
                        </div>
                        <div className="text-[9px] font-semibold text-emerald-600">
                          Saving you ₹{promoDiscount.toFixed(2)}
                        </div>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-[10px] font-bold text-emerald-600 hover:text-red-600 flex-shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Free Delivery Message */}
                <div
                  className={`rounded-lg p-2 sm:p-3 flex items-center gap-2 mb-3 sm:mb-4 ${deliveryCharge === 0 ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}
                >
                  <FaCircleCheck
                    className={`${deliveryCharge === 0 ? "text-emerald-600" : "text-amber-600"} text-xs sm:text-sm flex-shrink-0`}
                  />
                  <div
                    className={`text-[10px] sm:text-xs font-semibold ${deliveryCharge === 0 ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {deliveryCharge === 0
                      ? "✨ Free delivery applied"
                      : `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery`}
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#ff581b] to-orange-500 py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  Proceed to Checkout
                  <FaChevronRight className="ml-2 text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Payment Methods */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 pt-2">
                  <FaCcVisa className="text-gray-400 text-base sm:text-lg hover:text-gray-600 transition-colors" />
                  <FaCcMastercard className="text-gray-400 text-base sm:text-lg hover:text-gray-600 transition-colors" />
                  <FaCcAmex className="text-gray-400 text-base sm:text-lg hover:text-gray-600 transition-colors" />
                  <FaApplePay className="text-gray-400 text-base sm:text-lg hover:text-gray-600 transition-colors" />
                  <FaGooglePay className="text-gray-400 text-base sm:text-lg hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
