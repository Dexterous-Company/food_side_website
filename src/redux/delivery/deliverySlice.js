// redux/delivery/deliverySlice.js
import { createSelector, createSlice } from '@reduxjs/toolkit';

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
    status: { isActive: true },
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
    status: { isActive: true },
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
  
  // Modal State
  isDeliveryModalOpen: false,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    // ========== From SelectRouteDelivery Page ==========
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
      state.pickupCoordinates = coordinates || { lat: null, lng: null };
      state.pickupAddressDetails = {
        city: city || '',
        state: stateName || '',
        pincode: pincode || '',
        landmark: landmark || '',
      };
      state.isPickupSet = true;
    },

    updateFromLocation: (state, action) => {
      state.fromLocation = action.payload;
    },

    updateFromLocationDetailed: (state, action) => {
      state.fromLocationDetailed = action.payload;
    },

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

    setJourneyDateTime: (state, action) => {
      const { date, formattedDate, time, formattedTime } = action.payload;
      if (date !== undefined) state.selectedDate = date;
      if (formattedDate !== undefined) state.formattedDate = formattedDate;
      if (time !== undefined) state.selectedTime = time;
      if (formattedTime !== undefined) state.formattedTime = formattedTime;
    },

    setJourneyDate: (state, action) => {
      state.selectedDate = action.payload.date;
      state.formattedDate = action.payload.formattedDate;
    },

    setJourneyTime: (state, action) => {
      state.selectedTime = action.payload.time;
      state.formattedTime = action.payload.formattedTime;
    },

    updatePickupCoordinates: (state, action) => {
      state.pickupCoordinates = action.payload;
    },

    // ========== From SelectOnlyRoute Page ==========
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
        status: route.status || { isActive: true },
        fare: route.fare || null,
        fullRouteObject: route,
      };
      state.isRouteSelected = true;
    },

    clearSelectedRoute: state => {
      state.selectedRoute = initialState.selectedRoute;
      state.isRouteSelected = false;
    },

    updateRouteField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state.selectedRoute) {
        state.selectedRoute[field] = value;
      }
    },

    // ========== From SelectDeliveryPoint Page ==========
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
        status: point.status || { isActive: true },
        estimatedTimeFromStart: point.estimatedTimeFromStart || 0,
        fullPointObject: point,
      };
      state.isDeliveryPointSelected = true;
    },

    clearSelectedDeliveryPoint: state => {
      state.selectedDeliveryPoint = initialState.selectedDeliveryPoint;
      state.isDeliveryPointSelected = false;
    },

    updateDeliveryPointField: (state, action) => {
      const { category, field, value } = action.payload;
      if (category && state.selectedDeliveryPoint[category]) {
        state.selectedDeliveryPoint[category][field] = value;
      } else if (field in state.selectedDeliveryPoint) {
        state.selectedDeliveryPoint[field] = value;
      }
    },

    // ========== Booking Summary ==========
    generateBookingSummary: state => {
      state.bookingData = {
        pickupLocation: state.fromLocationDetailed || state.fromLocation,
        dropLocation: state.selectedDeliveryPoint.name || state.towardsLocation,
        routeName: state.selectedRoute.name,
        deliveryPointName: state.selectedDeliveryPoint.name,
        dateTime: `${state.formattedDate} ${state.formattedTime}`,
        totalDistance: `${state.selectedRoute.distanceKm} km`,
        estimatedDuration: `${Math.floor(state.selectedRoute.durationMinutes / 60)}h ${state.selectedRoute.durationMinutes % 60}m`,
      };
    },

    updateBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload };
    },

    // ========== Complete Delivery Data ==========
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

    setAllDeliveryData: (state, action) => {
      const data = action.payload;
      if (data.pickup) {
        state.fromLocation = data.pickup.shortAddress || state.fromLocation;
        state.fromLocationDetailed = data.pickup.location || state.fromLocationDetailed;
        state.pickupCoordinates = data.pickup.coordinates || state.pickupCoordinates;
        state.pickupAddressDetails = data.pickup.addressDetails || state.pickupAddressDetails;
      }
      if (data.destination) {
        state.towardsLocation = data.destination.location || state.towardsLocation;
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
    resetAllDeliveryData: () => initialState,

    resetPickupAndDestination: state => {
      state.fromLocation = '';
      state.fromLocationDetailed = '';
      state.currentLocation = '';
      state.towardsLocation = '';
      state.selectedDate = null;
      state.selectedTime = null;
      state.formattedDate = '';
      state.formattedTime = '';
      state.pickupCoordinates = { lat: null, lng: null };
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

    resetRouteSelection: state => {
      state.selectedRoute = initialState.selectedRoute;
      state.isRouteSelected = false;
    },

    resetDeliveryPointSelection: state => {
      state.selectedDeliveryPoint = initialState.selectedDeliveryPoint;
      state.isDeliveryPointSelected = false;
    },

    // ========== Utility Functions ==========
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
    
    // ========== Modal State ==========
    setDeliveryModalOpen: (state, action) => {
      state.isDeliveryModalOpen = action.payload;
    },
  },
});

