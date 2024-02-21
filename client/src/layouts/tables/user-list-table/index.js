// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKBox from "components/MKBox";

// Material Dashboard 2 React example components
import DataTableUserList from "Tables/DataTableUserList";

// Data
import usersTableData from "layouts/tables/user-list-table/data/usersTableData";
import { useSelector } from "react-redux";

function Tables() {
  const { userTypes, total, quantityUsers } = useSelector((state) => state.user.users);
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
            </MKBox>
            <MKBox height={"100%"}>
              <DataTableUserList table={{ columns, rows }} userTypes={userTypes} total={total} />
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default Tables;
