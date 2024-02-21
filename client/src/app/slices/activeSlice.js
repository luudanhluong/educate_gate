import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  active: 0,
  active_info: 1,
  active_popup: false,
  active_popup_add_class_list: false,
  active_create_class: true,
};
const storiesSlice = createSlice({
  name: "active",
  initialState: initialValue,
  reducers: {
    setActiveInfo: (state, action) => {
      state.active_info = action.payload;
    },
    setActiveCreateClass: (state, action) => {
      state.active_create_class = action.payload;
    },
    setActivePopup: (state, action) => {
      state.active_popup = action.payload;
    },
    setActivePopupAddClassList: (state, action) => {
      state.active_popup_add_class_list = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const {
  setActive,
  setActiveInfo,
  setActiveCreateClass,
  setActivePopup,
  setActivePopupAddClassList,
} = actions;
export default reducer;
