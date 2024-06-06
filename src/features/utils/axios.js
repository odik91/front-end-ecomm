import axios from "axios";
import { getUdk, getUtd } from "./localData";
import { decryptText } from "./encrypt";
import { clearLocalStorage } from "../user/userSlice";

const MODE = import.meta.env.VITE_MODE;
const API_DEV = import.meta.env.VITE_API_DEV;
const API_PROD = import.meta.env.VITE_API_PROD;

export const api_url = MODE === "develop" ? API_DEV : API_PROD;

const customFetch = axios.create({
  baseURL: `${api_url}/api`,
});

customFetch.interceptors.request.use((config) => {
  const user_token_data = getUtd();
  const user_data_key = getUdk();

  if (user_token_data && user_data_key) {
    const token = decryptText(user_token_data, user_data_key);
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept"] = "application/json";
  }

  return config;
});

export const checkForUnauthorizedResponse = async (error, thunkAPI) => {
  if (error.status === 401) {
    try {
      const response = await customFetch.get("/test-auth");
      response ? console.log("auth") : "";
      return;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(clearLocalStorage());
        return thunkAPI.rejectWithValue(error.data);
      }
    }
  }
  return thunkAPI.rejectWithValue(error.data);
};

export default customFetch;
