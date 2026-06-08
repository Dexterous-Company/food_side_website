"use client";

import { formatDuration } from "./constants";
import { FiMapPin, FiClock, FiNavigation } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsMap } from "react-icons/bs";
import { MdOutlineRoute } from "react-icons/md";

const getPointKey = (point) => point?._id || point?.id || "";

export default function Step3SelectDeliveryPoint({
  selRoute,
  selDP,
  onSelectDP,
  deliveryPoints = [],
  loading = false,
  error = "",
  onBack, // Add back button prop
}) {
  const routeDistance = selRoute?.distanceKm || selRoute?.totalDistance || 0;
  const routeDuration = selRoute?.durationMinutes || selRoute?.totalTime || 0;
  const formatRouteName = (value) =>
    String(value || "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  return (
    <>
      {/* Banner Section with Back Button */}
      <div className="relative w-full h-39 sm:h-40 md:h-48 rounded-b-2xl overflow-hidden">
        <img
          src="/car_food.png"
          alt="Banner"
          className="object-cover rounded-b-2xl w-full h-full"
        />

        {onBack && (
          <div className="sm:hidden block">
            <button
              onClick={onBack}
              aria-label="Back"
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full p-2 max-w-3xl mx-auto bg-white flex flex-col gap-3 h-full min-h-0">
        {/* Route Info Card */}
        {selRoute && (
          <div className="px-2 -mt-18 relative z-10">
            <div className="bg-white rounded-2xl shadow-md p-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <MdOutlineRoute size={18} className="text-orange-500" />
                </div>

                <div>
                  <div className="text-[13px] font-semibold text-black leading-5">
                    {formatRouteName(selRoute.name || selRoute.routeId)}
                  </div>

                  <div className="text-[10px] text-black">
                    {routeDistance} km • {formatDuration(routeDuration)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="border border-orange-500 bg-orange-50 rounded-xl px-2 py-2 flex items-center gap-2">
                  <FiNavigation size={13} className="text-orange-500" />
                  <span className="text-[9px] sm:text-[12px] text-black truncate">
                    {routeDistance} km
                  </span>
                </div>

                <div className="border border-orange-500 bg-orange-50 rounded-xl px-2 py-2 flex items-center gap-2">
                  <FiClock size={13} className="text-orange-500" />
                  <span className="text-[9px] sm:text-[12px] text-black">
                    {formatDuration(routeDuration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Points Section */}
        <div className="px-2 mt-3 flex-1 overflow-y-auto pb-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-orange-500 text-[13px] font-bold uppercase">
              Delivery Points
            </h2>

            <span className="text-[11px] text-gray-400">
              {deliveryPoints.length} points available
            </span>
          </div>

          <div className="space-y-3 mt-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-3 bg-white rounded-2xl border">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#ff581b] border-t-transparent" />
                <p className="text-sm">Loading delivery points...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-8 text-red-400 gap-2 bg-white rounded-2xl border">
                <p className="text-sm">{error}</p>
              </div>
            ) : deliveryPoints.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2 bg-white rounded-2xl border">
                <svg
                  className="w-8 h-8 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
                  />
                </svg>
                <p className="text-sm">
                  No delivery points available for this route
                </p>
              </div>
            ) : (
              deliveryPoints.map((p) => {
                const pointKey = getPointKey(p);
                const isSelected = getPointKey(selDP) === pointKey;
                const city = p.address?.city || p.address?.area || p.city || "";
                const state = p.address?.state || p.state || "";
                const area =
                  p.address?.area || p.area || p.address?.fullAddress || "";

                return (
                  <div
                    key={pointKey}
                    onClick={() => onSelectDP(p)}
                    className={`bg-white rounded-2xl border p-3 cursor-pointer transition-all
                    ${isSelected ? "border-[#ff581b] shadow-sm shadow-orange-100" : "border-gray-200"}
                  `}
                  >
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <HiOutlineLocationMarker
                          size={16}
                          className="text-orange-500"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-[12px] font-semibold text-gray-800 leading-5">
                            {p.name}
                          </h3>

                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                            ${isSelected ? "border-[#ff581b]" : "border-gray-300"}
                          `}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-[#ff581b]" />
                            )}
                          </div>
                        </div>

                        <p className="text-[10px] mt-1 text-gray-400">
                          {[area, city, state].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </div>

                    {/* Stats row matching design1 */}
                    <div className="mt-2 bg-orange-50 rounded-lg p-2 flex justify-between text-[10px] text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiMapPin size={10} />
                        Pickup point
                      </div>

                      <div className="flex items-center gap-1">
                        <FiClock size={10} />
                        Available
                      </div>

                      <div className="flex items-center gap-1">
                        <BsMap size={10} />
                        Location
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
