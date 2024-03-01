import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  Box,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";

const GroupMembers = () => {
  const [groupDetails, setGroupDetails] = useState({
    groupName: "",
    membersCount: 0,
    members: [],
    projectDescription: "",
    projectName: "",
    mentorName: "",
    mentorEmail: "",
    mentorImage: "",
    isLeader: false,
  });
  const { groupId } = useParams();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!groupId) return;

      try {
        const response = await axios.get(`${BASE_URL}/group/${groupId}/members`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        setGroupDetails({
          groupName: response.data.groupName,
          membersCount: response.data.membersCount,
          members: response.data.members,
          projectDescription: response.data.project?.description || "",
          projectName: response.data.project?.nameProject || "",
          mentorName: response.data.mentor?.name || "",
          mentorEmail: response.data.mentor?.email || "",
          mentorImage: "",
          isLeader: response.data.isLeader,
        });
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", m: 3 }}>
      <Box sx={{ width: "65%", marginRight: 2 }}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {groupDetails.projectName}
          </Typography>
          <Typography variant="body2">{groupDetails.projectDescription}</Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Group Members ({groupDetails.membersCount})
          </Typography>
          <List dense>
            {groupDetails.members.map((member) => (
              <ListItem key={member.username} divider>
                <ListItemText primary={member.username} secondary={member.email} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Box sx={{ width: "30%" }}>
        {groupDetails.isLeader && (
          <Button variant="contained" color="primary" sx={{ display: "block", marginBottom: 2 }}>
            Update Project
          </Button>
        )}

        {groupDetails.mentorName && (
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center", marginBottom: 2 }}>
            <Avatar
              src={groupDetails.mentorImage}
              sx={{ width: 56, height: 56, marginX: "auto" }}
            />
            <Typography variant="subtitle1">{groupDetails.mentorName}</Typography>
            <Typography variant="body2">{groupDetails.mentorEmail}</Typography>
          </Paper>
        )}

        {groupDetails.mentorName && (
          <Button variant="contained" color="secondary" sx={{ display: "block" }}>
            Schedule Meeting
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GroupMembers;
