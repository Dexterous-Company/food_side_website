// App.jsx
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
} from "react-icons/fa";
import { MdSwapHoriz, MdConfirmationNumber } from "react-icons/md";
import { DatePicker, TimePicker, Select } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import { CalendarOutlined } from "@ant-design/icons";
import { formatTime } from "../selectRoutes/constants";

const GOOGLE_API_KEY = "AIzaSyBS8mqUuvOWZ4WQRMEvhBA7jUb0jM1Ge-Q";

// Dummy destinations for "Going To" field
const DUMMY_DESTINATIONS = [
  "Goa",
  "Manali",
  "Shimla",
  "Ooty",
  "Darjeeling",
  "Rishikesh",
  "Udaipur",
  "Kochi",
  "Mysore",
  "Nagpur",
  "Varanasi",
  "Amritsar",
  "Jaisalmer",
  "Leh",
  "Gangtok",
  "Pondicherry",
  "Coorg",
  "Munnar",
  "Alleppey",
  "Kodaikanal",
];

// Routes data
const ROUTES = [
  {
    id: 1,
    name: "Express Line",
    duration: "12h 30m",
    price: 850,
    seats: 25,
    type: "AC Sleeper",
  },
  {
    id: 2,
    name: "Royal Travels",
    duration: "11h 45m",
    price: 950,
    seats: 18,
    type: "AC Volvo",
  },
  {
    id: 3,
    name: "Green Line",
    duration: "13h 15m",
    price: 750,
    seats: 32,
    type: "Non-AC",
  },
];

// Delivery points
const DELIVERY_POINTS = [
  {
    id: 1,
    name: "Central Bus Stand",
    address: "Main Road, Near Railway Station",
    distance: "0.5 km",
  },
  {
    id: 2,
    name: "City Center",
    address: "Sector 12, City Mall",
    distance: "2.3 km",
  },
  { id: 3, name: "Airport Link", address: "Airport Road", distance: "5.7 km" },
  {
    id: 4,
    name: "North Gate",
    address: "Highway 44, Near Petrol Pump",
    distance: "3.2 km",
  },
];

