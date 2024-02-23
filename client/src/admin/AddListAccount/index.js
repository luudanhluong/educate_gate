// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import DefaultNavbar from "admin/Navbar/DefaultNavbar";
import Tables from "layouts/tables/user-list-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setUsers } from "app/slices/userSlice";
import AddListAccount from "./addListAccount";
import { setFilterRole } from "app/slices/userSlice";
import { setSearchValue } from "app/slices/userSlice";
import { setSort } from "app/slices/userSlice";
import { setActivePopup } from "app/slices/activeSlice";

function ListAccount() {
  const dispatch = useDispatch();
  const limitUser = 10;
  const { active_popup } = useSelector((state) => state.active);
  const { filterRole, searchValue, sort, pageNo } = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/admins/users?item=createdAt&order=${sort}&skip=${
          pageNo * limitUser
        }&limit=${limitUser}&role=${filterRole}&search=${searchValue}`
      )
      .then((res) => dispatch(setUsers(res.data)))
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, filterRole, searchValue, sort, pageNo]);

  useEffect(() => {
    dispatch(setSearchValue(""));
    dispatch(setActivePopup(false));
    dispatch(setSort(-1));
    dispatch(setFilterRole(0));
  }, [dispatch]);

  return (
    <MKBox sx={{ display: "flex", alignItems: "center", height: "100%", gap: "1.5rem" }}>
      <DefaultNavbar light={true} />
      {active_popup ? <AddListAccount /> : ""}
      <MKBox width="100%" height="100%" overflow="auto">
        <MKBox px={1} width="100%" mx="auto" position="relative" zIndex={2}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            width={"100%"}
            m={0}
            height="100%"
          >
            <Grid item xs={12} width="100%" height="100%" p={0}>
              <Tables />
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

export default ListAccount;
