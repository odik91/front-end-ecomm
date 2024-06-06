import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSubcategoryThunk,
  deleteSubcategoryThunk,
  getSubcategoryThunk,
  updateSubcategoryThunk,
} from "./subcategoryThunk";
import Swal from "sweetalert2";

const initialState = {
  is_loading: false,
  subcategories: [],
};

export const addSubcategory = createAsyncThunk(
  "subcategory/createSubcategory",
  addSubcategoryThunk
);

export const getSubcategory = createAsyncThunk(
  "subcategory/getSubcategory",
  getSubcategoryThunk
);

export const updateSubcategory = createAsyncThunk(
  "subcategory/updateSubcategory",
  updateSubcategoryThunk
);

export const deleteSubcategory = createAsyncThunk(
  "subcategory/deleteSubcategory",
  deleteSubcategoryThunk
);

const subcategorySlice = createSlice({
  name: "subcategory",
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
      .addCase(addSubcategory.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(addSubcategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(addSubcategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(getSubcategory.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(getSubcategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.subcategories = payload;
      })
      .addCase(getSubcategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(updateSubcategory.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(updateSubcategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(updateSubcategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(deleteSubcategory.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(deleteSubcategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(deleteSubcategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      });
  },
});

export const { showLoading, hideLoading } = subcategorySlice.actions;
export default subcategorySlice.reducer;
