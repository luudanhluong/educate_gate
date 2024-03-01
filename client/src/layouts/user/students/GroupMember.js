import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";

const GroupMembers = () => {
  const [groupDetails, setGroupDetails] = useState({ groupName: "", membersCount: 0, members: [] });
  const { userLogin } = useSelector((state) => state.user);
  const groupId = userLogin.groupId;

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/group/${groupId}/members`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        setGroupDetails({
          groupName: response.data.groupName,
          membersCount: response.data.membersCount,
          members: response.data.members,
        });
      } catch (error) {
        console.log("Error fetching group details:", error);
      }
    };

    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);
  console.log(groupDetails);
  return (
    <Card sx={{ marginLeft: "30px" }}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Group Name: {groupDetails.groupName}
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ p: 2 }}>
        Number of Members: {groupDetails.membersCount}
      </Typography>
      <List dense={true}>
        {groupDetails.members.map((member) => (
          <ListItem key={member._id}>
            <ListItemText primary={member.username} secondary={member.email} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
export default GroupMembers;
