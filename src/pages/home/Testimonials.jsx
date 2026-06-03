
"use client";
// components/Testimonials.jsx
import React, { useState, useEffect, useRef } from 'react';
import AOS from '../../../utils/aos';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    AOS.init();
  }, []);

  const testimonials = [
    { name: "David Mitchell", rating: 5, text: "Absolutely the best dining experience I've had in years. The wood-fired pizza was perfectly charred and the truffle pasta melted in my mouth. We'll definitely be back every weekend.", source: "Google Review", icon: "fab fa-google", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { name: "Sarah Kapoor", rating: 5, text: "From the ambiance to the desserts — every single detail was on point. Priya's saffron crème brûlée was a showstopper. Highly recommend for any special occasion.", source: "TripAdvisor", icon: "fas fa-utensils", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { name: "Ryan Torres", rating: 4.5, text: "James's smoked ribeye was out of this world — perfectly seasoned, cooked to perfection. The staff were warm and attentive all evening. Five stars without question.", source: "Yelp", icon: "fab fa-yelp", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    { name: "Emma Laurent", rating: 5, text: "The ratatouille tian was a revelation — vibrant, fresh and beautifully presented. I came for a quick dinner and ended up staying for two hours. Worth every moment.", source: "Google Review", icon: "fab fa-google", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    { name: "Arjun Shah", rating: 5, text: "Celebrated our anniversary here and the chef's table was magical. Marco came out personally to explain each course. An evening we will never, ever forget.", source: "TripAdvisor", icon: "fas fa-utensils", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
  ];

  const nextSlide = () => {
    if (trackRef.current) {
      const newIndex = (currentIndex + 1) % testimonials.length;
      setCurrentIndex(newIndex);
      trackRef.current.scrollTo({ left: newIndex * 380, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (trackRef.current) {
      const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      setCurrentIndex(newIndex);
      trackRef.current.scrollTo({ left: newIndex * 380, behavior: 'smooth' });
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
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <div className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => <i key={i} className="fas fa-star text-yellow-500 text-xs"></i>)}
        {hasHalf && <i className="fas fa-star-half-alt text-yellow-500 text-xs"></i>}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => <i key={i} className="far fa-star text-gray-300 text-xs"></i>)}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div data-aos="fade-up">
            <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-2">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Guest Reviews
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900">
              Words From Our <span className="text-[#ff581b] font-title">Happy Guests</span>
            </h2>
            <p className="text-gray-500 mt-3">Every plate tells a story — here's what our guests say about theirs.</p>
          </div>
          <div className="flex items-center gap-4" data-aos="fade-left">
            <div className="flex items-center gap-3 bg-[#ff581b] rounded-full px-4 py-2 shadow-md">
              <span className="text-2xl font-black text-white">4.9</span>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-yellow-300 text-xs"></i>)}
                </div>
                <span className="text-white/80 text-[10px] font-semibold">2,400+ Reviews</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-gray-300 bg-white shadow-md flex items-center justify-center hover:bg-[#ff581b] hover:border-[#ff581b] hover:text-white transition-all">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-gray-300 bg-white shadow-md flex items-center justify-center hover:bg-[#ff581b] hover:border-[#ff581b] hover:text-white transition-all">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="overflow-hidden">
          <div 
            ref={trackRef}
            className="flex gap-6 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="flex-shrink-0 w-[350px] md:w-[400px] bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group" data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div className="absolute top-0 left-0 h-1 bg-[#ff581b] w-0 group-hover:w-full transition-all duration-400 rounded-t-xl" />
                <div className="flex justify-between items-start mb-4">
                  {renderStars(testimonial.rating)}
                  <div className="w-9 h-9 rounded-full bg-[#ff581b]/10 flex items-center justify-center text-[#ff581b] group-hover:bg-[#ff581b] group-hover:text-white transition-all">
                    <i className="fas fa-quote-right text-sm"></i>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover border-2 border-[#ff581b]/50 group-hover:scale-110 transition-transform" />
                  <div>
                    <strong className="block text-gray-900 font-bold text-sm">{testimonial.name}</strong>
                    <span className="text-[#ff581b] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <i className={testimonial.icon}></i> {testimonial.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                if (trackRef.current) trackRef.current.scrollTo({ left: idx * 380, behavior: 'smooth' });
              }}
              className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-[#ff581b]' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;