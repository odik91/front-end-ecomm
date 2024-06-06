import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";

export const getUnitThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get("/unit/get-unit");
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const addUnitThunk = async (unit, thunkAPI) => {
  try {
    const response = await customFetch.post("/unit/store-unit", unit);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const updateUnitThunk = async (unit, thunkAPI) => {
  try {
    const response = await customFetch.patch("/unit/update-unit", unit);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const deleteUnitThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/unit/delete-unit/${id}`);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};
