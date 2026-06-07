"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext"; // Adjust path as needed
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

const RUPEE = '₹';
const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;

const Cart = () => {
  const { 
    cartList, 
    cartSummary, 
    increaseItem, 
    decreaseItem, 
    removeItem,
    hasItems 
  } = useCart();
  
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Get cart items from CartProvider
  const cartItems = useMemo(() => cartList ?? [], [cartList]);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.newPrice * item.qty,
    0
  );

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  
  const totalSavings = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice - item.newPrice) * item.qty,
    0
  );

  const total = subtotal - promoDiscount + deliveryCharge;
  const grandTotal = total;

  // Cart actions
  const updateQuantity = (id, delta) => {
    const item = cartItems.find(entry => entry.id === id);
    if (item) {
      if (delta > 0) {
        increaseItem(item.restaurantId, item.productId);
      } else {
        decreaseItem(item.restaurantId, item.productId);
      }
    }
  };

  const removeCartItem = (id) => {
    const item = cartItems.find(entry => entry.id === id);
    if (item) {
      removeItem(item.restaurantId, item.productId);
    }
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      // You'll need to add a clearCart method to your CartProvider
      // For now, we'll remove items one by one
      cartItems.forEach(item => {
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

  if (!hasItems) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaBagShopping className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Add items from any restaurant and they will appear here.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ff581b] text-white px-6 py-3 rounded-full font-bold hover:bg-[#e84d15] transition-colors"
          >
            Browse Menu
            <FaChevronRight className="text-xs" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-600 bg-gray-50">
      {/* Mobile Cart Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 mt-2">
        <div className="h-12 px-3 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <FaArrowLeft className="text-gray-700 text-xs" />
          </button>
          <h1 className="text-lg font-black text-gray-900">My Cart</h1>
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-0.5">
              Your <span className="text-[#ff581b] font-['Yesteryear',cursive]">Cart</span>
            </h2>
            <p className="text-white/70 text-xs">
              Review your selected items and manage your order before checkout.
            </p>
          </div>
          <div className="absolute bottom-3 right-0 flex items-center gap-2 text-xs font-semibold">
            <Link href="/" className="text-white hover:text-[#ff581b]">Home</Link>
            <FaChevronRight className="text-white text-[8px]" />
            <span className="text-[#ff581b]">Cart</span>
          </div>
        </div>
      </section>

      {/* Delivery Information Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-[1480px] py-3">
          {totalSavings > 0 && (
            <div className="bg-[#fff3ed] rounded-lg py-1.5 text-center mb-3">
              <span className="text-[#ff581b] text-xs font-bold">
                ✨ You saved ₹{totalSavings.toFixed(2)} on this order!
              </span>
            </div>
          )}

          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
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
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full w-fit ${
                  deliveryCharge === 0
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {deliveryCharge === 0 ? "FREE DELIVERY" : `₹${deliveryCharge} DELIVERY`}
              </span>
            </div>

            {/* Desktop Delivery Details */}
            <div className="hidden md:grid md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FaLocationDot className="text-blue-500 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Current Location</p>
                    <h4 className="text-sm font-bold text-gray-800">203 Kalyan Nagar</h4>
                    <p className="text-[11px] text-gray-500">Hyderabad</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-500">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Route</p>
                    <h4 className="text-sm font-bold text-gray-800">NH 44</h4>
                    <p className="text-[11px] text-gray-500">575 km - 587 mins</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Delivery Point</p>
                    <h4 className="text-sm font-bold text-gray-800">Bengaluru Delivery</h4>
                    <p className="text-[11px] text-gray-500">Whitefield, Bengaluru</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-amber-500">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Delivery</p>
                    <h4 className="text-sm font-bold text-gray-800">06-06-2026</h4>
                    <p className="text-[11px] text-gray-500">10:54 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-2 border-t border-gray-100">
              <div className="bg-[#fff3ed] text-[#ff581b] text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <FastDeliveryIcon /> Fast Delivery
              </div>
              <div className="bg-[#fff3ed] text-[#ff581b] text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <TodayIcon /> Today • 10:30 AM
              </div>
              <div className="bg-[#fff3ed] text-[#ff581b] text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
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
                  <div className="text-lg font-black text-gray-900 tracking-tight">Order Items</div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    <strong className="text-[#ff581b]">{cartItems.length}</strong> products in your cart
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
                <div key={item.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden mb-3 shadow-sm hover:shadow-md transition-all">
                  {/* Desktop View */}
                  <div className="hidden md:grid md:grid-cols-[100px_1fr_auto] gap-3 p-3">
                    <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "https://via.placeholder.com/100x100?text=No+Image"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.discount && (
                        <span className="absolute top-2 left-2 bg-[#ff581b] text-white font-bold text-[8px] px-1.5 py-0.5 rounded-full">
                          {item.discount}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <VegBadge isVeg={item.isVeg} />
                        </div>
                        <div className="text-sm font-extrabold text-gray-900 mb-1.5">{item.name}</div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">{item.subTitle}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-2 min-w-[100px]">
                      <div className="text-right">
                        <div className="text-lg font-black text-gray-900">
                          <sup className="text-[10px] text-[#ff581b]">₹</sup>
                          {item.newPrice}
                        </div>
                        {item.oldPrice > item.newPrice && (
                          <div className="text-[9px] text-gray-400 line-through">₹{item.oldPrice}</div>
                        )}
                      </div>

                      <div className="flex items-center bg-white rounded-full p-1 gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white text-gray-700 grid place-items-center shadow-sm"
                        >
                          <PiMinus className="text-[10px]" />
                        </button>
                        <span className="text-sm font-black text-gray-900 min-w-[20px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-[#ff581b] text-white grid place-items-center shadow-sm"
                        >
                          <PiPlus className="text-[10px]" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-red-600"
                      >
                        <FaTrashCan className="text-[10px]" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden p-3">
                    <div className="flex gap-2">
                      <div className="relative w-[70px] h-[70px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={item.image || "https://via.placeholder.com/70x70?text=No+Image"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <VegBadge isVeg={item.isVeg} />
                        </div>
                        <div className="text-sm font-extrabold text-gray-900">{item.name}</div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <div className="text-base font-black text-gray-900">
                            <sup className="text-[9px] text-[#ff581b]">₹</sup>
                            {item.newPrice}
                          </div>
                          {item.oldPrice > item.newPrice && (
                            <div className="text-[8px] text-gray-400 line-through">₹{item.oldPrice}</div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-white rounded-full p-1 gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 rounded-full bg-white text-gray-700 grid place-items-center shadow-sm"
                            >
                              <PiMinus className="text-[10px]" />
                            </button>
                            <span className="font-black min-w-[20px] text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 rounded-full bg-[#ff581b] text-white grid place-items-center shadow-sm"
                            >
                              <PiPlus className="text-[10px]" />
                            </button>
                          </div>
                          <button onClick={() => removeCartItem(item.id)} className="text-gray-400 hover:text-red-600">
                            <FaTrashCan className="text-xs" />
                          </button>
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
                      className="w-full py-2.5 pl-9 pr-3 border border-gray-200 rounded-xl bg-white text-gray-900 text-xs outline-none focus:border-[#ff581b]"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-[#ff581b] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center gap-2 mt-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                    <FaCircleCheck className="text-emerald-600 text-[11px]" />
                    <div className="flex-1">
                      <div className="text-[11px] font-extrabold text-emerald-800">{appliedPromo}</div>
                      <div className="text-[9px] font-semibold text-emerald-600">
                        Saving you ₹{promoDiscount.toFixed(2)}
                      </div>
                    </div>
                    <button onClick={removePromo} className="text-[10px] font-bold text-emerald-600 hover:text-red-600">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="bg-white border border-gray-100 rounded-b-xl overflow-hidden">
                  {/* Desktop Summary */}
                  <div className="hidden md:block">
                    <div className="max-h-[200px] overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-start justify-between gap-2 px-4 py-2 border-b border-gray-100 bg-[#ff581b]/5">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-gray-900 truncate">{item.name}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5">Qty: {item.qty}</div>
                          </div>
                          <div className="text-sm font-extrabold text-gray-900 whitespace-nowrap">
                            ₹{(item.newPrice * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-0.5">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                        <div className="text-xs font-semibold text-gray-500">Subtotal</div>
                        <div className="text-sm font-bold text-gray-900">₹{subtotal.toFixed(2)}</div>
                      </div>
                      {promoDiscount > 0 && (
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                          <div className="text-xs font-semibold text-gray-500">Promo</div>
                          <div className="text-sm font-bold text-emerald-600">−₹{promoDiscount.toFixed(2)}</div>
                        </div>
                      )}
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                        <div className="text-xs font-semibold text-gray-500">Delivery</div>
                        <div className={`text-sm font-bold ${deliveryCharge === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                          {deliveryCharge === 0 ? "Free ✓" : `₹${deliveryCharge.toFixed(2)}`}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-4 flex items-center justify-between gap-3 border-t border-gray-100">
                      <div>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase">Total</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[#ff581b] font-bold text-sm">₹</span>
                          <span className="text-3xl font-black text-gray-900">{grandTotal.toFixed(2)}</span>
                        </div>
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
                        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#ff581b] py-3 px-5 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-[#e84d15]"
                      >
                        Proceed to Checkout
                        <FaChevronRight className="ml-2 text-[10px]" />
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Summary */}
                  <div className="md:hidden p-4">
                    <div className="text-lg font-black text-[#ff581b] mb-4">Order Summary</div>
                    <div className="text-sm font-bold text-gray-700 mb-2">Bill Details</div>
                    
                    <div className="flex justify-between py-1.5">
                      <span className="text-gray-600 text-sm">Items Total</span>
                      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    {totalSavings > 0 && (
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-600 text-sm">Item Savings</span>
                        <span className="font-semibold text-emerald-600">- ₹{totalSavings.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {promoDiscount > 0 && (
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-600 text-sm">Promo Discount</span>
                        <span className="font-semibold text-emerald-600">- ₹{promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-1.5">
                      <span className="text-gray-600 text-sm">Delivery Fee</span>
                      <span className={`font-semibold ${deliveryCharge === 0 ? "text-emerald-600" : ""}`}>
                        {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-100 my-3"></div>
                    
                    <div className="flex justify-between py-1.5 mb-2">
                      <span className="text-base font-black text-gray-900">Grand Total</span>
                      <span className="text-xl font-black text-orange-500">₹{grandTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <div>
                        <div className="text-gray-500 text-xs mb-0.5">Total Amount</div>
                        <div className="text-2xl font-black text-gray-900">₹{grandTotal.toFixed(2)}</div>
                      </div>
                      <Link
                        href="/checkout"
                        className="bg-[#ff581b] rounded-full py-3 px-5 text-sm font-bold uppercase text-white"
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
      </section>
    </div>
  );
};

export default Cart;