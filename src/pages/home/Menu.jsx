"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductCard from "../components/product/ProductCard";

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

export default function RestaurantRecommendations({ layout = "scroll" }) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (restaurantId, itemId, newQuantity) => {
    const key = `${restaurantId}-${itemId}`;
    setQuantities((prev) => {
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

  const containerClasses =
    layout === "scroll"
      ? "mt-4 sm:mt-6 flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2"
      : "mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4";

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

          <div className={containerClasses}>
            {restaurant.items.map((item) => {
              const quantity = getQuantity(restaurant.id, item.id);

              return (
                <ProductCard
                  key={item.id}
                  item={item}
                  quantity={quantity}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(restaurant.id, item.id, newQuantity)
                  }
                  layout={layout}
                />
              );
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
