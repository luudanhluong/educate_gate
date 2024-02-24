import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClassStudent } from "../../../../../../app/slices/classOnerTeacherSlice";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import "./studentList.css";
import axios from "axios";
import { Typography } from "@mui/material";

const ListOfClasses = ({ classes = [] }) => {
  const dispatch = useDispatch();

  // const handleSelectClass = (classId) => {
  //   dispatch(setClassId(classId));
  // };
  useEffect(() => {
    axios
      .get(`http://localhost:9999/class/${classId[0]._id}/students`)
      .then((res) => dispatch(setClassStudent(res.data)))
      .catch((error) => console.log(error.message));
  }, []);
  const getClassStudent = async (classId) => {
    await axios
      .get(`http://localhost:9999/class/${classId}/students`)
      .then((res) => dispatch(setClassStudent(res.data)))
      .catch((error) => console.log(error.message));
  };
  return (
    <MKBox className="ClassListWrapper" ml={1}>
      {classes.map((classItem) => (
        <Typography
          component="span"
          fontSize="0.725rem"
          px={"0.5rem"}
          key={classItem._id}
          className={`ClassItem ${classItem.selected ? "selected" : ""}`}
          onClick={() => getClassStudent(classItem._id)}
        >
          {classItem.preName}
          {classItem.code}
          {classItem.suffName ? `-${classItem.suffName}` : ""}
        </Typography>
      ))}
    </MKBox>
  );
};
ListOfClasses.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ListOfClasses;
