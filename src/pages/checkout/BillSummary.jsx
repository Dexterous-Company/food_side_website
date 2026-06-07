// components/Checkout/BillSummary.jsx
"use client";
import React from "react";
import { FaLock, FaTruck } from "react-icons/fa";

const BillSummary = ({ totals, selectedPayment, onSelectPayment, isContactSubmitted, orderOverview, RUPEE }) => {
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-600">Items</span>
          <span className="text-sm font-semibold text-gray-600">Subtotal</span>
          <span className="text-sm font-semibold text-gray-600">ETA</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-base font-bold text-gray-800">{totals?.itemCount || 0}</span>
          <span className="text-base font-bold text-gray-800">{RUPEE}{totals?.subtotal || 0}</span>
          <span className="text-xs text-gray-500">
            {orderOverview?.dateLabel && `${orderOverview.dateLabel} at ${orderOverview.timeLabel}`}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Bill Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items Total</span>
            <span>{RUPEE}{totals?.subtotal || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <FaTruck className="text-xs" /> Delivery Fee
            </span>
            <span className={totals?.deliveryFee === 0 ? "text-emerald-600" : ""}>
              {totals?.deliveryFee === 0 ? "FREE" : `${RUPEE}${totals?.deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
            <span>To Pay</span>
            <span className="text-[#ff581b]">{RUPEE}{totals?.finalTotal || 0}</span>
          </div>
          {totals?.remainingForFreeDelivery > 0 && (
            <p className="text-xs text-emerald-600 mt-2">
              ✨ Add {RUPEE}{totals.remainingForFreeDelivery} more for free delivery
            </p>
          )}
          {totals?.deliveryFee === 0 && totals?.subtotal > 0 && (
            <p className="text-xs text-emerald-600 mt-2">✨ Free delivery unlocked!</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Payment Method</h3>
        <div className="space-y-3">
          <div
            onClick={() => isContactSubmitted && onSelectPayment("cod")}
            className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${
              selectedPayment === "cod" ? "border-[#ff581b] bg-orange-50" : "border-gray-200"
            } ${!isContactSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
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
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === "cod" ? "border-[#ff581b]" : "border-gray-300"
                }`}
              >
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

      <p className="text-[10px] text-gray-400 text-center mb-4">
        <FaLock className="inline mr-1 text-[10px]" /> Your payment information is secure with us
      </p>
    </>
  );
};

export default BillSummary;