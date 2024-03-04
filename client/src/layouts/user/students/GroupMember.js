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
import MKButton from "components/MKButton";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { useSelector, useDispatch } from "react-redux";
import { setActivePopup } from "app/slices/activeSlice";
import "../../sections/page-sections/featuers/components/FeaturesOne/studentList.css";

const GroupMembers = () => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.user);
  const [groupDetails, setGroupDetails] = useState({
    groupName: "",
    membersCount: 0,
    members: [],
    project: {},
    mentor: {},
  });
  const { groupId } = useParams();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!groupId) return;

      try {
        const response = await axios.get(`${BASE_URL}/group/${groupId}/members`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        setGroupDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", m: 3 }}>
      <Box sx={{ width: "65%", marginRight: 2 }}>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
            position: "relative",
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {groupDetails.project.name}
          </Typography>
          <Typography variant="body2">{groupDetails.project.description}</Typography>

          {userLogin.isLeader && (
            <MKButton
              disabled={!userLogin.isLeader}
              onClick={() => dispatch(setActivePopup(true))}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "8px",
              }}
            >
              Cập nhật dự án
            </MKButton>
          )}
        </Paper>

        <Paper
          elevation={3}
          style={{
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1, padding: 1 }}>
            {groupDetails.groupName} ({groupDetails.membersCount} Học sinh)
          </Typography>
          <List dense>
            {groupDetails.members.map((member) => (
              <ListItem key={member.username}>
                {member.image ? (
                  <Avatar alt={member.username} src={member.image} />
                ) : (
                  <Avatar>{member.username.charAt(0)}</Avatar>
                )}
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontFamily: "inherit" }}>
                      {member.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      style={{ fontFamily: "inherit", color: "#666", fontStyle: "italic" }}
                    >
                      {member.email}
                    </Typography>
                  }
                  style={{ marginLeft: "16px" }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Box sx={{ width: "30%" }}>
        {groupDetails.mentor.name && (
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#f7f7f7",
            }}
          >
            <Avatar
              src={groupDetails.mentor.image}
              sx={{ width: 56, height: 56, marginX: "auto" }}
            />
            <Typography variant="subtitle1">{groupDetails.mentor.name}</Typography>
            <Typography variant="body2">{groupDetails.mentor.email}</Typography>
            <Typography variant="body2">{groupDetails.mentor.phoneNumber}</Typography>
            <Typography variant="body2">{groupDetails.mentor.degree}</Typography>
          </Paper>
        )}

        {groupDetails.mentor.name && <Button>Tạo lịch họp</Button>}
      </Box>
    </Box>
  );
};

export default GroupMembers;
