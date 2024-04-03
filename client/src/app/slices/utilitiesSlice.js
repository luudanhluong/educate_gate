import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  pageNo: 0,
};
const mockupSlice = createSlice({
  name: "utilities",
  initialState: initialValue,
  reducers: {
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
  },
});

const { reducer, actions } = mockupSlice;
export const { setPageNo } = actions;
export default reducer;
