// GroupDetails.js
import React from "react";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

const GroupDetails = ({ students, groups }) => {
  // Tạo một đối tượng để nhóm sinh viên theo groupId
  const studentsByGroup = students.reduce((acc, student) => {
    const groupId = student.groupId;

    if (!acc[groupId]) {
      acc[groupId] = [];
    }

    acc[groupId].push(student);

    return acc;
  }, {});

  return (
    <div className="StudentDetailsWrapper">
      <div className="StudentDetailsHeader">
        <MKTypography variant="h5" mb={3}>
          <div className="text">Groups Details</div>
        </MKTypography>
      </div>

      {Object.entries(studentsByGroup).map(([groupId, studentsInGroup]) => {
        // Tìm thông tin nhóm dựa trên groupId
        const groupInfo = groups.find((group) => group.id === parseInt(groupId, 10));

        return (
          <div key={groupId} className="GroupDetailsItem">
            <h3>Group {groupInfo ? groupInfo.groupName : `ID ${groupId}`} Details</h3>
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
        );
      })}
    </div>
  );
};

GroupDetails.propTypes = {
  students: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
};

export default GroupDetails;
