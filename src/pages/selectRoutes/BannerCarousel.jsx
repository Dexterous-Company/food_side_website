"use client";

import { useState, useEffect } from "react";

export default function BannerCarousel({ banners, onBannerChange }) {
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setBannerIdx((i) => {
        const newIdx = (i + 1) % banners.length;
        onBannerChange?.(newIdx);
        return newIdx;
      });
    }, 3000);
    return () => clearInterval(t);
  }, [banners.length, onBannerChange]);

  const handleDotClick = (index) => {
    setBannerIdx(index);
    onBannerChange?.(index);
  };

  return (
    <div className="relative w-full h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
      <img
        src={banners[bannerIdx]}
        alt="Banner"
        className="w-full h-full object-cover transition-opacity duration-500"
      />
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer
              ${i === bannerIdx ? "w-4 bg-[#ff581b]" : "w-1.5 bg-white/60"}
            `}
          />
        ))}
      </div>
    </div>
  );
}