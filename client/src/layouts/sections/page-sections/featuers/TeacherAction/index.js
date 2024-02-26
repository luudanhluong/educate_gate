import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClassId } from "../../../../../app/slices/classOnerTeacherSlice";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import ListOfClasses from "../components/FeaturesOne/listOfClass.js";
import axios from "axios";
import { Container, Icon, Typography } from "@mui/material";

const TeacherDefaultNavbar = ({ transparent, light = true }) => {
  const dispatch = useDispatch();
  // const [showClassList, setShowClassList] = useState(false);
  const [classes, setClasses] = useState([]);
  // const [isHovered, setIsHovered] = useState(false);

  // const defaultStyle = {
  //   color: "black",
  //   cursor: "pointer",
  //   transition: "all 0.3s ease",
  // };

  // const hoverStyle = {
  //   transform: "scale(1.05)",
  // };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      axios
        .get("http://localhost:9999/teacher/classes", config)
        .then((response) => {
          console.log(response.data);
          setClasses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, []);

  // const handleToggleClassList = () => setShowClassList(!showClassList);
  // console.log(showClassList);

  const handleSelectClass = (classId) => {
    console.log("Selected class 1:", classId);
    dispatch(setClassId(classId));
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
          Teacher Action
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
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            // onClick={handleToggleClassList}
            light={light}
          >
            <Icon>donut_large</Icon>
            <Typography component="span" fontSize="0.925rem">
              List of class
            </Typography>
          </MKBox>
          <ListOfClasses classes={classes} onSelectClass={handleSelectClass} />
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