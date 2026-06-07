// components/Checkout/BillSummary.jsx
"use client";
import React from "react";
import { FaLock } from "react-icons/fa";

const BillSummary = ({ indianItems, selectedPayment, onSelectPayment, isContactSubmitted }) => {
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-600">Items</span>
          <span className="text-sm font-semibold text-gray-600">Subtotal</span>
          <span className="text-sm font-semibold text-gray-600">ETA</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-base font-bold text-gray-800">{indianItems.items}</span>
          <span className="text-base font-bold text-gray-800">₹{indianItems.subtotal}</span>
          <span className="text-xs text-gray-500">06-06-2026 at 10:54 AM</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Bill Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm"><span className="text-gray-600">Items Total</span><span>₹{indianItems.subtotal}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery Fee</span><span>₹{indianItems.deliveryFee}</span></div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200"><span>To Pay</span><span className="text-[#ff581b]">₹{indianItems.toPay}</span></div>
          <p className="text-xs text-emerald-600 mt-2">✨ Add ₹221 more for free delivery</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Payment Method</h3>
        <div className="space-y-3">
          <div onClick={() => isContactSubmitted && onSelectPayment("cod")} className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${selectedPayment === "cod" ? "border-[#ff581b] bg-orange-50" : "border-gray-200"} ${!isContactSubmitted ? 'opacity-60 cursor-not-allowed' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2"><span className="font-semibold text-gray-800">Cash on Delivery</span><span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span></div>
                <p className="text-xs text-gray-500 mt-1">Pay when you receive your order</p>
                <p className="text-xs text-gray-400">Pay directly to the delivery partner</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === "cod" ? "border-[#ff581b]" : "border-gray-300"}`}>
                {selectedPayment === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-[#ff581b]"></div>}
              </div>
            </div>
          </div>
          <div className="rounded-xl border-2 border-gray-200 bg-gray-100 opacity-70 p-4 cursor-not-allowed">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2"><span className="font-semibold text-gray-500">Online Payment</span><span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">COMING SOON</span></div>
                <p className="text-xs text-gray-400 mt-1">UPI / Cards / Net Banking</p>
                <p className="text-xs text-gray-400">Secure payment gateway</p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center mb-4"><FaLock className="inline mr-1 text-[10px]" /> Your payment information is secure with us</p>
    </>
  );
};

export default BillSummary;