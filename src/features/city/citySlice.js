import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCityThunk,
  deleteCityThunk,
  getCityThunk,
  updateCityThunk,
} from "./cityThunk";
import Swal from "sweetalert2";

const initialState = {
  is_loading: false,
  cities: [],
};

export const addCity = createAsyncThunk("city/addCity", addCityThunk);

export const getCity = createAsyncThunk("city/getCity", getCityThunk);

export const updateCity = createAsyncThunk("city/updateCity", updateCityThunk);

export const deleteCity = createAsyncThunk("city/deleteCity", deleteCityThunk);

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.is_loading = true;
    },
    hideLoading: (state) => {
      state.is_loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCity.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(addCity.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(addCity.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(getCity.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(getCity.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.cities = payload.data;
      })
      .addCase(getCity.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(updateCity.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(updateCity.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(updateCity.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(deleteCity.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(deleteCity.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(deleteCity.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      });
  },
});

export const { showLoading, hideLoading } = citySlice.actions;
export default citySlice.reducer;
