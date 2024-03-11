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
import { AppBar, Icon, Modal, Slide, Tab, Tabs } from "@mui/material";
import { setActive } from "app/slices/activeSlice";
import { setclasses } from "app/slices/classSlice";
import MKButton from "components/MKButton";
import { setActivePopup } from "app/slices/activeSlice";
import MKInput from "components/MKInput";

function AddClassList() {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState();
  const limitClass = 10;
  const { active } = useSelector((state) => state.active);
  const { filterPreName, searchValue, sort, pageNo } = useSelector((state) => state.class);
  const { active_popup } = useSelector((state) => state.active);
  const isActivePopup = () => dispatch(setActivePopup(!active_popup));
  const handleTabType = (event, newValue) => dispatch(setActive(newValue));
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    dispatch(setActive(0));
  }, []);
  const formValues =
    active === 0
      ? {
          preName: "",
          suffName: "",
          limitStudent: 30,
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
          limitStudent: Yup.number()
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
        }&limit=${limitClass}&preName=${filterPreName}&search=${searchValue}`,
        config
      )
      .then((response) => dispatch(setclasses(response.data)))
      .catch((error) => console.log(error));
  const handleSubmit = (values) => {
    const { preName, suffName, limitStudent, quantity } = values;
    const formData_1 = new FormData();
    formData_1.append("file", fileName);
    axios
      .post(
        BASE_URL + "/admins/create-new-classes",
        active === 0 ? { preName, suffName, limitStudent, quantity } : formData_1,
        config
      )
      .then(() => getClassInfo())
      .catch((error) => console.error(error.message));
  };
  return (
    <Modal
      open={active_popup}
      onClose={() => isActivePopup()}
      sx={{ display: "grid", placeItems: "center", overflow: "auto" }}
    >
      <Slide direction="down" in={active_popup} timeout={500}>
        <Card id={"add_list_classes"} className="pop-up" position="absolute" p={0}>
          <MKBox
            width={"400px"}
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
          <MKBox pt={2} pb={3} px={3}>
            <MKBox mb={2}>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
                validationSchema={initialValues}
              >
                {({ values, errors, touched, handleChange, setFieldValue }) => (
                  <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {active === 0 ? (
                      <>
                        <MKBox>
                          <Field
                            fullWidth
                            type="text"
                            name="quantity"
                            value={values.quantity}
                            component={MKInput}
                            label="Số lượng lớp muốn tạo"
                            placeholder="0"
                            onChange={handleChange}
                            className={`${touched.file && errors.file ? "error" : ""}`}
                            accept=".xls, .xlsx"
                            id="quantity"
                          />
                          <ErrorMessage
                            name="quantity"
                            component="div"
                            className="lg_error_message"
                          />
                        </MKBox>
                        <MKBox>
                          <Field
                            fullWidth
                            component={MKInput}
                            value={values.preName}
                            label="Nhập tiền tố của lớp"
                            type="text"
                            onChange={handleChange}
                            name="preName"
                            className={`${touched.file && errors.file ? "error" : ""}`}
                            accept=".xls, .xlsx"
                            id="preName"
                          />
                          <ErrorMessage
                            name="preName"
                            component="div"
                            className="lg_error_message"
                          />
                        </MKBox>
                        <MKBox>
                          <Field
                            fullWidth
                            component={MKInput}
                            value={values.suffName}
                            onChange={handleChange}
                            label="Nhập hậu tố của lớp"
                            type="text"
                            name="suffName"
                            className={`${touched.file && errors.file ? "error" : ""}`}
                            accept=".xls, .xlsx"
                            id="suffName"
                          />
                          <ErrorMessage
                            name="suffName"
                            component="div"
                            className="lg_error_message"
                          />
                        </MKBox>
                        <MKBox>
                          <Field
                            fullWidth
                            component={MKInput}
                            label="Giới hạn của sinh viên trong 1 lớp"
                            type="text"
                            value={values.limitStudent}
                            onChange={handleChange}
                            name="limitStudent"
                            className={`${touched.file && errors.file ? "error" : ""}`}
                            accept=".xls, .xlsx"
                            id="limitStudent"
                          />
                          <ErrorMessage
                            name="limitStudent"
                            component="div"
                            className="lg_error_message"
                          />
                        </MKBox>
                      </>
                    ) : (
                      <MKBox>
                        <Field
                          fullWidth
                          component={MKInput}
                          label="Tải tệp của bạn"
                          type="file"
                          variant="standard"
                          InputLabelProps={{ shrink: true }}
                          name="file"
                          className={`${touched.file && errors.file ? "error" : ""}`}
                          accept=".xls, .xlsx"
                          id="file"
                          onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                            handleChange(event);
                            setFileName(event.currentTarget.files[0]);
                          }}
                        />
                        <ErrorMessage name="file" component="div" className="lg_error_message" />
                      </MKBox>
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
      </Slide>
    </Modal>
  );
}

export default AddClassList;
