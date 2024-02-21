import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  active_info: 1,
  active_popup_add_list_user: false,
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
    setActivePopupAddListUser: (state, action) => {
      state.active_popup_add_list_user = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const { setActiveInfo, setActiveCreateClass, setActivePopupAddListUser } = actions;
export default reducer;
