import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  semesters: {},
  semester: {},
  sid: "",
};
const semesterSlice = createSlice({
  name: "semester",
  initialState: initialValue,
  reducers: {
    setSemesters: (state, action) => {
      state.semesters = action.payload;
    },
    setSid: (state, action) => {
      state.sid = action.payload;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
  },
});

const { reducer, actions } = semesterSlice;
export const { setSemesters, setSid, setSemester } = actions;
export default reducer;
