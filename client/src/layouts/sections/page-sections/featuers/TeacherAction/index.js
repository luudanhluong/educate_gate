import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClassId } from "../../../../../app/slices/classOnerTeacherSlice";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import ListOfClasses from "../components/FeaturesOne/listOfClass.js";
import axios from "axios";
import { Container, Icon, Typography } from "@mui/material";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopupCreateGroup } from "app/slices/activeSlice";
import CreateGroupModal from "../components/FeaturesOne/CreateGroupModal ";
import { Menu, MenuItem } from "@mui/material";

const TeacherDefaultNavbar = ({ transparent, light }) => {
  const dispatch = useDispatch();
  const { active_create_group } = useSelector((state) => state.active);
  const [classes, setClasses] = useState([]);
  const { userLogin } = useSelector((state) => state.user);
  const jwt = localStorage.getItem("jwt");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(active_create_group);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    if (userLogin.role === 2) {
      axios
        .get(`${BASE_URL}/teacher/classes`, config)
        .then((response) => {
          setClasses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    } else if (userLogin.role === 4) {
      axios
        .get(`${BASE_URL}/class/student/${userLogin.classId._id}`, config)
        .then((response) => {
          setClasses([response.data]);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [userLogin]);

  const handleSelectClass = (classId) => {
    dispatch(setClassId(classId));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };
  const handleRandomGroup = () => {
    dispatch(setActivePopupCreateGroup(true));
    handleClose();
  };
  const handleExcelGroup = () => {};

  const handleOutsideClick = (event) => {
    if (anchorEl && !anchorEl.contains(event.target)) {
      setMenuOpen(false);
      setAnchorEl(null);
    }
  };
  return (
    <Container
      width={"282px"}
      sx={{
        overflowY: "auto",
      }}
    >
      <MKBox
        sx={{
          gap: "1.5rem",
        }}
        overflow="auto"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <MKBox
          mt={2}
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          variant="contained"
          fontWeight="bold"
          color={"dark"}
        >
          {userLogin.role === 2 ? " Teacher Action" : "Student Action"}
        </MKBox>

        <MKBox
          color="inherit"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
            height: "100%",
          }}
          m={0}
          p={2}
        >
          <MKBox
            sx={{
              transform: "scale(1.05)",
              display: "flex",
              gap: "3px",
              alignItems: "center",
              "&:hover": {
                color: "#000",
                cursor: "default",
              },
            }}
            light={light}
          >
            <Icon>donut_large</Icon>
            <Typography component="span" fontSize="0.925rem">
              {userLogin.role === 2 ? "Danh sách lớp" : "Lớp của bạn"}
            </Typography>
          </MKBox>
          <ListOfClasses classes={classes} onSelectClass={handleSelectClass} />
          {userLogin.role === 2 && (
            <MKBox
              onClick={handleClick}
              sx={{
                transform: "scale(1)",
                transition: "transform 0.2s",
                display: "flex",
                gap: "3px",
                alignItems: "center",
                "&:hover": {
                  cursor: "pointer",
                  transform: "scale(1.05)",
                },
              }}
              light={light}
            >
              <Icon>group</Icon>

              <MKBox>
                <Typography component="span" fontSize="0.925rem">
                  {userLogin.role === 2 ? "Tạo nhóm" : ""}
                </Typography>
                {active_create_group && <CreateGroupModal />}
              </MKBox>

              <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
                <MenuItem onClick={handleRandomGroup}>Tạo nhóm ngẫu nhiên</MenuItem>
                <MenuItem onClick={handleExcelGroup}>Tạo nhóm bằng Excel</MenuItem>
              </Menu>
            </MKBox>
          )}
        </MKBox>
      </MKBox>
    </Container>
  );
};

TeacherDefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
};

export default TeacherDefaultNavbar;
