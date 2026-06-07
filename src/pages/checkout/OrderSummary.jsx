// components/Checkout/OrderSummary.jsx
"use client";
import React from "react";
import { FaReceipt, FaTag, FaTruck, FaBox, FaPercent, FaCheckCircle, FaCcVisa, FaCcMastercard, FaCcAmex, FaApple, FaGooglePay } from "react-icons/fa";

const OrderSummary = ({ cartItems, subtotal, promoDiscount, vat, total, isContactSubmitted, isProcessing, onPlaceOrder }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md flex flex-col">
      <div className="flex items-center gap-2 p-4 bg-gray-900">
        <div className="w-8 h-8 rounded-lg bg-[#ff581b]/20 border border-[#ff581b]/30 grid place-items-center text-[#ff581b] text-base">
          <FaReceipt className="text-base" />
        </div>
        <div>
          <div className="font-['Raleway',sans-serif] text-sm font-black text-white tracking-tight">Order Summary</div>
          <div className="text-[10px] text-white/35 font-medium">{cartItems.length} items · Dispatched 24h</div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 border-t-0 rounded-b-xl overflow-hidden flex flex-col">
        <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-start justify-between gap-2 px-4 py-2 border-b border-gray-100 bg-[#ff581b]/5">
              <div className="flex-1 min-w-0">
                <div className="font-['Raleway',sans-serif] text-xs font-bold text-gray-900 leading-tight truncate">{item.name}</div>
                <div className="text-[10px] text-gray-500 font-medium mt-0.5">Qty: {item.quantity}</div>
              </div>
              <div className="font-['Raleway',sans-serif] text-sm font-extrabold text-gray-900 whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#ff581b]/30 to-transparent my-0.5 mx-4"></div>

        <div className="pt-0.5">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaReceipt className="text-[#ff581b] text-[10px]" /> Subtotal</div>
            <div className="font-['Raleway',sans-serif] text-sm font-bold text-gray-900">₹{subtotal.toFixed(2)}</div>
          </div>
          {promoDiscount > 0 && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaTag className="text-[#ff581b] text-[10px]" /> Promo</div>
              <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">−₹{promoDiscount.toFixed(2)}</div>
            </div>
          )}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaTruck className="text-[#ff581b] text-[10px]" /> Delivery</div>
            <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">Free ✓</div>
          </div>
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaBox className="text-[#ff581b] text-[10px]" /> Packaging</div>
            <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">Included</div>
          </div>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FaPercent className="text-[#ff581b] text-[10px]" /> VAT</div>
            <div className="font-['Raleway',sans-serif] text-sm font-bold text-[#ff581b]">₹{vat.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between gap-3 mt-1">
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/40">Total</div>
            {promoDiscount > 0 && <div className="text-[9px] text-white/35 mt-0.5">Save <strong>₹{promoDiscount.toFixed(2)}</strong></div>}
          </div>
          <div className="font-['Raleway',sans-serif] text-2xl font-black text-white leading-none tracking-[-0.5px]"><sup className="text-sm text-[#ff581b] font-bold">₹</sup>{total.toFixed(2)}</div>
        </div>

        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center gap-2">
          <FaCheckCircle className="text-emerald-600 text-xs" />
          <div className="text-[11px] font-semibold text-emerald-600"><span className="font-extrabold">Free next-day delivery</span> applied</div>
        </div>

        <div className="px-4 py-3">
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing || !isContactSubmitted}
            className="relative inline-block font-bold text-xs uppercase bg-[#ff581b] text-white rounded-full py-3 pl-5 pr-[48px] overflow-hidden transition-all duration-300 hover:bg-gray-900 text-center w-full shadow-md"
          >
            {isProcessing ? "Processing..." : "Proceed to Pay"}
            <span className="absolute top-1/2 right-2 w-7 h-7 bg-white rounded-full -translate-y-1/2"></span>
          </button>
        </div>

        <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-[9px] font-bold tracking-[1px] uppercase text-gray-500">We accept</span>
          <div className="flex gap-1 flex-wrap items-center">
            <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaCcVisa /></div>
            <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaCcMastercard /></div>
            <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaCcAmex /></div>
            <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaApple /></div>
            <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-800"><FaGooglePay /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;