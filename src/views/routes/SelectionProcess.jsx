"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AutoComplete, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeftRight,
  ArrowRight,
  ShieldCheck,
  Compass,
  MapPin,
  Map,
  Package,
  Navigation,
  X,
  Clock,
} from "lucide-react";

import {
  setJourneyDate,
  setJourneyTime,
  setPickupLocation,
  setRouteSearchError,
  setRouteSearchLoading,
  setRouteSearchQuery,
  setRouteSearchResults,
  setTowardsLocation,
  setSelectedDeliveryPoint as reduxSetSelectedDeliveryPoint,
  setSelectedRoute as reduxSetSelectedRoute,
  setMapViewModalOpen,
} from "@/redux/delivery/deliverySlice";
import {
  normalizeErrorMessage,
  searchRouteDestinations,
} from "../../../utils/deliveryApi";

import MapViewModal from "./MapViewModal";

import "antd/dist/reset.css";

// Helper functions
const formatDate = (date) => {
  if (!date) return "";
  return date.format("DD MMM YYYY");
};

const formatTime = (date) => {
  if (!date) return "";
  return date.format("hh:mm A");
};

const getDestinationKey = (item) =>
  item?.id || item?.destination || item?.name || "";

const getRouteKey = (route) => route?._id || route?.id || route?.routeId || "";
const getPointKey = (point) => point?._id || point?.id || "";

const normalizeRouteKey = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const isValidRouteValue = (value) => {
  if (value === null || value === undefined) return false;
  const normalizedValue = normalizeRouteKey(value);
  return normalizedValue !== "" && normalizedValue !== "0";
};

const getPointRouteIds = (point) => {
  if (Array.isArray(point?.routeId)) {
    return point.routeId
      .flatMap((item) => {
        if (typeof item === "string") return [item];
        if (!item || typeof item !== "object") return [];
        return [item.routeId, item.rootIdName, item.name, item._id].filter(
          Boolean,
        );
      })
      .map(normalizeRouteKey)
      .filter(isValidRouteValue);
  }

  if (point?.routeId && typeof point.routeId === "object") {
    return [
      point.routeId.routeId,
      point.routeId.rootIdName,
      point.routeId.name,
      point.routeId._id,
    ]
      .filter(Boolean)
      .map(normalizeRouteKey)
      .filter(isValidRouteValue);
  }

  if (typeof point?.routeId === "string") {
    return isValidRouteValue(point.routeId)
      ? [normalizeRouteKey(point.routeId)]
      : [];
  }

  return [];
};

const filterDeliveryPointsForRoute = (points, route) => {
  if (!route) return [];

  const selectedRouteKeys = [
    route.routeId,
    route._id,
    route.id,
    route.name,
    route.rootIdName,
  ]
    .filter(isValidRouteValue)
    .map(normalizeRouteKey)
    .filter(isValidRouteValue);

  return (Array.isArray(points) ? points : [])
    .filter((point) => {
      if (point?.status?.isActive === false) return false;
      if (selectedRouteKeys.length === 0) return true;

      const pointRouteIds = getPointRouteIds(point);
      return pointRouteIds.some((routeId) =>
        selectedRouteKeys.includes(routeId),
      );
    })
    .sort(
      (firstPoint, secondPoint) =>
        (firstPoint.sequenceOrder ?? firstPoint.estimatedTimeFromStart ?? 0) -
        (secondPoint.sequenceOrder ?? secondPoint.estimatedTimeFromStart ?? 0),
    );
};

// Get minimum allowed time based on selected date
const getMinimumAllowedTime = (selectedDate) => {
  const now = dayjs();
  const selectedDateTime = dayjs(selectedDate);
  
  // If selected date is today, minimum time is 1 hour from now
  if (selectedDateTime.isSame(now, 'day')) {
    return now.add(1, "hour");
  }
  // If selected date is tomorrow or future, minimum time is 00:00 of that day
  else {
    return selectedDateTime.startOf('day');
  }
};

