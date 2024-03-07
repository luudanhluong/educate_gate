import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText, Typography, Avatar, Box } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { useDispatch, useSelector } from "react-redux";
import { setActivePopup } from "app/slices/activeSlice";
import MKButton from "components/MKButton";
import "../../sections/page-sections/featuers/components/FeaturesOne/studentList.css";

const GroupMembers = () => {
  const dispatch = useDispatch();
  const [groupDetails, setGroupDetails] = useState({});
  const { userLogin } = useSelector((state) => state.user);
  const { groupId } = useParams();
  console.log(userLogin);
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
    <Box
      sx={{
        width: "90%",
        display: "flex",
        justifyContent: "space-between",
        m: 3,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box sx={{ width: "65%", marginRight: 2, marginTop: 1 }}>
        {groupDetails.project ? (
          <Box
            elevation={3}
            style={{
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 0.5px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              {groupDetails.project[0]?.name}
            </Typography>
            <Typography variant="body2">{groupDetails.project[0]?.description}</Typography>
            {userLogin.isLeader && userLogin.groupId === groupId && (
              <MKButton
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
          </Box>
        ) : (
          ""
        )}

        <Box
          elevation={3}
          style={{
            boxShadow: "0 0.5px 4px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1, pt: 2, pl: 2 }}>
            {groupDetails.name} ({groupDetails.userCount} Học sinh)
          </Typography>
          <List dense sx={{ padding: "20px" }}>
            {groupDetails.members
              ? groupDetails.members.map((member) => (
                  <ListItem key={member.username}>
                    {member.avatar ? (
                      <Avatar alt={member.username} src={member.avatar} />
                    ) : (
                      <Avatar>{member.username.charAt(0)}</Avatar>
                    )}
                    <ListItemText
                      primary={
                        <Typography style={{ fontFamily: "inherit" }}>{member.username}</Typography>
                      }
                      secondary={
                        <Typography variant="body2" style={{ color: "#666", fontStyle: "italic" }}>
                          {member.email}
                        </Typography>
                      }
                      style={{ marginLeft: "16px" }}
                    />
                  </ListItem>
                ))
              : ""}
          </List>
        </Box>
      </Box>

      <Box marginTop={2} sx={{ width: "30%" }}>
        {groupDetails.mentorDetails && groupDetails.mentorDetails.length > 0 && (
          <Box
            elevation={3}
            sx={{
              padding: 2,
              textAlign: "center",
              marginBottom: 2,
              boxShadow: "0 0.5px 4px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar
              src={groupDetails.mentorDetails[0].image}
              sx={{ width: 56, height: 56, marginX: "auto" }}
            />
            <Typography variant="subtitle1">{groupDetails.mentorDetails[0].username}</Typography>
            <Typography variant="body2">{groupDetails.mentorDetails[0].email}</Typography>
            <Typography variant="body2">{groupDetails.mentorDetails[0].phoneNumber}</Typography>
            <Typography variant="body2">{groupDetails.mentorDetails[0].degree}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GroupMembers;
