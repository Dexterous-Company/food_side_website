
"use client";
// components/About.jsx
import React, { useEffect } from 'react';
import AOS from '../../../utils/aos';

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-radial from-[#ff581b]/5 to-transparent top-[-200px] right-[-200px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#ff581b]/5 to-transparent bottom-[-100px] left-[-100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <div className="relative h-[480px] md:h-[620px]" data-aos="fade-right" data-aos-duration="900">
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#ff581b]/10 to-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-blob" />
            
            {/* Floating Dots */}
            <div className="absolute w-3.5 h-3.5 rounded-full bg-[#ff581b]/20 top-[60px] left-[40px]" />
            <div className="absolute w-2 h-2 rounded-full bg-[#ff581b]/12 top-[120px] left-[10px]" />
            <div className="absolute w-5 h-5 rounded-full bg-[#ff581b]/20 bottom-[80px] right-[50px]" />
            
            {/* Image Cards */}
            <div className="absolute w-[195px] md:w-[260px] h-[255px] md:h-[340px] top-[50px] left-[5px] rotate-[-6deg] rounded-[120px_24px_120px_24px] overflow-hidden border-[5px] border-[#ff581b] shadow-xl transition-all hover:rotate-[-3deg] hover:-translate-y-2 group">
              <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=500&fit=crop" alt="Kitchen" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff581b]" /> Our Kitchen
              </div>
            </div>
            
            <div className="absolute w-[215px] md:w-[280px] h-[275px] md:h-[360px] top-[30px] left-1/2 -translate-x-1/2 rounded-[24px_120px_24px_120px] overflow-hidden border-[5px] border-[#ff581b] shadow-xl transition-all hover:-translate-y-2.5 group z-10">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=500&fit=crop" alt="Signature Dish" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff581b]" /> Signature Dish
              </div>
            </div>
            
            <div className="absolute w-[190px] md:w-[255px] h-[250px] md:h-[330px] top-[60px] right-0 rotate-6 rounded-[24px_120px_24px_120px] overflow-hidden border-[5px] border-[#ff581b] shadow-xl transition-all hover:rotate-3 hover:-translate-y-2 group">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=500&fit=crop" alt="Fine Dining" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff581b]" /> Fine Dining
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute bottom-20 left-0 bg-white rounded-xl p-3 shadow-xl flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-[#ff581b]/10 flex items-center justify-center text-xl">🏆</div>
              <div>
                <strong className="block font-heading text-lg">15+</strong>
                <span className="text-xs text-gray-500">Awards Won</span>
              </div>
            </div>
            <div className="absolute bottom-20 right-0 bg-white rounded-xl p-3 shadow-xl flex items-center gap-3 animate-float-delayed">
              <div className="w-10 h-10 rounded-xl bg-[#ff581b]/10 flex items-center justify-center text-xl">⭐</div>
              <div>
                <strong className="block font-heading text-lg">4.9 / 5</strong>
                <span className="text-xs text-gray-500">Guest Rating</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:pl-8" data-aos="fade-left" data-aos-duration="900">
            <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our Story
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Passion On Every<br /><span className="text-[#ff581b] font-title">Plate We Serve</span>
            </h2>
            
            {/* Chefs Row */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff581b] to-[#ff581b] border-2 border-white flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=40&h=40&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Chef" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f4b400] to-[#f4b400] border-2 border-white flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=40&h=40&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Chef" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-900 border-2 border-white flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=40&h=40&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Chef" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center border-2 border-white">+8</div>
              </div>
              <p className="text-gray-600 text-sm"><strong className="text-gray-900">11 Expert Chefs</strong> crafting every dish with love</p>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Food Side, food is more than sustenance — it's a language of love. Since 2012, our kitchens have been alive with the aromas of hand-selected spices, farm-fresh vegetables, and slow-cooked traditions passed down through generations.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every dish we create is a promise: the finest ingredients, the boldest flavors, and an experience that lingers long after the last bite. Whether you dine with us or we come to your door, Food Side brings the restaurant to you.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Farm-Fresh Ingredients", "Halal Certified", "Zero Preservatives", "Daily Fresh Menu"].map((item, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-[#ff581b]/30 text-[#ff581b] text-sm font-medium hover:bg-[#ff581b] hover:text-white transition-colors">
                  {item}
                </span>
              ))}
            </div>
            
            {/* Stats Strip */}
            <div className="grid grid-cols-3 gap-0 border border-gray-200 rounded-xl overflow-hidden mb-8 bg-gray-50">
              <div className="py-5 text-center border-r border-gray-200 hover:bg-[#ff581b]/5 transition-colors">
                <div className="text-2xl font-black text-[#ff581b]">50K+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Happy Guests</div>
              </div>
              <div className="py-5 text-center border-r border-gray-200 hover:bg-[#ff581b]/5 transition-colors">
                <div className="text-2xl font-black text-[#ff581b]">12 Yrs</div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Experience</div>
              </div>
              <div className="py-5 text-center hover:bg-[#ff581b]/5 transition-colors">
                <div className="text-2xl font-black text-[#ff581b]">98%</div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Satisfaction</div>
              </div>
            </div>
            
            <button className="group bg-[#ff581b] text-white rounded-full py-4 px-8 font-bold relative overflow-hidden transition-all">
              <span className="relative z-10 flex items-center gap-2">
                Explore Our Menu
                <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {/* <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" /> */}
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="mt-20 overflow-hidden border-y border-gray-200 bg-[#ff581b] py-4">
        <div className="flex gap-12 animate-marquee w-max">
          {["Fine Dining", "Fast Delivery", "Gourmet Experience", "Fresh Ingredients", "Award-Winning Chefs", "Halal Certified", "Family Friendly", "Private Events"].map((item, i) => (
            <div key={i} className="flex items-center gap-12 text-white font-bold uppercase tracking-wider text-sm">
              {item}
              <span className="text-black">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;