// Get available time options based on selected date
const getAvailableTimeOptions = (selectedDate) => {
  const now = dayjs();
  const selectedDateTime = dayjs(selectedDate);
  const minTime = getMinimumAllowedTime(selectedDate);
  
  const timeOptions = [];
  
  // Generate time slots for the day
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 15, 30, 45]) {
      const timeValue = dayjs(selectedDate).hour(hour).minute(minute).second(0);
      
      // Check if this time slot is valid (not before minimum time)
      if (timeValue.isBefore(minTime)) {
        continue;
      }
      
      const hour12 = hour % 12 || 12;
      const period = hour >= 12 ? "PM" : "AM";
      const timeString = `${hour12.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
      
      timeOptions.push({
        value: timeString,
        label: timeString,
        hour: hour,
        minute: minute,
        displayValue: `${hour12}:${minute.toString().padStart(2, "0")} ${period}`
      });
    }
  }
  
  return timeOptions;
};

// Custom Time Dropdown Component
const CustomTimeDropdown = ({ value, onChange, options, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const selectedOption = options.find(opt => opt.value === value?.format("hh:mm A"));
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm flex items-center justify-between cursor-pointer ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "hover:border-[#ff581b]"
        } focus:outline-none focus:ring-2 focus:ring-[#ff581b] focus:border-transparent`}
      >
        <span className={!selectedOption ? "text-gray-400" : "text-gray-700"}>
          {selectedOption ? selectedOption.displayValue : "Select Time"}
        </span>
        <Clock size={16} className="text-gray-400" />
      </div>
      
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${
                  selectedOption?.value === option.value ? "bg-orange-50 text-[#ff581b]" : "text-gray-700"
                }`}
              >
                {option.displayValue}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              No available times
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function BusSearch() {
  const dispatch = useDispatch();
  const routeSearch = useSelector((state) => state.delivery.routeSearch);
  const towardsLocation = useSelector(
    (state) => state.delivery.towardsLocation,
  );

  const [activeTab, setActiveTab] = useState("towards");

  // Step 1 State
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [departureTime, setDepartureTime] = useState(() => {
    // Initialize with 1 hour from now for today
    return dayjs().add(1, "hour");
  });
  const [availableTimeOptions, setAvailableTimeOptions] = useState([]);
  const searchContainerRef = useRef(null);

  // Location detection state
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const hasAutoDetectedLocation = useRef(false);

  // Step 2 State
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showRouteDropdown, setShowRouteDropdown] = useState(false);
  const [selectedDeliveryPoint, setSelectedDeliveryPoint] = useState(null);
  const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [mapRoutes, setMapRoutes] = useState([]);
  const [mapLoading, setMapLoading] = useState(false);
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  // Dispatch modal state to Redux when showMapView changes
  useEffect(() => {
    dispatch(setMapViewModalOpen(showMapView));
  }, [showMapView, dispatch]);

  // Toast state
  const [toast, setToast] = useState(null);

  // Get dynamic data from Redux
  const allRoutesFromApi = routeSearch?.matchedRoutes || [];
  const allDeliveryPoints = routeSearch?.matchedDeliveryPoints || [];

  // Filter routes based on selected destination (towards)
  const routes = to
    ? allRoutesFromApi.filter((route) => {
        const routeName = (
          route.name ||
          route.destination ||
          route.routeId ||
          ""
        ).toLowerCase();
        const routeOrigin = (route.origin || "").toLowerCase();
        const destination = to.toLowerCase();
        return (
          routeName.includes(destination) || routeOrigin.includes(destination)
        );
      })
    : allRoutesFromApi;

  // Filter delivery points based on selected route
  const deliveryPoints = selectedRoute
    ? filterDeliveryPointsForRoute(allDeliveryPoints, selectedRoute)
    : [];

  const tabs = [
    { key: "towards", label: "Select Towards", icon: Compass },
    { key: "route", label: "Select Route", icon: MapPin },
  ];

  // Update available time options when date changes
  useEffect(() => {
    const options = getAvailableTimeOptions(departureDate);
    setAvailableTimeOptions(options);
    
    // Adjust time if current time is not valid for the new date
    const currentTimeValue = dayjs(departureDate)
      .hour(departureTime.hour())
      .minute(departureTime.minute())
      .second(0);
    
    const minTime = getMinimumAllowedTime(departureDate);
    
    if (currentTimeValue.isBefore(minTime)) {
      // Set to the first available time option
      if (options.length > 0) {
        const firstOption = options[0];
        setDepartureTime(
          dayjs(departureDate).hour(firstOption.hour).minute(firstOption.minute)
        );
      } else {
        // If no options available (shouldn't happen), set to min time
        setDepartureTime(minTime);
      }
    }
  }, [departureDate]);

  // Reverse geocoding to get address from coordinates
  const reverseGeocode = async (lat, lng) => {
    try {
      const GOOGLE_API_KEY =
        process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
        "AIzaSyDfjw4P4PnfI08-B-ljZDhEeQxnBqNv3hQ";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      );

      if (!response.ok) throw new Error("Reverse geocoding failed");
      const data = await response.json();

      if (data.status !== "OK" || !data.results || data.results.length === 0) {
        throw new Error("No results found");
      }

      const result = data.results[0];
      const addressComponents = result.address_components || [];

      const findComponent = (typesToFind) => {
        return addressComponents.find((component) =>
          typesToFind.some((type) => component.types?.includes(type)),
        )?.long_name;
      };

      const city =
        findComponent([
          "locality",
          "postal_town",
          "administrative_area_level_3",
        ]) || "";
      const area = findComponent(["sublocality_level_1", "neighborhood"]) || "";
      const formattedAddress = result.formatted_address;

      return {
        city: city || area,
        fullAddress: formattedAddress,
        lat,
        lng,
      };
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return {
        city: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        fullAddress: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        lat,
        lng,
      };
    }
  };

  // Get current location
  const fetchCurrentLocation = useCallback(async () => {
    setLocationLoading(true);
    setLocationError("");

    if (!navigator?.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCurrentLocation(coords);

        // Reverse geocode to get address
        const addressData = await reverseGeocode(coords.lat, coords.lng);

        // Set the from location with the detected address
        setFrom(addressData.city || addressData.fullAddress);

        // Dispatch to Redux with serializable data only
        dispatch(
          setPickupLocation({
            fromLocation: addressData.city || addressData.fullAddress,
            fromLocationDetailed: addressData.fullAddress,
            coordinates: { lat: coords.lat, lng: coords.lng },
            city: addressData.city,
          }),
        );

        setLocationLoading(false);

        // Show success toast
        showToast(
          `Location detected: ${addressData.city || addressData.fullAddress}`,
          false,
        );
      },
      (error) => {
        console.error("Location error:", error);
        let errorMessage = "Unable to fetch your current location.";

        if (error.code === error.PERMISSION_DENIED) {
          errorMessage =
            "Location access denied. Please enable location access.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timed out. Please try again.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location unavailable. Please enter manually.";
        }

        setLocationError(errorMessage);
        setLocationLoading(false);
        showToast(errorMessage, true);

        // Set default location
        setFrom("Select your location");
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }, [dispatch]);

  // Auto detect location on mount
  useEffect(() => {
    if (hasAutoDetectedLocation.current) return;

    const timer = setTimeout(() => {
      hasAutoDetectedLocation.current = true;
      fetchCurrentLocation();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchCurrentLocation]);

  // Time validation
  const isTimeValid = useCallback(() => {
    const selectedDateTime = dayjs(departureDate)
      .hour(departureTime.hour())
      .minute(departureTime.minute())
      .second(0);

    const minTime = getMinimumAllowedTime(departureDate);
    return (
      selectedDateTime.isAfter(minTime) || selectedDateTime.isSame(minTime)
    );
  }, [departureDate, departureTime]);

  // Handle date change (including clear/reset)
  const handleDateChange = (date) => {
    if (!date) {
      // If date is cleared, set to today's date
      const today = dayjs();
      setDepartureDate(today);
      
      // Set time to 1 hour from now for today
      const oneHourFromNow = dayjs().add(1, "hour");
      setDepartureTime(oneHourFromNow);
    } else {
      setDepartureDate(date);
    }
  };

  // Handle time change from custom dropdown
  const handleTimeChange = (selectedOption) => {
    if (selectedOption) {
      setDepartureTime(
        dayjs(departureDate).hour(selectedOption.hour).minute(selectedOption.minute)
      );
    }
  };

  // Sync date and time to Redux whenever they change
  useEffect(() => {
    const combinedDateTime = dayjs(departureDate)
      .hour(departureTime.hour())
      .minute(departureTime.minute())
      .second(0);
    
    const formattedDate = departureDate.format('DD MMM YYYY');
    const formattedTime = combinedDateTime.format('hh:mm A');
    
    console.log('Dispatching date to Redux:', { date: departureDate.toDate(), formattedDate });
    console.log('Dispatching time to Redux:', { time: combinedDateTime.toDate(), formattedTime });
    
    dispatch(setJourneyDate({ date: departureDate.toDate(), formattedDate }));
    dispatch(setJourneyTime({ time: combinedDateTime.toDate(), formattedTime }));
  }, [departureDate, departureTime, dispatch]);

  const validateAndShowWarning = useCallback(() => {
    if (!isTimeValid()) {
      const minTime = getMinimumAllowedTime(departureDate);
      const formattedMinTime = minTime.format('hh:mm A');
      showToast(`Please select a time after ${formattedMinTime} for ${departureDate.format('DD MMM YYYY')}`, true);
      return false;
    }
    return true;
  }, [isTimeValid, departureDate]);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const searchPlaces = (value, type) => {
    if (!value || !window.google) return;

    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      {
        input: value,
        types: ["(cities)"],
        componentRestrictions: {
          country: "in",
        },
      },
      (predictions) => {
        const options =
          predictions?.map((item) => ({
            value: item.description,
          })) || [];

        if (type === "from") {
          setFromOptions(options);
        } else {
          setToOptions(options);
        }
      },
    );
  };

  // Search destinations API call
  useEffect(() => {
    const searchText = to.trim();
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
          currentLocation: from,
          latitude: currentLocation?.lat,
          longitude: currentLocation?.lng,
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
      } finally {
        dispatch(setRouteSearchLoading(false));
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [dispatch, from, to, currentLocation]);

  // Sync to with towardsLocation
  useEffect(() => {
    if (towardsLocation && towardsLocation !== "") {
      setTo(towardsLocation);
    }
  }, [towardsLocation]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowDestinationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    // Validate leaving from (source) is selected
    if (!from || from.trim() === "" || from === "Select your location") {
      showToast("Please detect your location or enter a source location (Leaving From)", true);
      return;
    }

    // Validate towards (destination) is selected
    if (!to || to.trim() === "") {
      showToast("Please select a destination (Going To)", true);
      return;
    }

    if (!validateAndShowWarning()) {
      return;
    }

    const combinedDateTime = dayjs(departureDate)
      .hour(departureTime.hour())
      .minute(departureTime.minute())
      .second(departureTime.second());

    console.log({
      from,
      to,
      date: departureDate.format("YYYY-MM-DD"),
      time: departureTime.format("HH:mm:ss"),
      departure: combinedDateTime.format("YYYY-MM-DD HH:mm:ss"),
    });

    dispatch(setTowardsLocation(to));
    setActiveTab("route");
  };

  const handleSelectDestination = (destination) => {
    setTo(destination.name);
    dispatch(setTowardsLocation(destination.name));
    setShowDestinationDropdown(false);
  };

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setSelectedDeliveryPoint(null);
  };

  const handleSelectDeliveryPoint = (point) => {
    console.log("Selected delivery point:", point);
    setSelectedDeliveryPoint(point);
  };

  const handleCompleteBooking = () => {
    if (!validateAndShowWarning()) {
      return;
    }

    if (selectedRoute && selectedDeliveryPoint) {
      const combinedDateTime = dayjs(departureDate)
        .hour(departureTime.hour())
        .minute(departureTime.minute())
        .second(departureTime.second());

      console.log({
        from,
        to,
        route: selectedRoute,
        deliveryPoint: selectedDeliveryPoint,
        date: departureDate.format("YYYY-MM-DD"),
        time: departureTime.format("HH:mm:ss"),
        departure: combinedDateTime.format("YYYY-MM-DD HH:mm:ss"),
        currentLocation: currentLocation,
      });

      // Ensure delivery point has _id for Redux
      const deliveryPointWithId = {
        ...selectedDeliveryPoint,
        _id: selectedDeliveryPoint._id || selectedDeliveryPoint.id,
      };

      console.log("Dispatching delivery point to Redux:", deliveryPointWithId);
      console.log("Full delivery point object:", selectedDeliveryPoint);
      console.log("deliveryPointWithId._id:", deliveryPointWithId._id);
      console.log("Selected route:", selectedRoute);

      // Save selected route to Redux
      dispatch(reduxSetSelectedRoute(selectedRoute));

      // Save selected delivery point to Redux so RestaurantsMainPage can fetch restaurants
      dispatch(reduxSetSelectedDeliveryPoint(deliveryPointWithId));

      showToast("Selection completed successfully!", false);

      // Scroll to RestaurantsMainPage to show restaurants
      setTimeout(() => {
        const restaurantsSection = document.getElementById("restaurants-main");
        if (restaurantsSection) {
          restaurantsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 800);
    } else {
      showToast("Please select both route and delivery point", true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full bg-white rounded-2xl shadow-2xl">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-25 right-4 z-[999999] rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.isError ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="rounded-2xl bg-white shadow-2xl border p-4">
        {/* Top Navigation - ONLY 2 TABS */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-1 rounded-lg px-3 py-2 transition-all ${
                    activeTab === tab.key
                      ? "bg-red-50 text-[#ff581b]"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {activeTab === tab.key && (
                    <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#ff581b]" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-sm font-semibold text-gray-900">
            India's fastest and most convenient food Side platform
          </p>
        </div>

        {/* TAB 1: Select Towards */}
        {activeTab === "towards" && (
          <>
            {/* Desktop Layout - Single Row */}
            <div className="hidden md:flex relative rounded-xl border border-gray-200">
              {/* Leaving From - with location detection */}
              <div className="flex-1 border-r-3 border-r-white bg-gray-50 px-3 py-2">
                <div className="mb-1 text-[10px] font-semibold text-gray-500 flex items-center justify-between">
                  <span>Leaving From</span>
                  <button
                    onClick={fetchCurrentLocation}
                    disabled={locationLoading}
                    className="flex items-center gap-1 text-[#ff581b] hover:text-[#ff4510] transition-colors"
                  >
                    <Navigation size={12} />
                    <span className="text-[9px]">
                      {locationLoading ? "Detecting..." : "Detect"}
                    </span>
                  </button>
                </div>
                <AutoComplete
                  value={from}
                  options={fromOptions}
                  onSearch={(v) => searchPlaces(v, "from")}
                  onChange={setFrom}
                  placeholder={
                    locationLoading
                      ? "Detecting your location..."
                      : "Source City"
                  }
                  className="w-full"
                />
                {locationError && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {locationError}
                  </p>
                )}
              </div>

              {/* Going To */}
              <div
                ref={searchContainerRef}
                className="flex-1 bg-gray-50 px-3 py-2 relative"
              >
                <div className="mb-1 text-[10px] font-semibold text-gray-500">
                  Going To
                </div>
                <AutoComplete
                  value={to}
                  options={toOptions}
                  onSearch={(v) => {
                    searchPlaces(v, "to");
                    if (v.length > 0) {
                      setShowDestinationDropdown(true);
                    }
                  }}
                  onChange={(value) => {
                    setTo(value);
                  }}
                  onFocus={() => {
                    if (routeSearch?.suggestions?.length > 0) {
                      setShowDestinationDropdown(true);
                    }
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowDestinationDropdown(false), 200)
                  }
                  placeholder="Destination City"
                  className="w-full"
                />

                {/* Dynamic Destination Dropdown from API */}
                {showDestinationDropdown &&
                  routeSearch?.suggestions?.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                      {routeSearch.suggestions.map((dest) => (
                        <div
                          key={getDestinationKey(dest)}
                          onMouseDown={() => {
                            const destName =
                              dest.primaryText || dest.destination || dest.name;
                            handleSelectDestination({ name: destName });
                          }}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                          <div className="font-medium">
                            {dest.primaryText || dest.destination || dest.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {dest.secondaryText || dest.origin || ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Date Field */}
              <div className="w-[180px] border-l-3 border-r-3 border-r-white border-l-white bg-gray-50 px-3 py-2">
                <div className="mb-1 text-[10px] font-semibold text-gray-500">
                  Departure Date
                </div>
                <DatePicker
                  value={departureDate}
                  onChange={handleDateChange}
                  format="DD MMM YYYY"
                  className="w-full"
                  placeholder="Select Date"
                  allowClear={true}
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </div>

              {/* Custom Time Dropdown */}
              <div className="w-[180px] border-l-3 border-r-3 border-r-white border-l-white bg-gray-50 px-3 py-2">
                <div className="mb-1 text-[10px] font-semibold text-gray-500">
                  Departure Time
                </div>
                <CustomTimeDropdown
                  value={departureTime}
                  onChange={handleTimeChange}
                  options={availableTimeOptions}
                  disabled={false}
                />
              </div>

              {/* Search */}
              <button
                onClick={handleSearch}
                className="w-40 bg-[#ff581b] rounded-r-2xl text-white font-semibold flex items-center justify-center gap-2"
              >
                <span className="text-white">Next</span>
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="md:hidden flex flex-col gap-2">
              {/* Leaving From */}
              <div className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                <div className="mb-1 text-[10px] font-semibold text-gray-500 flex items-center justify-between">
                  <span>Leaving From</span>
                  <button
                    onClick={fetchCurrentLocation}
                    disabled={locationLoading}
                    className="flex items-center gap-1 text-[#ff581b] hover:text-[#ff4510] transition-colors"
                  >
                    <Navigation size={12} />
                    <span className="text-[9px]">
                      {locationLoading ? "Detecting..." : "Detect"}
                    </span>
                  </button>
                </div>
                <AutoComplete
                  value={from}
                  options={fromOptions}
                  onSearch={(v) => searchPlaces(v, "from")}
                  onChange={setFrom}
                  placeholder={
                    locationLoading
                      ? "Detecting your location..."
                      : "Source City"
                  }
                  className="w-full"
                />
                {locationError && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {locationError}
                  </p>
                )}
              </div>

              {/* Going To */}
              <div
                ref={searchContainerRef}
                className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 relative"
              >
                <div className="mb-1 text-[10px] font-semibold text-gray-500">
                  Going To
                </div>
                <AutoComplete
                  value={to}
                  options={toOptions}
                  onSearch={(v) => {
                    searchPlaces(v, "to");
                    setShowDestinationDropdown(true);
                  }}
                  onChange={(value) => {
                    setTo(value);
                    setShowDestinationDropdown(true);
                  }}
                  onFocus={() => setShowDestinationDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowDestinationDropdown(false), 200)
                  }
                  placeholder="Destination City"
                  className="w-full"
                />

                {/* Dynamic Destination Dropdown from API */}
                {showDestinationDropdown &&
                  to &&
                  routeSearch?.suggestions?.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                      {routeSearch.suggestions.map((dest) => (
                        <div
                          key={getDestinationKey(dest)}
                          onClick={() => {
                            const destName =
                              dest.primaryText || dest.destination || dest.name;
                            handleSelectDestination({ name: destName });
                          }}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                          <div className="font-medium">
                            {dest.primaryText || dest.destination || dest.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {dest.secondaryText || dest.origin || ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Date and Time Row */}
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                  <div className="mb-1 text-[10px] font-semibold text-gray-500">
                    Departure Date
                  </div>
                  <DatePicker
                    value={departureDate}
                    onChange={handleDateChange}
                    format="DD MMM YYYY"
                    className="w-full"
                    placeholder="Select Date"
                    allowClear={true}
                    disabledDate={(current) => {
                      return current && current < dayjs().startOf("day");
                    }}
                  />
                </div>

                <div className="flex-1 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                  <div className="mb-1 text-[10px] font-semibold text-gray-500">
                    Departure Time
                  </div>
                  <CustomTimeDropdown
                    value={departureTime}
                    onChange={handleTimeChange}
                    options={availableTimeOptions}
                    disabled={false}
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-[#ff581b] rounded-xl text-white font-semibold flex items-center justify-center gap-2 py-3"
              >
                <span className="text-white">Next</span>
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-50 via-white to-red-50 px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Protect your food order
                </span>
                <span className="text-xs text-gray-600">
                  • Free order support
                </span>
                <span className="text-xs text-gray-600">
                  • Missing item assistance
                </span>
                <span className="text-xs text-gray-600">
                  • Instant refund on eligible issues
                </span>
                <span className="text-xs text-gray-600">
                  • 24/7 Customer Support
                </span>
              </div>
              <ShieldCheck size={18} className="text-orange-500 shrink-0" />
            </div>
          </>
        )}

        {/* TAB 2: Select Route + Delivery Point - Dynamic from API */}
        {activeTab === "route" && (
          <>
            {/* Desktop Layout */}
            <div className="hidden md:block">
              {/* Selected Journey Details Row with Arrow */}
              <div className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-700">
                    {from || "Source"}
                  </span>
                  <ArrowRight size={14} className="text-[#ff581b]" />
                  <span className="font-semibold text-gray-700">
                    {to || "Destination"}
                  </span>
                  <span className="text-gray-400 mx-1">•</span>
                  <span className="text-gray-600">
                    {departureDate.format("DD MMM")}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {departureTime.format("hh:mm A")}
                  </span>
                </div>
              </div>

              <div className="relative flex rounded-xl border border-gray-200">
                {/* Select Route - Dynamic */}
                <div className="flex-1 border-r border-gray-200 bg-gray-50 px-3 py-2">
                   <div
                     onClick={() => setShowMapView(true)}
                     className="mb-1 text-[10px] cursor-pointer font-semibold text-gray-500 flex items-center gap-2"
                   >
                     Select Route
                     <Map size={14} className="text-[#ff581b]" />
                     {selectedRoute ? "Click to change on map" : "Click to view on map"}
                   </div>
                   <AutoComplete
                     value={selectedRoute?.name?.replace(/[^a-zA-Z0-9]+/g, ' ') || ""}
                    //  options={routes.map((route) => ({
                    //    value: route.name,
                    //    key: getRouteKey(route),
                    //  }))}
                     onFocus={() => setShowMapView(true)}
                     onChange={(value) => {
                       const route = routes.find((r) => r.name === value);
                       if (route) {
                         handleSelectRoute(route);
                       }
                     }}
                     placeholder="Choose a route or click to view map"
                     className="w-full"
                     disabled={routes.length === 0}
                   />
                </div>

                {/* Select Delivery Point - Dynamic based on selected route */}
                <div className="flex-1 bg-gray-50 px-3 py-2">
                  <div className="mb-1 text-[10px] font-semibold text-gray-500 flex items-center gap-2">
                    Select Delivery Point
                    <Package size={14} className="text-[#ff581b]" />
                  </div>
                  <AutoComplete
                    value={selectedDeliveryPoint?.name || ""}
                    options={deliveryPoints.map((point) => ({
                      value: point.name,
                      key: getPointKey(point),
                    }))}
                    onChange={(value) => {
                      const point = deliveryPoints.find(
                        (p) => p.name === value,
                      );
                      if (point) {
                        handleSelectDeliveryPoint(point);
                      }
                    }}
                    placeholder="Choose delivery point"
                    className="w-full"
                    disabled={!selectedRoute || deliveryPoints.length === 0}
                  />
                </div>

                {/* Complete Booking Button */}
                <button
                  onClick={handleCompleteBooking}
                  disabled={!selectedRoute || !selectedDeliveryPoint}
                  className={`w-40 rounded-r-2xl text-white font-semibold flex items-center justify-center gap-2 ${
                    selectedRoute && selectedDeliveryPoint
                      ? "bg-[#ff581b] hover:bg-[#ff4510]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  <span className="text-white text-lg">Search</span>
                  <ArrowRight size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-2">
              {/* Selected Journey Details */}
              <div className="bg-gray-100 rounded-xl px-4 py-3">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="font-semibold text-gray-700">
                    {from || "Source"}
                  </span>
                  <ArrowRight size={14} className="text-[#ff581b]" />
                  <span className="font-semibold text-gray-700">
                    {to || "Destination"}
                  </span>
                </div>
                <div className="text-center text-xs text-gray-500 mt-1">
                  {departureDate.format("DD MMM")} •{" "}
                  {departureTime.format("hh:mm A")}
                </div>
              </div>

              {/* Select Route */}
              <div className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                <div className="mb-1 text-[10px] font-semibold text-gray-500 flex items-center gap-2">
                  <Map size={14} className="text-[#ff581b]" />
                  Select Route
                </div>
                <AutoComplete
                  value={selectedRoute?.name || ""}
                  options={routes.map((route) => ({
                    value: route.name,
                    key: getRouteKey(route),
                  }))}
                  onChange={(value) => {
                    const route = routes.find((r) => r.name === value);
                    if (route) {
                      handleSelectRoute(route);
                    }
                  }}
                  placeholder="Choose a route"
                  className="w-full"
                  disabled={routes.length === 0}
                />
                {selectedRoute ? (
                  <button
                    onClick={() => setShowMapView(true)}
                    className="mt-1 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Map size={12} />
                    Change on Map
                  </button>
                ) : (
                  <button
                    onClick={() => setShowMapView(true)}
                    className="mt-1 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Map size={12} />
                    View on Map
                  </button>
                )}
              </div>

              {/* Select Delivery Point */}
              <div className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                <div className="mb-1 text-[10px] font-semibold text-gray-500 flex items-center gap-2">
                  <Package size={14} className="text-[#ff581b]" />
                  Select Delivery Point
                </div>
                <AutoComplete
                  value={selectedDeliveryPoint?.name || ""}
                  options={deliveryPoints.map((point) => ({
                    value: point.name,
                    key: getPointKey(point),
                  }))}
                  onChange={(value) => {
                    const point = deliveryPoints.find((p) => p.name === value);
                    if (point) {
                      handleSelectDeliveryPoint(point);
                    }
                  }}
                  placeholder="Choose delivery point"
                  className="w-full"
                  disabled={!selectedRoute || deliveryPoints.length === 0}
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleCompleteBooking}
                disabled={!selectedRoute || !selectedDeliveryPoint}
                className={`w-full rounded-xl text-white font-semibold flex items-center justify-center gap-2 py-3 ${
                  selectedRoute && selectedDeliveryPoint
                    ? "bg-[#ff581b] hover:bg-[#ff4510]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <span className="text-white text-lg">Search</span>
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>

            {/* Map View Modal */}
            {showMapView && (
              <MapViewModal
                from={from}
                to={to}
                selectedRoute={selectedRoute}
                routes={routes}
                onClose={() => {
                  setShowMapView(false);
                  dispatch(setMapViewModalOpen(false));
                }}
                onSelectRoute={(route) => {
                  handleSelectRoute(route);
                  setShowMapView(false);
                  dispatch(setMapViewModalOpen(false));
                }}
              />
            )}

            <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-red-50 via-white to-gray-50 px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Always secure your trip
                </span>
                <span className="text-xs text-gray-600">
                  • ₹0 Cancellation fee
                </span>
                <span className="text-xs text-gray-600">
                  • Travel Guarantee or 3x Refund
                </span>
                <span className="text-xs text-gray-600">
                  • Instant Refunds & 24/7 Customer Service
                </span>
              </div>
              <ShieldCheck size={18} className="text-yellow-500 shrink-0" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}