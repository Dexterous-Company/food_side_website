import React, {createContext, useCallback, useContext, useMemo, useState, useEffect} from 'react';

const CartContext = createContext(null);

const parsePriceValue = price => {
  const numericPrice = Number(String(price || '').replace(/[^\d]/g, ''));
  return Number.isFinite(numericPrice) ? numericPrice : 0;
};

const getEffectivePrice = product =>
  parsePriceValue(product?.discount_price || product?.price);

const normalizeIsVeg = value => {
  if (value === false || value === 'false' || value === 0 || value === '0') {
    return false;
  }

  if (value === true || value === 'true' || value === 1 || value === '1') {
    return true;
  }

  return true;
};

const resolveRestaurantMongoId = restaurant =>
  restaurant?._id || restaurant?.id || restaurant?.restaurantId || null;

const resolveRestaurantBusinessId = restaurant =>
  restaurant?.RESTID || restaurant?.restId || null;

// Helper functions for localStorage
const saveCartToLocalStorage = (cartMap, activeRestaurantId, switchRequest) => {
  if (typeof window !== 'undefined') {
    try {
      const cartData = {
        cartMap,
        activeRestaurantId,
        switchRequest,
        timestamp: Date.now()
      };
      localStorage.setItem('food_cart_data', JSON.stringify(cartData));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }
};

const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedData = localStorage.getItem('food_cart_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Optional: Check if data is not too old (e.g., 7 days)
        const isExpired = Date.now() - (parsed.timestamp || 0) > 7 * 24 * 60 * 60 * 1000;
        if (!isExpired) {
          return {
            cartMap: parsed.cartMap || {},
            activeRestaurantId: parsed.activeRestaurantId || null,
            switchRequest: parsed.switchRequest || null,
          };
        } else {
          // Clear expired data
          localStorage.removeItem('food_cart_data');
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }
  return {
    cartMap: {},
    activeRestaurantId: null,
    switchRequest: null,
  };
};

export const CartProvider = ({children}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartMap, setCartMap] = useState({});
  const [activeRestaurantId, setActiveRestaurantId] = useState(null);
  const [switchRequest, setSwitchRequest] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setCartMap(savedCart.cartMap);
    setActiveRestaurantId(savedCart.activeRestaurantId);
    setSwitchRequest(savedCart.switchRequest);
    setIsMounted(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      saveCartToLocalStorage(cartMap, activeRestaurantId, switchRequest);
    }
  }, [cartMap, activeRestaurantId, switchRequest, isMounted]);

  const clearCart = useCallback(() => {
    setCartMap({});
    setActiveRestaurantId(null);
    setSwitchRequest(null);
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('food_cart_data');
    }
  }, []);

  const addItemDirect = useCallback(({restaurant, product}) => {
    const restaurantId = resolveRestaurantMongoId(restaurant);
    const RESTID = resolveRestaurantBusinessId(restaurant);
    const productId = product?.id || product?._id;

    if (!restaurantId || !productId) {
      return;
    }

    const key = `${restaurantId}-${productId}`;

    setCartMap(prev => {
      const existing = prev[key];

      return {
        ...prev,
        [key]: {
          key,
          restaurantId,
          RESTID,
          restaurant,
          productId,
          product,
          qty: (existing?.qty || 0) + 1,
        },
      };
    });
    setActiveRestaurantId(restaurantId);
  }, []);

  const addItem = useCallback(
    ({restaurant, product}) => {
      const restaurantId = resolveRestaurantMongoId(restaurant);
      const productId = product?.id || product?._id;

      if (!restaurantId || !productId) {
        return;
      }

      const hasItems = Object.keys(cartMap).length > 0;
      const isDifferentRestaurant =
        activeRestaurantId && activeRestaurantId !== restaurantId;

      if (hasItems && isDifferentRestaurant) {
        setSwitchRequest({restaurant, product});
        return;
      }

      addItemDirect({restaurant, product});
    },
    [activeRestaurantId, addItemDirect, cartMap],
  );

  const replaceCartWithItem = useCallback(({restaurant, product}) => {
    const restaurantId = resolveRestaurantMongoId(restaurant);
    const RESTID = resolveRestaurantBusinessId(restaurant);
    const productId = product?.id || product?._id;

    if (!restaurantId || !productId) {
      return;
    }

    const key = `${restaurantId}-${productId}`;

    setCartMap({
      [key]: {
        key,
        restaurantId,
        RESTID,
        restaurant,
        productId,
        product,
        qty: 1,
      },
    });
    setActiveRestaurantId(restaurantId);
    setSwitchRequest(null);
  }, []);

  const confirmReplaceCart = useCallback(() => {
    if (!switchRequest) {
      return;
    }

    replaceCartWithItem(switchRequest);
  }, [replaceCartWithItem, switchRequest]);

  const cancelReplaceCart = useCallback(() => {
    setSwitchRequest(null);
  }, []);

  const decreaseItem = useCallback((restaurantId, productId) => {
    const key = `${restaurantId}-${productId}`;

    setCartMap(prev => {
      const existing = prev[key];

      if (!existing) {
        return prev;
      }

      if (existing.qty <= 1) {
        const updated = {...prev};
        delete updated[key];
        if (Object.keys(updated).length === 0) {
          setActiveRestaurantId(null);
        }
        return updated;
      }

      return {
        ...prev,
        [key]: {
          ...existing,
          qty: existing.qty - 1,
        },
      };
    });
  }, []);

  const increaseItem = useCallback((restaurantId, productId) => {
    const key = `${restaurantId}-${productId}`;

    setCartMap(prev => {
      const existing = prev[key];
      if (!existing) {
        return prev;
      }

      return {
        ...prev,
        [key]: {
          ...existing,
          qty: existing.qty + 1,
        },
      };
    });
  }, []);

  const removeItem = useCallback((restaurantId, productId) => {
    const key = `${restaurantId}-${productId}`;

    setCartMap(prev => {
      const updated = {...prev};
      delete updated[key];
      if (Object.keys(updated).length === 0) {
        setActiveRestaurantId(null);
      }
      return updated;
    });
  }, []);

  const cartEntries = useMemo(() => Object.values(cartMap), [cartMap]);

  const cartQuantities = useMemo(() => {
    return cartEntries.reduce((acc, entry) => {
      acc[entry.key] = entry.qty;
      return acc;
    }, {});
  }, [cartEntries]);

  const cartList = useMemo(() => {
    return cartEntries.map(entry => {
      const normalizedIsVeg = normalizeIsVeg(entry.product?.isVeg);

      return {
        id: entry.key,
        restaurantId: entry.restaurantId,
        restaurantMongoId: entry.restaurantId,
        RESTID: entry.RESTID || null,
        productId: entry.productId,
        name: entry.product?.name || 'Item',
        subTitle:
          entry.product?.description ||
          entry.restaurant?.title ||
          'Freshly prepared',
        image: entry.product?.image,
        oldPrice: parsePriceValue(entry.product?.price),
        newPrice: getEffectivePrice(entry.product),
        qty: entry.qty,
        discount:
          entry.product?.discount_price &&
          parsePriceValue(entry.product.discount_price) <
            parsePriceValue(entry.product.price)
            ? 'SAVE'
            : '',
        isVeg: normalizedIsVeg,
        restaurant: entry.restaurant,
        product: entry.product,
      };
    });
  }, [cartEntries]);

  const cartSummary = useMemo(() => {
    if (!cartEntries.length) {
      return null;
    }

    const activeEntry =
      cartEntries.find(entry => entry.restaurantId === activeRestaurantId) ||
      cartEntries[0];

    const totalItems = cartEntries.reduce((sum, entry) => sum + entry.qty, 0);
    const totalPrice = cartEntries.reduce(
      (sum, entry) => sum + getEffectivePrice(entry.product) * entry.qty,
      0,
    );

    return {
      restaurant: activeEntry.restaurant,
      totalItems,
      totalPrice,
    };
  }, [activeRestaurantId, cartEntries]);

  const value = useMemo(
    () => ({
      activeRestaurantId,
      cartEntries,
      cartList,
      cartQuantities,
      cartSummary,
      hasItems: cartEntries.length > 0,
      switchRequest,
      addItem,
      replaceCartWithItem,
      confirmReplaceCart,
      cancelReplaceCart,
      decreaseItem,
      increaseItem,
      removeItem,
      clearCart,
    }),
    [
      activeRestaurantId,
      addItem,
      cancelReplaceCart,
      cartEntries,
      cartList,
      cartQuantities,
      cartSummary,
      clearCart,
      confirmReplaceCart,
      decreaseItem,
      increaseItem,
      removeItem,
      replaceCartWithItem,
      switchRequest,
    ],
  );

  // During SSR, render children without provider value
  if (!isMounted) {
    return <>{children}</>;
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    // Return safe default values during SSR
    return {
      activeRestaurantId: null,
      cartEntries: [],
      cartList: [],
      cartQuantities: {},
      cartSummary: null,
      hasItems: false,
      switchRequest: null,
      addItem: () => {},
      replaceCartWithItem: () => {},
      confirmReplaceCart: () => {},
      cancelReplaceCart: () => {},
      decreaseItem: () => {},
      increaseItem: () => {},
      removeItem: () => {},
      clearCart: () => {},
    };
  }
  
  return context;
};