// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "utilities/initialValue";
import axios from "axios";
import { useState } from "react";
import { Icon } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActivePopupAddListUser } from "app/slices/activeSlice";
import MKButton from "components/MKButton";
// import Icon from "assets/theme/components/icon";

function AddListAccount() {
  const [fileName, setFileName] = useState();
  const dispatch = useDispatch();
  const formValues = {
    file: "",
  };
  const initialValues = Yup.object().shape({
    file: Yup.mixed().required("Vui lòng chọn một file"),
  });
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", fileName);
      await axios
        .post(`${BASE_URL}/user/insert-list-users`, formData)
        .then((response) => {
          const responseData = response.data;
          console.log("Response Data:", responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleClick = () => {
    dispatch(setActivePopupAddListUser(false));
  };
  return (
    <MKBox
      width="100%"
      height="100%"
      overFlow="hidden"
      position="fixed"
      mx="auto"
      zIndex={4}
      sx={{ background: "rgba(0,0,0,0.3)" }}
    >
      <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
        <Grid position="relative" item xs={11} sm={9} md={5} lg={4} xl={4}>
          <Card id={"add_list_user"} className="pop-up" position="absolute" p={0}>
            <MKBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MKBox position="relative">
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Tạo danh sách người dùng
                </MKTypography>
                <MKBox
                  onClick={handleClick}
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
            </MKBox>
            <MKBox pt={4} pb={3} px={3}>
              <MKBox mb={2}>
                <Formik
                  initialValues={formValues}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                  validationSchema={initialValues}
                >
                  {({ errors, touched, handleChange, setFieldValue }) => (
                    <Form>
                      <div className="lg_form-group">
                        <label
                          style={{ marginBottom: "4px" }}
                          className="lg_label block"
                          htmlFor="file"
                        >
                          Tải tệp của bạn
                        </label>
                        <Field
                          type="file"
                          name="file"
                          className={`${
                            touched.file && errors.file ? "error" : ""
                          } lg_form-control`}
                          style={{ background: "#F4F4F4" }}
                          accept=".xls, .xlsx"
                          id="file"
                          onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                            handleChange(event);
                            setFileName(event.currentTarget.files[0]);
                          }}
                        />
                        <ErrorMessage name="file" component="div" className="lg_error_message" />
                      </div>
                      <MKButton
                        style={{ background: "#1A73E8", marginTop: 16 }}
                        type="submit"
                        className="btn-sbm pointer"
                        sx={{
                          fontSize: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        Tạo
                      </MKButton>
                    </Form>
                  )}
                </Formik>
              </MKBox>
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default AddListAccount;
