import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const Baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const initialState = {
  product_all: [],
  product_allLoading: true,
  isproduct_allAvailable: false,
  restaurant_product: [],
  restaurant_productLoading: true,
  isrestaurant_productAvailable: false,
  search_product_limit: [],
  search_product_limit_loading: false,
  search_product: [],
  search_product_loading: false,
  search_restaurent: [],
  search_restaurent_loading: false,
  categoty_restaurent: [],
  categoty_restaurent_loading: false,
};

export const get_product_data = createAsyncThunk(
  'product/get_product_data',
  async (slugurl, thunkAPI) => {
    try {
      const url = `${Baseurl}/api/v1/product/all`;
      const response = await axios.get(url);
      return response.data; // adjust based on actual response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
    }
  },
);
export const get_restaurant_product_data = createAsyncThunk(
  'product/get_restaurant_product_data',
  async (slugurl, thunkAPI) => {
    try {
      const url = `${Baseurl}/api/v1/product/restaurant_with_products`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);
export const get_search_product_limit = createAsyncThunk(
  'product/get_search_product_limit',
  async (keywords, thunkAPI) => {
    try {
      const url = `${Baseurl}/api/v1/product/product-search-limit/${keywords}`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);
export const get_search_product = createAsyncThunk(
  'product/get_search_product',
  async (keywords, thunkAPI) => {
    try {
      const url = `${Baseurl}/api/v1/product/product-search/${keywords}`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);
export const get_search_restaurent = createAsyncThunk(
  'product/get_search_restaurent',
  async (keywords, thunkAPI) => {
    try {
      const url = `${Baseurl}/api/v1/product/restaurent-search-limit/${keywords}`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);
export const get_category_restaurent = createAsyncThunk(
  'product/get_category_restaurent',
  async (keywords, thunkAPI) => {
    try {
      const url = `${Baseurl}/api/v1/product/restaurent-by-categories/${keywords}`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    removeProductSearchlist(state, action) {
      state.search_product_limit = [];
      state.search_product = [];
      state.search_restaurent = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(get_product_data.pending, state => {
        state.product_allLoading = true;
        state.error = null;
      })
      .addCase(get_product_data.fulfilled, (state, action) => {
        const products = action.payload.product || action.payload; // depends on API shape


        // Optional: sort by createdAt
        const sorted = [...products].sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
        );

        state.product_all = sorted;
        state.product_allLoading = false;
        state.isproduct_allAvailable = true;
        state.error = null;

        // NOTE: avoid side effects like localStorage here (see note below)
      })
      .addCase(get_product_data.rejected, (state, action) => {
        state.product_allLoading = false;
        state.isproduct_allAvailable = false;
        state.error = action.payload || 'Error fetching products';
      });
    
    builder
      .addCase(get_restaurant_product_data.pending, state => {
        state.restaurant_productLoading = true;
      })
      .addCase(get_restaurant_product_data.fulfilled, (state, action) => {
        state.restaurant_product = action.payload.product;
        state.restaurant_product = state.restaurant_product.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1,
        );

        localStorage.setItem(
          'restaurant_product',
          JSON.stringify(state.restaurant_product),
        );
        state.restaurant_productLoading = false;
        state.isrestaurant_productAvailable = true;
      })
      .addCase(get_restaurant_product_data.rejected, state => {
        state.restaurant_productLoading = true;
      });
    builder
      .addCase(get_search_product_limit.pending, state => {
        state.search_product_limit_loading = true;
      })
      .addCase(get_search_product_limit.fulfilled, (state, action) => {
        state.search_product_limit = action.payload.products;
        state.search_product_limit_loading = false;
      })
      .addCase(get_search_product_limit.rejected, state => {
        state.search_product_limit_loading = true;
      });
    builder
      .addCase(get_search_product.pending, state => {
        state.search_product_loading = true;
      })
      .addCase(get_search_product.fulfilled, (state, action) => {
        state.search_product = action.payload.products;
        state.search_product_loading = false;
      })
      .addCase(get_search_product.rejected, state => {
        state.search_product_loading = true;
      });
    builder
      .addCase(get_search_restaurent.pending, state => {
        state.search_restaurent_loading = true;
      })
      .addCase(get_search_restaurent.fulfilled, (state, action) => {
        state.search_restaurent = action.payload.product;
        state.search_restaurent_loading = false;
      })
      .addCase(get_search_restaurent.rejected, state => {
        state.search_restaurent_loading = true;
      });
    builder
      .addCase(get_category_restaurent.pending, state => {
        state.categoty_restaurent_loading = true;
      })
      .addCase(get_category_restaurent.fulfilled, (state, action) => {
        state.categoty_restaurent = action.payload.product;
        state.categoty_restaurent_loading = false;
      })
      .addCase(get_category_restaurent.rejected, state => {
        state.categoty_restaurent_loading = true;
      });
  },
});

export const {removeProductSearchlist} = ProductSlice.actions;
export default ProductSlice.reducer;
