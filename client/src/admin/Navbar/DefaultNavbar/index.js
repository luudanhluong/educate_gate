// react-router components
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DefaultNavbarLink from "./DefaultNavbarLink";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

function DefaultNavbar({ transparent, light }) {
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
          to="/admin/dashboard"
          mt={2}
          lineHeight={1}
        >
          <MKButton
            variant="gradient"
            color="dark"
            width="100%"
            sx={{
              fontSize: "1.225rem",
              // "&: hover": {
              //   background: "transparent",
              // },
              // "&:focus:not(:hover)": {
              //   background: "transparent",
              // },
            }}
            fontWeight="bold"
          >
            Education Gate
          </MKButton>
        </MKBox>
        <MKBox
          color="inherit"
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          m={0}
          p={0}
        >
          <MKBox className={"ithv_elm_bl"} sx={{ padding: "2px 4px" }}>
            <DefaultNavbarLink
              icon="person"
              name="Dashboard"
              route="/admin/dashboard"
              light={light}
            />
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
