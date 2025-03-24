import { createSlice } from "@reduxjs/toolkit";
import { fetchCartItems } from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isLoaded: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push({ ...action.payload, quantity: 1 });
      state.isLoaded = true;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    addItemQuantity: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.id == action.payload) {
          item.quantity++;
        }
      });
    },
    reduceItemQuantity: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.id == action.payload) {
          if (item.quantity == 1) {
            state.cartItems = state.cartItems.filter(
              (item) => item.id !== action.payload
            );
          } else {
            item.quantity--;
          }
        }
      });
    },
    // loadCart: (state, action) => {
    //   state.cartItems = action.payload;
    // },
    checkIfCartIsLoaded: (state) => {
      state.isLoaded = state.cartItems.length > 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, () => {
        // console.log("loading");
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.isLoaded = true;
      })
      .addCase(fetchCartItems.rejected, () => {
        console.log("failed");
      });
  },
});

export const getCartLoadingStatus = (state) => state.cart.isLoaded;

export const checkIfInCart = (pid) => (state) => {
  return state.cart.cartItems.some((item) => item.id === pid);
};
export const getCartTotal = (state) =>
  state.cart.cartItems
    .reduce((acc, item) => item.price * item.quantity + acc, 0)
    .toFixed(2);
export const getCartList = (state) => state.cart?.cartItems;
export const getCartLength = (state) => state.cart.cartItems.length;
export const {
  addToCart,
  clearCart,
  addItemQuantity,
  reduceItemQuantity,
  loadCart,
  checkIfCartIsLoaded,
} = cartSlice.actions;
export default cartSlice.reducer;
