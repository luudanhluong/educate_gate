import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  categories: {},
  mentorCategories: {},
};
const classSlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setMentorCategories: (state, action) => {
      state.mentorCategories = action.payload;
    },
  },
});

const { reducer, actions } = classSlice;
export const { setCategories, setMentorCategories } = actions;
export default reducer;
