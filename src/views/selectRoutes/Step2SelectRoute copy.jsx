"use client";

import { useState } from "react";
import { FiMapPin, FiClock, FiNavigation, FiX } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsMap } from "react-icons/bs";
import { MdOutlineRoute } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa6";

const formatDuration = (minutes) => {
  if (!minutes) return "0h 0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const getRouteKey = (route) => route?._id || route?.id || route?.routeId || "";

const formatRouteName = (value) =>
  String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getStopsCount = (route) =>
  route?.deliveryPointCount ??
  route?.cityCount ??
  route?.citiesCovered?.length ??
  (Array.isArray(route?.stops) ? route.stops.length : route?.stops) ??
  0;

// Google Maps API Key - Replace with your actual key
const GOOGLE_MAPS_API_KEY = "AIzaSyDfjw4P4PnfI08-B-ljZDhEeQxnBqNv3hQ";

// Map View Component - inline view, not a modal
function MapView({ routes, selRoute, onSelectRoute, onClose, selDest }) {
  // Get origin and destination from selDest or routes
  const origin = selDest?.origin || selDest?.primaryText || "Hyderabad, India";
  const destination = selDest?.destination || selDest?.secondaryText || "Bengaluru, India";
  
  // Build the embedded map URL - simple directions
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800">Route Map</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <FiX size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative min-h-[300px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </div>

      {/* Route selector */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {routes.map((route, idx) => {
            const isSelected = getRouteKey(selRoute) === getRouteKey(route);
            return (
              <button
                key={getRouteKey(route)}
                onClick={() => onSelectRoute(route)}
                className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#ff581b] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="font-medium">
                  Route {idx + 1}: {formatRouteName(route.name || route.routeId).slice(0, 25)}
                </span>
                {isSelected && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
        {selRoute && (
          <div className="mt-2 pt-2 border-t text-xs text-gray-500">
            <span className="font-semibold text-gray-700">Selected:</span>{" "}
            {formatRouteName(selRoute.name || selRoute.routeId)} • {" "}
            {selRoute.distanceKm || selRoute.totalDistance || 0} km • {" "}
            {formatDuration(selRoute.durationMinutes || selRoute.totalTime || 0)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step2SelectRoute({
  selDest,
  selRoute,
  onSelectRoute,
  routes = [],
  onBack,
}) {
  const [showMapView, setShowMapView] = useState(false);

  const handleMapClick = (e, route) => {
    e.stopPropagation();
    setShowMapView(true);
  };

  return (
    <>
      {showMapView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <MapView
              routes={routes}
              selRoute={selRoute}
              onSelectRoute={onSelectRoute}
              onClose={() => setShowMapView(false)}
              selDest={selDest}
            />
          </div>
        </div>
      )}

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
      <div className="w-full p-2 max-w-3xl mx-auto bg-white flex flex-col gap-3 h-full min-h-0">
        {/* Address Card - Design 1 style (from selDest) */}
        {selDest && (
          <div className="px-2 -mt-15 relative z-10">
            <div className="bg-white rounded-2xl shadow-md p-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <MdOutlineRoute size={18} className="text-orange-500" />
                </div>

                <div>
                  <div className="text-[13px] font-semibold text-black leading-5">
                    {selDest.primaryText || selDest.destination || selDest.name}
                  </div>

                  <div className="text-[10px] text-black ">
                    {selDest.secondaryText ||
                      selDest.origin ||
                      selDest.loc ||
                      "Matching route"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2 ">
                <div className="border border-orange-500 bg-orange-50 rounded-xl px-2 py-2 flex items-center gap-2">
                  <FiMapPin size={13} className="text-orange-500" />
                  <span className="text-[9px] sm:text-[12px] text-black truncate">
                    {selDest.primaryText || selDest.destination || selDest.name}
                  </span>
                </div>

                <div className="border border-orange-500 bg-orange-50 rounded-xl px-2 py-2 flex items-center gap-2">
                  <FiClock size={13} className="text-orange-500" />
                  <span className="text-[9px] sm:text-[12px] text-black">
                    {new Date().toLocaleDateString()}{" "}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Routes Section - Design 1 style */}
        <div className="px-2 mt-3 flex-1 overflow-y-auto pb-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-orange-500 text-[13px] font-bold uppercase">
              Available Routes
            </h2>

            <span className="text-[11px] text-gray-400">
              {routes.length} routes found
            </span>
          </div>

          <div className="space-y-3 mt-1">
            {routes.length === 0 ? (
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
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
                  <div
                    key={routeKey}
                    onClick={() => onSelectRoute(r)}
                    className={`bg-white rounded-2xl border p-3 cursor-pointer transition-all
                    ${isSelected ? "border-[#ff581b] shadow-sm shadow-orange-100" : "border-gray-200"}
                  `}
                  >
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center">
                        <HiOutlineLocationMarker
                          size={16}
                          className="text-orange-500"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-[12px] font-semibold text-gray-800 leading-5">
                            {formatRouteName(r.name || r.routeId)}
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

                        <p
                          className={`text-[10px] mt-1 font-medium ${pickupCount > 0 ? "text-orange-500" : "text-gray-400"}`}
                        >
                          {pickupCount > 0
                            ? `${pickupCount} pickups`
                            : "No pickups"}
                        </p>
                      </div>
                    </div>

                    {/* Route Stats - Design 1 style */}
                    <div className="mt-2 bg-orange-50 rounded-lg p-2 flex justify-between text-[10px] text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiNavigation size={10} />
                        {distance} km
                      </div>

                      <div className="flex items-center gap-1">
                        <FiClock size={10} />
                        {formatDuration(duration)}
                      </div>

                      <div className="flex items-center gap-1">
                        <FiMapPin size={10} />
                        {getStopsCount(r)} stops
                      </div>

                      <button
                        onClick={(e) => handleMapClick(e, r)}
                        className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                      >
                        <BsMap size={10} />
                        Map
                      </button>
                    </div>

                    {/* Locations - Design 1 style */}
                    <div className="flex justify-between mt-3 text-[10px] text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiMapPin size={11} className="text-orange-500" />
                        {r.origin || "Origin"}
                      </div>

                      <div className="flex items-center gap-1">
                        <FaRegFlag size={11} className="text-orange-500" />
                        {r.destination || "Destination"}
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