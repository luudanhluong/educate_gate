import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClassStudent } from "../../../../../../app/slices/classOnerTeacherSlice";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import "./studentList.css";
import axios from "axios";
import { Typography } from "@mui/material";

const ListOfClasses = ({ classes = [] }) => {
  const dispatch = useDispatch();
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);

  useEffect(() => {
    if (classes.length > 0)
      axios
        .get(`http://localhost:9999/class/${classes[selectedClassIndex]._id}/students`)
        .then((res) => dispatch(setClassStudent(res.data)))
        .catch((error) => console.log(error.message));
  }, [classes, selectedClassIndex]);

  const getClassStudent = (index) => {
    setSelectedClassIndex(index);
  };

  return (
    <MKBox className="ClassListWrapper" ml={1}>
      {classes.map((classItem, index) => (
        <Typography
          component="span"
          fontSize="0.725rem"
          px={"0.5rem"}
          key={classItem._id}
          className={`ClassItem ${selectedClassIndex === index ? "selected" : ""}`}
          onClick={() => getClassStudent(index)}
          style={{
            padding: selectedClassIndex === index ? "2px 2px 2px 26px" : "2px",
            backgroundColor: selectedClassIndex === index ? "#009879" : "",
            color: selectedClassIndex === index ? "#ffffff" : "black",
            transform: selectedClassIndex === index ? "scale(1.05)" : "",
          }}
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
