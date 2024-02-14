// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";

// Images
import profilePicture from "assets/images/bruce-mars.jpg";
import { useSelector } from "react-redux";
import MKButton from "components/MKButton";

function Profile() {
  const userLogin = useSelector((state) => state.user.userLogin);
  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto" sx={{ userSelect: "none" }}>
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={profilePicture} alt="Burce Mars" size="xxl" shadow="xl" />
          </MKBox>
          <Grid container justifyContent="center" sx={{ position: "relative" }} py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <MKTypography variant="h3" className={"truncate"}>
                  {userLogin ? userLogin.username : ""}
                </MKTypography>
                <MKBox
                  size="small"
                  sx={{
                    background: "#ccc",
                    padding: "10px 28px",
                    borderRadius: "8px",
                    fontWeight: 500,
                    cursor: "default",
                  }}
                >
                  {userLogin ? userLogin.phoneNumber : ""}
                </MKBox>
              </MKBox>
              <Grid container display={"flex"} flexDirection={"column"} gap={"1rem"} py={2}>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Lớp&nbsp;
                  </MKTypography>
                  <MKTypography
                    component="span"
                    variant="body2"
                    color="text"
                    sx={{ fontWeight: "400" }}
                    className={"truncate"}
                  >
                    {userLogin.classId && userLogin
                      ? `${userLogin.classId.preName}${userLogin.classId.code}${
                          userLogin.classId.suffName ? "-" + userLogin.classId.suffName : ""
                        }`
                      : ""}
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Email&nbsp;
                  </MKTypography>
                  <MKTypography
                    component="span"
                    variant="body2"
                    color="text"
                    sx={{ fontWeight: "400" }}
                    className={"truncate"}
                  >
                    {userLogin ? userLogin.email : ""}
                  </MKTypography>
                </Grid>
                {userLogin.gender ? (
                  <Grid item>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                      Giới tính&nbsp;
                    </MKTypography>
                    <MKTypography
                      component="span"
                      variant="body2"
                      color="text"
                      sx={{ fontWeight: "400" }}
                      className={"truncate"}
                    >
                      {userLogin.gender ? "Nam" : "Nữ"}
                    </MKTypography>
                  </Grid>
                ) : (
                  ""
                )}
                {userLogin.Dob ? (
                  <Grid item>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                      Ngày sinh&nbsp;
                    </MKTypography>
                    <MKTypography
                      component="span"
                      variant="body2"
                      color="text"
                      sx={{ fontWeight: "400" }}
                      className={"truncate"}
                    >
                      {userLogin.Dob}
                    </MKTypography>
                  </Grid>
                ) : (
                  ""
                )}
                {userLogin.menteeCount ? (
                  <Grid item>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                      Số lượng nhóm hướng dẫn&nbsp;
                    </MKTypography>
                    <MKTypography
                      component="span"
                      variant="body2"
                      color="text"
                      sx={{ fontWeight: "400" }}
                      className={"truncate"}
                    >
                      {userLogin.menteeCount}
                    </MKTypography>
                  </Grid>
                ) : (
                  ""
                )}
                {userLogin.mentorCategoryId ? (
                  <Grid item>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                      Bằng cấp&nbsp;
                    </MKTypography>
                    <MKTypography
                      component="span"
                      variant="body2"
                      color="text"
                      sx={{ fontWeight: "400" }}
                      className={"truncate"}
                    >
                      {userLogin.mentorCategoryId}
                    </MKTypography>
                  </Grid>
                ) : (
                  ""
                )}
                {userLogin.degree ? (
                  <Grid item>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                      Bằng cấp&nbsp;
                    </MKTypography>
                    <MKTypography
                      component="span"
                      variant="body2"
                      color="text"
                      sx={{ fontWeight: "400" }}
                      className={"truncate"}
                    >
                      {userLogin.degree}
                    </MKTypography>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <MKButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                textDecoration: "underline",
                color: "#1A73E8",
                textTransform: "none",
                fontWeight: "400",
              }}
            >
              Edit Profile
            </MKButton>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
