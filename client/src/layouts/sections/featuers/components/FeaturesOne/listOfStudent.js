import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import userImg from "assets/images/user.jpg";
import MKBadge from "components/MKBadge";
import MKAvatar from "components/MKAvatar";
import { useEffect, useState } from "react";
import { BASE_URL } from "utilities/initialValue";
import getParams from "utilities/getParams";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { setClassStudent } from "app/slices/classOnerTeacherSlice";
import { useDispatch } from "react-redux";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function data() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const location = useLocation();
  const classId = getParams(3, location.pathname);
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/class/${classId}/students`, config)
      .then((res) => {
        setData(res.data);
      })
      .then((res) => dispatch(setClassStudent(res.data)))
      .catch((err) => {
        console.error("Failed to fetch students:", err);
      });
  }, [classId]);
  const User = ({ image, name, email }) => (
    <MKBox
      display="flex"
      alignItems="center"
      lineHeight={1}
      sx={{ userselect: "none", cursor: "pointer" }}
    >
      <MKAvatar src={image} name={name} size="md" />
      <MKBox ml={1} lineHeight={1}>
        <MKTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MKTypography>
        <MKTypography variant="caption">{email}</MKTypography>
      </MKBox>
    </MKBox>
  );

  User.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  const rows = data
    ? data.map((user) => ({
        user: <User image={userImg} name={user.username} email={user.email} />,
        gender: (
          <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
            {user.gender ? "Nam" : "Nữ"}
          </MKTypography>
        ),
        status: (
          <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
            {user.status}
          </MKTypography>
        ),
        rollNumber: (
          <MKBox ml={-1}>
            <MKBadge
              badgeContent={user.rollNumber || "0000000"}
              color="success"
              variant="gradient"
              size="sm"
            />
          </MKBox>
        ),
        isleader: (
          <MKTypography component="div" color="text" size="0.25rem">
            {user.isLeader ? <StarBorderIcon color="warning" sx={{ ml: "auto" }} /> : null}
          </MKTypography>
        ),
        group: (
          <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
            {user.groupName}
          </MKTypography>
        ),
      }))
    : [];

  return {
    columns: [
      { Header: "người dùng", accessor: "user", width: "32%", align: "left" },
      { Header: "giới tính", accessor: "gender", align: "center" },
      { Header: "mã sinh viên", accessor: "rollNumber", align: "center" },
      { Header: "nhóm trưởng", accessor: "isleader", align: "center" },
      { Header: "nhóm", accessor: "group", align: "center" },
    ],

    rows: rows,
  };
}
