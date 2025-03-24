import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const base = "https://fakestoreapi.com/products";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base}/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch cart item");
      }
      return { ...response.data, quantity: quantity };
    } catch (err) {
      console.log("err", err);
      return rejectWithValue(err.message);
    }
  }
);
