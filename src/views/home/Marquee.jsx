import React from "react";

export const Marquee = () => {
  return (
    <>
      <div className="mt-20 overflow-hidden border-y border-gray-200 bg-[#ff581b] py-4">
        <div className="flex gap-12 animate-marquee w-max">
          {[
            "Fine Dining",
            "Fast Delivery",
            "Gourmet Experience",
            "Fresh Ingredients",
            "Award-Winning Chefs",
            "Halal Certified",
            "Family Friendly",
            "Private Events",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-12 text-white font-bold uppercase tracking-wider text-sm"
            >
              {item}
              <span className="text-black">✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
