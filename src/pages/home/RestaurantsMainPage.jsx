"use client";

import { useState, useEffect, useCallback } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductCard from "../components/product/ProductCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";

// ========== Normalization Functions (same as app) ==========
const normalizePrice = (value) => {
  const rawValue = value ?? 0;
  if (typeof rawValue === "string" && /₹|â‚¹/.test(rawValue)) {
    return rawValue;
  }
  const amount = Number(rawValue);
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return safeAmount;
};

// const normalizeProduct = (product, index) => ({
//   id: product?.id || product?._id || `product-${index}`,
//   name: product?.name || product?.title || `Product ${index + 1}`,
//   price: normalizePrice(product?.price),
//   oldPrice: normalizePrice(
//     product?.discount_price ?? product?.discountPrice ?? product?.price,
//   ),
//   save:
//     normalizePrice(product?.price) -
//     normalizePrice(product?.discount_price ?? product?.price),
//   offer:
//     product?.offer || product?.discount_percent
//       ? `${product?.discount_percent}% OFF`
//       : "",
//   type: product?.isVeg || product?.foodType === "veg" ? "veg" : "non-veg",
//   image:
//     product?.image ||
//     product?.images?.[0] ||
//     product?.productImage ||
//     "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
//   description: product?.description || "",
//   rating: product?.rating ?? 4,
//   stock: Number(product?.stock ?? product?.quantity ?? 10),
//   outOfStock: product?.outOfStock === true || Number(product?.stock ?? 1) <= 0,
//   recommended: Boolean(product?.recommended ?? product?.isRecommended),
//   trending: Boolean(product?.trending ?? product?.isTrending),
// });

const normalizeProduct = (product, index) => ({
  id: product?.id || product?._id || `product-${index}`,
  name: product?.name || product?.title || `Product ${index + 1}`,
  price: normalizePrice(product?.price),
  oldPrice: normalizePrice(product?.discount_price ?? product?.discountPrice ?? product?.price),
  save: normalizePrice(product?.price) - normalizePrice(product?.discount_price ?? product?.price),
  offer: product?.offer || product?.discount_percent ? `${product?.discount_percent}% OFF` : '',
  type: (product?.isVeg || product?.foodType === 'veg') ? 'veg' : 'non-veg',
  image: product?.image || product?.images?.[0] || product?.productImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
  description: product?.description || '',
  rating: product?.rating ?? 4,
  stock: Number(product?.stock ?? product?.quantity ?? 10),
  outOfStock: product?.outOfStock === true || Number(product?.stock ?? 1) <= 0,
  recommended: Boolean(product?.recommended ?? product?.isRecommended),
  trending: Boolean(product?.trending ?? product?.isTrending),
  // IMPORTANT: Add these fields
  restaurantId: product?.restaurantId, // MongoDB ID
  RESTID: product?.RESTID, // Business ID
});
const normalizeRestaurant = (restaurant, index) => {
  const products = Array.isArray(restaurant?.products)
    ? restaurant.products
    : Array.isArray(restaurant?.product)
      ? restaurant.product
      : Array.isArray(restaurant?.menuItems)
        ? restaurant.menuItems
        : Array.isArray(restaurant?.menus)
          ? restaurant.menus
          : [];

  const categoryNames = Array.isArray(restaurant?.categories)
    ? restaurant.categories
        .map((category) =>
          typeof category === "string"
            ? category
            : category?.name || category?.title || "",
        )
        .filter(Boolean)
    : [];

  return {
    id: restaurant?.id || restaurant?._id || `restaurant-${index}`,
    name: restaurant?.title || restaurant?.name || `Restaurant ${index + 1}`,
    rating: parseFloat(restaurant?.rating ?? restaurant?.avgRating ?? 4.0),
    deliveryTime:
      restaurant?.time ||
      restaurant?.deliveryTime ||
      restaurant?.estimatedDeliveryTime ||
      "25-30 mins",
    cuisine:
      restaurant?.cuisine ||
      restaurant?.category ||
      categoryNames.join(", ") ||
      "Food",
    offer:
      restaurant?.offer ||
      restaurant?.tagline ||
      restaurant?.description ||
      "Free Delivery Items At ₹500",
    badge: restaurant?.badge || restaurant?.tagline || "Recommended",
    items: products.map(normalizeProduct),
    address: restaurant?.address?.fullAddress || restaurant?.address || "",
    location: restaurant?.locationName || restaurant?.address?.city || "",
  };
};

