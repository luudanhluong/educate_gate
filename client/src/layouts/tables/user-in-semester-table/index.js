// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKBox from "components/MKBox";

import usersTableData from "layouts/tables/user-in-semester-table/data/tableData";
import DataTable from "Tables/DataTableUserInSemter";

function Tables() {
  const { columns, rows } = usersTableData();
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
