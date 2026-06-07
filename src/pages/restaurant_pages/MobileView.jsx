// components/MobileView.jsx
import { FoodMark } from "./FoodMark";
import { MobileSection } from "./MobileSection";

export function MobileView({ 
  restaurant, 
  featuredProduct, 
  products, 
  filtered, 
  trendingItems, 
  recommendedItems, 
  otherItems,
  search,
  setSearch,
  foodType,
  setFoodType,
  sort,
  setSort,
  setActiveItem 
}) {
  const chipStyle = (active) => ({
    height: "40px",
    borderRadius: "999px",
    border: `1.5px solid ${active ? "#ccc" : "#ddd"}`,
    background: active ? "#f5f5f7" : "#fff",
    padding: "0 16px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#222",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    fontFamily: "inherit",
  });

  return (
    <div className="mobile-shop block md:hidden bg-white min-h-screen text-[#222] pb-10">
      {/* Hero Section */}
      <div className="relative h-[240px] bg-black overflow-hidden">
        <img 
          src={featuredProduct?.img || products[0]?.img} 
          alt={restaurant.name || "Restaurant"}
          className="w-full h-full object-cover block" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/5" />
        
        <button aria-label="Back" className="absolute top-5 left-4 w-[38px] h-[38px] rounded-full bg-black/42 border-none text-white flex items-center justify-center cursor-pointer z-[3]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="w-5 h-5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <button aria-label="Share" className="absolute top-5 right-4 w-[38px] h-[38px] rounded-full bg-black/42 border-none text-white flex items-center justify-center cursor-pointer z-[3]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2"/>
          </svg>
        </button>
      </div>

      {/* Content Sheet */}
      <div className="relative z-[2] -mt-5 bg-white rounded-t-2xl pt-5 px-4 pb-0">
        <h1 className="text-[26px] font-extrabold text-[#1a1a1a] leading-tight mb-1.5">
          {restaurant.name || "Habibo Restaurant"}
        </h1>
        
        <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium mb-1.5">
          <span className="text-[#15966a] text-base">★</span>
          <span>4.0 • 25-30 mins • Food</span>
        </div>
        
        <div className="text-sm font-bold text-[#d71920] mb-3.5">Fresh picks for you</div>

        {/* Search */}
        <label className="h-[46px] bg-[#f1f1f3] rounded-full flex items-center gap-2.5 px-[18px] mb-4 cursor-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" className="w-[18px] h-[18px] flex-shrink-0">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search for dishes" 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="border-0 outline-none bg-transparent text-[15px] text-[#333] w-full" 
          />
        </label>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-0.5">
          <button 
            onClick={() => setFoodType(foodType === "veg" ? "all" : "veg")} 
            aria-pressed={foodType === "veg"} 
            style={chipStyle(foodType === "veg")}
          >
            <FoodMark isVeg={true} size={14} />
            <span className="inline-block w-[38px] h-2.5 rounded-full bg-gray-300" />
          </button>
          
          <button 
            onClick={() => setFoodType(foodType === "nonveg" ? "all" : "nonveg")} 
            aria-pressed={foodType === "nonveg"} 
            style={chipStyle(foodType === "nonveg")}
          >
            <FoodMark isVeg={false} size={14} />
            <span className="inline-block w-[38px] h-2.5 rounded-full bg-gray-300" />
          </button>
          
          <button 
            onClick={() => setSort(sort === "rating" ? "featured" : "rating")} 
            style={chipStyle(sort === "rating")}
          >
            Popularity
          </button>
        </div>

        {/* Sections */}
        <MobileSection 
          title="Trending" 
          items={trendingItems.length ? trendingItems : filtered.slice(0, 6)} 
          onOpen={setActiveItem} 
        />
        <MobileSection 
          title="Recommended" 
          items={recommendedItems.length ? recommendedItems : otherItems.slice(0, 6)} 
          onOpen={setActiveItem} 
        />
        {otherItems.length > 0 && (
          <MobileSection title="All Items" items={otherItems} onOpen={setActiveItem} />
        )}
      </div>
    </div>
  );
}