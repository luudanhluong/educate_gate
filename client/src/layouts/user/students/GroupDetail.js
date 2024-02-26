import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MKBox from "components/MKBox";
import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";

const GroupDetail = () => {
  const [members, setMembers] = useState([]);
  const { userLogin } = useSelector((state) => state.user);
  const groupId = userLogin.groupId;

  useEffect(() => {
    if (groupId) {
      axios
        .get(`${BASE_URL}/group/${groupId}/members`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        })
        .then((response) => {
          setMembers(response.data);
        })
        .catch((error) => {
          console.log("Error fetching group members:", error);
        });
    }
  }, [groupId]);

  return (
    <MKBox>
      <Card>
        <MKBox p={3}>
          <Typography variant="h5">Nhóm của bạn</Typography>
          <List>
            {members.length > 0 ? (
              members.map((member) => (
                <ListItem key={member._id}>
                  <ListItemText primary={member.username} secondary={member.email} />
                </ListItem>
              ))
            ) : (
              <Typography>Không có thành viên</Typography>
            )}
          </List>
        </MKBox>
      </Card>
    </MKBox>
  );
};

export default GroupDetail;
