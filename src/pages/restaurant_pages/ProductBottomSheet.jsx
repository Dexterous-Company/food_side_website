// components/ProductBottomSheet.jsx
"use client";
import { useState } from "react";
import { FoodMark } from "./FoodMark";

export function ProductBottomSheet({ item, onClose }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;

  const origPrice = Number(item.originalPrice) || Number(item.price);
  const price = Number(item.price) || 0;
  const save = Math.max(0, origPrice - price);
  const discount = save > 0 ? Math.round((save / origPrice) * 100) : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/55 animate-[fadeIn_0.22s_ease]"
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-2xl max-h-[88vh] overflow-y-auto animate-[slideUp_0.3s_cubic-bezier(0.32,0.72,0,1)]">
        {/* Hero image */}
        <div className="relative h-[220px] bg-black overflow-hidden">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover block" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
          
          {discount > 0 && (
            <span className="absolute left-3 top-3 bg-orange-600 text-white rounded-md py-1.5 px-2 text-[11px] font-black leading-none">
              {discount}% OFF
            </span>
          )}
          
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border-none text-white text-lg leading-none flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-[18px_16px_32px]">
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-start gap-2 flex-1">
              <span className="mt-0.5"><FoodMark isVeg={item.isVeg} size={15} /></span>
              <h2 className="text-lg font-extrabold text-[#1a1a1a] leading-tight">
                {item.name}
              </h2>
            </div>

            {qty === 1 ? (
              <button
                onClick={() => setQty(1)}
                className="flex-shrink-0 h-9 min-w-[72px] rounded-lg border-[1.5px] border-[#15966a] bg-white text-[#15966a] text-sm font-extrabold cursor-pointer"
              >
                Add
              </button>
            ) : (
              <div className="flex items-center gap-0 border-[1.5px] border-[#15966a] rounded-lg overflow-hidden flex-shrink-0">
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-9 border-none bg-white text-[#15966a] text-xl cursor-pointer"
                >
                  −
                </button>
                <span className="w-7 text-center text-sm font-extrabold text-[#1a1a1a]">{qty}</span>
                <button 
                  onClick={() => setQty(q => q + 1)}
                  className="w-8 h-9 border-none bg-white text-[#15966a] text-xl cursor-pointer"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-1.5 mb-1">
            <strong className="text-[17px] font-black text-black">₹{price}</strong>
            {save > 0 && <s className="text-[13px] text-gray-400 font-semibold">₹{origPrice}</s>}
            {save > 0 && (
              <span className="text-[11px] font-extrabold text-white bg-[#15966a] rounded-md py-0.5 px-1.5">
                SAVE
              </span>
            )}
          </div>

          {item.stock > 0 && (
            <div className="text-xs text-red-500 font-bold mb-1">
              Only {item.stock} left
            </div>
          )}

          <div className="text-xs text-gray-400 mb-3.5">Customisable</div>
          <div className="h-px bg-gray-100 mb-3.5" />

          {item.desc ? (
            <p className="text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
          ) : (
            <p className="text-[13px] text-gray-300 leading-relaxed">
              A delicious dish prepared fresh with quality ingredients.
            </p>
          )}
        </div>
      </div>
    </>
  );
}