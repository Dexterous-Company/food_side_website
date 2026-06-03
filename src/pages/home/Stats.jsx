// components/Stats.jsx

"use client";
import React, { useEffect, useRef, useState } from 'react';

const StatCounter = ({ target, label, icon }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={elementRef} className="text-center py-12 md:py-16 relative border-r border-white/20 last:border-r-0 transition-all hover:bg-black/10">
      <i className={`${icon} text-white/30 text-2xl mb-4 block`}></i>
      <div className="text-white text-5xl md:text-7xl font-black leading-none">{count}+</div>
      <div className="text-white/60 text-xs font-bold uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { icon: "fas fa-calendar-check", target: 12, label: "Years of Service" },
    { icon: "fas fa-users", target: 200, label: "Guests Welcomed", suffix: "k+" },
    { icon: "fas fa-utensils", target: 85, label: "Signature Dishes" },
    { icon: "fas fa-award", target: 14, label: "Industry Awards" }
  ];

  return (
    <div className="bg-[#ff581b] relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatCounter key={idx} target={stat.target} label={stat.label} icon={stat.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;