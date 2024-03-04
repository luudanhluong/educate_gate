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
import { setActivePopup } from "app/slices/activeSlice";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { userLogin } = useSelector((state) => state.user);
  const { active_popup } = useSelector((state) => state.active);
  const { _id: userId } = userLogin || {};
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const pid = "65db6ccb6347052204abc8ec";

  useEffect(() => {
    axios
      .get(BASE_URL + "/user/profile", config)
      .then((res) => dispatch(setUserLogin(res.data)))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (pid) {
      axios
        .get(`${BASE_URL}/project/${pid}`, config)
        .then((res) => dispatch(setProject(res.data)))
        .catch((err) => console.log(err.message));
    }

    if (userId) {
      axios
        .get(`${BASE_URL}/project_category/${userId}`, config)
        .then((res) => dispatch(setProjectCategories(res.data)))
        .catch((err) => console.log(err.message));

      axios
        .get(`${BASE_URL}/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          dispatch(setUserLogin(res.data));
        })
        .catch((err) => console.log(err));
    }

    dispatch(setActivePopup(false));
  }, [dispatch, jwt, pid, userId]);

  return (
    <>
      <DefaultNavbar routes={routes} />
      {active_popup && <UpdateProject />}
      <MKBox pt={{ xs: 12, sm: 14 }} ml={"auto"} mr={"auto"} width="90%">
        <GroupMembers />
      </MKBox>
    </>
  );
};

export default GroupDetail;
