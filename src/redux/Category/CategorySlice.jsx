import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const Baseurl = process.env.NEXT_PUBLIC_BASE_URL;
export const get_category_data = createAsyncThunk(
  'category/get_category_data',
  async (slugurl, thunkAPI) => {
    try {
      // const url = `${Baseurl}/api/v1/category/active-categories`;
      const url = `${Baseurl}/api/v1/category/all`;
      const resp = await axios.get(url);

      return resp.data;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  category_all: [],
  category_allLoading: true,
  isCategory_allAvailable: false,
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(get_category_data.pending, state => {
        state.category_allLoading = true;
      })
      .addCase(get_category_data.fulfilled, (state, action) => {
        state.category_all = action.payload.category;
        state.category_all = state.category_all.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1,
        );
        localStorage.setItem(
          'category_all',
          JSON.stringify(state.category_all),
        );
        state.category_allLoading = false;
        state.isCategory_allAvailable = true;
      })
      .addCase(get_category_data.rejected, state => {
        state.category_allLoading = true;
      });
  },
});

export const {} = CategorySlice.actions;
export default CategorySlice.reducer;
