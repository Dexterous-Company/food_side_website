// components/Checkout/PaymentMethods.jsx
"use client";
import React from "react";
import { MdCreditCard } from "react-icons/md";

const PaymentMethods = ({ selectedPayment, onSelectPayment, isEnabled }) => {
  return (
    <div className="mb-8 mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MdCreditCard className="text-[#ff581b]" />
        Select Payment Method
      </h3>
      <div className="space-y-3">
        <div 
          onClick={() => isEnabled && onSelectPayment("cod")} 
          className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${selectedPayment === "cod" ? "border-[#ff581b] bg-orange-50" : "border-gray-200"} ${!isEnabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Cash on Delivery</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>
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
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Online Payment</span>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">COMING SOON</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">UPI / Cards / Net Banking</p>
              <p className="text-xs text-gray-400">Secure payment gateway</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;