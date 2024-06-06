import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";

export const addSizeThunk = async (size, thunkAPI) => {
  try {
    const response = await customFetch.post("/size/store-size", size);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const getSizeThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get("/size/get-size");
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const updateSizeThunk = async (size, thunkAPI) => {
  try {
    const response = await customFetch.patch('/size/update-size', size)
    return response.data
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI)
  }
}

export const deleteSizeThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/size/delete-size/${id}`)
    return response.data
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI)
  }
}
