// SelectionProcess.jsx - Mobile Optimized with Modal View
"use client";
import React, { useState } from "react";
import {
  FaBus,
  FaMapMarkerAlt,
  FaRoad,
  FaRoute,
  FaTicketAlt,
  FaEye,
  FaTimes,
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
} from "../../redux/delivery/deliverySlice";
import DeliverySelectionModal from "../selectRoutes/DeliverySelectionModal";

const SelectionProcess = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  
  const fromLocationFull = useSelector(selectFromLocationDetailed);
  const toLocation = useSelector(selectTowardsLocation);
  const selectedDate = useSelector(selectFormattedDate);
  const selectedTime = useSelector(selectFormattedTime);
  const selectedRoute = useSelector(selectSelectedRoute);
  const selectedDeliveryPoint = useSelector(selectSelectedDeliveryPoint);

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
    setShowModal(false);
    setShowDeliveryModal(true);
  };

  const handleDeliveryModalClose = () => {
    setShowDeliveryModal(false);
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
                        {getLocationShort(fromLocationFull)}
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
                
                {/* View Details Button - Opens Modal */}
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-xs font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  <FaEye className="text-xs" />
                  <span>View</span>
                </button>
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
                    value={getLocationShort(fromLocationFull)}
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

      {/* Modal for Mobile View Details */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white sm:pb-0 pb-14  rounded-t-2xl lg:rounded-2xl w-full lg:max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaBus className="text-amber-500" />
                <h3 className="text-lg font-bold text-gray-800">Journey Details</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaTimes className="text-gray-500 text-sm" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* From & To Section */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MdLocationOn className="text-amber-500 text-lg" />
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase tracking-wider">From</p>
                        <p className="text-gray-900 font-bold">{getLocationShort(fromLocationFull)}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{getLocationLong(fromLocationFull)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <FaExchangeAlt className="text-gray-300 mx-2" />
                  
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase tracking-wider">To</p>
                        <p className="text-gray-900 font-bold">
                          {typeof toLocation === "string" ? toLocation : (toLocation?.name || "Destination")}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">Drop-off Point</p>
                      </div>
                      <FaMapMarkerAlt className="text-blue-500 text-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Details Grid */}
              <div className="grid grid-cols-1 gap-2">
                <InfoRow
                  icon={FaRoad}
                  iconColor="text-purple-500"
                  label="Selected Route"
                  value={selectedRoute?.name || selectedRoute?.routeId || "N/A"}
                  subtitle={`Route ID: ${selectedRoute?.routeId || "N/A"}`}
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
                  label="Journey Date"
                  value={formatDate(selectedDate) || "N/A"}
                  subtitle="Scheduled Date"
                />
                
                <InfoRow
                  icon={MdAccessTime}
                  iconColor="text-orange-500"
                  label="Departure Time"
                  value={selectedTime || "N/A"}
                  subtitle="Reporting Time"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleChangeRoute}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <FaRoute />
                  <span>Change Route</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Selection Modal for Change Route */}
      <DeliverySelectionModal 
        isOpen={showDeliveryModal}
        onClose={handleDeliveryModalClose}
        onFinish={handleDeliveryModalFinish}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default SelectionProcess;