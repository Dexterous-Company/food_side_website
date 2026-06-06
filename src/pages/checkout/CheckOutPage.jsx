"use client";
import React, { useState } from "react";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaTruck, FaRocket, FaStore, FaCity, FaBuilding,
  FaRupeeSign, FaTag, FaGift, FaCheckCircle,
  FaCcVisa, FaCcAmex, FaCcMastercard, FaGooglePay, FaPaypal,
  FaLock, FaReceipt, FaBox, FaPercent, FaApple,
  FaTimesCircle, FaCheckCircle as FaSuccessCircle
} from "react-icons/fa";
import { MdLocationOn, MdDeliveryDining, MdCreditCard } from "react-icons/md";
import { GiSteak, GiButter } from "react-icons/gi";
import OrderSuccessPage from "./OrderSuccessPage";
import OrderFailedPage from "./OrderFailedPage";

const CheckOutPage = () => {
  // Desktop Contact Info States
  const [desktopFirstName, setDesktopFirstName] = useState("");
  const [desktopLastName, setDesktopLastName] = useState("");
  const [desktopEmail, setDesktopEmail] = useState("");
  const [desktopPhone, setDesktopPhone] = useState("");
  const [desktopStreetAddress, setDesktopStreetAddress] = useState("203, Street No. 4, Kalyan Nagar Phase 1");
  const [desktopCity, setDesktopCity] = useState("Hyderabad");
  const [desktopState, setDesktopState] = useState("Telangana");
  const [desktopPostalCode, setDesktopPostalCode] = useState("500038");

  // Desktop Validation Errors
  const [desktopErrors, setDesktopErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  // Desktop States
  const [showDesktopContactForm, setShowDesktopContactForm] = useState(false);
  const [isDesktopContactSubmitted, setIsDesktopContactSubmitted] = useState(false);

  // Mobile Contact Info States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Mobile Validation Errors
  const [mobileErrors, setMobileErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [showContactForm, setShowContactForm] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Validation Functions
  const validateDesktopFirstName = (value) => {
    if (!value.trim()) return "First name is required";
    if (value.length < 2) return "First name must be at least 2 characters";
    return "";
  };

  const validateDesktopLastName = (value) => {
    if (!value.trim()) return "Last name is required";
    if (value.length < 2) return "Last name must be at least 2 characters";
    return "";
  };

  const validateDesktopEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";
    return "";
  };

  const validateDesktopPhone = (value) => {
    if (!value.trim()) return "Phone number is required";
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length !== 10) return "Phone number must be exactly 10 digits";
    return "";
  };

  const handleDesktopPhoneInput = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setDesktopPhone(value);
    setDesktopErrors(prev => ({ ...prev, phone: validateDesktopPhone(value) }));
  };

  const handleDesktopFirstNameChange = (e) => {
    const value = e.target.value;
    setDesktopFirstName(value);
    setDesktopErrors(prev => ({ ...prev, firstName: validateDesktopFirstName(value) }));
  };

  const handleDesktopLastNameChange = (e) => {
    const value = e.target.value;
    setDesktopLastName(value);
    setDesktopErrors(prev => ({ ...prev, lastName: validateDesktopLastName(value) }));
  };

  const handleDesktopEmailChange = (e) => {
    const value = e.target.value;
    setDesktopEmail(value);
    setDesktopErrors(prev => ({ ...prev, email: validateDesktopEmail(value) }));
  };

  const isDesktopFormValid = () => {
    return desktopFirstName.trim() !== "" &&
      desktopLastName.trim() !== "" &&
      desktopEmail.trim() !== "" &&
      desktopPhone.trim() !== "" &&
      desktopErrors.firstName === "" &&
      desktopErrors.lastName === "" &&
      desktopErrors.email === "" &&
      desktopErrors.phone === "";
  };

  // Mobile validation handlers
  const validateMobileFirstName = (value) => {
    if (!value.trim()) return "First name is required";
    if (value.length < 2) return "First name must be at least 2 characters";
    return "";
  };

  const validateMobileLastName = (value) => {
    if (!value.trim()) return "Last name is required";
    if (value.length < 2) return "Last name must be at least 2 characters";
    return "";
  };

  const validateMobileEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";
    return "";
  };

  const validateMobilePhone = (value) => {
    if (!value.trim()) return "Phone number is required";
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length !== 10) return "Phone number must be exactly 10 digits";
    return "";
  };

  const handleMobilePhoneInput = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setPhone(value);
    setMobileErrors(prev => ({ ...prev, phone: validateMobilePhone(value) }));
  };

  const handleMobileFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setMobileErrors(prev => ({ ...prev, firstName: validateMobileFirstName(value) }));
  };

  const handleMobileLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setMobileErrors(prev => ({ ...prev, lastName: validateMobileLastName(value) }));
  };

  const handleMobileEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setMobileErrors(prev => ({ ...prev, email: validateMobileEmail(value) }));
  };

  const isMobileFormValid = () => {
    return firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      mobileErrors.firstName === "" &&
      mobileErrors.lastName === "" &&
      mobileErrors.email === "" &&
      mobileErrors.phone === "";
  };

  // Desktop handlers
  const handleDesktopLogin = () => {
    setShowDesktopContactForm(true);
  };

  const handleDesktopSubmitContact = () => {
    if (isDesktopFormValid()) {
      setIsDesktopContactSubmitted(true);
    }
  };

  // Mobile handlers
  const handleLogin = () => {
    setShowContactForm(true);
  };

  const handleSubmitContact = () => {
    if (isMobileFormValid()) {
      setIsContactSubmitted(true);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      setOrderStatus(isSuccess ? 'success' : 'failed');
      setIsProcessing(false);
    }, 1500);
  };

  const handleReset = () => {
    setOrderStatus(null);
    setIsDesktopContactSubmitted(false);
    setIsContactSubmitted(false);
    setShowDesktopContactForm(false);
    setShowContactForm(false);
    // Reset forms
    setDesktopFirstName("");
    setDesktopLastName("");
    setDesktopEmail("");
    setDesktopPhone("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  const cartItems = [
    { id: 1, name: "Wagyu Ribeye Kit", quantity: 1, price: 89.0 },
    { id: 2, name: "Truffle Butter 250g", quantity: 2, price: 28.0 },
    { id: 3, name: "Signature Steak Rub", quantity: 1, price: 12.0 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = isPromoApplied ? 28.6 : 0;
  const vat = 12.68;
  const total = subtotal - promoDiscount + vat;
  const indianItems = { items: 1, subtotal: 279, deliveryFee: 40, toPay: 319 };

  // Prepare order details for success page
  const successOrderDetails = {
    orderNumber: "#HYD20345",
    orderId: "ORD-1780720589967-7224",
    paymentMethod: selectedPayment,
    paymentStatus: "pending",
    amount: indianItems.toPay,
    orderOverview: {
      pickupLocation: "203, Street No. 4, Kalyan Nagar Phase 1, Siddarth Nagar, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038, India",
      deliveryPointAddress: "Plot No 75, 8th Rd, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066, India",
      dateLabel: "06-06-2026",
      timeLabel: "10:54 AM"
    },
    cartItems: cartItems.map(item => ({ ...item, qty: item.quantity }))
  };

  // Show success page if order is successful
  if (orderStatus === 'success') {
    return <OrderSuccessPage orderDetails={successOrderDetails} onContinueShopping={handleReset} />;
  }

  // Show failed page if order failed
  if (orderStatus === 'failed') {
    return <OrderFailedPage onTryAgain={handleReset} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      {/* ============ DESKTOP LAYOUT ============ */}
      <div className="hidden lg:block">
        {/* Order Overview */}
        <div className="max-w-[1400px] mx-auto px-8 pt-6 pb-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MdLocationOn className="text-[#ff581b] text-xl" />
              Order Overview
            </h2>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400 text-xs" /> Current Location
                  </p>
                  <p className="text-sm font-medium text-gray-800">203, Kalyan Nagar, Hyderabad</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaTruck className="text-gray-400 text-xs" /> Route
                  </p>
                  <p className="text-sm font-medium text-gray-800">NH 44 | Hyderabad to Bengaluru</p>
                  <p className="text-xs text-gray-400">575 km · 587 mins</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MdDeliveryDining className="text-gray-400 text-xs" /> Delivery Point
                  </p>
                  <p className="text-sm font-medium text-gray-800">Bengaluru Delivery Point</p>
                  <p className="text-xs text-gray-400">Whitefield, Bengaluru</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500">Delivery Date</p>
                  <p className="text-sm font-medium text-gray-800">06-06-2026</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Delivery Time</p>
                  <p className="text-sm font-medium text-gray-800">10:54 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex max-w-[1400px] mx-auto gap-6">
          {/* Left Column - Contact Information and Payment Method only */}
          <div className="w-[58%] bg-white rounded-2xl shadow-sm p-6">
            {/* Login Button */}
            {!showDesktopContactForm ? (
              <div className="mb-6 p-6 bg-gray-50 rounded-2xl text-center border border-gray-200">
                <FaUser className="text-[#ff581b] text-4xl mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Login to Continue</h3>
                <p className="text-sm text-gray-500 mb-4">Please login to fill your contact details</p>
                <button onClick={handleDesktopLogin} className="bg-[#ff581b] text-white px-8 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">Login / Sign Up</button>
              </div>
            ) : (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FaUser className="text-[#ff581b]" />
                    Contact Information
                  </h2>
                  {isDesktopContactSubmitted && <span className="text-xs text-gray-400"><FaCheckCircle className="text-emerald-500 text-xs inline mr-1" /> Details saved</span>}
                </div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">First Name</label>
                    <input
                      type="text"
                      value={desktopFirstName}
                      onChange={handleDesktopFirstNameChange}
                      disabled={isDesktopContactSubmitted}
                      className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${desktopErrors.firstName && !isDesktopContactSubmitted ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {desktopErrors.firstName && !isDesktopContactSubmitted && <p className="text-red-500 text-xs mt-1">{desktopErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={desktopLastName}
                      onChange={handleDesktopLastNameChange}
                      disabled={isDesktopContactSubmitted}
                      className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${desktopErrors.lastName && !isDesktopContactSubmitted ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {desktopErrors.lastName && !isDesktopContactSubmitted && <p className="text-red-500 text-xs mt-1">{desktopErrors.lastName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={desktopEmail}
                    onChange={handleDesktopEmailChange}
                    disabled={isDesktopContactSubmitted}
                    className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${desktopErrors.email && !isDesktopContactSubmitted ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {desktopErrors.email && !isDesktopContactSubmitted && <p className="text-red-500 text-xs mt-1">{desktopErrors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={desktopPhone}
                    onChange={handleDesktopPhoneInput}
                    disabled={isDesktopContactSubmitted}
                    placeholder="Enter 10 digit mobile number"
                    className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${desktopErrors.phone && !isDesktopContactSubmitted ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {desktopErrors.phone && !isDesktopContactSubmitted && <p className="text-red-500 text-xs mt-1">{desktopErrors.phone}</p>}
                </div>
                {!isDesktopContactSubmitted && (
                  <button onClick={handleDesktopSubmitContact} disabled={!isDesktopFormValid()} className={`bg-[#ff581b] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-900 transition mt-2 ${!isDesktopFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Save & Continue
                  </button>
                )}
              </div>
            )}

            {/* Payment Method */}
            <div className="mb-8 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MdCreditCard className="text-[#ff581b]" />
                Select Payment Method
              </h3>
              <div className="space-y-3">
                <div onClick={() => isDesktopContactSubmitted && setSelectedPayment("cod")} className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${selectedPayment === "cod" ? "border-[#ff581b] bg-orange-50" : "border-gray-200"} ${!isDesktopContactSubmitted ? 'opacity-60 cursor-not-allowed' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">Cash on Delivery</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Pay when you receive your order</p>
                      <p className="text-xs text-gray-400">Pay directly to the delivery partner</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === "cod" ? "border-[#ff581b]" : "border-gray-300"}`}>
                      {selectedPayment === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-[#ff581b]"></div>}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-gray-100 opacity-70 p-4 cursor-not-allowed">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-500">Online Payment</span>
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">COMING SOON</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">UPI / Cards / Net Banking</p>
                      <p className="text-xs text-gray-400">Secure payment gateway</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-[38%] lg:sticky lg:top-24">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md flex flex-col">
              <div className="flex items-center gap-2 p-4 bg-gray-900">
                <div className="w-8 h-8 rounded-lg bg-[#ff581b]/20 border border-[#ff581b]/30 grid place-items-center text-[#ff581b] text-base">
                  <FaReceipt className="text-base" />
                </div>
                <div>
                  <div className="font-['Raleway',sans-serif] text-sm font-black text-white tracking-tight">Order Summary</div>
                  <div className="text-[10px] text-white/35 font-medium">{cartItems.length} items · Dispatched 24h</div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 border-t-0 rounded-b-xl overflow-hidden flex flex-col">
                <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-start justify-between gap-2 px-4 py-2 border-b border-gray-100 bg-[#ff581b]/5">
                      <div className="flex-1 min-w-0">
                        <div className="font-['Raleway',sans-serif] text-xs font-bold text-gray-900 leading-tight truncate">{item.name}</div>
                        <div className="text-[10px] text-gray-500 font-medium mt-0.5">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-['Raleway',sans-serif] text-sm font-extrabold text-gray-900 whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#ff581b]/30 to-transparent my-0.5 mx-4"></div>

                <div className="pt-0.5">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaReceipt className="text-[#ff581b] text-[10px]" /> Subtotal</div>
                    <div className="font-['Raleway',sans-serif] text-sm font-bold text-gray-900">₹{subtotal.toFixed(2)}</div>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaTag className="text-[#ff581b] text-[10px]" /> Promo</div>
                      <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">−₹{promoDiscount.toFixed(2)}</div>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaTruck className="text-[#ff581b] text-[10px]" /> Delivery</div>
                    <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">Free ✓</div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaBox className="text-[#ff581b] text-[10px]" /> Packaging</div>
                    <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">Included</div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaPercent className="text-[#ff581b] text-[10px]" /> VAT</div>
                    <div className="font-['Raleway',sans-serif] text-sm font-bold text-[#ff581b]">₹{vat.toFixed(2)}</div>
                  </div>
                </div>

                <div className="bg-gray-900 px-4 py-3 flex items-center justify-between gap-3 mt-1">
                  <div>
                    <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/40">Total</div>
                    {promoDiscount > 0 && <div className="text-[9px] text-white/35 mt-0.5">Save <strong>₹{promoDiscount.toFixed(2)}</strong></div>}
                  </div>
                  <div className="font-['Raleway',sans-serif] text-2xl font-black text-white leading-none tracking-[-0.5px]"><sup className="text-sm text-[#ff581b] font-bold">₹</sup>{total.toFixed(2)}</div>
                </div>

                <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-600 text-xs" />
                  <div className="text-[11px] font-semibold text-emerald-600"><span className="font-extrabold">Free next-day delivery</span> applied</div>
                </div>

                <div className="px-4 py-3">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || !isDesktopContactSubmitted}
                    className="relative inline-block font-bold text-xs uppercase bg-[#ff581b] text-white rounded-full py-3 pl-5 pr-[48px] overflow-hidden transition-all duration-300 hover:bg-gray-900 text-center w-full shadow-md"
                  >
                    Proceed to Pay
                    <span className="absolute top-1/2 right-2 w-7 h-7 bg-white rounded-full -translate-y-1/2"></span>
                  </button>
                </div>

                <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[9px] font-bold tracking-[1px] uppercase text-gray-500">We accept</span>
                  <div className="flex gap-1 flex-wrap items-center">
                    <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaCcVisa /></div>
                    <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaCcMastercard /></div>
                    <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaCcAmex /></div>
                    <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaApple /></div>
                    <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaGooglePay /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MOBILE LAYOUT ============ */}
      <div className="lg:hidden max-w-md mx-auto bg-white min-h-screen">
        <div className="px-5 pt-6 pb-2">
          <h1 className="text-xl font-bold text-gray-900">Payment</h1>
        </div>

        <div className="px-5 pb-8">
          {/* Order Overview */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-3">Order Overview</h2>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex gap-2"><div className="flex-shrink-0"><span className="text-[#ff581b] font-bold text-sm">•</span></div><div><p className="text-xs font-semibold text-gray-700">Current LOCATION</p><p className="text-xs text-gray-600">203, Street No. 4, Kalyan Nagar Phase 1, Siddarth Nagar, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038, India</p></div></div>
              <div className="flex gap-2"><div className="flex-shrink-0"><span className="text-[#ff581b] font-bold text-sm">•</span></div><div><p className="text-xs font-semibold text-gray-700">ROUTE</p><p className="text-xs font-medium text-gray-800">NH 44 | Hyderabad, India to Bengaluru, India</p><p className="text-xs text-gray-500">575 km · 587 mins</p></div></div>
              <div className="flex gap-2"><div className="flex-shrink-0"><span className="text-[#ff581b] font-bold text-sm">•</span></div><div><p className="text-xs font-semibold text-gray-700">DELIVERY POINT</p><p className="text-xs font-medium text-gray-800">Bengaluru Delivery Point</p><p className="text-xs text-gray-600">Plot No 75, 8th Rd, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066, India</p></div></div>
              <div className="flex gap-2"><div className="flex-shrink-0"><span className="text-[#ff581b] font-bold text-sm">•</span></div><div className="flex gap-4"><div><p className="text-xs font-semibold text-gray-700">DELIVERY DATE</p><p className="text-xs font-medium">06-06-2026</p></div><div><p className="text-xs font-semibold text-gray-700">DELIVERY TIME</p><p className="text-xs font-medium">10:54 AM</p></div></div></div>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          {!showContactForm && !isContactSubmitted && (
            <div className="mb-6 p-6 bg-gray-50 rounded-2xl text-center border border-gray-200">
              <FaUser className="text-[#ff581b] text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Login to Continue</h3>
              <p className="text-sm text-gray-500 mb-4">Please login to fill your contact details</p>
              <button onClick={handleLogin} className="bg-[#ff581b] text-white px-8 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">Login / Sign Up</button>
            </div>
          )}

          {/* CONTACT INFORMATION FORM */}
          {showContactForm && !isContactSubmitted && (
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <input type="text" placeholder="First Name" value={firstName} onChange={handleMobileFirstNameChange} className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${mobileErrors.firstName ? 'border-red-500' : 'border-gray-200'}`} />
                  {mobileErrors.firstName && <p className="text-red-500 text-xs mt-1">{mobileErrors.firstName}</p>}
                </div>
                <div>
                  <input type="text" placeholder="Last Name" value={lastName} onChange={handleMobileLastNameChange} className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${mobileErrors.lastName ? 'border-red-500' : 'border-gray-200'}`} />
                  {mobileErrors.lastName && <p className="text-red-500 text-xs mt-1">{mobileErrors.lastName}</p>}
                </div>
                <div>
                  <input type="email" placeholder="Email Address" value={email} onChange={handleMobileEmailChange} className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${mobileErrors.email ? 'border-red-500' : 'border-gray-200'}`} />
                  {mobileErrors.email && <p className="text-red-500 text-xs mt-1">{mobileErrors.email}</p>}
                </div>
                <div>
                  <input type="tel" placeholder="10 digit mobile number" value={phone} onChange={handleMobilePhoneInput} className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${mobileErrors.phone ? 'border-red-500' : 'border-gray-200'}`} />
                  {mobileErrors.phone && <p className="text-red-500 text-xs mt-1">{mobileErrors.phone}</p>}
                </div>
                <button onClick={handleSubmitContact} disabled={!isMobileFormValid()} className={`w-full bg-[#ff581b] text-white font-semibold py-2 rounded-xl hover:bg-gray-900 transition ${!isMobileFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Save & Continue
                </button>
              </div>
            </div>
          )}

          {/* REST OF THE SECTIONS */}
          {isContactSubmitted && (
            <>
              <div className="mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-600">Items</span>
                  <span className="text-sm font-semibold text-gray-600">Subtotal</span>
                  <span className="text-sm font-semibold text-gray-600">ETA</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-base font-bold text-gray-800">{indianItems.items}</span>
                  <span className="text-base font-bold text-gray-800">₹{indianItems.subtotal}</span>
                  <span className="text-xs text-gray-500">06-06-2026 at 10:54 AM</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Bill Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Items Total</span><span>₹{indianItems.subtotal}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery Fee</span><span>₹{indianItems.deliveryFee}</span></div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200"><span>To Pay</span><span className="text-[#ff581b]">₹{indianItems.toPay}</span></div>
                  <p className="text-xs text-emerald-600 mt-2">✨ Add ₹221 more for free delivery</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Select Payment Method</h3>
                <div className="space-y-3">
                  <div className="rounded-xl border-2 border-[#ff581b] bg-orange-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2"><span className="font-semibold text-gray-800">Cash on Delivery</span><span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span></div>
                        <p className="text-xs text-gray-500 mt-1">Pay when you receive your order</p>
                        <p className="text-xs text-gray-400">Pay directly to the delivery partner</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-[#ff581b] flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#ff581b]"></div></div>
                    </div>
                  </div>
                  <div className="rounded-xl border-2 border-gray-200 bg-gray-100 opacity-70 p-4 cursor-not-allowed">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2"><span className="font-semibold text-gray-500">Online Payment</span><span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">COMING SOON</span></div>
                        <p className="text-xs text-gray-400 mt-1">UPI / Cards / Net Banking</p>
                        <p className="text-xs text-gray-400">Secure payment gateway</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 text-center mb-4"><FaLock className="inline mr-1 text-[10px]" /> Your payment information is secure with us</p>

              <div className="mt-2 mb-4">
                <button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full bg-[#ff581b] hover:bg-[#e04e14] transition-all rounded-2xl py-4 shadow-md flex items-center justify-center gap-2 text-white font-semibold disabled:opacity-70">
                  {isProcessing ? 'Processing...' : <><span>Swipe to place COD order</span><svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;