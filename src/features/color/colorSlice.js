import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addColorThunk, deleteColorThunk, getColorThunk, updateColorThunk } from "./colorThunk";
import Swal from "sweetalert2";

const initialState = {
  is_loading: false,
  colors: [],
};

export const addColor = createAsyncThunk("color/addColor", addColorThunk);

export const getColor = createAsyncThunk("color/getColor", getColorThunk);

export const updateColor = createAsyncThunk(
  "color/updateColor",
  updateColorThunk
);

export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  deleteColorThunk
);

const colorSlice = createSlice({
  name: "colors",
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
      .addCase(addColor.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(addColor.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(addColor.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
        state.colors = payload;
      })
      .addCase(getColor.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(getColor.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.colors = payload;
      })
      .addCase(getColor.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(updateColor.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(updateColor.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(updateColor.rejected, (state, { payload }) => {
        console.log(payload);
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(deleteColor.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(deleteColor.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(deleteColor.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      });
  },
});

export const { showLoading, hideLoading } = colorSlice.actions;
export default colorSlice.reducer;
