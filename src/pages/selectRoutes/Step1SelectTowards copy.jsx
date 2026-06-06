"use client";

import { useState } from "react";
import BannerCarousel from "./BannerCarousel";
import SearchInput from "./SearchInput";
import DateTimePill from "./DateTimePill";
import { BANNERS, DUMMY_DESTINATIONS } from "./constants";

export default function Step1SelectTowards({ selDest, onSelectDest }) {
  const [query, setQuery] = useState("");
  const now = new Date();

  const filtered = query.length >= 1
    ? DUMMY_DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.loc.toLowerCase().includes(query.toLowerCase())
      )
    : DUMMY_DESTINATIONS;

  return (
    <div className="flex flex-col gap-3 h-full">
      <BannerCarousel banners={BANNERS} />

      <div className="flex items-start gap-2.5 border border-gray-200 rounded-xl px-3.5 py-3 bg-white">
        <svg className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 leading-tight">Hyderabad, Telangana</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">H.No 12-4, Ameerpet, Hyderabad – 500016</p>
        </div>
        <svg className="w-4 h-4 text-[#ff581b] flex-shrink-0 cursor-pointer mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.07 9a8 8 0 0114.14 0M19.93 15A8 8 0 015.79 15"/>
        </svg>
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Enter destination towards…"
      />

      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
            <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <p className="text-sm">No destinations found for "{query}"</p>
          </div>
        ) : (
          filtered.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelectDest(d)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-150
                ${selDest?.id === d.id
                  ? "border-[#ff581b] bg-orange-50/60"
                  : "border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/30"
                }
              `}
            >
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#ff581b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{d.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{d.loc}</p>
              </div>
              <span className="text-xs text-[#ff581b] font-medium whitespace-nowrap">{d.routes} routes</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${selDest?.id === d.id ? "border-[#ff581b]" : "border-gray-300"}
              `}>
                {selDest?.id === d.id && <div className="w-2 h-2 rounded-full bg-[#ff581b]" />}
              </div>
            </button>
          ))
        )}
      </div>

      <DateTimePill date={now} />
    </div>
  );
}