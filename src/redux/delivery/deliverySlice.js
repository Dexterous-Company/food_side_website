// deliverySlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  // From SelectRouteDelivery Page
  fromLocation: '',
  fromLocationDetailed: '',
  currentLocation: '',
  towardsLocation: '',
  selectedDate: null,
  selectedTime: null,
  formattedDate: '',
  formattedTime: '',
  pickupCoordinates: {
    lat: null,
    lng: null,
  },
  pickupAddressDetails: {
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  },
  routeSearch: {
    query: '',
    suggestions: [],
    matchedRoutes: [],
    matchedDeliveryPoints: [],
    loading: false,
    error: '',
  },

  // From SelectOnlyRoute Page
  selectedRoute: {
    _id: null,
    routeId: null,
    name: '',
    origin: '',
    destination: '',
    distanceKm: 0,
    totalDistance: 0,
    durationMinutes: 0,
    totalTime: 0,
    cityCount: 0,
    citiesCovered: [],
    description: '',
    status: {isActive: true},
    fare: null,
    fullRouteObject: null,
  },

  // From SelectDeliveryPoint Page
  selectedDeliveryPoint: {
    _id: null,
    name: '',
    address: {
      fullAddress: '',
      city: '',
      state: '',
      pincode: '',
    },
    contact: {
      personName: '',
      phone: '',
      alternatePhone: '',
    },
    timings: {
      openingTime: '',
      closingTime: '',
      workingDays: [],
    },
    status: {isActive: true},
    estimatedTimeFromStart: 0,
    fullPointObject: null,
  },

  // Combined Booking Data
  bookingData: {
    pickupLocation: '',
    dropLocation: '',
    routeName: '',
    deliveryPointName: '',
    dateTime: '',
    totalDistance: '',
    estimatedDuration: '',
  },

  // Status Flags
  isPickupSet: false,
  isDestinationSet: false,
  isRouteSelected: false,
  isDeliveryPointSelected: false,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    // ========== From SelectRouteDelivery Page ==========

    // Set pickup location with full details
    setPickupLocation: (state, action) => {
      const {
        fromLocation,
        fromLocationDetailed,
        currentLocation,
        coordinates,
        city,
        state: stateName,
        pincode,
        landmark,
      } = action.payload;

      state.fromLocation = fromLocation || '';
      state.fromLocationDetailed = fromLocationDetailed || '';
      state.currentLocation = currentLocation || '';
      state.pickupCoordinates = coordinates || {lat: null, lng: null};
      state.pickupAddressDetails = {
        city: city || '',
        state: stateName || '',
        pincode: pincode || '',
        landmark: landmark || '',
      };
      state.isPickupSet = true;
    },

    // Update from location
    updateFromLocation: (state, action) => {
      state.fromLocation = action.payload;
    },

    updateFromLocationDetailed: (state, action) => {
      state.fromLocationDetailed = action.payload;
    },

    // Set destination (towards)
    setTowardsLocation: (state, action) => {
      state.towardsLocation = action.payload;
      state.isDestinationSet = !!action.payload;
    },
    setRouteSearchQuery: (state, action) => {
      state.routeSearch.query = action.payload || '';
    },
    setRouteSearchLoading: (state, action) => {
      state.routeSearch.loading = action.payload;
      if (action.payload) {
        state.routeSearch.error = '';
      }
    },
    setRouteSearchResults: (state, action) => {
      const {
        query = '',
        suggestions = [],
        matchedRoutes = [],
        matchedDeliveryPoints = [],
      } = action.payload || {};

      state.routeSearch.query = query;
      state.routeSearch.suggestions = suggestions;
      state.routeSearch.matchedRoutes = matchedRoutes;
      state.routeSearch.matchedDeliveryPoints = matchedDeliveryPoints;
      state.routeSearch.loading = false;
      state.routeSearch.error = '';
    },
    setRouteSearchError: (state, action) => {
      state.routeSearch.loading = false;
      state.routeSearch.error = action.payload || 'Unable to fetch routes';
    },
    clearRouteSearch: state => {
      state.routeSearch = initialState.routeSearch;
    },

    // Set journey date and time
    setJourneyDateTime: (state, action) => {
      const {date, formattedDate, time, formattedTime} = action.payload;
      if (date !== undefined) {
        state.selectedDate = date;
      }
      if (formattedDate !== undefined) {
        state.formattedDate = formattedDate;
      }
      if (time !== undefined) {
        state.selectedTime = time;
      }
      if (formattedTime !== undefined) {
        state.formattedTime = formattedTime;
      }
    },

    setJourneyDate: (state, action) => {
      state.selectedDate = action.payload.date;
      state.formattedDate = action.payload.formattedDate;
    },

    setJourneyTime: (state, action) => {
      state.selectedTime = action.payload.time;
      state.formattedTime = action.payload.formattedTime;
    },

    // Update pickup coordinates
    updatePickupCoordinates: (state, action) => {
      state.pickupCoordinates = action.payload;
    },

    // ========== From SelectOnlyRoute Page ==========

    // Set selected route
    setSelectedRoute: (state, action) => {
      const route = action.payload;
      state.selectedRoute = {
        _id: route._id || null,
        routeId: route.routeId || null,
        name: route.name || route.routeId || '',
        origin: route.origin || '',
        destination: route.destination || '',
        distanceKm: route.distanceKm || route.totalDistance || 0,
        totalDistance: route.totalDistance || route.distanceKm || 0,
        durationMinutes: route.durationMinutes || route.totalTime || 0,
        totalTime: route.totalTime || route.durationMinutes || 0,
        cityCount: route.cityCount || route.citiesCovered?.length || 0,
        citiesCovered: route.citiesCovered || [],
        description: route.description || '',
        status: route.status || {isActive: true},
        fare: route.fare || null,
        fullRouteObject: route,
      };
      state.isRouteSelected = true;
    },

    // Clear selected route
    clearSelectedRoute: state => {
      state.selectedRoute = initialState.selectedRoute;
      state.isRouteSelected = false;
    },

    // Update specific route field
    updateRouteField: (state, action) => {
      const {field, value} = action.payload;
      if (field in state.selectedRoute) {
        state.selectedRoute[field] = value;
      }
    },

    // ========== From SelectDeliveryPoint Page ==========

    // Set selected delivery point
    setSelectedDeliveryPoint: (state, action) => {
      const point = action.payload;
      state.selectedDeliveryPoint = {
        _id: point._id || point.id || null,
        name: point.name || '',
        address: {
          fullAddress: point.address?.fullAddress || '',
          city: point.address?.city || '',
          state: point.address?.state || '',
          pincode: point.address?.pincode || '',
        },
        contact: {
          personName: point.contact?.personName || '',
          phone: point.contact?.phone || '',
          alternatePhone: point.contact?.alternatePhone || '',
        },
        timings: {
          openingTime: point.timings?.openingTime || '',
          closingTime: point.timings?.closingTime || '',
          workingDays: point.timings?.workingDays || [],
        },
        status: point.status || {isActive: true},
        estimatedTimeFromStart: point.estimatedTimeFromStart || 0,
        fullPointObject: point,
      };
      state.isDeliveryPointSelected = true;
    },

    // Clear selected delivery point
    clearSelectedDeliveryPoint: state => {
      state.selectedDeliveryPoint = initialState.selectedDeliveryPoint;
      state.isDeliveryPointSelected = false;
    },

    // Update specific delivery point field
    updateDeliveryPointField: (state, action) => {
      const {category, field, value} = action.payload;
      if (category && state.selectedDeliveryPoint[category]) {
        state.selectedDeliveryPoint[category][field] = value;
      } else if (field in state.selectedDeliveryPoint) {
        state.selectedDeliveryPoint[field] = value;
      }
    },

    // ========== Booking Summary ==========

    // Generate complete booking summary
    generateBookingSummary: state => {
      state.bookingData = {
        pickupLocation: state.fromLocationDetailed || state.fromLocation,
        dropLocation: state.selectedDeliveryPoint.name || state.towardsLocation,
        routeName: state.selectedRoute.name,
        deliveryPointName: state.selectedDeliveryPoint.name,
        dateTime: `${state.formattedDate} ${state.formattedTime}`,
        totalDistance: `${state.selectedRoute.distanceKm} km`,
        estimatedDuration: `${Math.floor(
          state.selectedRoute.durationMinutes / 60,
        )}h ${state.selectedRoute.durationMinutes % 60}m`,
      };
    },

    // Update booking data manually
    updateBookingData: (state, action) => {
      state.bookingData = {...state.bookingData, ...action.payload};
    },

    // ========== Complete Delivery Data ==========

    // Get all delivery data at once (for API submission)
    getAllDeliveryData: state => {
      return {
        pickup: {
          location: state.fromLocationDetailed,
          shortAddress: state.fromLocation,
          coordinates: state.pickupCoordinates,
          addressDetails: state.pickupAddressDetails,
        },
        destination: {
          location: state.towardsLocation,
        },
        journey: {
          date: state.selectedDate,
          formattedDate: state.formattedDate,
          time: state.selectedTime,
          formattedTime: state.formattedTime,
        },
        route: state.selectedRoute,
        deliveryPoint: state.selectedDeliveryPoint,
        bookingSummary: state.bookingData,
      };
    },

    // Set entire delivery data at once (for restoration)
    setAllDeliveryData: (state, action) => {
      const data = action.payload;
      if (data.pickup) {
        state.fromLocation = data.pickup.shortAddress || state.fromLocation;
        state.fromLocationDetailed =
          data.pickup.location || state.fromLocationDetailed;
        state.pickupCoordinates =
          data.pickup.coordinates || state.pickupCoordinates;
        state.pickupAddressDetails =
          data.pickup.addressDetails || state.pickupAddressDetails;
      }
      if (data.destination) {
        state.towardsLocation =
          data.destination.location || state.towardsLocation;
      }
      if (data.journey) {
        state.selectedDate = data.journey.date || state.selectedDate;
        state.formattedDate = data.journey.formattedDate || state.formattedDate;
        state.selectedTime = data.journey.time || state.selectedTime;
        state.formattedTime = data.journey.formattedTime || state.formattedTime;
      }
      if (data.route) {
        state.selectedRoute = data.route;
      }
      if (data.deliveryPoint) {
        state.selectedDeliveryPoint = data.deliveryPoint;
      }
      if (data.bookingSummary) {
        state.bookingData = data.bookingSummary;
      }
    },

    // ========== Reset Functions ==========

    // Reset everything
    resetAllDeliveryData: () => initialState,

    // Reset only pickup and destination (Step 1)
    resetPickupAndDestination: state => {
      state.fromLocation = '';
      state.fromLocationDetailed = '';
      state.currentLocation = '';
      state.towardsLocation = '';
      state.selectedDate = null;
      state.selectedTime = null;
      state.formattedDate = '';
      state.formattedTime = '';
      state.pickupCoordinates = {lat: null, lng: null};
      state.pickupAddressDetails = {
        city: '',
        state: '',
        pincode: '',
        landmark: '',
      };
      state.routeSearch = initialState.routeSearch;
      state.isPickupSet = false;
      state.isDestinationSet = false;
    },

    // Reset only route (Step 2)
    resetRouteSelection: state => {
      state.selectedRoute = initialState.selectedRoute;
      state.isRouteSelected = false;
    },

    // Reset only delivery point (Step 3)
    resetDeliveryPointSelection: state => {
      state.selectedDeliveryPoint = initialState.selectedDeliveryPoint;
      state.isDeliveryPointSelected = false;
    },

    // ========== Utility Functions ==========

    // Set status flags manually
    setPickupStatus: (state, action) => {
      state.isPickupSet = action.payload;
    },

    setDestinationStatus: (state, action) => {
      state.isDestinationSet = action.payload;
    },

    setRouteSelectedStatus: (state, action) => {
      state.isRouteSelected = action.payload;
    },

    setDeliveryPointSelectedStatus: (state, action) => {
      state.isDeliveryPointSelected = action.payload;
    },
  },
});

