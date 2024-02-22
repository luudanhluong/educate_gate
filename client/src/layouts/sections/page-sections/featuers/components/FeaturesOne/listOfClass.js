import React from "react";
import { useDispatch } from "react-redux";
import { setClassId } from "../../../../../../app/slices/classOnerTecaherSlice"; // Adjust the import path as necessary
import PropTypes from "prop-types";

const ListOfClasses = ({ classes = [] }) => {
  const dispatch = useDispatch();

  const onSelectClass = (classId) => {
    dispatch(setClassId(classId));
  };

  return (
    <div className="ClassListWrapper">
      {classes.map((classItem) => (
        <div key={classItem.id} className="ClassItem" onClick={() => onSelectClass(classItem.id)}>
          {classItem.name}
        </div>
      ))}
    </div>
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
