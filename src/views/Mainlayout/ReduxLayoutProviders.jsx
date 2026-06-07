"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../redux/Store";
import { CartProvider } from "../../context/CartContext";
import { useEffect, useState } from "react";

export default function ReduxLayoutProviders({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate persistor={persistor} loading={null}>
          <CartProvider>{children}</CartProvider>
        </PersistGate>
      ) : (
        <CartProvider>{children}</CartProvider>
      )}
    </Provider>
  );
}
