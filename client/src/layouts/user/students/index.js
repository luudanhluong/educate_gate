import React, { useEffect } from "react";
import DefaultNavbar from "Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import { useDispatch, useSelector } from "react-redux";
import UpdateProject from "../leader/UpdateProject";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import GroupMembers from "./GroupMember";
import { setUserLogin } from "app/slices/userSlice";
import { setProject } from "app/slices/projectSlice";
import { setProjectCategories } from "app/slices/projectSlice";
import routes from "routes";
import { setGroup } from "app/slices/groupSlice";
import { useParams } from "react-router-dom";
import { setCategories } from "app/slices/categorySlice";
import { setActivePopup } from "app/slices/activeSlice";
import bgImage from "assets/images/city-profile.jpg";
import Card from "@mui/material/Card";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { userLogin } = useSelector((state) => state.user);
  const { group } = useSelector((state) => state.group);
  const { active_popup } = useSelector((state) => state.active);
  const { groupId } = useParams();
  const { _id: userId } = userLogin || {};
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/group/${groupId}`, config)
      .then((res) => dispatch(setGroup(res.data[0])))
      .catch((err) => console.log(err));
    // dispatch(setProjectCategories([]));
  }, [groupId, dispatch]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/profile`, config)
      .then((res) => dispatch(setUserLogin(res.data)))
      .catch((err) => console.log(err));
    axios
      .get(`${BASE_URL}/category`, config)
      .then((res) => dispatch(setCategories(res.data)))
      .catch((err) => console.log(err));
    axios
      .get(BASE_URL + "/user/profile", config)
      .then((res) => dispatch(setUserLogin(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);
  useEffect(() => {
    if (group.project) {
      axios
        .get(`${BASE_URL}/project/${group.project[0]?._id}`, config)
        .then((res) => dispatch(setProject(res.data)))
        .catch((err) => console.log(err.message));
      axios
        .get(`${BASE_URL}/project_category/${group.project[0]?._id}`, config)
        .then((res) => dispatch(setProjectCategories(res.data)))
        .catch((err) => console.log(err.message));

      axios
        .get(`${BASE_URL}/user/profile`, config)
        .then((res) => dispatch(setUserLogin(res.data)))
        .catch((err) => console.log(err));
    }
    dispatch(setActivePopup(false));
  }, [dispatch, jwt, userId, group, groupId]);

  return (
    <>
      <DefaultNavbar routes={routes} />
      {active_popup && <UpdateProject />}
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
          <GroupMembers />
        </Card>
      </MKBox>
    </>
  );
};

export default GroupDetail;
