// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

// Images
import userImg from "assets/images/user.jpg";
import MKBadge from "components/MKBadge";
import MKAvatar from "components/MKAvatar";
import { useDispatch, useSelector } from "react-redux";
import getDate from "utilities/getDate";
import { setDelUser } from "app/slices/userSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function data() {
  const { data } = useSelector((state) => state.user.users);
  console.log(data);
  const { userLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
  const Action = ({ user }) => {
    const handleDelete = () => {
      if (user.status === "InActive") dispatch(setDelUser(user));
    };
    return (
      <MKBox
        onClick={handleDelete}
        sx={{ cursor: "pointer", userselect: "none" }}
        color={`text`}
        fontWeight="medium"
        fontSize="0.725rem"
      >
        Xóa
      </MKBox>
    );
  };
  Action.propTypes = {
    user: PropTypes.object.isRequired,
  };
  User.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  const rows =
    data?.map((user) => {
      let result = {
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
      };
      if (userLogin?.role === 1)
        result = {
          ...result,
          action: <Action user={user} />,
          onboard: (
            <MKTypography component="span" variant="caption" color="text" fontWeight="medium">
              {getDate(user.createdAt)}
            </MKTypography>
          ),
        };
      else
        result = {
          ...result,
          isleader: (
            <MKTypography component="div" color="text" size="0.25rem">
              {user.isLeader && <StarBorderIcon color="warning" sx={{ ml: "auto" }} />}
            </MKTypography>
          ),
          group: (
            <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
              {user.groupName}
            </MKTypography>
          ),
        };
      return result;
    }) || [];
  let columns = [
    { Header: "người dùng", accessor: "user", width: "32%", align: "left" },
    { Header: "trạng thái", accessor: "status", align: "center" },
    { Header: "giới tính", accessor: "gender", align: "center" },
    { Header: "mã sinh viên", accessor: "rollNumber", align: "center" },
  ];
  if (userLogin?.role === 1)
    columns.push(
      { Header: "onboard", accessor: "onboard", align: "center" },
      { Header: "hành động", accessor: "action", align: "center" }
    );
  else
    columns.push(
      { Header: "nhóm trưởng", accessor: "isleader", align: "center" },
      { Header: "tên nhóm", accessor: "group", align: "center" }
    );
  return {
    columns: columns,
    rows: rows,
  };
}
