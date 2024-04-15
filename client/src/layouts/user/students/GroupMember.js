import { List, ListItem, ListItemText, Typography, Avatar, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActivePopup } from "app/slices/activeSlice";
import MKButton from "components/MKButton";
import "../../sections/featuers/components/FeaturesOne/studentList.css";
import { useLocation } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import getParams from "utilities/getParams";

const GroupMembers = () => {
  const dispatch = useDispatch();
  const url = useLocation();
  const groupId = getParams(2, url.pathname);
  const { group: groupDetails } = useSelector((state) => state.group);
  const { userLogin } = useSelector((state) => state.user);

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
        {groupDetails?.project ? (
          <Box
            elevation={3}
            style={{
              padding: "20px",
              marginBottom: "40px",
              boxShadow: "0 0.5px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              position: "relative",
              backgroundColor: "#00000008",
              border: "1px solid rgb(216, 215, 215)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 1,
                fontFamily: "inherit",
                fontSize: "1.25rem",
                fontWeight: "600",
              }}
            >
              {groupDetails.project[0]?.name}
            </Typography>
            <hr style={{ marginBottom: "5px" }}></hr>
            <Typography sx={{ fontFamily: "sans-serif", fontSize: ".9em" }}>
              {groupDetails.project[0]?.description}
            </Typography>
            {userLogin?.isLeader && userLogin?.groupId[0]?._id === groupId && (
              <MKButton
                onClick={() => dispatch(setActivePopup(true))}
                sx={{
                  position: "absolute",
                  bottom: 29,
                  right: 0,
                  margin: "8px",
                  backgroundColor: "#00000001",
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
            border: "1px solid rgb(216, 215, 215)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              pt: 2,
              pl: 2,
              pb: 2,
              backgroundColor: "#00000008",
              fontFamily: "inherit",
              fontSize: "1.25rem",
              fontWeight: "600",
              borderBottom: " 1px  solid rgb(216, 215, 215)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {groupDetails?.name}
              <Typography variant="h6" component="span" color="primary" sx={{ ml: 1 }}>
                ({groupDetails?.userCount} Students)
              </Typography>
            </Typography>
          </Typography>
          <List
            sx={{
              padding: "20px",
              bgcolor: "background.paper",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {groupDetails?.members?.map((member) => (
              <ListItem
                key={member.username}
                sx={{
                  "&:not(:last-child)": {
                    mb: 2,
                    borderBottom: "1px solid #eee",
                  },
                  p: 2,
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.03)",
                    cursor: "pointer",
                  },
                }}
              >
                <Avatar
                  alt={member.username}
                  src={member.avatar}
                  sx={{
                    width: 48,
                    height: 48,
                    marginRight: 2,
                    bgcolor: "secondary.main",
                    color: "white",
                  }}
                >
                  {member.avatar ? null : member.username.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={
                    <Typography sx={{ fontFamily: "inherit", fontWeight: "medium" }}>
                      {member.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontStyle: "italic" }}
                    >
                      {member.email}
                    </Typography>
                  }
                  sx={{ marginLeft: "16px" }}
                />
                <Typography sx={{ fontFamily: "inherit", fontWeight: "medium" }}>
                  {member.isLeader && <StarBorderIcon color="warning" sx={{ ml: "auto" }} />}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Box marginTop={1} sx={{ width: "30%" }}>
        {groupDetails.mentorDetails && groupDetails.mentorDetails.length > 0 && (
          <Box
            sx={{
              padding: 3,
              textAlign: "center",
              marginBottom: 2,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "12px",
              border: "1px solid rgba(225, 225, 225, 0.6)",
              backgroundColor: "white",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Avatar
              src={groupDetails.mentorDetails[0].image}
              sx={{
                width: 80,
                height: 80,
                marginX: "auto",
                marginBottom: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontFamily: "inherit", fontWeight: "bold" }}>
              {groupDetails.mentorDetails[0].username}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontStyle: "italic", marginBottom: 1 }}
            >
              {groupDetails.mentorDetails[0].email}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {groupDetails.mentorDetails[0].phoneNumber}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.primary" }}>
              {groupDetails.mentorDetails[0].degree}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GroupMembers;
