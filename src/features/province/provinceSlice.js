import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { addProvinceThunk, deleteProvinceThunk, getProvinceThunk, updateProvinceThunk } from "./provinceThunk";

const initialState = {
  is_loading: false,
  provinces: [],
};

export const addProvince = createAsyncThunk(
  "province/addProvince",
  addProvinceThunk
);

export const getProvince = createAsyncThunk(
  "province/getProvince",
  getProvinceThunk
);

export const updateProvince = createAsyncThunk(
  "province/updateProvince",
  updateProvinceThunk
);

export const deleteProvince = createAsyncThunk(
  "province/deleteProvince",
  deleteProvinceThunk
);

const provinceSlice = createSlice({
  name: "provinces",
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
      .addCase(addProvince.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(addProvince.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(addProvince.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(getProvince.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(getProvince.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.provinces = payload;
      })
      .addCase(getProvince.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(updateProvince.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(updateProvince.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(updateProvince.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(deleteProvince.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(deleteProvince.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(deleteProvince.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      });
  },
});

export const { showLoading, hideLoading } = provinceSlice.actions;
export default provinceSlice.reducer;
