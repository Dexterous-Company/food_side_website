"use client";

import { useState } from "react";
import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext"; // Adjust path as needed

const FoodTypeIcon = ({ type }) => {
  return type === "veg" ? (
    <div className="relative">
      <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center bg-white">
        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
      </div>
    </div>
  ) : (
    <div className="relative">
      <div className="w-4 h-4 border border-red-600 rounded-sm flex items-center justify-center bg-white">
        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
      </div>
    </div>
  );
};

const CounterButton = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <motion.div
      initial={false}
      animate={{ scale: quantity > 0 ? 1 : 0.95 }}
      className="flex items-center gap-1 sm:gap-2 bg-white rounded-full shadow-lg overflow-hidden"
    >
      {quantity > 0 && (
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          onClick={onDecrement}
          className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex items-center justify-center text-black transition-colors"
        >
          <FiMinus
            size={14}
            className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]"
          />
        </motion.button>
      )}

      {quantity > 0 && (
        <motion.span
          key={quantity}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-semibold text-gray-900 min-w-[16px] sm:min-w-[20px] text-center text-xs sm:text-sm"
        >
          {quantity}
        </motion.span>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onIncrement}
        className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex items-center justify-center text-black transition-colors"
      >
        <FiPlus size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" />
      </motion.button>
    </motion.div>
  );
};

export default function ProductCard({
  item,
  restaurantId,
  restaurant,
  layout = "scroll",
}) {
  const { cartQuantities, addItem, decreaseItem, increaseItem } = useCart();
  
  // Get quantity from cart context
  const quantity = cartQuantities[`${restaurantId}-${item.id}`] || 0;
  
  const handleIncrement = () => {
    addItem({ 
      restaurant: { _id: restaurantId, ...restaurant }, 
      product: item 
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      decreaseItem(restaurantId, item.id);
    }
  };

  // Different classes based on layout prop
  const cardClasses =
    layout === "scroll"
      ? "w-[100px] sm:min-w-[200px] md:min-w-[220px] max-w-[180px] sm:max-w-[200px] md:max-w-[220px] flex-shrink-0"
      : "w-[calc(50%-6px)] sm:w-[calc(33.333%-10px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-12px)]";

  const imageHeight =
    layout === "scroll"
      ? "h-[90px] sm:h-[130px] md:h-[200px]"
      : "h-[130px] sm:h-[150px] md:h-[180px]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cardClasses}
    >
      <div className="relative overflow-hidden rounded-xl group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={300}
            height={180}
            className={`${imageHeight} w-full object-cover`}
          />
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute left-2 top-2 rounded-md bg-[#FF7A1A] px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-white"
        >
          {item.offer}
        </motion.div>

        <div className="absolute bottom-2 right-2">
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
              >
                <FiPlus
                  size={14}
                  className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-green-500"
                  strokeWidth={3}
                 />
              </motion.button>
            ) : (
              <CounterButton
                key="counter"
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2 flex items-start gap-1.5">
        <FoodTypeIcon type={item.type} />
        <h3 className="line-clamp-2 text-[13px] sm:text-[14px] font-semibold leading-5 text-gray-900">
          {item.name}
        </h3>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-1">
        <motion.span
          key={item.price}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-[16px] sm:text-[18px] font-bold text-gray-900"
        >
          ₹{item.price}
        </motion.span>

        <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">
          ₹{item.oldPrice}
        </span>

        <span className="text-[10px] sm:text-[12px] font-medium text-green-600">
          Save ₹{item.save}
        </span>
      </div>

      {quantity > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-orange-600 font-semibold"
        >
          Subtotal: ₹{item.price * quantity}
        </motion.div>
      )}
    </motion.div>
  );
}