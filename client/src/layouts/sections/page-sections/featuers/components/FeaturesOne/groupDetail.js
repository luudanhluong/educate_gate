import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const GroupDetails = () => {
  const selectedGroupId = useSelector((state) => state.yourReducer.selectedGroupId); // Adjust according to your Redux setup
  const [groupDetails, setGroupDetails] = useState(null);

  useEffect(() => {
    if (selectedGroupId) {
      axios
        .get(`http://localhost:9999/group/${selectedGroupId}/details`)
        .then((response) => {
          setGroupDetails(response.data);
        })
        .catch((error) => console.error("Error fetching group details:", error));
    }
  }, [selectedGroupId]);

  return (
    <div>
      {groupDetails ? (
        <div>
          <h2>Group Name: {groupDetails.groupName}</h2>
          {/* Render more details here */}
          <div>
            Members:
            {groupDetails.studentId.map((student) => (
              <p key={student._id}>
                {student.name} - {student.email}
              </p> // Assuming the structure includes name and email
            ))}
          </div>
        </div>
      ) : (
        <p>Select a group to see details</p>
      )}
    </div>
  );
};

export default GroupDetails;
