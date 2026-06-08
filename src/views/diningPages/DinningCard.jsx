// DinningCard.js - Complete with Toast Notifications (Single Version)
"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Helper function to format address object to string
const formatAddressToString = (address) => {
  if (!address) return "Location not specified";
  if (typeof address === "string") return address;
  if (typeof address === "object") {
    const parts = [];
    if (address.area) parts.push(address.area);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.pincode) parts.push(address.pincode);
    if (address.country) parts.push(address.country);
    if (parts.length > 0) return parts.join(", ");
    return "Location not specified";
  }
  return "Location not specified";
};

// Helper function to format location (GeoJSON) to string
const formatLocationToString = (location) => {
  if (!location) return null;
  if (typeof location === "string") return location;
  if (location.coordinates && Array.isArray(location.coordinates)) {
    return `${location.coordinates[0]}, ${location.coordinates[1]}`;
  }
  return null;
};

// Normalize restaurant data for dining screen
const normalizeDiningRestaurant = (restaurant, index) => {
  let locationString = "Location not specified";

  if (restaurant?.address && typeof restaurant.address === "object") {
    locationString = formatAddressToString(restaurant.address);
  } else if (restaurant?.address && typeof restaurant.address === "string") {
    locationString = restaurant.address;
  } else if (
    restaurant?.locationName &&
    typeof restaurant.locationName === "string"
  ) {
    locationString = restaurant.locationName;
  } else if (restaurant?.location) {
    const locString = formatLocationToString(restaurant.location);
    if (locString) locationString = locString;
  }

  return {
    id: restaurant?.id || restaurant?._id || `restaurant-${index}`,
    name: restaurant?.name || restaurant?.title || `Restaurant ${index + 1}`,
    image:
      restaurant?.image ||
      restaurant?.coverImage ||
      restaurant?.thumbnail ||
      restaurant?.photos?.[0] ||
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
    category: restaurant?.cuisine || "Multi-Cuisine",
    location: locationString,
    time: restaurant?.deliveryTime || "30-40 min",
    distance: `${(Math.random() * 5 + 0.5).toFixed(1)} km`,
    offer: restaurant?.offer || restaurant?.tagline || "Special Offer",
    rating: restaurant?.rating || "4.0",
    products: restaurant?.products || [],
    originalRestaurant: restaurant,
  };
};

// Extract restaurant list from API response
const extractRestaurantList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.restaurants)) return payload.restaurants;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.restaurants))
    return payload.data.restaurants;
  if (Array.isArray(payload?.product)) return payload.product;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.restaurant)) return payload.restaurant;
  return [];
};

const getRequestErrorMessage = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "Failed to load restaurants";
};

// Shimmer/Skeleton Component
const SkeletonCard = () => (
  <div className="flex flex-row bg-white mx-2 sm:mx-3 mb-1.5 p-1.5 sm:p-2 relative border border-gray-100 rounded-xl sm:rounded-2xl animate-pulse">
    <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-12 sm:w-14 h-4 sm:h-5 bg-gray-200 rounded-t-xl sm:rounded-t-2xl rounded-br-xl sm:rounded-br-2xl z-10" />
    <div className="w-[25vw] h-[25vw] sm:w-[27vw] sm:h-[27vw] max-w-[100px] max-h-[100px] sm:max-w-[120px] sm:max-h-[120px] bg-gray-200 rounded-xl sm:rounded-2xl" />
    <div className="flex-1 ml-2 sm:ml-2.5 justify-center">
      <div className="flex flex-row justify-between items-start">
        <div className="flex-1">
          <div className="w-[70%] sm:w-[72%] h-4 sm:h-5 bg-gray-200 rounded-md" />
          <div className="w-[85%] sm:w-[86%] h-3 sm:h-3.5 bg-gray-200 rounded-md mt-1 sm:mt-1.5" />
        </div>
        <div className="w-[5vw] h-[5vw] sm:w-[5.5vw] sm:h-[5.5vw] max-w-[20px] max-h-[20px] sm:max-w-[24px] sm:max-h-[24px] bg-gray-200 rounded-full" />
      </div>
      <div className="w-full h-px bg-gray-200 my-1 sm:my-1.5" />
      <div className="w-[60%] sm:w-[64%] h-3 sm:h-3.5 bg-gray-200 rounded-md mb-0.5 sm:mb-1" />
      <div className="w-[90%] sm:w-[92%] h-3 sm:h-3.5 bg-gray-200 rounded-md" />
    </div>
  </div>
);