// ========== Export Actions ==========
export const {
  // From SelectRouteDelivery
  setPickupLocation,
  updateFromLocation,
  updateFromLocationDetailed,
  setTowardsLocation,
  setRouteSearchQuery,
  setRouteSearchLoading,
  setRouteSearchResults,
  setRouteSearchError,
  clearRouteSearch,
  setJourneyDateTime,
  setJourneyDate,
  setJourneyTime,
  updatePickupCoordinates,

  // From SelectOnlyRoute
  setSelectedRoute,
  clearSelectedRoute,
  updateRouteField,

  // From SelectDeliveryPoint
  setSelectedDeliveryPoint,
  clearSelectedDeliveryPoint,
  updateDeliveryPointField,

  // Booking Summary
  generateBookingSummary,
  updateBookingData,

  // Complete Data
  getAllDeliveryData,
  setAllDeliveryData,

  // Reset Functions
  resetAllDeliveryData,
  resetPickupAndDestination,
  resetRouteSelection,
  resetDeliveryPointSelection,

  // Status Setters
  setPickupStatus,
  setDestinationStatus,
  setRouteSelectedStatus,
  setDeliveryPointSelectedStatus,
} = deliverySlice.actions;

// ========== Selectors ==========

// Select specific pieces of state
export const BselectFromLocation = state => state.delivery.fromLocation;
export const selectFromLocationDetailed = state =>
  state.delivery.fromLocationDetailed;
