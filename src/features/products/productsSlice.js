import { createSlice } from "@reduxjs/toolkit";
import { fetchAsyncProducts, fetchSingleProduct } from "./productsThunk";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: {},
    status: null,
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = {};
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {   
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("Failed to load products", state.error);
      });

    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "successful";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllProducts = (state) => state.products;
export const getSelectedProduct = (state) => state.products.selectedProduct;
export const getStatus = (state) => state.products.status;
export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
