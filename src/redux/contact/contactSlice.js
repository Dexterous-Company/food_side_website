// // frontend/src/redux/slices/contactSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8765/api/v1';

// // Async thunk for submitting contact form
// export const submitContactForm = createAsyncThunk(
//   'contact/submitForm',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/contact`, formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const contactSlice = createSlice({
//   name: 'contact',
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//     data: null,
//   },
//   reducers: {
//     resetContact: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//       state.data = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitContactForm.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(submitContactForm.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.data = action.payload;
//       })
//       .addCase(submitContactForm.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       });
//   },
// });

// export const { resetContact } = contactSlice.actions;
// export default contactSlice.reducer;



// frontend/src/redux/contact/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use NEXT_PUBLIC_BASE_URL instead of NEXT_PUBLIC_API_URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8765';
const API_URL = `${BASE_URL}/api/v1`;

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      console.log('Sending to:', `${API_URL}/contact`);
      console.log('Form data:', formData);
      
      const response = await axios.post(`${API_URL}/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetContact: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;