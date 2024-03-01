import { Card, FormControl, InputLabel, MenuItem, Modal, Select, Slide } from "@mui/material";
import { setActivePopup } from "app/slices/activeSlice";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import * as Yup from "yup";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { useNavigate } from "react-router-dom";
import { setCategories } from "app/slices/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { active_popup } = useSelector((state) => state.active);
  const { category } = useSelector((state) => state.category);
  const isActivePopup = (actions) => dispatch(setActivePopup(actions));
  const jwt = localStorage.getItem("jwt");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  };
  const handleSubmit = (values) => {
    if (active_popup.type === "update")
      axios
        .patch(`${BASE_URL}/admins/update_category/${category._id}`, values, headers)
        .then(() =>
          axios
            .get(`${BASE_URL}/admins/all_categories`, headers)
            .then((res) => dispatch(setCategories(res.data)))
            .catch(() => navigate("/pages/authentication/sign-in"))
        )
        .catch(() => navigate("/pages/authentication/sign-in"));
    else
      axios
        .post(`${BASE_URL}/admins/create_new_category`, values, headers)
        .then(() =>
          axios
            .get(`${BASE_URL}/admins/all_categories`, headers)
            .then((res) => dispatch(setCategories(res.data)))
        )
        .catch(() => navigate("/pages/authentication/sign-in"));
    isActivePopup({ type: "close", payload: "" });
  };
  const deleteSemester = (id) => {
    console.log(id);
    axios
      .delete(`${BASE_URL}/admins/delete_category/${id}`, headers)
      .then(() =>
        axios
          .get(`${BASE_URL}/admins/all_categories`, headers)
          .then((res) => dispatch(setCategories(res.data)))
      );
    // .catch(() => navigate("/pages/authentication/sign-in"));
    isActivePopup({ type: "close", payload: "" });
  };
  const initialValues = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên của kỳ học"),
  });
  return (
    <Modal
      open={active_popup.payload === "category"}
      onClose={() => isActivePopup({ type: "close", payload: "" })}
      sx={{ display: "grid", placeItems: "center", overflow: "auto" }}
    >
      <Slide direction="down" in={active_popup.payload === "category"} timeout={500}>
        <Card position="absolute" p={0}>
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
            <MKTypography variant="h4" fontWeight="medium" color="white" my={1}>
              Thêm thể loại mới
            </MKTypography>
          </MKBox>
          <MKBox py={2} px={1}>
            <Formik
              initialValues={category || { name: "" }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
              validationSchema={initialValues}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <MKBox>
                    <Field
                      fullWidth
                      component={MKInput}
                      value={values.name}
                      label="Nhập tên thể loại"
                      placeholder="Công nghệ thông tin"
                      type="text"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                      className={`${touched.name && errors.name ? "error" : ""}`}
                      id="name"
                    />
                    <ErrorMessage name="name" component="div" className="lg_error_message" />
                  </MKBox>
                  {active_popup.type === "update" ? (
                    <FormControl fullWidth pb={1}>
                      <InputLabel id="select-category-label">Trạng thái thể loại</InputLabel>
                      <Select
                        labelId="select-category-label"
                        id="select-category-action"
                        name="category"
                        value={values.status}
                        onChange={handleChange}
                        label="Trạng thái thể loại"
                      >
                        <MenuItem value="active">Hoạt động</MenuItem>
                        <MenuItem value="inactive">Không hoạt động</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    ""
                  )}
                  <MKBox display="flex" gap="3.5rem">
                    <MKButton
                      type="submit"
                      sx={{
                        background: "#1A73E8",
                        marginTop: "6px",
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
                      Thêm
                    </MKButton>
                    {active_popup.type === "update" ? (
                      <MKButton
                        onClick={() => deleteSemester(values._id)}
                        sx={{
                          background: "#1A73E8",
                          marginTop: "6px",
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
                        Xóa
                      </MKButton>
                    ) : (
                      ""
                    )}
                  </MKBox>
                </Form>
              )}
            </Formik>
          </MKBox>
        </Card>
      </Slide>
    </Modal>
  );
};

export default Category;
