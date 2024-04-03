import { useEffect } from "react";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

import routes from "routes";
import "./App.css";
import Dashboard from "admin/Dashboard";
import GroupDetail from "layouts/user/students/index";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserLogin } from "app/slices/userSlice";
import { BASE_URL } from "utilities/initialValue";
import axios from "axios";
import { CssBaseline } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
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
