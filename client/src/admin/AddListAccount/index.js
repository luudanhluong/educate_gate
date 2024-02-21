/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import DefaultNavbar from "admin/Navbar/DefaultNavbar";
import Tables from "layouts/tables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setUsers } from "app/slices/userSlice";
import AddListAccount from "./addListAccount";
import { setActivePopupAddListUser } from "app/slices/activeSlice";
import { setFilterRole } from "app/slices/userSlice";

function ListAccount() {
  const dispatch = useDispatch();
  const activePopup = useSelector((state) => state.active.active_popup_add_list_user);
  const filterRole = useSelector((state) => state.user.filterRole);
  console.log(filterRole);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admins/users?item=createAt&order=desc&skip=0&limit=10&role=${filterRole}`)
      .then((res) => {
        dispatch(setUsers(res.data));
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, filterRole]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        e.target.closest("#add_list_user") === null &&
        e.target.closest("#btn_add_new_list_user") === null
      ) {
        dispatch(setActivePopupAddListUser(false));
      }
    };
    window.addEventListener("click", handleDocumentClick);
    dispatch(setFilterRole(0));
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, [dispatch]);

  return (
    <>
      <DefaultNavbar light={true} />
      {activePopup ? <AddListAccount /> : ""}
      <MKBox
        position="absolute"
        top={0}
        right={0}
        zIndex={1}
        width="calc(100% - 288px)"
        height="100%"
        overflow="auto"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <MKBox px={1} width="100%" height="100%" mx="auto" position="relative" zIndex={2}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            width={"100%"}
            m={0}
            height="100%"
            // overflow={"hidden"}
          >
            <Grid item xs={12} height="100%" p={0}>
              <Tables />
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </>
  );
}

export default ListAccount;
