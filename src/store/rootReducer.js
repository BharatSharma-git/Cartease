import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});
export default rootReducer;
