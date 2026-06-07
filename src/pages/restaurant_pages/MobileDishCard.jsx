// components/MobileDishCard.jsx
import { FoodMark } from "./FoodMark";

export function MobileDishCard({ item, onOpen }) {
  const origPrice = Number(item.originalPrice) || Number(item.price);
  const price = Number(item.price) || 0;
  const save = Math.max(0, origPrice - price);
  const discount = save > 0 ? Math.round((save / origPrice) * 100) : 0;

  return (
    <article className="min-w-0 cursor-pointer" onClick={() => onOpen(item)}>
      <div className="relative aspect-[1/0.88] rounded-lg overflow-hidden bg-gray-100 mb-2">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover block" />
        
        {discount > 0 && (
          <span className="absolute left-1.5 top-1.5 bg-orange-600 text-white rounded-md py-1 px-1.5 text-[10px] font-black leading-none z-[2]">
            {discount}% OFF
          </span>
        )}
        
        <button
          aria-label={`Add ${item.name}`}
          onClick={e => { e.stopPropagation(); onOpen(item); }}
          className="absolute right-1.5 bottom-1.5 w-[30px] h-[30px] rounded-full bg-white border-none text-[#15966a] text-[22px] font-light flex items-center justify-center shadow-md cursor-pointer leading-none pb-[1px]"
        >
          +
        </button>
      </div>

      <div className="flex items-start gap-1 mb-1.5">
        <span className="mt-0.5"><FoodMark isVeg={item.isVeg} size={13} /></span>
        <span className="text-[13px] font-extrabold text-[#1a1a1a] leading-tight line-clamp-2">
          {item.name}
        </span>
      </div>

      <div className="flex items-baseline flex-wrap gap-0.5">
        <strong className="text-sm font-black text-black leading-none">₹{price}</strong>
        {save > 0 && <s className="text-[11px] text-gray-400 font-bold">₹{origPrice}</s>}
        {save > 0 && <span className="text-[11px] text-[#15966a] font-extrabold">Save ₹{save}</span>}
      </div>
    </article>
  );
}