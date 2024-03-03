import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import ListOfGroups from "./components/FeaturesOne/listOfGroup";
import StudentOfClassesList from "./components/FeaturesOne/listOfStudent";
import axios from "axios";
import TeacherDefaultNavbar from "./TeacherAction";
import DefaultNavbar from "Navbars/DefaultNavbar";
import routes from "routes";
import { CSSTransition } from "react-transition-group";

import TemporaryMatching from "./components/FeaturesOne/listTemporaryMaching";
const TeachersFunction = () => {
  const selectedClassId = useSelector((state) => state.classOnerTeacher.classId);
  const [students, setStudents] = useState([]);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setNavbarVisible(lastScrollTop > currentScrollPos || currentScrollPos < 10);
      setLastScrollTop(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (selectedClassId) {
          const jwt = localStorage.getItem("jwt");
          const response = await axios.get(
            `http://localhost:9999/class/${selectedClassId}/students`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          setStudents(response.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedClassId]);

  return (
    <>
      <CSSTransition in={navbarVisible} timeout={300} s classNames="navbar" unmountOnExit>
        <DefaultNavbar routes={routes} transparent sticky />
      </CSSTransition>
      <TemporaryMatching />
      <MKBox pt={{ xs: 12, sm: 14 }} height="100vh" display="flex" justifyContent="center">
        <Grid container width="80%" display="flex" justifyContent="center">
          <Grid
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
          </Grid>
          <Grid item xs={12} md={10}>
            <MKBox p={0} display="flex" flexDirection="column">
              <ListOfGroups />
              <StudentOfClassesList classId={students} />
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
};
export default TeachersFunction;
