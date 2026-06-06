"use client";

import { formatDuration } from "./constants";

const getRouteKey = route => route?._id || route?.id || route?.routeId || "";

const formatRouteName = value =>
  String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getStopsCount = route =>
  route?.deliveryPointCount ??
  route?.cityCount ??
  route?.citiesCovered?.length ??
  (Array.isArray(route?.stops) ? route.stops.length : route?.stops) ??
  0;

export default function Step2SelectRoute({
  selDest,
  selRoute,
  onSelectRoute,
  routes = [],
}) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div>
        <img
          src={"/car_food.png"}
          alt="Banner"
          className="w-full h-45 object-cover transition-opacity duration-500 border-rose-50 rounded-xl"
        />
      </div>
      {selDest && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <svg
            className="w-3.5 h-3.5 text-[#ff581b]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">
            {selDest.primaryText || selDest.destination || selDest.name}
          </span>
          <span className="text-xs text-gray-400">
            - {selDest.secondaryText || selDest.origin || selDest.loc || "Matching route"}
          </span>
        </div>
      )}

      <p className="text-[11px] font-bold text-[#ff581b] uppercase tracking-widest flex-shrink-0">
        {routes.length} routes found
      </p>

      <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-0.5">
        {routes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
            <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
            <p className="text-sm">No routes available</p>
          </div>
        ) : (
          routes.map((r) => {
            const routeKey = getRouteKey(r);
            const isSelected = getRouteKey(selRoute) === routeKey;
            const distance = r.distanceKm || r.totalDistance || 0;
            const duration = r.durationMinutes || r.totalTime || 0;
            const pickupCount = r.deliveryPointCount || 0;

            return (
              <button
                key={routeKey}
                onClick={() => onSelectRoute(r)}
                className={`relative text-left rounded-xl border overflow-hidden p-3.5 transition-all duration-150 w-full
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

                <div className="flex items-start gap-2.5 mb-2.5 pl-1">
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
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-800">
                        {formatRouteName(r.name || r.routeId)}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                        ${pickupCount > 0 ? "bg-orange-50 text-[#ff581b]" : "bg-gray-100 text-gray-400"}
                      `}
                      >
                        {pickupCount > 0 ? `${pickupCount} pickups` : "No pickups"}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                    ${isSelected ? "border-[#ff581b]" : "border-gray-300"}
                  `}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#ff581b]" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-0 bg-orange-50/60 rounded-lg px-3 py-2 mb-2.5 pl-3.5">
                  <div className="flex items-center flex-1">
                    <span className="text-[11px] font-semibold text-[#6b6058]">
                      {"<->"} {distance} km
                    </span>
                  </div>
                  <div className="w-px h-3 bg-orange-200 mx-2" />
                  <div className="flex items-center flex-1">
                    <span className="text-[11px] font-semibold text-[#6b6058]">
                      Time {formatDuration(duration)}
                    </span>
                  </div>
                  <div className="w-px h-3 bg-orange-200 mx-2" />
                  <div className="flex items-center flex-1">
                    <span className="text-[11px] font-semibold text-[#6b6058]">
                      Pin {getStopsCount(r)} stops
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-1">
                  <svg
                    className="w-3 h-3 text-[#ff581b] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-500 truncate">
                    {r.origin || "Origin"}
                  </span>
                  <svg
                    className="w-3 h-3 text-gray-300 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <svg
                    className="w-3 h-3 text-[#ff581b] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-500 truncate">
                    {r.destination || "Destination"}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
