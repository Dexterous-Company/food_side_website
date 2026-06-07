// components/MobileSection.jsx
"use client";
import { useState } from "react";
import { MobileDishCard } from "./MobileDishCard";

export function MobileSection({ title, items, onOpen }) {
  const [open, setOpen] = useState(true);
  if (!items.length) return null;
  
  return (
    <div className={`border-b border-gray-100 ${open ? 'pb-5' : 'pb-0'} mb-5`}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full bg-transparent border-none p-0 pb-4 flex items-center justify-between cursor-pointer text-left"
      >
        <span className="text-xl font-black text-[#1a1a1a]">
          {title} ({items.length})
        </span>
        <span className={`text-lg font-black text-[#444] inline-block transition-transform duration-250 select-none leading-none ${open ? 'rotate-0' : 'rotate-180'}`}>
          ∧
        </span>
      </button>
      
      {open && (
        <div className="grid grid-cols-3 gap-[14px_10px]">
          {items.map(item => (
            <MobileDishCard key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}