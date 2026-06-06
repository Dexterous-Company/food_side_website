"use client";

import React, { useState } from "react";
import { formatRouteName } from "../selectRoutes/formate";
import { 
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCube,
  HiOutlineTruck,
  HiOutlineSwitchHorizontal,
  HiOutlineArrowRight,
  HiOutlineMap
} from "react-icons/hi";
import { MdOutlineRoute } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";

export default function Step4CompleteDetails({ selDest, selRoute, selDP, details, onDetailsChange }) {
  const handleChange = (key, value) => onDetailsChange(key, value);
  const destinationName =
    selDest?.primaryText || selDest?.destination || selDest?.name || "";
  const routeName = selRoute?.name || selRoute?.routeId || "";
  const deliveryPointName = selDP?.name || "";

  // Prepare data for ShipmentCard
  const selectedRouteData = {
    fromLocation: selRoute?.origin || "Kompally",
    towardsLocation: destinationName || selRoute?.destination || "Madhapur",
    deliveryPoint: deliveryPointName || "Hitech City Point",
    dateTime: new Date().toLocaleString('en-US', { 
      weekday: 'short', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }),
    routeName,
  };

  const handleCardPress = () => {
    console.log("Shipment card pressed");
  };

  const handleNavigateToRoutes = () => {
    console.log("Navigate to SelectRouteDelivery");
  };

  return (
    <div className="flex flex-col gap-4 h-full min-h-0 overflow-y-auto px-0.5 sm:px-1 pb-4">
      {/* Shipment Card Component */}
      <ShipmentCard 
        onPress={handleCardPress}
        onChangeRoute={handleNavigateToRoutes}
        selectedRouteData={selectedRouteData}
      />

      {/* Original Details Box - Enhanced */}
      <div className="bg-gradient-to-br from-orange-50/90 to-amber-50/70 border border-orange-100/80 rounded-2xl p-3.5 sm:p-4 flex flex-col gap-3 shadow-sm backdrop-blur-sm">
        {[
          { icon: <HiOutlineMap className="w-4 h-4 text-amber-500" />, label: "Destination", value: destinationName },
          { icon: <MdOutlineRoute className="w-4 h-4 text-emerald-500" />, label: "Route", value: routeName },
          { icon: <HiOutlineCube className="w-4 h-4 text-purple-500" />, label: "Delivery Point", value: deliveryPointName },
        ].map((item) => (
          <div key={item.label} className="flex items-start sm:items-center gap-3 group hover:translate-x-0.5 transition-transform duration-200 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white/80 shadow-sm flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <span className="text-xs font-medium text-gray-400 w-24 flex-shrink-0 tracking-wide">{item.label}</span>
            <span className="text-sm font-semibold text-gray-800 truncate flex-1">{item.value || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced ShipmentCard Component with CSS Animations (No Lottie required)
const ShipmentCard = ({ onPress, onChangeRoute, selectedRouteData }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract data from selectedRouteData or use defaults
  const currentLocation = selectedRouteData?.fromLocation || "Kompally";
  const destination = selectedRouteData?.towardsLocation || "Madhapur";
  const deliveryPoint = selectedRouteData?.deliveryPoint || "Hitech City Point";
  const dateTime = selectedRouteData?.dateTime || "Today • 10:30 AM";
  const selectedRouteName =
    selectedRouteData?.routeName ||
    (currentLocation && destination
      ? `${currentLocation} → ${destination}`
      : undefined);

  // Format route display name
  const formattedRouteName = formatRouteName(selectedRouteName) || currentLocation;

  return (
    <div className="px-1 mt-2">
      <div
        className={`
          w-full rounded-2xl px-4 pt-4 pb-5 overflow-hidden 
          bg-white border transition-all duration-300 cursor-pointer
          ${isHovered 
            ? 'border-amber-200 shadow-xl shadow-amber-100/50 scale-[1.01]' 
            : 'border-gray-100 shadow-md hover:shadow-lg'
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onPress}
      >
        {/* HEADER with animated icon */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <MdOutlineRoute className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>
            <h3 className="text-gray-800 text-base font-bold tracking-tight">Selected Route</h3>
          </div>
          <button
            className="
              text-amber-500 text-sm font-semibold 
              hover:text-amber-600 transition-all duration-200
              flex items-center gap-1 hover:gap-1.5
            "
            onClick={(e) => {
              e.stopPropagation();
              onChangeRoute?.();
            }}
          >
            <HiOutlineSwitchHorizontal className="w-3.5 h-3.5" />
            Change
          </button>
        </div>

        {/* TOP SECTION with animated truck */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            {/* Animated Location Icon with bounce */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex justify-center items-center shadow-inner animate-bounce-slow">
              <GiPositionMarker className="w-6 h-6 text-amber-500" />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-gray-800 text-base font-bold truncate max-w-[160px] flex items-center gap-1">
                {currentLocation}
                <span className="text-xs text-gray-400 font-normal">📍</span>
              </p>
              <p className="text-gray-400 text-xs font-medium flex items-center gap-1">
                <span>Towards</span>
                <HiOutlineLocationMarker className="w-2.5 h-2.5 text-amber-400" />
                <span className="text-gray-600">{destination}</span>
              </p>
            </div>
          </div>

          {/* Animated Truck Icon with CSS animation */}
          <div className="w-20 h-14 -mr-2 opacity-80 animate-truck-move">
            <HiOutlineTruck className="w-full h-full text-amber-400" />
          </div>
        </div>

        {/* TRACK LINE - Enhanced with animation */}
        <div className="flex items-center mt-4 px-1">
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex-1 border-t border-dashed border-gray-300 mx-1.5 relative">
            <div className="absolute inset-0 flex justify-between px-1 animate-dash-flow">
              <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex justify-center items-center shadow-md animate-bounce-subtle">
            <FaShippingFast className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1 border-t border-dashed border-gray-300 mx-1.5 relative">
            <div className="absolute inset-0 flex justify-between px-1 animate-dash-flow">
              <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
        </div>

        {/* BOTTOM SECTION - Enhanced info cards */}
        <div className="flex justify-between mt-5 gap-2">
          {/* Selected Route */}
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-xl p-2.5 border border-gray-100 hover:border-amber-200 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-1.5">
              <HiOutlineLocationMarker className="w-3 h-3 text-red-400" />
              <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Route</span>
            </div>
            <p className="text-gray-800 text-xs font-bold mt-1.5 truncate leading-tight">
              {formattedRouteName}
            </p>
          </div>

          {/* Delivery Point */}
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-xl p-2.5 border border-gray-100 hover:border-purple-200 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-1.5">
              <HiOutlineCube className="w-3 h-3 text-purple-500" />
              <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Delivery</span>
            </div>
            <p className="text-gray-800 text-xs font-bold mt-1.5 truncate leading-tight">
              {deliveryPoint}
            </p>
          </div>

          {/* Date & Time */}
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-xl p-2.5 border border-gray-100 hover:border-emerald-200 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-1.5">
              <HiOutlineClock className="w-3 h-3 text-emerald-500" />
              <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Time</span>
            </div>
            <p className="text-gray-800 text-xs font-bold mt-1.5 truncate leading-tight">
              {dateTime}
            </p>
          </div>
        </div>

        {/* Subtle progress bar at bottom */}
        <div className="mt-4 flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                i < 2 ? 'bg-amber-400' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes truck-move {
          0% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
          100% { transform: translateX(0px); }
        }
        
        @keyframes dash-flow {
          0% { opacity: 0; transform: translateX(-5px); }
          50% { opacity: 1; transform: translateX(0px); }
          100% { opacity: 0; transform: translateX(5px); }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 1s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-truck-move {
          animation: truck-move 1.5s ease-in-out infinite;
        }
        
        .animate-dash-flow {
          animation: dash-flow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Optional: Export the ShipmentCard separately if needed
export { ShipmentCard };
