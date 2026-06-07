
"use client";
import React from "react";
import {
  HiMapPin,
  HiTruck,
  HiCalendar,
  HiClock,
  HiBuildingStorefront,
} from "react-icons/hi2";
import {
  MdLocationOn,
  MdDeliveryDining,
  MdRoute,
  MdOutlineLocationCity,
} from "react-icons/md";
import {
  FaBoxOpen,
  FaRegCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { GiPathDistance, GiDuration } from "react-icons/gi";
import { useSelector } from "react-redux";
import {
  selectCompleteDeliveryData,
  selectFormattedDate,
  selectFormattedTime,
  selectSelectedRoute,
  selectSelectedDeliveryPoint,
  selectFromLocationDetailed,
  selectTowardsLocation,
} from "@/redux/delivery/deliverySlice";

const OrderOverview = ({ isDesktop = true }) => {
  const completeDeliveryData = useSelector(selectCompleteDeliveryData);
  const fromLocationDetailed = useSelector(selectFromLocationDetailed);
  const towardsLocation = useSelector(selectTowardsLocation);
  const selectedRoute = useSelector(selectSelectedRoute);
  const selectedDeliveryPoint = useSelector(selectSelectedDeliveryPoint);
  const formattedDate = useSelector(selectFormattedDate);
  const formattedTime = useSelector(selectFormattedTime);

  const pickupLocation = fromLocationDetailed || "Not selected yet";

  const route = {
    name: selectedRoute?.name || "No route selected",
    origin: selectedRoute?.origin || "Origin not set",
    destination: selectedRoute?.destination || "Destination not set",
    distanceKm: selectedRoute?.distanceKm || 0,
    durationMinutes: selectedRoute?.durationMinutes || 0,
  };

  const deliveryPoint = {
    name: selectedDeliveryPoint?.name || "No delivery point selected",
    fullAddress:
      selectedDeliveryPoint?.address?.fullAddress || "Address not available",
    city: selectedDeliveryPoint?.address?.city || "",
    state: selectedDeliveryPoint?.address?.state || "",
    pincode: selectedDeliveryPoint?.address?.pincode || "",
  };

  const journey = {
    date: formattedDate || "Date not set",
    time: formattedTime || "Time not set",
  };

  const isComplete = completeDeliveryData?.isComplete || false;

  const formatDuration = (minutes) => {
    if (!minutes || minutes === 0) return "Duration not available";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDistance = (km) => {
    if (!km || km === 0) return "Distance not available";
    return `${km} km`;
  };

  const getFullDeliveryAddress = () => {
    const parts = [
      deliveryPoint.fullAddress,
      deliveryPoint.city,
      deliveryPoint.state,
      deliveryPoint.pincode,
    ].filter(Boolean);
    return parts.join(", ") || "Address not available";
  };

  const getPickupDisplay = () => {
    if (pickupLocation === "Not selected yet") return pickupLocation;
    return pickupLocation.length > 60
      ? `${pickupLocation.substring(0, 57)}...`
      : pickupLocation;
  };

  if (isDesktop) {
    return (
      <div className="bg-white rounded-xl shadow border border-gray-100  ">
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pt-4 px-4">
          <div className="bg-gradient-to-r from-[#ff581b] to-orange-500 p-1.5 rounded-lg">
            <FaBoxOpen className="text-white text-base" />
          </div>
          Order Overview
        </h2>

        {!isComplete && (
          <div className="mb-4 mx-4 p-2.5 bg-amber-50 rounded-lg border-l-4 border-amber-500">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-amber-500 text-base" />
              <p className="text-xs text-amber-800 font-medium">
                Please complete all delivery details (pickup, destination,
                route, and delivery point)
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-4 pb-4">
          {/* Left Section - Location & Route */}
          <div className="lg:col-span-1 space-y-2">
            {/* Pickup Location Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-2 p-3">
                <div className="bg-emerald-100 p-1.5 rounded-md">
                  <HiMapPin className="text-emerald-600 text-base" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
                    Current Location
                  </p>
                  <p className="text-xs font-medium text-gray-800 leading-relaxed">
                    {getPickupDisplay()}
                  </p>
                </div>
              </div>
            </div>
            {/* Route Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-2 p-3">
                <div className="bg-blue-100 p-1.5 rounded-md">
                  <MdRoute className="text-blue-600 text-base" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-0.5">
                    Selected Route
                  </p>
                  <p className="text-xs font-medium text-gray-800 mb-1">
                    {route.name !== "No route selected"
                      ? route.name
                      : `${route.origin} → ${route.destination}`}
                  </p>
                  {route.distanceKm > 0 && (
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span className="flex items-center gap-0.5">
                        <GiPathDistance className="text-blue-500 text-[10px]" />
                        {formatDistance(route.distanceKm)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <GiDuration className="text-blue-500 text-[10px]" />
                        {formatDuration(route.durationMinutes)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Delivery & DateTime */}
          <div className="space-y-2">
            {/* Delivery Point Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-2 p-3">
                <div className="bg-purple-100 p-1.5 rounded-md">
                  <MdDeliveryDining className="text-purple-600 text-base" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide mb-0.5">
                    Delivery Point
                  </p>
                  <p className="text-xs font-medium text-gray-800 mb-0.5">
                    {deliveryPoint.name}
                  </p>
                  {deliveryPoint.city && (
                    <p className="text-[10px] text-gray-500 flex items-center gap-0.5">
                      <MdOutlineLocationCity className="text-gray-400 text-[10px]" />
                      {deliveryPoint.city}
                      {deliveryPoint.state && `, ${deliveryPoint.state}`}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-2 p-3">
                <div className="flex items-start gap-2">
                  <div className="bg-indigo-100 p-1.5 rounded-md">
                    <HiCalendar className="text-indigo-600 text-base" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide">
                      Delivery Date
                    </p>
                    <p className="text-xs font-medium text-gray-800 mt-0.5">
                      {journey.date !== "Date not set"
                        ? journey.date
                        : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-rose-100 p-1.5 rounded-md">
                    <HiClock className="text-rose-600 text-base" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-rose-600 uppercase tracking-wide">
                      Delivery Time
                    </p>
                    <p className="text-xs font-medium text-gray-800 mt-0.5">
                      {journey.time !== "Time not set"
                        ? journey.time
                        : "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Mobile/Responsive View
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3 px-3">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
          <div className="bg-gradient-to-r from-[#ff581b] to-orange-500 p-1 rounded-md">
            <FaBoxOpen className="text-white text-xs" />
          </div>
          Order Overview
        </h2>
        {isComplete && (
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-green-100 rounded-full">
            <FaRegCheckCircle className="text-green-600 text-[9px]" />
            <span className="text-[9px] font-medium text-green-700">Ready</span>
          </div>
        )}
      </div>

      {!isComplete && (
        <div className="mb-2 mx-3 p-2 bg-amber-50 rounded-lg border-l-4 border-amber-500">
          <div className="flex items-center gap-1.5">
            <FaExclamationTriangle className="text-amber-500 text-xs" />
            <p className="text-[10px] text-amber-800">
              Please complete all delivery details
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2 px-3">
        {/* Pickup Location Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex gap-2 p-3">
            <div className="bg-emerald-100 p-1.5 rounded-md h-fit">
              <HiMapPin className="text-emerald-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
                Current Location
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {pickupLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Route Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex gap-2 p-3">
            <div className="bg-blue-100 p-1.5 rounded-md h-fit">
              <MdRoute className="text-blue-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-0.5">
                Route
              </p>
              <p className="text-xs font-medium text-gray-800 mb-1">
                {route.name !== "No route selected"
                  ? route.name
                  : `${route.origin} → ${route.destination}`}
              </p>
              {route.distanceKm > 0 && (
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span className="flex items-center gap-0.5">
                    <GiPathDistance className="text-blue-500 text-[10px]" />
                    {formatDistance(route.distanceKm)}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <GiDuration className="text-blue-500 text-[10px]" />
                    {formatDuration(route.durationMinutes)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Point Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex gap-2 p-3">
            <div className="bg-purple-100 p-1.5 rounded-md h-fit">
              <MdDeliveryDining className="text-purple-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide mb-0.5">
                Delivery Point
              </p>
              <p className="text-xs font-medium text-gray-800 mb-0.5">
                {deliveryPoint.name}
              </p>
              <p className="text-[10px] text-gray-500">
                {getFullDeliveryAddress()}
              </p>
            </div>
          </div>
        </div>

        {/* Date & Time Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 gap-2 p-3">
            <div className="flex gap-2">
              <div className="bg-indigo-100 p-1.5 rounded-md h-fit">
                <HiCalendar className="text-indigo-600 text-sm" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide">
                  Delivery Date
                </p>
                <p className="text-xs font-medium text-gray-800 mt-0.5">
                  {journey.date !== "Date not set" ? journey.date : "Not set"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-rose-100 p-1.5 rounded-md h-fit">
                <HiClock className="text-rose-600 text-sm" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-rose-600 uppercase tracking-wide">
                  Delivery Time
                </p>
                <p className="text-xs font-medium text-gray-800 mt-0.5">
                  {journey.time !== "Time not set" ? journey.time : "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
