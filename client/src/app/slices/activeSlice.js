import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  active_info: 1,
  active_create_class: true,
};
const storiesSlice = createSlice({
  name: "active",
  initialState: initialValue,
  reducers: {
    setActiveInfo: (state, action) => {
      state.active_info = action.payload;
    },
    setActiveCreateClass: (state, action) => {
      state.active_create_class = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const { setActiveInfo, setActiveCreateClass } = actions;
export default reducer;
