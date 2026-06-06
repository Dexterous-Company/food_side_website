"use client";

import { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiPlus, FiMinus } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { GiChickenOven, GiCarrot } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

const restaurants = [
  {
    id: 1,
    name: "Habibo Restaurant",
    rating: 4.0,
    deliveryTime: "25-30 mins",
    cuisine: "Food",
    offer: "Free Delivery Items At ₹500",
    badge: "Fresh picks for you",
    items: [
      {
        id: 1,
        name: "Hyderabadi Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600",
        price: 299,
        oldPrice: 349,
        save: 50,
        offer: "14% OFF",
        type: "non-veg",
      },
      {
        id: 2,
        name: "Chicken Tikka Biryani",
        image:
          "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600",
        price: 349,
        oldPrice: 399,
        save: 50,
        offer: "13% OFF",
        type: "non-veg",
      },
      {
        id: 3,
        name: "Veg Dum Biryani",
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
        price: 199,
        oldPrice: 249,
        save: 50,
        offer: "20% OFF",
        type: "veg",
      },
      {
        id: 4,
        name: "Paneer Tikka Biryani",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
        price: 279,
        oldPrice: 329,
        save: 50,
        offer: "15% OFF",
        type: "veg",
      },
      {
        id: 5,
        name: "Mutton Biryani",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
        price: 399,
        oldPrice: 449,
        save: 50,
        offer: "11% OFF",
        type: "non-veg",
      },
      {
        id: 6,
        name: "Mushroom Biryani",
        image:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600",
        price: 229,
        oldPrice: 279,
        save: 50,
        offer: "18% OFF",
        type: "veg",
      },
      {
        id: 7,
        name: "Chicken 65 Biryani",
        image:
          "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600",
        price: 329,
        oldPrice: 379,
        save: 50,
        offer: "13% OFF",
        type: "non-veg",
      },
      {
        id: 8,
        name: "Egg Biryani",
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
        price: 179,
        oldPrice: 229,
        save: 50,
        offer: "22% OFF",
        type: "non-veg",
      },
    ],
  },
  {
    id: 2,
    name: "Biryani House",
    rating: 4.3,
    deliveryTime: "20-25 mins",
    cuisine: "Biryani",
    offer: "Free Delivery Items At ₹300",
    badge: "Popular near you",
    items: [
      {
        id: 1,
        name: "Lucknowi Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600",
        price: 349,
        oldPrice: 399,
        save: 50,
        offer: "12% OFF",
        type: "non-veg",
      },
      {
        id: 2,
        name: "Veg Biryani Deluxe",
        image:
          "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600",
        price: 199,
        oldPrice: 249,
        save: 50,
        offer: "20% OFF",
        type: "veg",
      },
      {
        id: 3,
        name: "Cheese Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
        price: 379,
        oldPrice: 429,
        save: 50,
        offer: "12% OFF",
        type: "non-veg",
      },
      {
        id: 4,
        name: "Veg Makhanwala Biryani",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
        price: 219,
        oldPrice: 269,
        save: 50,
        offer: "19% OFF",
        type: "veg",
      },
      {
        id: 5,
        name: "Fish Biryani",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
        price: 399,
        oldPrice: 449,
        save: 50,
        offer: "11% OFF",
        type: "non-veg",
      },
      {
        id: 6,
        name: "Soya Chaap Biryani",
        image:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600",
        price: 209,
        oldPrice: 259,
        save: 50,
        offer: "19% OFF",
        type: "veg",
      },
      {
        id: 7,
        name: "Kolkata Biryani with Egg",
        image:
          "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600",
        price: 299,
        oldPrice: 349,
        save: 50,
        offer: "14% OFF",
        type: "non-veg",
      },
      {
        id: 8,
        name: "Dal Khichdi Biryani",
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
        price: 179,
        oldPrice: 229,
        save: 50,
        offer: "22% OFF",
        type: "veg",
      },
    ],
  },
  {
    id: 3,
    name: "Royal Dum Biryani",
    rating: 4.5,
    deliveryTime: "30-35 mins",
    cuisine: "Biryani",
    offer: "Free Delivery Items At ₹600",
    badge: "Recommended",
    items: [
      {
        id: 1,
        name: "Royal Chicken Dum Biryani",
        image:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600",
        price: 399,
        oldPrice: 449,
        save: 50,
        offer: "11% OFF",
        type: "non-veg",
      },
      {
        id: 2,
        name: "Kashmiri Veg Biryani",
        image:
          "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600",
        price: 229,
        oldPrice: 279,
        save: 50,
        offer: "18% OFF",
        type: "veg",
      },
      {
        id: 3,
        name: "Butter Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
        price: 419,
        oldPrice: 469,
        save: 50,
        offer: "11% OFF",
        type: "non-veg",
      },
      {
        id: 4,
        name: "Malabar Veg Biryani",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
        price: 239,
        oldPrice: 289,
        save: 50,
        offer: "17% OFF",
        type: "veg",
      },
      {
        id: 5,
        name: "Sindhi Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
        price: 349,
        oldPrice: 399,
        save: 50,
        offer: "13% OFF",
        type: "non-veg",
      },
      {
        id: 6,
        name: "Veg Handi Biryani",
        image:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600",
        price: 209,
        oldPrice: 259,
        save: 50,
        offer: "19% OFF",
        type: "veg",
      },
      {
        id: 7,
        name: "Afghani Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600",
        price: 389,
        oldPrice: 439,
        save: 50,
        offer: "11% OFF",
        type: "non-veg",
      },
      {
        id: 8,
        name: "Nizami Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
        price: 399,
        oldPrice: 449,
        save: 50,
        offer: "11% OFF",
        type: "non-veg",
      },
    ],
  },
];

