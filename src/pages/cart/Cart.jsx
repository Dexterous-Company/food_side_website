"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  FaWeightHanging,
  FaSeedling,
  FaTag,
  FaCircleCheck,
  FaArrowLeft,
  FaReceipt,
  FaTruckFast,
  FaBox,
  FaPercent,
  FaApple,
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

const Cart = () => {
  // Cart items state - using your 3 real documents
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Load cart items on mount (simulating API call with your 3 documents)
  useEffect(() => {
    // Your actual API call would be here
    // For now, using your 3 documents as the cart items
    const loadCartItems = () => {
      // These are your actual 3 documents from the backend
      const items = [
        {
          id: "69fb08d8eab765dad2e24bec",
          name: "Dal Tadka",
          description: "Classic North Indian dal made with yellow lentils, tempered with ghee, garlic, cumin, and traditional spices. Best enjoyed with jeera rice or roti.",
          price: 180,
          discount_price: 159,
          image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778059478/Menu/Items/omuhmif1ccn8givy62mc.jpg",
          isVeg: true,
          rating: 5,
          recommended: true,
          trending: false,
          estimateTimePrepareMenuItem: 25,
          quantity: 1,
          category: "Main Course · Dal",
          serves: "Serves 3",
          kcal: "320 kcal",
          shipTime: "Ready in 25 min",
          tags: ["Lentils", "Tempered", "Gluten Free"],
          badge: "Trending",
          badgeColor: "primary",
          stock: 40,
        },
        {
          id: "69fb2b2aeab765dad2e24edc",
          name: "Tandoori Aloo",
          description: "Baby potatoes marinated in a spicy yogurt-based masala with traditional Indian spices, then roasted in a tandoor until crispy outside and soft inside. Served with mint chutney and fresh salad.",
          price: 280,
          discount_price: 239,
          image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778068263/Menu/Items/e3uqkic6v975bzdgcea6.jpg",
          isVeg: true,
          rating: 5,
          recommended: true,
          trending: true,
          estimateTimePrepareMenuItem: 25,
          quantity: 1,
          category: "Starters · Tandoor",
          serves: "Serves 2",
          kcal: "450 kcal",
          shipTime: "Ready in 25 min",
          tags: ["Tandoori", "Crispy", "Gluten Free"],
          badge: "Bestseller",
          badgeColor: "dark",
          stock: 35,
        },
        {
          id: "69fb0ab5eab765dad2e24c32",
          name: "Mutton Rogan Josh",
          description: "Authentic North Indian mutton curry made with tender mutton pieces slow-cooked in rich onion-tomato gravy and aromatic spices. Best paired with naan or steamed rice.",
          price: 420,
          discount_price: 389,
          image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778059954/Menu/Items/fmlanxng2opcrf0bkjh5.jpg",
          isVeg: false,
          rating: 5,
          recommended: true,
          trending: true,
          estimateTimePrepareMenuItem: 40,
          quantity: 1,
          category: "Main Course · Mutton",
          serves: "Serves 2",
          kcal: "680 kcal",
          shipTime: "Ready in 40 min",
          tags: ["Signature", "Tender Meat", "Slow Cooked"],
          badge: "Chef's Special",
          badgeColor: "green",
          stock: 18,
        },
      ];

      setCartItems(items);
      setLoading(false);
    };

    loadCartItems();
  }, []);

  // Calculate subtotal (using discounted price if available)
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.discount_price || item.price) * item.quantity,
    0
  );

  // Dynamic delivery charge: free if subtotal >= 500, else ₹40
  const deliveryCharge = subtotal >= 500 ? 0 : 40;

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.quantity + delta, item.stock)) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
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

  const total = subtotal - promoDiscount + deliveryCharge;
  // const vat = total * 0.05; // 5% VAT
  const grandTotal = total;
  const totalSavings = cartItems.reduce(
    (sum, item) =>
      sum +
      ((item.price - (item.discount_price || item.price)) * item.quantity),
    0
  ) + promoDiscount;

  // Veg/Non-veg badge component
  const VegBadge = ({ isVeg }) => (
    <div
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${isVeg
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
      <path
        d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
        fill="#ff581b"
      />
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

  const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="#ff581b"
      />
    </svg>
  );

  if (loading) {
    return (
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ff581b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-600 bg-gray-50 ">
      {/* Mobile Cart Header */}
<div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 mt-2">
  <div className="h-12 px-3 flex items-center justify-between">

    {/* Back Button */}
    <button
      onClick={() => window.history.back()}
      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
    >
      <FaArrowLeft className="text-gray-700 text-xs" />
    </button>

    {/* Title */}
    <h1 className=" text-lg font-black text-gray-900">
      My Cart
    </h1>

    {/* Right Icon */}
    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
      <FaBagShopping className="text-gray-700 text-xs" />
    </button>

  </div>
</div>
      {/* Breadcrumb Section */}
      <section className="hidden md:flex relative h-[250px] bg-black items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/page-banner.jpg')] bg-cover bg-center opacity-100"></div>
        <div className="container relative z-10 mx-auto px-4 max-w-[1480px]">
          <div className="text-white">
            <div className="flex items-center gap-2 font-['Yesteryear',cursive] text-xl text-[#ff581b] mb-1">
              <span className="w-7 h-0.5 bg-[#ff581b] rounded-full"></span>
              Cart
            </div>
            <h2 className=" text-4xl md:text-5xl font-extrabold text-white mb-0.5">
              Your <span className="text-[#ff581b] font-['Yesteryear',cursive]">Cart</span>
            </h2>
            <p className="text-white/70 text-xs">
              Review your selected items and manage your order before checkout.
            </p>
          </div>
          <div className="absolute bottom-3 right-0 flex items-center gap-2 text-xs font-semibold">
            <Link href="/" className="text-white hover:text-[#ff581b]">
              Home
            </Link>
            <FaChevronRight className="text-white text-[8px]" />
            <span className="text-[#ff581b]">Cart</span>
          </div>
        </div>
      </section>

      {/* Delivery Information Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-[1480px] py-3">
          {/* Savings Banner */}
          {totalSavings > 0 && (
            <div className="bg-[#fff3ed] rounded-lg py-1.5 text-center mb-3">
              <span className="text-[#ff581b] text-xs font-bold">
                ✨ You saved ₹{totalSavings.toFixed(2)} on this order!
              </span>
            </div>
          )}

          {/* Delivery Card */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
            {/* Header Section - Delivery Address & Free Delivery Badge */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ff581b] flex items-center justify-center flex-shrink-0">
                  <FaLocationDot className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-sm leading-none">
                    Delivery Information
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {subtotal >= 500
                      ? "✨ Free delivery on this order!"
                      : `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery`}
                  </p>
                </div>
              </div>
              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full w-fit ${deliveryCharge === 0
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
                  }`}
              >
                {deliveryCharge === 0 ? "FREE DELIVERY" : `₹${deliveryCharge} DELIVERY`}
              </span>
            </div>

            {/* Desktop Version - Professional Delivery Details Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-3">
              {/* Current Location */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <FaLocationDot className="text-blue-500 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-0.5">
                      Current Location
                    </p>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">
                      203 Kalyan Nagar
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Hyderabad</p>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-500">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-0.5">
                      Route
                    </p>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">
                      NH 44
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">575 km - 587 mins</p>
                  </div>
                </div>
              </div>

              {/* Delivery Point */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-0.5">
                      Delivery Point
                    </p>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">
                      Bengaluru Delivery
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Whitefield, Bengaluru</p>
                  </div>
                </div>
              </div>

              {/* Delivery Date & Time */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-amber-500">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-0.5">
                      Delivery
                    </p>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight">
                      06-06-2026
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">10:54 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Version - Stacked Design (COMPLETELY UNCHANGED) */}
            <div className="md:hidden">
              <div className="mt-3">
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <div className="w-[1.5px] h-[45px] bg-gray-300"></div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase text-gray-400 tracking-wide">
                      Pickup Location
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 leading-5">
                      Restrova Kitchen, Hitech City, Hyderabad
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-0">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff581b]"></div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase text-gray-400 tracking-wide">
                      Deliver To
                    </div>
                    <button className="text-xs font-semibold text-gray-900 hover:text-[#ff581b]">
                      8-3-199, Kalyan Nagar, Hyderabad
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tags - Common */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-2 border-t border-gray-100">
              <div className="bg-[#fff3ed] text-[#ff581b] text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                <FastDeliveryIcon /> Fast Delivery
              </div>
              <div className="bg-[#fff3ed] text-[#ff581b] text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                <TodayIcon /> Today • 10:30 AM
              </div>
              <div className="bg-[#fff3ed] text-[#ff581b] text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                <FreeShippingIcon />{" "}
                {subtotal >= 500 ? "Free shipping" : `₹${deliveryCharge} shipping`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cart Section */}
      <section className="py-8 md:py-10 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1480px]">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-6 items-start">
            {/* LEFT: CART ITEMS */}
            <div>
              <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                <div>
                  <div className=" text-lg font-black text-gray-900 tracking-tight">
                    Order Items
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    <strong className="text-[#ff581b] font-['Raleway',sans-serif]">
                      {cartItems.length}
                    </strong>{" "}
                    products in your cart
                  </div>
                </div>
                <button
                  onClick={clearCart}
                  className="text-[10px] font-bold text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <FaTrashCan className="text-[10px]" /> Clear Cart
                </button>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-100 overflow-hidden mb-3 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="hidden md:block h-0.5 bg-gradient-to-r from-[#ff581b] to-[#ff581b]/25"></div>

                  {/* Desktop View - NO CHANGES */}
                  <div className="hidden md:grid md:grid-cols-[100px_1fr_auto] gap-3 p-3">
                    <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden flex-shrink-0 group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x100?text=No+Image";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      {item.badge && (
                        <span
                          className={`absolute top-2 left-2 text-white font-bold text-[8px] tracking-[1px] uppercase px-1.5 py-0.5 rounded-full backdrop-blur-sm z-10 shadow-sm ${item.badgeColor === "primary"
                            ? "bg-[#ff581b]"
                            : item.badgeColor === "dark"
                              ? "bg-gray-900"
                              : "bg-emerald-700"
                            }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[#ff581b]">
                            {item.category || "Main Course"}
                          </div>
                          <VegBadge isVeg={item.isVeg} />
                          {item.recommended && (
                            <span className="text-[8px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                              ⭐ Recommended
                            </span>
                          )}
                          {item.trending && (
                            <span className="text-[8px] font-bold text-[#ff581b] bg-[#fff3ed] px-1.5 py-0.5 rounded-full">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        <div className=" text-sm font-extrabold text-gray-900 leading-tight mb-1.5 line-clamp-1">
                          {item.name}
                        </div>

                        <div className="flex gap-2 flex-wrap mb-1.5">
                          {item.serves && (
                            <span className="flex items-center gap-1 text-[9px] font-medium text-gray-600">
                              <FaUsers className="text-[#ff581b] text-[8px]" /> {item.serves}
                            </span>
                          )}
                          {item.kcal && (
                            <span className="flex items-center gap-1 text-[9px] font-medium text-gray-600">
                              <FaFire className="text-[#ff581b] text-[8px]" /> {item.kcal}
                            </span>
                          )}
                          {item.shipTime && (
                            <span className="flex items-center gap-1 text-[9px] font-medium text-gray-600">
                              <FaClock className="text-[#ff581b] text-[8px]" /> {item.shipTime}
                            </span>
                          )}
                          {item.estimateTimePrepareMenuItem && (
                            <span className="flex items-center gap-1 text-[9px] font-medium text-gray-600">
                              <FaClock className="text-[#ff581b] text-[8px]" /> Ready in {item.estimateTimePrepareMenuItem} min
                            </span>
                          )}
                        </div>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[8px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-2 min-w-[100px]">
                      <div className="text-right">
                        <div className=" text-lg font-black text-gray-900 leading-none tracking-tight">
                          <sup className="text-[10px] text-[#ff581b]">₹</sup>
                          {item.discount_price || item.price}
                        </div>
                        {item.discount_price && item.discount_price < item.price && (
                          <div className="flex flex-col items-end gap-0.5 mt-1">
                            <div className="text-[9px] text-gray-400 line-through font-medium">
                              Was ₹{item.price}
                            </div>
                            <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                              Save ₹{item.price - item.discount_price}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center bg-white rounded-full p-1 gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white text-gray-700 grid place-items-center shadow-sm hover:bg-gray-50 transition-all"
                        >
                          <PiMinus className="text-[10px]" />
                        </button>

                        <span className=" text-sm font-black text-gray-900 min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-[#ff581b] text-white grid place-items-center shadow-sm hover:bg-[#e84d15] transition-all"
                          disabled={item.quantity >= item.stock}
                        >
                          <PiPlus className="text-[10px]" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <FaTrashCan className="text-[10px]" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Mobile View - FIXED: Smaller images, single price, icon-only veg/nonveg */}
                  <div className="md:hidden">
                    <div className="p-3">
                      <div className="flex gap-2">
                        {/* Smaller Image - 70x70 */}
                        <div className="relative w-[70px] h-[70px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/70x70?text=No+Image";
                            }}
                          />
                          {item.badge && (
                            <span
                              className={`absolute top-1 left-1 text-white font-bold text-[6px] tracking-[1px] uppercase px-1 py-0.5 rounded-full backdrop-blur-sm z-10 ${item.badgeColor === "primary"
                                ? "bg-[#ff581b]"
                                : item.badgeColor === "dark"
                                  ? "bg-gray-900"
                                  : "bg-emerald-700"
                                }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col gap-1">
                          {/* Category and Veg/NonVeg Icon Only - No Text */}
                          <div className="flex items-center justify-between">
                            <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[#ff581b]">
                              {item.category || "Main Course"}
                            </div>
                            {/* Icon only - green leaf for veg, red drumstick for nonveg */}
                            {/*  */}
                          </div>

                          {/* Product Name */}
                          <div className=" text-sm font-extrabold text-gray-900 leading-tight">
                            {item.name}
                          </div>

                          {/* Price Section - Only one price (no duplicate near remove) */}
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <div className=" text-base font-black text-gray-900">
                              <sup className="text-[9px] text-[#ff581b]">₹</sup>
                              {item.discount_price || item.price}
                            </div>
                            {item.discount_price && item.discount_price < item.price && (
                              <>
                                <div className="text-[8px] text-gray-400 line-through">
                                  ₹{item.price}
                                </div>
                                <div className="text-[7px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-full">
                                  Save ₹{item.price - item.discount_price}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Quantity and Total Row - Removed duplicate price */}
                          <div className="flex items-center justify-between mt-1">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-white rounded-full p-1 gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 rounded-full bg-white text-gray-700 grid place-items-center shadow-sm"
                              >
                                <PiMinus className="text-[10px]" />
                              </button>

                              <span className=" font-black min-w-[20px] text-center text-sm">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 rounded-full bg-[#ff581b] text-white grid place-items-center shadow-sm"
                                disabled={item.quantity >= item.stock}
                              >
                                <PiPlus className="text-[10px]" />
                              </button>
                            </div>

                            {/* Only Remove Button - No duplicate price */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <FaTrashCan className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="mt-4">
                <div className="flex gap-2 items-stretch">
                  <div className="flex-1 relative">
                    <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px]" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code…"
                      className="w-full py-2.5 pl-9 pr-3 border border-gray-200 rounded-xl bg-white text-gray-900 text-xs outline-none focus:border-[#ff581b] focus:shadow-[0_0_0_2px_rgba(255,88,27,0.1)] transition-all"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    className="px-5 py-2.5 bg-gray-900 text-white rounded-xl  font-bold text-xs hover:bg-[#ff581b] transition-colors whitespace-nowrap shadow-sm"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center gap-2 mt-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                    <FaCircleCheck className="text-emerald-600 text-[11px] flex-shrink-0" />
                    <div className="flex-1">
                      <div className=" text-[11px] font-extrabold text-emerald-800 tracking-wide">
                        {appliedPromo}
                      </div>
                      <div className="text-[9px] font-semibold text-emerald-600">
                        {appliedPromo === "RESTROVA20"
                          ? "20% off applied"
                          : "10% off applied"}{" "}
                        — saving you ₹{promoDiscount.toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-[10px] font-bold text-emerald-600 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Continue Shopping */}
              <div className="mt-5 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-[2px] bg-[#ff581b] rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff581b]">
                    Customer Confidence
                  </span>
                </div>
                <h3 className=" text-sm md:text-xl font-black text-gray-900 tracking-tight">
                  Why Customers Trust Us
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md">
                  Secure payments, fresh delivery, and hassle-free service with every order.
                </p>
              </div>

              {/* Trust Badges */}
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 mt-6 md:grid-cols-3">
                {/* Badge 1 */}
                <div className="bg-white rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-all md:p-3 p-2">
                  <div className="rounded-lg bg-[#ff581b]/10 border border-[#ff581b]/20 grid place-items-center mx-auto mb-1 text-[#ff581b] md:w-8 md:h-8 w-6 h-6">
                    <FaLock className="md:text-sm text-xs" />
                  </div>
                  <div className=" font-extrabold text-gray-900 leading-tight md:text-[11px] text-[9px]">
                    Secure<br />Checkout
                  </div>
                  <div className="text-gray-500 mt-0.5 md:text-[9px] text-[7px]">256-bit SSL</div>
                </div>

                {/* Badge 2 */}
                <div className="bg-white rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-all md:p-3 p-2">
                  <div className="rounded-lg bg-[#ff581b]/10 border border-[#ff581b]/20 grid place-items-center mx-auto mb-1 text-[#ff581b] md:w-8 md:h-8 w-6 h-6">
                    <FaSnowflake className="md:text-sm text-xs" />
                  </div>
                  <div className=" font-extrabold text-gray-900 leading-tight md:text-[11px] text-[9px]">
                    Cold Chain<br />Guaranteed
                  </div>
                  <div className="text-gray-500 mt-0.5 md:text-[9px] text-[7px]">Fresh arrival</div>
                </div>

                {/* Badge 3 */}
                <div className="bg-white rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-all md:p-3 p-2">
                  <div className="rounded-lg bg-[#ff581b]/10 border border-[#ff581b]/20 grid place-items-center mx-auto mb-1 text-[#ff581b] md:w-8 md:h-8 w-6 h-6">
                    <FaRotateLeft className="md:text-sm text-xs" />
                  </div>
                  <div className=" font-extrabold text-gray-900 leading-tight md:text-[11px] text-[9px]">
                    Easy<br />Returns
                  </div>
                  <div className="text-gray-500 mt-0.5 md:text-[9px] text-[7px]">7-day hassle</div>
                </div>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-none md:shadow-md flex flex-col">
                {/* Desktop Header - COMPLETELY UNCHANGED */}
                <div className="hidden md:flex items-center gap-2 p-4 bg-gray-900">
                  <div className="w-8 h-8 rounded-lg bg-[#ff581b]/20 border border-[#ff581b]/30 grid place-items-center text-[#ff581b] text-base">
                    <FaReceipt className="text-base" />
                  </div>
                  <div>
                    <div className=" text-sm font-black text-white tracking-tight">
                      Order Summary
                    </div>
                    <div className="text-[10px] text-white/35 font-medium">
                      {cartItems.length} items
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 border-t-0 rounded-b-xl overflow-hidden flex flex-col">
                  {/* Desktop View - COMPLETELY UNCHANGED */}
                  <div className="hidden md:block">
                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-2 px-4 py-2 border-b border-gray-100 bg-[#ff581b]/5"
                        >
                          <div className="flex-1 min-w-0">
                            <div className=" text-xs font-bold text-gray-900 leading-tight truncate">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                              Qty: {item.quantity}
                            </div>
                          </div>
                          <div className=" text-sm font-extrabold text-gray-900 whitespace-nowrap">
                            ₹{((item.discount_price || item.price) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {cartItems.length === 0 && (
                      <div className="px-4 py-6 text-center text-gray-400 text-sm">
                        <FaBagShopping className="text-2xl mx-auto mb-2 opacity-50" />
                        Your cart is empty
                      </div>
                    )}

                    <div className="h-px bg-gradient-to-r from-transparent via-[#ff581b]/30 to-transparent my-0.5 mx-4"></div>

                    <div className="pt-0.5">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                        <div className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                          <FaReceipt className="text-[#ff581b] text-[10px]" /> Subtotal
                        </div>
                        <div className=" text-sm font-bold text-gray-900">
                          ₹{subtotal.toFixed(2)}
                        </div>
                      </div>
                      {promoDiscount > 0 && (
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                            <FaTag className="text-[#ff581b] text-[10px]" /> Promo
                          </div>
                          <div className=" text-sm font-bold text-emerald-600">
                            −₹{promoDiscount.toFixed(2)}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                        <div className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                          <FaTruckFast className="text-[#ff581b] text-[10px]" /> Delivery
                        </div>
                        <div className={` text-sm font-bold ${deliveryCharge === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                          {deliveryCharge === 0 ? "Free ✓" : `₹${deliveryCharge.toFixed(2)}`}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-4 flex items-center justify-between gap-3 border-t border-gray-100 bg-white rounded-b-xl">
                      <div>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                          Total
                        </div>
                        {promoDiscount > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                            <div className="text-[9px] font-medium text-emerald-600">
                              Saved ₹{promoDiscount.toFixed(2)}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[#ff581b] font-bold text-sm">₹</span>
                          <span className=" text-3xl font-black text-gray-900 leading-none tracking-tight">
                            {grandTotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-[8px] text-gray-400">inc. all taxes</div>
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center gap-2">
                      <FaCircleCheck className="text-emerald-600 text-xs" />
                      <div className="text-[11px] font-semibold text-emerald-600">
                        {deliveryCharge === 0
                          ? "✨ Free delivery applied"
                          : `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery`}
                      </div>
                    </div>

                    <div className="px-4 py-3">
                      <Link
                        href="/checkout"
                        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#ff581b] py-3 px-5  text-xs font-bold uppercase text-white shadow-md transition-all duration-300 hover:bg-[#e84d15] hover:shadow-lg"
                      >
                        <span className="absolute top-0 left-[-180%] h-full w-[35%] rotate-12 bg-white/30 blur-lg transition-all duration-[1500ms] ease-out group-hover:left-[180%]"></span>
                        <span className="relative z-10 flex items-center gap-2">
                          Proceed to Checkout
                          <FaChevronRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </div>

                    <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold tracking-[1px] uppercase text-gray-500">
                        We accept
                      </span>
                      <div className="flex gap-1 flex-wrap items-center">
                        <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800">
                          <FaCcVisa />
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800">
                          <FaCcMastercard />
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800">
                          <FaCcAmex />
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800">
                          <FaApplePay />
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800">
                          <FaGooglePay />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile View - CLEAN DESIGN */}
                  <div className="md:hidden">
                    <div className="p-4">
                      {/* Order Summary Heading - Orange Color */}
                      <div className=" text-lg font-black text-[#ff581b] mb-4">
                        Order Summary
                      </div>

                      {/* Bill Details */}
                      <div className=" text-sm font-bold text-gray-700 mb-2">
                        Bill Details
                      </div>

                      {/* Items Total */}
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-gray-600 text-sm">Items Total</span>
                        <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                      </div>

                      {/* Item Savings */}
                      {totalSavings > 0 && (
                        <div className="flex justify-between items-center py-1.5">
                          <span className="text-gray-600 text-sm">Item Savings</span>
                          <span className="font-semibold text-emerald-600">- ₹{totalSavings.toFixed(2)}</span>
                        </div>
                      )}

                      {/* Promo Discount */}
                      {promoDiscount > 0 && (
                        <div className="flex justify-between items-center py-1.5">
                          <span className="text-gray-600 text-sm">Promo Discount</span>
                          <span className="font-semibold text-emerald-600">- ₹{promoDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      {/* Delivery Fee */}
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-gray-600 text-sm">Delivery Fee</span>
                        <span className={`font-semibold ${deliveryCharge === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                          {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-3"></div>

                      {/* Grand Total */}
                      <div className="flex justify-between items-center py-1.5 mb-2">
                        <span className=" text-base font-black text-gray-900">Grand Total</span>
                        <span className=" text-xl font-black text-orange-500">₹{grandTotal.toFixed(2)}</span>
                      </div>

                      {/* Savings Message */}
                      {(totalSavings > 0 || promoDiscount > 0) && (
                        <div className="bg-emerald-50 rounded-lg px-3 py-2 mb-3">
                          <span className="text-emerald-700 text-xs font-semibold">
                            You saved ₹{(totalSavings + promoDiscount).toFixed(2)} on this order
                          </span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mb-4">
                        <button className="flex-1 bg-gray-100 rounded-full py-2 text-xs font-semibold text-gray-700">
                          No Contact
                        </button>
                        <button className="flex-1 bg-gray-100 rounded-full py-2 text-xs font-semibold text-gray-700">
                          Priority
                        </button>
                        <button className="flex-1 bg-gray-100 rounded-full py-2 text-xs font-semibold text-gray-700">
                          Eco Friendly
                        </button>
                      </div>

                      {/* Total Amount and Proceed Button - Side by Side */}
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-gray-500 text-xs mb-0.5">Total Amount</div>
                          <div className=" text-2xl font-black text-gray-900">
                            ₹{grandTotal.toFixed(2)}
                          </div>
                        </div>
                        <Link
                          href="/checkout"
                          className="bg-[#ff581b] rounded-full py-3 px-5  text-sm font-bold uppercase text-white whitespace-nowrap inline-flex items-center justify-center"
                        >
                          Proceed to Pay
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff581b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e04e16;
        }
      `}</style>
    </div>
  );
};

export default Cart;