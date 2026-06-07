"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../redux/Store";
import { CartProvider } from "../context/CartContext";

export default function ReduxLayoutProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CartProvider>
          {children}
        </CartProvider>
      </PersistGate>
    </Provider>
  );
}