export const selectTowardsLocation = state => state.delivery.towardsLocation;
export const selectFormattedDate = state => state.delivery.formattedDate;
export const selectFormattedTime = state => state.delivery.formattedTime;
export const selectSelectedRoute = state => state.delivery.selectedRoute;
export const selectSelectedDeliveryPoint = state =>
  state.delivery.selectedDeliveryPoint;
export const selectBookingData = state => state.delivery.bookingData;
export const selectPickupCoordinates = state =>
  state.delivery.pickupCoordinates;
export const selectPickupAddressDetails = state =>
  state.delivery.pickupAddressDetails;
export const selectRouteSearch = state => state.delivery.routeSearch;

// Status selectors
export const selectIsPickupSet = state => state.delivery.isPickupSet;
export const selectIsDestinationSet = state => state.delivery.isDestinationSet;
export const selectIsRouteSelected = state => state.delivery.isRouteSelected;
export const selectIsDeliveryPointSelected = state =>
  state.delivery.isDeliveryPointSelected;

// Complete data selector
export const selectCompleteDeliveryData = state => ({
  pickup: {
    location: state.delivery.fromLocationDetailed,
    shortAddress: state.delivery.fromLocation,
    coordinates: state.delivery.pickupCoordinates,
    addressDetails: state.delivery.pickupAddressDetails,
  },
  destination: {
    location: state.delivery.towardsLocation,
  },
  journey: {
    date: state.delivery.selectedDate,
    formattedDate: state.delivery.formattedDate,
    time: state.delivery.selectedTime,
    formattedTime: state.delivery.formattedTime,
  },
  route: state.delivery.selectedRoute,
  deliveryPoint: state.delivery.selectedDeliveryPoint,
  bookingSummary: state.delivery.bookingData,
  isComplete:
    state.delivery.isPickupSet &&
    state.delivery.isDestinationSet &&
    state.delivery.isRouteSelected &&
    state.delivery.isDeliveryPointSelected,
});

export default deliverySlice.reducer;
