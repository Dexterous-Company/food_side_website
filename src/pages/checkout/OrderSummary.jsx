// components/Checkout/OrderSummary.jsx
"use client";
import React from "react";
import Image from "next/image";
import { FaReceipt, FaTag, FaTruck, FaBox, FaPercent, FaCheckCircle, FaCcVisa, FaCcMastercard, FaCcAmex, FaApple, FaGooglePay } from "react-icons/fa";

const OrderSummary = ({ cartItems, subtotal, deliveryFee, total, isContactSubmitted, isProcessing, onPlaceOrder, RUPEE = "₹" }) => {

  console.log(cartItems, "cartItems");

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md flex flex-col">
      <div className="flex items-center gap-2 p-4 bg-gray-900">
        <div className="w-8 h-8 rounded-lg bg-[#ff581b]/20 border border-[#ff581b]/30 grid place-items-center text-[#ff581b] text-base">
          <FaReceipt className="text-base" />
        </div>
        <div>
          <div className="font-['Raleway',sans-serif] text-sm font-black text-white tracking-tight">Order Summary</div>
          <div className="text-[10px] text-white/35 font-medium">{cartItems.length} items</div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 border-t-0 rounded-b-xl overflow-hidden flex flex-col">
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              {/* Product Image */}
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <FaReceipt className="text-gray-400 text-lg" />
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="font-['Raleway',sans-serif] text-xs font-bold text-gray-900 leading-tight truncate">{item.name}</div>
                <div className="text-[10px] text-gray-500 font-medium mt-0.5">Qty: {item.qty || item.quantity || 1}</div>
              </div>
              
              {/* Price */}
              <div className="font-['Raleway',sans-serif] text-sm font-extrabold text-gray-900 whitespace-nowrap">
                {RUPEE}{((item.newPrice || item.price || 0) * (item.qty || item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#ff581b]/30 to-transparent my-0.5 mx-4"></div>

        <div className="pt-0.5">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <FaReceipt className="text-[#ff581b] text-[10px]" /> Subtotal
            </div>
            <div className="font-['Raleway',sans-serif] text-sm font-bold text-gray-900">{RUPEE}{subtotal?.toFixed(2) || 0}</div>
          </div>
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <FaTruck className="text-[#ff581b] text-[10px]" /> Delivery Fee
            </div>
            <div className={`font-['Raleway',sans-serif] text-sm font-bold ${deliveryFee === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
              {deliveryFee === 0 ? "FREE" : `${RUPEE}${deliveryFee}`}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <FaBox className="text-[#ff581b] text-[10px]" /> Packaging
            </div>
            <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">Included</div>
          </div>
        </div>

        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between gap-3 mt-1">
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/40">Total</div>
          </div>
          <div className="font-['Raleway',sans-serif] text-2xl font-black text-white leading-none tracking-[-0.5px]">
            <sup className="text-sm text-[#ff581b] font-bold">{RUPEE}</sup>{total?.toFixed(2) || 0}
          </div>
        </div>

        {deliveryFee === 0 && subtotal > 0 && (
          <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600 text-xs" />
            <div className="text-[11px] font-semibold text-emerald-600">
              <span className="font-extrabold">Free delivery</span> applied
            </div>
          </div>
        )}

        <div className="px-4 py-3">
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing || !isContactSubmitted}
            className="relative inline-block font-bold text-xs uppercase bg-[#ff581b] text-white rounded-full py-3 pl-5 pr-[48px] overflow-hidden transition-all duration-300 hover:bg-gray-900 text-center w-full shadow-md"
          >
            {isProcessing ? "Processing..." : "Proceed to Order"}
            {/* <span className="absolute top-1/2 right-2 w-7 h-7 bg-white rounded-full -translate-y-1/2"></span> */}
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