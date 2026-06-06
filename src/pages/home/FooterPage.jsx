"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
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
  const router = useRouter();
const [email, setEmail] = useState("");
  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="footer-modern relative text-[#555555] overflow-hidden mt-10 lg:mt-[1px] z-[1]">
        {/* Footer Background */}
        <div className="footer-background absolute inset-0 overflow-hidden transition-all duration-300 z-[1]">
          <div
            className="footer-blob footer-blob-2 absolute w-[180px] h-[180px] lg:w-[350px] lg:h-[350px] bottom-[5%] left-[-5%] lg:left-[-5%] bg-no-repeat bg-center bg-cover opacity-30 lg:opacity-80 pointer-events-none z-0 animate-[blob-float-2_18s_infinite] hidden lg:block"
            style={{ backgroundImage: "url('/assets/images/shape/tacos.png')" }}
          ></div>
          <div
            className="footer-blob footer-blob-3 absolute w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] bottom-[5%] right-[-15%] lg:right-[-12%] bg-no-repeat bg-center bg-cover opacity-30 lg:opacity-80 pointer-events-none z-0 animate-[blob-float-3_20s_infinite] hidden lg:block"
            style={{ backgroundImage: "url('/assets/images/shape/pizza.png')" }}
          ></div>
          <div className="footer-decorative-line"></div>
        </div>

        <div className="footer-wrapper relative top-10 z-[2]">
          <div>
            <img
              className="curve-shape footer-bar-shape  w-full"
              src="/assets/images/shape-bottom.png"
              alt="img"
            />

            {/* Top Section with CTA / Newsletter */}
            <div className="footer-cta-section relative py-12 lg:py-20 text-white overflow-hidden bg-[#f4b400] before:content-[''] before:absolute before:top-0 before:right-[-10%] before:w-[60%] before:h-full before:bg-[#ff581b] before:rounded-tl-[200px] before:rounded-bl-[200px] before:z-[1] before:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] before:bg-[length:10px_10px]">
              <div className="container mx-auto px-4 lg:px-8 max-w-[1480px] relative z-[2] flex flex-col lg:flex-row items-start justify-between gap-8">
                {/* Left Content - Newsletter */}
               <div className="footer-cta-content w-full lg:max-w-[560px]">
                  <h3 className="footer-cta-title text-3xl lg:text-5xl font-extrabold text-white font-['Raleway',sans-serif] tracking-[-1px] mb-3 lg:mb-4">
                    Join Our{" "}
                    <span className="footer-text-highlight text-black font-['Yesteryear',cursive]">
                      Culinary Journey
                    </span>
                  </h3>
                  <p className="footer-cta-subtitle text-sm lg:text-base text-white/80 mb-4 lg:mb-5 leading-relaxed">
                    Subscribe to exclusive offers and mouth-watering updates
                  </p>
               <form
  className="footer-newsletter flex flex-row gap-0 max-w-full w-full"
  onSubmit={(e) => {
    e.preventDefault();

    router.push("/contact_us");

  setEmail("");
  }}
>
 <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  required
  className="flex-1 min-w-0 px-4 py-3 lg:px-6 lg:py-4 bg-[#ff581b] text-white text-sm lg:text-base rounded-full sm:rounded-r-none border border-white/20 focus:outline-none"
/>

  <button
    type="submit"
    className="btn-footer-subscribe px-6 py-3 lg:px-8 lg:py-4 bg-black text-white rounded-full sm:rounded-l-none text-sm lg:text-base font-semibold hover:bg-black/80 transition-all hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
  >
    <FaPaperPlane />
  </button>
