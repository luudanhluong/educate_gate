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
  const { data } = useSelector((state) => state.class.classes);
  console.log(data);
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
  const rows = data
    ? data.map((c) => ({
        name: (
          <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
            {`${c.preName}${c.code}${c.suffName ? "-" + c.suffName : ""}`}
          </MKTypography>
        ),
        qttStudent: (
          <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
            {30}
          </MKTypography>
        ),
        curQttStudent: (
          <MKTypography component="span" variant="caption" color="text" fontWeight="medium">
            {c.userCount}
          </MKTypography>
        ),
        teacher:
          c.teacher.length > 0 ? (
            c.teacher.map((t) => (
              <User key={t._id} image={userImg} name={t.username} email={t.email} />
            ))
          ) : (
            <MKTypography component="span" variant="caption" color="text" fontWeight="medium">
              Đang chờ
            </MKTypography>
          ),
        status: (
          <MKBox ml={-1}>
            <MKBadge badgeContent="active" color="success" variant="gradient" size="sm" />
          </MKBox>
        ),
        onboard: (
          <MKTypography component="span" variant="caption" color="text" fontWeight="medium">
            {getDate(c.createdAt)}
          </MKTypography>
        ),
        semester: (
          <MKTypography component="span" variant="caption" color="text" fontWeight="medium">
            {"Fall 2023"}
          </MKTypography>
        ),
        action: (
          <MKBox display="flex" gap="0.5rem">
            <MKTypography
              component="span"
              variant="caption"
              color="text"
              fontWeight="medium"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#000000",
                },
              }}
            >
              Edit
            </MKTypography>{" "}
            {c.userCount === 0 ? (
              <MKTypography
                component="span"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#000000",
                  },
                }}
              >
                Delete
              </MKTypography>
            ) : (
              ""
            )}
          </MKBox>
        ),
      }))
    : [];

  return {
    columns: [
      { Header: "Tên lớp", accessor: "name", align: "center" },
      {
        Header: "giới hạn sinh viên",
        accessor: "qttStudent",
        width: "12%",
        align: "center",
      },
      {
        Header: "sinh viên trong lớp",
        accessor: "curQttStudent",
        width: "12%",
        align: "center",
      },
      { Header: "giáo viên", accessor: "teacher", width: "20%", align: "left" },
      { Header: "trạng thái", accessor: "status", align: "center" },
      { Header: "onboard", accessor: "onboard", align: "center" },
      { Header: "kì học", accessor: "semester", align: "center" },
      { Header: "hành động", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
