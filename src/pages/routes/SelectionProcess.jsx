// SelectionProcess.jsx - Details Only View
"use client";
import React from "react";
import {
  FaBus,
  FaPlane,
  FaTrain,
  FaHotel,
  FaMapMarkerAlt,
  FaSpinner,
  FaRoad,
  FaArrowRight,
  FaMap,
  FaCheckCircle,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaRoute,
} from "react-icons/fa";
import { MdSwapHoriz, MdConfirmationNumber } from "react-icons/md";
import { CalendarOutlined } from "@ant-design/icons";
import { formatTime } from "../selectRoutes/constants";

// Import your Redux selectors
import { useSelector } from "react-redux";
import {
  selectFromLocationDetailed,
  selectTowardsLocation,
  selectFormattedDate,
  selectFormattedTime,
  selectSelectedRoute,
  selectSelectedDeliveryPoint,
  selectBookingData,
} from "../../redux/delivery/deliverySlice";

const SelectionProcess = () => {
  // Get data from Redux store
  const fromLocationFull = useSelector(selectFromLocationDetailed);
  const toLocation = useSelector(selectTowardsLocation);
  const selectedDate = useSelector(selectFormattedDate);
  const selectedTime = useSelector(selectFormattedTime);
  const selectedRoute = useSelector(selectSelectedRoute);
  const selectedDeliveryPoint = useSelector(selectSelectedDeliveryPoint);
  const bookingData = useSelector(selectBookingData);

  const formatDate = (date) => {
    if (!date) return "";
    return date;
  };
  const handleChangeRoute = () => {
    console.log("hellloooooo");
  };
  const handleConfirmBooking = () => {
    alert(`🎉 Booking Confirmed! 🎉
    
Journey Details:
From: ${fromLocationFull}
To: ${toLocation}
Date: ${formatDate(selectedDate)}
Time: ${selectedTime}
Route: ${selectedRoute?.name}
Delivery Point: ${selectedDeliveryPoint?.name}
Total Amount: ₹${Math.round((selectedRoute?.fare || selectedRoute?.price || 0) * 1.05)}

Ticket details sent to your phone`);
  };

  return (
    <section className="w-full bg-[#f4f6f8] py-4 px-3 font-['Inter',system-ui,sans-serif]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md">
          {/* ========== DETAILS TAB ONLY ========== */}
          <div className="p-4">
            <div className="space-y-4">
              {/* Booking Summary Card (like ShipmentCard design) */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-4 pt-4 pb-2 border-b border-gray-100">
                  <TextSummary className="text-gray-800 text-base font-bold">
                    Selected Route
                  </TextSummary>
                  <button className="text-amber-500 text-sm font-semibold">
                    Change
                  </button>
                </div>
                {/* Top Section - From/To */}
                <div className="flex flex-row justify-between items-center px-4 pt-3">
                  <div className="flex flex-row items-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-amber-500 text-lg" />
                    </div>
                    <div className="ml-2.5">
                      <TextSummary className="text-gray-900 text-base font-bold">
                        {fromLocationFull?.split(",")[0] || "Origin"}
                      </TextSummary>
                      <TextSummary className="text-gray-400 text-xs font-medium mt-0.5">
                        Towards {toLocation}
                      </TextSummary>
                    </div>
                  </div>
                </div>

                {/* Progress Line */}
                <div className="flex flex-row items-center px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <div className="flex-1 border-t border-dashed border-gray-300 mx-1" />
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <FaBus className="text-white text-xs" />
                  </div>
                  <div className="flex-1 border-t border-dashed border-gray-300 mx-1" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                </div>

                {/* Bottom Section - Details */}
                <div className="flex flex-row justify-between px-4 pb-4 pt-1">
                  {/* Selected Route */}
                  <div className="flex-1">
                    <div className="flex flex-row items-center">
                      <FaRoad className="text-red-500 text-xs" />
                      <TextSummary className="text-gray-400 text-[10px] font-medium ml-1">
                        Selected Route
                      </TextSummary>
                    </div>
                    <TextSummary className="text-gray-900 text-xs font-bold mt-1">
                      {selectedRoute?.name || selectedRoute?.routeId || "N/A"}
                    </TextSummary>
                  </div>

                  {/* Delivery Point */}
                  <div className="flex-1">
                    <div className="flex flex-row items-center">
                      <FaMapMarkerAlt className="text-purple-500 text-xs" />
                      <TextSummary className="text-gray-400 text-[10px] font-medium ml-1">
                        Delivery Point
                      </TextSummary>
                    </div>
                    <TextSummary className="text-gray-900 text-xs font-bold mt-1">
                      {selectedDeliveryPoint?.name || "N/A"}
                    </TextSummary>
                  </div>

                  {/* Date & Time */}
                  <div className="flex-1">
                    <div className="flex flex-row items-center">
                      <FaClock className="text-emerald-500 text-xs" />
                      <TextSummary className="text-gray-400 text-[10px] font-medium ml-1">
                        Date & Time
                      </TextSummary>
                    </div>
                    <TextSummary className="text-gray-900 text-xs font-bold mt-1">
                      {formatDate(selectedDate)} • {selectedTime}
                    </TextSummary>
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              {/* <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleConfirmBooking}
                  className="px-6 py-2.5 bg-[#ff581b] text-white rounded-lg hover:bg-[#e04e16] transition flex items-center gap-2"
                >
                  <FaCheckCircle /> Confirm Booking
                </button>
              </div> */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleChangeRoute} // create this function
                  className="px-6 py-2.5 bg-[#ff581b] text-white rounded-lg hover:bg-[#e04e16] transition flex items-center gap-2"
                >
                  <FaRoute /> Change Route
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for text styling
const TextSummary = ({ children, className }) => (
  <span className={className}>{children}</span>
);

export default SelectionProcess;
