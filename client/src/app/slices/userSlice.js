import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  users: {},
  userRegister: {},
  userLogin: { role: 0 },
  filterRole: 0,
  searchValue: "",
  sort: -1,
  pageNo: 0,
  mentor: {
    data: [],
    count: 0,
  },
  student: {
    data: [],
    count: 0,
  },
  teacher: {
    data: [],
    count: 0,
  },
  selectUser: [],
  pmtUser: {
    usersByMonth: [],
    countStudent: 0,
    countMentor: 0,
    countAdmin: 0,
    countTeacher: 0,
  },
  selectAll: {
    type: 0,
    payload: false,
  },
  defaultMentor: "",
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
    setTeacher: (state, action) => {
      state.teacher = action.payload;
    },
    setMentor: (state, action) => {
      state.mentor = action.payload;
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    setSelectUser: (state, action) => {
      state.selectUser = action.payload;
    },
    setPmtUser: (state, action) => {
      state.pmtUser = action.payload;
    },
    setSelectAll: (state, action) => {
      state.selectAll = action.payload;
    },
    setDefaultMentor: (state, action) => {
      state.defaultMentor = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const {
  setUserLogin,
  setUserRegister,
  setUsers,
  setFilterRole,
  setSearchValue,
  setSort,
  setPageNo,
  setTeacher,
  setMentor,
  setStudent,
  setSelectUser,
  setPmtUser,
  setSelectAll,
  setDefaultMentor,
} = actions;
export default reducer;
