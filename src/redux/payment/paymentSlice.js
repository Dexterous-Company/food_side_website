// redux/slices/paymentSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import paymentService from '../../pages/services/paymentService';

export const processCODOrder = createAsyncThunk(
  'payment/processCODOrder',
  async (orderData, {rejectWithValue}) => {
    try {
      const response = await paymentService.processCOD(orderData);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async (paymentData, {rejectWithValue}) => {
    try {
      const response = await paymentService.verifyPayment(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  paymentMethod: 'cod',
  paymentStatus: 'pending',
  transactionId: null,
  isLoading: false,
  error: null,
  success: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearPaymentState: state => {
      state.paymentStatus = 'pending';
      state.transactionId = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(processCODOrder.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processCODOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentStatus = 'pending';
        state.success = true;
        state.transactionId = action.payload.transactionId;
      })
      .addCase(processCODOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
}); 

export const {setPaymentMethod, clearPaymentState} = paymentSlice.actions;
export default paymentSlice.reducer;
