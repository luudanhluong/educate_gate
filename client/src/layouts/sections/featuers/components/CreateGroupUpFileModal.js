import React, { useState } from "react";
import { Card, Grid, Icon, Modal, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopupCreateGroupFromExcel } from "app/slices/activeSlice";

const CreateGroupFromExcelPopup = () => {
  const dispatch = useDispatch();
  const { active_create_group_excel } = useSelector((state) => state.active);
  const selectedClassId = useSelector((state) => state.classOnerTeacher.classId);
  const [file, setFile] = useState(null);
  const isActivePopup = () =>
    dispatch(setActivePopupCreateGroupFromExcel(!active_create_group_excel));

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedClassId || !file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("classId", selectedClassId);
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/group/createGroupsFromFile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Groups created successfully!");
      isActivePopup();
    } catch (error) {
      console.error("Error creating groups:", error);
      alert("Error creating groups.");
    }
  };

  return (
    <Modal
      open={active_create_group_excel}
      onClose={isActivePopup}
      sx={{ display: "grid", placeItems: "center", overflow: "auto" }}
    >
      <Slide direction="down" in={active_create_group_excel} timeout={500}>
        <Grid width={500} position="relative" item xs={12} md={6}>
          <Card>
            <MKBox variant="gradient" textAlign="center" p={2} mb={1}>
              <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Create Groups from Excel
              </MKTypography>
              <MKBox
                onClick={isActivePopup}
                position="absolute"
                right={0}
                fontSize={24}
                top="50%"
                sx={{
                  transform: "translateY(-50%)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                    color: "#FFF",
                  },
                  lineHeight: 1,
                  padding: "5px 5px 2px",
                  cursor: "pointer",
                }}
              >
                <Icon>clear</Icon>
              </MKBox>
            </MKBox>
            <MKBox p={2}>
              <MKTypography variant="subtitle1" gutterBottom>
                Selected Class: {selectedClassId}
              </MKTypography>
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                style={{ display: "block", marginTop: "20px" }}
              />
              <MKButton onClick={handleSubmit} variant="contained" color="primary" fullWidth mt={2}>
                Create Groups
              </MKButton>
            </MKBox>
          </Card>
        </Grid>
      </Slide>
    </Modal>
  );
};

export default CreateGroupFromExcelPopup;
