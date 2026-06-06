import axios from 'axios';
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const REQUEST_TIMEOUT = 12000;

const normalizeErrorMessage = error =>
  error?.response?.data?.message ||
  error?.message ||
  'Unable to fetch destination suggestions.';

export const searchRouteDestinations = async ({
  query,
  currentLocation,
  city,
  latitude,
  longitude,
}) => {
  const response = await axios.get(
    `${BaseUrl}/api/v1/delivery/route-suggestions`,
    {
      params: {
        query,
        currentLocation,
        city,
        latitude,
        longitude,
      },
      timeout: REQUEST_TIMEOUT,
    },
  );

  const payload = response?.data || {};

  if (!payload.success) {
    throw new Error(payload.message || 'Unable to fetch route suggestions.');
  }

  return {
    suggestions: payload.suggestions || [],
    routes: payload.routes || [],
    deliveryPoints: payload.deliveryPoints || [],
  };
};

export const getDeliveryPointsByRoute = async routeId => {
  const response = await axios.get(
    `${BaseUrl}/api/v1/delivery/delivery-points/by-route/${routeId}`,
    {
      timeout: REQUEST_TIMEOUT,
    },
  );

  const payload = response?.data || {};

  if (!payload.success) {
    throw new Error(payload.message || 'Unable to fetch delivery points.');
  }

  return payload.data || [];
};

export {normalizeErrorMessage};
