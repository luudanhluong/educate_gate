/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";

// Material Dashboard 2 React base styles

// Material Dashboard 2 React context
import DefaultNavbarLink from "./DefaultNavbarLink";
import MKBox from "components/MKBox";

function DefaultNavbar({ transparent, light = true }) {
  return (
    <Container>
      <MKBox
        style={{ gap: "1.5rem" }}
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        height="calc(100vh - 2rem)"
        overflow="auto"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="absolute"
        backgroundColor="rgba(0,0,0,0.88) !important"
        left={0}
        top={0}
        zIndex={3}
      >
        <MKBox
          className={"ithv_elm_bl"}
          component={Link}
          to="/admin"
          mt={2}
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
        >
          <MKBox variant="button" fontWeight="bold" color={light ? "white" : "dark"} px={5} py={1}>
            Education Gate
          </MKBox>
        </MKBox>
        <MKBox
          color="inherit"
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          m={0}
          p={0}
        >
          <MKBox className={"ithv_elm_bl"} style={{ padding: "2px 4px" }}>
            <DefaultNavbarLink icon="person" name="Dashboard" route="/admin" light={light} />
          </MKBox>
          <MKBox className={"ithv_elm_bl"} style={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="donut_large"
              name="Create new list account"
              route="/admin/create-new-list-account"
              light={light}
            />
          </MKBox>
          <MKBox className={"ithv_elm_bl"} style={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="account_circle"
              name="Create new classes"
              route="/admin/create-new-class"
              light={light}
            />
          </MKBox>
          <MKBox className={"ithv_elm_bl"} style={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="key"
              name="sign in"
              route="/authentication/sign-in"
              light={light}
            />
          </MKBox>
        </MKBox>
      </MKBox>
    </Container>
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
