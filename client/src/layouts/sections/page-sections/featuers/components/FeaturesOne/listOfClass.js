import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClassId, setClassStudent } from "../../../../../../app/slices/classOnerTeacherSlice";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import "./studentList.css";
import axios from "axios";
import { Typography } from "@mui/material";
import { BASE_URL } from "utilities/initialValue";
import { setGroups } from "app/slices/groupSlice";

const ListOfClasses = ({ classes = [] }) => {
  const dispatch = useDispatch();
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const jwt = localStorage.getItem("jwt");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    if (classes.length > 0) {
      axios
        .get(`${BASE_URL}/class/${classes[0]._id}/students`)
        .then((res) => dispatch(setClassStudent(res.data)))
        .catch((error) => console.log(error.message));
      setSelectedClassIndex(classes[0]._id);
      axios
        .get(`${BASE_URL}/group/${classes[0]._id}/groups`, headers)
        .then((res) => dispatch(setGroups(res.data)));
    }
  }, [classes]);

  const getClassStudent = (id) => {
    axios.get(`${BASE_URL}/group/${id}/groups`, headers).then((res) => {
      dispatch(setGroups(res.data));
      dispatch(setClassId(id));
    });
    axios
      .get(`${BASE_URL}/class/${id}/students`)
      .then((res) => dispatch(setClassStudent(res.data)))
      .catch((error) => console.log(error.message));
    setSelectedClassIndex(id);
  };
  return (
    <MKBox className="ClassListWrapper" ml={1}>
      {Array.isArray(classes) && classes.length > 0 ? (
        classes.map((classItem) => (
          <Typography
            component="span"
            fontSize="0.725rem"
            px={"0.5rem"}
            key={classItem._id}
            className={`ClassItem ${
              selectedClassIndex === classItem._id ? "gradient-animated" : ""
            }`}
            onClick={() => getClassStudent(classItem._id)}
            style={{
              padding: selectedClassIndex === classItem._id ? "2px 2px 2px 26px" : "2px",
              backgroundColor: selectedClassIndex === classItem._id ? "#009879" : "",
              color: selectedClassIndex === classItem._id ? "#ffffff" : "black",
              transform: selectedClassIndex === classItem._id ? "scale(1.05)" : "",
            }}
          >
            {classItem.preName}
            {classItem.code}
            {classItem.suffName ? `-${classItem.suffName}` : ""}
          </Typography>
        ))
      ) : (
        <Typography>No classes found.</Typography>
      )}
    </MKBox>
  );
};

ListOfClasses.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      preName: PropTypes.string,
      code: PropTypes.number,
      suffName: PropTypes.string,
    })
  ).isRequired,
};

export default ListOfClasses;
