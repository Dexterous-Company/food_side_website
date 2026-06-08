import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart_Item: [],
  total_Amount: 0,
  total_net_payable: 0,
  delivery_Charge: 40,
  platformFee: 1,
  gst_percentage: 5,
  gst_amount: 0,
  time_takes: 0,
  distance: "",
  selected_restaurent_id: '',
  selected_restaurent: '',
  cartloading: true,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cleare_cart(state, action) {
      state.cart_Item = [];
      state.total_Amount = 0;
      state.total_net_payable = 0;
      state.delivery_Charge = 0;
      state.platformFee = 9;
      state.gst_percentage = 5;
      state.gst_amount = 5;
      state.selected_restaurent_id = '';
    },
    get_delivery_amount(state, action) {
      state.delivery_Charge = action.payload.delivery_Charge;
      state.gst_percentage = action.payload.gst_percentage;
      state.time_takes = action.payload.time_takes;
      state.distance = action.payload.distance;
    },
    add_to_cart_slice(state, action) {
      let itemIndex = -1;
      itemIndex = state.cart_Item.findIndex(
        item => item.packId === action.payload.packId,
      );
      if (itemIndex >= 0) {
        let quentity = state.cart_Item[itemIndex].cartQuentity + 1;
        state.cart_Item[itemIndex].cartQuentity =
          state.cart_Item[itemIndex].cartQuentity + 1;
        state.cart_Item[itemIndex].TotalPrice = Number(
          state.cart_Item[itemIndex].Price * quentity,
        );


        const perce_amount = Number(state.gst_percentage) / 100;
        state.gst_amount = Number(state.total_Amount) * Number(perce_amount);
        state.gst_amount = state.gst_amount.toFixed(2);
        state.gst_amount = Number(state.gst_amount);
        state.total_net_payable =
          state.total_Amount +
          state.delivery_Charge +
          state.gst_amount +
          state.platformFee;
        state.total_net_payable = state.total_net_payable.toFixed(2);
        state.total_net_payable = Number(state.total_net_payable);
      } else {
        const tempProducts = action.payload;
        state.cart_Item.push(tempProducts);

        state.total_Amount = state.total_Amount + action.payload.TotalPrice;


        const perce_amount = Number(state.gst_percentage) / 100;
        state.gst_amount = Number(state.total_Amount) * Number(perce_amount);
        state.gst_amount = state.gst_amount.toFixed(2);
        state.gst_amount = Number(state.gst_amount);
        state.total_net_payable =
          state.total_Amount +
          state.delivery_Charge +
          state.gst_amount +
          state.platformFee;
        state.total_net_payable = state.total_net_payable.toFixed(2);
        state.total_net_payable = Number(state.total_net_payable);
      }
    },
    add_to_cart_slicewithQunty(state, action) {
      let itemIndex = -1;
      itemIndex = state.cart_Item.findIndex(
        item => item.packId === action.payload.packId,
      );
      if (itemIndex >= 0) {
        let quentity = state.cart_Item[itemIndex].cartQuentity + action.payload.cartQuentity;
        state.cart_Item[itemIndex].cartQuentity =
          state.cart_Item[itemIndex].cartQuentity + action.payload.cartQuentity;
        state.cart_Item[itemIndex].TotalPrice = Number(
          state.cart_Item[itemIndex].Price * quentity,
        );

        const perce_amount = Number(state.gst_percentage) / 100;
        state.gst_amount = Number(state.total_Amount) * Number(perce_amount);
        state.gst_amount = state.gst_amount.toFixed(2);
        state.gst_amount = Number(state.gst_amount);
        state.total_net_payable =
          state.total_Amount +
          state.delivery_Charge +
          state.gst_amount +
          state.platformFee;
        state.total_net_payable = state.total_net_payable.toFixed(2);
        state.total_net_payable = Number(state.total_net_payable);
      } else {
        const tempProducts = action.payload;
        state.cart_Item.push(tempProducts);

        state.total_Amount = state.total_Amount + action.payload.TotalPrice;


        const perce_amount = Number(state.gst_percentage) / 100;
        state.gst_amount = Number(state.total_Amount) * Number(perce_amount);
        state.gst_amount = state.gst_amount.toFixed(2);
        state.gst_amount = Number(state.gst_amount);
        state.total_net_payable =
          state.total_Amount +
          state.delivery_Charge +
          state.gst_amount +
          state.platformFee;
        state.total_net_payable = state.total_net_payable.toFixed(2);
        state.total_net_payable = Number(state.total_net_payable);
      }
    },
    new_restaurent_add_to_cart_slice(state, action) {
      state.cart_Item = [action.payload];
      state.total_Amount = state.total_Amount + action.payload.TotalPrice;
      const perce_amount = Number(state.gst_percentage) / 100;
      state.gst_amount = Number(state.total_Amount) * Number(perce_amount);
      state.gst_amount = state.gst_amount.toFixed(2);
      state.gst_amount = Number(state.gst_amount);
      state.total_net_payable =
        state.total_Amount +
        state.delivery_Charge +
        state.gst_amount +
        state.platformFee;
      state.total_net_payable = state.total_net_payable.toFixed(2);
      state.total_net_payable = Number(state.total_net_payable);
    },
    remove_to_cart_slice(state, action) {
      let itemIndex = -1;
      itemIndex = state.cart_Item.findIndex(
        item => item.packId === action.payload.packId,
      );
      if (itemIndex >= 0) {
        if (state.cart_Item[itemIndex].cartQuentity > 1) {
          let quentity = state.cart_Item[itemIndex].cartQuentity - 1;
          state.cart_Item[itemIndex].cartQuentity =
            state.cart_Item[itemIndex].cartQuentity - 1;
          state.cart_Item[itemIndex].TotalPrice = Number(
            state.cart_Item[itemIndex].Price * quentity,
          );
          const perce_amount = Number(state.gst_percentage) / 100;
          state.gst_amount = Number(state.total_Amount) * Number(perce_amount);
          state.gst_amount = state.gst_amount.toFixed(2);
          state.gst_amount = Number(state.gst_amount);
          state.total_net_payable =
            state.total_Amount +
            state.delivery_Charge +
            state.gst_amount +
            state.platformFee;
          state.total_net_payable = state.total_net_payable.toFixed(2);
          state.total_net_payable = Number(state.total_net_payable);
        } else {
          const nextCartItems = state.cart_Item.filter(
            cartItem => cartItem.packId !== action.payload.packId,
          );
          state.cart_Item = nextCartItems;
        }
      }
    },
    getCartTotal(state, action) {
      state.total_Amount = 0;
      state.total_net_payable = 0;
      const totalitem = state.cart_Item;

      for (let index = 0; index < totalitem.length; index++) {
        state.total_Amount =
          state.total_Amount +
          state.cart_Item[index].Price * state.cart_Item[index].cartQuentity;
      }
      state.total_Amount = state.total_Amount;

      const perce_amount = Number(state.gst_percentage) / 100;
      state.gst_amount = Number(state.total_Amount) * Number(perce_amount);
      state.gst_amount = state.gst_amount.toFixed(2);
      state.gst_amount = Number(state.gst_amount);
      state.total_net_payable =
        state.total_Amount +
        state.delivery_Charge +
        state.gst_amount +
        state.platformFee;
      state.total_net_payable = state.total_net_payable.toFixed(2);
      state.total_net_payable = Number(state.total_net_payable);
    },
    set_Selectd_restaurent(state, action) {
      state.selected_restaurent_id = action.payload._id;
      state.selected_restaurent = action.payload;
    },
  },
});

export const {
  add_to_cart_slice,
  remove_to_cart_slice,
  getCartTotal,
  set_Selectd_restaurent,
  new_restaurent_add_to_cart_slice,
  cleare_cart,
  get_delivery_amount,
  add_to_cart_slicewithQunty
} = CartSlice.actions;
export default CartSlice.reducer;
