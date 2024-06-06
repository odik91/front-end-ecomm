import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  checkIsUserIsAuthenticate,
  getUdk,
  getUserFromLocalStorage,
  getUtd,
  removeUserFromLocalStorage,
} from "../utils/localData";
import { clearUserStorageThunk, loginUserThunk } from "./userThunk";
import { encryptText, generateRandomKey } from "../utils/encrypt";
import Swal from "sweetalert2";

const initialState = {
  is_loading: false,
  currentNavigation: {
    parent: "",
    parent_link: "",
    curent_page: "",
  },
  user: getUserFromLocalStorage(),
  utd: getUtd(),
  udk: getUdk(),
  has_error: {
    message: null,
    code: null,
    status_text: null,
  },
  isAuthenticated: checkIsUserIsAuthenticate(),
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/login", user, thunkAPI);
  }
);

export const clearLocalStorage = createAsyncThunk(
  "user/clearUserStorage",
  clearUserStorageThunk
);

export const setCookie = (cname,cvalue,exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
  // document.cookie =  cname + "=" + cvalue + ";expires=0;path=/;SameSite=Lax";
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userNavigation: (
      state,
      { payload: { current_parent, link, active_page } }
    ) => {
      state.currentNavigation = {
        parent: current_parent,
        parent_link: link,
        current_page: active_page,
      };
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();

      state.isAuthenticated = false;

      state.utd = null;
      state.udk = null;      

      if (payload) {
        Swal.fire("success", payload?.message, "success");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.has_error = {
          message: null,
          code: null,
          status_text: null,
        };
        state.is_loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { data, token, remember } = payload;
        state.is_loading = false;
        state.user = data;

        const generateKey = generateRandomKey();

        const utd_udk = {
          utd: encryptText(token, generateKey),
          udk: generateKey,
        };

        const stringify_value = JSON.stringify(utd_udk);

        state.isAuthenticated = true;

        state.utd = encryptText(token, generateKey);
        state.udk = generateKey;

        if (remember) {
          localStorage.setItem("utd_udk", stringify_value);
        } else {
          sessionStorage.setItem("utd_udk", stringify_value);
        }

        addUserToLocalStorage(data, remember);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        // console.log(payload);
        const { data, status, statusText } = payload;
        state.is_loading = false;
        state.has_error = {
          message: data?.message,
          code: status,
          status_text: statusText,
        };
      });
  },
});

export const { userNavigation, logoutUser } = userSlice.actions;

export default userSlice.reducer;
