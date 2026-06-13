"use client";

import { MapPin, CalendarDays, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectFormattedDate,
  selectFormattedTime,
  selectSelectedDeliveryPoint,
  selectSelectedRoute,
  selectTowardsLocation,
} from "@/redux/delivery/deliverySlice";

export default function SelectedRouteCard() {
  const router = useRouter();
  const towardsLocation = useSelector(selectTowardsLocation);
  const selectedRoute = useSelector(selectSelectedRoute);
  const selectedDeliveryPoint = useSelector(selectSelectedDeliveryPoint);
  const formattedDate = useSelector(selectFormattedDate);
  const formattedTime = useSelector(selectFormattedTime);

  // Get display values with fallbacks
  const routeName = selectedRoute?.name || selectedRoute?.routeId || "Not selected";
  const deliveryPointName = selectedDeliveryPoint?.name || "Not selected";
  const displayDate = formattedDate || "Select date";
  const displayTime = formattedTime || "Select time";
  const towards = towardsLocation || "Select destination";
  return (
    <div className="mx-3 sm:mx-4 md:mx-5 lg:mx-0 my-4">
      <div className="w-full rounded-xl border border-gray-100 bg-white shadow-sm p-2.5 sm:p-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#222]">
            Selected Route
          </h3>

          <button
            className="text-[12px] font-semibold text-[#F0A500] hover:text-[#d99200] transition-colors"
            onClick={() => router.push("/")}
          >
            Change
          </button>
        </div>

        {/* Route Details */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#F9E8B7]">
            <MapPin
              size={15}
              className="fill-[#F0A500] text-[#F0A500]"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] sm:text-[15px] font-semibold leading-tight text-[#222]">
              {deliveryPointName}
            </div>

            <div className="mt-1 text-[11px] sm:text-[12px] text-[#8A8A8A]">
              Towards {towards}
            </div>
          </div>
        </div>

        {/* Progress Line */}
        <div className="relative my-3 flex items-center justify-between px-1">
          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 border-t border-dashed border-[#D3D3D3]" />

          <div className="relative z-10 h-2 w-2 rounded-full bg-[#D3D3D3]" />

          <div className="relative z-10 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#F0A500] shadow-sm">
            <Truck
              size={11}
              className="fill-white text-white"
            />
          </div>

          <div className="relative z-10 h-2 w-2 rounded-full bg-[#D3D3D3]" />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {/* Route */}
          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-1">
              <MapPin
                size={11}
                className="text-red-500 flex-shrink-0"
              />
              <span className="truncate text-[10px] sm:text-[11px] text-[#8A8A8A]">
                Selected Route
              </span>
            </div>

            <p className="truncate text-[11px] sm:text-[12px] font-semibold text-[#222]">
              {routeName?.replace(/[^a-zA-Z0-9]+/g, ' ')}
            </p>
          </div>

          {/* Delivery Point */}
          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-1">
              <MapPin
                size={11}
                className="text-purple-500 flex-shrink-0"
              />
              <span className="truncate text-[10px] sm:text-[11px] text-[#8A8A8A]">
                Delivery Point
              </span>
            </div>

            <p className="truncate text-[11px] sm:text-[12px] font-semibold text-[#222]">
              {deliveryPointName}
            </p>
          </div>

          {/* Date & Time */}
          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-1">
              <CalendarDays
                size={11}
                className="text-green-500 flex-shrink-0"
              />
              <span className="truncate text-[10px] sm:text-[11px] text-[#8A8A8A]">
                Date & Time
              </span>
            </div>

            <p className="text-[11px] sm:text-[12px] font-semibold text-[#222] leading-tight">
              {displayDate} {displayTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}