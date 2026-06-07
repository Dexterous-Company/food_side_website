// app/RestrovaShop.jsx or components/RestrovaShop.jsx
"use client";
import { useState } from "react";
import { ProductCard, FeaturedBanner, Stars, RupeeIcon } from "./Productcard";
import { MobileView } from "./MobileView";
import { DesktopView } from "./DesktopView";
import { ProductBottomSheet } from "./ProductBottomSheet";
import categories from "../../mockdata/categories.json";
import menuItems from "../../mockdata/menus.json";
import restaurants from "../../mockdata/restaurants.json";
import { Icon } from "./Icons";

// Helper function to extract ID
const getId = (v) => v?.$oid || v?._id?.$oid || v?._id || v?.id || v;

// Create maps for lookups
const categoryById = new Map(categories.map((c) => [getId(c), c]));
const restaurantByRestId = new Map(restaurants.map((r) => [r.RESTID, r]));

// Process categories
const categoryList = [
  {
    id: "all",
    name: "All Products",
    icon: () => <svg>...</svg>,
    count: menuItems.length,
  },
  ...categories.map((cat) => ({
    id: cat.slugurl,
    name: cat.name,
    icon: Icon.Box, // This is correct

    count: menuItems.filter((item) => getId(item.categoryId) === getId(cat))
      .length,
  })),
].filter((c) => c.id === "all" || c.count > 0);

// Process products
const products = menuItems.map((item) => {
  const restaurant = restaurantByRestId.get(item.RESTID);
  const category = categoryById.get(getId(item.categoryId));
  const hasDiscount =
    Number(item.discount_price) > 0 &&
    Number(item.discount_price) < Number(item.price);
  return {
    id: getId(item),
    name: item.name,
    desc: item.description || "",
    price: hasDiscount ? item.discount_price : item.price,
    originalPrice: hasDiscount ? item.price : null,
    discount_price: item.discount_price,
    img: item.image,
    isAvailable: item.isAvailable,
    isVeg: item.isVeg,
    recommended: item.recommended || false,
    trending: item.trending || false,
    rating: item.rating || 5,
    reviewCount: item.reviewCount || item.stock || 0,
    estimateTimePrepareMenuItem: item.estimateTimePrepareMenuItem || 25,
    category: category?.slugurl || "fast-food",
    categoryName: category?.name || "Fast Food",
    restaurantName: restaurant?.name,
    restaurantCity: restaurant?.address?.city,
    stock: item.stock || 0,
    badge: item.trending
      ? "Trending"
      : item.recommended
        ? "Recommended"
        : item.isVeg
          ? "Veg"
          : null,
    badgeType: item.trending
      ? "hot"
      : item.recommended
        ? "bestseller"
        : item.isVeg
          ? "new"
          : null,
  };
});

const maxProductPrice = Math.max(
  200,
  ...products.map((p) => Number(p.price) || 0),
);
const featuredProduct =
  products.find((p) => p.trending) ||
  products.find((p) => p.recommended) ||
  products[0];
const activeRestaurant = restaurants[0] || {};

export default function RestaturentShop() {
  const [selCat, setSelCat] = useState("all");
  const [price, setPrice] = useState(maxProductPrice);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [selRating, setSelRating] = useState(null);
  const [foodType, setFoodType] = useState("all");
  const [activeItem, setActiveItem] = useState(null);

  // Filter products
  const filtered = products
    .filter((p) => selCat === "all" || p.category === selCat)
    .filter(
      (p) => foodType === "all" || (foodType === "veg" ? p.isVeg : !p.isVeg),
    )
    .filter((p) => p.price <= price)
    .filter(
      (p) =>
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((p) => {
      if (!selRating) return true;
      if (selRating === 5) return p.rating >= 4.9;
      if (selRating === 4) return p.rating >= 4;
      return p.rating >= 3;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const recommendedItems = filtered.filter((p) => p.recommended);
  const trendingItems = filtered.filter((p) => p.trending);
  const otherItems = filtered.filter((p) => !p.recommended && !p.trending);

  return (
    <div className="font-['-apple-system',BlinkMacSystemFont,'Segoe_UI',sans-serif] text-gray-500 bg-gray-50 min-h-screen">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%) }
          to { transform: translateY(0) }
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Bottom Sheet */}
      {activeItem && (
        <ProductBottomSheet
          item={activeItem}
          onClose={() => setActiveItem(null)}
        />
      )}

      {/* Mobile View */}
      <MobileView
        restaurant={activeRestaurant}
        featuredProduct={featuredProduct}
        products={products}
        filtered={filtered}
        trendingItems={trendingItems}
        recommendedItems={recommendedItems}
        otherItems={otherItems}
        search={search}
        setSearch={setSearch}
        foodType={foodType}
        setFoodType={setFoodType}
        sort={sort}
        setSort={setSort}
        setActiveItem={setActiveItem}
      />

      {/* Desktop View */}
      <DesktopView
        categoryList={categoryList}
        selCat={selCat}
        setSelCat={setSelCat}
        maxProductPrice={maxProductPrice}
        price={price}
        setPrice={setPrice}
        selRating={selRating}
        setSelRating={setSelRating}
        foodType={foodType}
        setFoodType={setFoodType}
        products={products}
        filtered={filtered}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
        featuredProduct={featuredProduct}
      />
    </div>
  );
}
