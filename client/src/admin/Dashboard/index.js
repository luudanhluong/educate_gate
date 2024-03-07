import { FormControl, Icon, MenuItem, Select, Typography } from "@mui/material";
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
                <MenuItem
                  value={" "}
                  sx={{ display: "flex", gap: "0.5rem" }}
                  onClick={() => {
                    isActivePopup({ type: "open", payload: "category" });
                    dispatch(setCategory({}));
                  }}
                >
                  <MKBox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography component={"span"} fontSize={"0.825rem"}>
                      Thêm kỳ học
                    </Typography>
                    <MKBox
                      sx={{
                        lineHeight: 1,
                        color: "#4558ff",
                        fontSize: "20px",
                      }}
                    >
                      <Icon>add</Icon>
                    </MKBox>
                  </MKBox>
                </MenuItem>
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
              </Select>
            </FormControl>
          </MKBox>
          <MKBox width="9rem">
            <FormControl fullWidth>
              <Select id="select-gender" name="gender" value={" "}>
                <MenuItem
                  value={" "}
                  sx={{ display: "flex", gap: "0.5rem" }}
                  onClick={() => {
                    isActivePopup({ type: "open", payload: "category" });
                    dispatch(setCategory({}));
                  }}
                >
                  <MKBox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography component={"span"} fontSize={"0.825rem"}>
                      Thêm Thể loại
                    </Typography>
                    <MKBox
                      sx={{
                        lineHeight: 1,
                        color: "#4558ff",
                        fontSize: "20px",
                      }}
                    >
                      <Icon>add</Icon>
                    </MKBox>
                  </MKBox>
                </MenuItem>
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
              </Select>
            </FormControl>
          </MKBox>
        </MKBox>
      </MKBox>
    </MKBox>
  );
};

export default Dashboard;
