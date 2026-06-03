"use client";
import React, { useEffect, useRef } from "react";

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Animation for floating shapes
    const shapes = document.querySelectorAll(".hero-shape");
    shapes.forEach((shape, index) => {
      const duration = 5 + index * 0.5;
      const delay = index * 0.3;
      shape.style.animation = `floatY ${duration}s ease-in-out infinite ${delay}s`;
    });

    // AOS initialization would go here if using AOS library
    // For now, we'll just add classes for animations
    const animateElements = document.querySelectorAll("[data-aos]");
    animateElements.forEach((el) => {
      const delay = el.getAttribute("data-aos-delay") || "0";
      const duration = el.getAttribute("data-aos-duration") || "400";
      el.style.animation = `fadeInUp ${parseInt(duration) / 1000}s ease-out ${parseInt(delay) / 1000}s both`;
    });
  }, []);

  return (
    <section
      className="hero-section relative min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a0a00] to-[#0d0d0d] overflow-hidden flex items-center p-0"
      id="hero"
    >
      {/* Floating Shapes - Food decorations */}
      <img
        src="/assets/images/shape/tomato.png"
        className="hero-shape shape-1 absolute pointer-events-none z-0 opacity-80 w-[130px] top-[5%] left-[5%]"
        alt="Tomato"
      />
      <img
        src="/assets/images/shape/red-chilli.png"
        className="hero-shape shape-2 absolute pointer-events-none z-0 opacity-80 w-[105px] top-[3%] left-[28%]"
        alt="Red chilli"
      />
      <img
        src="/assets/images/shape/basil-leaf.png"
        className="hero-shape shape-3 absolute pointer-events-none z-0 opacity-80 w-[120px] top-[6%] left-[52%]"
        alt="Basil leaf"
      />
      <img
        src="/assets/images/shape/mushroom.png"
        className="hero-shape shape-4 absolute pointer-events-none z-0 opacity-80 w-[110px] top-[4%] right-[5%]"
        alt="Mushroom"
      />
      <img
        src="/assets/images/shape/cheese.png"
        className="hero-shape shape-5 absolute pointer-events-none z-0 opacity-80 w-[125px] top-[42%] left-[3%]"
        alt="Cheese"
      />
      <img
        src="/assets/images/shape/sliced-onion.png"
        className="hero-shape shape-6 absolute pointer-events-none z-0 opacity-80 w-[105px] top-[82%] left-[38%]"
        alt="Sliced onion"
      />
      <img
        src="/assets/images/shape/green-chili.png"
        className="hero-shape shape-7 absolute pointer-events-none z-0 opacity-80 w-[115px] top-[44%] left-[72%]"
        alt="Green chili"
      />
      <img
        src="/assets/images/shape/coriander-1.png"
        className="hero-shape shape-8 absolute pointer-events-none z-0 opacity-80 w-[120px] top-[40%] right-[3%]"
        alt="Coriander"
      />
      <img
        src="/assets/images/shape/mint-leaf.png"
        className="hero-shape shape-9 absolute pointer-events-none z-0 opacity-80 w-[115px] bottom-[6%] left-[6%]"
        alt="Mint leaf"
      />
      <img
        src="/assets/images/shape/red-chilli-2.png"
        className="hero-shape shape-10 absolute pointer-events-none z-0 opacity-80 w-[95px] bottom-[8%] left-[26%]"
        alt="Red chilli"
      />
      <img
        src="/assets/images/shape/luctus-leaf.png"
        className="hero-shape shape-11 absolute pointer-events-none z-0 opacity-80 w-[110px] bottom-[5%] left-[50%]"
        alt="Luctus leaf"
      />
      <img
        src="/assets/images/shape/coriander-2.png"
        className="hero-shape shape-12 absolute pointer-events-none z-0 opacity-80 w-[100px] bottom-[7%] right-[8%]"
        alt="Coriander"
      />
      <img
        src="/assets/images/shape/mint-leaf-2.png"
        className="hero-shape shape-13 absolute pointer-events-none z-0 opacity-80 w-[95px] top-[8%] left-[15%]"
        alt="Mint leaf"
      />
      <img
        src="/assets/images/shape/tomato-slice.png"
        className="hero-shape shape-14 absolute pointer-events-none z-0 opacity-80 w-[100px] top-[20%] right-[10%]"
        alt="Tomato slice"
      />

      {/* Hero Orbs - Glowing background effects */}
      <div className="hero-orb orb-1 absolute rounded-full blur-[80px] pointer-events-none z-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,107,53,0.25)_0%,transparent_70%)] top-[-100px] right-[10%]"></div>
      <div className="hero-orb orb-2 absolute rounded-full blur-[80px] pointer-events-none z-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,183,3,0.15)_0%,transparent_70%)] bottom-[-80px] left-[5%]"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1480px] relative z-10">
        <div className="flex flex-wrap items-center min-h-screen hero-row pt-[120px] pb-[120px]">
          {/* Left Content */}
          <div
            className="w-full lg:w-1/2 hero-content"
            data-aos="fade-right"
            data-aos-duration="900"
          >
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold text-white leading-[1.1] mb-5 lg:mb-6 tracking-[-1px]">
              Taste The{" "}
              <span className="hero-highlight text-[#ff581b] font-['Yesteryear',cursive] inline-block">
                Finest
              </span>
              <br />
              Food In Town
            </h1>
            <p className="hero-desc text-white/65 text-base sm:text-lg leading-relaxed mb-8 lg:mb-9 max-w-[480px]">
              Handpicked meals prepared with fresh ingredients from trusted
              highway restaurants. Every order ensures a hot, hygienic, and
              satisfying travel food experience. Order now and enjoy seamless
              delivery on your journey.
            </p>
            <div className="hero-actions flex gap-4 flex-wrap mb-10 lg:mb-12">
              <a
                href="/shop"
                className="btn-default relative inline-block text-base font-bold uppercase bg-[#ff581b] text-white rounded-full py-[17px] px-[56px] pl-[25px] overflow-hidden transition-all duration-300 z-10 group"
              >
                <span className="relative z-10">Order Now</span>
                {/* <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span> */}
              </a>
              <a
                href="/assets/images/our-story.mp4"
                data-fancybox="video-story"
                data-width="1280"
                data-height="720"
                className="btn-outline-white inline-flex items-center gap-2 bg-white/6 border border-white/35 text-white backdrop-blur-md text-base font-bold uppercase rounded-full py-[17px] px-[56px] pl-[25px] overflow-hidden transition-all duration-300 hover:bg-white/16 hover:border-white/60 hover:-translate-y-0.5 z-10"
              >
                <i className="fa-solid fa-play"></i> Watch Story
              </a>
            </div>
            <div className="hero-stats flex items-center gap-6 lg:gap-7 flex-wrap">
              <div
                className="stat-item"
                data-aos="zoom-in"
                data-aos-delay="200"
                data-aos-duration="600"
              >
                <span className="stat-num text-2xl lg:text-[26px] font-extrabold text-white font-['Raleway',sans-serif] leading-none">
                  50K+
                </span>
                <span className="stat-label text-xs text-white/50 mt-1 tracking-[0.3px] block">
                  Happy Customers
                </span>
              </div>
              <div className="stat-divider w-px h-10 bg-white/15"></div>
              <div
                className="stat-item"
                data-aos="zoom-in"
                data-aos-delay="350"
                data-aos-duration="600"
              >
                <span className="stat-num text-2xl lg:text-[26px] font-extrabold text-white font-['Raleway',sans-serif] leading-none">
                  120+
                </span>
                <span className="stat-label text-xs text-white/50 mt-1 tracking-[0.3px] block">
                  Menu Items
                </span>
              </div>
              <div className="stat-divider w-px h-10 bg-white/15"></div>
              <div
                className="stat-item"
                data-aos="zoom-in"
                data-aos-delay="500"
                data-aos-duration="600"
              >
                <span className="stat-num text-2xl lg:text-[26px] font-extrabold text-white font-['Raleway',sans-serif] leading-none">
                  4.9★
                </span>
                <span className="stat-label text-xs text-white/50 mt-1 tracking-[0.3px] block">
                  Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Pizza Visual */}
          <div
            className="w-full lg:w-1/2 hero-visual mt-12 lg:mt-0 relative flex justify-center items-center"
            data-aos="fade-left"
            data-aos-duration="900"
          >
            <div className="hero-plate-wrapper relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] flex items-center justify-center">
              {/* Rotating rings */}
              <div className="plate-ring absolute inset-[-20px] rounded-full border-2 border-dashed border-[#ff581b] animate-[spinRing_18s_linear_infinite]"></div>
              <div className="plate-ring ring-2 absolute inset-[-45px] rounded-full border-2 border-dashed border-yellow-400/20 animate-[spinRing_28s_linear_infinite_reverse]"></div>

              {/* Glow effect */}
              <div className="plate-glow absolute w-[260px] h-[260px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full bg-[radial-gradient(circle,#ff581b_0%,transparent_70%)] blur-[30px] z-0"></div>

              {/* Main pizza image */}
              <img
                src="/assets/images/slider/pizza.png"
                alt="Pizza"
                className="hero-pizza relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] lg:w-[440px] lg:h-[440px] object-cover rounded-full border-[5px] border-[#ff581b] shadow-[0_0_60px_rgba(255,107,53,0.3),0_30px_80px_rgba(0,0,0,0.5)] z-[1] animate-[heroFloat_4s_ease-in-out_infinite]"
              />

              {/* Food Badges */}
              <div className="food-badge absolute bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl py-2.5 px-4 flex items-center gap-2.5 z-[3] shadow-[0_8px_30px_rgba(0,0,0,0.4)] animate-[badgeFloat_3.5s_ease-in-out_infinite] badge-top-right top-5 right-[-20px] md:right-[-20px] lg:right-[-20px]">
                <img
                  src="/assets/images/shape/mushroom.png"
                  alt="Mushroom"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white text-xs lg:text-sm font-semibold">
                  Mushroom
                </span>
              </div>
              <div className="food-badge absolute bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl py-2.5 px-4 flex items-center gap-2.5 z-[3] shadow-[0_8px_30px_rgba(0,0,0,0.4)] animate-[badgeFloat_3.5s_ease-in-out_infinite_1s] badge-bottom-left bottom-[30px] left-[-20px] md:left-[-20px] lg:left-[-20px]">
                <img
                  src="/assets/images/shape/red-chilli.png"
                  alt="Chilli"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white text-xs lg:text-sm font-semibold">
                  Spicy
                </span>
              </div>
              <div className="food-badge absolute bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl py-2.5 px-4 flex items-center gap-2.5 z-[3] shadow-[0_8px_30px_rgba(0,0,0,0.4)] animate-[badgeFloat_3.5s_ease-in-out_infinite_0.5s] badge-top-left top-[60px] left-[-30px] md:left-[-30px] lg:left-[-30px]">
                <img
                  src="/assets/images/shape/tomato-slice.png"
                  alt="Tomato"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white text-xs lg:text-sm font-semibold">
                  Fresh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve shape */}
      <img
        className="curve-shape absolute bottom-[-1px] z-[2] w-full"
        src="/assets/images/shape-bottom.png"
        alt="img"
      />
    </section>
  );
};

export default HeroSection;
