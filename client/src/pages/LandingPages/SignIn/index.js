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

import { useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setFetchError } from "app/slices/errorSlice";
import { setUserLogin } from "app/slices/userSlice";
import { methodSendRequest } from "utilities/FetchData";
import { BASE_URL } from "utilities/initialValue";
import { POST, headers } from "utilities/initialValue";

function SignInBasic() {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.user.userRegister);
  const formValues = {
    email: userRegister.email ? userRegister.email : "admin_1@fpt.edu.vn",
    password: userRegister.password ? userRegister.password : "123456",
  };
  const fetchError = useSelector((state) => state.error.fetchError);
  const navigation = useNavigate();
  const handleSubmit = async (values) => {
    if (!values) return;
    const formData = { ...values };
    const response = await methodSendRequest(BASE_URL + "/login", POST, headers, formData);
    const result = await response;
    if (result.error) {
      dispatch(setFetchError(true));
    } else {
      dispatch(setUserLogin(result));
      dispatch(setFetchError(false));
      navigation("/");
    }
  };
  useEffect(() => {
    dispatch(setFetchError(false));
  }, [dispatch]);
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email!")
      .matches(/@fpt\.edu\.vn$/, "Email phải có đuôi @fpt.edu.vn"),
  });

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
                  Đăng nhập
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              {fetchError ? (
                <div className="error-message-response">
                  <svg
                    style={{ marginRight: 8 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    fill="currentColor"
                    className="bi bi-exclamation-circle"
                    viewBox="-1 -1 18 18"
                  >
                    <path
                      strokeWidth={0.4}
                      stroke={`#d70707`}
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                    />
                    <path
                      strokeWidth={0.4}
                      stroke={`#d70707`}
                      d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"
                    />
                  </svg>
                  <div>Email và mật khẩu không chính xác</div>
                </div>
              ) : (
                ""
              )}
              <MKBox pt={4} pb={3} px={3}>
                <Formik
                  initialValues={formValues}
                  onSubmit={(values) => handleSubmit(values)}
                  validationSchema={SignupSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="lg_form-group">
                        <label
                          style={{ marginBottom: "4px" }}
                          className="lg_label block"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="abc@gmail.com"
                          className={`${
                            touched.email && errors.email ? "error" : ""
                          } lg_form-control`}
                          style={{ background: "#F4F4F4" }}
                          id="email"
                        />
                        <ErrorMessage name="email" component="div" className="lg_error_message" />
                      </div>
                      <div className="lg_form-group">
                        <label
                          style={{ marginBottom: "4px" }}
                          className="lg_label block"
                          htmlFor="password"
                        >
                          Mật khẩu
                        </label>
                        <div className="relative">
                          <Field
                            type="password"
                            name="password"
                            placeholder="12345678"
                            className={`${
                              touched.password && errors.password ? "error" : ""
                            } rg_form-control`}
                            id="password"
                            style={{ background: "#F4F4F4" }}
                          />
                        </div>
                      </div>
                      <div
                        className="flx forgot-password-title pointer"
                        style={{ justifyContent: "end" }}
                      >
                        <Link to={"/forgot_password"}>Quên mật khẩu</Link>
                      </div>
                      <button type="submit" className="btn-sbm pointer">
                        Đăng nhập
                      </button>
                    </Form>
                  )}
                </Formik>
                <div>
                  <div style={{ position: "relative", textAlign: "center", margin: "12px 0" }}>
                    <span
                      style={{
                        position: "relative",
                        background: "#FFF",
                        padding: "0 4px",
                        zIndex: 2,
                      }}
                    >
                      Hoặc
                    </span>
                    <div
                      style={{
                        border: "1px solid #E0E0E0",
                        position: "absolute",
                        width: "100%",
                        top: "50%",
                        transform: "translateY(50%)",
                        zIndex: 1,
                      }}
                    ></div>
                  </div>
                  <div style={{ textAlign: "center", margin: "12px 0 24px", fontSize: ".825rem" }}>
                    Bạn chưa có tài khoản?{" "}
                    <Link style={{ fontWeight: 600, color: "#000" }} to="/register">
                      Đăng ký tại đây
                    </Link>
                  </div>
                </div>
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

export default SignInBasic;
