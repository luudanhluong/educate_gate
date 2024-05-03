import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { blueGrey } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setMentorGroups } from "app/slices/mentorSlice";
import logoAvatar from "../../../assets/images/logos/gray-logos/logo.webp";

function MentorGroups() {
  const groups = useSelector((state) => state.mentor.mentorGroups);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/mentor/mentor_groups`, config)
      .then((response) => {
        dispatch(setMentorGroups(response.data));
        if (response.data && response.data.length > 0) {
          setSelectedGroup(response.data[0]);
        }
      })
      .catch((err) => console.log("Error fetching mentor groups:", err));
  }, [dispatch]);

  const handleClick = (group) => {
    setSelectedGroup(group);
  };
  const appStyle = {
    display: "flex",
    fontFamily: "Open Sans, sans-serif",
    color: "#333",
    margin: "auto",
    height: "100vh",
    width: "100%",
  };

  const leftStyle = {
    padding: "25px",
    width: "60%",
    background: "linear-gradient(45deg, #375967 30%, #6d8e95 80%)",
    overflowY: "auto",
    backdropFilter: "blur(5px)",
    height: "100%",
    borderRadius: "10px 0 0 10px",
  };

  const rightStyle = {
    padding: "20px",
    borderLeft: "1px solid #FFF",
    width: "100%",
    background: "linear-gradient(-45deg, #375967 30%, #6d8e95 80%)",
    backgroundColor: "#FE6B8B",
    backdropFilter: "blur(5px)",
    height: "100%",
    overflowY: "auto",
    borderRadius: "0 10px 10px 0",
  };

  return (
    <div style={appStyle}>
      <div style={leftStyle}>
        <List>
          {groups.map((group) => (
            <Card
              key={group._id}
              onClick={() => handleClick(group)}
              sx={{
                marginBottom: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                transform: selectedGroup === group ? "scale(1.05)" : "scale(1)",
                boxShadow: selectedGroup === group ? 3 : 1,
                bgcolor: blueGrey[50],
              }}
            >
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                  {group.groupName}
                </Typography>
                <Typography style={{ fontFamily: "math" }} variant="body2">
                  Thành viên: {group.memberCount} người
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Dự án: {group.projectName}
                </Typography>
                <div>
                  {group.projectCategories.map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      color="primary"
                      variant="outlined"
                      style={{ margin: "2px" }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </List>
      </div>
      <div style={rightStyle}>
        {selectedGroup && (
          <Card
            sx={{ width: "90%", height: "auto", padding: "10px", boxShadow: 3, margin: "auto" }}
          >
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {selectedGroup.groupName}
              </Typography>
              <Typography
                color="primary"
                style={{ fontSize: "18px" }}
                variant="h6"
                gutterBottom
                mb={2}
              >
                Dự án: {selectedGroup.projectName}
              </Typography>

              <List>
                {selectedGroup.members.map((member, index) => (
                  <ListItem
                    key={index}
                    style={{ padding: "6px", backgroundColor: "#00000008" }}
                    sx={{ bgcolor: "white", my: 1, borderRadius: "10px", boxShadow: 1 }}
                  >
                    <ListItemAvatar style={{ padding: "10px" }}>
                      <Avatar src={member.avatar}>
                        {member.avatar ? null : (
                          <img
                            src={logoAvatar}
                            alt="Logo Avatar"
                            style={{ width: "100%", height: "100%" }}
                          />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      style={{ fontFamily: "ui-sans-serif" }}
                      primary={
                        <span style={{ fontSize: "21px", fontFamily: "math" }}>{member.name}</span>
                      }
                      secondary={
                        <>
                          <span style={{ fontWeight: "bold", fontFamily: "math" }}>
                            {member.rollNumber}
                          </span>
                          <br />
                          <span style={{ fontStyle: "italic", fontFamily: "math" }}>
                            {member.email}
                          </span>
                        </>
                      }
                    />

                    {member.isLeader && (
                      <StarBorderIcon
                        style={{ marginRight: "40px" }}
                        color="primary"
                        sx={{ ml: "auto" }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default MentorGroups;
