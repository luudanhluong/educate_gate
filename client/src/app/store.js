import classOnerTeacherSlice from "./slices/classOnerTecaherSlice";
import { configureStore } from "@reduxjs/toolkit";
import activeInfoSlice from "./slices/activeSlice";
import userSlice from "./slices/userSlice";
import ErrorSlice from "./slices/errorSlice";
import mockupSlice from "./slices/mockupSlice";
import { applyMiddleware } from "redux";
import * as thunk from "redux-thunk";

const rootReducer = {
  active: activeInfoSlice,
  user: userSlice,
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
