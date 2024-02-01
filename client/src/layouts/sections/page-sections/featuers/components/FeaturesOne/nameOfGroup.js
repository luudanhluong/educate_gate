// NamesOfGroups.js
import React from "react";
import PropTypes from "prop-types";
import "./studentList.css";

const NamesOfGroups = ({ selectedClass, groups, projects, mentors }) => {
  const filteredGroups = groups.filter((group) => group.classId === selectedClass);

  return (
    <div className="GroupListWrapper">
      {filteredGroups.map((group) => (
        <div key={group.id} className="GroupItem">
          <p>Group Name: {group.groupName}</p>
          {/* <p>Member Count: {group.studentId.length}</p> */}
          <p>
            Project: {projects.find((project) => project.id === group.projectId)?.name || "N/A"}
          </p>
          <p>Mentor: {mentors.find((mentor) => mentor.id === group.mentorId)?.name || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

NamesOfGroups.propTypes = {
  selectedClass: PropTypes.number.isRequired,
  groups: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  mentors: PropTypes.array.isRequired,
};

export default NamesOfGroups;
