import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
// import GroupDetails from "./components/FeaturesOne/groupDetail";
// import GroupsList from "./components/FeaturesOne/listOfGroup";
import StudentOfClassesList from "./components/FeaturesOne/listOfStudent";
import axios from "axios";
import TeacherDefaultNavbar from "./TeacherAction";
import DefaultNavbar from "Navbars/DefaultNavbar";
import routes from "routes";
import { CSSTransition } from "react-transition-group";
import "../featuers/components/FeaturesOne/studentList.css";
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
          setStudents(response.data); // Update state with fetched students
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedClassId]);
  // const [groupDetails, setGroupDetails] = useState(null);
  // const [groups, setGroups] = useState([]);
  // const [groupId, setGroupId] = useState(null);

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   };
  //   axios
  //     .get(`http://localhost:9999/class/${selectedClassId}/groups`, config)
  //     .then((res) => {
  //       setGroups(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }, [selectedClassId]);

  // const handleSelectGroup = async (id) => {
  //   const jwt = localStorage.getItem("jwt");
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   };
  //   setGroupId(id);
  //   try {
  //     const response = await axios.get(`http://localhost:9999/group/${id}/details`, config);
  //     setGroupDetails(response.data);
  //   } catch (error) {
  //     console.error("Error fetching specific group details:", error);
  //   }
  // };

  return (
    <>
      <CSSTransition in={navbarVisible} timeout={300} s classNames="navbar" unmountOnExit>
        <DefaultNavbar routes={routes} sticky />
      </CSSTransition>
      <MKBox pt={{ xs: 12, sm: 14 }} pb={3} height="100vh" display="flex" justifyContent="center">
        <Grid container width="80%">
          <Grid item xs={12} md={2}>
            <TeacherDefaultNavbar />
          </Grid>
          <Grid item xs={12} md={10}>
            <MKBox p={0}>
              <StudentOfClassesList classId={students} />
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
};
export default TeachersFunction;
