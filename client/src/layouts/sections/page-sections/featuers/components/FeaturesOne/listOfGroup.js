import React, { useState, useEffect } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MKBox from "components/MKBox";
import { setActivePopup } from "app/slices/activeSlice";
import { setGroup } from "app/slices/groupSlice";
import "./studentList.css";

const ListOfGroups = () => {
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState([]);
  const groups = useSelector((state) => state.group.groups);
  const { userLogin } = useSelector((state) => state.user);
  const { active_popup } = useSelector((state) => state.active);
  const isActivePopup = () => dispatch(setActivePopup(!active_popup));
  const navigate = useNavigate();

  const handleGroupDetailClick = (groupId) => {
    navigate(`/group/${groupId}/members`);
  };
  useEffect(() => {
    setGroupData(groups);
  }, [groups]);

  return (
    <Box
      sx={{
        marginLeft: "16px",
        marginBottom: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      {groupData.map((group) => (
        <Box
          key={group._id}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "calc(100%/3 - 18px)",
            height: 166,
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            marginBottom: "8px",
            position: "relative",
          }}
        >
          <Box
            className="gradient-animated"
            sx={{
              color: "#fff",
              p: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" fontSize={"0.925rem"}>
              Nhóm: {group.name}
            </Typography>
            {group.project.length > 0 ? (
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Dự án: {group.project[0]?.name}
              </Typography>
            ) : (
              <MKBox
                pb="3px"
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  textDecoration: "underline",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                color="white"
                fontSize={"0.825rem"}
              >
                <em>Hãy cập nhật dự án của bạn</em>
              </MKBox>
            )}
          </Box>
          {group.mentorDetails?.length > 0 ? (
            <Box
              sx={{
                p: 1.3,
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  mt: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  width: "100%",
                }}
              >
                <Avatar
                  src={group.mentorDetails[0]?.image}
                  alt={group.mentorDetails[0]?.name}
                  sx={{ height: "30px", width: "30px", mr: 1 }}
                />
                <MKBox sx={{ width: "calc(100% - 54px)" }}>
                  <Typography
                    fontFamily={"Roboto, Helvetica, Arial,sans-serif"}
                    fontWeight={"400"}
                    fontSize={"0.825rem"}
                    className="truncate"
                    color="textSecondary"
                    noWrap
                  >
                    {group.mentorDetails[0]?.username}
                  </Typography>
                  <Typography
                    fontFamily={"Roboto, Helvetica, Arial,sans-serif"}
                    fontWeight={"400"}
                    fontSize={"0.825rem"}
                    className="truncate"
                    color="textSecondary"
                    noWrap
                  >
                    {group.mentorDetails[0]?.email}
                  </Typography>
                </MKBox>
              </Box>
            </Box>
          ) : (
            <MKBox
              sx={{
                flex: 1,
                cursor: "pointer",
                textDecoration: "underline",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              fontSize={"0.825rem"}
              onClick={() => {
                if (userLogin?.role === 2) {
                  isActivePopup();
                  dispatch(setGroup(group));
                }
              }}
            >
              {userLogin?.role === 2 && <em>Danh sách người hướng dẫn</em>}
            </MKBox>
          )}
          <Box
            px={2}
            py={1}
            sx={{
              bgcolor: "#F4F4F4",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"0.825rem"} variant="body2">
              {group.userCount} Thành viên
            </Typography>
            <Typography
              variant="body2"
              fontSize={"0.725rem"}
              sx={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => handleGroupDetailClick(group._id)}
            >
              <em>Chi tiết nhóm</em>
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListOfGroups;
