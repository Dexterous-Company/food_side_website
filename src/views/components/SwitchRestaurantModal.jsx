"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function SwitchRestaurantModal() {
  const { switchRequest, confirmReplaceCart, cancelReplaceCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (switchRequest) {
      setIsVisible(true);
      // Trigger animation after component is visible
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [switchRequest]);

  const handleConfirm = () => {
    confirmReplaceCart();
  };

  const handleCancel = () => {
    cancelReplaceCart();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 transform transition-all duration-200 ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
          Switch Restaurant?
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-6">
          Your cart contains items from a different restaurant. Would you like
          to clear your cart and add this item?
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
          >
            Replace Cart
          </button>
        </div>

        {/* Item info */}
        {switchRequest?.product && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
            {switchRequest.product.image && (
              <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  src={switchRequest.product.image}
                  alt={switchRequest.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {switchRequest.product.name}
              </p>
              <p className="text-xs text-gray-500">
                ₹{switchRequest.product.price}
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}