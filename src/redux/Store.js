// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import AuthenticationReducer from './Authentication/AuthenticationSlice';
import categoryReducer from './Category/CategorySlice';
import restaurantReducer from './Restaurant/RestaurantSlice';
import productReducer from './Product/ProductSlice';
import orderReducer from './Order/OrderSlice';
import cartReducer from './Cart/CartSlice';
import deliveryReducer from './delivery/deliverySlice';
import paymentReducer from './payment/paymentSlice';

// Configure persistence for delivery slice
const deliveryPersistConfig = {
  key: 'delivery',
  storage,
  whitelist: [
    'fromLocation',
    'fromLocationDetailed',
    'currentLocation',
    'towardsLocation',
    'selectedDate',
    'selectedTime',
    'formattedDate',
    'formattedTime',
    'pickupCoordinates',
    'pickupAddressDetails',
    'selectedRoute',
    'selectedDeliveryPoint',
    'bookingData',
    'isPickupSet',
    'isDestinationSet',
    'isRouteSelected',
    'isDeliveryPointSelected'
  ],
};

const persistedDeliveryReducer = persistReducer(deliveryPersistConfig, deliveryReducer);

export const store = configureStore({
  reducer: {
    Authentication: AuthenticationReducer,
    delivery: persistedDeliveryReducer,
    category: categoryReducer,
    restaurant: restaurantReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [
          'payload.fullRouteObject',
          'payload.fullPointObject',
          'payload.route',
          'payload.deliveryPoint'
        ],
        ignoredPaths: [
          'delivery.selectedRoute.fullRouteObject',
          'delivery.selectedDeliveryPoint.fullPointObject',
          'delivery.routeSearch.suggestions',
          'delivery.routeSearch.matchedRoutes',
          'delivery.routeSearch.matchedDeliveryPoints'
        ],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);