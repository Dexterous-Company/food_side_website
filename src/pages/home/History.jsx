
"use client";
// components/History.jsx
import React, { useEffect, useRef } from 'react';
import AOS from '../../../utils/aos';

const History = () => {
  const spineGlowRef = useRef(null);

  useEffect(() => {
    AOS.init();
    
    const handleScroll = () => {
      if (spineGlowRef.current) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;
        spineGlowRef.current.style.height = `${scrollPercent}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents = [
    { year: "1984", era: "Founded", title: "A Family Dream Takes Root", description: "Antonio and Maria Rossi opened a tiny 12-table trattoria, arming it only with three-generation family recipes and a wood-fired oven. The aroma alone drew queues around the block from opening week.", highlight: "First wood-fired oven installed", highlightDetail: "Handcrafted from Italian terracotta", icon: "fa-seedling", tag: "The Beginning", date: "Old Quarter, Downtown", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=500&fit=crop" },
    { year: "1992", era: "Awarded", title: "The First Star on the Map", description: "Eight years of unwavering consistency earned the restaurant its first major regional award. Critics singled out the slow-cooked lamb shank and hand-rolled pappardelle as revelations of authentic flavour.", highlight: "Regional Best Restaurant Award", highlightDetail: "Voted by 200+ food critics", icon: "fa-trophy", tag: "Recognition", date: "Regional Culinary Board", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop", side: "right" },
    { year: "2003", era: "Expanded", title: "A Grand New Home", description: "Tripled in size. The new flagship introduced an open kitchen theatre so diners could watch chefs work live, a cellar bar stocked with 400 labels, and a private dining hall for celebrations.", highlight: "80 seats + private events hall", highlightDetail: "Designed by award-winning architect", icon: "fa-building", tag: "Grand Expansion", date: "New Flagship Location", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop" },
    { year: "2015", era: "New Era", title: "Heritage Meets Innovation", description: "Chef Marco Rossi returned from training in Lyon and Tokyo to reimagine the menu — weaving classical Italian soul with contemporary precision techniques. Old recipes found thrilling new form.", highlight: "Signature 8-course tasting menu", highlightDetail: "Paired with natural wine selection", icon: "fa-utensils", tag: "Next Generation", date: "Chef Marco Rossi", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=500&fit=crop", side: "right" },
    { year: "Today", era: "Live", title: "One Million Meals. One Promise.", description: "Four decades. Two generations. Three hundred covers a night. The flame never dims. Every plate that leaves our kitchen still carries the soul of that first family recipe — cooked with nothing but love.", highlight: "Over 1,000,000 meals served", highlightDetail: "And counting — every single night", icon: "fa-heart", tag: "Still Burning Bright", date: "40 Years Strong", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop" }
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_10%,rgba(255,88,27,0.07),transparent_60%),radial-gradient(ellipse_60%_50%_at_85%_90%,rgba(244,180,0,0.05),transparent_55%)] bg-black" />
      
      {/* Orbs */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-radial from-[#ff581b]/15 to-transparent top-[-200px] right-[-200px] animate-pulse-slow" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#f4b400]/10 to-transparent bottom-[-100px] left-[-100px] animate-pulse-slower" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
            <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our History
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Four Decades of <span className="text-[#ff581b] font-title">Flavour</span>
          </h2>
          <p className="text-white/60">From a humble family kitchen tucked in the old quarter to a celebrated dining institution — every dish we craft carries the weight of tradition, the warmth of love, and the fire of ambition.</p>
        </div>

        <div className="relative">
          {/* Timeline Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0" />
          <div ref={spineGlowRef} className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-[#ff581b] via-[#f4b400] to-transparent -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(255,88,27,0.6)]" />

          {timelineEvents.map((event, idx) => (
            <div key={idx} className={`relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16 ${idx % 2 === 0 ? 'lg:grid-cols-[1fr_120px_1fr]' : 'lg:grid-cols-[1fr_120px_1fr]'}`}>
              {/* Card - Left Side */}
              {(idx % 2 === 0) ? (
                <>
                  <div className="lg:pr-8 order-2 lg:order-1" data-aos="fade-right" data-aos-duration="800">
                    <div className="bg-[#141414] rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff581b]/30 transition-all duration-500 group hover:-translate-x-2 hover:-translate-y-1.5 hover:scale-[1.01]">
                      <div className="relative h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div className="text-5xl md:text-6xl font-title text-white">{event.year}</div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#ff581b] bg-[#ff581b]/20 px-3 py-1 rounded-full">{event.era}</div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs mb-3">
                          <span className="text-[#ff581b] font-bold uppercase tracking-wider">{event.tag}</span>
                          <span className="w-1 h-1 rounded-full bg-[#ff581b]/40" />
                          <span className="text-white/40">{event.date}</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3">{event.title}</h4>
                        <p className="text-white/40 text-sm mb-4">{event.description}</p>
                        <div className="flex items-center gap-3 p-3 bg-[#ff581b]/10 rounded-xl border border-[#ff581b]/20">
                          <div className="w-8 h-8 rounded-lg bg-[#ff581b]/20 flex items-center justify-center">
                            <i className={`fas ${event.icon} text-[#ff581b] text-sm`}></i>
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold">{event.highlight}</div>
                            <div className="text-white/30 text-xs">{event.highlightDetail}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Center Node */}
                  <div className="flex justify-center order-1 lg:order-2" data-aos="zoom-in" data-aos-delay="200">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-black border-2 border-[#ff581b]/30 flex items-center justify-center relative">
                        <div className="absolute inset-[-2px] rounded-full bg-conic from-[#ff581b] via-[#f4b400] to-[#ff581b] opacity-50" />
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                          <i className={`fas ${event.icon} text-[#ff581b] text-lg`}></i>
                        </div>
                      </div>
                      {idx === timelineEvents.length - 1 && (
                        <>
                          <div className="absolute inset-[-12px] rounded-full border border-[#ff581b] opacity-70 animate-ping" />
                          <div className="absolute inset-[-20px] rounded-full border border-[#ff581b] opacity-40 animate-ping" style={{ animationDelay: '0.8s' }} />
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:pl-8 order-3" />
                </>
              ) : (
                <>
                  <div className="lg:pr-8 order-2 lg:order-1" />
                  
                  {/* Center Node */}
                  <div className="flex justify-center order-1 lg:order-2" data-aos="zoom-in" data-aos-delay="200">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-black border-2 border-[#ff581b]/30 flex items-center justify-center relative">
                        <div className="absolute inset-[-2px] rounded-full bg-conic from-[#ff581b] via-[#f4b400] to-[#ff581b] opacity-50" />
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                          <i className={`fas ${event.icon} text-[#ff581b] text-lg`}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card - Right Side */}
                  <div className="lg:pl-8 order-3" data-aos="fade-left" data-aos-duration="800">
                    <div className="bg-[#141414] rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff581b]/30 transition-all duration-500 group hover:translate-x-2 hover:-translate-y-1.5 hover:scale-[1.01]">
                      <div className="relative h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div className="text-5xl md:text-6xl font-title text-white">{event.year}</div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#ff581b] bg-[#ff581b]/20 px-3 py-1 rounded-full">{event.era}</div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs mb-3">
                          <span className="text-[#ff581b] font-bold uppercase tracking-wider">{event.tag}</span>
                          <span className="w-1 h-1 rounded-full bg-[#ff581b]/40" />
                          <span className="text-white/40">{event.date}</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3">{event.title}</h4>
                        <p className="text-white/40 text-sm mb-4">{event.description}</p>
                        <div className="flex items-center gap-3 p-3 bg-[#ff581b]/10 rounded-xl border border-[#ff581b]/20">
                          <div className="w-8 h-8 rounded-lg bg-[#ff581b]/20 flex items-center justify-center">
                            <i className={`fas ${event.icon} text-[#ff581b] text-sm`}></i>
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold">{event.highlight}</div>
                            <div className="text-white/30 text-xs">{event.highlightDetail}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Stats Ribbon */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#1c1c1c] to-[#1c1c1c]" data-aos="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: "fa-calendar-days", num: "40", suffix: "+", label: "Years of Tradition" },
              { icon: "fa-award", num: "12", suffix: "", label: "Culinary Awards" },
              { icon: "fa-bowl-food", num: "1", suffix: "M+", label: "Meals Served" },
              { icon: "fa-people-group", num: "3", suffix: "", label: "Family Generations" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center py-10 px-4 border-r border-white/10 last:border-r-0 hover:bg-[#ff581b]/10 transition-colors" data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div className="w-12 h-12 rounded-xl bg-[#ff581b]/20 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${stat.icon} text-[#ff581b] text-lg`}></i>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white">{stat.num}<span className="text-[#ff581b]">{stat.suffix}</span></div>
                <div className="text-white/40 text-xs uppercase tracking-wider mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;