// ========== Export Actions ==========
export const {
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
  setSelectedRoute,
  clearSelectedRoute,
  updateRouteField,
  setSelectedDeliveryPoint,
  clearSelectedDeliveryPoint,
  updateDeliveryPointField,
  generateBookingSummary,
  updateBookingData,
  getAllDeliveryData,
  setAllDeliveryData,
  resetAllDeliveryData,
  resetPickupAndDestination,
  resetRouteSelection,
  resetDeliveryPointSelection,
  setPickupStatus,
  setDestinationStatus,
  setRouteSelectedStatus,
  setDeliveryPointSelectedStatus,
  setDeliveryModalOpen,
} = deliverySlice.actions;

// ========== Selectors ==========
export const BselectFromLocation = state => state.delivery.fromLocation;
export const selectFromLocationDetailed = state => state.delivery.fromLocationDetailed;
export const selectTowardsLocation = state => state.delivery.towardsLocation;
export const selectFormattedDate = state => state.delivery.formattedDate;
export const selectFormattedTime = state => state.delivery.formattedTime;
export const selectSelectedRoute = state => state.delivery.selectedRoute;
export const selectSelectedDeliveryPoint = state => state.delivery.selectedDeliveryPoint;
export const selectBookingData = state => state.delivery.bookingData;
export const selectPickupCoordinates = state => state.delivery.pickupCoordinates;
export const selectPickupAddressDetails = state => state.delivery.pickupAddressDetails;
export const selectRouteSearch = state => state.delivery.routeSearch;
export const selectIsPickupSet = state => state.delivery.isPickupSet;
export const selectIsDestinationSet = state => state.delivery.isDestinationSet;
export const selectIsRouteSelected = state => state.delivery.isRouteSelected;
export const selectIsDeliveryPointSelected = state => state.delivery.isDeliveryPointSelected;
export const selectIsDeliveryModalOpen = state => state.delivery.isDeliveryModalOpen;

export const selectCompleteDeliveryData = createSelector(
  [
    BselectFromLocation,
    selectFromLocationDetailed,
    selectTowardsLocation,
    selectFormattedDate,
    selectFormattedTime,
    selectSelectedRoute,
    selectSelectedDeliveryPoint,
    selectBookingData,
    selectPickupCoordinates,
    selectPickupAddressDetails,
    selectIsPickupSet,
    selectIsDestinationSet,
    selectIsRouteSelected,
    selectIsDeliveryPointSelected,
    state => state.delivery.selectedDate,
    state => state.delivery.selectedTime,
  ],
  (
    fromLocation,
    fromLocationDetailed,
    towardsLocation,
    formattedDate,
    formattedTime,
    selectedRoute,
    selectedDeliveryPoint,
    bookingData,
    pickupCoordinates,
    pickupAddressDetails,
    isPickupSet,
    isDestinationSet,
    isRouteSelected,
    isDeliveryPointSelected,
    selectedDate,
    selectedTime,
  ) => ({
    pickup: {
      location: fromLocationDetailed,
      shortAddress: fromLocation,
      coordinates: pickupCoordinates,
      addressDetails: pickupAddressDetails,
    },
    destination: {
      location: towardsLocation,
    },
    journey: {
      date: selectedDate,
      formattedDate,
      time: selectedTime,
      formattedTime,
    },
    route: selectedRoute,
    deliveryPoint: selectedDeliveryPoint,
    bookingSummary: bookingData,
    isComplete:
      isPickupSet &&
      isDestinationSet &&
      isRouteSelected &&
      isDeliveryPointSelected,
  }),
);

export default deliverySlice.reducer;
