"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";

const HeaderPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header shadow
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

  // Navigation data structure
  const navItems = [
    {
      name: "Home",
      isDropdown: true,
      dropdownItems: [
        {
          name: "Homepage Classic",
          link: "/",
          icon: "🏠",
          desc: "Elegant traditional layout",
        },
        {
          name: "Homepage Video",
          link: "/home-video",
          icon: "🎬",
          desc: "Full-screen video background",
        },
      ],
    },
    {
      name: "Menu",
      isDropdown: true,
      dropdownItems: [
        {
          name: "Menu",
          link: "/menu",
          icon: "📄",
          desc: "Browse our full food collection in a classic style",
        },
        {
          name: "Menu Detail",
          link: "/menu-detail",
          icon: "📋",
          desc: "Experience our dishes with immersive visuals",
        },
      ],
    },
    { name: "About", link: "/about", isDropdown: false },
    {
      name: "Pages",
      isDropdown: true,
      dropdownColumns: true,
      dropdownItemsLeft: [
        {
          name: "Our Chefs",
          link: "/our-chefs",
          icon: "🍽️",
          desc: "Meet the culinary team",
        },
        {
          name: "Testimonials",
          link: "/testimonials",
          icon: "⭐",
          desc: "What our guests say",
        },
        {
          name: "Shop",
          link: "/shop",
          icon: "🛒",
          desc: "Product catalog and online store",
        },
        {
          name: "Shop Details",
          link: "/shop-details",
          icon: "🧾",
          desc: "Product information and specifications",
        },
        {
          name: "Cart",
          link: "/cart",
          icon: "🛒",
          desc: "View and manage your shopping cart",
        },
        {
          name: "Checkout",
          link: "/checkout",
          icon: "💵",
          desc: "Proceed to checkout",
        },
        {
          name: "Gallery",
          link: "/gallery",
          icon: "📷",
          desc: "Food & restaurant photos",
        },
        {
          name: "Reservation",
          link: "/reservation",
          icon: "🥣",
          desc: "Book your table",
        },
      ],
      dropdownItemsRight: [
        {
          name: "FAQ",
          link: "/faq",
          icon: "❓",
          desc: "Common questions answered",
        },
        {
          name: "Terms & Conditions",
          link: "/terms",
          icon: "📄",
          desc: "Our policies & rules",
        },
        {
          name: "Privacy Policy",
          link: "/privacy",
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
    {
      name: "Blog",
      isDropdown: true,
      dropdownItems: [
        {
          name: "Blog",
          link: "/blog",
          icon: "📰",
          desc: "Blog layout",
          badge: null,
        },
        {
          name: "Blog Details",
          link: "/blog-details",
          icon: "📝",
          desc: "Full article detail page",
          badge: "Hot",
        },
      ],
    },
    { name: "Contact", link: "/contact", isDropdown: false },
  ];

  return (
    <>
      {/* TOP BAR - Hidden on mobile */}
      <div className="hidden lg:block bg-[#ff581b] text-white py-2.5 text-xs shadow-md relative z-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1480px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 pr-5 border-r border-white/40">
                <FaPhoneAlt className="opacity-90" size={12} /> +91 8688043861
              </span>
              <span className="flex items-center gap-2 pr-5 border-r border-white/40">
                {/* <FaMapMarkerAlt className="opacity-90" size={12} />  */}
                BOLLINENI VENTURES
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="opacity-90" size={12} /> Opening Hour: Mon
                to Sat - 9am to 5pm
              </span>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black bg-black/10 p-1.5 rounded-full transition-all hover:bg-white hover:scale-110 duration-300"
              >
                <FaFacebookF size={12} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black bg-black/10 p-1.5 rounded-full transition-all hover:bg-white hover:scale-110 duration-300"
              >
                <FaInstagram size={12} />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black bg-black/10 p-1.5 rounded-full transition-all hover:bg-white hover:scale-110 duration-300"
              >
                <FaTwitter size={12} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black bg-black/10 p-1.5 rounded-full transition-all hover:bg-white hover:scale-110 duration-300"
              >
                <FaLinkedinIn size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`bg-white sticky top-0 z-[1000] transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-md"} border-b-2 border-[#f8f8f8]`}
      >
        <nav className="container mx-auto px-4 lg:px-8 max-w-[1480px] py-3 lg:py-0 flex justify-between items-center relative">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/main_log_fd.png"
              alt="Food Side"
              className="h-12 lg:h-[65px] w-50 transition-all object-contain duration-300 "
            />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer focus:outline-none z-[1001] relative"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black rounded-sm transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black rounded-sm transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black rounded-sm transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            ></span>
          </button>

          {/* Mobile Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden z-[998] ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
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
            {/* Mobile Menu HeaderPage */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <Image
                src="/main_log_fd.png"
                alt="Food Side"
                className="h-40 w-0 border-b"
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
                            className={`text-xs transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Mobile Dropdown Content */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${openDropdown === item.name ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
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
                <button className="flex-1 bg-[#ff581b] text-white font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-black transition-colors">
                  <FaSearch size={14} /> Search
                </button>
                <a
                  href="/cart"
                  className="flex-1 bg-gray-200 text-[#121212] font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#ff581b] hover:text-white transition-colors"
                >
                  <FaShoppingCart size={14} /> Cart (3)
                </a>
              </div>
              <a
                href="/reservation"
                className="block w-full bg-[#ff581b] text-white font-bold py-3 px-4 rounded-full text-center hover:bg-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book A Table
              </a>
            </div>
          </div>

          {/* Desktop Menu Container */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1">
            <ul className="flex flex-row items-center mx-auto gap-2 xl:gap-4">
              {navItems.map((item) => (
                <li key={item.name} className="relative group py-3">
                  {item.isDropdown ? (
                    <>
                      <button className="flex items-center gap-1 font-semibold text-[#121212] py-2.5 px-3 hover:text-[#ff581b] transition-colors duration-300 cursor-pointer group">
                        {item.name}
                        <FaAngleDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                      </button>

                      {/* Desktop Dropdown Menu */}
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
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.link}
                      className="block font-semibold text-[#121212] py-2.5 px-3 hover:text-[#ff581b] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop HeaderPage Actions */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button className="relative w-10 h-10 lg:w-11 lg:h-11 rounded-full text-[#ff581b] hover:text-white transition-all duration-300 group overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-[#ff581b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                <FaSearch className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg group-hover:text-white z-10 transition-colors" />
              </button>
              <a
                href="/cart"
                className="relative w-10 h-10 lg:w-11 lg:h-11 rounded-full text-[#ff581b] hover:text-white transition-all duration-300 group overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#ff581b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                <FaShoppingCart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg group-hover:text-white z-10 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center z-20">
                  3
                </span>
              </a>
              <a
                href="/reservation"
                className="bg-[#ff581b] text-white font-bold py-3 px-5 lg:py-[17px] lg:px-6 rounded-full relative overflow-hidden transition-all duration-300 hover:bg-black shadow-md hover:shadow-lg group z-10"
              >
                <span className="relative z-10">Book A Table</span>
                <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"></span>
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderPage;
