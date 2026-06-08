"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { formatTime } from "./constants";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
// Replace these with your real API calls (same shape as your RN app's Redux state)

const BANNERS = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=900",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=900",
];

const DUMMY_DESTINATIONS = [
  { id: "dest-1", name: "Hyderabad Central", loc: "Hyderabad, Telangana", routes: 4 },
  { id: "dest-2", name: "Vijayawada Bus Stand", loc: "Vijayawada, Andhra Pradesh", routes: 3 },
  { id: "dest-3", name: "Guntur City", loc: "Guntur, Andhra Pradesh", routes: 2 },
  { id: "dest-4", name: "Nellore Junction", loc: "Nellore, Andhra Pradesh", routes: 2 },
  { id: "dest-5", name: "Ongole Town", loc: "Ongole, Andhra Pradesh", routes: 1 },
];

const DUMMY_ROUTES = [
  {
    id: "R1",
    name: "Express Highway Route",
    origin: "Hyderabad, Telangana",
    destination: "Vijayawada, AP",
    distanceKm: 274,
    durationMinutes: 270,
    stops: 6,
    deliveryPointCount: 8,
  },
  {
    id: "R2",
    name: "NH-65 Direct Route",
    origin: "Hyderabad, Telangana",
    destination: "Vijayawada, AP",
    distanceKm: 290,
    durationMinutes: 310,
    stops: 4,
    deliveryPointCount: 5,
  },
  {
    id: "R3",
    name: "Coastal Highway Route",
    origin: "Hyderabad, Telangana",
    destination: "Vijayawada, AP",
    distanceKm: 310,
    durationMinutes: 345,
    stops: 9,
    deliveryPointCount: 12,
  },
];

