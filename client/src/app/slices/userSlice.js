import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  users: {},
  userRegister: {},
  userLogin: {},
  filterRole: 0,
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
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFilterRole: (state, action) => {
      state.filterRole = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const { setUserLogin, setUserRegister, setUsers, setFilterRole } = actions;
export default reducer;
