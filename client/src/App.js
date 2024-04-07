import { useEffect } from "react";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setAllGroup } from "app/slices/groupSlice";
import { setUserLogin } from "app/slices/userSlice";
import { setClassList } from "app/slices/classSlice";
import routes from "routes";
import "./App.css";
import Dashboard from "admin/Dashboard";
import GroupDetail from "layouts/user/students/index";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(BASE_URL + "/user/profile", config)
      .then((res) => dispatch(setUserLogin(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    if (userLogin?._id)
      axios
        .get(`${BASE_URL}/teacher/${userLogin?._id}`, config)
        .then((res) => dispatch(setAllGroup(res.data)))
        .then((err) => console.log(err));
  }, [userLogin, dispatch]);
  useEffect(() => {
    if (userLogin?._id)
      axios
        .get(`${BASE_URL}/class/${userLogin?._id}`, config)
        .then((res) => dispatch(setClassList(res.data)))
        .catch((err) => console.log(err));
  }, [dispatch, userLogin]);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Routes>
        {getRoutes(routes())}
        <Route path="/group/:groupId/members" element={<GroupDetail />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to={"/presentation"} />} />
      </Routes>
    </ThemeProvider>
  );
}
