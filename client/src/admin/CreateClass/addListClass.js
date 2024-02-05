// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React page layout routes

// Images
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "utilities/initialValue";
import axios from "axios";

function AddClassList() {
  const formValues = {
    preName: "",
    suffName: "",
    limmitStudent: 30,
    quantity: 0,
  };
  const initialValues = Yup.object().shape({
    preName: Yup.string().required("Vui lòng nhập tiền tố của lớp học"),
    suffName: Yup.string().required("Vui lòng nhập hậu tố của lớp học"),
    limmitStudent: Yup.number()
      .typeError("Vui lòng nhập số")
      .required("Vui lòng nhập giới hạn sinh viên của lớp của lớp học"),
    quantity: Yup.number()
      .typeError("Vui lòng nhập số")
      .required("Vui lòng nhập số lương sinh viên của lớp của lớp học"),
  });
  const handleSubmit = async (values) => {
    const { preName, suffName, limmitStudent, quantity } = values;
    await axios
      .post(BASE_URL + "/admins/create-new-class", {
        preName: preName.toUperCase(),
        suffName: suffName.toUperCase(),
        limmitStudent: Number(limmitStudent),
        quantity: Number(quantity),
      })
      .then((response) => {
        const responseData = response.data;
        console.log("Response Data:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
              <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Tạo danh sách Lớp học
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
                  {({ errors, touched }) => (
                    <Form>
                      <div className="lg_form-group">
                        <label
                          style={{ marginBottom: "4px" }}
                          className="lg_label block"
                          htmlFor="file"
                        >
                          Số lượng lớp muốn tạo
                        </label>
                        <Field
                          type="text"
                          name="quantity"
                          className={`${
                            touched.file && errors.file ? "error" : ""
                          } lg_form-control`}
                          style={{ background: "#F4F4F4" }}
                          accept=".xls, .xlsx"
                          id="quantity"
                        />
                        <ErrorMessage
                          name="quantity"
                          component="div"
                          className="lg_error_message"
                        />
                      </div>
                      <div className="lg_form-group">
                        <label
                          style={{ marginBottom: "4px" }}
                          className="lg_label block"
                          htmlFor="preName"
                        >
                          Nhập tiền tố của lớp
                        </label>
                        <Field
                          type="text"
                          name="preName"
                          className={`${
                            touched.file && errors.file ? "error" : ""
                          } lg_form-control`}
                          style={{ background: "#F4F4F4" }}
                          accept=".xls, .xlsx"
                          id="preName"
                        />
                        <ErrorMessage name="preName" component="div" className="lg_error_message" />
                      </div>
                      <div className="lg_form-group">
                        <label
                          style={{ marginBottom: "4px" }}
                          className="lg_label block"
                          htmlFor="suffName"
                        >
                          Nhập hậu tố của lớp
                        </label>
                        <Field
                          type="text"
                          name="suffName"
                          className={`${
                            touched.file && errors.file ? "error" : ""
                          } lg_form-control`}
                          style={{ background: "#F4F4F4" }}
                          accept=".xls, .xlsx"
                          id="suffName"
                        />
                        <ErrorMessage
                          name="suffName"
                          component="div"
                          className="lg_error_message"
                        />
                      </div>
                      <div className="lg_form-group">
                        <label
                          style={{ marginBottom: "4px" }}
                          className="lg_label block"
                          htmlFor="limmitStudent"
                        >
                          Giới hạn của sinh viên trong 1 lớp
                        </label>
                        <Field
                          type="text"
                          name="limmitStudent"
                          className={`${
                            touched.file && errors.file ? "error" : ""
                          } lg_form-control`}
                          style={{ background: "#F4F4F4" }}
                          accept=".xls, .xlsx"
                          id="limmitStudent"
                        />
                        <ErrorMessage
                          name="limmitStudent"
                          component="div"
                          className="lg_error_message"
                        />
                      </div>
                      <button
                        style={{ background: "#1A73E8", marginTop: 16 }}
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
  );
}

export default AddClassList;
