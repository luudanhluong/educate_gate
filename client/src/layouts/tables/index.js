// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKBox from "components/MKBox";

// Material Dashboard 2 React example components
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "Tables/DataTable";

// Data
import usersTableData from "layouts/tables/data/usersTableData";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

function Tables() {
  const { userTypes } = useSelector((state) => state.user.users);
  const { columns, rows } = usersTableData();
  return (
    <MKBox width={"100%"} height={"100%"}>
      <Grid container spacing={6} width={"100%"} height={"100%"} m={0}>
        <Grid item xs={12} height={"100%"} p={0} sx={{ padding: "0 !important" }}>
          <Card
            id={"card-table-user"}
            sx={{
              height: "100%",
              margin: "auto 0",
            }}
          >
            <MKBox
              mx={4}
              mt={1}
              py={2}
              px={5}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MKBox variant="h6" fontSize={24} fontWeight="bold" color="white">
                User table
              </MKBox>
            </MKBox>
            <MKBox height={"100%"}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                userTypes={userTypes}
                showTotalEntries={false}
                noEndBorder
              />
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default Tables;
