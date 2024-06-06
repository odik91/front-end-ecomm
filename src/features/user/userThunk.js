import customFetch from "../utils/axios";
import { logoutUser } from "./userSlice";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    const send_data = { ...response.data, remember: user.remember };
    return send_data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
};

export const clearUserStorageThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser (message));
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
