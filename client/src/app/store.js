import classOnerTeacherSlice from "./slices/classOnerTeacherSlice";
import { configureStore } from "@reduxjs/toolkit";
import activeInfoSlice from "./slices/activeSlice";
import userSlice from "./slices/userSlice";
import ErrorSlice from "./slices/errorSlice";
import mockupSlice from "./slices/mockupSlice";
import classSlice from "./slices/classSlice";
import categorySlice from "./slices/categorySlice";
import projectSlice from "./slices/projectSlice";
import { applyMiddleware } from "redux";
import * as thunk from "redux-thunk";

const rootReducer = {
  active: activeInfoSlice,
  user: userSlice,
  project: projectSlice,
  class: classSlice,
  category: categorySlice,
  error: ErrorSlice,
  mockup: mockupSlice,
  classOnerTeacher: classOnerTeacherSlice,
};

const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(thunk)
);

export default store;
