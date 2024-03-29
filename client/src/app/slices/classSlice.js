import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  classes: [],
  filterPreName: "",
  searchValue: "",
  sort: -1,
  pageNo: 0,
};
const classSlice = createSlice({
  name: "class",
  initialState: initialValue,
  reducers: {
    setclasses: (state, action) => {
      state.classes = action.payload;
    },
    setFilterPreName: (state, action) => {
      state.filterPreName = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
  },
});

const { reducer, actions } = classSlice;
export const { setclasses, setFilterPreName, setSearchValue, setSort, setPageNo } = actions;
export default reducer;
