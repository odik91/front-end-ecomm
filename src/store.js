import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import categorySlice from "./features/category/categorySlice";
import subcategorySlice from "./features/subcategory/subcategorySlice";
import colorSlice from "./features/color/colorSlice";
import unitSlice from "./features/unit/unitSlice";
import sizeSlice from "./features/size/sizeSlice";
import provinceSlice from "./features/province/provinceSlice";
import citySlice from "./features/city/citySlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    categories: categorySlice,
    subcategories: subcategorySlice,
    colors: colorSlice,
    sizes: sizeSlice,
    units: unitSlice,
    provinces: provinceSlice,
    cities: citySlice,
  },
});
