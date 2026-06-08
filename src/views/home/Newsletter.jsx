
"use client";
// components/Newsletter.jsx
import React, { useEffect } from 'react';
import AOS from '../../../utils/aos';

const Newsletter = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=400&fit=crop')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
            <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Join Our <span className="text-[#ff581b] font-title">Culinary Journey</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">Subscribe to exclusive offers and mouth-watering updates</p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full px-6 py-3 outline-none focus:border-[#ff581b] focus:bg-[#ff581b]/10 transition-all"
            />
            <button className="bg-[#ff581b] text-white rounded-full px-8 py-3 font-bold hover:bg-white hover:text-[#ff581b] transition-all flex items-center justify-center gap-2 group">
              Subscribe
              <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <p className="text-white/30 text-xs mt-4">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;