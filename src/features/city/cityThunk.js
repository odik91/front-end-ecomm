import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";

export const addCityThunk = async (city, thunkAPI) => {
  try {
    const response = await customFetch.post("/city/store-city", city);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const getCityThunk = async (city, thunkAPI) => {
  try {
    const url = `/city/get-city?page=${city?.page || 1}&page_size=${
      city?.page_size || ""
    }&current_page=${city?.page || 1}${
      city?.province ? `&province=${city.province}` : ""
    }${city?.city ? `&city=${city.city}` : ""}${
      city?.type ? `&type=${city.type}` : ""
    }${city?.global ? `&global=${city?.global}` : ""}`;
    
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const updateCityThunk = async (city, thunkAPI) => {
  try {
    const response = await customFetch.patch("/city/update-city", city);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const deleteCityThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/city/delete-city/${id}`);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};
