// components/Checkout/PaymentMethods.jsx
"use client";
import React from "react";
import {
  FaApple,
  FaCcAmex,
  FaCcMastercard,
  FaCcVisa,
  FaGooglePay,
  FaLock,
} from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";

const PaymentMethods = ({ selectedPayment, onSelectPayment, isEnabled }) => {
  return (
    <div className="mb-4 mt-4">
      <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-1.5">
        <MdCreditCard className="text-[#ff581b] text-sm" />
        Select Payment Method
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div
          onClick={() => isEnabled && onSelectPayment("cod")}
          className={`rounded-lg border-2 p-3 cursor-pointer transition-all ${selectedPayment === "cod" ? "border-[#ff581b] bg-orange-50" : "border-gray-200"} ${!isEnabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-800">
                  Cash on Delivery
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                  ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Pay when you receive your order
              </p>
              <p className="text-[10px] text-gray-400">
                Pay directly to the delivery partner
              </p>
            </div>
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === "cod" ? "border-[#ff581b]" : "border-gray-300"}`}
            >
              {selectedPayment === "cod" && (
                <div className="w-2 h-2 rounded-full bg-[#ff581b]"></div>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-lg border-2 border-gray-200 bg-gray-100 opacity-70 p-3 cursor-not-allowed">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-500">
                  Online Payment
                </span>
                <span className="text-[9px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full">
                  COMING SOON
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">
                UPI / Cards / Net Banking
              </p>
              <p className="text-[10px] text-gray-400">
                Secure payment gateway
              </p>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
        <span className="text-[8px] font-bold tracking-[1px] uppercase text-gray-400">
          Secure payments
        </span>
        <div className="flex gap-1.5 flex-wrap items-center">
          <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-600 hover:shadow-sm transition-shadow">
            <FaCcVisa />
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-600 hover:shadow-sm transition-shadow">
            <FaCcMastercard />
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-600 hover:shadow-sm transition-shadow">
            <FaCcAmex />
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-600 hover:shadow-sm transition-shadow">
            <FaApple />
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-1 text-sm text-gray-600 hover:shadow-sm transition-shadow">
            <FaGooglePay />
          </div>
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-[8px] text-gray-400 text-center flex items-center justify-center gap-1">
          <FaLock className="text-[8px]" />
          Your payment information is secure with us
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;
