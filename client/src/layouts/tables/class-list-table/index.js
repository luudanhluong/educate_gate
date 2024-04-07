// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import DataTable from "Tables/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@mui/material";
import { setSearchValue, setFilterPreName } from "app/slices/classSlice";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setclasses } from "app/slices/classSlice";
import { setActivePopup } from "app/slices/activeSlice";
import classesTableData from "layouts/tables/class-list-table/data/classesTableData";

function Tables() {
  const dispatch = useDispatch();
  const { columns, rows } = classesTableData();
  const { listPreName, total } = useSelector((state) => state.class.classes);
  const { filterPreName, searchValue, sort } = useSelector((state) => state.class);
  const { limit, pageNo } = useSelector((state) => state.utilities);
  const skip = pageNo * limit;
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  };
  let qttPage = total ? Math.ceil(total / limit) : 0;
  console.log(qttPage);
  const getClassInfo = () =>
    axios
      .get(
        `${BASE_URL}/admins/list-classes?item=createdAt&order=${sort}&skip=${skip}&limit=${limit}&preName=${filterPreName}&search=${searchValue}`,
        config
      )
      .then((response) => dispatch(setclasses(response.data)))
      .catch((error) => console.log(error));
  const handleAddStudentInList = async () => {
    await axios
      .get(`${BASE_URL}/admins/add-student-in-class`, config)
      .then(() => getClassInfo())
      .catch((error) => console.log(error));
  };
  const handleDeleteClassEmpty = async () => {
    await axios
      .get(`${BASE_URL}/admins/delete-classes-empty`, config)
      .then(() => getClassInfo())
      .catch((error) => console.log(error));
  };
  const handleAddTeacherInClass = async () => {
    await axios
      .get(`${BASE_URL}/admins/add-teacher-in-class`, config)
      .then(() => getClassInfo())
      .catch((error) => console.log(error));
  };
  const onSearchChange = (value) => {
    dispatch(setSearchValue(value));
  };
  return (
    <MKBox width={"100%"} height={"100%"}>
      <Grid container spacing={6} width={"100%"} height={"100%"} m={0}>
        <Grid item xs={12} height={"100%"} p={0} sx={{ padding: "0 !important" }}>
          <Card
            id={"card-table-user"}
            sx={{
              boxShadow: "none",
              height: "100%",
              margin: "auto 0",
            }}
          >
            <MKBox
              display="flex"
              fontSize="0.825rem"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              sx={{ gap: "0.5rem" }}
            >
              <MKBox
                fontWeight="bold"
                py={1}
                width="9rem"
                px={2}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                  },
                  textAlign: "center",
                  "&:active": {
                    backgroundColor: "rgba(0,0,0,0.2)",
                  },
                  userSelect: "none",
                }}
                onClick={() => {
                  dispatch(setActivePopup(true));
                  dispatch(setFilterPreName(""));
                }}
              >
                Tạo lớp học
              </MKBox>
              <MKBox
                fontWeight="bold"
                className="pointer"
                id={"btn_add_new_list_user"}
                py={1}
                width="9rem"
                px={2}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                  },
                  textAlign: "center",
                  "&:active": {
                    backgroundColor: "rgba(0,0,0,0.2)",
                  },
                  userSelect: "none",
                }}
                onClick={handleAddStudentInList}
              >
                Thêm học sinh
              </MKBox>
              <MKBox
                fontWeight="bold"
                className="pointer"
                id={"btn_add_new_list_user"}
                py={1}
                width="9rem"
                px={2}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                  },
                  "&:active": {
                    backgroundColor: "rgba(0,0,0,0.2)",
                  },
                  textAlign: "center",
                  userSelect: "none",
                }}
                onClick={handleDeleteClassEmpty}
              >
                Xóa lớp trống
              </MKBox>
              <MKBox
                fontWeight="bold"
                className="pointer"
                id={"btn_add_new_list_user"}
                py={1}
                width="10rem"
                px={2}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                  },
                  "&:active": {
                    backgroundColor: "rgba(0,0,0,0.2)",
                  },
                  textAlign: "center",
                  userSelect: "none",
                }}
                onClick={handleAddTeacherInClass}
              >
                Thêm giáo viên
              </MKBox>
              <MKBox display="flex" alignItems="center">
                <Autocomplete
                  disableClearable
                  options={listPreName}
                  getOptionLabel={(option) => option}
                  onChange={(e, value) => dispatch(setFilterPreName(value))}
                  size="small"
                  sx={{ width: "8rem" }}
                  renderInput={(params) => <MKInput {...params} label="Học kỳ" />}
                />
              </MKBox>
              <MKBox width="16rem" ml="auto">
                <MKInput
                  placeholder="Tìm tên lớp..."
                  size="small"
                  fullWidth
                  onChange={({ currentTarget }) => {
                    onSearchChange(currentTarget.value);
                  }}
                />
              </MKBox>
            </MKBox>
            <MKBox height={"100%"}>
              <DataTable table={{ columns, rows }} />
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default Tables;
