import { Card, FormControl, Grid, Icon, InputLabel, MenuItem, Select } from "@mui/material";
import { setActivePopup } from "app/slices/activeSlice";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import * as Yup from "yup";
import MKTypography from "components/MKTypography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import MKInput from "components/MKInput";
import { useEffect, useState } from "react";
const EditProfile = () => {
  const dispatch = useDispatch(null);
  const { userLogin } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.category.categories);
  const [formvalues, setFormValues] = useState({});
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setFormValues({ ...userLogin, categories: [] });
  }, []);
  const handleSubmit = (values) => {
    console.log(values);
    console.log(userLogin);
  };
  console.log(categories);
  const validateSchema = Yup.object().shape({
    username: Yup.string().required("Vui lòng nhập họ và tên."),
    categories: Yup.array().required("Vui lòng nhập họ và tên."),
  });
  return (
    <MKBox
      width="100%"
      height="100%"
      position="fixed"
      mx="auto"
      zIndex={99}
      sx={{ background: "rgba(0,0,0,0.3)" }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        height="100%"
        className="edit-profile"
        sx={{ overflow: "auto" }}
      >
        <Grid position="relative" item xs={11} sm={9} md={6}>
          <Card id={"edit-profile"} className="pop-up" position="absolute" p={0}>
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
                  Chỉnh sửa thông tin cá nhân
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
            <MKBox pt={4} pb={3} px={3}>
              <MKBox mb={2}>
                <Formik
                  initialValues={formvalues}
                  onSubmit={(values) => {
                    console.log(formvalues);
                    handleSubmit(values);
                  }}
                  validationSchema={validateSchema}
                >
                  {({ values, handleChange, handleBlur, handleFocus }) => (
                    <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <MKBox>
                        <Field
                          name="username"
                          id="username"
                          value={values ? values.username : ""}
                          component={MKInput}
                          label="Full Name"
                          placeholder="eg. Thomas Shelby"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          InputLabelProps={{ shrink: true }}
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="lg_error_message"
                        />
                      </MKBox>
                      <MKBox>
                        <Field
                          name="email"
                          id="email"
                          value={values ? values.email : ""}
                          component={MKInput}
                          label="Email"
                          fullWidth
                          placeholder="eg. Thomas Shelby"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          InputLabelProps={{ shrink: true }}
                        />
                        <ErrorMessage name="email" component="div" className="lg_error_message" />
                      </MKBox>
                      <MKBox>
                        <Field
                          name="phoneNumber"
                          id="phoneNumber"
                          value={values ? values.phoneNumber : ""}
                          component={MKInput}
                          label="Số Điện Thoại"
                          fullWidth
                          placeholder="eg. Thomas Shelby"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          InputLabelProps={{ shrink: true }}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="lg_error_message"
                        />
                      </MKBox>
                      <MKBox sx={{ display: "flex", flexDirection: "row", gap: "1.5rem" }}>
                        <Grid item xs={6}>
                          <Field
                            name="gender"
                            id="gender"
                            value={values ? (values.gender ? "Nam" : "Nữ") : ""}
                            component={MKInput}
                            label="Giới tính"
                            placeholder="eg. Thomas Shelby"
                            fullWidth
                            width={"100%"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            InputLabelProps={{ shrink: true }}
                          />
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="lg_error_message"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            name="Dob"
                            id="Dob"
                            value={values ? values.Dob : ""}
                            component={MKInput}
                            label="Ngày sinh"
                            type="date"
                            placeholder="eg. Thomas Shelby"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            InputLabelProps={{ shrink: true }}
                          />
                          <ErrorMessage name="Dob" component="div" className="lg_error_message" />
                        </Grid>
                      </MKBox>
                      <MKBox>
                        <Field
                          name="menteeCount"
                          id="menteeCount"
                          value={values.menteeCount}
                          component={MKInput}
                          label="Gới hạn nhóm hướng dẫn"
                          placeholder="0"
                          defaultValue={5}
                          onChange={handleChange}
                          fullWidth
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          InputLabelProps={{ shrink: true }}
                        />
                        <ErrorMessage
                          name="menteeCount"
                          component="div"
                          className="lg_error_message"
                        />
                      </MKBox>
                      <FormControl size="small">
                        <InputLabel id="demo-select-small-label">
                          Chọn thể loại hướng dẫn
                        </InputLabel>
                        <Select
                          onChange={(event) => {
                            const catId = event.target.value;
                            if (categories.length <= 2 && event.target.value.length > 0) {
                              const selectedCategory = data.find((d) => d._id === catId);
                              if (selectedCategory) {
                                setCategories([...categories, selectedCategory]);
                              }
                            }
                            setCategory(catId);
                            handleChange(event);
                          }}
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          name="category"
                          value={category}
                          sx={{ padding: "12px 0" }}
                          fullWidth
                          label="Chọn thể loại hướng dẫn"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {data
                            ? data.map((d) => (
                                <MenuItem key={d._id} value={d._id}>
                                  {d.name}
                                </MenuItem>
                              ))
                            : ""}
                        </Select>
                        <MKBox display={"flex"} flexDirection={"row"} gap={"0.5rem"} py={1}>
                          {categories.map((c) => (
                            <MKBox
                              display={"flex"}
                              flexDirection={"row"}
                              justifyContent={"space-around"}
                              gap={"0.5rem"}
                              sx={{
                                padding: "8px 12px",
                                border: "1px solid #ccc",
                                borderRadius: "30px",
                                lineHeight: 1,
                              }}
                              key={c._id}
                            >
                              <MKTypography as={"span"}>{c.name}</MKTypography>
                              <Icon
                                sx={{
                                  height: "100%",
                                  lineHeight: 1,
                                  marginTop: "1px",
                                  cursor: "pointer",
                                }}
                              >
                                clear
                              </Icon>
                            </MKBox>
                          ))}
                        </MKBox>
                      </FormControl>
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
};

export default EditProfile;
