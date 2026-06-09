
"use client";
// components/Categories.jsx
import React, { useEffect, useRef, useState } from 'react';
import AOS from '../../../utils/aos';

const categories = [
  { name: "Wood-Fired Pizza", desc: "Stone-baked, san marzano tomatoes, fresh mozzarella & secret herb oil.", items: 24, bg: "bg-gradient-to-br from-orange-500 to-red-600", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=500&fit=crop", color: "orange", badge: "Most Ordered" },
  { name: "Gourmet Burgers", desc: "Wagyu patties, brioche buns, house-made sauces.", items: 18, bg: "bg-gradient-to-br from-amber-500 to-yellow-600", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=500&fit=crop", color: "gold", badge: "Chef's Pick" },
  { name: "Premium Sushi", desc: "Fresh catch, crafted daily by our sushi masters.", items: 32, bg: "bg-gradient-to-br from-teal-500 to-cyan-600", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=500&fit=crop", color: "teal", badge: "Daily Fresh" },
  { name: "Artisan Pasta", desc: "Hand-rolled, slow-simmered sauces, aged parmesan.", items: 15, bg: "bg-gradient-to-br from-orange-500 to-red-600", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=500&fit=crop", color: "orange" },
  { name: "Fresh Salads", desc: "Farm-picked greens, seasonal produce, signature dressings.", items: 12, bg: "bg-gradient-to-br from-green-500 to-emerald-600", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=500&fit=crop", color: "green", badge: "100% Vegan" },
  { name: "Sweet Desserts", desc: "Indulgent pâtisserie creations baked fresh every morning.", items: 20, bg: "bg-gradient-to-br from-purple-500 to-pink-600", image: "https://images.unsplash.com/photo-1563729784474-e77d69acf757?w=400&h=500&fit=crop", color: "purple", badge: "New Arrivals" },
  { name: "Craft Drinks", desc: "Juices, mocktails, smoothies & specialty coffees.", items: 28, bg: "bg-gradient-to-br from-blue-500 to-indigo-600", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=500&fit=crop", color: "blue" }
];

const Categories = () => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    AOS.init();
  }, []);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#ff581b]/10 to-transparent top-[-100px] right-[-200px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#ff581b]/8 to-transparent bottom-[200px] left-[-150px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
            <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> What We Serve
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            Explore Our <span className="text-[#ff581b] font-title">Flavours</span>
          </h2>
          <p className="text-gray-600">Seven cravings. One destination. Swipe through our handcrafted categories and find your next favourite meal.</p>
        </div>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div 
          ref={trackRef}
          className="flex gap-6 overflow-x-auto px-8 md:px-16 pb-8 cursor-grab active:cursor-grabbing scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[380px] rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${cat.color === 'orange' ? 'group-hover:bg-orange-900/70' : ''}`} />
              
              {/* Badges */}
              {cat.badge && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">{cat.badge}</span>
                </div>
              )}
              
              {/* Item Count */}
              <div className="absolute top-4 right-4 z-10 bg-[#ff581b] text-white text-[10px] font-bold rounded-full px-3 py-1">
                {cat.items} Items
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 transform transition-transform duration-400">
                <h3 className="text-2xl font-black mb-1">{cat.name}</h3>
                <p className="text-white/70 text-sm mb-4 max-h-0 overflow-hidden opacity-0 transition-all duration-400 group-hover:max-h-16 group-hover:opacity-100">{cat.desc}</p>
                <button className="bg-[#ff581b] text-white rounded-full py-2.5 px-5 text-sm font-bold flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-white hover:text-[#ff581b]">
                  Order Now
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-gray-300 bg-white shadow-md flex items-center justify-center hover:bg-[#ff581b] hover:border-[#ff581b] hover:text-white transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-gray-300 bg-white shadow-md flex items-center justify-center hover:bg-[#ff581b] hover:border-[#ff581b] hover:text-white transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Categories;