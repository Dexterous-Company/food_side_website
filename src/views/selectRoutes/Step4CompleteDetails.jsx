"use client";

import React, { useEffect, useState } from "react";
import { formatRouteName } from "../selectRoutes/formate";
import {
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCube,
  HiOutlineMap,
} from "react-icons/hi";
import { MdOutlineRoute } from "react-icons/md";
import { FiMapPin, FiClock, FiNavigation } from "react-icons/fi";
import { BsMap } from "react-icons/bs";

export default function Step4CompleteDetails({
  selDest,
  selRoute,
  selDP,
  details,
  onDetailsChange,
  onBack,
  showTimeUpdatedToast = false,
  updatedTime = "",
}) {
  const destinationName =
    selDest?.primaryText || selDest?.destination || selDest?.name || "";
  const routeName = selRoute?.name || selRoute?.routeId || "";
  const deliveryPointName = selDP?.name || "";
  const routeDistance = selRoute?.distanceKm || selRoute?.totalDistance || 0;
  const routeDuration = selRoute?.durationMinutes || selRoute?.totalTime || 0;
  const [toast, setToast] = useState(null);

  const formatDuration = (minutes) => {
    if (!minutes) return "0h 0m";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    if (!showTimeUpdatedToast) return undefined;

    setToast(
      updatedTime
        ? `Your delivery time was updated to ${updatedTime} to keep it at least 1 hour from now.`
        : "Your delivery time was updated to keep it at least 1 hour from now.",
    );

    const timeout = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timeout);
  }, [showTimeUpdatedToast, updatedTime]);

  return (
    <div className="flex flex-col h-full">
      {toast && (
        <div className="fixed top-4 right-4 z-[1000000] rounded-lg bg-amber-500 px-4 py-3 text-sm font-medium text-white shadow-lg">
          <div className="flex items-center gap-2">
            <span>!</span>
            <span>{toast}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-2 text-white/80 hover:text-white"
            >
              x
            </button>
          </div>
        </div>
      )}

      {/* Banner Section with Back Button */}
      <div className="relative w-full h-39 sm:h-40 md:h-48 rounded-b-2xl overflow-hidden flex-shrink-0">
        <img
          src="/car_food.png"
          alt="Banner"
          className="object-cover rounded-b-2xl w-full h-full"
        />

        {onBack && (
          <>
            <div className="sm:hidden block">
              <button
                onClick={onBack}
                aria-label="Back"
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md z-10"
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

            {/* <div className="hidden sm:block">
              <button
                onClick={onBack}
                aria-label="Back"
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md z-10"
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
            </div> */}
          </>
        )}
      </div>

      {/* Route Info Card - Same as Step2 and Step3 */}
      {selRoute && (
        <div className="px-2 -mt-15 relative z-10">
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

      {/* Main Content - Scrollable Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full p-2 max-w-3xl mx-auto bg-white flex flex-col gap-3">
          {/* Delivery Point Info Card */}
          {selDP && (
            <div className="px-2 mt-3">
              <div className="bg-white rounded-2xl border border-gray-200 p-3 cursor-pointer transition-all">
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
                        Delivery Point
                      </h3>
                    </div>

                    <p className="text-[13px] font-medium text-gray-800 mt-1">
                      {deliveryPointName}
                    </p>

                    <p className="text-[10px] mt-1 text-gray-400">
                      {selDP?.address?.area || selDP?.area || ""}
                      {selDP?.address?.city && `, ${selDP.address.city}`}
                    </p>
                  </div>
                </div>

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
            </div>
          )}

          {/* Complete Details Section */}
          <div className="px-2 mt-3 pb-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-orange-500 text-[13px] font-bold uppercase">
                Journey Details
              </h2>
              <span className="text-[11px] text-gray-400">Confirmation</span>
            </div>

            <div className="space-y-3 mt-1">
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 flex items-start gap-2">
                <HiOutlineClock
                  size={16}
                  className="text-amber-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-[11px] leading-4 text-amber-800">
                  Please choose a delivery time at least 1 hour from now so the
                  restaurant has enough time to prepare your order.
                </p>
              </div>

              {/* Destination Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-3">
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center">
                    <HiOutlineMap size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[12px] font-semibold text-gray-800">
                      Destination
                    </h3>
                    <p className="text-[13px] text-gray-600 mt-1">
                      {destinationName || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Route Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-3">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <MdOutlineRoute size={16} className="text-orange-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] font-semibold text-gray-800">
                      Route
                    </h3>

                    <p className="text-[13px] text-gray-600 mt-1 break-words">
                      {routeName || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-3">
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                    <HiOutlineCube size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[12px] font-semibold text-gray-800">
                      Summary
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-[11px] text-gray-600">
                        <span className="font-medium">Route Distance:</span>{" "}
                        {routeDistance} km
                      </p>
                      <p className="text-[11px] text-gray-600">
                        <span className="font-medium">Duration:</span>{" "}
                        {formatDuration(routeDuration)}
                      </p>
                      <p className="text-[11px] text-gray-600">
                        <span className="font-medium">Delivery Point:</span>{" "}
                        {deliveryPointName || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
