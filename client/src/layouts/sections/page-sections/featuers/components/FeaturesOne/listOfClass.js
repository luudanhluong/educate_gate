import React from "react";
import { useDispatch } from "react-redux";
import { setClassId } from "../../../../../../app/slices/classOnerTeacherSlice"; // Adjust the import path as necessary
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import "./studentList.css";

const ListOfClasses = ({ classes = [] }) => {
  const dispatch = useDispatch();
  console.log(classes);

  const handleSelectClass = (classId) => {
    console.log("Selected class:", classId);
    dispatch(setClassId(classId));
  };

  return (
    <MKBox className="ClassListWrapper" color="danger">
      {classes.map((classItem) => (
        <div
          key={classItem._id}
          className={`ClassItem ${classItem.selected ? "selected" : ""}`}
          onClick={() => handleSelectClass(classItem._id)}
        >
          {classItem.preName}
          {classItem.code}
          {classItem.suffName ? `-${classItem.suffName}` : ""}
        </div>
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
