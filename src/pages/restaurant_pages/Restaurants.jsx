"use client";
import { useState } from "react";
import { ProductCard, FeaturedBanner, Stars, RupeeIcon } from "./Productcard";
import categories from "./categories.json";
import menuItems from "./menus.json";
import restaurants from "./restaurants.json";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  Search:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Grid:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  List:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Star:    () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-amber-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check:   () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>,
  Box:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  Leaf:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M2 2s4 2 8 6 8 10 8 14M14 2s4 4 4 10-4 10-4 10"/></svg>,
  AllGrid: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/><rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/></svg>,
};

const getId = v => v?.$oid || v?._id?.$oid || v?._id || v?.id || v;

const categoryById       = new Map(categories.map(c => [getId(c),  c]));
const restaurantByRestId = new Map(restaurants.map(r => [r.RESTID, r]));

const categoryList = [
  { id:"all", name:"All Products", icon: Icon.AllGrid, count: menuItems.length },
  ...categories.map(cat => ({
    id:    cat.slugurl,
    name:  cat.name,
    icon:  Icon.Box,
    count: menuItems.filter(item => getId(item.categoryId) === getId(cat)).length,
  }))
].filter(c => c.id === "all" || c.count > 0);

const products = menuItems.map(item => {
  const restaurant  = restaurantByRestId.get(item.RESTID);
  const category    = categoryById.get(getId(item.categoryId));
  const hasDiscount = Number(item.discount_price) > 0 && Number(item.discount_price) < Number(item.price);
  return {
    id:                          getId(item),
    name:                        item.name,
    desc:                        item.description || "",
    price:                       hasDiscount ? item.discount_price : item.price,
    originalPrice:               hasDiscount ? item.price : null,
    discount_price:              item.discount_price,
    img:                         item.image,
    isAvailable:                 item.isAvailable,
    isVeg:                       item.isVeg,
    recommended:                 item.recommended || false,
    trending:                    item.trending    || false,
    rating:                      item.rating      || 5,
    reviewCount:                 item.reviewCount || item.stock || 0,
    estimateTimePrepareMenuItem: item.estimateTimePrepareMenuItem || 25,
    category:                    category?.slugurl || "fast-food",
    categoryName:                category?.name   || "Fast Food",
    restaurantName:              restaurant?.name,
    restaurantCity:              restaurant?.address?.city,
    stock:                       item.stock || 0,
    badge:                       item.trending ? "Trending" : item.recommended ? "Recommended" : item.isVeg ? "Veg" : null,
    badgeType:                   item.trending ? "hot"      : item.recommended ? "bestseller"  : item.isVeg ? "new" : null,
  };
});

const maxProductPrice  = Math.max(200, ...products.map(p => Number(p.price) || 0));
const featuredProduct  = products.find(p => p.trending) || products.find(p => p.recommended) || products[0];
const activeRestaurant = restaurants[0] || {};

// ── Veg / Non-veg mark ────────────────────────────────────────────────────────
function FoodMark({ isVeg, size = 14 }) {
  const color = isVeg ? "#10b981" : "#e11d48";
  return (
    <span className={`inline-flex items-center justify-center flex-shrink-0 rounded-sm border-2`}
      style={{ width: size, height: size, borderColor: color }}>
      {isVeg
        ? <span className="rounded-full" style={{ width: size * 0.5, height: size * 0.5, background: color }} />
        : <span className="block" style={{ width:0, height:0, borderLeft:`${size*0.3}px solid transparent`, borderRight:`${size*0.3}px solid transparent`, borderBottom:`${size*0.53}px solid ${color}` }} />
      }
    </span>
  );
}