export default function RestaurantRecommendations() {
  // State to manage quantities for each item
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (restaurantId, itemId, delta) => {
    const key = `${restaurantId}-${itemId}`;
    setQuantities((prev) => {
      const newQuantity = Math.max(0, (prev[key] || 0) + delta);
      if (newQuantity === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: newQuantity };
    });
  };

  const getQuantity = (restaurantId, itemId) => {
    return quantities[`${restaurantId}-${itemId}`] || 0;
  };

  // Veg/Non-veg icon component
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

  // Counter button component with animation
  const CounterButton = ({ quantity, onIncrement, onDecrement }) => {
    return (
      <motion.div
        initial={false}
        animate={{ scale: quantity > 0 ? 1 : 0.95 }}
        className="flex items-center gap-2 bg-white rounded-full shadow-lg overflow-hidden"
      >
        {quantity > 0 && (
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            onClick={onDecrement}
            className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center text-black transition-colors"
          >
            <FiMinus size={16} />
          </motion.button>
        )}

        {quantity > 0 && (
          <motion.span
            key={quantity}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-semibold text-gray-900 min-w-[20px] text-center text-sm"
          >
            {quantity}
          </motion.span>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onIncrement}
          className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center  text-black transition-colors"
        >
          <FiPlus size={16} />
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {restaurants.map((restaurant) => (
        <motion.section
          key={restaurant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-1 md:mt-0 mt-3 sm:mx-auto rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-lg transition-shadow duration-300"
        >
          {/* Header */}
          <div className="flex flex-row justify-between gap-4 sm:gap-0">
            <div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-[#FF6B35]">
                {restaurant.badge}
              </p>

              <div className="sm:mt-1 text-[20px] sm:text-[28px] md:text-[32px] font-bold leading-tight sm:leading-none text-gray-900">
                {restaurant.name}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] text-gray-500">
                <IoStar className="text-green-500" size={14} />
                <span>{restaurant.rating}</span>
                <span>•</span>
                <span>{restaurant.deliveryTime}</span>
                <span>•</span>
                <span>{restaurant.cuisine}</span>
              </div>

              <div className="mt-1 flex items-center gap-2 text-[11px] sm:text-[13px] font-medium text-green-600">
                <FaTag size={11} />
                <span>{restaurant.offer}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <FiArrowRight size={18} />
            </motion.button>
          </div>

          <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2">
            {restaurant.items.map((item) => {
              const quantity = getQuantity(restaurant.id, item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="w-[100px] sm:min-w-[200px] md:min-w-[220px] max-w-[180px] sm:max-w-[200px] md:max-w-[220px] flex-shrink-0"
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
                        className="h-[90px] sm:h-[130px] md:h-[200px] w-full object-cover"
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
                            onClick={() =>
                              updateQuantity(restaurant.id, item.id, 1)
                            }
                            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
                          >
                            <FiPlus
                              size={18}
                              strokeWidth={3}
                              className="text-green-500"
                            />
                          </motion.button>
                        ) : (
                          <CounterButton
                            key="counter"
                            quantity={quantity}
                            onIncrement={() =>
                              updateQuantity(restaurant.id, item.id, 1)
                            }
                            onDecrement={() =>
                              updateQuantity(restaurant.id, item.id, -1)
                            }
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
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
