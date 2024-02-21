// TeachersFunction.js
import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import axios from "axios"; // Import axios for API calls
import { useDispatch, useSelector } from "react-redux";
import { setClassId, setClassOnerTeacher } from "../../../../app/slices/classOnerTecaherSlice";
import NamesOfGroups from "./components/FeaturesOne/nameOfGroup";
import GroupDetails from "./components/FeaturesOne/groupDetail";
import "../featuers/components/FeaturesOne/studentList.css";
import TeacherDefaultNavbar from "./Navbar/DefaultNavbar";

const TeachersFunction = () => {
  const dispatch = useDispatch();
  const selectedClass = useSelector((state) => state.classOnerTeacher.classId);
  const [classes, setClasses] = useState([]);
  const students = useSelector((state) => state.classOnerTeacher.students);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    // Call API to fetch classes data
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:9999/teacher/classes"); // Replace with your API endpoint
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []); // Call API only once on component mount

  const handleSelectClass = async (classId) => {
    try {
      // Call API to fetch class details
      const response = await axios.get(`http://localhost:9999/classes/${classId}`);
      const classData = response.data;

      // Update Redux state with selected class and class details
      dispatch(setClassId(classId));
      dispatch(setClassOnerTeacher(classData));
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  // Render function
  return (
    <MKBox height="100vh" p={3} display="flex">
      {/* Left Navbar */}
      <TeacherDefaultNavbar
        transparent
        light={true}
        classes={classes}
        onSelectClass={handleSelectClass}
      />

      {/* Right Content */}
      <MKBox flex={1} pl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MKBox p={3} className="main-content">
              {selectedClass && (
                <NamesOfGroups selectedClass={selectedClass} onSelectGroup={setGroupId} />
              )}
            </MKBox>
          </Grid>

          <Grid item xs={12}>
            <MKBox p={3} className="main-content">
              {selectedClass && <GroupDetails studentsInGroup={students} groupId={groupId} />}
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </MKBox>
  );
};

export default TeachersFunction;
