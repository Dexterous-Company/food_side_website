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
} from "react-icons/fa";
import { MdSwapHoriz } from "react-icons/md";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import { CalendarOutlined } from "@ant-design/icons";
import { FaClock } from "react-icons/fa";

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

const SelectionProcess = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [fromLocationFull, setFromLocationFull] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const toRef = useRef(null);

  const formatDate = (date) => {
    if (!date) return "";
    return date.format("DD MMM YYYY");
  };

  const formatTime = (time) => {
    if (!time) return "Select Time";
    return time.format("hh:mm A");
  };

  // Get address from coordinates using Google Geocoding API
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

  // Fetch current location using browser geolocation
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

  // Filter dummy destinations for "To" field (no API calls)
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

  const handleSearch = () => {
    if (!fromLocation) {
      setLocationError("Please enter your origin city");
      return;
    }

    if (!toLocation) {
      alert("Please enter your destination");
      return;
    }

    alert(
      `Searching buses from ${fromLocation} to ${toLocation} on ${formatDate(selectedDate)} at ${formatTime(selectedTime)}`,
    );
  };

  // Disable past dates
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  // Disable times that are less than 1 hour from current time
  const disabledTime = () => {
    const now = dayjs();
    const oneHourLater = now.add(1, "hour");
    const oneHourLaterHour = oneHourLater.hour();
    const oneHourLaterMinute = oneHourLater.minute();

    const isToday = selectedDate.isSame(now, "day");

    if (isToday) {
      return {
        disabledHours: () => {
          const disabledHoursArray = [];
          for (let i = 0; i < oneHourLaterHour; i++) {
            disabledHoursArray.push(i);
          }
          return disabledHoursArray;
        },
        disabledMinutes: (hour) => {
          if (hour === oneHourLaterHour) {
            const disabledMinutesArray = [];
            for (let i = 0; i <= oneHourLaterMinute; i++) {
              disabledMinutesArray.push(i);
            }
            return disabledMinutesArray;
          }
          return [];
        },
      };
    }
    return {};
  };

  // Custom validation when selecting time
  const handleTimeChange = (time) => {
    if (!time) return;

    const now = dayjs();
    const selectedDateTime = selectedDate
      .hour(time.hour())
      .minute(time.minute())
      .second(0);

    const oneHourLater = now.add(1, "hour");

    if (selectedDateTime.isBefore(oneHourLater)) {
      alert("Please select a time at least 1 hour from now");
      return;
    }

    setSelectedTime(time);
  };

  return (
    <section className="w-full bg-[#f4f6f8] py-4 px-3 font-['Inter',system-ui,sans-serif]">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-2xl shadow-md">
          {/* Header - Tab Buttons */}
          <div className="flex flex-wrap items-center gap-5 px-4 md:px-6 py-3 border-b border-gray-100">
            <button className="relative flex items-center gap-2 group">
              <FaBus className="text-[#d84e55] text-[16px]" />
              <span className="font-semibold text-[13px] text-gray-900">
                Buses
              </span>
              <div className="absolute -bottom-[13px] left-0 w-full h-[3px] bg-[#d84e55] rounded-full" />
            </button>
            <button className="flex items-center gap-2 group hover:opacity-80 transition">
              <FaPlane className="text-gray-500 text-[16px]" />
              <span className="text-[13px] text-gray-600">Flights</span>
            </button>
            <button className="flex items-center gap-2 group hover:opacity-80 transition">
              <FaTrain className="text-gray-500 text-[16px]" />
              <span className="text-[13px] text-gray-600">Trains</span>
            </button>
            <button className="flex items-center gap-2 group hover:opacity-80 transition">
              <FaHotel className="text-gray-500 text-[16px]" />
              <span className="text-[13px] text-gray-600">Hotels</span>
            </button>
            <div className="hidden xl:block ml-auto text-[12px] font-medium text-gray-700">
              India's Fastest Bus Ticket Booking Platform
            </div>
          </div>

          {/* Desktop View - Exact layout like image */}
          <div className="hidden lg:block p-4">
            <div className="relative flex items-stretch border border-gray-200 rounded-xl bg-white overflow-hidden">
              {/* From Location */}
              <div className="flex-1 bg-[#fafafa] px-4 py-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500 text-[14px]" />
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

              {/* Swap Button Positioned Exactly */}
              <div className="absolute left-[32.4%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
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
                    onChange={(e) => {
                      setToLocation(e.target.value);
                    }}
                    onFocus={() => {
                      if (toLocation) {
                        const filtered = DUMMY_DESTINATIONS.filter((dest) =>
                          dest.toLowerCase().includes(toLocation.toLowerCase()),
                        );
                        setToSuggestions(filtered);
                      } else {
                        setToSuggestions(DUMMY_DESTINATIONS);
                      }
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
              <button
                onClick={handleSearch}
                className="w-[140px] bg-[#ff581b] hover:bg-[#e04e16] text-white font-semibold text-[14px] transition-colors flex items-center justify-center gap-2"
              >
                Search →
              </button>
            </div>
          </div>

          {/* Mobile View - Responsive */}
          <div className="lg:hidden p-4">
            <div className="space-y-3">
              {/* From Location */}
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

              {/* Swap Button */}
              <div className="flex justify-center -my-1">
                <button
                  onClick={handleSwapLocations}
                  className="w-8 h-8 rounded-full border bg-white shadow-md flex items-center justify-center"
                >
                  <MdSwapHoriz className="text-[18px]" />
                </button>
              </div>

              {/* To Location */}
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

              {/* Date Picker Mobile */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
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

              {/* Time Picker Mobile */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <TimePicker
                  value={selectedTime}
                  onChange={handleTimeChange}
                  format="hh:mm A"
                  placeholder="Departure Time"
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

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full h-12 rounded-lg bg-[#ff581b] text-white text-[15px] font-semibold hover:bg-[#e04e16] transition"
              >
                Search →
              </button>

              {/* Location Utilities */}
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
              {!locationError && fromLocationFull && !isLoadingLocation && (
                <p className="text-green-600 text-[11px] text-center break-words">
                  ✓{" "}
                  {fromLocationFull.length > 50
                    ? fromLocationFull.substring(0, 50) + "..."
                    : fromLocationFull}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectionProcess;
