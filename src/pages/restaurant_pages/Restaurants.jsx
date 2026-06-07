// app/restaurant-page/[id]/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiSearch,
  FiGrid,
  FiList,
  FiStar,
  FiChevronLeft,
  FiShare2,
  FiClock,
  FiMapPin,
  FiFilter,
  FiX,
  FiDollarSign,
  FiPercent,
  FiPackage,
  FiHeart,
  FiShoppingBag,
  FiSliders,
  FiCheckCircle,
  FiAward,
  FiTruck,
  FiCoffee,
  FiTrendingUp,
  FiThumbsUp,
} from "react-icons/fi";
import { FaLeaf, FaFire, FaRegStar, FaRegClock } from "react-icons/fa";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { restaurantApi } from "../../../utils/restaurantApi";
import toast, { Toaster } from "react-hot-toast";

// Stats Card Component
const StatsCard = ({ icon, value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-bold text-white">{value}</span>
    <span className="text-xs text-white/80">{label}</span>
  </div>
);

// Mobile Filter Drawer
const MobileFilterDrawer = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-85 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <FiSliders className="text-orange-500" />
                Filters
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
          selectedCategory === null
            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Items
      </button>
      {categories.map((category) => (
        <button
          key={category.categoryId}
          onClick={() => onSelectCategory(category.categoryId)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.categoryId
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

// Sort Options Component
const SortOptions = ({ sortBy, onSortChange }) => {
  const options = [
    { value: "featured", label: "✨ Featured", icon: "🔥" },
    { value: "price-asc", label: "💰 Price: Low to High", icon: "📈" },
    { value: "price-desc", label: "💰 Price: High to Low", icon: "📉" },
    { value: "rating", label: "⭐ Top Rated", icon: "🏆" },
  ];

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-3 pr-10 border border-gray-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

// Price Range Slider
const PriceRangeSlider = ({ min, max, value, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">₹{min}</span>
        <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
          Up to ₹{value}
        </span>
        <span className="text-sm text-gray-600">₹{max}</span>
      </div>
      <div className="relative">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-md cursor-pointer transition-all hover:scale-110"
          style={{
            left: `${percentage}%`,
            transform: `translateX(-50%) translateY(-50%)`,
          }}
        />
      </div>
    </div>
  );
};

// Helper function to transform API data to match ProductCard format
const transformProductForCard = (product, restaurantData) => {
  const hasDiscount =
    product.discount_price > 0 && product.discount_price < product.price;

  return {
    id: product._id,
    name: product.name,
    description: product.description || "",
    price: hasDiscount ? product.discount_price : product.price,
    oldPrice: product.price,
    save: hasDiscount ? product.price - product.discount_price : 0,
    discountPercent: hasDiscount
      ? Math.round(
          ((product.price - product.discount_price) / product.price) * 100,
        )
      : 0,
    image: product.image || "/placeholder-food.jpg",
    type: product.isVeg ? "veg" : "nonveg",
    isVeg: product.isVeg,
    recommended: product.recommended || false,
    trending: product.trending || false,
    rating: product.rating || 4.5,
    offer: product.trending
      ? "TRENDING"
      : product.recommended
        ? "RECOMMENDED"
        : null,
    restaurantId: restaurantData._id,
    RESTID: restaurantData.RESTID,
    categoryId: product.categoryId,
    stock: product.stock || 0,
  };
};

// Main Component
export default function RestaurantShopPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurant;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [foodType, setFoodType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);

  const { cartQuantities } = useCart();

  // Share functionality
  const handleShare = async () => {
    try {
      if (
        navigator.share &&
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      ) {
        await navigator.share({
          title: restaurantData?.name || "Restaurant",
          text: `Check out ${restaurantData?.name} on Restrova! Great food awaits you.`,
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Failed to share");
      }
    }
  };

  // Fetch restaurant data from API
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response =
          await restaurantApi.getRestaurantFullDetails(restaurantId);

        if (response.success) {
          setRestaurantData(response.restaurant);
          setCategories(response.categories || []);

          // Transform all products
          const transformedProducts = [];
          response.categories.forEach((category) => {
            category.products.forEach((product) => {
              transformedProducts.push(
                transformProductForCard(product, response.restaurant),
              );
            });
          });
          setAllProducts(transformedProducts);

          // Set max price for range filter
          const maxProductPrice = Math.max(
            ...transformedProducts.map((p) => p.price),
            500,
          );
          setMaxPrice(maxProductPrice);
          setPriceRange(maxProductPrice);
        } else {
          setError(response.message || "Failed to fetch restaurant data");
          toast.error(response.message || "Failed to fetch restaurant data");
        }
      } catch (err) {
        console.error("Error fetching restaurant:", err);
        setError(
          err.message || "An error occurred while fetching restaurant data",
        );
        toast.error("Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurantData();
    }
  }, [restaurantId]);

  // Filter and sort products
  const getFilteredProducts = useCallback(() => {
    let filtered = [...allProducts];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory);
    }
    if (foodType !== "all") {
      filtered = filtered.filter((p) =>
        foodType === "veg" ? p.isVeg : !p.isVeg,
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }
    filtered = filtered.filter((p) => p.price <= priceRange);
    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          if (a.recommended && !b.recommended) return -1;
          if (!a.recommended && b.recommended) return 1;
          return 0;
        });
    }
    return filtered;
  }, [
    allProducts,
    selectedCategory,
    foodType,
    searchQuery,
    priceRange,
    selectedRating,
    sortBy,
  ]);

  const filteredProducts = getFilteredProducts();
  const trendingProducts = filteredProducts.filter((p) => p.trending);
  const recommendedProducts = filteredProducts.filter(
    (p) => p.recommended && !p.trending,
  );
  const otherProducts = filteredProducts.filter(
    (p) => !p.trending && !p.recommended,
  );

  const activeFiltersCount = [
    selectedCategory ? 1 : 0,
    foodType !== "all" ? 1 : 0,
    priceRange < maxPrice ? 1 : 0,
    selectedRating ? 1 : 0,
    searchQuery ? 1 : 0,
  ].filter(Boolean).length;

  // Container classes for products
  const containerClasses =
    viewMode === "grid"
      ? "mt-4 sm:mt-6 flex gap-3 sm:gap-4 flex-wrap  pb-2"
      : "mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4";

  // Get header image - Priority: first product image > restaurant image > default
  const headerImage =
    allProducts[0]?.image ||
    restaurantData?.bannerUrl ||
    restaurantData?.image ||
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-800">
            Loading deliciousness...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we prepare your menu
          </p>
        </div>
      </div>
    );
  }

  if (error || !restaurantData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiX className="text-red-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-500 mb-6">
            {error || "Restaurant not found"}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      <div className="relative h-[280px] md:h-[320px] w-full overflow-hidden bg-black">
        {/* Background Image - Using Next.js Image */}
        <Image
          src={headerImage}
          alt={restaurantData?.name || "Restaurant"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = "/restaurant-banner.jpg";
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Header Icons */}
        <div className="absolute top-5 left-4 right-4 flex justify-between z-20">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all"
          >
            <FiChevronLeft size={22} />
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all"
            >
              <FiShare2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all relative">
              <FiShoppingBag size={18} />
              {Object.values(cartQuantities).reduce((a, b) => a + b, 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold flex items-center justify-center text-white">
                  {Object.values(cartQuantities).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                <FiClock size={14} />
                <span className="text-sm">
                  {restaurantData.deliveryTime || "25-35"} mins
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                <FiTruck size={14} />
                <span className="text-sm">Free Delivery</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {restaurantData.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <FiStar className="fill-yellow-400 text-yellow-400" size={14} />
                <span className="font-semibold">
                  {restaurantData.rating || "4.5"}
                </span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1">
                <FiMapPin size={12} />
                <span>{restaurantData.address?.area || "Your Location"}</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1">
                <FiCoffee size={12} />
                <span>{restaurantData.cuisine || "Multi-Cuisine"}</span>
              </div>
            </div>
            {restaurantData.offer && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg mt-3">
                <FiPercent size={12} className="text-yellow-400" />
                <span className="text-xs font-semibold">
                  {restaurantData.offer}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Content - Rounded Top */}
      <div className="relative -mt-6 bg-white rounded-t-3xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search and Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex gap-3">
                <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
                <div className="flex gap-1 border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 transition-all duration-200 ${viewMode === "grid" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 transition-all duration-200 ${viewMode === "list" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                  >
                    <FiList size={18} />
                  </button>
                </div>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden p-3 border border-gray-200 rounded-xl relative"
                >
                  <FiFilter size={18} />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar - Beautiful Filter Section */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-4 space-y-5">
                {/* Categories Section */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <FiPackage size={18} />
                      Categories
                    </h3>
                  </div>
                  <div className="p-4 space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 flex justify-between items-center ${
                        selectedCategory === null
                          ? "bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 font-semibold border-l-4 border-orange-500"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span>🍽️ All Items</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {allProducts.length}
                      </span>
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.categoryId}
                        onClick={() => setSelectedCategory(category.categoryId)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 flex justify-between items-center ${
                          selectedCategory === category.categoryId
                            ? "bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 font-semibold border-l-4 border-orange-500"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <span>{category.categoryName}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {category.products.length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Food Type Filter */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <FaLeaf size={16} />
                      Food Type
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      {
                        id: "all",
                        name: "All Items",
                        icon: "🍽️",
                        count: allProducts.length,
                      },
                      {
                        id: "veg",
                        name: "Pure Veg",
                        icon: "🥬",
                        count: allProducts.filter((p) => p.isVeg).length,
                      },
                      {
                        id: "nonveg",
                        name: "Non Veg",
                        icon: "🍗",
                        count: allProducts.filter((p) => !p.isVeg).length,
                      },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFoodType(type.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          foodType === type.id
                            ? "bg-green-50 text-green-600 font-semibold border-l-4 border-green-500"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <span className="text-lg">{type.icon}</span>
                        <span className="flex-1 text-left">{type.name}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {type.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <FiDollarSign size={18} />
                      Price Range
                    </h3>
                  </div>
                  <div className="p-4">
                    <PriceRangeSlider
                      min={0}
                      max={maxPrice}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-5 py-3">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <FiStar size={18} />
                      Rating
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {[4, 3].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setSelectedRating(
                            selectedRating === rating ? null : rating,
                          )
                        }
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          selectedRating === rating
                            ? "bg-yellow-50 text-yellow-600 font-semibold border-l-4 border-yellow-500"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <FiStar
                            className="text-yellow-500 fill-yellow-500"
                            size={16}
                          />
                          <span className="font-medium">{rating}.0+ Stars</span>
                        </div>
                        <div
                          className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedRating === rating
                              ? "border-yellow-500 bg-yellow-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedRating === rating && (
                            <FiCheckCircle size={12} className="text-white" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters Summary */}
                {activeFiltersCount > 0 && (
                  <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-orange-600">
                        Active Filters
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setFoodType("all");
                          setPriceRange(maxPrice);
                          setSelectedRating(null);
                          setSearchQuery("");
                        }}
                        className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs text-gray-600">
                          {
                            categories.find(
                              (c) => c.categoryId === selectedCategory,
                            )?.categoryName
                          }
                          <button
                            onClick={() => setSelectedCategory(null)}
                            className="ml-1 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      {foodType !== "all" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs text-gray-600">
                          {foodType === "veg" ? "🥬 Veg" : "🍗 Non Veg"}
                          <button
                            onClick={() => setFoodType("all")}
                            className="ml-1 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      {priceRange < maxPrice && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs text-gray-600">
                          Up to ₹{priceRange}
                          <button
                            onClick={() => setPriceRange(maxPrice)}
                            className="ml-1 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      {selectedRating && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs text-gray-600">
                          {selectedRating}+ Stars
                          <button
                            onClick={() => setSelectedRating(null)}
                            className="ml-1 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Products Section */}
            <main className="flex-1">
              {/* Categories Tabs - Mobile */}
              <div className="lg:hidden mb-6 overflow-x-auto">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>

              {/* Results Count & Filter Status */}
              <div className="mb-5 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-bold text-gray-900">
                      {filteredProducts.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">{allProducts.length}</span>{" "}
                    delicious items
                  </p>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setFoodType("all");
                      setPriceRange(maxPrice);
                      setSelectedRating(null);
                      setSearchQuery("");
                    }}
                    className="text-sm text-orange-600 font-semibold flex items-center gap-1"
                  >
                    <FiX size={14} />
                    Clear all filters ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Products Display */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSearch size={40} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">
                    No products found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your filters or search term
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setFoodType("all");
                      setPriceRange(maxPrice);
                      setSelectedRating(null);
                    }}
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-all"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Trending Section */}
                  {trendingProducts.length > 0 && (
                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <FaFire className="text-orange-500" />
                          Trending Now
                          <span className="text-sm font-normal text-gray-500">
                            ({trendingProducts.length})
                          </span>
                        </h2>
                      </div>
                      <div className={containerClasses}>
                        {trendingProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            item={product}
                            restaurantId={restaurantData._id}
                            restaurant={restaurantData}
                            layout={viewMode === "grid" ? "grid" : "list"}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Section */}
                  {recommendedProducts.length > 0 && (
                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <FiThumbsUp className="text-green-500" />
                          Chef's Recommendation
                          <span className="text-sm font-normal text-gray-500">
                            ({recommendedProducts.length})
                          </span>
                        </h2>
                      </div>
                      <div className={containerClasses}>
                        {recommendedProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            item={product}
                            restaurantId={restaurantData._id}
                            restaurant={restaurantData}
                            layout={viewMode === "grid" ? "grid" : "list"}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Items Section */}
                  {otherProducts.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          🍽️ All Items
                          <span className="text-sm font-normal text-gray-500">
                            ({otherProducts.length})
                          </span>
                        </h2>
                      </div>
                      <div className={containerClasses}>
                        {otherProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            item={product}
                            restaurantId={restaurantData._id}
                            restaurant={restaurantData}
                            layout={viewMode === "grid" ? "grid" : "list"}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiPackage className="text-orange-500" />
              Categories
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === null ? "bg-orange-50 text-orange-600 font-medium" : "hover:bg-gray-50"}`}
              >
                All Items ({allProducts.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => {
                    setSelectedCategory(cat.categoryId);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.categoryId ? "bg-orange-50 text-orange-600 font-medium" : "hover:bg-gray-50"}`}
                >
                  {cat.categoryName} ({cat.products.length})
                </button>
              ))}
            </div>
          </div>

          {/* Food Type */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FaLeaf className="text-green-500" />
              Food Type
            </h4>
            <div className="space-y-1">
              {["all", "veg", "nonveg"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFoodType(type);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${foodType === type ? "bg-orange-50 text-orange-600 font-medium" : "hover:bg-gray-50"}`}
                >
                  {type === "all" ? "All Items" : type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiDollarSign className="text-green-600" />
              Price Range
            </h4>
            <PriceRangeSlider
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={setPriceRange}
            />
          </div>

          {/* Rating */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiStar className="text-yellow-500" />
              Rating
            </h4>
            <div className="space-y-1">
              {[4, 3].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    setSelectedRating(selectedRating === rating ? null : rating)
                  }
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedRating === rating ? "bg-orange-50 text-orange-600 font-medium" : "hover:bg-gray-50"}`}
                >
                  {rating}+ Stars
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setFoodType("all");
                setPriceRange(maxPrice);
                setSelectedRating(null);
                setSearchQuery("");
                setIsFilterOpen(false);
              }}
              className="w-full mt-4 py-3 bg-orange-500 text-white rounded-xl font-semibold"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </MobileFilterDrawer>
    </div>
  );
}
