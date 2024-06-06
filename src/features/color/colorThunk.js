import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";

export const addColorThunk = async (color, thunkAPI) => {
  try {
    const response = await customFetch.post("/color/store-color", color);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const getColorThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/color/get-color')
    return response.data
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI)
  }
}

export const updateColorThunk = async (color, thunkAPI) => {
  try {
    const response = await customFetch.patch("/color/update-color", color);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
}

export const deleteColorThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/color/delete-color/${id}`);
    return response.data
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI)
  }
}