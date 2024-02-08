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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppBar, Icon, Tab, Tabs } from "@mui/material";
import { setActive } from "app/slices/activeSlice";
import { setclasses } from "app/slices/classSlice";
import MKButton from "components/MKButton";
import { setActivePopup } from "app/slices/activeSlice";

function AddClassList() {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState();
  const limitClass = 10;
  const { active } = useSelector((state) => state.active);
  const { filterPreName, searchValue, sort, pageNo } = useSelector((state) => state.class);
  const handleTabType = (event, newValue) => dispatch(setActive(newValue));
  useEffect(() => {
    dispatch(setActive(0));
  }, []);
  const formValues =
    active === 0
      ? {
          preName: "",
          suffName: "",
          limmitStudent: 30,
          quantity: 0,
        }
      : {
          file: "",
        };
  const initialValues = Yup.object().shape(
    active === 0
      ? {
          preName: Yup.string().required("Vui lòng nhập tiền tố của lớp học"),
          suffName: Yup.string(),
          limmitStudent: Yup.number()
            .typeError("Vui lòng nhập số")
            .required("Vui lòng nhập giới hạn sinh viên của lớp của lớp học"),
          quantity: Yup.number()
            .typeError("Vui lòng nhập số")
            .required("Vui lòng nhập số lương sinh viên của lớp của lớp học"),
        }
      : {
          file: Yup.mixed().required("Vui lòng chọn một file"),
        }
  );
  const getClassInfo = () =>
    axios
      .get(
        `${BASE_URL}/admins/list-classes?item=createdAt&order=${sort}&skip=${
          pageNo * limitClass
        }&limit=${limitClass}&preName=${filterPreName}&search=${searchValue}`
      )
      .then((response) => {
        dispatch(setclasses(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  const handleSubmit = async (values) => {
    try {
      const { preName, suffName, limmitStudent, quantity } = values;
      const formData_1 = new FormData();
      formData_1.append("file", fileName);
      const formData_2 = new FormData();
      formData_2.append("preName", preName.toUpperCase());
      formData_2.append("suffName", suffName ? suffName.toUpperCase() : suffName);
      formData_2.append("limmitStudent", Number(limmitStudent));
      formData_2.append("quantity", Number(quantity));
      await axios
        .post(BASE_URL + "/admins/create-new-classes", active === 0 ? formData_2 : formData_1)
        .then((response) => {
          getClassInfo();
          return response;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
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
          <Card id={"add_list_classes"} className="pop-up" position="absolute" p={0}>
            <MKBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={1}
              mb={2}
              textAlign="center"
            >
              <MKBox position="relative">
                <MKTypography variant="h4" fontWeight="medium" color="white" my={1}>
                  Tạo danh sách Lớp học
                </MKTypography>
                <MKBox
                  onClick={() => dispatch(setActivePopup(false))}
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
            <MKBox px={3}>
              <Grid item xs={12}>
                <AppBar position="static">
                  <Tabs value={active} onChange={handleTabType}>
                    <Tab
                      icon={
                        <MKBox
                          component="i"
                          color="dark"
                          mr={1.25}
                          sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                          className="fas fa-desktop"
                        />
                      }
                      label="Thêm"
                    />
                    <Tab
                      icon={
                        <MKBox
                          component="i"
                          color="dark"
                          mr={1.25}
                          sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                          className="fas fa-code"
                        />
                      }
                      label="Thêm từ File(.xlsx)"
                    />
                  </Tabs>
                </AppBar>
              </Grid>
            </MKBox>
            <MKBox pt={1} pb={3} px={3}>
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
                      {active === 0 ? (
                        <>
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
                            <ErrorMessage
                              name="preName"
                              component="div"
                              className="lg_error_message"
                            />
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
                        </>
                      ) : (
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
                      )}
                      <MKButton
                        type="submit"
                        sx={{
                          background: "#1A73E8",
                          marginTop: "16px",
                          color: "#FFFFFF",
                          width: "100%",
                          "&:hover": {
                            backgroundColor: "#1865ca !important",
                          },
                          "&:focus:not(:hover)": {
                            backgroundColor: "#1865ca",
                          },
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

export default AddClassList;
