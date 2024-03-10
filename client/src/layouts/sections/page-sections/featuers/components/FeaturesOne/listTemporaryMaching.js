import { Card, Modal, Slide } from "@mui/material";
import { setActivePopup } from "app/slices/activeSlice";
import { setTemporaryMatching } from "app/slices/temporaryMatching";
import axios from "axios";
import MKBox from "components/MKBox";
import Tables from "layouts/tables/mentor-list-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "utilities/initialValue";

const TemporaryMatching = () => {
  const dispatch = useDispatch();
  const { active_popup } = useSelector((state) => state.active);
  const { group } = useSelector((state) => state.group);
  const isActivePopup = () => dispatch(setActivePopup(!active_popup));
  const { limit } = useSelector((state) => state.temporaryMatching.temporaryMatching);
  const { pageNo, searchValue } = useSelector((state) => state.temporaryMatching);
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    if (group?._id)
      axios
        .get(
          `${BASE_URL}/temporary_matching/${
            group._id
          }/group?search=${searchValue}&limit=${limit}&skip=${pageNo * limit}`,
          config
        )
        .then((res) => dispatch(setTemporaryMatching(res.data)))
        .catch((err) => console.log(err.message));
  }, [group, pageNo, searchValue, active_popup]);
  return (
    <Modal
      open={active_popup}
      onClose={() => isActivePopup()}
      sx={{ display: "grid", placeItems: "center", overflow: "auto" }}
    >
      <Slide direction="down" in={active_popup} timeout={500}>
        <Card
          id="list-temparary-matching"
          position="absolute"
          p={0}
          sx={{ width: "50%", height: "calc(100% - 48px)", overflow: "auto", outline: "none" }}
        >
          <MKBox>
            <Tables />
          </MKBox>
        </Card>
      </Slide>
    </Modal>
  );
};

export default TemporaryMatching;
