import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSizeThunk,
  deleteSizeThunk,
  getSizeThunk,
  updateSizeThunk,
} from "./sizeThunk";
import Swal from "sweetalert2";

const initialState = {
  is_loading: false,
  sizes: [],
};

export const addSize = createAsyncThunk("size/addSize", addSizeThunk);

export const getSize = createAsyncThunk("size/getSize", getSizeThunk);

export const updateSize = createAsyncThunk("size/updateSize", updateSizeThunk);

export const deleteSize = createAsyncThunk("size/deleteSize", deleteSizeThunk);

const sizeSlice = createSlice({
  name: "sizes",
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
      .addCase(addSize.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(addSize.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(addSize.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(getSize.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(getSize.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.sizes = payload;
      })
      .addCase(getSize.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(updateSize.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(updateSize.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(updateSize.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(deleteSize.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(deleteSize.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(deleteSize.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      });
  },
});

export const { showLoading, hideLoading } = sizeSlice.actions;
export default sizeSlice.reducer;
