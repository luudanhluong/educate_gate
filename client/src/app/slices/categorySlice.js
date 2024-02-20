import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  categories: {},
};
const classSlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const { reducer, actions } = classSlice;
export const { setCategories } = actions;
export default reducer;
