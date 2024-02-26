import DefaultNavbar from "Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useEffect } from "react";
import routes from "routes";
import { useDispatch, useSelector } from "react-redux";
import UpdateProject from "./leader/UpdateProject";
import { setActivePopup } from "app/slices/activeSlice";
import { setUserLogin } from "app/slices/userSlice";
import { setMentorCategories } from "app/slices/categorySlice";
import { setCategories } from "app/slices/categorySlice";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";

const GroupDetail = () => {
  const dispatch = useDispatch();
  //   project;
  const jwt = localStorage.getItem("jwt");
  const { userLogin } = useSelector((state) => state.user);
  const { active_popup } = useSelector((state) => state.active);
  const { _id: id, isLeader } = userLogin || {};
  useEffect(() => {
    axios
      .get(BASE_URL + "/user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => dispatch(setUserLogin(res.data)))
      .catch((err) => console.log(err));
    axios
      .get(BASE_URL + "/category")
      .then((res) => dispatch(setCategories(res.data)))
      .catch((err) => console.log(err));
    if (id)
      axios
        .get(BASE_URL + "/project_category/" + id, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => dispatch(setMentorCategories(res.data)))
        .catch((err) => console.log(err.message));
    dispatch(setActivePopup(false));
  }, [dispatch, jwt]);

  return (
    <>
      <DefaultNavbar routes={routes} />
      {active_popup ? <UpdateProject /> : ""}
      <MKBox>
        <MKButton disabled={!isLeader} onClick={() => dispatch(setActivePopup(true))}>
          Cập nhật dự án
        </MKButton>
      </MKBox>
    </>
  );
};

export default GroupDetail;
