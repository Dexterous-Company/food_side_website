"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaAngleDown,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaUserCircle,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { logout } from "@/redux/Authentication/AuthenticationSlice";
import DeliverySelectionModal from "../selectRoutes/DeliverySelectionModal";
import { useCart } from "@/context/CartContext";

const HeaderPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isHomePage = pathname === "/";

  // Get auth state from Redux
  const isLoggedIn = useSelector((state) => state.Authentication.isUserAuth);
  const userData = useSelector((state) => state.Authentication.userData);
  const userName =
    userData?.name ||
    userData?.fullName ||
    userData?.email?.split("@")[0] ||
    "User";

  // Get cart count from CartContext
  const { cartList } = useCart();
  const cartCount = useMemo(() => {
    if (!cartList || cartList.length === 0) return 0;
    return cartList.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0);
  }, [cartList]);

  // Check if delivery/booking data exists
  const isDestinationSet = useSelector((state) => state.delivery.isDestinationSet);
  const isRouteSelected = useSelector((state) => state.delivery.isRouteSelected);
  const isDeliveryPointSelected = useSelector((state) => state.delivery.isDeliveryPointSelected);
  const hasDeliveryData = isDestinationSet || isRouteSelected || isDeliveryPointSelected;

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  // Close auth dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAuthDropdown && !event.target.closest(".auth-dropdown")) {
        setShowAuthDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showAuthDropdown]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleLoginRedirect = () => {
    setShowAuthDropdown(false);
    router.push("/login");
  };

  const handleSignupRedirect = () => {
    setShowAuthDropdown(false);
    router.push("/sign-up");
  };

  const handleNewBookingClick = () => {
    setIsDeliveryModalOpen(true);
  };

  // Navigation data structure
  const navItems = [
    {
      name: "Home",
      isDropdown: false,
      link: "/",
    },
    {
      name: "Faq",
      isDropdown: false,
      link: "/faq",

    },
    { name: "About", link: "/about_us", isDropdown: false },
    {
      name: "Pages",
      isDropdown: true,
      dropdownItems: [
        {
          name: "Cart",
          link: "/cart",
          icon: "🛒",
          desc: "View and manage your shopping cart",
        },

        {
          name: "FAQ",
          link: "/accounts/faq",
          icon: "❓",
          desc: "Common questions answered",
        },
        {
          name: "Terms & Conditions",
          link: "/terms_conditions",
          icon: "📄",
          desc: "Our policies & rules",
        },
        {
          name: "Privacy Policy",
          link: "/privacypolicy",
          icon: "🛡️",
          desc: "How we use your data",
        },
        {
          name: "404 Error Page",
          link: "/404",
          icon: "⚠️",
          desc: "Custom not found page",
        },
      ],
    },
    { name: "Contact", link: "/contact_us", isDropdown: false },
  ];

  // Determine text color based on scroll and page
  const getNavLinkColor = () => {
    if (scrolled) return "text-[#121212] hover:text-[#ff581b]";
    if (isHomePage) return "text-white hover:text-[#ff581b]";
    return "text-[#121212] hover:text-[#ff581b]";
  };

  const getDropdownButtonColor = () => {
    if (scrolled) return "text-[#121212] hover:text-[#ff581b]";
    if (isHomePage) return "text-white hover:text-[#ff581b]";
    return "text-[#121212] hover:text-[#ff581b]";
  };

  return (
    <>
      {/* MAIN HEADER - Transparent on scroll */}
      <header
        id="main-header"
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg"
            : isHomePage
              ? "bg-transparent"
              : "bg-white shadow-md"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-8 max-w-[1480px] py-3 lg:py-0 flex justify-between items-center relative">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/main_log_fd.png"
              alt="Food Side"
              className="h-12 lg:h-[65px] w-auto transition-all object-contain duration-300"
            />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer focus:outline-none z-[1001] relative"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? "translate-y-2 rotate-45"
                  : scrolled || !isHomePage
                    ? "bg-black"
                    : "bg-white"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
              } ${
                !isMobileMenuOpen && (scrolled || !isHomePage)
                  ? "bg-black"
                  : !isMobileMenuOpen && isHomePage && !scrolled
                    ? "bg-white"
                    : "bg-black"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              } ${
                !isMobileMenuOpen && (scrolled || !isHomePage)
                  ? "bg-black"
                  : !isMobileMenuOpen && isHomePage && !scrolled
                    ? "bg-white"
                    : "bg-black"
              }`}
            ></span>
          </button>

          {/* Mobile Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden z-[998] ${
              isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Mobile Menu Container */}
          <div
            className={`
            fixed top-0 right-0 w-full max-w-[400px] h-full bg-white shadow-2xl
            transition-all duration-500 ease-in-out z-[999] lg:hidden
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
            flex flex-col
          `}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <Image
                src="/main_log_fd.png"
                alt="Food Side"
                width={120}
                height={60}
              />
              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#ff581b] hover:text-white transition-all duration-300"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-100">
                    {item.isDropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="w-full flex justify-between items-center px-5 py-4 text-[15px] font-semibold text-[#121212] hover:text-[#ff581b] transition-colors"
                        >
                          {item.name}
                          <FaAngleDown
                            className={`text-xs transition-transform duration-300 ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            openDropdown === item.name
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="bg-gray-50 pl-4 pr-3 py-2">
                            {!item.dropdownColumns &&
                              item.dropdownItems?.map((sub) => (
                                <a
                                  key={sub.name}
                                  href={sub.link}
                                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white transition-all duration-200 border-l-2 border-transparent hover:border-[#ff581b]"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff581b] flex items-center justify-center text-sm">
                                    {sub.icon}
                                  </span>
                                  <div className="flex-1">
                                    <strong className="text-[13px] font-bold text-[#121212] block">
                                      {sub.name}
                                    </strong>
                                    <small className="text-[11px] text-[#555555] block">
                                      {sub.desc}
                                    </small>
                                  </div>
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#ff581b] text-white">
                                      {sub.badge}
                                    </span>
                                  )}
                                </a>
                              ))}

                            {item.dropdownColumns && (
                              <>
                                <div className="mb-2">
                                  <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#ff581b] px-3 pt-2 pb-1">
                                    Restaurant
                                  </p>
                                  {item.dropdownItemsLeft?.map((sub) => (
                                    <a
                                      key={sub.name}
                                      href={sub.link}
                                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white transition-all duration-200 border-l-2 border-transparent hover:border-[#ff581b]"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff581b] flex items-center justify-center text-sm">
                                        {sub.icon}
                                      </span>
                                      <div className="flex-1">
                                        <strong className="text-[13px] font-bold text-[#121212] block">
                                          {sub.name}
                                        </strong>
                                        <small className="text-[11px] text-[#555555] block">
                                          {sub.desc}
                                        </small>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                                <div className="h-px bg-gray-200 my-2 mx-3"></div>
                                <div>
                                  <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#ff581b] px-3 pt-2 pb-1">
                                    Info Pages
                                  </p>
                                  {item.dropdownItemsRight?.map((sub) => (
                                    <a
                                      key={sub.name}
                                      href={sub.link}
                                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white transition-all duration-200 border-l-2 border-transparent hover:border-[#ff581b]"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff581b] flex items-center justify-center text-sm">
                                        {sub.icon}
                                      </span>
                                      <div className="flex-1">
                                        <strong className="text-[13px] font-bold text-[#121212] block">
                                          {sub.name}
                                        </strong>
                                        <small className="text-[11px] text-[#555555] block">
                                          {sub.desc}
                                        </small>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={item.link}
                        className="block px-5 py-4 text-[15px] font-semibold text-[#121212] hover:text-[#ff581b] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Footer Actions */}
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-3 mb-4">
                <a
                  href="/cart"
                  className="flex-1 bg-gray-200 text-[#121212] font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#ff581b] hover:text-white transition-colors"
                >
                  <FaShoppingCart size={14} /> Cart ({cartCount})
                </a>
              </div>
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={handleLoginRedirect}
                    className="block w-full bg-[#ff581b] text-white font-bold py-3 px-4 rounded-full text-center hover:bg-black transition-colors mb-3"
                  >
                    <FaSignInAlt className="inline mr-2" /> Sign In
                  </button>
                  <button
                    onClick={handleSignupRedirect}
                    className="block w-full bg-gray-200 text-[#121212] font-bold py-3 px-4 rounded-full text-center hover:bg-[#ff581b] hover:text-white transition-colors"
                  >
                    <FaUserPlus className="inline mr-2" /> Sign Up
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full px-4 py-3 flex items-center justify-center gap-2">
                    <FaUserCircle size={18} className="text-[#ff581b]" />
                    <span className="text-sm font-medium truncate">
                      {userName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white font-bold px-4 rounded-full hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <FaSignOutAlt size={14} /> Logout
                  </button>
                </div>
              )}
              <button
                onClick={handleNewBookingClick}
                className="block w-full bg-black text-white font-bold py-2 px-4 rounded-full text-center hover:bg-[#ff581b] transition-colors mt-3"
              >
                {hasDeliveryData ? 'Edit Booking' : 'New Booking'}
              </button>
            </div>
          </div>

          {/* Desktop Menu Container */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1">
            <ul className="flex flex-row items-center mx-auto gap-2 xl:gap-4">
              {navItems.map((item) => (
                <li key={item.name} className="relative group py-3">
                  {item.isDropdown ? (
                    <>
                      <button
                        className={`flex items-center gap-1 font-semibold py-2.5 px-3 transition-colors duration-300 cursor-pointer group ${getDropdownButtonColor()}`}
                      >
                        {item.name}
                        <FaAngleDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                      </button>

                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-[999]">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-l border-t border-gray-100 rotate-45"></div>

                        {!item.dropdownColumns && (
                          <div className="min-w-[260px] bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 px-2.5">
                            <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#ff581b] px-3 pb-1.5 mb-1">
                              Choose Layout
                            </p>
                            {item.dropdownItems?.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.link}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F6F3F0] transition-all duration-200 border border-transparent hover:border-orange-100 group/link"
                              >
                                <span className="w-9 h-9 rounded-lg bg-orange-50 text-[#ff581b] flex items-center justify-center text-base group-hover/link:bg-[#ff581b] group-hover/link:text-white group-hover/link:scale-105 transition-all">
                                  {sub.icon}
                                </span>
                                <div className="flex-1">
                                  <strong className="text-[13px] font-bold text-[#121212] block">
                                    {sub.name}
                                  </strong>
                                  <small className="text-[11px] text-[#555555] block">
                                    {sub.desc}
                                  </small>
                                </div>
                                {sub.badge && (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#ff581b] text-white">
                                    {sub.badge}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        )}

                        {item.dropdownColumns && (
                          <div className="min-w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex gap-0 p-3.5">
                            <div className="flex-1 px-1.5">
                              <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#ff581b] px-3 pb-1.5">
                                Restaurant
                              </p>
                              {item.dropdownItemsLeft?.map((sub) => (
                                <a
                                  key={sub.name}
                                  href={sub.link}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F6F3F0] transition-all duration-200 border border-transparent hover:border-orange-100 group/link"
                                >
                                  <span className="w-9 h-9 rounded-lg bg-orange-50 text-[#ff581b] flex items-center justify-center text-base group-hover/link:bg-[#ff581b] group-hover/link:text-white group-hover/link:scale-105 transition-all">
                                    {sub.icon}
                                  </span>
                                  <div className="flex-1">
                                    <strong className="text-[13px] font-bold text-[#121212] block">
                                      {sub.name}
                                    </strong>
                                    <small className="text-[11px] text-[#555555] block">
                                      {sub.desc}
                                    </small>
                                  </div>
                                </a>
                              ))}
                            </div>
                            <div className="w-px bg-black/5 my-1.5 mx-2"></div>
                            <div className="flex-1 px-1.5">
                              <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#ff581b] px-3 pb-1.5">
                                Info Pages
                              </p>
                              {item.dropdownItemsRight?.map((sub) => (
                                <a
                                  key={sub.name}
                                  href={sub.link}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F6F3F0] transition-all duration-200 border border-transparent hover:border-orange-100 group/link"
                                >
                                  <span className="w-9 h-9 rounded-lg bg-orange-50 text-[#ff581b] flex items-center justify-center text-sm group-hover/link:bg-[#ff581b] group-hover/link:text-white group-hover/link:scale-105 transition-all">
                                    {sub.icon}
                                  </span>
                                  <div className="flex-1">
                                    <strong className="text-[13px] font-bold text-[#121212] block">
                                      {sub.name}
                                    </strong>
                                    <small className="text-[11px] text-[#555555] block">
                                      {sub.desc}
                                    </small>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.link}
                      className={`block font-semibold py-2.5 px-3 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full ${getNavLinkColor()}`}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop Header Actions */}
            <div className="flex items-center gap-4 lg:gap-5">
              <a
                href="/cart"
                className={`relative w-10 h-10 lg:w-15 lg:h-11 rounded-full transition-all duration-300 group overflow-hidden cursor-pointer flex items-center justify-center ${
                  scrolled || !isHomePage
                    ? "text-[#ff581b] bg-white hover:bg-[#ff581b] hover:text-white"
                    : "text-white hover:bg-[#ff581b] hover:text-white"
                }`}
              >
                <FaShoppingCart className="text-lg transition-colors" />
                {cartCount > 0 && (
                  <span
                    className={`absolute top-1 right-1 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center z-20 ${
                      scrolled || !isHomePage ? "bg-black" : "bg-[#ff581b]"
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </a>

              {/* Auth Dropdown - Desktop */}
              {!isLoggedIn ? (
                <div className="relative auth-dropdown">
                  <button
                    onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                    className={`flex items-center gap-2 font-bold py-3 px-5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg ${
                      scrolled || !isHomePage
                        ? "bg-[#ff581b] text-white hover:bg-black"
                        : "bg-white text-[#ff581b] hover:bg-[#ff581b] hover:text-white"
                    }`}
                  >
                    <FaUser size={14} /> Account
                    <FaAngleDown
                      className={`text-xs transition-transform duration-300 ${showAuthDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showAuthDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[1000] animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={handleLoginRedirect}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-[#ff581b] flex items-center justify-center group-hover:bg-[#ff581b] group-hover:text-white transition-all">
                          <FaSignInAlt size={16} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#121212]">
                            Sign In
                          </div>
                          <div className="text-xs text-gray-500">
                            Access your account
                          </div>
                        </div>
                      </button>
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button
                        onClick={handleSignupRedirect}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-[#ff581b] flex items-center justify-center group-hover:bg-[#ff581b] group-hover:text-white transition-all">
                          <FaUserPlus size={16} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#121212]">
                            Sign Up
                          </div>
                          <div className="text-xs text-gray-500">
                            Create new account
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative auth-dropdown">
                  <button
                    onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      scrolled || !isHomePage
                        ? "bg-gray-100"
                        : "bg-white backdrop-blur-sm"
                    }`}
                  >
                    <FaUserCircle
                      className={`text-xl ${
                        scrolled || !isHomePage
                          ? "text-[#ff581b]"
                          : "text-[#ff581b]"
                      }`}
                    />
                    <span
                      className={`font-medium text-sm ${
                        scrolled || !isHomePage
                          ? "text-[#121212]"
                          : "text-[#ff581b]"
                      }`}
                    >
                      {userName?.split(" ")[0]}
                    </span>
                    <FaAngleDown
                      className={`text-xs transition-transform duration-300 ${showAuthDropdown ? "rotate-180" : ""} ${
                        scrolled || !isHomePage
                          ? "text-[#121212]"
                          : "text-[#ff581b]"
                      }`}
                    />
                  </button>

                  {/* Logged In Dropdown Menu */}
                  {showAuthDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[1000] animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-[#121212]">
                          {userName?.split(" ")[0]}
                        </div>
                        <div className="text-xs text-gray-500">Logged in</div>
                      </div>
                      <button
                        onClick={() => {
                          setShowAuthDropdown(false);
                          router.push("/accounts");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-[#ff581b] group-hover:text-white transition-all">
                          <FaUserCircle size={16} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#121212]">
                            My Profile
                          </div>
                          <div className="text-xs text-gray-500">
                            View your profile
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                          <FaSignOutAlt size={16} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-red-600">
                            Logout
                          </div>
                          <div className="text-xs text-gray-500">
                            Sign out of your account
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleNewBookingClick}
                className={`font-bold px-5 py-[0.8rem] lg:px-6 rounded-full relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg group z-10 ${
                  scrolled || !isHomePage
                    ? "bg-[#ff581b] text-white hover:bg-black"
                    : "bg-white text-[#ff581b] hover:bg-[#ff581b] hover:text-white"
                }`}
              >
                <span className="relative z-10 text-[16px]">{hasDeliveryData ? 'Edit Booking' : 'New Booking'}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Delivery Selection Modal */}
      <DeliverySelectionModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
      />
    </>
  );
};

export default HeaderPage;
