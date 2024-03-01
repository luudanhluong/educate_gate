import React, { useState, useEffect } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const ListOfGroups = () => {
  const [groupData, setGroupData] = useState([]);
  const groups = useSelector((state) => state.group.groups);

  useEffect(() => {
    setGroupData(groups);
  }, [groups]);

  if (groupData.length === 0) {
    return <Typography>No groups found in this class.</Typography>;
  }

  return (
    <>
      <style>
        {`
          @keyframes gradientBg {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .gradient-animated {
            background: linear-gradient(-45deg, #005241, #23d5ab,#00524f,#008d87);
            background-size: 400% 400%;
            animation: gradientBg 15s ease infinite;
          }
        `}
      </style>
      <Box
        sx={{
          marginLeft: "16px",
          marginBottom: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {groupData.map((group) => (
          <Box
            key={group._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: `calc(100%/3 - 18px)`,
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
              <Typography variant="subtitle1" fontWeight="bold">
                {group.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Project: {group.projectName || "No project assigned"}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ mt: "-7px", display: "flex", alignItems: "center", justifyContent: "left" }}
              >
                <Avatar
                  src={group.mentorDetails?.image}
                  alt={group.mentorDetails?.name}
                  sx={{ height: "30px", width: "30px", mr: 1 }}
                />
                <Typography
                  fontFamily={"Roboto, Helvetica, Arial,sans-serif"}
                  fontWeight={"400"}
                  color="textSecondary"
                  noWrap
                >
                  {group.mentorDetails?.name || "No mentor"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                bgcolor: "#F4F4F4",
                p: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Typography variant="body2">{group.membersCount} Members</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ListOfGroups;
