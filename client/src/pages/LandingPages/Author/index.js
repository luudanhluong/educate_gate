import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import DefaultNavbar from "Navbars/DefaultNavbar";
import Profile from "pages/LandingPages/Author/sections/Profile";
import Posts from "pages/LandingPages/Author/sections/Posts";
import Footer from "pages/LandingPages/Author/sections/Footer";
import routes from "routes";
import bgImage from "assets/images/city-profile.jpg";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "app/slices/userSlice";
import EditProfile from "./sections/EditProfile";
import { setActivePopup } from "app/slices/activeSlice";
import { setCategories } from "app/slices/categorySlice";

function Author() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { active_popup } = useSelector((state) => state.active);
  useEffect(() => {
    dispatch(setActivePopup(false));
  }, []);
  useEffect(() => {
    axios
      .get(BASE_URL + "/user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        dispatch(setUserLogin(res.data));
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(BASE_URL + "/category")
      .then((res) => {
        dispatch(setCategories(res.data));
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, jwt]);
  return (
    <>
      <DefaultNavbar routes={routes} brand="Education Gate" transparent light sticky />
      {active_popup ? <EditProfile /> : ""}
      <MKBox bgColor="white">
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        />
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Profile />
          <Posts />
        </Card>
        {/* <Contact /> */}
        <Footer />
      </MKBox>
    </>
  );
}

export default Author;
