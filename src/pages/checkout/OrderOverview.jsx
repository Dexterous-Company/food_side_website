// components/Checkout/OrderOverview.jsx
"use client";
import React from "react";
import { 
  HiMapPin, 
  HiTruck, 
  HiCalendar, 
  HiClock,
  HiBuildingStorefront 
} from "react-icons/hi2";
import { 
  MdLocationOn, 
  MdDeliveryDining,
  MdRoute,
  MdOutlineLocationCity
} from "react-icons/md";
import { 
  FaBoxOpen, 
  FaRegCheckCircle,
  FaExclamationTriangle 
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
    fullAddress: selectedDeliveryPoint?.address?.fullAddress || "Address not available",
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
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 pt-6 px-6">
          <div className="bg-gradient-to-r from-[#ff581b] to-orange-500 p-2 rounded-xl">
            <FaBoxOpen className="text-white text-lg" />
          </div>
          Order Overview
        </h2>
        
        {!isComplete && (
          <div className="mb-6 mx-6 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500 shadow-sm">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-amber-500 text-lg" />
              <p className="text-sm text-amber-800 font-medium">
                Please complete all delivery details (pickup, destination, route, and delivery point)
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
          {/* Left Section - Location & Route */}
          <div className="lg:col-span-1 space-y-2">
            {/* Pickup Location Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 p-4">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <HiMapPin className="text-emerald-600 text-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                    Pickup Location
                  </p>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {getPickupDisplay()}
                  </p>
                </div>
              </div>
            </div>

            {/* Route Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 p-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MdRoute className="text-blue-600 text-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                    Selected Route
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    {route.name !== "No route selected" 
                      ? route.name 
                      : `${route.origin} → ${route.destination}`}
                  </p>
                  {route.distanceKm > 0 && (
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <GiPathDistance className="text-blue-500" />
                        {formatDistance(route.distanceKm)}
                      </span>
                      <span className="flex items-center gap-1">
                        <GiDuration className="text-blue-500" />
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 p-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MdDeliveryDining className="text-purple-600 text-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                    Delivery Point
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {deliveryPoint.name}
                  </p>
                  {deliveryPoint.city && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MdOutlineLocationCity className="text-gray-400 text-xs" />
                      {deliveryPoint.city}
                      {deliveryPoint.state && `, ${deliveryPoint.state}`}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-2 gap-3 p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <HiCalendar className="text-indigo-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                      Delivery Date
                    </p>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {journey.date !== "Date not set" ? journey.date : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 p-2 rounded-lg">
                    <HiClock className="text-rose-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide">
                      Delivery Time
                    </p>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {journey.time !== "Time not set" ? journey.time : "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Completion Status Card */}
            {isComplete && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-center gap-2 p-3">
                  <FaRegCheckCircle className="text-green-600 text-sm" />
                  <p className="text-xs font-medium text-green-700">
                    ✓ All details completed
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mobile/Responsive View
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <div className="bg-gradient-to-r from-[#ff581b] to-orange-500 p-1.5 rounded-lg">
            <FaBoxOpen className="text-white text-sm" />
          </div>
          Order Overview
        </h2>
        {isComplete && (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
            <FaRegCheckCircle className="text-green-600 text-xs" />
            <span className="text-xs font-medium text-green-700">Ready</span>
          </div>
        )}
      </div>
      
      {!isComplete && (
        <div className="mb-3 mx-4 p-3 bg-amber-50 rounded-xl border-l-4 border-amber-500">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-amber-500 text-sm" />
            <p className="text-xs text-amber-800">
              Please complete all delivery details
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-3 px-4">
        {/* Pickup Location Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex gap-3 p-4">
            <div className="bg-emerald-100 p-2 rounded-lg h-fit">
              <HiMapPin className="text-emerald-600 text-base" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                Pickup Location
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {pickupLocation}
              </p>
            </div>
          </div>
        </div>
        
        {/* Route Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex gap-3 p-4">
            <div className="bg-blue-100 p-2 rounded-lg h-fit">
              <MdRoute className="text-blue-600 text-base" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                Route
              </p>
              <p className="text-sm font-medium text-gray-800 mb-2">
                {route.name !== "No route selected" 
                  ? route.name 
                  : `${route.origin} → ${route.destination}`}
              </p>
              {route.distanceKm > 0 && (
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <GiPathDistance className="text-blue-500 text-sm" />
                    {formatDistance(route.distanceKm)}
                  </span>
                  <span className="flex items-center gap-1">
                    <GiDuration className="text-blue-500 text-sm" />
                    {formatDuration(route.durationMinutes)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Delivery Point Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex gap-3 p-4">
            <div className="bg-purple-100 p-2 rounded-lg h-fit">
              <MdDeliveryDining className="text-purple-600 text-base" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                Delivery Point
              </p>
              <p className="text-sm font-medium text-gray-800 mb-1">
                {deliveryPoint.name}
              </p>
              <p className="text-xs text-gray-500">
                {getFullDeliveryAddress()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Date & Time Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="flex gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg h-fit">
                <HiCalendar className="text-indigo-600 text-base" />
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                  Delivery Date
                </p>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {journey.date !== "Date not set" ? journey.date : "Not set"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-rose-100 p-2 rounded-lg h-fit">
                <HiClock className="text-rose-600 text-base" />
              </div>
              <div>
                <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide">
                  Delivery Time
                </p>
                <p className="text-sm font-medium text-gray-800 mt-1">
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