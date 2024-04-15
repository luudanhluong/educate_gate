// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import DataTable from "Tables/DataTable";
import usersTableData from "layouts/tables/user-list-table/data/usersTableData";
import { useSelector } from "react-redux";
import Pagination from "pagination";

function Tables() {
  const { total } = useSelector((state) => state.user.users);
  const { pageNo, limit } = useSelector((state) => state.utilities);
  let qttPage = total ? Math.ceil(total / limit) : 0;
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
              {qttPage > 1 && <Pagination pageNo={pageNo} qttPage={qttPage} />}
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default Tables;
