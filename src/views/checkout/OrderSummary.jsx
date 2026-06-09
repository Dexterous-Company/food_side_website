"use client";
import React from "react";
import {
  FaReceipt,
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaLock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaApple,
  FaGooglePay,
} from "react-icons/fa";

const OrderSummary = ({
  cartItems = [],
  totals,
  selectedPayment,
  onSelectPayment,
  isContactSubmitted,
  orderOverview,
  RUPEE = "₹",
  isProcessing,
  onPlaceOrder,
}) => {
  // Calculate totals if not provided
  const calculatedSubtotal = totals?.subtotal || cartItems.reduce((sum, item) => {
    const price = item.newPrice || item.price || 0;
    const qty = item.qty || item.quantity || 1;
    return sum + (price * qty);
  }, 0);

  // Apply free delivery for orders ₹500 and above
  const FREE_DELIVERY_THRESHOLD = 500;
  const baseDeliveryFee = 40;
  const calculatedDeliveryFee = totals?.deliveryFee ?? 
    (calculatedSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : baseDeliveryFee);
  
  const calculatedFinalTotal = totals?.finalTotal || calculatedSubtotal + calculatedDeliveryFee;
  const calculatedItemCount = totals?.itemCount || cartItems.length;

  const deliveryFee = calculatedDeliveryFee;
  const finalTotal = calculatedFinalTotal;
  const subtotal = calculatedSubtotal;
  const itemCount = calculatedItemCount;

  // Calculate amount needed for free delivery
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff581b]/20 border border-[#ff581b]/30 grid place-items-center text-[#ff581b]">
              <FaReceipt className="text-base" />
            </div>
            <div>
              <div className="font-['Raleway',sans-serif] text-sm font-black text-white tracking-tight">
                Order Summary
              </div>
              <div className="text-[10px] text-white/35 font-medium">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </div>
            </div>
          </div>
          {orderOverview?.dateLabel && (
            <div className="text-right">
              <div className="text-[9px] text-white/30 uppercase">Schedule</div>
              <div className="text-[10px] text-white/70 font-medium">
                {orderOverview.dateLabel}
                {orderOverview.timeLabel && ` • ${orderOverview.timeLabel}`}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-100 border-t-0 rounded-b-xl overflow-hidden flex flex-col">
          {/* Cart Items List */}
          <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <FaBox className="text-gray-300 text-3xl mx-auto mb-2" />
                <p className="text-xs text-gray-400">No items in cart</p>
              </div>
            ) : (
              cartItems.map((item) => {
                const price = item.newPrice || item.price || 0;
                const qty = item.qty || item.quantity || 1;
                const itemTotal = price * qty;
                
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <FaBox className="text-gray-400 text-lg" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="font-['Raleway',sans-serif] text-xs font-bold text-gray-900 leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-500 font-medium">
                          Qty: {qty}
                        </span>
                        <span className="text-[9px] text-gray-400">•</span>
                        <span className="text-[10px] text-[#ff581b] font-semibold">
                          {RUPEE}{price.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-['Raleway',sans-serif] text-sm font-extrabold text-gray-900">
                        {RUPEE}{itemTotal.toFixed(2)}
                      </div>
                      {qty > 1 && (
                        <div className="text-[8px] text-gray-400">
                          {RUPEE}{price.toFixed(2)} × {qty}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bill Breakdown */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="space-y-2">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 flex items-center gap-1.5">
                  <FaReceipt className="text-[#ff581b] text-[9px]" />
                  Subtotal
                </span>
                <span className="text-xs font-semibold text-gray-900">
                  {RUPEE}{subtotal.toFixed(2)}
                </span>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 flex items-center gap-1.5">
                  <FaTruck className="text-[#ff581b] text-[9px]" />
                  Delivery Fee
                </span>
                <span className={`text-xs font-semibold ${deliveryFee === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                  {deliveryFee === 0 ? "FREE ✓" : `${RUPEE}${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              {/* Packaging */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 flex items-center gap-1.5">
                  <FaBox className="text-[#ff581b] text-[9px]" />
                  Packaging
                </span>
                <span className="text-xs font-semibold text-emerald-600">Included</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2" />

              {/* Total */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <div className="text-right">
                  <span className="text-[#ff581b] font-bold text-sm"> {RUPEE}</span>
                  <span className="text-xl font-black text-gray-900 ml-0.5">
                    {finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Free Delivery Message */}
              {deliveryFee > 0 && amountNeededForFreeDelivery > 0 && (
                <div className="mt-2 pt-2 border-t border-dashed border-emerald-200">
                  <p className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg inline-flex items-center gap-1">
                    ✨ Add {RUPEE}{amountNeededForFreeDelivery.toFixed(2)} more for free delivery
                  </p>
                </div>
              )}
              {deliveryFee === 0 && subtotal > 0 && (
                <div className="mt-2 pt-2 border-t border-dashed border-emerald-200">
                  <p className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg inline-flex items-center gap-1">
                    <FaCheckCircle className="text-emerald-600 text-[8px]" />
                    Free delivery unlocked! (Orders ₹500+)
                  </p>
                </div>
              )}
            </div>
          </div>


          {/* Accepted Cards */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
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

          {/* Security Message */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <p className="text-[8px] text-gray-400 text-center flex items-center justify-center gap-1">
              <FaLock className="text-[8px]" />
              Your payment information is secure with us
            </p>
          </div>

          {/* Place Order Button */}
          {onPlaceOrder && (
            <div className="p-4 pt-2 border-t border-gray-100">
              <button
                onClick={onPlaceOrder}
                disabled={isProcessing || !isContactSubmitted || selectedPayment !== "cod" || cartItems.length === 0}
                className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#ff581b] to-orange-500 py-2.5 px-4 text-xs font-bold uppercase text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-[#e84d15] hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Place Order • ${RUPEE}${finalTotal.toFixed(2)}`
                  )}
                </span>
              </button>
              
              {!isContactSubmitted && (
                <p className="text-[8px] text-amber-600 text-center mt-2">
                  Please complete contact details to place order
                </p>
              )}
              {isContactSubmitted && selectedPayment !== "cod" && (
                <p className="text-[8px] text-amber-600 text-center mt-2">
                  Please select COD as payment method
                </p>
              )}
              {cartItems.length === 0 && (
                <p className="text-[8px] text-gray-400 text-center mt-2">
                  Your cart is empty
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;