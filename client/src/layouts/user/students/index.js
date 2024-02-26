import DefaultNavbar from "Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import routes from "routes";
import { useDispatch, useSelector } from "react-redux";
import UpdateProject from "../leader/UpdateProject";
import { setActivePopup } from "app/slices/activeSlice";
import { setUserLogin } from "app/slices/userSlice";
import { setCategories } from "app/slices/categorySlice";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import GroupMember from "./GroupDetail";
import { setProject } from "app/slices/projectSlice";
import { setProjectCategories } from "app/slices/projectSlice";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const pid = "65dc4b9c953a7fb8412cf81f";
  const jwt = localStorage.getItem("jwt");
  const { userLogin } = useSelector((state) => state.user);
  const { active_popup } = useSelector((state) => state.active);
  const { _id: id, isLeader } = userLogin || {};
  const [showGroupMember, setShowGroupMember] = useState(false);

  useEffect(() => {
    axios
      .get(BASE_URL + "/project/" + pid, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => dispatch(setProject(res.data)))
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    if (id)
      axios
        .get(BASE_URL + "/project_category/" + id, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => dispatch(setProjectCategories(res.data)))
        .catch((err) => console.log(err.message));
  }, [dispatch, userLogin]);
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
    dispatch(setActivePopup(false));
  }, [dispatch, jwt]);
  const handleShowGroupMember = () => {
    setShowGroupMember(true); // Khi click vào nút, chuyển state thành true để hiển thị GroupMember
  };

  const handleCloseGroupMember = () => {
    setShowGroupMember(false); // Đóng GroupMember
  };
  return (
    <>
      <DefaultNavbar routes={routes} />
      {active_popup ? <UpdateProject /> : ""}
      <MKBox>
        <MKButton disabled={!isLeader} onClick={() => dispatch(setActivePopup(true))}>
          Cập nhật dự án
        </MKButton>
        <MKButton onClick={handleShowGroupMember}>Thành viên nhóm</MKButton>
        {showGroupMember && <GroupMember onClose={handleCloseGroupMember} />}
      </MKBox>
    </>
  );
};

export default GroupDetail;
