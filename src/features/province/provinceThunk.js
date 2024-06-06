import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";

export const getProvinceThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get("/province/get-province");
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const addProvinceThunk = async (province, thunkAPI) => {
  try {
    const response = await customFetch.post(
      "/province/store-province",
      province
    );
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const updateProvinceThunk = async (province, thunkAPI) => {
  try {
    const response = await customFetch.patch(
      "/province/update-province",
      province
    );
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
}

export const deleteProvinceThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.delete(
      `/province/delete-province/${id}`
    );
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};
