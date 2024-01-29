/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "utilities/initialValue";
// import { POST } from "utilities/initialValue";
// import { headers } from "utilities/initialValue";
// import { methodSendRequestWithFormdate } from "utilities/FetchData";
import axios from "axios";
import { useState } from "react";
// import { readExcelFile } from "utilities/excels";
// import * as XLSX from "xlsx";

function CreateListAccount() {
  const [fileName, setFileName] = useState();
  const formValues = {
    file: null,
    sheetNo: 0,
  };
  const initialValues = Yup.object().shape({
    file: Yup.string().required("Vui lòng chọn một file"),
    sheetNo: Yup.number("Vui lòng nhập số sheet trong trang tính của bạn"),
  });
  const handleSubmit = async (values) => {
    try {
      const selectedFile = fileName;
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("sheetNo", values.sheetNo);
      const a = await axios.post(`${BASE_URL}/insert-list-users`, formData);
      console.log(a.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleOnChange = (e) => {
    setFileName(e.target.files[0]);
  };
  console.log(handleOnChange);
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
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
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Tạo danh sách người dùng
                </MKTypography>
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
                        <div className="lg_form-group">
                          <label
                            style={{ marginBottom: "4px" }}
                            className="lg_label block"
                            htmlFor="email"
                          >
                            Trang số
                          </label>
                          <Field
                            type="text"
                            name="sheetNo"
                            className={`${
                              touched.sheetNo && errors.sheetNo ? "error" : ""
                            } lg_form-control`}
                            style={{ background: "#F4F4F4" }}
                            id="sheetNo"
                          />
                          <ErrorMessage
                            name="sheetNo"
                            component="div"
                            className="lg_error_message"
                          />
                        </div>
                        <button
                          style={{ background: "#1A73E8" }}
                          type="submit"
                          className="btn-sbm pointer"
                        >
                          Tạo
                        </button>
                      </Form>
                    )}
                  </Formik>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default CreateListAccount;
