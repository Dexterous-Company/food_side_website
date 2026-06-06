"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiClock,
  FiMapPin,
  FiPhone,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiMap,
  FiChevronRight,
  FiRefreshCw,
  FiPackage,
  FiTruck,
  FiMessageCircle,
  FiMail,
  FiCheckCircle,
  FiCopy,
  FiHeadphones,
  FiHelpCircle,
  FiAlertCircle,
  FiLoader,
  FiXCircle,
  FiNavigation,
} from "react-icons/fi";
import { getOrderDetails, cancel_order, clearOrderState } from "@/redux/Order/OrderSlice";

// Map Modal Component
const DeliveryPointMapModal = ({ 
  visible, 
  onClose, 
  currentLocation, 
  deliveryLocation, 
  deliveryName, 
  deliveryAddress,
  onNavigate 
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  if (!visible) return null;

  // Build the map HTML with Leaflet
  const buildMapHtml = () => {
    const payload = {
      currentLat: currentLocation?.lat || currentLocation?.latitude || null,
      currentLng: currentLocation?.lng || currentLocation?.longitude || null,
      deliveryLat: deliveryLocation?.lat || deliveryLocation?.latitude || null,
      deliveryLng: deliveryLocation?.lng || deliveryLocation?.longitude || null,
      deliveryName: deliveryName || 'Delivery Point',
      deliveryAddress: deliveryAddress || '',
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; padding: 0; background: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    #map { width: 100%; height: 100%; background: #fffaf5; }
    .custom-marker { background: #ff6b00; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; position: relative; }
    .custom-marker::after { content: ''; position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 12px solid #ff6b00; }
    .custom-marker-inner { width: 20px; height: 20px; background: white; border-radius: 50%; }
    .current-marker { background: #2196F3; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; position: relative; }
    .current-marker::after { content: ''; position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 12px solid #2196F3; }
    .current-marker-inner { width: 20px; height: 20px; background: white; border-radius: 50%; }
    .leaflet-control-attribution { font-size: 10px !important; }
    .leaflet-control-zoom { position: absolute; top: 12px !important; right: 12px !important; left: auto !important; bottom: auto !important; z-index: 1000 !important; margin: 0 !important; background: white !important; border-radius: 8px !important; box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important; border: 1px solid #ffd7c1 !important; }
    .leaflet-control-zoom a { border-color: #ffd7c1 !important; color: #ff6b00 !important; background: white !important; width: 36px !important; height: 36px !important; line-height: 34px !important; font-size: 18px !important; font-weight: bold !important; display: block !important; text-align: center !important; text-decoration: none !important; }
    .distance-card { position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); padding: 12px 20px; border-radius: 30px; z-index: 1000; text-align: center; pointer-events: none; }
    .distance-text { color: white; font-size: 14px; font-weight: 600; text-align: center; }
    .nav-button { position: absolute; bottom: 80px; left: 20px; right: 20px; background: #ff6b00; padding: 14px 24px; border-radius: 30px; text-align: center; color: white; font-weight: 700; font-size: 16px; text-decoration: none; display: block; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: none; cursor: pointer; }
    .location-button { position: absolute; bottom: 20px; right: 20px; background: white; width: 48px; height: 48px; border-radius: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.2); cursor: pointer; z-index: 1000; border: 1px solid #ffd7c1; }
  </style>
</head>
<body>
  <div id="map"></div>
  <div class="distance-card" id="distanceCard">
    <div class="distance-text" id="distanceText">Calculating distance...</div>
  </div>
  <a href="#" class="nav-button" id="navButton" onclick="openNavigation(event)">📍 Navigate to Delivery Point</a>
  <div class="location-button" id="locationButton" onclick="centerOnCurrent()">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  </div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    var data = ${JSON.stringify(payload)};
    var map;
    var currentMarker;
    var deliveryMarker;
    var polyline;

    function calculateDistance(lat1, lon1, lat2, lon2) {
      var R = 6371;
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }

    function initMap() {
      map = L.map('map').setView([20.5937, 78.9629], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      var bounds = [];
      var hasCurrent = data.currentLat && data.currentLng;
      var hasDelivery = data.deliveryLat && data.deliveryLng;

      if (hasCurrent) {
        var currentIcon = L.divIcon({
          className: 'current-marker',
          html: '<div class="current-marker-inner"></div>',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -35],
        });
        currentMarker = L.marker([data.currentLat, data.currentLng], { icon: currentIcon })
          .addTo(map)
          .bindPopup('<strong>📍 Your Current Location</strong>');
        bounds.push([data.currentLat, data.currentLng]);
      }

      if (hasDelivery) {
        var deliveryIcon = L.divIcon({
          className: 'custom-marker',
          html: '<div class="custom-marker-inner"></div>',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -35],
        });
        deliveryMarker = L.marker([data.deliveryLat, data.deliveryLng], { icon: deliveryIcon })
          .addTo(map)
          .bindPopup('<strong>📍 ' + (data.deliveryName || 'Delivery Point') + '</strong><br/>' + (data.deliveryAddress || ''));
        bounds.push([data.deliveryLat, data.deliveryLng]);
      }

      if (hasCurrent && hasDelivery) {
        var latLngs = [[data.currentLat, data.currentLng], [data.deliveryLat, data.deliveryLng]];
        polyline = L.polyline(latLngs, { color: '#ff6b00', weight: 4, opacity: 0.8 }).addTo(map);
        
        var distance = calculateDistance(data.currentLat, data.currentLng, data.deliveryLat, data.deliveryLng);
        var distanceText = distance < 1 ? Math.round(distance * 1000) + ' meters away' : distance.toFixed(2) + ' km away';
        document.getElementById('distanceText').innerHTML = '📏 Delivery point is ' + distanceText;
      } else if (hasDelivery) {
        document.getElementById('distanceText').innerHTML = '📍 ' + (data.deliveryName || 'Delivery Point');
      } else {
        document.getElementById('distanceText').innerHTML = '📍 Location information unavailable';
      }

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      } else if (hasDelivery) {
        map.setView([data.deliveryLat, data.deliveryLng], 13);
      }
    }

    function centerOnCurrent() {
      if (data.currentLat && data.currentLng) {
        map.setView([data.currentLat, data.currentLng], 15);
        if (currentMarker) currentMarker.openPopup();
      } else {
        alert('Current location not available. Please enable GPS.');
      }
    }

    function openNavigation(event) {
      event.preventDefault();
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage('OPEN_GOOGLE_MAPS');
      }
    }

    initMap();
    setTimeout(function() { map.invalidateSize(); }, 250);
    setTimeout(function() { map.invalidateSize(); }, 700);
  </script>
</body>
</html>`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-full md:rounded-2xl md:max-w-4xl md:h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-orange-100 bg-white md:rounded-t-2xl">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
          >
            <FiArrowLeft size={18} className="text-[#FF581B]" />
          </button>
          <h2 className="font-semibold text-lg text-gray-800">Delivery Location</h2>
          <button
            onClick={onNavigate}
            className="px-3 py-1.5 bg-[#FF581B] text-white rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-[#E04A10] transition-colors"
          >
            <FiNavigation size={14} />
            Navigate
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-gray-100">
          {deliveryLocation ? (
            <iframe
              srcDoc={buildMapHtml()}
              className="w-full h-full border-0"
              title="Delivery Location Map"
              onLoad={() => setMapLoaded(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <FiMapPin size={60} className="text-gray-300" />
              <p className="text-gray-500 mt-4">Location not available</p>
              <p className="text-gray-400 text-sm mt-1">
                Unable to load map for this delivery point
              </p>
            </div>
          )}
          {!mapLoaded && deliveryLocation && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <FiLoader size={40} className="animate-spin text-[#FF581B]" />
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="p-4 border-t border-orange-100 bg-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
              <FiMapPin className="text-[#FF581B] text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800">{deliveryName || 'Delivery Point'}</p>
              <p className="text-sm text-gray-500 mt-0.5 break-words">
                {deliveryAddress || 'Address not available'}
              </p>
            </div>
            <button
              onClick={onNavigate}
              className="px-4 py-2 bg-[#FF581B] text-white rounded-lg font-medium text-sm whitespace-nowrap hover:bg-[#E04A10] transition-colors flex items-center gap-1"
            >
              <FiNavigation size={14} />
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OrderId() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const orderId = params?.id;
  
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  
  const { currentOrder, currentOrderLoading, orderActionLoading } = useSelector((state) => state.order);
  const { isUserAuth, userData } = useSelector((state) => state.Authentication);

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }
    
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (error) => {
        console.log("Location error:", error);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 30000,
      }
    );
  }, []);

  useEffect(() => {
    if (orderId && isUserAuth) {
      loadOrderDetails();
      getCurrentLocation();
    }
    
    return () => {
      dispatch(clearOrderState());
    };
  }, [orderId, isUserAuth]);

  const loadOrderDetails = async () => {
    setIsLoading(true);
    await dispatch(getOrderDetails(orderId));
    setIsLoading(false);
  };

  // Helper function to safely get address string
  const getAddressString = (address) => {
    if (!address) return "Address not available";
    if (typeof address === 'string') return address;
    if (address.fullAddress) return address.fullAddress;
    if (address.address) return address.address;
    const parts = [address.area, address.city, address.state, address.pincode, address.country].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Address not available";
  };

  // Helper function to get location coordinates
  const getDeliveryLocation = () => {
    const deliveryPoint = currentOrder?.deliveryPoint || currentOrder?.deliveryPointId;
    if (!deliveryPoint) return null;
    
    let location = deliveryPoint.location;
    if (!location && deliveryPoint.coordinates) location = deliveryPoint.coordinates;
    if (!location && deliveryPoint.address?.location) location = deliveryPoint.address.location;
    
    if (!location || !location.coordinates) return null;
    
    const coordinates = location.coordinates;
    if (Array.isArray(coordinates) && coordinates.length >= 2) {
      return {
        lat: coordinates[1],
        lng: coordinates[0],
        latitude: coordinates[1],
        longitude: coordinates[0],
      };
    }
    return null;
  };

  // Open Google Maps navigation
  const handleNavigate = () => {
    const deliveryLocation = getDeliveryLocation();
    if (!deliveryLocation) {
      alert("Delivery location not available");
      return;
    }

    const destLat = deliveryLocation.lat;
    const destLng = deliveryLocation.lng;
    
    let url = '';
    if (currentUserLocation?.lat && currentUserLocation?.lng) {
      const originLat = currentUserLocation.lat;
      const originLng = currentUserLocation.lng;
      url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`;
    }
    
    window.open(url, '_blank');
  };

  // Transform order to match UI format
  const transformOrder = () => {
    if (!currentOrder) return null;
    
    let journeyDate;
    if (currentOrder.journey?.date) {
      journeyDate = new Date(currentOrder.journey.date);
    } else if (currentOrder.createdAt) {
      journeyDate = new Date(currentOrder.createdAt);
    } else {
      journeyDate = new Date();
    }
    
    let formattedTime = currentOrder.journey?.formattedTime;
    if (!formattedTime && currentOrder.journey?.time) {
      formattedTime = new Date(currentOrder.journey.time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    
    const restaurant = currentOrder.restaurant || currentOrder.restaurantId || {};
    const restaurantName = restaurant.name || "Restaurant";
    const restaurantAddress = restaurant.address ? getAddressString(restaurant.address) : "Address not available";
    const restaurantPhone = restaurant.phone || "Not available";
    
    const deliveryPoint = currentOrder.deliveryPoint || currentOrder.deliveryPointId || {};
    const deliveryLocation = deliveryPoint.name || "Delivery Location";
    const deliveryAddressString = deliveryPoint.address ? getAddressString(deliveryPoint.address) : "Address not available";
    
    const otpCode = currentOrder.otp?.code || currentOrder.otp || "000000";
    
    let etaDate = null;
    if (currentOrder.eta) {
      etaDate = new Date(currentOrder.eta);
    } else if (currentOrder.estimatedDelivery) {
      etaDate = new Date(currentOrder.estimatedDelivery);
    }
    
    return {
      _id: currentOrder._id,
      orderNumber: currentOrder.orderNumber || `ORD-${currentOrder._id?.slice(-12)}`,
      userName: currentOrder.user?.name || currentOrder.userName || userData?.name || "Customer",
      userPhone: currentOrder.user?.phone || currentOrder.userPhone || userData?.phone || "Not available",
      userEmail: currentOrder.user?.email || currentOrder.userEmail || userData?.email || "Not available",
      paymentMethod: currentOrder.paymentMethod || "cod",
      paymentStatus: currentOrder.paymentStatus || "pending",
      status: currentOrder.status || "placed",
      totalAmount: currentOrder.totalAmount || 0,
      journey: {
        formattedDate: journeyDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        formattedTime: formattedTime || journeyDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      },
      items: (currentOrder.items || []).map(item => ({
        name: item.name || "Item",
        quantity: item.quantity || 1,
        price: item.price || item.total || 0,
        image: item.image || null,
      })),
      restaurant: {
        name: restaurantName,
        address: restaurantAddress,
        phone: restaurantPhone,
      },
      deliveryAddress: {
        location: deliveryLocation,
        address: deliveryAddressString,
      },
      estimatedDelivery: etaDate ? etaDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) : "Not available",
      deliveryOtp: otpCode,
      otpVerified: currentOrder.otp?.verified || false,
      deliveryPartner: {
        name: "Assigning...",
        phone: "Not available",
        vehicleNumber: "Not available",
      },
    };
  };

  const order = transformOrder();
  const deliveryLocationData = getDeliveryLocation();

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return { bg: "bg-green-100", text: "text-green-700", icon: FiTruck, label: "DELIVERED" };
      case "preparing":
        return { bg: "bg-blue-100", text: "text-blue-700", icon: FiRefreshCw, label: "PREPARING" };
      case "ready":
        return { bg: "bg-purple-100", text: "text-purple-700", icon: FiCheckCircle, label: "READY" };
      case "cancelled":
        return { bg: "bg-red-100", text: "text-red-700", icon: FiXCircle, label: "CANCELLED" };
      default:
        return { bg: "bg-orange-100", text: "text-[#FF581B]", icon: FiClock, label: "PLACED" };
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === order?.deliveryOtp) {
      setOtpVerified(true);
      setShowOtpInput(false);
      alert("OTP verified successfully! Order has been delivered.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleCopyOtp = () => {
    if (order?.deliveryOtp) {
      navigator.clipboard.writeText(order.deliveryOtp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCancelOrder = async () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      await dispatch(cancel_order(orderId));
      await loadOrderDetails();
      alert("Order cancelled successfully");
    }
  };

  const shouldShowOtpSection = () => {
    return order?.status !== "delivered" && 
           order?.status !== "cancelled" && 
           !order?.otpVerified &&
           order?.deliveryOtp !== "000000";
  };

  const SupportModal = () => {
    if (!showSupport) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowSupport(false)}
      >
        <div
          className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-orange-100 sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiHeadphones className="text-[#FF581B] text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">Contact Support</h3>
              </div>
              <button onClick={() => setShowSupport(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <FiAlertCircle className="text-[#FF581B] text-xl" />
                <p className="font-semibold text-gray-800">Order #{order?.orderNumber}</p>
              </div>
              <p className="text-sm text-gray-600">We're here to help! Choose your preferred contact method:</p>
            </div>
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiPhone className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Call Support</p>
                  <p className="text-sm text-gray-500">Talk to our customer care executive</p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiMessageCircle className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">WhatsApp Chat</p>
                  <p className="text-sm text-gray-500">Quick response via WhatsApp</p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiMail className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Email Support</p>
                  <p className="text-sm text-gray-500">support@restaurant.com</p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>
            <button className="w-full p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FiHelpCircle className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">FAQs</p>
                  <p className="text-sm text-gray-500">Find answers to common questions</p>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading || currentOrderLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <FiLoader size={40} className="animate-spin text-[#FF581B] mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!isUserAuth) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view order details</p>
          <button onClick={() => router.push("/login")} className="px-6 py-2 bg-[#FF581B] text-white rounded-lg">Login</button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <FiPackage size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Order not found</p>
          <button onClick={() => router.push("/accounts/orders")} className="px-6 py-2 bg-[#FF581B] text-white rounded-lg">Back to Orders</button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(order.status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen bg-[#FFF8F2] pb-20">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-orange-100 shadow-sm md:hidden">
        <div className="h-14 px-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors">
            <FiArrowLeft size={18} className="text-[#FF581B]" />
          </button>
          <h1 className="font-semibold text-lg text-[#FF581B]">Order Details</h1>
          <button className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors relative">
            <FiShoppingCart size={18} className="text-[#FF581B]" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-white border-b border-orange-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-[#FF581B] transition-colors">
              <FiArrowLeft size={20} />
              <span>Back to Orders</span>
            </button>
            <h1 className="text-2xl font-bold text-[#FF581B]">Order Details</h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-orange-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                    <StatusIcon className="text-[#FF581B] text-xl" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm md:text-base">{order.orderNumber}</h2>
                    <span className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                      {statusStyle.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiClock className="text-[#F4B400]" />
                  Ordered on: {order.journey.formattedDate}, {order.journey.formattedTime}
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF581B] rounded-full transition-all duration-500" style={{ 
                    width: order.status === "delivered" ? "100%" : order.status === "ready" ? "75%" : order.status === "preparing" ? "50%" : order.status === "placed" ? "25%" : "0%" 
                  }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span className={order.status !== "cancelled" ? "text-[#FF581B] font-medium" : ""}>Order Placed</span>
                  <span className={order.status === "preparing" ? "text-[#FF581B] font-medium" : ""}>Preparing</span>
                  <span className={order.status === "ready" ? "text-[#FF581B] font-medium" : ""}>Ready</span>
                  <span className={order.status === "delivered" ? "text-[#FF581B] font-medium" : ""}>Delivered</span>
                </div>
              </div>
            </div>

            {/* Delivery OTP Section */}
            {shouldShowOtpSection() && (
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-orange-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <FiCheckCircle className="text-[#FF581B]" />
                    Delivery OTP
                  </h3>
                  {!otpVerified && (
                    <button onClick={() => setShowOtpInput(!showOtpInput)} className="text-xs text-[#FF581B] font-medium">
                      {showOtpInput ? "Cancel" : "Enter OTP"}
                    </button>
                  )}
                </div>
                {otpVerified ? (
                  <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 text-xl" />
                    <div>
                      <p className="font-semibold text-green-700">Delivery Confirmed!</p>
                      <p className="text-sm text-green-600">Order has been successfully delivered</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-orange-50 rounded-xl p-4 mb-3">
                      <p className="text-sm text-gray-700 mb-2">Share this OTP with the delivery partner to confirm delivery:</p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-2xl font-bold text-[#FF581B] tracking-wider">
                          {order.deliveryOtp?.toString().split("").join(" ") || "000000"}
                        </div>
                        <button onClick={handleCopyOtp} className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-[#FF581B] flex items-center gap-1">
                          <FiCopy size={14} />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                    {showOtpInput && (
                      <div className="mt-3">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Enter OTP to confirm delivery</label>
                        <div className="flex gap-2">
                          <input type="text" maxLength={6} value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} placeholder="Enter 6-digit OTP" className="flex-1 px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:border-[#FF581B] focus:ring-2 focus:ring-[#FF581B]/20" />
                          <button onClick={handleVerifyOtp} className="px-4 py-2 bg-[#FF581B] text-white rounded-lg font-medium hover:bg-[#E04A10] transition-colors">Verify</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Restaurant Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-orange-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">🍴 Restaurant Details</h3>
              </div>
              <div className="p-4 md:p-5">
                <h4 className="font-semibold text-gray-800 text-base md:text-lg mb-3">{order.restaurant.name}</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-[#FF581B] mt-0.5 flex-shrink-0" />
                    <span>{order.restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-[#FF581B] flex-shrink-0" />
                    <span>{order.restaurant.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-orange-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FiMapPin className="text-[#FF581B]" />
                  Delivery Location
                </h3>
              </div>
              <div className="p-4 md:p-5">
                <h4 className="font-semibold text-gray-800 text-base md:text-lg">{order.deliveryAddress.location}</h4>
                <div className="mt-3 space-y-3">
                  <div className="flex gap-3 text-sm text-gray-600">
                    <FiMapPin className="text-[#FF581B] mt-0.5 shrink-0" />
                    <p>{order.deliveryAddress.address}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiUser className="text-[#FF581B]" />
                      <span>{order.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FiPhone className="text-[#FF581B]" />
                      <span className="text-[#FF581B]">{order.userPhone}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowDeliveryMap(true)} 
                    className="w-full bg-orange-50 rounded-xl p-3 flex items-center justify-between hover:bg-orange-100 transition-colors mt-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <FiMap className="text-[#FF581B] text-lg" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-[#FF581B] text-sm">View on Map</p>
                        <p className="text-xs text-gray-500">
                          {currentUserLocation ? 'Tap to see route from your location' : 'Tap to see delivery location on map'}
                        </p>
                      </div>
                    </div>
                    <FiChevronRight className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Summary & Items */}
          <div className="space-y-4">
            {/* Contact Support Button */}
            <button onClick={() => setShowSupport(true)} className="w-full bg-gradient-to-r from-[#FF581B] to-[#F4B400] rounded-2xl p-4 shadow-sm text-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FiHeadphones className="text-xl" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Need Help?</p>
                    <p className="text-xs text-white/90">Contact our support team</p>
                  </div>
                </div>
                <FiChevronRight className="text-xl" />
              </div>
            </button>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-4 md:p-5 shadow-sm border border-orange-100">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF581B]">₹</div>
                  <p className="font-bold text-lg text-gray-800 mt-1">₹{order.totalAmount}</p>
                  <span className="text-xs text-gray-500">Total</span>
                </div>
                <div className="text-center border-x border-orange-200">
                  <FiCalendar className="mx-auto text-[#F4B400] text-2xl" />
                  <p className="font-semibold text-sm text-gray-700 mt-1">{order.journey.formattedDate}</p>
                  <span className="text-xs text-gray-500">Date</span>
                </div>
                <div className="text-center">
                  <FiCreditCard className="mx-auto text-[#FF581B] text-2xl" />
                  <p className="font-semibold text-sm text-gray-700 mt-1 uppercase">{order.paymentMethod}</p>
                  <span className="text-xs text-gray-500">Payment</span>
                </div>
              </div>
              {order.paymentStatus === "pending" && (
                <div className="mt-3 pt-3 border-t border-orange-200">
                  <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg text-center">Payment pending - Cash on delivery</p>
                </div>
              )}
            </div>

            {/* Ordered Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-orange-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FiPackage className="text-[#FF581B]" />
                  Ordered Items
                </h3>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-orange-50 flex-shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiPackage size={20} className="text-orange-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                <div className="pt-3 border-t border-orange-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-800">₹{order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="font-medium text-gray-800">₹{Math.round(order.totalAmount * 0.18)}</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t border-orange-100">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-[#FF581B]">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ETA Notice */}
            {order.status !== "delivered" && order.status !== "cancelled" && order.estimatedDelivery !== "Not available" && (
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <div className="flex items-center gap-2">
                  <FiTruck className="text-[#FF581B]" />
                  <span className="text-sm text-gray-700">Expected delivery by <strong>{order.estimatedDelivery}</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 p-3 md:hidden">
        {order.status === "placed" ? (
          <button onClick={handleCancelOrder} disabled={orderActionLoading} className="w-full h-12 rounded-xl bg-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50">
            {orderActionLoading ? <FiLoader className="animate-spin" /> : <FiXCircle size={16} />}
            Cancel Order
          </button>
        ) : (
          <button className="w-full h-12 rounded-xl bg-[#FF581B] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#E04A10] transition-colors">
            <FiRefreshCw size={16} />
            Reorder
          </button>
        )}
      </div>

      {/* Bottom Button - Desktop */}
      <div className="hidden md:block fixed bottom-0 right-0 p-6">
        {order.status === "placed" ? (
          <button onClick={handleCancelOrder} disabled={orderActionLoading} className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50">
            {orderActionLoading ? <FiLoader className="animate-spin" /> : <FiXCircle size={18} />}
            Cancel Order
          </button>
        ) : (
          <button className="px-6 py-3 rounded-xl bg-[#FF581B] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#E04A10] transition-colors shadow-lg">
            <FiRefreshCw size={18} />
            Reorder Now
          </button>
        )}
      </div>

      {/* Support Modal */}
      <SupportModal />

      {/* Delivery Point Map Modal */}
      <DeliveryPointMapModal
        visible={showDeliveryMap}
        onClose={() => setShowDeliveryMap(false)}
        currentLocation={currentUserLocation}
        deliveryLocation={deliveryLocationData}
        deliveryName={order.deliveryAddress.location}
        deliveryAddress={order.deliveryAddress.address}
        onNavigate={handleNavigate}
      />
    </div>
  );
}