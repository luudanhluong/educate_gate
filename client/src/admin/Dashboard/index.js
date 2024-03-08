import { FormControl, Icon, MenuItem, Select, Typography } from "@mui/material";
import DefaultNavbar from "admin/Navbar/DefaultNavbar";
import { setCategories, setCategory } from "app/slices/categorySlice";
import axios from "axios";
import MKBox from "components/MKBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopup } from "app/slices/activeSlice";
import Semester from "./semester";
import Category from "./category";
import { useNavigate } from "react-router-dom";
import { setSemesters, setSemester } from "app/slices/semesterSlice";
import { setMentor, setStudent, setTeacher } from "app/slices/userSlice";
import AddInSmtDet from "./addInSmtDet";
import { setSelectUser } from "app/slices/userSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isActivePopup = (actions) => dispatch(setActivePopup(actions));
  const { data: categories } = useSelector((state) => state.category.categories);
  const { active } = useSelector((state) => state.active);
  const { data: semesters } = useSelector((state) => state.semester.semesters);
  const { semester } = useSelector((state) => state.semester);
  const { pageNo } = useSelector((state) => state.user);
  const { data: listStudent } = useSelector((state) => state.user.student);
  const { data: listTeacher } = useSelector((state) => state.user.teacher);
  const { data: listMentor } = useSelector((state) => state.user.mentor);
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    const smtId = semester?._id || (semesters && semesters[0]?._id);
    axios
      .get(`${BASE_URL}/semester_detail/${smtId}/semester`, config)
      .then((res) => {
        let smtDet = [];
        const data = res.data;
        if (active === 0) smtDet = listStudent.filter((u) => data.some((d) => d.userId === u._id));
        if (active === 1) smtDet = listTeacher.filter((u) => data.some((d) => d.userId === u._id));
        if (active === 2) smtDet = listMentor.filter((u) => data.some((d) => d.userId === u._id));
        dispatch(setSelectUser(smtDet));
      })
      .catch((err) => console.log(err.message));
  }, [dispatch, semester, semesters, active, listStudent, listTeacher, listMentor]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admins/all_categories`, config)
      .then((res) => dispatch(setCategories(res.data)))
      .catch(() => navigate("/pages/authentication/sign-in"));
    axios
      .get(`${BASE_URL}/admins/all_semesters`, config)
      .then((res) => dispatch(setSemesters(res.data)))
      .catch(() => navigate("/pages/authentication/sign-in"));
  }, [dispatch]);
  useEffect(() => {
    if (active === 2)
      axios
        .get(`${BASE_URL}/user/mentors?skip=${pageNo * 10}`, config)
        .then((res) => dispatch(setMentor(res.data)))
        .catch(() => navigate("/pages/authentication/sign-in"));
    if (active === 0)
      axios
        .get(`${BASE_URL}/user/students?skip=${pageNo * 10}`, config)
        .then((res) => dispatch(setStudent(res.data)))
        .catch(() => navigate("/pages/authentication/sign-in"));
    if (active === 1)
      axios
        .get(`${BASE_URL}/user/teachers?skip=${pageNo * 10}`, config)
        .then((res) => dispatch(setTeacher(res.data)))
        .catch(() => navigate("/pages/authentication/sign-in"));
  }, [pageNo, dispatch, active]);
  return (
    <MKBox sx={{ display: "flex", alignItems: "center", height: "100%", gap: "1.5rem" }}>
      <DefaultNavbar light />
      <Semester />
      <Category />
      <AddInSmtDet />
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
          <MKBox onClick={() => dispatch(setActivePopup(true))}>Thêm vào kì học</MKBox>
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
