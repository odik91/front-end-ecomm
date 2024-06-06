import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";

export const addSubcategoryThunk = async (subcategory, thunkAPI) => {
  try {
    const response = await customFetch.post(
      "/subcategory/store-subcategory",
      subcategory
    );
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const getSubcategoryThunk = async (subcategory, thunkAPI) => {
  try {
    let url = `/subcategory/get-subcategory/`;
    if (subcategory) {
      url += `?query=${subcategory.search || ""}${
        subcategory?.category ? `&category=${subcategory.category}` : ``
      }`;
    }
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const updateSubcategoryThunk = async (subcategory, thunkAPI) => {
  try {
    const response = await customFetch.patch(
      `/subcategory/update-subcategory`,
      subcategory
    );
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};

export const deleteSubcategoryThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.delete(
      `/subcategory/delete-subcategory/?id=${id}`
    );
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error.response, thunkAPI);
  }
};
