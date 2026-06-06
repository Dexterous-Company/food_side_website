

// redux/Order/OrderSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import orderService from '../../pages/services/orderService';

const sortOrdersByDate = orders =>
  [...orders].sort(
    (first, second) =>
      new Date(second?.createdAt || 0).getTime() -
      new Date(first?.createdAt || 0).getTime(),
  );

const mergeOrderIntoList = (orders, nextOrder) => {
  if (!nextOrder?._id) {
    return sortOrdersByDate(orders);
  }

  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(
    currentOrder => currentOrder?._id !== nextOrder._id,
  );

  return sortOrdersByDate([...filteredOrders, nextOrder]);
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, {rejectWithValue}) => {
    try {
      const response = await orderService.createOrder(orderData);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const get_order_data = createAsyncThunk(
  'order/get_order_data',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await orderService.getUserOrders(userId);
      return response.data?.data || response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (orderId, {rejectWithValue}) => {
    try {
      const response = await orderService.getOrderById(orderId);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const get_order_by_id = getOrderDetails;

export const trackOrder = createAsyncThunk(
  'order/trackOrder',
  async (orderId, {rejectWithValue}) => {
    try {
      const response = await orderService.trackOrder(orderId);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const cancel_order = createAsyncThunk(
  'order/cancel_order',
  async (payload, {rejectWithValue}) => {
    try {
      const orderId =
        typeof payload === 'string'
          ? payload
          : payload?.orderId || payload?._id || payload?.id;
      const reason = typeof payload === 'string' ? undefined : payload?.reason;
      const resolvedOrderId =
        typeof orderId === 'string' ? orderId : orderId?._id || orderId?.id;
      const response = await orderService.cancelOrder(resolvedOrderId, reason);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  currentOrder: null,
  orders: [],
  orders_all: [],
  tracking: null,
  isLoading: false,
  orders_allLoading: false,
  currentOrderLoading: false,
  orderActionLoading: false,
  error: null,
  orderError: null,
  success: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderState: state => {
      // ONLY clear current order details and loading states
      // DO NOT clear orders and orders_all - this preserves the orders list
      state.currentOrder = null;
      state.tracking = null;
      state.error = null;
      state.orderError = null;
      state.success = false;
      state.isLoading = false;
      state.currentOrderLoading = false;
      state.orderActionLoading = false;
      // IMPORTANT: Keep orders and orders_all arrays intact
    },
    clearTracking: state => {
      state.tracking = null;
    },
    // Optional: Add this for when you need to clear everything (e.g., logout)
    clearAllOrdersData: state => {
      state.currentOrder = null;
      state.orders = [];
      state.orders_all = [];
      state.tracking = null;
      state.error = null;
      state.orderError = null;
      state.success = false;
      state.isLoading = false;
      state.orders_allLoading = false;
      state.currentOrderLoading = false;
      state.orderActionLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      // Create Order
      .addCase(createOrder.pending, state => {
        state.isLoading = true;
        state.orders_allLoading = true;
        state.error = null;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders_allLoading = false;
        state.currentOrder = action.payload;
        state.orders = mergeOrderIntoList(state.orders, action.payload);
        state.orders_all = state.orders;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orders_allLoading = false;
        state.error = action.payload;
        state.orderError = action.payload;
        state.success = false;
      })
      // Get Orders List
      .addCase(get_order_data.pending, state => {
        state.isLoading = true;
        state.orders_allLoading = true;
        state.error = null;
        state.orderError = null;
      })
      .addCase(get_order_data.fulfilled, (state, action) => {
        const ordersList = Array.isArray(action.payload) ? action.payload : [];
        state.isLoading = false;
        state.orders_allLoading = false;
        state.orders = sortOrdersByDate(ordersList);
        state.orders_all = state.orders;
      })
      .addCase(get_order_data.rejected, (state, action) => {
        state.isLoading = false;
        state.orders_allLoading = false;
        state.error = action.payload;
        state.orderError = action.payload;
      })
      // Get Order Details
      .addCase(getOrderDetails.pending, state => {
        state.isLoading = true;
        state.currentOrderLoading = true;
        state.error = null;
        state.orderError = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrderLoading = false;
        state.currentOrder = action.payload;
        if (action.payload) {
          state.orders = mergeOrderIntoList(state.orders, action.payload);
          state.orders_all = state.orders;
        }
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.currentOrderLoading = false;
        state.error = action.payload;
        state.orderError = action.payload;
      })
      // Track Order
      .addCase(trackOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tracking = action.payload;
      })
      .addCase(trackOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderError = action.payload;
      })
      // Cancel Order
      .addCase(cancel_order.pending, state => {
        state.orderActionLoading = true;
        state.error = null;
        state.orderError = null;
      })
      .addCase(cancel_order.fulfilled, (state, action) => {
        state.orderActionLoading = false;
        state.currentOrder = action.payload;
        state.orders = mergeOrderIntoList(state.orders, action.payload);
        state.orders_all = state.orders;
      })
      .addCase(cancel_order.rejected, (state, action) => {
        state.orderActionLoading = false;
        state.error = action.payload;
        state.orderError = action.payload;
      });
  },
});

export const {clearOrderState, clearTracking, clearAllOrdersData} = orderSlice.actions;
export default orderSlice.reducer;