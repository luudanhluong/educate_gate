// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";

// Images
import profilePicture from "assets/images/bruce-mars.jpg";
import { useDispatch, useSelector } from "react-redux";
import MKButton from "components/MKButton";
import { setActivePopup } from "app/slices/activeSlice";
import getDate from "utilities/getDate";
import { Icon, Container, Grid } from "@mui/material";

function Profile() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.user);
  const {
    username,
    phoneNumber,
    classId,
    gender,
    email,
    Dob,
    menteeCount,
    mentorCategoryId,
    degree,
  } = userLogin || {};
  const { preName, code, suffName } = classId || {};
  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto" sx={{ userSelect: "none" }}>
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKBox position={"relative"}>
              <MKAvatar src={profilePicture} alt="Burce Mars" size="xxl" shadow="xl" />
              <Icon
                sx={{
                  padding: "4px",
                  position: "absolute",
                  bottom: "8%",
                  right: 0,
                  color: "#000",
                  transform: "translateY(-8%)",
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "100%",
                  backgroundColor: "#b8b8b8",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#9c9c9c",
                  },
                }}
              >
                photo_camera
              </Icon>
            </MKBox>
          </MKBox>
          <Grid container justifyContent="center" sx={{ position: "relative" }} py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                {username ? (
                  <MKTypography variant="h3" className={"truncate"}>
                    {username}
                  </MKTypography>
                ) : (
                  ""
                )}
                {phoneNumber ? (
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
                    {phoneNumber}
                  </MKBox>
                ) : (
                  ""
                )}
              </MKBox>
              <Grid container display={"flex"} flexDirection={"column"} gap={"1rem"} py={2}>
                {classId ? (
                  <MKBox>
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
                      {preName}
                      {code}
                      {suffName ? "-" + suffName : ""}
                    </MKTypography>
                  </MKBox>
                ) : (
                  ""
                )}
                {email ? (
                  <MKBox>
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
                      {email}
                    </MKTypography>
                  </MKBox>
                ) : (
                  ""
                )}
                {gender ? (
                  <MKBox>
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
                      {gender ? "Nam" : "Nữ"}
                    </MKTypography>
                  </MKBox>
                ) : (
                  ""
                )}
                {Dob ? (
                  <MKBox>
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
                      {getDate(Dob)}
                    </MKTypography>
                  </MKBox>
                ) : (
                  ""
                )}
                {menteeCount ? (
                  <MKBox>
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
                      {menteeCount}
                    </MKTypography>
                  </MKBox>
                ) : (
                  ""
                )}
                {mentorCategoryId ? (
                  <MKBox>
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
                      {mentorCategoryId}
                    </MKTypography>
                  </MKBox>
                ) : (
                  ""
                )}
                {degree ? (
                  <MKBox>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                      Mô tả sự nghiệp&nbsp;
                    </MKTypography>
                    <MKTypography
                      component="span"
                      variant="body2"
                      color="text"
                      sx={{ fontWeight: "400" }}
                      className={"truncate"}
                    >
                      {degree}
                    </MKTypography>
                  </MKBox>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <MKButton
              onClick={() => {
                dispatch(setActivePopup(true));
              }}
              id={"btn-edit-profile"}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                textDecoration: "underline",
                color: "#1A73E8",
                textTransform: "none",
                fontWeight: "400",
                "&:hover": {
                  textDecoration: "underline",
                },
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
