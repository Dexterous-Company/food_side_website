"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AutoComplete, DatePicker, TimePicker } from "antd";
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
} from "@/redux/delivery/deliverySlice";
import {
  normalizeErrorMessage,
  searchRouteDestinations,
} from "../../../utils/deliveryApi";

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

// Get minimum allowed time (1 hour from now)
const getMinimumAllowedTime = () => {
  return dayjs().add(1, "hour");
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
  const [departureTime, setDepartureTime] = useState(dayjs().add(1, "hour"));
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

  // Time validation - removed auto-update to prevent infinite loop
  const isTimeValid = useCallback(() => {
    const selectedDateTime = dayjs(departureDate)
      .hour(departureTime.hour())
      .minute(departureTime.minute())
      .second(0);

    const minTime = getMinimumAllowedTime();
    return (
      selectedDateTime.isAfter(minTime) || selectedDateTime.isSame(minTime)
    );
  }, [departureDate, departureTime]);

  const validateAndShowWarning = useCallback(() => {
    if (!isTimeValid()) {
      showToast("Departure time must be at least 1 hour from now", true);
      return false;
    }
    return true;
  }, [isTimeValid]);

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
    // Note: Do NOT scroll to restaurants here - only scroll after selecting delivery point and clicking Search in Tab 2
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

      showToast("Booking completed successfully!", false);

      // Scroll to RestaurantsMainPage to show restaurants
      // Use longer delay to ensure Redux state updates and API call is triggered
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

  const minTime = getMinimumAllowedTime();

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
            India’s fastest and most convenient food Side platform
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
                  onChange={(value) => setDepartureDate(value)}
                  format="DD MMM YYYY"
                  className="w-full"
                  placeholder="Select Date"
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </div>

              {/* Custom Time Picker - 12 Hour Format Single Box */}
              <div className="w-[180px] relative border-l-3 border-r-3 border-r-white border-l-white bg-gray-50 px-3 py-2">
                <div className="mb-1 text-[10px] font-semibold text-gray-500">
                  Departure Time
                </div>
                <div className="relative">
                  {/* <input
                    type="text"
                    value={departureTime.format("hh:mm A")}
                    readOnly
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff581b] focus:border-transparent cursor-pointer"
                  /> */}
                  <div className="flex items-center justify-center h-8 w-full text-[0.9rem] text-black">
                    <select
                      value={departureTime.format("hh:mm A")}
                      onChange={(e) => {
                        const [timeStr, period] = e.target.value.split(" ");
                        const [hours, minutes] = timeStr.split(":").map(Number);
                        let newHour = hours;
                        if (period === "PM" && hours !== 12)
                          newHour = hours + 12;
                        if (period === "AM" && hours === 12) newHour = 0;
                        setDepartureTime(
                          departureTime.hour(newHour).minute(minutes),
                        );
                      }}
                      className="h-full w-full px-2 border border-gray-300 rounded-md bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#ff581b] appearance-none cursor-pointer"
                    >
                      {Array.from({ length: 24 }, (_, h) => h)
                        .flatMap((hour24) => {
                          const hour12 = hour24 % 12 || 12;
                          const period = hour24 >= 12 ? "PM" : "AM";
                          return ["00", "15", "30", "45"].map((min) => ({
                            value: `${hour12.toString().padStart(2, "0")}:${min} ${period}`,
                            label: `${hour12}:${min} ${period}`,
                          }));
                        })
                        .filter((opt) => {
                          const [time, period] = opt.value.split(" ");
                          const [h, m] = time.split(":").map(Number);
                          let h24 = h;
                          if (period === "PM" && h !== 12) h24 = h + 12;
                          if (period === "AM" && h === 12) h24 = 0;
                          const testTime = dayjs()
                            .hour(h24)
                            .minute(parseInt(m));
                          const minTime = getMinimumAllowedTime();
                          return (
                            testTime.isAfter(minTime) ||
                            testTime.isSame(minTime)
                          );
                        })
                        .map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
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
                    onChange={(value) => setDepartureDate(value)}
                    format="DD MMM YYYY"
                    className="w-full"
                    placeholder="Select Date"
                    disabledDate={(current) => {
                      return current && current < dayjs().startOf("day");
                    }}
                  />
                </div>

                <div className="flex-1 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                  <div className="mb-1 text-[10px] font-semibold text-gray-500">
                    Departure Time
                  </div>
                  <input
                    type="time"
                    value={departureTime.format("HH:mm")}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value
                        .split(":")
                        .map(Number);
                      if (!isNaN(hours) && !isNaN(minutes)) {
                        setDepartureTime(
                          departureTime.hour(hours).minute(minutes),
                        );
                      }
                    }}
                    step="900"
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff581b] focus:border-transparent"
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
                  {selectedRoute ? (
                    <div
                      onClick={() => setShowMapView(true)}
                      className="mb-1 text-[10px] cursor-pointer font-semibold text-gray-500 flex items-center gap-2"
                    >
                      Select Route
                      <Map size={14} className="text-[#ff581b]" />
                      click to View on map
                    </div>
                  ) : (
                    <div className="mb-1 text-[10px] font-semibold text-gray-500 flex items-center gap-2">
                      Select Route
                      <Map size={14} className="text-[#ff581b]" />
                    </div>
                  )}
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
                {selectedRoute && (
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
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50">
                <div className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-2xl">
                  {/* Map Header */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200 rounded-t-xl">
                    <h3 className="text-base font-semibold text-gray-800">
                      Route Map
                    </h3>
                    <button
                      onClick={() => setShowMapView(false)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X size={18} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Map Container */}
                  <div className="relative h-[400px]">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDfjw4P4PnfI08-B-ljZDhEeQxnBqNv3hQ&origin=${encodeURIComponent(from || "Hyderabad")}&destination=${encodeURIComponent(to || "Bengaluru")}&mode=driving`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                      title="Route Map"
                    />
                  </div>

                  {/* Route Info */}
                  {selectedRoute && (
                    <div className="p-3 border-t border-gray-200 bg-white">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-gray-700">
                          {from || "Source"}
                        </span>
                        <ArrowRight size={14} className="text-[#ff581b]" />
                        <span className="font-semibold text-gray-700">
                          {to || "Destination"}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                          Selected Route:
                        </span>{" "}
                        {selectedRoute.name} • {selectedRoute.distanceKm || 0}{" "}
                        km •{" "}
                        {selectedRoute.durationMinutes
                          ? `${Math.floor(selectedRoute.durationMinutes / 60)}h ${selectedRoute.durationMinutes % 60}m`
                          : ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