const DUMMY_DELIVERY_POINTS = [
  { id: "D1", name: "Krishna Shopping Complex", area: "MG Road", city: "Vijayawada", state: "Andhra Pradesh" },
  { id: "D2", name: "Benz Circle Pick-up Hub", area: "Benz Circle", city: "Vijayawada", state: "Andhra Pradesh" },
  { id: "D3", name: "One Town Delivery Point", area: "One Town", city: "Vijayawada", state: "Andhra Pradesh" },
  { id: "D4", name: "Gandhi Nagar Collection Center", area: "Gandhi Nagar", city: "Vijayawada", state: "Andhra Pradesh" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const STEPS = ["Select Towards", "Select Route", "Select Delivery Point", "Complete Details"];

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}


// ─── Sub-components ────────────────────────────────────────────────────────────

/** Left stepper sidebar */
function StepSidebar({ currentStep }) {
  // Each step row is ~48px tall (py-3 = 12px*2 + content ~24px)
  const lineHeight = (currentStep - 1) * 48;

  return (
    <div className="w-56 flex-shrink-0 border-r border-gray-100 p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Process</h2>
      <p className="text-sm text-gray-400 mb-6">Complete all steps to finish</p>

      {/* Stepper track */}
      <div className="relative flex flex-col">
        {/* Background line */}
        <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-gray-100" />
        {/* Active fill line */}
        <div
          className="absolute left-[13px] top-0 w-[2px] bg-[#ff581b] transition-all duration-300 ease-in-out"
          style={{ height: lineHeight }}
        />

        {STEPS.map((label, index) => {
          const n = index + 1;
          const isDone = currentStep > n;
          const isActive = currentStep === n;
          return (
            <div key={n} className="flex items-center gap-3 relative z-10 py-3">
              {/* Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all duration-200
                  ${isDone || isActive
                    ? "bg-[#ff581b] text-white shadow-sm shadow-orange-200"
                    : "bg-gray-100 text-gray-400 border border-gray-200"
                  }
                  ${isActive ? "ring-2 ring-orange-200" : ""}
                `}
              >
                {isDone ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : n}
              </div>
              {/* Label */}
              <span
                className={`text-sm transition-colors duration-200
                  ${isDone || isActive ? "text-[#ff581b] font-medium" : "text-gray-400"}
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Step 1 — Select Towards (mirrors SelectRouteDelivery.jsx) */
function Step1SelectTowards({ selDest, onSelectDest }) {
  const [query, setQuery] = useState("");
  const [bannerIdx, setBannerIdx] = useState(0);
  const bannerRef = useRef(null);

  // Auto-advance banner every 3s
  useEffect(() => {
    const t = setInterval(() => {
      setBannerIdx((i) => (i + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const filtered = query.length >= 1
    ? DUMMY_DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.loc.toLowerCase().includes(query.toLowerCase())
      )
    : DUMMY_DESTINATIONS;

  const now = new Date();
  const minTime = new Date(now.getTime() + 60 * 60 * 1000);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Banner carousel */}
      <div className="relative w-full h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={BANNERS[bannerIdx]}
          alt="Banner"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {BANNERS.map((_, i) => (
            <div
              key={i}
              onClick={() => setBannerIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer
                ${i === bannerIdx ? "w-4 bg-[#ff581b]" : "w-1.5 bg-white/60"}
              `}
            />
          ))}
        </div>
      </div>

      {/* From location (static / mock GPS) */}
      <div className="flex items-start gap-2.5 border border-gray-200 rounded-xl px-3.5 py-3 bg-white">
        <svg className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 leading-tight">Hyderabad, Telangana</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">H.No 12-4, Ameerpet, Hyderabad – 500016</p>
        </div>
        {/* Refresh icon */}
        <svg className="w-4 h-4 text-[#ff581b] flex-shrink-0 cursor-pointer mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.07 9a8 8 0 0114.14 0M19.93 15A8 8 0 015.79 15"/>
        </svg>
      </div>

      {/* Destination search */}
      <div className="relative flex items-center gap-2.5 border border-gray-200 rounded-xl px-3.5 py-3 bg-white focus-within:border-[#ff581b] transition-colors">
        <svg className="w-4 h-4 text-[#ff581b] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter destination towards…"
          className="flex-1 text-sm font-semibold text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-gray-300 hover:text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions list */}
      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
            <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <p className="text-sm">No destinations found for &quot;{query}&quot;</p>
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
              {/* Radio */}
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${selDest?.id === d.id ? "border-[#ff581b]" : "border-gray-300"}
              `}>
                {selDest?.id === d.id && <div className="w-2 h-2 rounded-full bg-[#ff581b]" />}
              </div>
            </button>
          ))
        )}
      </div>

      {/* Date & Time pills */}
      <div className="flex gap-2 flex-shrink-0">
        {[
          {
            icon: (
              <svg className="w-4 h-4 text-[#ff581b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round"/>
                <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            ),
            label: "DATE",
            value: formatDate(now),
          },
          {
            icon: (
              <svg className="w-4 h-4 text-[#ff581b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path strokeLinecap="round" d="M12 6v6l4 2"/>
              </svg>
            ),
            label: "TIME",
            value: formatTime(minTime),
          },
        ].map((p) => (
          <div key={p.label} className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 flex-1 bg-white cursor-pointer hover:border-orange-200 transition-colors">
            {p.icon}
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wide">{p.label}</p>
              <p className="text-sm font-semibold text-gray-800">{p.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Step 2 — Select Route (mirrors SelectOnlyRoute.jsx) */
function Step2SelectRoute({ selDest, selRoute, onSelectRoute }) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">

    
      {/* Context pill */}
      {selDest && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-[#ff581b]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-700">{selDest.name}</span>
          <span className="text-xs text-gray-400">— {selDest.loc}</span>
        </div>
      )}

      <p className="text-[11px] font-bold text-[#ff581b] uppercase tracking-widest flex-shrink-0">
        {DUMMY_ROUTES.length} routes found
      </p>

      {/* Route cards */}
      <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-0.5">
        {DUMMY_ROUTES.map((r) => {
          const isSelected = selRoute?.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelectRoute(r)}
              className={`relative text-left rounded-xl border overflow-hidden p-3.5 transition-all duration-150 w-full
                ${isSelected
                  ? "border-[#ff581b] bg-white shadow-sm shadow-orange-100"
                  : "border-gray-200 bg-[#fffcfa] hover:border-orange-200"
                }
              `}
            >
              {/* Orange left bar when selected */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff581b] rounded-l-xl" />
              )}

              {/* Header row */}
              <div className="flex items-start gap-2.5 mb-2.5 pl-1">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#ff581b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gray-800">{r.name}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                      ${r.deliveryPointCount > 0 ? "bg-orange-50 text-[#ff581b]" : "bg-gray-100 text-gray-400"}
                    `}>
                      {r.deliveryPointCount > 0 ? `${r.deliveryPointCount} pickups` : "No pickups"}
                    </span>
                  </div>
                </div>
                {/* Radio */}
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                  ${isSelected ? "border-[#ff581b]" : "border-gray-300"}
                `}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#ff581b]" />}
                </div>
              </div>

              {/* Meta stats row */}
              <div className="flex items-center gap-0 bg-orange-50/60 rounded-lg px-3 py-2 mb-2.5 pl-3.5">
                {[
                  { label: `${r.distanceKm} km`, icon: "↔" },
                  { label: formatDuration(r.durationMinutes), icon: "⏱" },
                  { label: `${r.stops} stops`, icon: "📍" },
                ].map((stat, i, arr) => (
                  <div key={stat.label} className="flex items-center flex-1">
                    <span className="text-[11px] font-semibold text-[#6b6058]">{stat.icon} {stat.label}</span>
                    {i < arr.length - 1 && <div className="w-px h-3 bg-orange-200 mx-2" />}
                  </div>
                ))}
              </div>

              {/* Origin → Destination */}
              <div className="flex items-center gap-2 pl-1">
                <svg className="w-3 h-3 text-[#ff581b] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
                <span className="text-xs font-medium text-gray-500 truncate">{r.origin}</span>
                <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                <svg className="w-3 h-3 text-[#ff581b] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                </svg>
                <span className="text-xs font-medium text-gray-500 truncate">{r.destination}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Step 3 — Select Delivery Point (mirrors SelectDeliveryPoint.jsx) */
function Step3SelectDeliveryPoint({ selRoute, selDP, onSelectDP }) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      {/* Route context pill */}
      {selRoute && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-[#ff581b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
          <span className="text-sm font-semibold text-gray-700">{selRoute.name}</span>
          <span className="text-xs text-gray-400">• {selRoute.distanceKm} km • {formatDuration(selRoute.durationMinutes)}</span>
        </div>
      )}

      <p className="text-[11px] font-bold text-[#ff581b] uppercase tracking-widest flex-shrink-0">
        {DUMMY_DELIVERY_POINTS.length} points available
      </p>

      {/* Delivery point cards */}
      <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-0.5">
        {DUMMY_DELIVERY_POINTS.map((p) => {
          const isSelected = selDP?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectDP(p)}
              className={`relative flex items-start gap-3 text-left rounded-xl border px-3.5 py-3 overflow-hidden transition-all duration-150 w-full
                ${isSelected
                  ? "border-[#ff581b] bg-white shadow-sm shadow-orange-100"
                  : "border-gray-200 bg-[#fffcfa] hover:border-orange-200"
                }
              `}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff581b] rounded-l-xl" />
              )}
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#ff581b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.area}, {p.city} – {p.state}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                ${isSelected ? "border-[#ff581b]" : "border-gray-300"}
              `}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-[#ff581b]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Step 4 — Complete Details */
function Step4CompleteDetails({ selDest, selRoute, selDP, details, onDetailsChange }) {
  const fields = [
    { key: "name", label: "Full Name", placeholder: "Enter your full name", col: "full" },
    { key: "phone", label: "Phone Number", placeholder: "+91 XXXXX XXXXX", col: "half" },
    { key: "email", label: "Email Address", placeholder: "you@email.com", col: "half" },
    { key: "address", label: "Street Address", placeholder: "House no., Street, Landmark", col: "full" },
    { key: "city", label: "City", placeholder: "City", col: "half" },
    { key: "pincode", label: "Pincode", placeholder: "500001", col: "half" },
  ];

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Booking summary */}
      <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-3.5 flex flex-col gap-2.5 flex-shrink-0">
        {[
          { icon: "📍", label: "Towards", value: selDest?.name },
          { icon: "🗺", label: "Route", value: selRoute?.name },
          { icon: "🏪", label: "Delivery Point", value: selDP?.name },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-2.5">
            <span className="text-sm w-4">{r.icon}</span>
            <span className="text-xs text-gray-400 w-24 flex-shrink-0">{r.label}</span>
            <span className="text-sm font-semibold text-gray-800 truncate">{r.value || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Modal Component ──────────────────────────────────────────────────────

/**
 * DeliverySelectionModal
 *
 * Props:
 *   isOpen   {boolean}   – whether the modal is visible
 *   onClose  {function}  – called when user closes/finishes
 *   onFinish {function}  – called with final booking data on "Finish"
 */
export default function DeliverySelectionModal({ isOpen, onClose, onFinish }) {
  const [step, setStep] = useState(1);
  const [selDest, setSelDest] = useState(null);
  const [selRoute, setSelRoute] = useState(null);
  const [selDP, setSelDP] = useState(null);
  const [details, setDetails] = useState({
    name: "", phone: "", email: "", address: "", city: "", pincode: "",
  });

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelDest(null);
      setSelRoute(null);
      setSelDP(null);
      setDetails({ name: "", phone: "", email: "", address: "", city: "", pincode: "" });
    }
  }, [isOpen]);

  const canNext = useCallback(() => {
    if (step === 1) return !!selDest;
    if (step === 2) return !!selRoute;
    if (step === 3) return !!selDP;
    return true; // step 4 — allow finish even without all details filled
  }, [step, selDest, selRoute, selDP]);

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      // Emit final booking payload — same shape your RN Redux generateBookingSummary would produce
      onFinish?.({
        towards: selDest,
        route: selRoute,
        deliveryPoint: selDP,
        details,
      });
      onClose?.();
    }
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handleDetailsChange = (key, value) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      {/* Modal shell */}
      <div className="bg-white w-full max-w-[860px] rounded-2xl shadow-2xl shadow-black/10 flex overflow-hidden"
        style={{ maxHeight: "calc(100vh - 2rem)", minHeight: 560 }}
      >
        {/* ── Left sidebar ── */}
        <StepSidebar currentStep={step} />

        {/* ── Right content pane ── */}
        <div className="flex-1 flex flex-col p-6 min-w-0 overflow-hidden">
          {/* Close button */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-base font-semibold text-gray-900">{STEPS[step - 1]}</h3>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Step content — flex-1 + overflow-hidden to contain inner scroll */}
          <div className="flex-1 overflow-hidden">
            {step === 1 && (
              <Step1SelectTowards
                selDest={selDest}
                onSelectDest={setSelDest}
              />
            )}
            {step === 2 && (
              <Step2SelectRoute
                selDest={selDest}
                selRoute={selRoute}
                onSelectRoute={setSelRoute}
              />
            )}
            {step === 3 && (
              <Step3SelectDeliveryPoint
                selRoute={selRoute}
                selDP={selDP}
                onSelectDP={setSelDP}
              />
            )}
            {step === 4 && (
              <Step4CompleteDetails
                selDest={selDest}
                selRoute={selRoute}
                selDP={selDP}
                details={details}
                onDetailsChange={handleDetailsChange}
              />
            )}
          </div>

          {/* ── Bottom nav bar ── */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4 flex-shrink-0">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center gap-3">
              {/* Step progress dots */}
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300
                      ${i + 1 === step ? "w-4 bg-[#ff581b]" : i + 1 < step ? "w-1.5 bg-[#ff581b] opacity-40" : "w-1.5 bg-gray-200"}
                    `}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!canNext()}
                className={`px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-150
                  ${canNext()
                    ? "bg-[#ff581b] hover:bg-[#e04d16] active:scale-95"
                    : "bg-orange-200 cursor-not-allowed"
                  }
                `}
              >
                {step === 4 ? "Finish ✓" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
