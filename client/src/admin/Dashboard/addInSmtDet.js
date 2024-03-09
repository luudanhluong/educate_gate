import {
  AppBar,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  Slide,
  Tab,
  Tabs,
} from "@mui/material";
import { setActive } from "app/slices/activeSlice";
import { setActivePopup } from "app/slices/activeSlice";
import MKBox from "components/MKBox";
import TablesTeacher from "layouts/tables/ad-teachers-list-table";
import TablesStudent from "layouts/tables/ad-students-list-table";
import TablesMentor from "layouts/tables/ad-mentors-list-table";
import { useDispatch, useSelector } from "react-redux";
import MKButton from "components/MKButton";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setSemester } from "app/slices/semesterSlice";
import { setSelectUser } from "app/slices/userSlice";
import { setPageNo } from "app/slices/userSlice";
import { setSelectAll } from "app/slices/userSlice";
import { setMentor } from "app/slices/userSlice";
import { setStudent } from "app/slices/userSlice";
import { setTeacher } from "app/slices/userSlice";

const AddInSmtDet = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.active);
  const { active_popup } = useSelector((state) => state.active);
  const { semester } = useSelector((state) => state.semester);
  const { data: semesters } = useSelector((state) => state.semester.semesters);
  const { selectUser, selectAll } = useSelector((state) => state.user);
  const isActivePopup = (actions) => dispatch(setActivePopup(actions));
  const smtId = semester?._id || (semesters && semesters[0]?._id);
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  };
  const handleTabType = (event, newValue) => {
    dispatch(setPageNo(0));
    dispatch(setActive(newValue));
    dispatch(setSelectUser([]));
    dispatch(
      setSelectAll({
        type: 0,
        payload: false,
      })
    );
  };
  const handleAddInSmtDet = () => {
    const formAddValue = selectUser.map((user) => user._id);
    axios
      .post(
        `${BASE_URL}/semester_detail/${smtId}/semester`,
        { formvalue: formAddValue, actions: selectAll },
        config
      )
      .then(() => {
        if (active === 2)
          axios
            .get(`${BASE_URL}/user/mentors?skip=0`, config)
            .then((res) => dispatch(setMentor(res.data)))
            .catch((err) => console.log(err));
        if (active === 0)
          axios
            .get(`${BASE_URL}/user/students?skip=0`, config)
            .then((res) => dispatch(setStudent(res.data)))
            .catch((err) => console.log(err));
        if (active === 1)
          axios
            .get(`${BASE_URL}/user/teachers?skip=0`, config)
            .then((res) => dispatch(setTeacher(res.data)))
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err.message));
    dispatch(
      setSelectAll({
        type: 0,
        payload: false,
      })
    );
  };

  return (
    <Modal
      open={active_popup.payload === "smtDet"}
      onClose={() => isActivePopup({ type: "close", payload: "" })}
      sx={{ display: "grid", placeItems: "center", overflow: "auto" }}
    >
      <Slide direction="down" in={active_popup.payload === "smtDet"} timeout={500}>
        <Card
          id={"add_list_in_semester"}
          className="pop-up"
          position="absolute"
          p={0}
          my="auto"
          sx={{ width: "60%", height: "90%", overflow: "auto" }}
        >
          <MKBox px={3} my={2}>
            <Grid item xs={12}>
              <AppBar position="static">
                <Tabs value={active} onChange={handleTabType}>
                  <Tab
                    icon={
                      <MKBox
                        component="i"
                        color="dark"
                        mr={1.25}
                        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                        className="fas fa-desktop"
                      />
                    }
                    label="Học sinh"
                  />
                  <Tab
                    icon={
                      <MKBox
                        component="i"
                        color="dark"
                        mr={1.25}
                        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                        className="fas fa-code"
                      />
                    }
                    label="Giáo viên"
                  />
                  <Tab
                    icon={
                      <MKBox
                        component="i"
                        color="dark"
                        mr={1.25}
                        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                        className="fas fa-code"
                      />
                    }
                    label="Người hướng dẫn"
                  />
                </Tabs>
              </AppBar>
            </Grid>
          </MKBox>
          <MKBox>
            <MKButton onClick={handleAddInSmtDet}>Lưu</MKButton>
          </MKBox>
          <MKBox mx={2} mb={1}>
            <FormControl fullWidth>
              <Select id="select-semster-add" name="semster-add" value={smtId}>
                {semesters &&
                  semesters.map((s) => (
                    <MenuItem key={s._id} onClick={() => dispatch(setSemester(s))} value={s._id}>
                      {s.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </MKBox>
          <MKBox>
            {active === 0 ? <TablesStudent /> : ""}
            {active === 1 ? <TablesTeacher /> : ""}
            {active === 2 ? <TablesMentor /> : ""}
          </MKBox>
        </Card>
      </Slide>
    </Modal>
  );
};

export default AddInSmtDet;
