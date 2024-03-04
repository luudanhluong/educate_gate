import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClassId } from "../../../../../app/slices/classOnerTeacherSlice";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import ListOfClasses from "../components/FeaturesOne/listOfClass.js";
import axios from "axios";
import { Container, Icon, Typography } from "@mui/material";
import { BASE_URL } from "utilities/initialValue";
import { Button } from "@mui/material";

const TeacherDefaultNavbar = ({ transparent, light = true }) => {
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);
  const { userLogin } = useSelector((state) => state.user);
  const { selectedClassId } = useSelector((state) => state.classOnerTeacher);
  const jwt = localStorage.getItem("jwt");

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
  }, [userLogin]);

  const createGroups = () => {
    const numberOfGroups = prompt("Nhập số lượng nhóm bạn muốn tạo:");
    if (!selectedClassId || !numberOfGroups) {
      alert("Vui lòng chọn lớp và nhập số lượng nhóm!");
      return;
    }

    axios
      .post(`${BASE_URL}/group/createRandom`, { classId: selectedClassId, numberOfGroups }, config)
      .then(() => {
        alert("Nhóm đã được tạo thành công!");
      })
      .catch((error) => {
        console.error("Error creating groups:", error);
        alert("Có lỗi xảy ra khi tạo nhóm!");
      });
  };

  const handleSelectClass = (classId) => {
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
              {userLogin.role === 2 ? "List of Classes" : "Your Class"}
            </Typography>
          </MKBox>
          {userLogin.role === 2 && (
            <Button variant="contained" color="primary" onClick={createGroups}>
              Tạo Nhóm
            </Button>
          )}
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
