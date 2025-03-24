import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base = "https://fakestoreapi.com/products";

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetchAsyncProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base}`);
      return response.data;
    } catch (err) {
      console.log("err", err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (pid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base}/${pid}`);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      return response.data;
    } catch (err) {
      console.log("err", err);
      return rejectWithValue(err.message);
    }
  }
);
