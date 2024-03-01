import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  groups: [],
};
const groupSlice = createSlice({
  name: "group",
  initialState: initialValue,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

const { reducer, actions } = groupSlice;
export const { setGroups } = actions;
export default reducer;
