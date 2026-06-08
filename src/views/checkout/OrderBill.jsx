
"use client";
import React from "react";
import {
  FaReceipt,
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const OrderBill = ({
  subtotal,
  deliveryFee,
  total,
  isContactSubmitted,
  isProcessing,
  onPlaceOrder,
  RUPEE = "₹",
  selectedPayment,
  onSelectPayment,
}) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-24">
      {/* Summary Header */}
      <div className="bg-gray-900 text-white p-3">
        <h3 className="text-base sm:text-lg font-black">Order Bill</h3>
        <p className="text-[10px] sm:text-xs text-gray-400">
          Review your order details
        </p>
      </div>

      <div className="p-3 sm:p-4">
        {/* Bill Details */}
        <div className="space-y-1.5 sm:space-y-2">
          {/* Subtotal */}
          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
            <div className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center gap-1.5">
              <FaReceipt className="text-[#ff581b] text-[10px] sm:text-xs flex-shrink-0" />{" "}
              Subtotal
            </div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">
              {RUPEE}
              {subtotal?.toFixed(2) || 0}
            </div>
          </div>

          {/* Delivery Fee */}
          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
            <div className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center gap-1.5">
              <FaTruck className="text-[#ff581b] text-[10px] sm:text-xs flex-shrink-0" />{" "}
              Delivery Fee
            </div>
            <div
              className={`text-xs sm:text-sm font-bold ${deliveryFee === 0 ? "text-emerald-600" : "text-gray-900"}`}
            >
              {deliveryFee === 0
                ? "FREE ✓"
                : `${RUPEE}${deliveryFee?.toFixed(2) || 0}`}
            </div>
          </div>

          {/* Packaging */}
          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
            <div className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center gap-1.5">
              <FaBox className="text-[#ff581b] text-[10px] sm:text-xs flex-shrink-0" />{" "}
              Packaging
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-600">
              Included
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="py-3 sm:py-4 mt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">
                Total Amount
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-[#ff581b] font-bold text-base sm:text-lg">
                  {RUPEE}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {total?.toFixed(2) || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Free Delivery Message */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 mb-3 sm:mb-4">
          <FaCheckCircle className="text-emerald-600 text-xs sm:text-sm flex-shrink-0" />
          <div className="text-[10px] sm:text-xs font-semibold text-emerald-600">
            {deliveryFee === 0
              ? "✨ Free delivery applied"
              : `Delivery fee: ${RUPEE}${deliveryFee?.toFixed(2) || 0}`}
          </div>
        </div>

        {/* Place Order Button */}
        <div className="md:block hidden">
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing || !isContactSubmitted}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#ff581b] py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm font-bold uppercase text-white shadow-md transition-all hover:bg-[#e84d15] disabled:opacity-50 disabled:cursor-not-allowed mb-3 sm:mb-4"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </div>

        {/* Payment Methods Icons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          <FaCcVisa className="text-gray-400 text-base sm:text-lg" />
          <FaCcMastercard className="text-gray-400 text-base sm:text-lg" />
          <FaCcAmex className="text-gray-400 text-base sm:text-lg" />
          <FaApplePay className="text-gray-400 text-base sm:text-lg" />
          <FaGooglePay className="text-gray-400 text-base sm:text-lg" />
        </div>
      </div>
    </div>
  );
};

export default OrderBill;
