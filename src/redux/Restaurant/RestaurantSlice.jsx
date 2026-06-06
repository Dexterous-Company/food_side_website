import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const Baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export const get_restarent_data = createAsyncThunk(
  'restaurant/get_restarent_data',
  async (slugurl, thunkAPI) => {
    try {
      const url = `${Baseurl}/api/v1/restaurant/all`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  restaurant_all: [],
  restaurant_allLoading: true,
  isrestaurant_allAvailable: false,
};

const RestaurantSlice = createSlice({
  name: 'restaurant',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(get_restarent_data.pending, state => {
        state.restaurant_allLoading = true;
      })
      .addCase(get_restarent_data.fulfilled, (state, action) => {
        state.restaurant_all = action.payload.restaurant;
        state.restaurant_all = state.restaurant_all.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1,
        );

        localStorage.setItem(
          'restaurant_all',
          JSON.stringify(state.restaurant_all),
        );
        state.restaurant_allLoading = false;
        state.isrestaurant_allAvailable = true;
      })
      .addCase(get_restarent_data.rejected, state => {
        state.restaurant_allLoading = true;
      });
  },
});

export const {} = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