</form>
                </div>

                {/* Right Side - App Download */}

               <div className="footer-app-download w-full lg:w-auto pt-0 lg:pt-0 border-t lg:border-t-0 border-white/10">
                  <p className="app-text text-3xl lg:text-4xl font-extrabold text-white font-['Raleway',sans-serif] mb-2">
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
                {/* Footer Grid */}
                <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-16">
                  {/* Brand Column */}
                  <div className="footer-column footer-brand-column animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
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
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110 hover:shadow-[0_15px_35px_rgba(255,107,53,0.4)] border-2 border-transparent hover:border-[#ff581b] relative overflow-hidden group"
                      >
                        <FaFacebookF className="text-base lg:text-lg relative z-10" />
                        <span className="absolute inset-0 bg-[#ff581b] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      </Link>
                      <Link
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110 hover:shadow-[0_15px_35px_rgba(255,107,53,0.4)] border-2 border-transparent hover:border-[#ff581b] relative overflow-hidden group"
                      >
                        <FaInstagram className="text-base lg:text-lg relative z-10" />
                        <span className="absolute inset-0 bg-[#ff581b] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      </Link>
                      <Link
                        href="https://x.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110 hover:shadow-[0_15px_35px_rgba(255,107,53,0.4)] border-2 border-transparent hover:border-[#ff581b] relative overflow-hidden group"
                      >
                        <FaTwitter className="text-base lg:text-lg relative z-10" />
                        <span className="absolute inset-0 bg-[#ff581b] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ff581b]/10 text-[#ff581b] flex items-center justify-center transition-all duration-300 hover:bg-[#ff581b] hover:text-white hover:-translate-y-2 hover:scale-110 hover:shadow-[0_15px_35px_rgba(255,107,53,0.4)] border-2 border-transparent hover:border-[#ff581b] relative overflow-hidden group"
                      >
                        <FaLinkedinIn className="text-base lg:text-lg relative z-10" />
                        <span className="absolute inset-0 bg-[#ff581b] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      </Link>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="footer-column animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                    <h5 className="footer-column-title text-white text-sm lg:text-base font-bold uppercase tracking-wider mb-5 lg:mb-8 relative pb-3 lg:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 lg:after:w-12 after:h-0.5 after:bg-[#ff581b] after:rounded-sm">
                      Quick Menu
                    </h5>
                    <ul className="footer-links space-y-3">
                      <li>
                        <Link
                          href="/"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        {/* <Link
                          href="/menu"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Menu
                        </Link> */}
                      </li>
                      <li>
                        <Link
                          href="/about_us"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact_us"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/refundPolicy"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Refund Policy
                        </Link> 
                      </li>

                        <li>
                        <Link
                          href="/faq"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                        FAQ
                        </Link> 
                      </li>



                      {/* <li>
                        <Link
                          href="/reservation"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Reservation
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          href="/shop"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Shop
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          href="/blog"
                          className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Blog
                        </Link>
                      </li> */}




                    </ul>
                  </div>

                  {/* Services */}
                    <div className="footer-column animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
                      <h5 className="footer-column-title text-white text-sm lg:text-base font-bold uppercase tracking-wider mb-5 lg:mb-8 relative pb-3 lg:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 lg:after:w-12 after:h-0.5 after:bg-[#ff581b] after:rounded-sm">
                       My Account
                      </h5>
                      <ul className="footer-links space-y-3">

 <li>
                          <Link
                            href="/accounts/login"
                            className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                          >
                          Account
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/login"
                            className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                          >
                           login
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/menu"
                            className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                          >
                           Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/shop"
                            className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                          >
                            View Cart
                          </Link>
                        </li>
                       
                        <li>
                          <Link
                            href="/resgister_new"
                            className="text-white/70 text-sm lg:text-base transition-all duration-300 hover:text-[#ff581b] hover:pl-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#ff581b] after:transition-all after:duration-300 hover:after:w-full"
                          >
                           SignUp
                          </Link>
                        </li>
                      
                      </ul>
                    </div>

                  {/* Contact Information */}
                  <div className="footer-column animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
                    <h5 className="footer-column-title text-white text-sm lg:text-base font-bold uppercase tracking-wider mb-5 lg:mb-8 relative pb-3 lg:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 lg:after:w-12 after:h-0.5 after:bg-[#ff581b] after:rounded-sm">
                      Contact Us
                    </h5>
                    <div className="contact-info space-y-4 lg:space-y-5">
                      {/* <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaMapMarkerAlt className="text-[#ff581b] text-base lg:text-lg mt-1 group-hover:text-white group-hover:scale-110 transition-all" />
                        <div>
                          <p className="text-white/70 text-sm lg:text-base">
                          BOLLINENI VENTURES
                          </p>
                       
                        </div>
                      </div> */}
                      <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaPhoneAlt className="text-[#ff581b] text-base lg:text-lg group-hover:text-white group-hover:scale-110 transition-all" />
                        <p className="text-white/70 text-sm lg:text-base">
                          +91 8688043861
                        </p>
                      </div>
                      <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaEnvelope className="text-[#ff581b] text-base lg:text-lg group-hover:text-white group-hover:scale-110 transition-all" />
                        <a href="mailto:info@foodside.co.in" className="text-white/70 text-sm lg:text-base">
                          info@foodside.co.in
                        </a>
                      </div>
                      <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaEnvelope className="text-[#ff581b] text-base lg:text-lg group-hover:text-white group-hover:scale-110 transition-all" />
                        <a href="mailto:admin@foodside.co.in" className="text-white/70 text-sm lg:text-base">
                      admin@foodside.co.in
                        </a>
                      </div>
                      <div className="info-item flex gap-3 lg:gap-4 group transition-all hover:translate-x-2">
                        <FaClock className="text-[#ff581b] text-base lg:text-lg group-hover:text-white group-hover:scale-110 transition-all" />
                        <p className="text-white/70 text-sm lg:text-base">
                          Mon-Sat: 9am - 10pm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Divider - Horizontal Pulse */}
                <div className="horizontal-pulse w-full h-px relative overflow-hidden my-8 lg:my-10 bg-gradient-to-r from-transparent via-[#222] to-transparent">
                  <div className="absolute top-0 left-[-50px] w-[50px] h-full bg-gradient-to-r from-transparent via-[#ff581b] to-[#ff581b] animate-[pulseRight_8s_ease-in-out_infinite] shadow-[0_0_15px_#ff581b]"></div>
                </div>

                {/* Footer Bottom */}
                {/* Footer Bottom */}
<div className="footer-bottom">
                  <div className="footer-bottom-content flex flex-col lg:flex-row justify-between items-center gap-6">
                    <p className="copyright-text text-white/60 text-xs lg:text-sm text-center lg:text-left">
                      {/* &copy; 2026 Dexterous Technologie. All Rights Reserved. */}
                       &copy; {new Date().getFullYear()} Dexterous Technologie. All Rights Reserved.
                      <span className="hidden lg:inline mx-2 opacity-40">
                        |
                      </span>
                      <br className="lg:hidden" />
                      <Link
                        href="/privacypolicy"
                        className="text-[#ff581b] hover:text-white transition-colors mx-1"
                      >
                        Privacy Policy
                      </Link>
                      <span className="opacity-40 mx-1">|</span>
                      <Link
                        href="/terms_conditions"
                        className="text-[#ff581b] hover:text-white transition-colors mx-1"
                      >
                        Terms & Conditions
                      </Link>
                    </p>
                    <div className="payment-methods flex items-center gap-3 flex-wrap justify-center">
                      <span className="payment-label text-white/60 text-[10px] lg:text-xs uppercase tracking-wide font-semibold">
                        We Accept:
                      </span>
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
        <button
          onClick={scrollToTop}
          className={`footer-scroll-top fixed bottom-5 lg:bottom-10 right-5 lg:right-10 w-11 h-11 lg:w-14 lg:h-14 bg-[#ff581b] text-white rounded-full cursor-pointer flex items-center justify-center text-base lg:text-xl z-[1000] transition-all duration-300 shadow-[0_10px_35px_rgba(255,107,53,0.4)] hover:-translate-y-2 hover:scale-110 hover:shadow-[0_15px_45px_rgba(255,107,53,0.5)] ${showScrollTop ? "opacity-100 visible animate-[popIn_0.4s_ease-out]" : "opacity-0 invisible"}`}
        >
          <FaChevronUp />
        </button>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
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
