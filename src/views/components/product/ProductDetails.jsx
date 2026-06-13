"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaStar,
  FaFire,
  FaClock,
  FaUsers,
  FaWhatsapp,
  FaLink,
  FaCircleCheck,
  FaUtensils,
  FaMinus,
  FaPlus,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaChevronRight,
  FaCartShopping,
} from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../../components/product/ProductCard";

// ─── Data Transformers ────────────────────────────────────────────────────────

const transformProductData = (menu) => {
  const hasDiscount =
    menu.discount_price > 0 && menu.discount_price < menu.price;
  return {
    id: menu._id,
    name: menu.name,
    description: menu.description || "",
    price: hasDiscount ? menu.discount_price : menu.price,
    originalPrice: menu.price,
    discountPrice: menu.discount_price,
    discountPercent: hasDiscount
      ? Math.round(((menu.price - menu.discount_price) / menu.price) * 100)
      : 0,
    image: menu.image || "/placeholder-food.jpg",
    type: menu.isVeg ? "veg" : "nonveg",
    isVeg: menu.isVeg,
    rating: menu.rating || 4.5,
    stock: menu.stock || 0,
    recommended: menu.recommended || false,
    trending: menu.trending || false,
    categoryId: menu.category?._id,
    categoryName: menu.category?.name,
    subcategoryName: menu.subcategory?.name,
    restaurantId: menu.restaurantId,
  };
};

const transformForProductCard = (product) => {
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
          ((product.price - product.discount_price) / product.price) * 100
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
    stock: product.stock || 0,
  };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <FaStar
        key={s}
        className={`text-xs ${
          s <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"
        }`}
      />
    ))}
    <span className="text-sm text-white/80 ml-1 font-medium">{rating}</span>
  </div>
);

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative w-20 h-20 mx-auto">
        <div className="w-20 h-20 border-4 border-orange-100 rounded-full" />
        <div className="absolute inset-0 w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🍗
        </div>
      </div>
      <p className="text-gray-500 font-medium">Loading delicious details…</p>
    </div>
  </div>
);

const NotFoundScreen = ({ onBack }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto text-5xl">
        😕
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
      <p className="text-gray-500">The product you're looking for doesn't exist.</p>
      <button
        onClick={onBack}
        className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
);

// ─── Tab Content Components ───────────────────────────────────────────────────

const DescriptionTab = ({ description }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-900 mb-4"
      style={{ fontFamily: "'Playfair Display', serif" }}>
      About This Dish
    </h3>
    <p className="text-gray-500 leading-relaxed mb-8">{description}</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { icon: <FaUtensils />, title: "Premium Quality", note: "Finest ingredients sourced" },
        { icon: <FaClock />, title: "Freshly Prepared", note: "Made fresh to order" },
        { icon: <FaUsers />, title: "Chef's Special", note: "Expertly crafted recipe" },
      ].map((f) => (
        <div key={f.title}
          className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">
            {f.icon}
          </div>
          <h4 className="font-bold text-gray-800 mb-1 text-sm">{f.title}</h4>
          <p className="text-gray-400 text-xs">{f.note}</p>
        </div>
      ))}
    </div>
  </div>
);

