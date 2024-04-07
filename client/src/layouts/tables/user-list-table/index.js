// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKBox from "components/MKBox";

// Material Dashboard 2 React example components
import DataTable from "Tables/DataTable";

// Data
import usersTableData from "layouts/tables/user-list-table/data/usersTableData";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "pagination";
import { setSearchValue } from "app/slices/userSlice";
import { setActivePopup } from "app/slices/activeSlice";
import { setFilterRole } from "app/slices/userSlice";
import { setPageNo } from "app/slices/utilitiesSlice";
import { Autocomplete } from "@mui/material";
import MKInput from "components/MKInput";

function Tables() {
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.user.users);
  const { pageNo, limit } = useSelector((state) => state.utilities);
  const userType = [
    { name: "Học sinh", role: 4 },
    { name: "Người hướng dẫn", role: 3 },
    { name: "Giáo viên", role: 2 },
    { name: "Quản trị viên", role: 1 },
  ];
  let qttPage = total ? Math.ceil(total / limit) : 0;
  const { columns, rows } = usersTableData();

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
            {/* <MKBox
              mx={4}
              mt={1}
              py={2}
              px={5}
              display="flex"
              flexDirection="row"
              gap={"1.5rem"}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
            >
              {quantityUsers
                ? quantityUsers.map((quantity, index) => (
                    <MKBox
                      key={quantity.name}
                      display="flex"
                      cursor="default"
                      gap={"0.5rem"}
                      sx={{
                        backgroundColor: `rgba(${(index + 1) * 58}, 201, 58, 1)`,
                        padding: "10px 12px",
                        borderBottomLeftRadius: "26px",
                        borderTopLeftRadius: "26px",
                        borderTopRightRadius: "26px",
                        userSelect: "none",
                      }}
                    >
                      <MKBox variant="h6" fontSize={24} fontWeight="bold" color="white">
                        {quantity.qtt}
                      </MKBox>
                      <MKBox variant="h6" fontSize={12} fontWeight="bold" color="white">
                        {quantity.name}
                      </MKBox>
                    </MKBox>
                  ))
                : ""}
              <MKBox
                display="flex"
                gap={"0.5rem"}
                cursor="default"
                sx={{
                  backgroundColor: `rgba(${118}, 21, 58, 1)`,
                  padding: "10px 12px",
                  borderBottomLeftRadius: "26px",
                  borderTopLeftRadius: "26px",
                  borderTopRightRadius: "26px",
                  userSelect: "none",
                }}
              >
                <MKBox variant="h6" fontSize={24} fontWeight="bold" color="white">
                  {total}
                </MKBox>
                <MKBox variant="h6" fontSize={12} fontWeight="bold" color="white">
                  Tổng
                </MKBox>
              </MKBox>
            </MKBox> */}
            <MKBox height={"100%"}>
              <MKBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                sx={{ gap: "0.5rem" }}
              >
                <MKBox
                  fontWeight="bold"
                  className="pointer"
                  id={"btn_add_new_list_user"}
                  py={1}
                  px={2}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: "6px",
                    },
                    "&:active": {
                      backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    userSelect: "none",
                  }}
                  onClick={() => dispatch(setActivePopup(true))}
                >
                  Tạo người dùng
                </MKBox>
                <MKBox display="flex" alignItems="center">
                  <Autocomplete
                    disableClearable
                    options={userType}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                      dispatch(setFilterRole(value.role));
                      dispatch(setPageNo(0));
                    }}
                    size="small"
                    isOptionEqualToValue={(option, value) => option.role === value.role}
                    sx={{ width: "12rem" }}
                    renderInput={(params) => <MKInput {...params} label="Lọc theo vai trò" />}
                  />
                </MKBox>
                <MKBox width="16rem" ml="auto">
                  <MKInput
                    placeholder="Search email..."
                    size="small"
                    fullWidth
                    onChange={({ currentTarget }) => {
                      onSearchChange(currentTarget.value);
                    }}
                  />
                </MKBox>
              </MKBox>
              <DataTable table={{ columns, rows }} />
              {qttPage > 1 && <Pagination pageNo={pageNo} qttPage={qttPage} />}
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default Tables;
