import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClassId } from "../../../../../app/slices/classOnerTeacherSlice";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import ListOfClasses from "../components/FeaturesOne/listOfClass.js";
import axios from "axios";
import {
  Container,
  Icon,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopupCreateGroup } from "app/slices/activeSlice";
import CreateGroupModal from "../components/FeaturesOne/CreateGroupRandomModal";
import { setActivePopupCreateGroupFromExcel } from "app/slices/activeSlice";
import CreateGroupFromExcelPopup from "../components/CreateGroupUpFileModal";

const TeacherDefaultNavbar = ({ transparent, light }) => {
  const dispatch = useDispatch();
  const { active_create_group } = useSelector((state) => state.active);
  const { active_create_group_excel } = useSelector((state) => state.active);
  const [classes, setClasses] = useState([]);
  const { userLogin } = useSelector((state) => state.user);
  const jwt = localStorage.getItem("jwt");
  const [menuOpen, setMenuOpen] = useState(false);
  const [arrowOpen, setArrowOpen] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    if (userLogin?.role === 2) {
      axios
        .get(`${BASE_URL}/teacher/classes`, config)
        .then((response) => {
          setClasses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    } else if (userLogin?.role === 4) {
      axios
        .get(`${BASE_URL}/class/student/${userLogin?.classId._id}`, config)
        .then((response) => {
          setClasses([response.data]);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [userLogin]);

  const handleSelectClass = (classId) => {
    dispatch(setClassId(classId));
  };
  const handleClick = () => {
    setMenuOpen(!menuOpen);
    setArrowOpen(!arrowOpen);
  };
  const handleRandomGroup = () => {
    dispatch(setActivePopupCreateGroup(true));
    setMenuOpen(false);
  };
  const handleExcelGroup = () => {
    dispatch(setActivePopupCreateGroupFromExcel(true));
    setMenuOpen(false);
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
          {userLogin?.role === 2 ? " Teacher Action" : "Student Action"}
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
              {userLogin?.role === 2 ? "Danh sách lớp" : "Lớp của bạn"}
            </Typography>
          </MKBox>
          <ListOfClasses classes={classes} onSelectClass={handleSelectClass} />
          {userLogin?.role === 2 && (
            <MKBox
              onClick={handleClick}
              sx={{
                gap: "3px",
                alignItems: "center",
              }}
              light={light}
            >
              <MKBox>
                <Typography component="span" fontSize="0.925rem" mb={"7px"}>
                  <Icon sx={{ marginRight: "4px" }}>group</Icon>
                  {userLogin?.role === 2 ? "Tạo nhóm " : ""}
                  {arrowOpen ? (
                    <ExpandLessIcon sx={{ marginLeft: "10px" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ marginLeft: "10px" }} />
                  )}
                </Typography>
                {active_create_group && <CreateGroupModal />}
                {active_create_group_excel && <CreateGroupFromExcelPopup />}
              </MKBox>

              <Collapse in={menuOpen} timeout="auto" unmountOnExit>
                <List>
                  <ListItemButton href="#random-group" onClick={handleRandomGroup}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{
                            marginBottom: "-5px",
                            marginTop: "-5px",
                            marginLeft: "10px",
                            fontSize: "0.85rem",
                          }}
                        >
                          Ngẫu nhiên
                        </Typography>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton href="#excel-group" onClick={handleExcelGroup}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{
                            marginBottom: "-5px",
                            marginTop: "-5px",
                            marginLeft: "10px",
                            fontSize: "0.85rem",
                          }}
                        >
                          Bằng Excel
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </List>
              </Collapse>
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
