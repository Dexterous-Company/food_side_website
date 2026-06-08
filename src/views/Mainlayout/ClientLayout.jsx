

"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/views/components/Header";
import Footer from "@/views/components/Footer";
import FloatingCartBanner from "../cart/FloatingCartBanner";
import SwitchRestaurantModal from "@/views/components/SwitchRestaurantModal";
import { useCart } from "../../context/CartContext";
import MobileFooter from "../home/MobileFooter";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsDeliveryModalOpen, setPickupLocation } from "@/redux/delivery/deliverySlice";

const BANNER_ENABLED_ROUTES = [
  "/",
  "/favorites",
  "/dining",
  "/restaurant",
  "/SearchResult",
  "/product",
];

const BOTTOM_10_ROUTES = ["/restaurant", "/SearchResult", "/product"];

// Reverse geocode function to get address from coordinates
const reverseGeocode = async (lat, lng) => {
  try {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'AIzaSyDfjw4P4PnfI08-B-ljZDhEeQxnBqNv3hQ';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) throw new Error('Reverse geocoding failed');
    
    const data = await response.json();
    
    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      throw new Error('No results found');
    }
    
    const result = data.results.find((item) =>
      item.address_components?.some((component) =>
        component.types?.includes("postal_code"),
      ),
    ) || data.results[0];
    
    const addressComponents = result.address_components || [];
    const findComponent = (typesToFind) => {
      return addressComponents.find((component) =>
        typesToFind.some((type) => component.types?.includes(type)),
      )?.long_name;
    };
    
    const city = findComponent(["locality", "administrative_area_level_3"]) || '';
    const state = findComponent(["administrative_area_level_1"]) || '';
    const postcode = findComponent(["postal_code"]) || '';
    const road = findComponent(["route", "street_address"]) || '';
    
    const cleanedPostcode = postcode ? postcode.replace(/\s+/g, '').replace(/[^0-9]/g, '') : '';
    
    return {
      fromLocation: city || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      fromLocationDetailed: result.formatted_address || [road, city, state, cleanedPostcode].filter(Boolean).join(', '),
      city: city,
      state: state,
      pincode: cleanedPostcode,
      landmark: road,
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    return {
      fromLocation: fallback,
      fromLocationDetailed: fallback,
      city: '',
      state: '',
      pincode: '',
      landmark: '',
    };
  }
};

// Request GPS location permission and fetch location
const requestGeolocation = async (dispatch) => {
  if (!navigator?.geolocation) {
    console.log('Geolocation is not supported by your browser.');
    return;
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 60000,
        },
      );
    });

    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    // Reverse geocode to get actual address
    const addressData = await reverseGeocode(coords.lat, coords.lng);

    // Dispatch to Redux
    dispatch(
      setPickupLocation({
        fromLocation: addressData.fromLocation,
        fromLocationDetailed: addressData.fromLocationDetailed,
        currentLocation: addressData.fromLocationDetailed,
        coordinates: coords,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        landmark: addressData.landmark,
      }),
    );

    console.log('GPS location detected:', coords);
  } catch (error) {
    if (error.code === error.PERMISSION_DENIED) {
      console.log('Location permission denied by user.');
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      console.log('Location information is unavailable.');
    } else if (error.code === error.TIMEOUT) {
      console.log('The request to get location timed out.');
    } else {
      console.log('An error occurred while getting location:', error.message);
    }
  }
};

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  // useCart now returns safe fallback during SSR
  const { cartSummary, clearCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
    // Request GPS location permission when website loads
    requestGeolocation(dispatch);
  }, [dispatch]);

  // Desktop control
  const hideHeaderRoutes = ["/login", "/sign-up", "/register"];
  const hideFooterRoutes = ["/login", "/sign-up", "/register"];

  const isDeliveryModalOpen = useSelector(selectIsDeliveryModalOpen);
  const hideHeader = hideHeaderRoutes.includes(pathname) || isDeliveryModalOpen;
  const hideFooter = hideFooterRoutes.includes(pathname) || isDeliveryModalOpen;

  // Mobile control
  const hideHeaderMobileRoutes = [
    "/login",
    "/sign-up",
    "/register",
    "/cart",
    "/checkout",
    "/accounts",
    "/accounts/profile",
    "/accounts/orders",
    "/accounts/orders/:id",
    "/order_success"
  ];
  const hideFooterMobileRoutes = [
    "/login",
    "/sign-up",
    "/register",
    "/cart",
    "/checkout",
    "/order_success"
  ];

  const hideHeaderMobile = hideHeaderMobileRoutes.includes(pathname) || isDeliveryModalOpen;
  const hideFooterMobile = hideFooterMobileRoutes.includes(pathname) || isDeliveryModalOpen;

  // Banner
  const shouldShowBanner = BANNER_ENABLED_ROUTES.includes(pathname);
  const useBottom10 = BOTTOM_10_ROUTES.includes(pathname);
  const bottomOffset = useBottom10 ? 10 : undefined;

  // Only show cart banner after mount and when cart has items
  const showCartBanner = isMounted && shouldShowBanner && cartSummary;

  return (
    <>
      {!hideHeaderRoutes.includes(pathname) && (
        <div className={`hidden sm:block ${hideHeader ? "invisible pointer-events-none" : ""}`}>
          <Header />
        </div>
      )}

      {!hideHeaderMobileRoutes.includes(pathname) && (
        <div className={`block sm:hidden ${hideHeaderMobile ? "invisible pointer-events-none" : ""}`}>
          <Header />
        </div>
      )}

      <main
        className={`flex-1 ${!hideHeader ? "md:pt-15" : ""} ${!hideHeaderMobile ? "pt-15 sm:pt-0" : ""}`}
      >
        {children}
      </main>

      {showCartBanner && (
        <div className="block md:hidden">
          <FloatingCartBanner
            visible={!!cartSummary}
            restaurantName={cartSummary?.restaurant?.title}
            restaurantImage={cartSummary?.restaurant?.products?.[0]?.image}
            totalItems={cartSummary?.totalItems}
            totalPrice={cartSummary?.totalPrice}
            bottomOffset={bottomOffset}
            onPressMenu={() => {
              if (cartSummary?.restaurant) {
                router.push("/restaurant-page");
              }
            }}
            onPressCart={() => router.push("/cart")}
            onPressClear={clearCart}
          />
        </div>
      )}

      {!hideFooterRoutes.includes(pathname) && (
        <div className={`hidden sm:block ${hideFooter ? "invisible pointer-events-none" : ""}`}>
          <Footer />
        </div>
      )}

      {!hideFooterMobileRoutes.includes(pathname) && (
        <div className={`block sm:hidden ${hideFooterMobile ? "invisible pointer-events-none" : ""}`}>
          <MobileFooter />
        </div>
      )}

      <SwitchRestaurantModal />
    </>
  );
}
