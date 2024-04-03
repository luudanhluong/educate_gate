// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

// Images
import userImg from "assets/images/user.jpg";
import MKAvatar from "components/MKAvatar";
import { useSelector } from "react-redux";

export default function data() {
  const { data } = useSelector((state) => state.user.teacher);
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

  const MenteeCount = ({ menteeCount }) => (
    <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
      {menteeCount}
    </MKTypography>
  );
  const ClassCount = ({ classCount }) => (
    <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
      {classCount}
    </MKTypography>
  );
  const Categories = ({ categories }) => (
    <MKBox lineHeight={1} textAlign="left">
      <MKTypography display="block" variant="caption" color="text">
        {categories?.map((category) => category.name)?.join(", ")}
      </MKTypography>
    </MKBox>
  );
  const Degree = ({ degree }) => (
    <MKBox lineHeight={1} textAlign="left">
      <MKTypography display="block" variant="caption" color="text">
        {degree}
      </MKTypography>
    </MKBox>
  );

  User.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };
  MenteeCount.propTypes = {
    menteeCount: PropTypes.number.isRequired,
  };
  ClassCount.propTypes = {
    classCount: PropTypes.number.isRequired,
  };
  Categories.propTypes = {
    categories: PropTypes.array.isRequired,
  };
  Degree.propTypes = {
    degree: PropTypes.string.isRequired,
  };

  const rows = data?.map((semester) => {
    let result = {
      user: <User image={userImg} name={semester?.user?.username} email={semester?.user?.email} />,
      rollNumber: (
        <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
          {semester?.user?.rollNumber}
        </MKTypography>
      ),
      gender: (
        <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
          {semester?.user?.gender ? "Nam" : "Nữ"}
        </MKTypography>
      ),
    };
    if (semester?.user?.role === 3) {
      result.push({
        menteeCount: <MenteeCount menteeCount={semester?.user?.menteeCount} />,
        degree: <Degree degree={semester?.user?.degree} />,
        categories: <Categories categories={semester?.user?.categories} />,
      });
    }
    if (semester?.user?.role === 2) {
      result.push({
        classCount: <ClassCount classCount={semester?.user?.classCount} />,
      });
    }
    return result;
  });
  let columns = [
    { Header: "người dùng", accessor: "user", align: "left" },
    { Header: "Mã SV", accessor: "rollNumber", align: "center" },
    { Header: "giới tính", accessor: "gender", align: "center" },
  ];
  return {
    columns: columns,
    rows: rows,
  };
}