const SelectionProcess = () => {
  // Tab state - 1: Select Towards, 2: Select Pickup Point, 3: Details
  const [activeTab, setActiveTab] = useState(1);

  // Form data state
  const [fromLocation, setFromLocation] = useState("");
  const [fromLocationFull, setFromLocationFull] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedDeliveryPoint, setSelectedDeliveryPoint] = useState(null);
  const [passengerName, setPassengerName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");

  // UI states
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const toRef = useRef(null);

  const formatDate = (date) => {
    if (!date) return "";
    return date.format("DD MMM YYYY");
  };



  // Get address from coordinates
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const formattedAddress = result.formatted_address;

        let city = "";
        let state = "";

        for (const component of result.address_components) {
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
        }

        const shortAddress = city
          ? state
            ? `${city}, ${state}`
            : city
          : formattedAddress.split(",")[0];

        return {
          full: formattedAddress,
          short: shortAddress,
          city: city,
        };
      }
      throw new Error("No results found");
    } catch (error) {
      console.error("Geocoding error:", error);
      return {
        full: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
        short: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
        city: "",
      };
    }
  };

  // Fetch current location
  const fetchCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const addressInfo = await getAddressFromCoords(
            position.coords.latitude,
            position.coords.longitude,
          );

          setFromLocation(addressInfo.short);
          setFromLocationFull(addressInfo.full);
          setLocationError("");
        } catch (error) {
          console.error("Error getting address:", error);
          setLocationError("Could not get address from location");
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMsg = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Location access denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMsg = "Location request timed out. Please try again.";
            break;
          default:
            errorMsg = "Unable to fetch location. Please enter manually.";
        }
        setLocationError(errorMsg);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  // Filter destinations for "To" field
  useEffect(() => {
    if (toLocation) {
      const filtered = DUMMY_DESTINATIONS.filter((dest) =>
        dest.toLowerCase().includes(toLocation.toLowerCase()),
      );
      setToSuggestions(filtered);
      setShowToDropdown(true);
    } else {
      setToSuggestions([]);
      setShowToDropdown(false);
    }
  }, [toLocation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    const tempFull = fromLocationFull;
    setFromLocation(toLocation);
    setFromLocationFull(toLocation);
    setToLocation(temp);
    setLocationError("");
  };

  // Handle Search - Go to Tab 2 (Select Pickup Point)
  const handleSearch = () => {
    if (!fromLocation) {
      setLocationError("Please enter your origin city");
      return;
    }

    if (!toLocation) {
      alert("Please enter your destination");
      return;
    }

    if (!selectedTime) {
      alert("Please select departure time");
      return;
    }

    // Go to Select Pickup Point tab
    setActiveTab(2);
  };

  // Handle Complete Selection - Go to Tab 3 (Details)
  const handleCompleteSelection = () => {
    if (!selectedRoute) {
      alert("Please select a route");
      return;
    }
    if (!selectedDeliveryPoint) {
      alert("Please select a delivery point");
      return;
    }
    // Go to Details tab
    setActiveTab(3);
  };

  // Handle Final Booking
  const handleConfirmBooking = () => {
    if (!passengerName) {
      alert("Please enter passenger name");
      return;
    }
    if (!passengerPhone) {
      alert("Please enter phone number");
      return;
    }

    alert(`🎉 Booking Confirmed! 🎉
    
Journey Details:
From: ${fromLocation}
To: ${toLocation}
Date: ${formatDate(selectedDate)}
Time: ${formatTime(selectedTime)}
Route: ${selectedRoute?.name}
Delivery Point: ${selectedDeliveryPoint?.name}
Passenger: ${passengerName}
Total Amount: ₹${Math.round((selectedRoute?.price || 0) * 1.05)}

Ticket details sent to ${passengerEmail || "your phone"}`);
  };

  // Disable past dates
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  // Get minimum allowed time
  const getMinAllowedTime = () => {
    const now = dayjs();
    return now.add(1, "hour");
  };

  // Disable times
  const disabledTime = () => {
    const now = dayjs();
    const minAllowedTime = getMinAllowedTime();
    const minHour = minAllowedTime.hour();
    const minMinute = minAllowedTime.minute();

    const isToday = selectedDate.isSame(now, "day");

    if (isToday) {
      return {
        disabledHours: () => {
          const disabledHoursArray = [];
          for (let i = 0; i < minHour; i++) {
            disabledHoursArray.push(i);
          }
          return disabledHoursArray;
        },
        disabledMinutes: (hour) => {
          if (hour === minHour) {
            const disabledMinutesArray = [];
            for (let i = 0; i <= minMinute; i++) {
              disabledMinutesArray.push(i);
            }
            return disabledMinutesArray;
          }
          return [];
        },
        disabledSeconds: () => {
          return [];
        },
      };
    }
    return {};
  };

  const handleTimeChange = (time) => {
    if (!time) return;

    const now = dayjs();
    const minAllowedTime = getMinAllowedTime();

    const selectedDateTime = selectedDate
      .hour(time.hour())
      .minute(time.minute())
      .second(0);

    if (
      selectedDateTime.isBefore(minAllowedTime) ||
      selectedDateTime.isSame(minAllowedTime)
    ) {
      alert("Please select a time after 1 hour from current time");
      return;
    }

    setSelectedTime(time);
  };

  // Calculate total price
  const totalPrice = selectedRoute ? Math.round(selectedRoute.price * 1.05) : 0;

  return (
    <section className="w-full bg-[#f4f6f8] py-4 px-3 font-['Inter',system-ui,sans-serif]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md">
          {/* Header - Main Category Tabs */}
          <div className="flex flex-wrap items-center gap-5 px-4 md:px-6 py-3 border-b border-gray-100">
            <button
              onClick={() => activeTab >= 1 && setActiveTab(1)}
              className={`relative flex items-center gap-2 group ${activeTab === 1 ? "" : "opacity-60"}`}
            >
              <FaBus className="text-[#d84e55] text-[16px]" />
              <span
                className={`font-semibold text-[13px] ${activeTab === 1 ? "text-gray-900" : "text-gray-600"}`}
              >
                Select Towards
              </span>
              {activeTab === 1 && (
                <div className="absolute -bottom-[13px] left-0 w-full h-[3px] bg-[#d84e55] rounded-full" />
              )}
            </button>
            <button
              onClick={() => activeTab >= 2 && setActiveTab(2)}
              className={`relative flex items-center gap-2 group ${activeTab === 2 ? "" : "opacity-60"}`}
            >
              <FaPlane className="text-gray-500 text-[16px]" />
              <span
                className={`font-semibold text-[13px] ${activeTab === 2 ? "text-gray-900" : "text-gray-600"}`}
              >
                Select Pickup Point
              </span>
              {activeTab === 2 && (
                <div className="absolute -bottom-[13px] left-0 w-full h-[3px] bg-[#d84e55] rounded-full" />
              )}
            </button>
            <button
              onClick={() => activeTab >= 3 && setActiveTab(3)}
              className={`relative flex items-center gap-2 group ${activeTab === 3 ? "" : "opacity-60"}`}
            >
              <MdConfirmationNumber className="text-gray-500 text-[16px]" />
              <span
                className={`font-semibold text-[13px] ${activeTab === 3 ? "text-gray-900" : "text-gray-600"}`}
              >
                Details
              </span>
              {activeTab === 3 && (
                <div className="absolute -bottom-[13px] left-0 w-full h-[3px] bg-[#d84e55] rounded-full" />
              )}
            </button>
            <div className="hidden xl:block ml-auto text-[12px] font-medium text-gray-700">
              India’s fastest and most convenient food Side platform
            </div>
          </div>

          {/* ========== TAB 1: SELECT TOWARDS ========== */}
          {activeTab === 1 && (
            <>
              {/* Desktop View */}
              <div className="hidden lg:block p-4">
                <div className="relative flex items-stretch border border-gray-200 rounded-xl bg-white">
                  {/* From Location */}
                  <div className="flex-1 bg-[#fafafa] px-4 py-3 flex items-center gap-2">
                    <FaRoad className="text-gray-500 text-[20px]" />
                    <div className="w-full relative">
                      <input
                        type="text"
                        placeholder="Leaving From"
                        value={fromLocationFull}
                        onChange={(e) => {
                          setFromLocation(e.target.value);
                          setFromLocationFull(e.target.value);
                          setLocationError("");
                        }}
                        className="w-full bg-transparent outline-none text-[13px] font-medium placeholder:text-gray-400"
                      />
                      {isLoadingLocation && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                          <FaSpinner className="animate-spin text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="absolute left-[26%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button
                      onClick={handleSwapLocations}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <MdSwapHoriz className="text-[18px] text-gray-600" />
                    </button>
                  </div>

                  {/* To Location */}
                  <div
                    className="flex-1 bg-[#fafafa] border-l border-gray-200 px-4 py-2 flex items-center gap-2 pl-10 relative"
                    ref={toRef}
                  >
                    <FaMapMarkerAlt className="text-gray-500 text-[14px]" />
                    <div className="w-full relative">
                      <input
                        type="text"
                        placeholder="Going To"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        onFocus={() => {
                          setToSuggestions(
                            toLocation
                              ? DUMMY_DESTINATIONS.filter((dest) =>
                                  dest
                                    .toLowerCase()
                                    .includes(toLocation.toLowerCase()),
                                )
                              : DUMMY_DESTINATIONS,
                          );
                          setShowToDropdown(true);
                        }}
                        className="w-full bg-transparent outline-none text-[13px] font-medium placeholder:text-gray-400"
                      />
                      {showToDropdown && toSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                          {toSuggestions.map((destination, idx) => (
                            <button
                              key={idx}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setToLocation(destination);
                                setShowToDropdown(false);
                              }}
                            >
                              <div className="text-[13px] font-medium">
                                {destination}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="border-l border-gray-200 flex items-center px-3">
                    <DatePicker
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      disabledDate={disabledDate}
                      format="DD MMM YYYY"
                      placeholder="Departure"
                      variant="borderless"
                      style={{ width: "170px", height: "56px" }}
                      suffixIcon={
                        <CalendarOutlined className="text-gray-400 text-sm" />
                      }
                      allowClear={false}
                    />
                  </div>

                  {/* Time Picker */}
                  <div className="border-l border-gray-200 flex items-center px-3">
                    <TimePicker
                      value={selectedTime}
                      onChange={handleTimeChange}
                      format="hh:mm A"
                      placeholder="Select Time"
                      minuteStep={1}
                      disabledTime={disabledTime}
                      variant="borderless"
                      style={{ width: "150px", height: "56px" }}
                      suffixIcon={<FaClock className="text-gray-400 text-sm" />}
                      allowClear={false}
                    />
                  </div>

                  {/* Search Button */}
                  <div
                    onClick={handleSearch}
                    className="w-[140px] bg-[#ff581b] cursor-pointer rounded-r-lg hover:bg-[#e04e16] text-white font-semibold text-[14px] transition-colors flex items-center justify-center gap-2"
                  >
                    Search →
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden p-4">
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-2 bg-white">
                    <FaMapMarkerAlt className="text-gray-500 text-[14px]" />
                    <input
                      type="text"
                      placeholder="Leaving From"
                      value={fromLocation}
                      onChange={(e) => {
                        setFromLocation(e.target.value);
                        setLocationError("");
                      }}
                      className="w-full outline-none text-[14px]"
                    />
                    {isLoadingLocation && (
                      <FaSpinner className="animate-spin text-gray-400" />
                    )}
                  </div>

                  <div className="flex justify-center -my-1">
                    <button
                      onClick={handleSwapLocations}
                      className="w-8 h-8 rounded-full border bg-white shadow-md flex items-center justify-center"
                    >
                      <MdSwapHoriz className="text-[18px]" />
                    </button>
                  </div>

                  <div className="relative">
                    <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-2 bg-white">
                      <FaMapMarkerAlt className="text-gray-500 text-[14px]" />
                      <input
                        type="text"
                        placeholder="Going To"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        onFocus={() => {
                          setToSuggestions(
                            toLocation
                              ? DUMMY_DESTINATIONS.filter((d) =>
                                  d
                                    .toLowerCase()
                                    .includes(toLocation.toLowerCase()),
                                )
                              : DUMMY_DESTINATIONS,
                          );
                          setShowToDropdown(true);
                        }}
                        className="w-full outline-none text-[14px]"
                      />
                    </div>
                    {showToDropdown && toSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                        {toSuggestions.map((destination, idx) => (
                          <button
                            key={idx}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50"
                            onClick={() => {
                              setToLocation(destination);
                              setShowToDropdown(false);
                            }}
                          >
                            <div className="text-[13px] font-medium">
                              {destination}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <DatePicker
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      disabledDate={disabledDate}
                      format="DD MMM YYYY"
                      placeholder="Departure Date"
                      className="w-full"
                      size="large"
                      style={{
                        padding: "12px",
                        border: "none",
                        width: "100%",
                        height: "48px",
                      }}
                      suffixIcon={<span>📅</span>}
                    />
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <TimePicker
                      value={selectedTime}
                      onChange={handleTimeChange}
                      format="hh:mm A"
                      placeholder="Select Time (1hr+ from now)"
                      minuteStep={15}
                      disabledTime={disabledTime}
                      className="w-full"
                      size="large"
                      style={{
                        padding: "12px",
                        border: "none",
                        width: "100%",
                        height: "48px",
                      }}
                      suffixIcon={<span>⏰</span>}
                    />
                  </div>

                  <button
                    onClick={handleSearch}
                    className="w-full h-12 rounded-lg bg-[#ff581b] text-white text-[15px] font-semibold hover:bg-[#e04e16] transition"
                  >
                    Search →
                  </button>

                  <button
                    onClick={fetchCurrentLocation}
                    disabled={isLoadingLocation}
                    className="w-full text-center text-[12px] text-[#ff581b] hover:underline disabled:opacity-50 py-2"
                  >
                    {isLoadingLocation
                      ? "Detecting location..."
                      : "📍 Use my current location"}
                  </button>

                  {locationError && !isLoadingLocation && (
                    <p className="text-red-500 text-[11px] text-center">
                      {locationError}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ========== TAB 2: SELECT PICKUP POINT ========== */}
          {activeTab === 2 && (
            <>
              {/* Desktop View */}
              <div className="hidden lg:block p-4">
                <div className="space-y-4">
                  {/* Journey Summary Bar */}
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {fromLocation || "Origin"}
                        </span>
                        <FaArrowRight className="text-gray-400 text-xs" />
                        <span className="font-semibold">
                          {toLocation || "Destination"}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        <CalendarOutlined className="mr-1" />{" "}
                        {formatDate(selectedDate)} |{" "}
                        <FaClock className="inline mr-1" />{" "}
                        {formatTime(selectedTime)}
                      </div>
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Select Route */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Route <span className="text-red-500">*</span>
                      </label>
                      <Select
                        placeholder="Choose a route"
                        style={{ width: "100%" }}
                        onChange={(value, option) => setSelectedRoute(option)}
                        options={ROUTES.map((route) => ({
                          value: route.id,
                          label: `${route.name} - ${route.type} - ₹${route.price}`,
                          ...route,
                        }))}
                        suffixIcon={<FaMap className="text-gray-400" />}
                      />
                    </div>

                    {/* Select Delivery Point */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Delivery Point{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Select
                        placeholder="Choose delivery point"
                        style={{ width: "100%" }}
                        onChange={(value, option) =>
                          setSelectedDeliveryPoint(option)
                        }
                        options={DELIVERY_POINTS.map((point) => ({
                          value: point.id,
                          label: `${point.name} - ${point.distance}`,
                          ...point,
                        }))}
                        suffixIcon={<FaMap className="text-gray-400" />}
                      />
                    </div>
                  </div>

                  {/* Complete Selection Button */}
                  <div className="flex justify-end">
                    <div
                      onClick={handleCompleteSelection}
                      className="w-[200px] bg-[#ff581b] cursor-pointer rounded-lg hover:bg-[#e04e16] text-white font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 py-3"
                    >
                      Complete Selection →
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden p-4">
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-sm">
                      <div className="font-semibold">
                        {fromLocation || "Origin"} →{" "}
                        {toLocation || "Destination"}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {formatDate(selectedDate)} | {formatTime(selectedTime)}
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Route <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm"
                      value={selectedRoute?.id || ""}
                      onChange={(e) => {
                        const route = ROUTES.find(
                          (r) => r.id === parseInt(e.target.value),
                        );
                        setSelectedRoute(route);
                      }}
                    >
                      <option value="">Choose a route</option>
                      {ROUTES.map((route) => (
                        <option key={route.id} value={route.id}>
                          {route.name} - {route.type} - ₹{route.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Delivery Point{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm"
                      value={selectedDeliveryPoint?.id || ""}
                      onChange={(e) => {
                        const point = DELIVERY_POINTS.find(
                          (p) => p.id === parseInt(e.target.value),
                        );
                        setSelectedDeliveryPoint(point);
                      }}
                    >
                      <option value="">Choose delivery point</option>
                      {DELIVERY_POINTS.map((point) => (
                        <option key={point.id} value={point.id}>
                          {point.name} - {point.distance}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleCompleteSelection}
                    className="w-full h-12 rounded-lg bg-[#ff581b] text-white text-[15px] font-semibold hover:bg-[#e04e16] transition"
                  >
                    Complete Selection →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ========== TAB 3: DETAILS ========== */}
          {activeTab === 3 && (
            <div className="p-4">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Booking Details
                </h2>

                {/* Journey Details */}
                <div className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-4 border border-orange-100">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FaRoad className="text-[#ff581b]" /> Journey Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">From:</span>
                      <span className="font-medium">{fromLocationFull}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">To:</span>
                      <span className="font-medium">{toLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium">
                        {formatDate(selectedDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium">
                        {formatTime(selectedTime)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Route Details */}
                {selectedRoute && (
                  <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-4 border border-blue-100">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaBus className="text-[#ff581b]" /> Route Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bus Name:</span>
                        <span className="font-medium">
                          {selectedRoute.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span>{selectedRoute.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span>{selectedRoute.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Available Seats:</span>
                        <span>{selectedRoute.seats}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Point */}
                {selectedDeliveryPoint && (
                  <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-4 border border-green-100">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#ff581b]" />{" "}
                      Delivery/Boarding Point
                    </h3>
                    <div className="text-sm">
                      <div className="font-medium">
                        {selectedDeliveryPoint.name}
                      </div>
                      <div className="text-gray-500 mt-1">
                        {selectedDeliveryPoint.address}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        📍 {selectedDeliveryPoint.distance} from city center
                      </div>
                    </div>
                  </div>
                )}
                {/* Action Buttons */}
                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setActiveTab(2)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                  <div
                    onClick={handleConfirmBooking}
                    className="px-6 py-2.5 bg-[#ff581b] text-white rounded-lg hover:bg-[#e04e16] transition flex items-center gap-2"
                  >
                    <FaCheckCircle /> Confirm Booking
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SelectionProcess;
