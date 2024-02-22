// GroupDetails.js
import React from "react";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

const GroupDetails = ({ studentsInGroup }) => {
  return (
    <div className="StudentDetailsWrapper">
      <div className="StudentDetailsHeader">
        <MKTypography variant="h5" mb={3}>
          <div className="text">Group Details</div>
        </MKTypography>
      </div>

      <div className="GroupDetailsItem">
        <h3>Students in Selected Group</h3>
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Leader</th>
              <th>Major</th>
            </tr>
          </thead>
          <tbody>
            {studentsInGroup.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{student.isLeader ? "Yes" : "No"}</td>
                <td>{student.majorOfStudent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

GroupDetails.propTypes = {
  studentsInGroup: PropTypes.array.isRequired, // Ensure studentsInGroup is required
};

export default GroupDetails;
