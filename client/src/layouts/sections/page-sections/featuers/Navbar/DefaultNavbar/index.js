// TeacherDefaultNavbar.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClassId } from "../../../../../../app/slices/classOnerTecaherSlice";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import DefaultNavbarLink from "./DefaultNavbarLink";
import MKBox from "components/MKBox";
import ListOfClasses from "../../components/FeaturesOne/listOfClass.js";
import axios from "axios"; // Import Axios library

const TeacherDefaultNavbar = ({ transparent, light = true }) => {
  const dispatch = useDispatch();
  const [showClassList, setShowClassList] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Call API to fetch classes data
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:9999/classes"); // Replace with your API endpoint
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []); // Call API only once on component mount
  useEffect(() => {
    console.log(classes);
  }, [classes]);
  const handleToggleClassList = () => {
    setShowClassList(!showClassList);
  };

  const handleSelectClass = (classId) => {
    dispatch(setClassId(classId));
  };

  return (
    <Container>
      <MKBox
        style={{ gap: "1.5rem" }}
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        height="calc(100vh - 2rem)"
        overflow="auto"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="absolute"
        backgroundColor="rgba(0,0,0,0.88) !important"
        left={0}
        top={0}
        zIndex={3}
      >
        <MKBox
          className={"ithv_elm_bl"}
          component={Link}
          to="/admin"
          mt={2}
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          variant="contained"
          fontWeight="bold"
          color={light ? "white" : "dark"}
          px={5} // Lựa chọn giữa px và py
        >
          Education Gate
        </MKBox>

        <MKBox
          color="inherit"
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          m={0}
          p={0}
        >
          <MKBox
            className={"ithv_elm_bl"}
            style={{ padding: "2px 4px" }}
            onClick={handleToggleClassList}
          >
            <DefaultNavbarLink
              icon="donut_large"
              name="List of class"
              route="/sections/page-sections/features"
              light={light}
            />
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
