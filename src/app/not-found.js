"use client";
import Link from "next/link";
import React, { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll("[data-aos]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute("data-aos-delay") || "0";
            setTimeout(() => {
              entry.target.classList.add("aos-animate");
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff581b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff581b]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff581b]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Animated 404 Number */}
          <div 
            className="relative mb-8"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="text-[150px] md:text-[250px] lg:text-[300px] font-black leading-none tracking-tighter">
              <span className="text-[#121212]">4</span>
              <span className="text-[#ff581b] inline-block [animation:bounce_2s_ease-in-out_infinite]">0</span>
              <span className="text-[#121212]">4</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="text-[150px] md:text-[250px] lg:text-[300px] font-black text-[#ff581b] select-none">
                404
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div 
            className="mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full"></span>
              Oops! Page Not Found
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full"></span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#121212] mb-4">
              Lost Your <span className="text-[#ff581b]">Way?</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, we'll help you find your way back to delicious food!
            </p>
          </div>

          

          {/* Action Buttons */}
          <div 
            className="flex flex-wrap gap-4 justify-center mb-12"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="800"
          >
            <Link
              href="/"
              className="bg-[#ff581b] text-white rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-[#e04e12] transition-all font-semibold shadow-md hover:shadow-lg group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
           
            <Link
              href="/contact_us"
              className="bg-gray-100 text-gray-700 rounded-full py-4 px-8 hover:bg-gray-200 transition-all font-semibold inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Support
            </Link>
          </div>

     
          
        </div>
      </div>

      <style jsx>{`
        [data-aos] {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        [data-aos].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </main>
  );
}