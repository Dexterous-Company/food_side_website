"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import BannerCarousel from "./BannerCarousel";
import SearchInput from "./SearchInput";
import DateTimePill from "./DateTimePill";
import { BANNERS } from "./constants";

// Google Maps API Key (use your actual key)
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";

export default function Step1SelectTowards({ selDest, onSelectDest, onLocationUpdate }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Current location states
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [permissionBlocked, setPermissionBlocked] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  // Format date as DD-MM-YYYY
  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Format time as HH:MM AM/PM
  const formatTime = (date) => {
    if (!date) return "";
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Get minimum allowed time (1 hour from now)
  const getMinimumAllowedTime = useCallback((targetDate) => {
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
  }, []);

  // Get address from coordinates using Google Geocoding API
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const formattedAddress = result.formatted_address;
        
        let city = '';
        let state = '';
        let pincode = '';
        
        for (const component of result.address_components) {
          if (component.types.includes('locality') || 
              component.types.includes('administrative_area_level_3')) {
            city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            pincode = component.long_name;
          }
        }
        
        const shortAddress = [city, state].filter(part => part).join(', ');
        
        return {
          fullAddress: formattedAddress,
          shortAddress: shortAddress || formattedAddress.split(',')[0],
          city,
          state,
          pincode,
          coordinates: { lat, lng }
        };
      }
      throw new Error('No results found');
    } catch (error) {
      console.error('Geocoding Error:', error);
      return {
        fullAddress: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
        shortAddress: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
        city: '',
        state: '',
        pincode: '',
        coordinates: { lat, lng }
      };
    }
  };

  // Fetch current location using browser geolocation
  const fetchCurrentLocation = useCallback(async () => {
    setLocationLoading(true);
    setLocationError(null);
    setPermissionBlocked(false);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const addressDetails = await getAddressFromCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          
          const locationData = {
            ...addressDetails,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          };
          
          setCurrentLocation(locationData);
          onLocationUpdate?.(locationData);
          setLocationLoading(false);
        } catch (err) {
          console.error("Error getting address:", err);
          setLocationError("Failed to get address details");
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Location Error:", error);
        
        if (error.code === 1) {
          setLocationError("Location permission denied. Please enable to auto-detect pickup.");
        } else if (error.code === 2) {
          setLocationError("GPS is turned off. Please enable GPS to detect your location.");
        } else {
          setLocationError("Unable to fetch your current location. Please enter manually.");
        }
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 30000
      }
    );
  }, [onLocationUpdate]);

  // Search route destinations API call
  const searchDestinations = async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Construct the search URL with current location context
      const locationContext = currentLocation?.shortAddress || '';
      const lat = currentLocation?.coordinates?.lat;
      const lng = currentLocation?.coordinates?.lng;
      
      // Replace with your actual API endpoint
      const response = await fetch('/api/search-route-destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          currentLocation: locationContext,
          city: currentLocation?.city || '',
          latitude: lat,
          longitude: lng,
        }),
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const result = await response.json();
      setSuggestions(result.suggestions || []);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchDestinations(query);
    }, 350);
    
    return () => clearTimeout(timer);
  }, [query, currentLocation]);

  // Initialize location on mount
  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  // Update formatted date/time
  useEffect(() => {
    setFormattedDate(formatDate(selectedDate));
    setFormattedTime(formatTime(getMinimumAllowedTime(selectedDate)));
  }, [selectedDate, getMinimumAllowedTime]);

  // Filter suggestions based on search text
  const filteredSuggestions = useMemo(() => {
    const searchText = query.trim().toLowerCase();
    if (!searchText) return [];
    
    return suggestions.filter(item => {
      const destinationName = (
        item.primaryText || 
        item.destination || 
        item.name || 
        ''
      ).toLowerCase();
      const location = (
        item.secondaryText || 
        item.origin || 
        item.location || 
        item.routeName || 
        ''
      ).toLowerCase();
      
      return destinationName.includes(searchText) || location.includes(searchText);
    });
  }, [suggestions, query]);

  const handleSelectDestination = (destination) => {
    onSelectDest(destination);
    setQuery(destination.primaryText || destination.destination || destination.name || '');
  };

  const handleClearDestination = () => {
    setQuery('');
    onSelectDest(null);
    setSuggestions([]);
  };

  const handleRefreshLocation = () => {
    fetchCurrentLocation();
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <BannerCarousel banners={BANNERS} />

      {/* Current Location Display */}
      <div className="flex items-start gap-2.5 border border-gray-200 rounded-xl px-3.5 py-3 bg-white">
        <svg 
          className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        
        <div className="flex-1 min-w-0">
          {locationLoading ? (
            <p className="text-sm font-semibold text-gray-800">Detecting your location...</p>
          ) : locationError ? (
            <p className="text-sm text-red-500">{locationError}</p>
          ) : currentLocation ? (
            <>
              <p className="text-sm font-semibold text-gray-800 leading-tight">
                {currentLocation.shortAddress || "Current Location"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">
                {currentLocation.fullAddress}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Select pickup location</p>
          )}
        </div>
        
        <button 
          onClick={handleRefreshLocation}
          className="text-[#ff581b] flex-shrink-0 cursor-pointer mt-0.5 hover:opacity-70 transition-opacity"
          disabled={locationLoading}
        >
          <svg 
            className={`w-4 h-4 ${locationLoading ? 'animate-spin' : ''}`} 
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

      {/* Destination Search Input */}
      <div className="relative">
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={handleClearDestination}
          placeholder="Enter destination towards..."
          loading={loading}
        />
        
        {/* Suggestions Dropdown */}
        {(query.trim().length >= 2 || loading) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-10 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ff581b]"></div>
                <p className="text-sm text-gray-500">Searching destinations...</p>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 py-4 px-3">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-500">{error}</p>
              </div>
            ) : filteredSuggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-gray-400">
                <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm">No destinations found for "{query}"</p>
              </div>
            ) : (
              filteredSuggestions.map((item, index) => (
                <button
                  key={item.id || item.routeId || item.destination || `${item.name}-${index}`}
                  onClick={() => handleSelectDestination(item)}
                  className={`flex items-center gap-3 px-3 py-2.5 w-full text-left border-b border-gray-100 last:border-b-0 hover:bg-orange-50 transition-colors
                    ${selDest?.id === item.id ? "bg-orange-50/60" : ""}
                  `}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#ff581b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.primaryText || item.destination || item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {item.secondaryText || item.origin || item.location || item.routeName || "Matching route"}
                    </p>
                  </div>
                  {item.routeCount && (
                    <span className="text-xs text-[#ff581b] font-medium whitespace-nowrap">
                      {item.routeCount} routes
                    </span>
                  )}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${selDest?.id === item.id ? "border-[#ff581b]" : "border-gray-300"}
                  `}>
                    {selDest?.id === item.id && <div className="w-2 h-2 rounded-full bg-[#ff581b]" />}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Date and Time Pills */}
      <DateTimePill 
        date={selectedDate}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
    </div>
  );
}