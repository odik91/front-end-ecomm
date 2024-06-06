import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUnitThunk, deleteUnitThunk, getUnitThunk, updateUnitThunk } from "./unitThunk";
import Swal from "sweetalert2";

const initialState = {
  is_loading: false,
  units: []
}

export const addUnit = createAsyncThunk('unit/addUnit', addUnitThunk)

export const getUnit = createAsyncThunk('unit/getUnit', getUnitThunk)

export const updateUnit = createAsyncThunk('unit/updateUnit', updateUnitThunk)

export const deleteUnit = createAsyncThunk('unit/deleteUnit', deleteUnitThunk)

const unitSlice = createSlice({
  name: "units",
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
      .addCase(addUnit.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(addUnit.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(addUnit.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(getUnit.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(getUnit.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.units = payload;
      })
      .addCase(getUnit.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(updateUnit.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(updateUnit.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(updateUnit.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      })
      .addCase(deleteUnit.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(deleteUnit.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Sukses!",
          html: payload?.message,
          icon: "success",
        });
      })
      .addCase(deleteUnit.rejected, (state, { payload }) => {
        state.is_loading = false;
        Swal.fire({
          title: "Gagal!",
          html: payload?.message,
          icon: "error",
        });
      });
  }
});

export const {showLoading, hideLoading} = unitSlice.actions
export default unitSlice.reducer