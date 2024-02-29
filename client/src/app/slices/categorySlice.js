import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  categories: {},
  category: {},
  mentorCategories: {},
  cid: "",
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
    setCid: (state, action) => {
      state.cid = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

const { reducer, actions } = classSlice;
export const { setCategories, setMentorCategories, setCid, setCategory } = actions;
export default reducer;
