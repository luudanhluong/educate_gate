import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  classId: null,
  classOnerTeacher: {},
};
const classOnerTeacher = createSlice({
  name: "classOnerTeacher",
  initialState: initialValue,
  reducers: {
    setClassOnerTeacher: (state, action) => {
      state.classOnerTeacher = action.payload;
    },
    setClassId: (state, action) => {
      state.classId = action.payload;
      console.log("Updated classId in Redux state:", action.payload);
    },
  },
});

const { reducer, actions } = classOnerTeacher;
export const { setClassOnerTeacher, setClassId } = actions;
export default reducer;
