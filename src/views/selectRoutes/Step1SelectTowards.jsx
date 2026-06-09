"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BannerCarousel from "./BannerCarousel";
import SearchInput from "./SearchInput";
import DateTimePill from "./DateTimePill";
import { BANNERS } from "./constants";
import {
  selectRouteSearch,
  selectTowardsLocation,
  setJourneyDate,
  setJourneyTime,
  setPickupLocation,
  setRouteSearchError,
  setRouteSearchLoading,
  setRouteSearchQuery,
  setRouteSearchResults,
  setTowardsLocation,
} from "@/redux/delivery/deliverySlice";
import {
  normalizeErrorMessage,
  searchRouteDestinations,
} from "../../../utils/deliveryApi";
import { FiBell, FiShoppingCart } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const formatDate = (date) => {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (date) => {
  if (!date) return "";
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};

const getMinimumAllowedTime = (targetDate) => {
  const selectedDateObj = new Date(targetDate);
  const now = new Date();
  const minimumTime = new Date(now.getTime() + 60 * 60 * 1000);

  if (selectedDateObj.toDateString() !== now.toDateString()) {
    const nextDayMinimum = new Date(selectedDateObj);
    nextDayMinimum.setHours(6, 0, 0, 0);
    return nextDayMinimum;
  }

  minimumTime.setSeconds(0, 0);
  return minimumTime;
};

const getDestinationKey = (item) =>
  item?.id || item?.destination || item?.name || "";

export default function Step1SelectTowards({
  selDest,
  onSelectDest,
  onNext,
  onTimeAutoUpdated,
}) {
  const dispatch = useDispatch();
  const routeSearch = useSelector(selectRouteSearch);
  const towardsLocation = useSelector(selectTowardsLocation);
  const [query, setQuery] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [fromLocationDetailed, setFromLocationDetailed] = useState("");
  const [pickupCoordinates, setPickupCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [pickupAddressMeta, setPickupAddressMeta] = useState({
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedTime, setSelectedTime] = useState(() =>
    getMinimumAllowedTime(new Date()),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const hasAutoDetectedLocation = useRef(false);
  const searchContainerRef = useRef(null);

  const formattedDate = formatDate(selectedDate);
  const formattedTime = formatTime(selectedTime);
  const filtered = useMemo(() => {
    const suggestions = routeSearch?.suggestions || [];
    const searchText = query.trim().toLowerCase();
    if (!searchText) return suggestions;

    return suggestions.filter((item) => {
      const destinationName = (
        item.primaryText ||
        item.destination ||
        item.name ||
        ""
      ).toLowerCase();
      const location = (
        item.secondaryText ||
        item.origin ||
        item.location ||
        item.routeName ||
        ""
      ).toLowerCase();

      return (
        destinationName.includes(searchText) || location.includes(searchText)
      );
    });
  }, [query, routeSearch?.suggestions]);

  useEffect(() => {
    dispatch(
      setPickupLocation({
        fromLocation,
        fromLocationDetailed,
        currentLocation: fromLocationDetailed,
        coordinates: pickupCoordinates,
        city: pickupAddressMeta.city,
        state: pickupAddressMeta.state,
        pincode: pickupAddressMeta.pincode,
        landmark: pickupAddressMeta.landmark,
      }),
    );
  }, [
    dispatch,
    fromLocation,
    fromLocationDetailed,
    pickupAddressMeta.city,
    pickupAddressMeta.landmark,
    pickupAddressMeta.pincode,
    pickupAddressMeta.state,
    pickupCoordinates,
  ]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    dispatch(setJourneyDate({ date: selectedDate, formattedDate }));
  }, [dispatch, formattedDate, selectedDate]);

  useEffect(() => {
    dispatch(setJourneyTime({ time: selectedTime, formattedTime }));
  }, [dispatch, formattedTime, selectedTime]);

  useEffect(() => {
    const searchText = query.trim();

    dispatch(setRouteSearchQuery(searchText));

    if (searchText.length < 2) {
      dispatch(
        setRouteSearchResults({
          query: searchText,
          suggestions: [],
          matchedRoutes: [],
          matchedDeliveryPoints: [],
        }),
      );
      return;
    }

    const timeout = setTimeout(async () => {
      dispatch(setRouteSearchLoading(true));

      try {
        const result = await searchRouteDestinations({
          query: searchText,
          currentLocation: fromLocationDetailed || fromLocation,
          city: pickupAddressMeta.city,
          latitude: pickupCoordinates.lat,
          longitude: pickupCoordinates.lng,
        });

        dispatch(
          setRouteSearchResults({
            query: searchText,
            suggestions: result.suggestions,
            matchedRoutes: result.routes,
            matchedDeliveryPoints: result.deliveryPoints,
          }),
        );
      } catch (error) {
        dispatch(setRouteSearchError(normalizeErrorMessage(error)));
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [
    dispatch,
    fromLocation,
    fromLocationDetailed,
    pickupAddressMeta.city,
    pickupCoordinates.lat,
    pickupCoordinates.lng,
    query,
  ]);

  const reverseGeocode = async (lat, lng) => {
    try {
      // Use Google Maps Geocoding API for accurate results
      const GOOGLE_API_KEY =
        process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
        process.env.Next_GOOGLE_API_KEY ||
        "AIzaSyDfjw4P4PnfI08-B-ljZDhEeQxnBqNv3hQ";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      );

      if (!response.ok) throw new Error("Reverse geocoding failed");

      const data = await response.json();

      if (data.status !== "OK" || !data.results || data.results.length === 0) {
        throw new Error("No results found");
      }

      const result =
        data.results.find((item) =>
          item.address_components?.some((component) =>
            component.types?.includes("postal_code"),
          ),
        ) || data.results[0];
      const allAddressComponents = data.results.flatMap(
        (item) => item.address_components || [],
      );
      const addressComponents = result.address_components || [];
      const findComponent = (typesToFind, preferResult = true) => {
        const source = preferResult ? addressComponents : allAddressComponents;
        return source.find((component) =>
          typesToFind.some((type) => component.types?.includes(type)),
        )?.long_name;
      };

      // Extract components
      let road = "";
      let suburb = "";
      let city = "";
      let state = "";
      let postcode = "";

      road = findComponent(["route", "street_address"]) || "";
      suburb =
        findComponent([
          "neighborhood",
          "sublocality",
          "sublocality_level_1",
          "sublocality_level_2",
        ]) || "";
      city =
        findComponent([
          "locality",
          "postal_town",
          "administrative_area_level_3",
        ]) ||
        findComponent(
          ["locality", "postal_town", "administrative_area_level_3"],
          false,
        ) ||
        "";
      state =
        findComponent(["administrative_area_level_1"]) ||
        findComponent(["administrative_area_level_1"], false) ||
        "";
      postcode =
        findComponent(["postal_code"]) ||
        findComponent(["postal_code"], false) ||
        "";

      // Clean up pincode - remove spaces and extra characters
      if (postcode) {
        postcode = postcode.replace(/\s+/g, "").replace(/[^0-9]/g, "");
      }

      // Build a readable address
      const addressParts = [road, suburb, city, state, postcode].filter(
        Boolean,
      );
      const formattedAddress =
        result.formatted_address ||
        addressParts.join(", ") ||
        `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

      return {
        fromLocation: city || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        fromLocationDetailed: formattedAddress,
        city: city,
        state: state,
        pincode: postcode,
        landmark: road,
      };
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      return {
        fromLocation: fallback,
        fromLocationDetailed: fallback,
        city: "",
        state: "",
        pincode: "",
        landmark: "",
      };
    }
  };

  const fetchCurrentLocation = async () => {
    setLocationError("");

    if (!navigator?.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const coordinateLocation = `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;

        setPickupCoordinates(coords);
        setFromLocation("Current Location");
        setFromLocationDetailed(coordinateLocation);
        setPickupAddressMeta({
          city: "",
          state: "",
          pincode: "",
          landmark: "",
        });

        // Reverse geocode to get actual address
        const addressData = await reverseGeocode(coords.lat, coords.lng);

        setFromLocation(addressData.fromLocation);
        setFromLocationDetailed(addressData.fromLocationDetailed);
        setPickupAddressMeta({
          city: addressData.city,
          state: addressData.state,
          pincode: addressData.pincode,
          landmark: addressData.landmark,
        });
        setLocationLoading(false);
      },
      (error) => {
        setLocationError(
          error?.code === error?.PERMISSION_DENIED
            ? "Location access denied. Please allow location access."
            : "Unable to fetch your current location. Please try again.",
        );
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 30000,
      },
    );
  };

  useEffect(() => {
    if (hasAutoDetectedLocation.current) return undefined;

    const timeout = window.setTimeout(() => {
      hasAutoDetectedLocation.current = true;
      fetchCurrentLocation();
    }, 0);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectDestination = (destination) => {
    const selectedName =
      destination.primaryText ||
      destination.destination ||
      destination.name ||
      "";

    setQuery(selectedName);
    dispatch(setTowardsLocation(selectedName));
    onSelectDest(destination);
    setIsDropdownOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    dispatch(setTowardsLocation(""));
    onSelectDest(null);
    setIsDropdownOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedTime) {
      const minimumTime = getMinimumAllowedTime(date);
      const timeForDate = new Date(date);
      timeForDate.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0,
      );

      if (timeForDate < minimumTime) {
        setSelectedTime(minimumTime);
        onTimeAutoUpdated?.(minimumTime);
        showToast(
          `Selected time is too early. We updated it to ${formatTime(minimumTime)} so it is at least 1 hour from now.`,
          true,
        );
      }
    }
  };

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleInvalidTime = () => {
    const minimumTime = getMinimumAllowedTime(selectedDate || new Date());
    setSelectedTime(minimumTime);
    onTimeAutoUpdated?.(minimumTime);
    showToast(
      `Selected time is too early. We updated it to ${formatTime(minimumTime)} so it is at least 1 hour from now.`,
      true,
    );
  };

  const handleInputFocus = () => {
    if (query.trim().length >= 2 && filtered.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleInputChange = (value) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  // Sync query with towardsLocation from Redux when modal opens
  useEffect(() => {
    if (towardsLocation && towardsLocation !== "") {
      setQuery(towardsLocation);
    }
  }, [towardsLocation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="sm:hidden block">
        <header className="bg-white  shadow-2xl w-full px-4 py-3 flex items-center justify-between border-b border-gray-200">
          {/* Left Side */}
          <div className="flex items-center gap-2">
            <div className="mt-[-2px]">
              <IoLocationOutline className="text-[#E6B800] text-[24px]" />
            </div>

            <div className="leading-none">
              <h1 className="font-bold text-[18px]">
                <span className="text-[#222]">Food</span>
                <span className="text-[#F57C00]">Side</span>
              </h1>

              <p className="text-[12px] text-gray-400 mt-1 truncate max-w-[190px]">
                {locationLoading
                  ? "Detecting your location..."
                  : fromLocation || "Location unavailable"}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            <button className="relative">
              <FiBell className="text-[24px] text-[#222]" />
            </button>

            <button className="relative">
              <FiShoppingCart className="text-[24px] text-[#222]" />
            </button>
          </div>
        </header>
      </div>

      <div className="flex flex-col gap-3 h-full min-h-0 sm:mt-0 mt-2 p-2">
        <div className="">
          <BannerCarousel banners={BANNERS} />
        </div>
        <div className="flex flex-col gap-3 md:mt-0 mt-2 sm:border-0 border border-gray-200 sm:p-0 p-4 rounded-xl">
          <div className="flex items-start gap-2.5 border border-gray-200 rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3 bg-white">
            <svg
              className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 leading-tight break-words">
                {locationLoading
                  ? "Detecting your location..."
                  : fromLocation || "Location unavailable"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 break-words">
                {fromLocationDetailed ||
                  "Allow location access to detect your current location."}
              </p>
              {(pickupAddressMeta.city ||
                pickupAddressMeta.state ||
                pickupAddressMeta.pincode) && (
                <p className="text-[11px] text-gray-500 mt-1 break-words">
                  {[
                    pickupAddressMeta.city,
                    pickupAddressMeta.state,
                    pickupAddressMeta.pincode,
                  ]
                    .filter(Boolean)
                    .join(" - ")}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={fetchCurrentLocation}
              disabled={locationLoading}
              className="flex-shrink-0 mt-0.5 disabled:opacity-50"
            >
              <svg
                className="w-4 h-4 text-[#ff581b] cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h5M20 20v-5h-5M4.07 9a8 8 0 0114.14 0M19.93 15A8 8 0 015.79 15"
                />
              </svg>
            </button>
          </div>

          {locationError && (
            <p className="text-xs font-medium text-red-500 px-1">
              {locationError}
            </p>
          )}

          <div ref={searchContainerRef} className="relative">
            <SearchInput
              value={query}
              onChange={handleInputChange}
              onClear={handleClear}
              placeholder="Enter destination towards..."
              loading={routeSearch?.loading}
              onFocus={handleInputFocus}
            />

            {/* Custom Absolute Dropdown */}
            {isDropdownOpen && query.trim().length >= 2 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="max-h-80 overflow-y-auto custom-dropdown-scroll">
                  {routeSearch?.error ? (
                    <div className="flex flex-col items-center justify-center py-8 text-red-400 gap-2">
                      <p className="text-sm">{routeSearch.error}</p>
                    </div>
                  ) : filtered.length === 0 && !routeSearch?.loading ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
                      <svg
                        className="w-8 h-8 opacity-40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p className="text-sm">
                        No destinations found for &quot;{query}&quot;
                      </p>
                    </div>
                  ) : routeSearch?.loading ? (
                    <div className="flex items-center justify-center py-8">
                      <svg
                        className="w-6 h-6 animate-spin text-[#ff581b]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    filtered.map((d, index) => {
                      const itemKey =
                        d.id || d.routeId || d.destination || d.name || index;
                      const itemName = d.primaryText || d.destination || d.name;
                      const itemLocation =
                        d.secondaryText ||
                        d.origin ||
                        d.location ||
                        d.routeName ||
                        "Matching route";
                      const routeCount = d.routeCount || d.routes || "";
                      const isSelected =
                        getDestinationKey(selDest) === getDestinationKey(d);

                      return (
                        <button
                          key={itemKey}
                          onClick={() => handleSelectDestination(d)}
                          className={`w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 border-b border-gray-50 text-left transition-all duration-150
                        ${
                          isSelected
                            ? "bg-orange-50/60"
                            : "bg-white hover:bg-orange-50/30"
                        }
                      `}
                        >
                          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-4 h-4 text-[#ff581b]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {itemName}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                              {itemLocation}
                            </p>
                          </div>
                          <span className="hidden sm:inline text-xs text-[#ff581b] font-medium whitespace-nowrap">
                            {routeCount ? `${routeCount} routes` : ""}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${isSelected ? "border-[#ff581b]" : "border-gray-300"}
                      `}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-[#ff581b]" />
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          <DateTimePill
            date={selectedDate}
            time={selectedTime}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            onInvalidTime={handleInvalidTime}
            formattedDate={formattedDate}
            formattedTime={formattedTime}
          />

          <div className="flex gap-3 mt-4 md:hidden">
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={!selDest || !selectedDate || !selectedTime}
                className="flex-1 rounded-xl bg-[#ff581b] px-5 py-3 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#e04d16] disabled:bg-orange-200 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-in-from-top-2 {
          from {
            transform: translateY(-2px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 0.2s;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
        
        .slide-in-from-top-2 {
          animation-name: slide-in-from-top-2;
        }
        
        .custom-dropdown-scroll::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-dropdown-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-dropdown-scroll::-webkit-scrollbar-thumb {
          background: #ff581b;
          border-radius: 10px;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      </div>
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[1000000] rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.isError ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{toast.isError ? "!" : "OK"}</span>
            <span>{toast.message}</span>
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
    </>
  );
}
