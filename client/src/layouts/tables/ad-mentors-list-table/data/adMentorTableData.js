// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

// Images
import userImg from "assets/images/user.jpg";
import MKAvatar from "components/MKAvatar";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@mui/material";
import { setSelectUser } from "app/slices/userSlice";
import { setSelectAll } from "app/slices/userSlice";

export default function data() {
  const { data } = useSelector((state) => state.user.mentor);
  const { selectUser, selectAll } = useSelector((state) => state.user);
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
  const Choice = ({ name, value }) => {
    return (
      <MKBox>
        <Checkbox
          sx={{ width: "100%" }}
          checked={selectUser?.some((s) => s._id === value._id)}
          name={name}
        />
      </MKBox>
    );
  };
  const AllChoices = () => {
    const dispatch = useDispatch();
    const handleAllChoices = () => {
      dispatch(setSelectUser(data.length === selectUser.length ? [] : data));
      dispatch(setSelectAll({ type: 3, payload: !selectAll.payload }));
    };
    return (
      <MKBox onClick={handleAllChoices}>
        <Checkbox checked={selectAll.payload} />
      </MKBox>
    );
  };
  const Category = ({ categories }) => (
    <MKBox lineHeight={1} textAlign="left">
      <MKTypography display="block" variant="caption" color="text">
        {categories ? categories.map((category) => category.name).join(", ") : ""}
      </MKTypography>
    </MKBox>
  );

  Choice.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
  };
  AllChoices.propTypes = {};
  User.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };
  Category.propTypes = {
    categories: PropTypes.array.isRequired,
  };
  const rows = data
    ? data.map((user) => ({
        choice: <Choice name="mentor_selected" value={user} />,
        user: <User image={userImg} name={user.username} email={user.email} />,
        gender: (
          <MKTypography component="div" variant="caption" color="text" fontWeight="medium">
            {user.gender ? "Nam" : "Nữ"}
          </MKTypography>
        ),
        category: <Category categories={user.categories} />,
      }))
    : [];

  return {
    columns: [
      {
        Header: <AllChoices />,
        accessor: "choice",
        width: "0px",
        align: "center",
      },
      { Header: "người dùng", accessor: "user", align: "left" },
      { Header: "giới tính", accessor: "gender", align: "center" },
      { Header: "lĩnh vực", accessor: "category", align: "left" },
    ],

    rows: rows,
  };
}
