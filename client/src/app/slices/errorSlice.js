import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  fetchError: false,
};
const storiesSlice = createSlice({
  name: "error",
  initialState: initialValue,
  reducers: {
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const { setFetchError } = actions;
export default reducer;
