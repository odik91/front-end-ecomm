import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";

export const addCategoryThunk = async (category, thunkAPI) => {
  try {
    const response = await customFetch.post("/store-category", category);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const getCategoryThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get("/get-category");
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const updateCategoryThunk = async (category, thunkAPI) => {
  try {
    const response = await customFetch.put("/update-category", category);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const deleteCategoryThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/delete-category/?id=${id}`, id);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};