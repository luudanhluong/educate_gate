import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  classes: [],
};
const classSlice = createSlice({
  name: "class",
  initialState: initialValue,
  reducers: {
    setclasses: (state, action) => {
      state.classes = action.payload;
    },
  },
});

const { reducer, actions } = classSlice;
export const { setclasses } = actions;
export default reducer;
