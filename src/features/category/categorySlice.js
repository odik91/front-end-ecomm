import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCategoryThunk,
  deleteCategoryThunk,
  getCategoryThunk,
  updateCategoryThunk,
} from "./categoryThunk";
import Swal from "sweetalert2";

const initialState = {
  is_loading: false,
  categories: [],
  is_error: false,
  error_message: "",
  is_success: false,
  success_message: "",
};

export const addCategory = createAsyncThunk(
  "category/createCategory",
  addCategoryThunk
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  getCategoryThunk
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  updateCategoryThunk
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  deleteCategoryThunk
);

const categorySlice = createSlice({
  name: "category",
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
      .addCase(addCategory.pending, (state) => {
        state.is_loading = true;
        state.is_error = false;
        state.error_message = "";
        state.is_success = false;
        state.success_message = false;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.is_success = true;
        state.success_message = payload.message;
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.is_error = true;
        state.error_message = payload?.message;
      })
      .addCase(getCategory.pending, (state) => {
        state.is_loading = true;
        state.is_error = false;
        state.error_message = "";
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.categories = payload.data;
      })
      .addCase(getCategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.is_error = true;
        state.error_message = payload?.data.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.is_loading = true;
        state.is_error = false;
        state.error_message = "";
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;

        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.is_error = true;
        state.error_message = payload?.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.is_loading = true;
        state.is_error = false;
        state.error_message = "";
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.is_loading = false;

        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.is_error = true;
        state.error_message = payload?.message;
      });
  },
});

export const { showLoading, hideLoading } = categorySlice.actions;
export default categorySlice.reducer;
