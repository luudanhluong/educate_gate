import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  groups: [],
  selectedGroupId: null,
};
const groupSlice = createSlice({
  name: "group",
  initialState: initialValue,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setSelectedGroupId: (state, action) => {
      state.selectedGroupId = action.payload;
    },
  },
});

const { reducer, actions } = groupSlice;
export const { setGroups, setSelectedGroupId } = actions;
export default reducer;
