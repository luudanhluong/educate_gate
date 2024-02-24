// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
// import Container from "@mui/material/Container";

// Material Dashboard 2 React base sxs

// Material Dashboard 2 React context
import DefaultNavbarLink from "./DefaultNavbarLink";
import MKBox from "components/MKBox";

function DefaultNavbar({ transparent, light = true }) {
  return (
    <>
      <MKBox
        id="dfa-navbar"
        sx={{ gap: "1.5rem", background: "rgba(0,0,0,0.88) !important" }}
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        width="302px"
        height="calc(100vh - 4rem)"
        overflow="auto"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        zIndex={3}
      >
        <MKBox
          className={"ithv_elm_bl"}
          width={"100%"}
          component={Link}
          textAlign="center"
          to="/admin"
          mt={2}
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
        >
          <MKBox
            variant="button"
            sx={{
              fontSize: "1.425rem",
            }}
            fontWeight="bold"
            color={light ? "white" : "dark"}
            px={2}
            py={1}
          >
            Education Gate
          </MKBox>
        </MKBox>
        <MKBox
          color="inherit"
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          m={0}
          p={0}
        >
          <MKBox className={"ithv_elm_bl"} sx={{ padding: "2px 4px" }}>
            <DefaultNavbarLink icon="person" name="Dashboard" route="/admin" light={light} />
          </MKBox>
          <MKBox className={"ithv_elm_bl"} sx={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="donut_large"
              name="Create new list account"
              route="/admin/create-new-list-account"
              light={light}
            />
          </MKBox>
          <MKBox className={"ithv_elm_bl"} sx={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="account_circle"
              name="Create new classes"
              route="/admin/create-new-class"
              light={light}
            />
          </MKBox>
          <MKBox className={"ithv_elm_bl"} sx={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="key"
              name="danh sách lớp học sinh"
              route="/admin/list-class-students"
              light={light}
            />
          </MKBox>
          <MKBox className={"ithv_elm_bl"} sx={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="key"
              name="sign in"
              route="/authentication/sign-in"
              light={light}
            />
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
