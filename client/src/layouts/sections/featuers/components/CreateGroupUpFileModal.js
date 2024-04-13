import React, { useState } from "react";
import { Card, Grid, Icon, Modal, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopupCreateGroupFromExcel } from "app/slices/activeSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGroupFromExcelPopup = () => {
  const dispatch = useDispatch();
  const { active_create_group_excel } = useSelector((state) => state.active);
  const selectedClassId = useSelector((state) => state.classOnerTeacher.classId);
  const [file, setFile] = useState(null);

  const isActivePopup = () => {
    dispatch(setActivePopupCreateGroupFromExcel(!active_create_group_excel));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedClassId || !file) {
      toast.error("Hãy chọn file của bạn!.");
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
      toast.success("Nhóm được tạo thành công!");
      isActivePopup();
    } catch (error) {
      console.error("Lỗi trong việc tạo nhóm.:", error);
      toast.error("Lỗi trong việc tạo nhóm.");
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
            <MKBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-1}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Tạo Nhóm Bằng Excel
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
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                style={{ display: "block", marginTop: "20px" }}
              />
              <MKButton
                onClick={handleSubmit}
                variant="gradient"
                color="info"
                fullWidth
                sx={{ marginTop: "30px" }}
              >
                Tạo Nhóm
              </MKButton>
            </MKBox>
          </Card>
        </Grid>
      </Slide>
    </Modal>
  );
};

export default CreateGroupFromExcelPopup;
