"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaChevronUp,
  FaPaperPlane,
} from "react-icons/fa";

const FooterPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTopClassName = "footer-scroll-top fixed bottom-5 lg:bottom-10 right-5 lg:right-10 w-11 h-11 lg:w-14 lg:h-14 bg-[#ff581b] text-white rounded-full cursor-pointer flex items-center justify-center text-base lg:text-xl z-[1000] transition-all duration-300 shadow-[0_10px_35px_rgba(255,107,53,0.4)] hover:-translate-y-2 hover:scale-110 hover:shadow-[0_15px_45px_rgba(255,107,53,0.5)]";

  return (
    <>
      <style>{`
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.02); }
          66% { transform: translate(-30px, 20px) scale(0.98); }
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(180deg) translate(-40px, 10px); }
        }
        @keyframes pulseRightAnim {
          0% { left: -50px; background: linear-gradient(90deg, transparent 0%, #ff581b 60%, #ff581b 100%); }
          100% { left: 100%; background: linear-gradient(90deg, transparent 0%, #ff581b 60%, #ff581b 100%); }
        }
        .animate-blob-2 {
          animation: blobFloat2 18s infinite;
        }
        .animate-blob-3 {
          animation: blobFloat3 20s infinite;
        }
        .animate-pulse-right {
          animation: pulseRightAnim 8s ease-in-out infinite;
        }
      `}</style>

      <footer className="footer-modern relative text-[#555555] overflow-hidden mt-10 lg:mt-[100px] z-[1]">
        {/* Footer Background */}
        <div className="footer-background absolute inset-0 overflow-hidden transition-all duration-300 z-[1]">
          <div
            className="footer-blob footer-blob-2 absolute w-[180px] h-[180px] lg:w-[350px] lg:h-[350px] bottom-[5%] left-[-5%] lg:left-[-5%] bg-no-repeat bg-center bg-cover opacity-30 lg:opacity-80 pointer-events-none z-0 hidden lg:block animate-blob-2"
            style={{ backgroundImage: "url('/assets/images/shape/tacos.png')" }}
          ></div>
          <div
            className="footer-blob footer-blob-3 absolute w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] bottom-[5%] right-[-15%] lg:right-[-12%] bg-no-repeat bg-center bg-cover opacity-30 lg:opacity-80 pointer-events-none z-0 hidden lg:block animate-blob-3"
            style={{ backgroundImage: "url('/assets/images/shape/pizza.png')" }}
          ></div>
        </div>

        <div className="footer-wrapper relative top-10 z-[2]">
          <div>
            <img
              className="curve-shape footer-bar-shape w-full"
              src="/assets/images/shape-bottom.png"
              alt="img"
            />

            {/* Top Section with CTA / Newsletter */}
            <div className="footer-cta-section relative py-12 lg:py-20 text-white overflow-hidden bg-[#f4b400]">
              <div className="container mx-auto px-4 lg:px-8 max-w-[1480px] relative z-[2] flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="footer-cta-content w-full lg:max-w-[560px]">
                  <h3 className="footer-cta-title text-3xl lg:text-5xl font-extrabold text-white tracking-[-1px] mb-3 lg:mb-4">
                    Join Our{" "}
                    <span className="footer-text-highlight text-black">
                      Culinary Journey
                    </span>
                  </h3>
                  <p className="footer-cta-subtitle text-sm lg:text-base text-white/80 mb-4 lg:mb-5 leading-relaxed">
                    Subscribe to exclusive offers and mouth-watering updates
                  </p>
                  <form
                    className="footer-newsletter flex flex-col sm:flex-row gap-0 max-w-full w-full"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 lg:px-6 lg:py-4 bg-[#ff581b] text-white text-sm lg:text-base rounded-full sm:rounded-r-none border border-white/20 focus:outline-none placeholder-white/70"
                    />
                    <button
                      type="submit"
                      className="btn-footer-subscribe px-6 py-3 lg:px-8 lg:py-4 bg-black text-white rounded-full sm:rounded-l-none text-sm lg:text-base font-semibold hover:bg-black/80 transition-all hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
                    >
                      <FaPaperPlane />
                    </button>
                  </form>
                </div>

                <div className="footer-app-download w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                  <p className="app-text text-3xl lg:text-4xl font-extrabold text-white mb-2">
                    Download Our App
                  </p>
                  <div className="store-buttons flex flex-row flex-wrap gap-3">
                    <img
                      src="/assets/images/playstore.png"
                      alt="Google Play"
                      className="h-10 lg:h-12 w-auto transition-transform hover:scale-105 cursor-pointer"
                    />
                    <img
                      src="/assets/images/appstore.png"
                      alt="App Store"
                      className="h-10 lg:h-12 w-auto transition-transform hover:scale-105 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main py-12 lg:py-20 bg-black">
              <div className="container mx-auto px-4 lg:px-8 max-w-[1480px]">
                <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-16">
                  {/* Brand Column */}
                  <div className="footer-column footer-brand-column">
                    <div className="footer-logo mb-6">
                      <Link href="/">
                        <img
                          src="/main_log_fd.png"
                          alt="Food Side"
                          className="w-48 lg:w-64 transition-all"
                        />
                      </Link>
                    </div>
                    <p className="footer-description text-white/70 text-sm lg:text-base leading-relaxed mb-6">
                      Delivering premium culinary experiences with passion,
                      quality ingredients, and exceptional service.
                    </p>
                    <div className="footer-social-links flex gap-3 lg:gap-4">
                      <Link
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110"
                      >
                        <FaFacebookF className="text-base lg:text-lg" />
                      </Link>
                      <Link
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110"
                      >
                        <FaInstagram className="text-base lg:text-lg" />
                      </Link>
                      <Link
                        href="https://x.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110"
                      >
                        <FaTwitter className="text-base lg:text-lg" />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110"
                      >
                        <FaLinkedinIn className="text-base lg:text-lg" />
                      </Link>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="footer-column">
                    <h5 className="footer-column-title text-white text-sm lg:text-base font-bold uppercase tracking-wider mb-5 lg:mb-8 relative pb-3 lg:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 lg:after:w-12 after:h-0.5 after:bg-[#ff581b] after:rounded-sm">
                      Quick Menu
                    </h5>
                    <ul className="footer-links space-y-3">
                      <li><Link href="/" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Home</Link></li>
                      <li><Link href="/menu" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Menu</Link></li>
                      <li><Link href="/about_us" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">About Us</Link></li>
                      <li><Link href="/contact_us" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Contact Us</Link></li>
                      <li><Link href="/refundPolicy" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Refund Policy</Link></li>
                      <li><Link href="/reservation" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Reservation</Link></li>
                      <li><Link href="/shop" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Shop</Link></li>
                      <li><Link href="/blog" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Blog</Link></li>
                    </ul>
                  </div>

                  {/* Services */}
                  <div className="footer-column">
                    <h5 className="footer-column-title text-white text-sm lg:text-base font-bold uppercase tracking-wider mb-5 lg:mb-8 relative pb-3 lg:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 lg:after:w-12 after:h-0.5 after:bg-[#ff581b] after:rounded-sm">
                      Our Services
                    </h5>
                    <ul className="footer-links space-y-3">
                      <li><Link href="/shop" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Food Delivery</Link></li>
                      <li><Link href="/menu" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Private Dining</Link></li>
                      <li><Link href="/shop" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Takeaway Pickup</Link></li>
                      <li><Link href="/contact" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Wedding Catering</Link></li>
                      <li><Link href="/reservation" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Party Booking</Link></li>
                      <li><Link href="/contact_us" className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block">Corporate Lunches</Link></li>
                    </ul>
                  </div>

                  {/* Contact Information */}
                  <div className="footer-column">
                    <h5 className="footer-column-title text-white text-sm lg:text-base font-bold uppercase tracking-wider mb-5 lg:mb-8 relative pb-3 lg:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 lg:after:w-12 after:h-0.5 after:bg-[#ff581b] after:rounded-sm">
                      Contact Us
                    </h5>
                    <div className="contact-info space-y-4 lg:space-y-5">
                      <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaPhoneAlt className="text-[#ff581b] text-base lg:text-lg" />
                        <p className="text-white/70 text-sm lg:text-base">+91 8688043861</p>
                      </div>
                      <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaEnvelope className="text-[#ff581b] text-base lg:text-lg" />
                        <p className="text-white/70 text-sm lg:text-base">info@foodside.co.in</p>
                      </div>
                      <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaClock className="text-[#ff581b] text-base lg:text-lg" />
                        <p className="text-white/70 text-sm lg:text-base">Mon-Sat: 9am - 10pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Divider */}
                <div className="horizontal-pulse w-full h-px relative overflow-hidden my-8 lg:my-10 bg-gradient-to-r from-transparent via-[#222] to-transparent">
                  <div className="absolute top-0 left-[-50px] w-[50px] h-full bg-gradient-to-r from-transparent via-[#ff581b] to-[#ff581b] animate-pulse-right"></div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                  <div className="footer-bottom-content flex flex-col lg:flex-row justify-between items-center gap-6">
                    <p className="copyright-text text-white/60 text-xs lg:text-sm text-center lg:text-left">
                      &copy; 2026 Dexterous Technologie. All Rights Reserved.
                      <span className="hidden lg:inline mx-2 opacity-40">|</span>
                      <br className="lg:hidden" />
                      <Link href="/privacypolicy" className="text-[#ff581b] hover:text-white transition-colors mx-1">Privacy Policy</Link>
                      <span className="opacity-40 mx-1">|</span>
                      <Link href="/terms_conditions" className="text-[#ff581b] hover:text-white transition-colors mx-1">Terms & Conditions</Link>
                    </p>
                    <div className="payment-methods flex items-center gap-3 flex-wrap justify-center">
                      <span className="payment-label text-white/60 text-[10px] lg:text-xs uppercase tracking-wide font-semibold">We Accept:</span>
                      <div className="flex gap-2 lg:gap-3">
                        <FaCcVisa className="text-white/50 text-xl lg:text-2xl hover:text-white transition-all cursor-pointer hover:scale-110" />
                        <FaCcMastercard className="text-white/50 text-xl lg:text-2xl hover:text-white transition-all cursor-pointer hover:scale-110" />
                        <FaCcPaypal className="text-white/50 text-xl lg:text-2xl hover:text-white transition-all cursor-pointer hover:scale-110" />
                        <FaCcAmex className="text-white/50 text-xl lg:text-2xl hover:text-white transition-all cursor-pointer hover:scale-110" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {mounted && (
          <button
            onClick={scrollToTop}
            className={`${scrollTopClassName} ${showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <FaChevronUp />
          </button>
        )}
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob-float-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.02);
          }
          66% {
            transform: translate(-30px, 20px) scale(0.98);
          }
        }
        @keyframes blob-float-3 {
          0%,
          100% {
            transform: rotate(0deg) translate(0, 0);
          }
          50% {
            transform: rotate(180deg) translate(-40px, 10px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseRight {
          0% {
            left: -50px;
            background: linear-gradient(
              90deg,
              transparent 0%,
              #ff581b 60%,
              #ff581b 100%
            );
          }
          100% {
            left: 100%;
            background: linear-gradient(
              90deg,
              transparent 0%,
              #ff581b 60%,
              #ff581b 100%
            );
          }
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.6) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default FooterPage;