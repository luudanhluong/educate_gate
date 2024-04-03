import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { setCategories, setCategory } from "app/slices/categorySlice";
import axios from "axios";
import MKBox from "components/MKBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopup } from "app/slices/activeSlice";
// import Semester from "./semester";
// import Category from "./category";
import { setSemesters, setSemester } from "app/slices/semesterSlice";
import { setMentor, setStudent, setTeacher, setSelectUser, setPmtUser } from "app/slices/userSlice";
import AddInSmtDet from "./addInSmtDet";
import ChartLineUser from "./chartLineUser";
import ChartPieUser from "./chartPieUser";
import MKButton from "components/MKButton";
import DefaultNavbar from "Navbars/DefaultNavbar";
import routes from "routes";
import Tables from "layouts/tables/user-in-semester-table";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isActivePopup = (actions) => dispatch(setActivePopup(actions));
  const { data: categories } = useSelector((state) => state.category.categories);
  const { active } = useSelector((state) => state.active);
  const { data: semesters } = useSelector((state) => state.semester.semesters);
  const { semester } = useSelector((state) => state.semester);
  const { category } = useSelector((state) => state.category);
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
    axios
      .get(`${BASE_URL}/admins/all_categories`, config)
      .then((res) => dispatch(setCategories(res.data)))
      .catch((err) => console.log(err));
    axios
      .get(`${BASE_URL}/admins/all_semesters`, config)
      .then((res) => dispatch(setSemesters(res.data)))
      .catch((err) => console.log(err));
    axios
      .get(`${BASE_URL}/user/parameter`, config)
      .then((res) => dispatch(setPmtUser(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admins/all_categories`, config)
      .then((res) => dispatch(setCategories(res.data)))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const smtId = semester?._id || semesters?.[0]?._id;
    if (smtId)
      axios
        .get(`${BASE_URL}/semester_detail/${smtId}/semester`, config)
        .then((res) => {
          let smtDet = [];
          const data = res.data;
          if (data.length === 0) {
            dispatch(setSelectUser([]));
            return;
          }
          if (active === 0)
            smtDet = listStudent.filter((u) => data.some((d) => d.userId === u._id));
          else if (active === 1)
            smtDet = listTeacher.filter((u) => data.some((d) => d.userId === u._id));
          else if (active === 2)
            smtDet = listMentor.filter((u) => data.some((d) => d.userId === u._id));
          dispatch(setSelectUser(smtDet));
        })
        .catch((err) => console.log(err.message));
  }, [dispatch, semester, semesters, active, listStudent, listTeacher, listMentor]);

  useEffect(() => {
    if (active === 2)
      axios
        .get(`${BASE_URL}/user/mentors?skip=${pageNo * 10}`, config)
        .then((res) => dispatch(setMentor(res.data)))
        .catch((err) => console.log(err));
    if (active === 0)
      axios
        .get(`${BASE_URL}/user/students?skip=${pageNo * 10}`, config)
        .then((res) => dispatch(setStudent(res.data)))
        .catch((err) => console.log(err));
    if (active === 1)
      axios
        .get(`${BASE_URL}/user/teachers?skip=${pageNo * 10}`, config)
        .then((res) => dispatch(setTeacher(res.data)))
        .catch((err) => console.log(err));
  }, [pageNo, dispatch, active]);
  return (
    <MKBox display="flex" flexDirection="column" sx={{ gap: "6rem" }}>
      <DefaultNavbar routes={routes} />
      <Grid item container>
        <Grid item xs={10} mx="auto">
          <MKBox sx={{ display: "flex", alignItems: "center", height: "100%", gap: "1.5rem" }}>
            {/* <Semester />
            <Category /> */}
            <AddInSmtDet />
            <MKBox display={"flex"} flexDirection="column" gap="3rem" height="100%" width="100%">
              <Grid item container>
                <Grid item xs={9}>
                  <ChartLineUser />
                </Grid>
                <Grid item xs={3}>
                  <ChartPieUser />
                </Grid>
              </Grid>
              <MKBox display="flex" flexDirection="row" gap="1.5rem">
                <MKBox minWidth="9rem">
                  <FormControl fullWidth pb={1}>
                    <Select
                      // id="select-gender"
                      className="select-item"
                      name="role"
                      value={semester?._id || semesters?.[0]?._id || " "}
                    >
                      <MenuItem value=" ">Chọn lĩnh vực</MenuItem>
                      {/* <MenuItem
                        value={" "}
                        sx={{ display: "flex", gap: "0.5rem" }}
                        onClick={() => {
                          isActivePopup({ type: "open", payload: "semester" });
                          dispatch(setSemester({}));
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
                      </MenuItem> */}
                      {semesters?.map((s) => (
                        <MenuItem
                          key={s._id}
                          onClick={() => {
                            // isActivePopup({ type: "update", payload: "semester" });
                            dispatch(setSemester(s));
                          }}
                          value={s._id}
                        >
                          {s.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MKBox>
                <MKBox onClick={() => isActivePopup({ type: "add", payload: "smtDet" })}>
                  <MKButton>Thêm vào kì học</MKButton>
                </MKBox>
                <MKBox minWidth="9rem">
                  <FormControl fullWidth>
                    <Select id="select-gender" name="gender" value={category?._id || " "}>
                      {/* <MenuItem
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
                      </MenuItem> */}
                      <MenuItem value=" ">Chọn lĩnh vực</MenuItem>
                      {categories?.map((c) => (
                        <MenuItem
                          onClick={() => {
                            // isActivePopup({ type: "update", payload: "category" });
                            dispatch(setCategory(c));
                          }}
                          key={c._id}
                          value={c._id}
                          sx={{ fontSize: "0.825rem" }}
                        >
                          {c.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MKBox>
              </MKBox>
              <Tables />
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
    </MKBox>
  );
};

export default Dashboard;