const IngredientsTab = () => {
  const items = [
    { icon: "🍗", name: "Premium Chicken", note: "Fresh & Halal" },
    { icon: "🧂", name: "Signature Spices", note: "House Blend" },
    { icon: "🧅", name: "Fresh Onions", note: "Locally Sourced" },
    { icon: "🧄", name: "Garlic Paste", note: "Fresh" },
    { icon: "🍟", name: "Crispy Fries", note: "Golden Cut" },
    { icon: "🌿", name: "Fresh Herbs", note: "Garden Fresh" },
    { icon: "🫒", name: "Premium Oil", note: "Cold Pressed" },
    { icon: "🥤", name: "Cold Drink", note: "Chilled" },
  ];
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        Key Ingredients
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((ing) => (
          <div key={ing.name}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="text-3xl mb-2">{ing.icon}</div>
            <div className="font-semibold text-gray-800 text-sm">{ing.name}</div>
            <div className="text-gray-400 text-xs mt-1">{ing.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NutritionTab = () => {
  const rows = [
    ["Calories", "650–750 kcal"],
    ["Protein", "28–32g"],
    ["Total Fat", "22–28g"],
    ["Saturated Fat", "8–10g"],
    ["Carbohydrates", "45–55g"],
    ["Fiber", "4–6g"],
    ["Sodium", "680–780mg"],
  ];
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        Nutrition Information
      </h3>
      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mb-4">
        {rows.map(([label, val], i) => (
          <div key={label}
            className={`flex items-center justify-between px-5 py-3.5 text-sm ${
              i !== rows.length - 1 ? "border-b border-gray-100" : ""
            }`}>
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="font-bold text-gray-900">{val}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <FaCircleCheck className="text-amber-500 text-lg mt-0.5 shrink-0" />
        <p className="text-gray-600 text-sm leading-relaxed">
          <span className="font-bold text-amber-700">Allergen info:</span>{" "}
          Contains gluten. Prepared in a kitchen that handles nuts, seafood, and
          eggs. Please inform us of any dietary requirements before ordering.
        </p>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId;

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    if (!productId) return;
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delivery/menu-full-details/${productId}`,
          { headers: { "Content-Type": "application/json" } }
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        if (result.success) {
          const { menu, categoryProducts, similarProducts } = result.data;
          setProductData(transformProductData(menu));
          setRestaurantId(menu.restaurantId);
          setCategoryProducts(categoryProducts.map(transformForProductCard));
          setSimilarProducts(similarProducts.map(transformForProductCard));
        } else {
          toast.error("Failed to load product details");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleQuantityChange = (type) =>
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );

  const handleAddToCart = () => {
    if (!productData) return;
    addItem({
      restaurant: { _id: restaurantId },
      product: { ...productData, quantity, restaurantId },
    });
    toast.success(`Added ${quantity} × ${productData.name} to cart`, {
      icon: "🛒",
      style: {
        borderRadius: "12px",
        fontWeight: "500",
      },
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: productData?.name,
          text: `Check out ${productData?.name}!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied!");
      }
    } catch (err) {
      if (err.name !== "AbortError") toast.error("Failed to share");
    }
  };

  if (loading) return <LoadingScreen />;
  if (!productData) return <NotFoundScreen onBack={() => router.back()} />;

  const discountAmount = productData.originalPrice - productData.price;
  const discountPercent = productData.discountPercent;
  const tabs = ["description", "ingredients", "nutrition"];

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');`}</style>

      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />

        {/* ── Hero / Breadcrumb ─────────────────────────────────────── */}
        <section className="relative bg-neutral-900 min-h-[220px] flex items-end pb-0 overflow-hidden">
          {/* BG Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200')",
              opacity: 0.3,
            }}
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />

          <div className="container relative z-10 mx-auto px-4 max-w-7xl pb-10 pt-14">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-white/50 mb-5">
              <button
                onClick={() => router.push("/")}
                className="hover:text-white/80 transition-colors"
              >
                Home
              </button>
              <FaChevronRight className="text-[8px]" />
              <button
                onClick={() => router.back()}
                className="hover:text-white/80 transition-colors"
              >
                Menu
              </button>
              <FaChevronRight className="text-[8px]" />
              <span className="text-orange-400">{productData.name}</span>
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {productData.name}
            </h1>
          </div>
        </section>

        {/* ── Main Product Card ─────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl -mt-2 pb-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left — Image */}
              <div className="relative bg-neutral-900 min-h-[320px] md:min-h-[480px] overflow-hidden group">
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105 opacity-90"
                />

                {/* Top badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                  {productData.trending && (
                    <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      <FaFire className="text-[10px]" /> Trending
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {discountPercent}% OFF
                    </span>
                  )}
                  {productData.recommended && (
                    <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ Recommended
                    </span>
                  )}
                </div>

                {/* Veg/NonVeg indicator */}
                <div className="absolute top-5 right-5 z-10">
                  <div
                    className={`w-8 h-8 rounded-md border-2 flex items-center justify-center bg-white/90 backdrop-blur-sm ${
                      productData.isVeg
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        productData.isVeg ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Bottom rating strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 z-10">
                  <StarRating rating={productData.rating} />
                </div>
              </div>

              {/* Right — Info */}
              <div className="flex flex-col justify-between p-7 md:p-10">
                <div>
                  {/* Category pill */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-orange-50 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-orange-100">
                      {productData.categoryName}
                    </span>
                    {productData.subcategoryName && (
                      <span className="bg-gray-100 text-gray-500 text-[11px] font-medium px-3 py-1.5 rounded-full">
                        {productData.subcategoryName}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h2
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {productData.name}
                  </h2>

                  {/* Meta chips */}
                  <div className="flex flex-wrap gap-3 mb-5 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <FaClock className="text-orange-400" /> 20–25 min
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <FaUsers className="text-orange-400" /> Serves 1–2
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold ${
                        productData.isVeg
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {productData.isVeg ? "🥬 Pure Veg" : "🍗 Non Veg"}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {productData.description}
                  </p>
                </div>

                <div>
                  {/* Price */}
                  <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <div
                        className="text-4xl md:text-5xl font-bold text-gray-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ₹{productData.price}
                      </div>
                      {discountAmount > 0 && (
                        <div className="text-sm text-gray-400 line-through mt-0.5">
                          ₹{productData.originalPrice}
                        </div>
                      )}
                    </div>
                    {discountAmount > 0 && (
                      <div className="mb-1">
                        <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100">
                          You save ₹{discountAmount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-sm font-semibold text-gray-700">
                      Quantity
                    </span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full">
                      <button
                        onClick={() => handleQuantityChange("decrement")}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-900 text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("increment")}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      Stock: {productData.stock} left
                    </span>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-orange-200"
                    >
                      <FaCartShopping className="text-sm" />
                      <span>Add to Cart</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                        ₹{productData.price * quantity}
                      </span>
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:border-red-300 hover:bg-red-50 active:scale-95 transition-all"
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-red-500 text-lg" />
                      ) : (
                        <FaRegHeart className="text-gray-400 text-lg" />
                      )}
                    </button>
                  </div>

                  {/* Share */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-1">
                      Share
                    </span>
                    <button
                      onClick={handleShare}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp className="text-xs" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
                      aria-label="Copy link"
                    >
                      <FaLink className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tabs Section ──────────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl pb-10">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tab nav */}
            <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? "text-orange-500 border-orange-500"
                      : "text-gray-400 border-transparent hover:text-orange-400"
                  }`}
                >
                  {tab === "description"
                    ? "Description"
                    : tab === "ingredients"
                    ? "Ingredients"
                    : "Nutrition Info"}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-7 md:p-10">
              {activeTab === "description" && (
                <DescriptionTab description={productData.description} />
              )}
              {activeTab === "ingredients" && <IngredientsTab />}
              {activeTab === "nutrition" && <NutritionTab />}
            </div>
          </div>
        </section>

        {/* ── Similar Products (horizontal scroll) ─────────────────── */}
        {similarProducts.length > 0 && (
          <section className="pb-10 bg-orange-50/60">
            <div className="container mx-auto px-4 max-w-7xl py-12">
              {/* Section header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-orange-400 rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    You May Also Like
                  </span>
                  <span className="w-8 h-0.5 bg-orange-400 rounded-full" />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Similar Dishes
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Discover other delicious options from our menu
                </p>
              </div>

              {/* Scroll container — ProductCard untouched */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 -mx-1 px-1">
                {similarProducts.map((product) => (
                  <div key={product.id} className="flex-none">
                    <ProductCard
                      item={product}
                      restaurantId={restaurantId}
                      restaurant={{ _id: restaurantId }}
                      layout="scroll"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Category Products (grid) ──────────────────────────────── */}
        {categoryProducts.length > 0 &&
          categoryProducts.length !== similarProducts.length && (
            <section className="container mx-auto px-4 max-w-7xl py-12 pb-16">
              {/* Section header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-orange-400 rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    More from {productData.categoryName}
                  </span>
                  <span className="w-8 h-0.5 bg-orange-400 rounded-full" />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  You Might Also Like
                </h2>
              </div>

              {/* Grid — ProductCard untouched */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {categoryProducts.slice(0, 5).map((product) => (
                  <ProductCard
                    key={product.id}
                    item={product}
                    restaurantId={restaurantId}
                    restaurant={{ _id: restaurantId }}
                    layout="grid"
                  />
                ))}
              </div>
            </section>
          )}
      </div>
    </>
  );
}