const Card = ({
  ListHeaderComponent = null,
  bottomInset = 0,
  listProps = {},
}) => {
  const router = useRouter();
  const { selectedDeliveryPoint } = useSelector((state) => state.delivery);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  const hasSelectedDeliveryPoint = Boolean(
    selectedDeliveryPoint?._id || selectedDeliveryPoint?.id,
  );
  const deliveryPointLabel =
    selectedDeliveryPoint?.name ||
    selectedDeliveryPoint?.address?.city ||
    "this delivery point";
  const isEmptyForSelectedDeliveryPoint =
    hasSelectedDeliveryPoint &&
    !isLoading &&
    restaurants.length === 0 &&
    error === "No restaurants available for this delivery point.";

  // Save favorites to localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("dining_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error parsing favorites:", e);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dining_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchRestaurants = useCallback(async () => {
    const deliveryPointId =
      selectedDeliveryPoint?._id || selectedDeliveryPoint?.id;

    setIsLoading(true);
    setError("");

    try {
      if (deliveryPointId) {
        const requestUrl = `${BaseUrl}/api/v1/delivery/restaurants-with-products/by-delivery-point/${deliveryPointId}`;
        const response = await axios.get(requestUrl);

        const rawRestaurants = extractRestaurantList(response?.data);
        const normalizedRestaurants = rawRestaurants
          .map((restaurant, idx) => normalizeDiningRestaurant(restaurant, idx))
          .filter(
            (restaurant) =>
              Array.isArray(restaurant.products) &&
              restaurant.products.length > 0,
          );

        setRestaurants(normalizedRestaurants);

        if (normalizedRestaurants.length === 0) {
          setError("No restaurants available for this delivery point.");
        }
      } else {
        setRestaurants([]);
        setError("Please select a delivery location");
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError(getRequestErrorMessage(err));
      setRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDeliveryPoint]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleFavorite = useCallback((item) => {
    setFavorites((prev) => {
      const exists = prev.includes(item.id);
      let updatedFavorites = [];

      if (exists) {
        updatedFavorites = prev.filter((id) => id !== item.id);
        // Toast for removed from wishlist
        toast.error(`Removed ${item.name} from wishlist`, {
          duration: 2000,
          position: "bottom-center",
          icon: "💔",
        });
      } else {
        updatedFavorites = [...prev, item.id];
        // Toast for added to wishlist
        toast.success(`Added ${item.name} to wishlist`, {
          duration: 2000,
          position: "bottom-center",
          icon: "❤️",
        });
      }

      return updatedFavorites;
    });
  }, []);

  const handleRestaurantPress = useCallback(
    (restaurant) => {
      router.push(`/restaurant-page/${restaurant.id}`);
    },
    [router],
  );

  const renderSkeletons = () => (
    <>
      {[...Array(5)].map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} />
      ))}
    </>
  );

  const renderEmptyState = () => {
    if (isEmptyForSelectedDeliveryPoint) {
      return (
        <div className="mx-3 sm:mx-4 mt-4 sm:mt-6 mb-3 sm:mb-4 flex flex-col items-center">
          <div className="w-28 sm:w-32 h-28 sm:h-32 items-center justify-center mb-[-2.5rem] sm:mb-[-3rem] z-10 relative">
            <div className="absolute w-[6.5rem] sm:w-[7.5rem] h-[6.5rem] sm:h-[7.5rem] rounded-full bg-orange-50" />
            <div className="w-[4rem] sm:w-[4.75rem] h-[4rem] sm:h-[4.75rem] rounded-full bg-amber-50 border border-amber-200 items-center justify-center flex">
              <svg
                className="w-8 sm:w-10 h-8 sm:h-10 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
                />
              </svg>
            </div>
            <div className="absolute right-2 sm:right-3 bottom-3 sm:bottom-4 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-orange-500 items-center justify-center flex border-2 border-white">
              <svg
                className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>

          <div className="w-full bg-amber-50 rounded-2xl sm:rounded-3xl border border-amber-200 pt-10 sm:pt-12 pb-4 sm:pb-5 px-4 sm:px-5">
            <p className="text-center text-orange-600 text-[0.65rem] sm:text-xs font-extrabold uppercase tracking-wide mb-1 sm:mb-1.5">
              No Dining Options Yet
            </p>
            <p className="text-center text-stone-800 text-lg sm:text-xl font-extrabold leading-7 sm:leading-8">
              Nothing is available for {deliveryPointLabel} right now
            </p>
            <p className="text-center text-stone-600 text-xs sm:text-sm leading-5 sm:leading-6 mt-2 sm:mt-2.5">
              We checked this delivery point, but there are no restaurants with
              active menu items at the moment. Please try another delivery point
              or check back later.
            </p>
            <div className="flex flex-row justify-center flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <button className="flex flex-row items-center gap-1.5 sm:gap-2 bg-orange-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
                <svg
                  className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-amber-800 text-[0.65rem] sm:text-xs font-bold">
                  Fresh updates soon
                </span>
              </button>
              <button
                onClick={() => router.back()}
                className="flex flex-row items-center gap-1.5 sm:gap-2 bg-orange-100 rounded-full px-3 sm:px-4 py-1 sm:py-1.5"
              >
                <svg
                  className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span className="text-amber-800 text-[0.65rem] sm:text-xs font-bold">
                  Try another point
                </span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (error && !isEmptyForSelectedDeliveryPoint) {
      return (
        <div className="p-6 sm:p-8 items-center justify-center mx-3 sm:mx-4 bg-red-50 rounded-lg sm:rounded-xl mt-3 sm:mt-4">
          <svg
            className="w-8 sm:w-10 h-8 sm:h-10 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm sm:text-base text-red-500 text-center mt-2 sm:mt-2.5 mb-4 sm:mb-5">
            {error}
          </p>
          <button
            onClick={fetchRestaurants}
            className="bg-red-500 px-5 sm:px-6 py-1.5 sm:py-2 rounded-lg mx-auto block"
          >
            <span className="text-white font-semibold text-xs sm:text-sm">
              Retry
            </span>
          </button>
        </div>
      );
    }

    return null;
  };

  const ListHeader = () => (
    <>
      {ListHeaderComponent}
      <div className="mx-2 sm:mx-3 mb-1.5 sm:mb-2 pt-4 sm:pt-6 flex flex-row justify-between items-center">
        <h2 className="text-sm sm:text-base font-bold text-center text-gray-900">
          {isLoading
            ? "Loading Restaurants..."
            : restaurants.length > 0
              ? "Trending Restaurants"
              : "No Restaurants Found"}
        </h2>
      </div>
    </>
  );

  const { onScroll, ...restListProps } = listProps;

  return (
    <div className="flex-1 mt-1.5 sm:mt-2 bg-white">
      {/* Toaster Component */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "9999px",
            padding: "8px 16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#ff581b",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: `${bottomInset}px` }}
        onScroll={onScroll}
        {...restListProps}
      >
        <ListHeader />

        {isLoading ? (
          renderSkeletons()
        ) : restaurants.length > 0 ? (
          <div>
            {restaurants.map((item) => {
              const isFavorite = favorites.includes(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleRestaurantPress(item)}
                  className="w-full text-left cursor-pointer transition-transform active:scale-[0.98]"
                >
                  <div className="flex flex-row bg-white mx-2 sm:mx-3 mb-1.5 p-1.5 sm:p-2 relative border border-gray-100 rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow">
                    {/* OFFER BADGE */}
                    {item.offer && item.offer !== "Special Offer" && (
                      <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-red-500 px-1.5 sm:px-2 py-0.5 rounded-t-xl sm:rounded-t-2xl rounded-br-xl sm:rounded-br-2xl z-10">
                        <span className="text-white text-[0.6rem] sm:text-[0.7rem] font-bold">
                          {item.offer}
                        </span>
                      </div>
                    )}

                    {/* RESTAURANT IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[25vw] h-[25vw] sm:w-[27vw] sm:h-[27vw] max-w-[100px] max-h-[100px] sm:max-w-[120px] sm:max-h-[120px] rounded-xl sm:rounded-2xl object-cover"
                      loading="lazy"
                    />

                    {/* RIGHT CONTENT */}
                    <div className="flex-1 ml-2 sm:ml-2.5 justify-center">
                      <div className="flex flex-row justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-[3.8vw] sm:text-[4.5vw] md:text-base font-bold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="mt-0.5 text-[2.5vw] sm:text-[2.8vw] md:text-xs text-gray-500 truncate">
                            {item.category}
                          </p>
                        </div>

                        {/* FAVORITE BUTTON */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavorite(item);
                          }}
                          className="focus:outline-none"
                          aria-label="Add to favorites"
                        >
                          <svg
                            className={`w-[4.5vw] h-[4.5vw] sm:w-[5.5vw] sm:h-[5.5vw] max-w-[20px] max-h-[20px] sm:max-w-[24px] sm:max-h-[24px] ${isFavorite ? "text-red-500" : "text-gray-800"}`}
                            fill={isFavorite ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* DIVIDER LINE */}
                      <div className="border-t border-dotted border-gray-300 my-1 sm:my-1.5" />

                      {/* LOCATION */}
                      <div className="flex flex-row items-center mb-0.5 sm:mb-1">
                        <svg
                          className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-yellow-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="ml-1 text-[2.5vw] sm:text-[2.9vw] md:text-xs text-gray-700 truncate">
                          {item.location}
                        </span>
                      </div>

                      {/* DELIVERY INFO */}
                      <div className="flex flex-row items-center flex-wrap">
                        <svg
                          className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-yellow-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="ml-1 text-[2.5vw] sm:text-[2.9vw] md:text-xs text-gray-700">
                          {item.time}
                        </span>
                        <span className="mx-1 text-[2.5vw] sm:text-[2.8vw] text-gray-500">
                          •
                        </span>
                        <span className="text-[2.5vw] sm:text-[2.9vw] md:text-xs text-gray-700">
                          {item.distance}
                        </span>
                        <span className="mx-1 text-[2.5vw] sm:text-[2.8vw] text-gray-500">
                          •
                        </span>
                        <span className="text-[2.5vw] sm:text-[2.9vw] md:text-xs text-gray-700">
                          Free Delivery
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          renderEmptyState()
        )}
      </div>
    </div>
  );
};

export default React.memo(Card);
