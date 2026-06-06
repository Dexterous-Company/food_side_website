"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BannerCarousel from "./BannerCarousel";
import SearchInput from "./SearchInput";
import DateTimePill from "./DateTimePill";
import { BANNERS } from "./constants";
import {
  selectRouteSearch,
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

const formatDate = date => {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = date => {
  if (!date) return "";
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};

const getMinimumAllowedTime = targetDate => {
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

const getDestinationKey = item => item?.id || item?.destination || item?.name || "";

export default function Step1SelectTowards({ selDest, onSelectDest }) {
  const dispatch = useDispatch();
  const routeSearch = useSelector(selectRouteSearch);
  const [query, setQuery] = useState("");
  const [fromLocation, setFromLocation] = useState("Hyderabad, Telangana");
  const [fromLocationDetailed, setFromLocationDetailed] = useState(
    "H.No 12-4, Ameerpet, Hyderabad - 500016",
  );
  const [pickupCoordinates, setPickupCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [pickupAddressMeta, setPickupAddressMeta] = useState({
    city: "Hyderabad",
    state: "Telangana",
    pincode: "",
    landmark: "",
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(() =>
    getMinimumAllowedTime(new Date()),
  );

  const formattedDate = formatDate(selectedDate);
  const formattedTime = formatTime(selectedTime);
  const filtered = useMemo(() => {
    const suggestions = routeSearch?.suggestions || [];
    const searchText = query.trim().toLowerCase();
    if (!searchText) return suggestions;

    return suggestions.filter(item => {
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

      return destinationName.includes(searchText) || location.includes(searchText);
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

  const fetchCurrentLocation = () => {
    setLocationError("");

    if (!navigator?.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const fallback = `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;

        setPickupCoordinates(coords);
        setFromLocation(fallback);
        setFromLocationDetailed(fallback);
        setPickupAddressMeta(prev => ({ ...prev, city: "" }));
        setLocationLoading(false);
      },
      error => {
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

  const handleSelectDestination = destination => {
    const selectedName =
      destination.primaryText || destination.destination || destination.name || "";

    setQuery(selectedName);
    dispatch(setTowardsLocation(selectedName));
    onSelectDest(destination);
  };

  const handleClear = () => {
    setQuery("");
    dispatch(setTowardsLocation(""));
    onSelectDest(null);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    const minimumTime = getMinimumAllowedTime(date);
    const timeForDate = new Date(date);
    timeForDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

    if (timeForDate < minimumTime) {
      setSelectedTime(minimumTime);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <BannerCarousel banners={BANNERS} />

      <div className="flex items-start gap-2.5 border border-gray-200 rounded-xl px-3.5 py-3 bg-white">
        <svg className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {locationLoading ? "Detecting your location..." : fromLocation}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">
            {fromLocationDetailed}
          </p>
        </div>
        <button
          type="button"
          onClick={fetchCurrentLocation}
          disabled={locationLoading}
          className="flex-shrink-0 mt-0.5 disabled:opacity-50"
        >
          <svg className="w-4 h-4 text-[#ff581b] cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.07 9a8 8 0 0114.14 0M19.93 15A8 8 0 015.79 15"/>
          </svg>
        </button>
      </div>

      {locationError && (
        <p className="text-xs font-medium text-red-500 px-1">{locationError}</p>
      )}

      <SearchInput
        value={query}
        onChange={setQuery}
        onClear={handleClear}
        placeholder="Enter destination towards..."
        loading={routeSearch?.loading}
      />

      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
        {routeSearch?.error ? (
          <div className="flex flex-col items-center justify-center py-8 text-red-400 gap-2">
            <p className="text-sm">{routeSearch.error}</p>
          </div>
        ) : query.trim().length < 2 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
            <p className="text-sm">Type at least 2 letters to search destinations</p>
          </div>
        ) : filtered.length === 0 && !routeSearch?.loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
            <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <p className="text-sm">No destinations found for &quot;{query}&quot;</p>
          </div>
        ) : (
          filtered.map((d, index) => {
            const itemKey = d.id || d.routeId || d.destination || d.name || index;
            const itemName = d.primaryText || d.destination || d.name;
            const itemLocation =
              d.secondaryText || d.origin || d.location || d.routeName || "Matching route";
            const routeCount = d.routeCount || d.routes || "";
            const isSelected = getDestinationKey(selDest) === getDestinationKey(d);

            return (
              <button
                key={itemKey}
                onClick={() => handleSelectDestination(d)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-150
                  ${isSelected
                    ? "border-[#ff581b] bg-orange-50/60"
                    : "border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/30"
                  }
                `}
              >
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#ff581b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{itemName}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{itemLocation}</p>
                </div>
                <span className="text-xs text-[#ff581b] font-medium whitespace-nowrap">
                  {routeCount ? `${routeCount} routes` : ""}
                </span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                  ${isSelected ? "border-[#ff581b]" : "border-gray-300"}
                `}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#ff581b]" />}
                </div>
              </button>
            );
          })
        )}
      </div>

      <DateTimePill
        date={selectedDate}
        onDateChange={handleDateChange}
        onTimeChange={setSelectedTime}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
    </div>
  );
}
