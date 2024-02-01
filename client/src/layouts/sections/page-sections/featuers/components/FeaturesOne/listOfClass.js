import React from "react";
import PropTypes from "prop-types";
import "./studentList.css";

const ListOfClasses = ({ classes, onSelectClass }) => {
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
  classes: PropTypes.array.isRequired,
  onSelectClass: PropTypes.func.isRequired,
};

export default ListOfClasses;
