// app/checkout/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrderSuccessPage from "./OrderSuccessPage";
import OrderFailedPage from "./OrderFailedPage";
import AuthModal from "./AuthModal";
import OrderOverview from "./OrderOverview";
import LoginPrompt from "./LoginPrompt";
import ContactForm from "./ContactForm";
import PaymentMethods from "./PaymentMethods";
import OrderSummary from "./OrderSummary";
import BillSummary from "./BillSummary";

const CheckOutPage = () => {
  const { isUserAuth, userData } = useSelector(
    (state) => state.Authentication || {},
  );

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Desktop Contact Info States
  const [desktopFirstName, setDesktopFirstName] = useState("");
  const [desktopLastName, setDesktopLastName] = useState("");
  const [desktopEmail, setDesktopEmail] = useState("");
  const [desktopPhone, setDesktopPhone] = useState("");
  const [desktopErrors, setDesktopErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [showDesktopContactForm, setShowDesktopContactForm] = useState(false);
  const [isDesktopContactSubmitted, setIsDesktopContactSubmitted] =
    useState(false);

  // Mobile Contact Info States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobileErrors, setMobileErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load user data when authenticated
  useEffect(() => {
    if (isUserAuth && userData) {
      const nameParts = (userData?.name || "").split(" ");
      const firstNameValue = nameParts[0] || "";
      const lastNameValue = nameParts.slice(1).join(" ") || "";

      setDesktopFirstName(firstNameValue);
      setDesktopLastName(lastNameValue);
      setDesktopEmail(userData?.email || "");
      setDesktopPhone(userData?.phone || "");
      setFirstName(firstNameValue);
      setLastName(lastNameValue);
      setEmail(userData?.email || "");
      setPhone(userData?.phone || "");

      if (!isDesktopContactSubmitted && !isContactSubmitted) {
        setIsDesktopContactSubmitted(true);
        setIsContactSubmitted(true);
        setShowDesktopContactForm(true);
        setShowContactForm(true);
      }
    }
  }, [isUserAuth, userData]);

  const showToast = (message, isError = false) => {
    setToastMessage({ message, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

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
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length !== 10)
      return "Phone number must be exactly 10 digits";
    return "";
  };

  const handleDesktopPhoneInput = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    setDesktopPhone(value);
    setDesktopErrors((prev) => ({
      ...prev,
      phone: validateDesktopPhone(value),
    }));
  };

  const handleDesktopFirstNameChange = (e) => {
    const value = e.target.value;
    setDesktopFirstName(value);
    setDesktopErrors((prev) => ({
      ...prev,
      firstName: validateDesktopFirstName(value),
    }));
  };

  const handleDesktopLastNameChange = (e) => {
    const value = e.target.value;
    setDesktopLastName(value);
    setDesktopErrors((prev) => ({
      ...prev,
      lastName: validateDesktopLastName(value),
    }));
  };

  const handleDesktopEmailChange = (e) => {
    const value = e.target.value;
    setDesktopEmail(value);
    setDesktopErrors((prev) => ({
      ...prev,
      email: validateDesktopEmail(value),
    }));
  };

  const isDesktopFormValid = () => {
    return (
      desktopFirstName.trim() !== "" &&
      desktopLastName.trim() !== "" &&
      desktopEmail.trim() !== "" &&
      desktopPhone.trim() !== "" &&
      desktopErrors.firstName === "" &&
      desktopErrors.lastName === "" &&
      desktopErrors.email === "" &&
      desktopErrors.phone === ""
    );
  };

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
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length !== 10)
      return "Phone number must be exactly 10 digits";
    return "";
  };

  const handleMobilePhoneInput = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    setPhone(value);
    setMobileErrors((prev) => ({ ...prev, phone: validateMobilePhone(value) }));
  };

  const handleMobileFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setMobileErrors((prev) => ({
      ...prev,
      firstName: validateMobileFirstName(value),
    }));
  };

  const handleMobileLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setMobileErrors((prev) => ({
      ...prev,
      lastName: validateMobileLastName(value),
    }));
  };

  const handleMobileEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setMobileErrors((prev) => ({ ...prev, email: validateMobileEmail(value) }));
  };

  const isMobileFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      mobileErrors.firstName === "" &&
      mobileErrors.lastName === "" &&
      mobileErrors.email === "" &&
      mobileErrors.phone === ""
    );
  };

  const handleDesktopLogin = () => {
    if (isUserAuth) {
      setShowDesktopContactForm(true);
      setIsDesktopContactSubmitted(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleDesktopSubmitContact = () => {
    if (isDesktopFormValid()) {
      setIsDesktopContactSubmitted(true);
    }
  };

  const handleLogin = () => {
    if (isUserAuth) {
      setShowContactForm(true);
      setIsContactSubmitted(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSubmitContact = () => {
    if (isMobileFormValid()) {
      setIsContactSubmitted(true);
    }
  };

  const handlePlaceOrder = () => {
    if (!isUserAuth) {
      setShowAuthModal(true);
      return;
    }

    if (!isDesktopContactSubmitted && !isContactSubmitted) {
      showToast("Please save your contact details first", true);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      setOrderStatus(isSuccess ? "success" : "failed");
      setIsProcessing(false);
    }, 1500);
  };

  const handleReset = () => {
    setOrderStatus(null);
    setIsDesktopContactSubmitted(false);
    setIsContactSubmitted(false);
    setShowDesktopContactForm(false);
    setShowContactForm(false);
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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const promoDiscount = isPromoApplied ? 28.6 : 0;
  const vat = 12.68;
  const total = subtotal - promoDiscount + vat;
  const indianItems = { items: 1, subtotal: 279, deliveryFee: 40, toPay: 319 };

  const successOrderDetails = {
    orderNumber: "#HYD20345",
    orderId: "ORD-1780720589967-7224",
    paymentMethod: selectedPayment,
    paymentStatus: "pending",
    amount: indianItems.toPay,
    orderOverview: {
      pickupLocation:
        "203, Street No. 4, Kalyan Nagar Phase 1, Siddarth Nagar, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038, India",
      deliveryPointAddress:
        "Plot No 75, 8th Rd, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066, India",
      dateLabel: "06-06-2026",
      timeLabel: "10:54 AM",
    },
    cartItems: cartItems.map((item) => ({ ...item, qty: item.quantity })),
  };

  if (orderStatus === "success") {
    return (
      <OrderSuccessPage
        orderDetails={successOrderDetails}
        onContinueShopping={handleReset}
      />
    );
  }

  if (orderStatus === "failed") {
    return <OrderFailedPage onTryAgain={handleReset} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
            toastMessage.isError ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {toastMessage.isError ? "❌" : "✓"}
          <span className="text-sm">{toastMessage.message}</span>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
      />

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-8 pt-6 pb-4">
          <OrderOverview isDesktop={true} />
        </div>

        <div className="flex max-w-[1400px] mx-auto gap-6">
          <div className="w-[58%] bg-white rounded-2xl shadow-sm p-6">
            {!showDesktopContactForm ? (
              <LoginPrompt
                isDesktop={true}
                isUserAuth={isUserAuth}
                userData={userData}
                onLogin={handleDesktopLogin}
              />
            ) : (
              <ContactForm
                isDesktop={true}
                firstName={desktopFirstName}
                lastName={desktopLastName}
                email={desktopEmail}
                phone={desktopPhone}
                errors={desktopErrors}
                isSubmitted={isDesktopContactSubmitted}
                onSubmit={handleDesktopSubmitContact}
                onFirstNameChange={handleDesktopFirstNameChange}
                onLastNameChange={handleDesktopLastNameChange}
                onEmailChange={handleDesktopEmailChange}
                onPhoneChange={handleDesktopPhoneInput}
                isFormValid={isDesktopFormValid()}
              />
            )}
            <PaymentMethods
              selectedPayment={selectedPayment}
              onSelectPayment={setSelectedPayment}
              isEnabled={isDesktopContactSubmitted}
            />
          </div>

          <div className="w-[38%] lg:sticky lg:top-24">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              promoDiscount={promoDiscount}
              vat={vat}
              total={total}
              isContactSubmitted={isDesktopContactSubmitted}
              isProcessing={isProcessing}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden max-w-md mx-auto bg-white min-h-screen">
        <div className="px-5 pt-6 pb-2">
          <h1 className="text-xl font-bold text-gray-900">Payment</h1>
        </div>
        <div className="px-5 pb-8">
          <OrderOverview isDesktop={false} />

          {!showContactForm && !isContactSubmitted && (
            <LoginPrompt
              isDesktop={false}
              isUserAuth={isUserAuth}
              userData={userData}
              onLogin={handleLogin}
            />
          )}

          {showContactForm && !isContactSubmitted && (
            <ContactForm
              isDesktop={false}
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              errors={mobileErrors}
              isSubmitted={isContactSubmitted}
              onSubmit={handleSubmitContact}
              onFirstNameChange={handleMobileFirstNameChange}
              onLastNameChange={handleMobileLastNameChange}
              onEmailChange={handleMobileEmailChange}
              onPhoneChange={handleMobilePhoneInput}
              isFormValid={isMobileFormValid()}
            />
          )}

          {isContactSubmitted && (
            <>
              <BillSummary
                indianItems={indianItems}
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
                isContactSubmitted={isContactSubmitted}
              />
              <div className="mt-2 mb-4">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-[#ff581b] hover:bg-[#e04e14] transition-all rounded-2xl py-4 shadow-md flex items-center justify-center gap-2 text-white font-semibold disabled:opacity-70"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <span>Swipe to place COD order</span>
                      <svg
                        className="w-5 h-5 text-white animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
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
