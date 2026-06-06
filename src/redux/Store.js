import {configureStore} from '@reduxjs/toolkit';
import AuthenticationReducer from './Authentication/AuthenticationSlice';
import categoryReducer from './Category/CategorySlice';
import restaurantReducer from './Restaurant/RestaurantSlice';
import productReducer from './Product/ProductSlice';
import orderReducer from './Order/OrderSlice';
import cartReducer from './Cart/CartSlice';
import deliveryReducer from './delivery/deliverySlice';
import paymentReducer from './payment/paymentSlice';


export const store = configureStore({
  reducer: {
    Authentication: AuthenticationReducer,
    delivery: deliveryReducer,
    category: categoryReducer,
    restaurant: restaurantReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
