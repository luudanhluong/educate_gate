import { FormControl, Icon, MenuItem, Select } from "@mui/material";
import DefaultNavbar from "admin/Navbar/DefaultNavbar";
import { setCategories } from "app/slices/categorySlice";
import axios from "axios";
import MKBox from "components/MKBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopup } from "app/slices/activeSlice";
import Semester from "./semester";
import Category from "./category";
import { useNavigate } from "react-router-dom";
import { setCategory } from "app/slices/categorySlice";
import { setSemesters } from "app/slices/semesterSlice";
import { setSemester } from "app/slices/semesterSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isActivePopup = (actions) => dispatch(setActivePopup(actions));
  const { data: categories } = useSelector((state) => state.category.categories);
  const { data: semesters } = useSelector((state) => state.semester.semesters);

  const jwt = localStorage.getItem("jwt");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admins/all_categories`, headers)
      .then((res) => dispatch(setCategories(res.data)))
      .catch(() => navigate("/pages/authentication/sign-in"));
    axios
      .get(`${BASE_URL}/admins/all_semesters`, headers)
      .then((res) => dispatch(setSemesters(res.data)))
      .catch(() => navigate("/pages/authentication/sign-in"));
  }, []);
  return (
    <MKBox sx={{ display: "flex", alignItems: "center", height: "100%", gap: "1.5rem" }}>
      <DefaultNavbar light />
      <Semester />
      <Category />
      <MKBox height="100%" width="100%">
        <MKBox display="flex">
          <MKBox width="9rem">
            <FormControl fullWidth pb={1}>
              <Select id="select-gender" name="gender" value={" "}>
                <MenuItem value={" "}>Thêm kỳ học</MenuItem>
                {semesters
                  ? semesters.map((s) => (
                      <MenuItem
                        key={s._id}
                        onClick={() => {
                          isActivePopup({ type: "update", payload: "semester" });
                          dispatch(setSemester(s));
                        }}
                        value={s._id}
                      >
                        {s.name}
                      </MenuItem>
                    ))
                  : ""}
                <MenuItem
                  onClick={() => {
                    isActivePopup({ type: "open", payload: "semester" });
                    dispatch(setSemester({}));
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#4558ff",
                    fontSize: "20px",
                  }}
                >
                  <Icon>add</Icon>
                </MenuItem>
              </Select>
            </FormControl>
          </MKBox>
          <MKBox width="9rem">
            <FormControl fullWidth>
              <Select id="select-gender" name="gender" value={" "}>
                <MenuItem value={" "}>Thêm thể loại</MenuItem>
                {categories
                  ? categories.map((c) => (
                      <MenuItem
                        onClick={() => {
                          isActivePopup({ type: "update", payload: "category" });
                          dispatch(setCategory(c));
                        }}
                        key={c._id}
                        value={c._id}
                        sx={{ fontSize: "0.825rem" }}
                      >
                        {c.name}
                      </MenuItem>
                    ))
                  : ""}
                <MenuItem
                  onClick={() => {
                    isActivePopup({ type: "open", payload: "category" });
                    dispatch(setCategory({}));
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#4558ff",
                    fontSize: "20px",
                  }}
                >
                  <Icon>add</Icon>
                </MenuItem>
              </Select>
            </FormControl>
          </MKBox>
        </MKBox>
      </MKBox>
    </MKBox>
  );
};

export default Dashboard;
