import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import DefaultNavbar from "admin/Navbar/DefaultNavbar";
import Tables from "layouts/tables/class-list-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setclasses } from "app/slices/classSlice";
import AddClassList from "./addListClass";
import { setActivePopup } from "app/slices/activeSlice";
import { setSearchValue } from "app/slices/classSlice";
import { setSort } from "app/slices/classSlice";
import { setFilterPreName } from "app/slices/classSlice";

function ListClass() {
  const dispatch = useDispatch();
  const limitClass = 10;
  const { active_popup } = useSelector((state) => state.active);
  const { filterPreName, searchValue, sort, pageNo } = useSelector((state) => state.class);
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/admins/list-classes?item=createdAt&order=${sort}&skip=${
          pageNo * limitClass
        }&limit=${limitClass}&preName=${filterPreName}&search=${searchValue}`
      )
      .then((response) => {
        dispatch(setclasses(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, filterPreName, searchValue, sort, pageNo]);
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        e.target.closest("#add_list_classes") === null &&
        e.target.closest("#btn_add_new_list_classes") === null
      ) {
        dispatch(setActivePopup(false));
      }
    };
    window.addEventListener("click", handleDocumentClick);
    dispatch(setActivePopup(false));
    dispatch(setSearchValue(""));
    dispatch(setSort(-1));
    dispatch(setFilterPreName(""));
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, [dispatch]);
  return (
    <>
      <DefaultNavbar light={true} />
      {active_popup ? <AddClassList /> : ""}
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

export default ListClass;
