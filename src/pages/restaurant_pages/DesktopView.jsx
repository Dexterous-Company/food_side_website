// components/DesktopView.jsx - FULL CORRECTED VERSION
import { Icon } from "./Icons";
import { SbCard } from "./SbCard";
import { RupeeIcon, Stars, FeaturedBanner, ProductCard } from "./Productcard";

export function DesktopView({ 
  categoryList,
  selCat,
  setSelCat,
  maxProductPrice,
  price,
  setPrice,
  selRating,
  setSelRating,
  foodType,
  setFoodType,
  products,
  filtered,
  search,
  setSearch,
  sort,
  setSort,
  view,
  setView,
  featuredProduct
}) {
  return (
    <section className="desktop-shop hidden md:block py-10">
      <div className="max-w-[1480px] mx-auto px-6">
        <div className="shop-layout grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          
          {/* Sidebar */}
          <aside>
            <SbCard title="Categories" icon={<Icon.AllGrid />}>
              {categoryList.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setSelCat(c.id)}
                  className={`w-full flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg ${
                    selCat === c.id ? 'bg-[#ff581b] text-white' : 'bg-transparent text-gray-500'
                  } font-semibold text-sm cursor-pointer text-left transition-all duration-200`}
                >
                  {/* FIXED: Changed from <c.icon /> to {c.icon()} */}
                  <span className={selCat === c.id ? "text-white/80" : "text-[#ff581b]"}>
                    {c.icon()}
                  </span>
                  {c.name}
                  <span className={`ml-auto text-[11px] font-extrabold py-0.5 px-2 rounded-full ${
                    selCat === c.id ? "bg-gray-800 text-white" : "bg-black/5 text-gray-500"
                  }`}>
                    {c.count}
                  </span>
                </button>
              ))}
            </SbCard>

            <SbCard title="Price Range" icon={<RupeeIcon />} style={{ marginTop: "16px" }}>
              <div className="py-1 pb-2">
                <div className="flex justify-between text-xs font-bold text-[#1a1a1a] mb-3">
                  <span><RupeeIcon />0</span>
                  <span>Up to <span className="text-[#ff581b]"><RupeeIcon />{price}</span></span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max={maxProductPrice} 
                  value={price} 
                  onChange={e => setPrice(+e.target.value)}
                  className="w-full h-1 rounded-sm appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, #ff581b ${(price - 10) / (maxProductPrice - 10) * 100}%, rgba(0,0,0,0.1) ${(price - 10) / (maxProductPrice - 10) * 100}%)` 
                  }} 
                />
              </div>
            </SbCard>

            <SbCard title="Rating" icon={<Icon.Star />} style={{ marginTop: "16px" }}>
              {[5, 4, 3].map(r => {
                const count = products.filter(p => r === 5 ? p.rating >= 4.9 : p.rating >= r).length;
                return (
                  <div 
                    key={r} 
                    onClick={() => setSelRating(selRating === r ? null : r)}
                    className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selRating === r ? 'bg-orange-600/5' : 'bg-transparent'
                    }`}
                  >
                    <Stars rating={r} />
                    <span className="text-[13px] font-semibold text-gray-500 flex-1">{r}+ Stars</span>
                    <span className="text-[11px] text-gray-400">({count})</span>
                    <div className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-200 ${
                      selRating === r ? 'border-[#ff581b] bg-[#ff581b]' : 'border-black/20 bg-transparent'
                    }`}>
                      {selRating === r && <Icon.Check />}
                    </div>
                  </div>
                );
              })}
            </SbCard>

            <SbCard title="Food Type" icon={<Icon.Leaf />} style={{ marginTop: "16px" }}>
              {[
                { id: "all", name: "All", count: products.length, color: "#ff581b" },
                { id: "veg", name: "Veg", count: products.filter(p => p.isVeg).length, color: "#16a34a" },
                { id: "nonveg", name: "Non Veg", count: products.filter(p => !p.isVeg).length, color: "#dc2626" },
              ].map(type => (
                <button 
                  key={type.id} 
                  onClick={() => setFoodType(type.id)}
                  className={`w-full flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg font-semibold text-sm cursor-pointer text-left transition-all duration-200 ${
                    foodType === type.id ? `text-white` : 'bg-transparent text-gray-500'
                  }`}
                  style={{ background: foodType === type.id ? type.color : 'transparent' }}
                >
                  <span className="w-[18px] h-[18px] rounded-[5px] border-2 inline-flex items-center justify-center bg-white"
                    style={{ borderColor: foodType === type.id ? "#fff" : type.color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: type.color }} />
                  </span>
                  {type.name}
                  <span className={`ml-auto text-[11px] font-extrabold py-0.5 px-2 rounded-full ${
                    foodType === type.id ? "bg-white/25 text-white" : "bg-black/5 text-gray-500"
                  }`}>
                    {type.count}
                  </span>
                </button>
              ))}
            </SbCard>
          </aside>

          {/* Main Content */}
          <div>
            <FeaturedBanner featured={featuredProduct} />
            
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon.Search />
                </span>
                <input 
                  type="text" 
                  placeholder="Search products…" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)}
                  className="w-full py-2.5 px-4 pl-10 border border-black/10 rounded-full text-[13px] text-[#1a1a1a] outline-none bg-white transition-colors duration-200 focus:border-[#ff581b] focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]" 
                />
              </div>
              
              <select 
                value={sort} 
                onChange={e => setSort(e.target.value)}
                className="py-2.5 pl-4 pr-9 border border-black/10 rounded-full text-[13px] font-semibold text-[#1a1a1a] outline-none bg-white appearance-none"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff581b' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "14px"
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
              
              <div className="text-[13px] font-semibold text-gray-500 whitespace-nowrap">
                <strong className="text-[#ff581b] font-serif text-base">{filtered.length}</strong> products
              </div>
              
              <div className="flex gap-1.5">
                {[
                  { m: "grid", I: Icon.Grid },
                  { m: "list", I: Icon.List }
                ].map(({ m, I }) => (
                  <button 
                    key={m} 
                    onClick={() => setView(m)}
                    className={`w-[38px] h-[38px] rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      view === m ? 'border-none bg-[#ff581b] text-white' : 'border-black/10 bg-white text-gray-500'
                    }`}
                  >
                    <I />
                  </button>
                ))}
              </div>
            </div>
            
            <div className={`grid gap-5 ${
              view === "list" 
                ? 'grid-cols-1' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
            }`}>
              {filtered.map(p => <ProductCard key={p.id} item={p} viewMode={view} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}