"use client";

import { formatDuration } from "./constants";

const getPointKey = point => point?._id || point?.id || "";

export default function Step3SelectDeliveryPoint({
  selRoute,
  selDP,
  onSelectDP,
  deliveryPoints = [],
  loading = false,
  error = "",
}) {
  const routeDistance = selRoute?.distanceKm || selRoute?.totalDistance || 0;
  const routeDuration = selRoute?.durationMinutes || selRoute?.totalTime || 0;

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div>
        <img
          src={"/car_food.png"}
          alt="Banner"
          className="w-full h-45 object-cover transition-opacity duration-500 border-rose-50 rounded-xl"
        />
      </div>
      {selRoute && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <svg
            className="w-3.5 h-3.5 text-[#ff581b]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span className="text-sm font-semibold text-gray-700">
            {selRoute.name || selRoute.routeId}
          </span>
          <span className="text-xs text-gray-400">
            - {routeDistance} km - {formatDuration(routeDuration)}
          </span>
        </div>
      )}

      <p className="text-[11px] font-bold text-[#ff581b] uppercase tracking-widest flex-shrink-0">
        {deliveryPoints.length} points available
      </p>

      <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-0.5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#ff581b] border-t-transparent" />
            <p className="text-sm">Loading delivery points...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 text-red-400 gap-2">
            <p className="text-sm">{error}</p>
          </div>
        ) : deliveryPoints.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
            <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/>
            </svg>
            <p className="text-sm">No delivery points available for this route</p>
          </div>
        ) : (
          deliveryPoints.map((p) => {
            const pointKey = getPointKey(p);
            const isSelected = getPointKey(selDP) === pointKey;
            const city = p.address?.city || p.address?.area || p.city || "";
            const state = p.address?.state || p.state || "";
            const area = p.address?.area || p.area || p.address?.fullAddress || "";

            return (
              <button
                key={pointKey}
                onClick={() => onSelectDP(p)}
                className={`relative flex items-start gap-3 text-left rounded-xl border px-3.5 py-3 overflow-hidden transition-all duration-150 w-full
                  ${
                    isSelected
                      ? "border-[#ff581b] bg-white shadow-sm shadow-orange-100"
                      : "border-gray-200 bg-[#fffcfa] hover:border-orange-200"
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff581b] rounded-l-xl" />
                )}
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#ff581b]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {[area, city, state].filter(Boolean).join(", ")}
                  </p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                  ${isSelected ? "border-[#ff581b]" : "border-gray-300"}
                `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#ff581b]" />
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
