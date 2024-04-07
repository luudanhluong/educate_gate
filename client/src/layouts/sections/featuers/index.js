import React, { useEffect } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import ListOfGroups from "./components/FeaturesOne/listOfGroup";
import StudentOfClassesList from "./components/FeaturesOne/listOfStudent";
import axios from "axios";
// import TeacherDefaultNavbar from "./TeacherAction";
import DefaultNavbar from "Navbars/DefaultNavbar";
import routes from "routes";
import TemporaryMatching from "./components/FeaturesOne/listTemporaryMaching";
import { BASE_URL } from "utilities/initialValue";
import { setUserLogin } from "app/slices/userSlice";
import ViewAllGroup from "./components/FeaturesOne/viewAllGroup";
import getParams from "utilities/getParams";
import { useLocation } from "react-router-dom";
import { setClassStudent } from "app/slices/classOnerTeacherSlice";
import { setGroups } from "app/slices/groupSlice";

const TeachersFunction = () => {
  const dispatch = useDispatch();
  const url = useLocation();
  const params = getParams(3, url.pathname);
  const jwt = localStorage.getItem("jwt");
  const { active } = useSelector((state) => state.active);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  console.log(params);
  useEffect(() => {
    axios
      .get(BASE_URL + "/user/profile", config)
      .then((res) => dispatch(setUserLogin(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/class/${params}/students`, config)
      .then((res) => dispatch(setClassStudent(res.data)))
      .catch((err) => console.log(err));
  }, [params]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/group/${params}/groups`, config)
      .then((res) => dispatch(setGroups(res.data)))
      .catch((err) => console.log(err));
  }, [params]);

  return (
    <>
      <DefaultNavbar routes={routes} />
      <TemporaryMatching />
      <MKBox pt={{ xs: 12, sm: 10 }} height="100vh" display="flex" justifyContent="center">
        <Grid container width="100%" mx={"4rem"} display="flex" justifyContent="center">
          {/* <Grid
            item
            xs={12}
            md={2}
            height="80%"
            sx={{
              overflow: "auto",
              borderRadius: "12px",
              boxShadow:
                "0rem 0.25rem 0.65rem 0.1625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.95rem 0.2625rem rgba(0, 0, 0, 0.06)",
            }}
          >
            <TeacherDefaultNavbar transparent />
          </Grid> */}
          <Grid item xs={12} md={10}>
            {active != 2 ? (
              <MKBox p={0} display="flex" flexDirection="column">
                <ListOfGroups />
                <StudentOfClassesList />
              </MKBox>
            ) : (
              <MKBox>
                <ViewAllGroup />
              </MKBox>
            )}
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
};
export default TeachersFunction;
