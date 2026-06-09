
// SelectionProcess.jsx - Mobile Optimized
"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaRoad,
  FaRoute,
  FaTicketAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime, MdOutlineDateRange } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  selectFromLocationDetailed,
  selectTowardsLocation,
  selectFormattedDate,
  selectFormattedTime,
  selectSelectedRoute,
  selectSelectedDeliveryPoint,
  selectPickupCoordinates,
  selectPickupAddressDetails,
  BselectFromLocation,
} from "../../redux/delivery/deliverySlice";

const SelectionProcess = () => {
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  
  const fromLocationFull = useSelector(selectFromLocationDetailed);
  const fromLocationShort = useSelector(BselectFromLocation);
  const toLocation = useSelector(selectTowardsLocation);
  const selectedDate = useSelector(selectFormattedDate);
  const selectedTime = useSelector(selectFormattedTime);
  const selectedRoute = useSelector(selectSelectedRoute);
  const selectedDeliveryPoint = useSelector(selectSelectedDeliveryPoint);
  const pickupCoordinates = useSelector(selectPickupCoordinates);
  const pickupAddressDetails = useSelector(selectPickupAddressDetails);

  // Get actual GPS location display - prioritize GPS-detected location
  const getActualLocation = () => {
    // If we have GPS coordinates, show them
    if (pickupCoordinates?.lat !== null && pickupCoordinates?.lng !== null) {
      const coords = `${pickupCoordinates.lat.toFixed(4)}, ${pickupCoordinates.lng.toFixed(4)}`;
      // If we have a city from GPS, show city + coordinates
      if (pickupAddressDetails?.city) {
        return `${pickupAddressDetails.city}`;
      }
      return coords;
    }
    // Fall back to stored location
    if (fromLocationShort) return fromLocationShort;
    if (fromLocationFull) return getLocationShort(fromLocationFull);
    return "Origin";
  };

  const actualLocation = getActualLocation();

  // Helper function to safely get string value from location
  const getLocationString = (location) => {
    if (!location) return "";
    if (typeof location === "string") return location;
    if (typeof location === "object") {
      // If it's an object, try to get a meaningful string
      return location.location || location.name || location.address || JSON.stringify(location);
    }
    return "";
  };

  // Helper function to get first part of location
  const getLocationShort = (location) => {
    const locationStr = getLocationString(location);
    return locationStr.split(",")[0] || "Origin";
  };

  // Helper function to get remaining parts of location
  const getLocationLong = (location) => {
    const locationStr = getLocationString(location);
    const parts = locationStr.split(",");
    return parts.slice(1).join(",") || "";
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date;
  };

  const handleChangeRoute = () => {
    setShowDeliveryModal(!showDeliveryModal);
  };

  const handleDeliveryModalFinish = (data) => {
    console.log("Route updated:", data);
    setShowDeliveryModal(false);
  };

  const InfoRow = ({ icon: Icon, iconColor, label, value, subtitle }) => (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Icon className={`${iconColor} text-xl mt-0.5 flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-gray-900 text-sm font-semibold mt-0.5 truncate">
          {typeof value === "object" ? JSON.stringify(value) : value || "N/A"}
        </p>
        {subtitle && <p className="text-gray-400 text-[10px] mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <section className="w-full py-3 px-4 font-['Inter',system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Mobile View - Only From, To, Delivery Point */}
          <div className="lg:hidden">
            <div className="p-4">
              {/* From - To Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MdLocationOn className="text-amber-500 text-sm" />
                    <div>
                      <p className="text-gray-400 text-[9px] uppercase tracking-wider">From</p>
                      <p className="text-gray-900 text-sm font-semibold truncate max-w-[120px]">
                        {actualLocation}
                      </p>
                    </div>
                  </div>
                </div>
                
                <FaExchangeAlt className="text-gray-300 text-xs mx-2 flex-shrink-0" />
                
                <div className="flex-1 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div>
                      <p className="text-gray-400 text-[9px] uppercase tracking-wider">To</p>
                      <p className="text-gray-900 text-sm font-semibold truncate max-w-[120px]">
                        {typeof toLocation === "string" ? toLocation : (toLocation?.name || "Destination")}
                      </p>
                    </div>
                    <FaMapMarkerAlt className="text-blue-500 text-sm" />
                  </div>
                </div>
              </div>

              {/* Delivery Point Row */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-1">
                  <FaTicketAlt className="text-green-500 text-sm" />
                  <div className="flex-1">
                    <p className="text-gray-400 text-[9px] uppercase tracking-wider">Delivery Point</p>
                    <p className="text-gray-900 text-sm font-semibold truncate">
                      {selectedDeliveryPoint?.name || (typeof selectedDeliveryPoint === "string" ? selectedDeliveryPoint : "N/A")}
                    </p>
                  </div>
                </div>
                
                <div className="text-xs text-gray-400">
                  {selectedDeliveryPoint?.name || "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View - Full Details */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 divide-x divide-gray-100">
              {/* Left Column - Journey Info */}
              <div className="col-span-8 p-6">
                <div className="grid grid-cols-3 gap-6">
                  <InfoRow
                    icon={MdLocationOn}
                    iconColor="text-amber-500"
                    label="From"
                    value={actualLocation}
                    subtitle={getLocationLong(fromLocationFull)}
                  />
                  
                  <InfoRow
                    icon={FaMapMarkerAlt}
                    iconColor="text-blue-500"
                    label="To"
                    value={typeof toLocation === "string" ? toLocation : (toLocation?.name || "Destination")}
                    subtitle="Drop-off Point"
                  />
                  
                  <InfoRow
                    icon={FaRoad}
                    iconColor="text-purple-500"
                    label="Route"
                    value={selectedRoute?.name || selectedRoute?.routeId || "N/A"}
                    subtitle="Selected Path"
                  />
                  
                  <InfoRow
                    icon={FaTicketAlt}
                    iconColor="text-green-500"
                    label="Delivery Point"
                    value={selectedDeliveryPoint?.name || "N/A"}
                    subtitle="Collection Center"
                  />
                  
                  <InfoRow
                    icon={MdOutlineDateRange}
                    iconColor="text-red-500"
                    label="Date"
                    value={formatDate(selectedDate) || "N/A"}
                    subtitle="Journey Date"
                  />
                  
                  <InfoRow
                    icon={MdAccessTime}
                    iconColor="text-orange-500"
                    label="Time"
                    value={selectedTime || "N/A"}
                    subtitle="Departure Time"
                  />
                </div>
              </div>

              {/* Right Column - Action Button */}
              <div className="col-span-4 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="w-full max-w-xs text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-green-600">Ready to Go</span>
                  </div>
                  
                  <button
                    onClick={handleChangeRoute}
                    className="w-full group relative overflow-hidden px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    <FaRoute className="text-white text-sm group-hover:rotate-180 transition-transform duration-500" />
                    <span>Change Route</span>
                  </button>
                  
                  <p className="text-xs text-gray-400">Modify your journey route</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectionProcess;