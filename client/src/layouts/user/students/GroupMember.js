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
import { useSelector } from "react-redux";

const GroupMembers = () => {
  const [groupDetails, setGroupDetails] = useState({});
  const { userLogin } = useSelector((state) => state.user);
  const { groupId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/group/${groupId}`, config)
      .then((res) => {
        setGroupDetails(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", m: 3 }}>
      <Box sx={{ width: "65%", marginRight: 2 }}>
        {groupDetails.project ? (
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              {groupDetails.project[0]?.name}
            </Typography>
            <Typography variant="body2">{groupDetails.project[0]?.description}</Typography>
          </Paper>
        ) : (
          ""
        )}

        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Group Members ({groupDetails.mentorCount})
          </Typography>
          <List dense>
            {groupDetails.members
              ? groupDetails.members.map((member) => (
                  <ListItem key={member.username} divider>
                    <ListItemText primary={member.username} secondary={member.email} />
                  </ListItem>
                ))
              : ""}
          </List>
        </Paper>
      </Box>

      <Box sx={{ width: "30%" }}>
        {userLogin.isLeader && (
          <Button variant="contained" color="primary" sx={{ display: "block", marginBottom: 2 }}>
            Update Project
          </Button>
        )}

        {groupDetails.mentorDetails && (
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center", marginBottom: 2 }}>
            <Avatar
              src={groupDetails.mentorDetails.image}
              sx={{ width: 56, height: 56, marginX: "auto" }}
            />
            <Typography variant="subtitle1">{groupDetails.mentorDetails.username}</Typography>
            <Typography variant="body2">{groupDetails.mentorDetails.email}</Typography>
          </Paper>
        )}

        {groupDetails.mentorDetails && (
          <Button variant="contained" color="secondary" sx={{ display: "block" }}>
            Schedule Meeting
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GroupMembers;
