import React from "react";

const FloatingCartBanner = ({
  visible,
  restaurantName,
  restaurantImage,
  totalItems = 0,
  totalPrice = 0,
  onPressMenu,
  onPressCart,
  onPressClear,
}) => {
  if (!visible) return null;

  const itemLabel = totalItems === 1 ? "item" : "items";

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-40">
      <div className="w-[94%] bg-white rounded-xl px-3 py-2 flex items-center shadow-lg">

        {/* Left Section */}
        <div
          onClick={onPressMenu}
          className="flex items-center flex-1 cursor-pointer mr-2"
        >
          <img
            src={
              restaurantImage ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=300"
            }
            alt="restaurant"
            className="w-10 h-10 rounded-lg object-cover bg-gray-100"
          />

          <div className="ml-3 flex-1">
            <p className="text-sm font-bold text-gray-800 truncate">
              {restaurantName || "Restaurant"}
            </p>
            <p className="text-xs font-bold text-orange-500">
              Restaurant Recommendations
            </p>
          </div>
        </div>

        {/* Cart Button */}
        <div
          onClick={onPressCart}
          className="bg-orange-500 rounded-full min-w-[120px] px-3 py-2 flex items-center justify-between cursor-pointer"
        >
          <div className="mr-2">
            <p className="text-[10px] text-green-100 font-semibold">
              {totalItems} {itemLabel} | ₹{totalPrice}
            </p>
            <p className="text-xs text-white font-extrabold">
              VIEW CART
            </p>
          </div>

          <span className="text-white text-lg">🛒</span>
        </div>

        {/* Delete Button */}
        <div
          onClick={onPressClear}
          className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center ml-2 cursor-pointer"
        >
          <span className="text-red-400 text-sm">🗑️</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FloatingCartBanner);