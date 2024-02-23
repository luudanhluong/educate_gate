import React from "react";
import PropTypes from "prop-types";

const GroupsList = ({ groups, onSelectGroup }) => {
  return (
    <div>
      {groups.map((group) => (
        <div key={group._id} onClick={() => onSelectGroup(group._id)}>
          <h3>{group.groupName}</h3>
          {/* Display more group details here */}
        </div>
      ))}
    </div>
  );
};

GroupsList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      groupName: PropTypes.string.isRequired,
      // Define other properties of group object here
    })
  ),
  onSelectGroup: PropTypes.func.isRequired,
};

export default GroupsList;