const extractRestaurantList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.product)) return payload.product;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.restaurant)) return payload.restaurant;
  if (Array.isArray(payload?.restaurants)) return payload.restaurants;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.restaurants))
    return payload.data.restaurants;
  if (Array.isArray(payload?.data?.product)) return payload.data.product;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
};

// ========== Loading Skeleton Component ==========
const RestaurantSkeleton = () => (
  <div className="max-w-7xl mx-1 md:mt-0 mt-3 sm:mx-auto rounded-2xl border border-gray-200 bg-white p-4 animate-pulse">
    <div className="flex flex-row justify-between gap-4 sm:gap-0">
      <div className="flex-1">
        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-7 sm:h-8 w-48 bg-gray-200 rounded"></div>
        <div className="mt-2 flex gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-1 h-4 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gray-200"></div>
    </div>
    <div className="mt-4 flex gap-3 sm:gap-4 overflow-x-auto pb-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-[160px] sm:w-[180px] flex-shrink-0">
          <div className="h-[90px] sm:h-[130px] bg-gray-200 rounded-xl"></div>
          <div className="mt-2 h-3 w-20 bg-gray-200 rounded"></div>
          <div className="mt-1 h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// ========== Empty State Component ==========
const EmptyState = ({ deliveryPointLabel, onRetry }) => (
  <div className="max-w-7xl mx-1 md:mt-0 mt-3 sm:mx-auto rounded-2xl border border-gray-200 bg-white p-8 text-center">
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        No Restaurants Available
      </h3>
      <p className="text-gray-500 mb-4">
        We couldn't find any restaurants for{" "}
        {deliveryPointLabel || "this delivery point"}. Please try another
        location or check back later.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// ========== Main Component ==========
export default function RestaurantsMainPage({ layout = "scroll" }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get selected delivery point from Redux (same as app)
  const { selectedDeliveryPoint } = useSelector(
    (state) => state.delivery || { selectedDeliveryPoint: null },
  );

  const deliveryPointId =
    selectedDeliveryPoint?._id || selectedDeliveryPoint?.id;
  const deliveryPointLabel =
    selectedDeliveryPoint?.name ||
    selectedDeliveryPoint?.address?.city ||
    "this delivery point";

  // Fetch restaurants based on delivery point
  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      let response;
      if (deliveryPointId) {
        // API endpoint (same as app)
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delivery/restaurants-with-products/by-delivery-point/${deliveryPointId}`;
        response = await axios.get(apiUrl);
        const rawRestaurants = extractRestaurantList(response?.data);
        const normalizedRestaurants = rawRestaurants
          .map(normalizeRestaurant)
          .filter((restaurant) => restaurant.items.length > 0);

        if (!normalizedRestaurants.length) {
          setError("No restaurants available for this delivery point.");
          setRestaurants([]);
        } else {
          setRestaurants(normalizedRestaurants);
        }
      } else {
        // No delivery point selected - show empty or use fallback
        setRestaurants([]);
        setError("Please select a delivery point to see restaurants.");
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError(getErrorMessage(err));
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  }, [deliveryPointId]);

  const getErrorMessage = (error) => {
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.message) return error.message;
    return "Unable to load restaurants. Please try again.";
  };

  // Fetch on mount and when delivery point changes
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const containerClasses =
    layout === "scroll"
      ? "mt-4 sm:mt-6 flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2"
      : "mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4";

  // Show loading skeletons
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <RestaurantSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show error/empty state
  if (error || restaurants.length === 0) {
    return (
      <EmptyState
        deliveryPointLabel={deliveryPointLabel}
        onRetry={fetchRestaurants}
      />
    );
  }

  // Show restaurants
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

            <Link href={`/restaurant-page/${restaurant.id}`}>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-9 text-black sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors flex-shrink-0"
              >
                <FiArrowRight size={18} />
              </motion.button>
            </Link>
          </div>

          <div className={containerClasses}>
            {restaurant.items.map((item) => (
              <ProductCard
                key={item.id}
                item={item} // This now includes restaurantId and RESTID
                restaurantId={restaurant.id}
                restaurant={restaurant}
                layout={layout}
              />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