// ── Product Detail Bottom Sheet ───────────────────────────────────────────────
function ProductBottomSheet({ item, onClose }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;

  const origPrice = Number(item.originalPrice) || Number(item.price);
  const price     = Number(item.price) || 0;
  const save      = Math.max(0, origPrice - price);
  const discount  = save > 0 ? Math.round((save / origPrice) * 100) : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/55 animate-[fadeIn_0.22s_ease]"
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-2xl max-h-[88vh] overflow-y-auto animate-[slideUp_0.3s_cubic-bezier(0.32,0.72,0,1)]">
        {/* Hero image with X button */}
        <div className="relative h-[220px] bg-black overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover block"
          />
          {/* dark top gradient for X button visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute left-3 top-3 bg-orange-600 text-white rounded-md py-1.5 px-2 text-[11px] font-black leading-none">
              {discount}% OFF
            </span>
          )}
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border-none text-white text-lg leading-none flex items-center justify-center cursor-pointer"
          >✕</button>
        </div>

        {/* Content */}
        <div className="p-[18px_16px_32px]">

          {/* Name row + Add button */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-start gap-2 flex-1">
              <span className="mt-0.5"><FoodMark isVeg={item.isVeg} size={15} /></span>
              <h2 className="text-lg font-extrabold text-[#1a1a1a] leading-tight">
                {item.name}
              </h2>
            </div>

            {/* Add / Qty controls */}
            {qty === 1 && (
              <button
                onClick={() => setQty(1)}
                className="flex-shrink-0 h-9 min-w-[72px] rounded-lg border-[1.5px] border-[#15966a] bg-white text-[#15966a] text-sm font-extrabold cursor-pointer font-inherit"
              >
                Add
              </button>
            )}
            {qty > 1 && (
              <div className="flex items-center gap-0 border-[1.5px] border-[#15966a] rounded-lg overflow-hidden flex-shrink-0">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-9 border-none bg-white text-[#15966a] text-xl cursor-pointer font-inherit">−</button>
                <span className="w-7 text-center text-sm font-extrabold text-[#1a1a1a]">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-8 h-9 border-none bg-white text-[#15966a] text-xl cursor-pointer font-inherit">+</button>
              </div>
            )}
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-1.5 mb-1">
            <strong className="text-[17px] font-black text-black">₹{price}</strong>
            {save > 0 && <s className="text-[13px] text-gray-400 font-semibold">₹{origPrice}</s>}
            {save > 0 && (
              <span className="text-[11px] font-extrabold text-white bg-[#15966a] rounded-md py-0.5 px-1.5">SAVE</span>
            )}
          </div>

          {/* Stock */}
          {item.stock > 0 && (
            <div className="text-xs text-red-500 font-bold mb-1">
              Only {item.stock} left
            </div>
          )}

          {/* Customisable tag */}
          <div className="text-xs text-gray-400 mb-3.5">Customisable</div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-3.5" />

          {/* Description */}
          {item.desc ? (
            <p className="text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
          ) : (
            <p className="text-[13px] text-gray-300 leading-relaxed">
              A delicious dish prepared fresh with quality ingredients.
            </p>
          )}

        </div>
      </div>
    </>
  );
}

// ── Mobile dish card ──────────────────────────────────────────────────────────
function MobileDishCard({ item, onOpen }) {
  const origPrice = Number(item.originalPrice) || Number(item.price);
  const price     = Number(item.price) || 0;
  const save      = Math.max(0, origPrice - price);
  const discount  = save > 0 ? Math.round((save / origPrice) * 100) : 0;

  return (
    <article className="min-w-0 cursor-pointer" onClick={() => onOpen(item)}>
      {/* Image */}
      <div className="relative aspect-[1/0.88] rounded-lg overflow-hidden bg-gray-100 mb-2">
        <img src={item.img} alt={item.name}
          className="w-full h-full object-cover block" />
        {discount > 0 && (
          <span className="absolute left-1.5 top-1.5 bg-orange-600 text-white rounded-md py-1 px-1.5 text-[10px] font-black leading-none z-[2]">{discount}% OFF</span>
        )}
        <button
          aria-label={`Add ${item.name}`}
          onClick={e => { e.stopPropagation(); onOpen(item); }}
          className="absolute right-1.5 bottom-1.5 w-[30px] h-[30px] rounded-full bg-white border-none text-[#15966a] text-[22px] font-light flex items-center justify-center shadow-md cursor-pointer leading-none pb-[1px]"
        >+</button>
      </div>

      {/* Name */}
      <div className="flex items-start gap-1 mb-1.5">
        <span className="mt-0.5"><FoodMark isVeg={item.isVeg} size={13} /></span>
        <span className="text-[13px] font-extrabold text-[#1a1a1a] leading-tight line-clamp-2">{item.name}</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline flex-wrap gap-0.5">
        <strong className="text-sm font-black text-black leading-none">₹{price}</strong>
        {save > 0 && <s className="text-[11px] text-gray-400 font-bold">₹{origPrice}</s>}
        {save > 0 && <span className="text-[11px] text-[#15966a] font-extrabold">Save ₹{save}</span>}
      </div>
    </article>
  );
}

// ── Mobile collapsible section ────────────────────────────────────────────────
function MobileSection({ title, items, onOpen }) {
  const [open, setOpen] = useState(true)
  if (!items.length) return null;
  return (
    <div className={`border-b border-gray-100 ${open ? 'pb-5' : 'pb-0'} mb-5`}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full bg-transparent border-none p-0 pb-4 flex items-center justify-between cursor-pointer text-left"
      >
        <span className="text-xl font-black text-[#1a1a1a]">
          {title} ({items.length})
        </span>
        <span className={`text-lg font-black text-[#444] inline-block transition-transform duration-250 select-none leading-none ${open ? 'rotate-0' : 'rotate-180'}`}>∧</span>
      </button>
      {open && (
        <div className="grid grid-cols-3 gap-[14px_10px]">
          {items.map(item => <MobileDishCard key={item.id} item={item} onOpen={onOpen} />)}
        </div>
      )}
    </div>
  );
}

// ── Desktop sidebar card ──────────────────────────────────────────────────────
function SbCard({ title, icon, children, style = {} }) {
  return (
    <div className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm" style={style}>
      <div className="bg-[#1a1a1a] py-3.5 px-5 flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-lg bg-orange-600/15 border border-orange-600/25 flex items-center justify-center text-[#ff581b]">{icon}</div>
        <span className="text-[13px] font-extrabold text-white">{title}</span>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function RestrovaShop() {
  const [selCat,      setSelCat]      = useState("all");
  const [price,       setPrice]       = useState(maxProductPrice);
  const [search,      setSearch]      = useState("");
  const [sort,        setSort]        = useState("featured");
  const [view,        setView]        = useState("grid");
  const [selRating,   setSelRating]   = useState(null);
  const [foodType,    setFoodType]    = useState("all");
  const [activeItem,  setActiveItem]  = useState(null);   // bottom sheet

  const filtered = products
    .filter(p => selCat === "all" || p.category === selCat)
    .filter(p => foodType === "all" || (foodType === "veg" ? p.isVeg : !p.isVeg))
    .filter(p => p.price <= price)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
    .filter(p => {
      if (!selRating) return true;
      if (selRating === 5) return p.rating >= 4.9;
      if (selRating === 4) return p.rating >= 4;
      return p.rating >= 3;
    })
    .sort((a, b) => {
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating")     return b.rating - a.rating;
      return 0;
    });

  const recommendedItems = filtered.filter(p => p.recommended);
  const trendingItems    = filtered.filter(p => p.trending);
  const otherItems       = filtered.filter(p => !p.recommended && !p.trending);
  const mobileHeroImage  = featuredProduct?.img || products[0]?.img;

  const chipStyle = (active) => ({
    height:"40px", borderRadius:"999px",
    border:`1.5px solid ${active ? "#ccc" : "#ddd"}`,
    background: active ? "#f5f5f7" : "#fff",
    padding:"0 16px", fontSize:"13px", fontWeight:700, color:"#222",
    display:"flex", alignItems:"center", gap:"8px",
    cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, fontFamily:"inherit",
  });

  return (
    <div className="font-['-apple-system',BlinkMacSystemFont,'Segoe_UI',sans-serif] text-gray-500 bg-gray-50 min-h-screen">
      <style>{`
        @keyframes slideUp{
          from{transform:translateY(100%)}
          to{transform:translateY(0)}
        }
        @keyframes fadeIn{
          from{opacity:0}
          to{opacity:1}
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* ── Bottom Sheet (mobile product detail) ─────────────────────────── */}
      {activeItem && (
        <ProductBottomSheet item={activeItem} onClose={() => setActiveItem(null)} />
      )}

      {/* ══════════════════════════ MOBILE VIEW ══════════════════════════ */}
      <div className="mobile-shop block md:hidden bg-white min-h-screen text-[#222] pb-10">

        {/* Hero */}
        <div className="relative h-[240px] bg-black overflow-hidden">
          <img src={mobileHeroImage} alt={activeRestaurant.name || "Restaurant"}
            className="w-full h-full object-cover block" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/5" />
          <button aria-label="Back" className="absolute top-5 left-4 w-[38px] h-[38px] rounded-full bg-black/42 border-none text-white flex items-center justify-center cursor-pointer z-[3]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button aria-label="Share" className="absolute top-5 right-4 w-[38px] h-[38px] rounded-full bg-black/42 border-none text-white flex items-center justify-center cursor-pointer z-[3]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2"/></svg>
          </button>
        </div>

        {/* White sheet */}
        <div className="relative z-[2] -mt-5 bg-white rounded-t-2xl pt-5 px-4 pb-0">
          <h1 className="text-[26px] font-extrabold text-[#1a1a1a] leading-tight mb-1.5">
            {activeRestaurant.name || "Habibo Restaurant"}
          </h1>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium mb-1.5">
            <span className="text-[#15966a] text-base">★</span>
            <span>4.0 • 25-30 mins • Food</span>
          </div>
          <div className="text-sm font-bold text-[#d71920] mb-3.5">Fresh picks for you</div>

          {/* Search */}
          <label className="h-[46px] bg-[#f1f1f3] rounded-full flex items-center gap-2.5 px-[18px] mb-4 cursor-text">
            <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" className="w-[18px] h-[18px] flex-shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Search for dishes" value={search} onChange={e => setSearch(e.target.value)}
              className="border-0 outline-none bg-transparent text-[15px] text-[#333] w-full" />
          </label>

          {/* Filter chips */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-0.5">
            <button onClick={() => setFoodType(foodType === "veg" ? "all" : "veg")} aria-pressed={foodType === "veg"} style={chipStyle(foodType === "veg")}>
              <FoodMark isVeg={true} size={14} />
              <span className="inline-block w-[38px] h-2.5 rounded-full bg-gray-300" />
            </button>
            <button onClick={() => setFoodType(foodType === "nonveg" ? "all" : "nonveg")} aria-pressed={foodType === "nonveg"} style={chipStyle(foodType === "nonveg")}>
              <FoodMark isVeg={false} size={14} />
              <span className="inline-block w-[38px] h-2.5 rounded-full bg-gray-300" />
            </button>
            <button onClick={() => setSort(sort === "rating" ? "featured" : "rating")} style={chipStyle(sort === "rating")}>Popularity</button>
          </div>

 

          {/* Sections */}
          <MobileSection title="Trending"    items={trendingItems.length    ? trendingItems    : filtered.slice(0, 6)} onOpen={setActiveItem} />
          <MobileSection title="Recommended" items={recommendedItems.length ? recommendedItems : otherItems.slice(0, 6)} onOpen={setActiveItem} />
          {otherItems.length > 0 && <MobileSection title="All Items" items={otherItems} onOpen={setActiveItem} />}
        </div>
      </div>

      {/* ══════════════════════════ DESKTOP VIEW ══════════════════════════ */}
      <section className="desktop-shop hidden md:block py-10">
        <div className="max-w-[1480px] mx-auto px-6">
          <div className="shop-layout grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

            {/* Sidebar */}
            <aside>
              <SbCard title="Categories" icon={<Icon.AllGrid/>}>
                {categoryList.map(c => (
                  <button key={c.id} onClick={() => setSelCat(c.id)}
                    className={`w-full flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg ${selCat===c.id ? 'bg-[#ff581b] text-white' : 'bg-transparent text-gray-500'} font-semibold text-sm cursor-pointer text-left transition-all duration-200`}
                    onMouseEnter={e => { if(selCat!==c.id){ e.currentTarget.style.background="rgba(255,88,27,0.06)"; e.currentTarget.style.color="#ff581b"; }}}
                    onMouseLeave={e => { if(selCat!==c.id){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#6b7280"; }}}>
                    <span className={selCat===c.id ? "text-white/80" : "text-[#ff581b]"}><c.icon/></span>
                    {c.name}
                    <span className={`ml-auto text-[11px] font-extrabold py-0.5 px-2 rounded-full ${selCat===c.id ? "bg-gray-800 text-white" : "bg-black/5 text-gray-500"}`}>{c.count}</span>
                  </button>
                ))}
              </SbCard>

              <SbCard title="Price Range" icon={<RupeeIcon/>} style={{ marginTop:"16px" }}>
                <div className="py-1 pb-2">
                  <div className="flex justify-between text-xs font-bold text-[#1a1a1a] mb-3">
                    <span><RupeeIcon/>0</span>
                    <span>Up to <span className="text-[#ff581b]"><RupeeIcon/>{price}</span></span>
                  </div>
                  <input type="range" min="10" max={maxProductPrice} value={price} onChange={e => setPrice(+e.target.value)}
                    className="w-full h-1 rounded-sm appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #ff581b ${(price-10)/(maxProductPrice-10)*100}%, rgba(0,0,0,0.1) ${(price-10)/(maxProductPrice-10)*100}%)` }} />
                </div>
              </SbCard>

              <SbCard title="Rating" icon={<Icon.Star/>} style={{ marginTop:"16px" }}>
                {[5,4,3].map(r => {
                  const count = products.filter(p => r===5 ? p.rating>=4.9 : p.rating>=r).length;
                  return (
                    <div key={r} onClick={() => setSelRating(selRating===r ? null : r)}
                      className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${selRating===r ? 'bg-orange-600/5' : 'bg-transparent'}`}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(255,88,27,0.06)"}
                      onMouseLeave={e => e.currentTarget.style.background=selRating===r ? "rgba(255,88,27,0.06)" : "transparent"}>
                      <Stars rating={r}/>
                      <span className="text-[13px] font-semibold text-gray-500 flex-1">{r}+ Stars</span>
                      <span className="text-[11px] text-gray-400">({count})</span>
                      <div className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-200 ${selRating===r ? 'border-[#ff581b] bg-[#ff581b]' : 'border-black/20 bg-transparent'}`}>
                        {selRating===r && <Icon.Check/>}
                      </div>
                    </div>
                  );
                })}
              </SbCard>

              <SbCard title="Food Type" icon={<Icon.Leaf/>} style={{ marginTop:"16px" }}>
                {[
                  { id:"all",    name:"All",     count:products.length,                       color:"#ff581b" },
                  { id:"veg",    name:"Veg",     count:products.filter(p=>p.isVeg).length,    color:"#16a34a" },
                  { id:"nonveg", name:"Non Veg", count:products.filter(p=>!p.isVeg).length,   color:"#dc2626" },
                ].map(type => (
                  <button key={type.id} onClick={() => setFoodType(type.id)}
                    className={`w-full flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg font-semibold text-sm cursor-pointer text-left transition-all duration-200 ${foodType===type.id ? `text-white` : 'bg-transparent text-gray-500'}`}
                    style={{ background: foodType===type.id ? type.color : 'transparent' }}
                    onMouseEnter={e => { if(foodType!==type.id){ e.currentTarget.style.background="rgba(255,88,27,0.06)"; e.currentTarget.style.color=type.color; }}}
                    onMouseLeave={e => { if(foodType!==type.id){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#6b7280"; }}}>
                    <span className="w-[18px] h-[18px] rounded-[5px] border-2 inline-flex items-center justify-center bg-white"
                      style={{ borderColor: foodType===type.id ? "#fff" : type.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: type.color }} />
                    </span>
                    {type.name}
                    <span className={`ml-auto text-[11px] font-extrabold py-0.5 px-2 rounded-full ${foodType===type.id ? "bg-white/25 text-white" : "bg-black/5 text-gray-500"}`}>{type.count}</span>
                  </button>
                ))}
              </SbCard>
            </aside>

            {/* Main */}
            <div>
              <FeaturedBanner featured={featuredProduct}/>
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex-1 min-w-[200px] relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Icon.Search/></span>
                  <input type="text" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full py-2.5 px-4 pl-10 border border-black/10 rounded-full text-[13px] text-[#1a1a1a] outline-none bg-white transition-colors duration-200 focus:border-[#ff581b] focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]" />
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="py-2.5 pl-4 pr-9 border border-black/10 rounded-full text-[13px] font-semibold text-[#1a1a1a] outline-none bg-white appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff581b' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "14px" }}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div className="text-[13px] font-semibold text-gray-500 whitespace-nowrap">
                  <strong className="text-[#ff581b] font-serif text-base">{filtered.length}</strong> products
                </div>
                <div className="flex gap-1.5">
                  {[{ m:"grid", I:Icon.Grid },{ m:"list", I:Icon.List }].map(({ m, I }) => (
                    <button key={m} onClick={() => setView(m)}
                      className={`w-[38px] h-[38px] rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 ${view===m ? 'border-none bg-[#ff581b] text-white' : 'border-black/10 bg-white text-gray-500'}`}>
                      <I/>
                    </button>
                  ))}
                </div>
              </div>
              <div className={`grid gap-5 ${view==="list" ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'}`}>
                {filtered.map(p => <ProductCard key={p.id} item={p} viewMode={view}/>)}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}