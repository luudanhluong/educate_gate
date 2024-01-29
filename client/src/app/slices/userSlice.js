import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  users: [],
  userRegister: {},
  userLogin: {},
};
const storiesSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserRegister: (state, action) => {
      state.userRegister = action.payload;
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const { setUserLogin, setUserRegister } = actions;
export default reducer;
