import React, { useState, useEffect } from "react";
import {
  Modal,
  Grid,
  Card,
  Icon,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { Form, Formik } from "formik";
import { setActivePopupCreateGroup } from "app/slices/activeSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setGroups } from "app/slices/groupSlice";
import { setClassStudent } from "app/slices/classOnerTeacherSlice";

const CreateGroupModal = () => {
  const dispatch = useDispatch();
  const { active_create_group } = useSelector((state) => state.active);
  const selectedClassId = useSelector((state) => state.classOnerTeacher.classId);
  const [numberOfGroups, setNumberOfGroups] = useState("");
  const [groupExists, setGroupExists] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    if (selectedClassId) {
      axios
        .get(`${BASE_URL}/group/checkGroupsExist/${selectedClassId}`, config)
        .then((response) => {
          setGroupExists(response.data.exists);
        })
        .catch((error) => {
          console.error("Error checking groups:", error);
        });
    }
  }, [selectedClassId, config]);

  const handleClosePopup = () => {
    dispatch(setActivePopupCreateGroup(false));
  };

  const handleSubmit = () => {
    if (!selectedClassId || !numberOfGroups) {
      toast.error("Vui lòng chọn lớp và nhập số lượng nhóm!");
      return;
    }

    axios
      .post(`${BASE_URL}/group/createRandom`, { classId: selectedClassId, numberOfGroups }, config)
      .then(() => {
        axios
          .get(`${BASE_URL}/group/${selectedClassId}/groups`, config)
          .then((res) => dispatch(setGroups(res.data)))
          .catch((error) => console.log(error.message));
        axios
          .get(`${BASE_URL}/class/${selectedClassId}/students`)
          .then((res) => dispatch(setClassStudent(res.data)))
          .catch((error) => console.log(error.message));

        toast.success("Tạo nhóm thành công");
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error creating groups:", error);
        toast.error("Có lỗi xảy ra khi tạo nhóm!");
      });
  };

  return (
    <Modal
      open={active_create_group}
      onClose={handleClosePopup}
      sx={{ display: "grid", placeItems: "center", overflow: "auto" }}
    >
      <Slide direction="down" in={active_create_group} timeout={500}>
        <Grid width={500} position="relative" item xs={12} md={6}>
          {groupExists ? (
            <Alert severity="error">Lớp đã có nhóm, không thể tạo thêm!</Alert>
          ) : (
            <Card>
              <MKBox
                variant="gradient"
                textAlign="center"
                p={2}
                mb={2}
                sx={{ backgroundColor: "#2196f3", borderRadius: "4px 4px 0 0" }}
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Tạo nhóm
                </MKTypography>
                <MKBox
                  onClick={handleClosePopup}
                  position="absolute"
                  right={0}
                  fontSize={24}
                  sx={{
                    transform: "translateY(-50%)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "50%",
                      color: "#FFF",
                    },
                    lineHeight: 1,
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  <Icon>clear</Icon>
                </MKBox>
              </MKBox>
              <MKBox p={2}>
                <Formik initialValues={{ numberOfGroups: "" }} onSubmit={handleSubmit}>
                  {() => (
                    <Form>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="numberOfGroups">Số lượng nhóm</InputLabel>
                        <Select
                          id="numberOfGroups"
                          value={numberOfGroups}
                          onChange={(e) => setNumberOfGroups(e.target.value)}
                          label="Số lượng nhóm"
                        >
                          <MenuItem value="">
                            <em>Chọn số lượng nhóm</em>
                          </MenuItem>
                          {[1, 2, 3, 4, 5, 6].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <MKButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: "30px" }}
                        fullWidth
                      >
                        Tạo nhóm
                      </MKButton>
                    </Form>
                  )}
                </Formik>
              </MKBox>
            </Card>
          )}
        </Grid>
      </Slide>
    </Modal>
  );
};

export default CreateGroupModal;
