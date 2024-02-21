// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

// Images
import userImg from "assets/images/user.jpg";
import MKBadge from "components/MKBadge";
import MKAvatar from "components/MKAvatar";
import { useSelector } from "react-redux";
import getDate from "utilities/getDate";

export default function data() {
  const users = useSelector((state) => state.user.users);
  const User = ({ image, name, email }) => (
    <MKBox display="flex" alignItems="center" lineHeight={1}>
      <MKAvatar src={image} name={name} size="md" />
      <MKBox ml={1} lineHeight={1}>
        <MKTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MKTypography>
        <MKTypography variant="caption">{email}</MKTypography>
      </MKBox>
    </MKBox>
  );

  const Role = ({ title, description }) => (
    <MKBox lineHeight={1} textAlign="left">
      <MKTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MKTypography>
      <MKTypography variant="caption">{description}</MKTypography>
    </MKBox>
  );
  User.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  Role.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };
  const rows = users.data
    ? users.data.map((user) => ({
        user: <User image={userImg} name={user.username} email={user.email} />,
        gender: (
          <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
            {user.gender ? "Nam" : "Nữ"}
          </MKTypography>
        ),
        role: <Role title="Manager" description="Organization" />,
        status: (
          <MKBox ml={-1}>
            <MKBadge badgeContent="active" color="success" variant="gradient" size="sm" />
          </MKBox>
        ),
        onboard: (
          <MKTypography component="span" variant="caption" color="text" fontWeight="medium">
            {getDate(user.createdAt)}
          </MKTypography>
        ),
        action: (
          <MKTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MKTypography>
        ),
      }))
    : [];

  return {
    columns: [
      { Header: "người dùng", accessor: "user", width: "32%", align: "left" },
      { Header: "giới tính", accessor: "gender", align: "center" },
      { Header: "vai trò", accessor: "role", align: "left" },
      { Header: "trạng thái", accessor: "status", align: "center" },
      { Header: "onboard", accessor: "onboard", align: "center" },
      { Header: "hành động", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
