import { Typography, Box, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import "./studentList.css";
import MKButton from "components/MKButton";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setAllGroup } from "app/slices/groupSlice";
import { setUserLogin } from "app/slices/userSlice";
import { setActivePopup } from "app/slices/activeSlice";
import { setGroup } from "app/slices/groupSlice";
import { setDefaultMentor } from "app/slices/userSlice";

const ViewAllGroup = () => {
  const dispatch = useDispatch();
  const { allGroups } = useSelector((state) => state.group);
  const { userLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { active_popup } = useSelector((state) => state.active);
  const isActivePopup = () => dispatch(setActivePopup(!active_popup));
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/user/profile", config)
      .then((res) => dispatch(setUserLogin(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/teacher/${userLogin?._id}/suggest`, config)
      .then(() => getAllGroups())
      .then((err) => console.log(err));
  }, [dispatch, active_popup, userLogin]);
  const getAllGroups = () =>
    axios
      .get(`${BASE_URL}/teacher/${userLogin?._id}`, config)
      .then((res) => dispatch(setAllGroup(res.data)))
      .then((err) => console.log(err));
  useEffect(() => {
    if (userLogin?._id)
      axios
        .get(`${BASE_URL}/teacher/${userLogin?._id}`, config)
        .then((res) => dispatch(setAllGroup(res.data)))
        .then((err) => console.log(err.message));
  }, [dispatch, userLogin]);
  const handleGroupDetailClick = (groupId) => {
    navigate(`/group/${groupId}/members`);
  };
  const handleClickSuggest = () => {
    axios
      .get(`${BASE_URL}/teacher/${userLogin?._id}/suggest`, config)
      .then(() => getAllGroups())
      .then((err) => console.log(err));
  };
  const handleClickSaveAll = () => {
    axios
      .get(`${BASE_URL}/matched/${userLogin?._id}/teacher`, config)
      .then(() => getAllGroups())
      .then((err) => console.log(err));
  };
  const handleSaveMatched = (gid, uid) => {
    axios
      .post(`${BASE_URL}/matched/`, { groupId: gid, userId: uid }, config)
      .then(() => getAllGroups())
      .then((err) => console.log(err));
  };
  const handleClickViewTemporaryMatching = (group, mid) => {
    axios
      .post(`${BASE_URL}/temporary_matching/${group?._id}/group`)
      .then(() => {
        isActivePopup();
      })
      .catch((err) => console.log(err));
    dispatch(setGroup(group));
    dispatch(setDefaultMentor(mid));
  };
  const Mentor = ({ image, username, email, mentorcategories, label }) => {
    return (
      <Box
        sx={{
          p: 1.3,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mt: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            width: "100%",
          }}
        >
          <Avatar src={image} alt={username} sx={{ height: "30px", width: "30px", mr: 1 }} />
          <MKBox sx={{ width: "calc(100% - 54px)" }}>
            <Typography
              fontFamily={"Roboto, Helvetica, Arial,sans-serif"}
              fontWeight={"400"}
              fontSize={"0.825rem"}
              className="truncate"
              color="textSecondary"
              noWrap
            >
              <Typography as={"span"} fontSize={"0.825rem"} fontWeight={"500"}>
                Tên:{" "}
              </Typography>{" "}
              {username}{" "}
              <Typography as={"span"} fontSize={"0.825rem"} sx={{ color: "#000" }}>
                <em>{label ? `(${label})` : ""}</em>
              </Typography>
            </Typography>
            <Typography
              fontFamily={"Roboto, Helvetica, Arial,sans-serif"}
              fontWeight={"400"}
              fontSize={"0.825rem"}
              className="truncate"
              color="textSecondary"
              noWrap
            >
              <Typography as={"span"} fontSize={"0.825rem"} fontWeight={"500"}>
                Email:{" "}
              </Typography>{" "}
              {email}
            </Typography>
            <Typography
              fontFamily={"Roboto, Helvetica, Arial,sans-serif"}
              fontWeight={"400"}
              fontSize={"0.825rem"}
              color="textSecondary"
            >
              <Typography as={"span"} fontSize={"0.825rem"} fontWeight={"500"}>
                Lĩnh vực:{" "}
              </Typography>{" "}
              {mentorcategories?.map((p) => p.name).join(", ")}
            </Typography>
          </MKBox>
        </Box>
      </Box>
    );
  };
  Mentor.propTypes = {
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mentorcategories: PropTypes.array.isRequired,
    label: PropTypes.string,
  };
  return (
    <>
      <MKBox px={"14px"} my={1} display="flex" justifyContent="end" gap="1.5rem">
        <MKButton onClick={handleClickSuggest}>Gợi ý</MKButton>
        <MKButton onClick={handleClickSaveAll}>Lưu tất cả</MKButton>
      </MKBox>
      <Box
        sx={{
          marginLeft: "16px",
          marginBottom: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        {allGroups.map((g, i) => (
          <Box
            key={g._id + i}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: `calc(100%/3 - 18px)`,
              minHeight: 186,
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              marginBottom: "8px",
              position: "relative",
            }}
          >
            <Box
              className="gradient-animated"
              sx={{
                color: "#fff",
                p: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <MKBox display={"flex"} justifyContent="space-between">
                <Typography
                  flex={1}
                  sx={{ color: "#fff" }}
                  variant="subtitle1"
                  fontWeight="bold"
                  fontSize={"0.925rem"}
                  className="truncate"
                >
                  Nhóm: {g.group?.name}
                </Typography>
                <MKButton
                  disabled={g.matched?.length > 0}
                  onClick={() => handleSaveMatched(g.group?._id, g.matching[0]?._id)}
                  className="gradient-animated"
                  sx={{ minHeight: "0", padding: "0" }}
                >
                  Lưu
                </MKButton>
              </MKBox>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Dự án: {g.project?.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Lĩnh vực: {g.projectcategories?.map((p) => p.name).join(", ")}
              </Typography>
            </Box>
            {g.matching.length > 0 ? (
              <>
                <Mentor
                  username={g.matching[0]?.username}
                  image={g.matching[0]?.image || ""}
                  email={g.matching[0]?.email}
                  mentorcategories={g.matchingMentorcategories}
                  label="Mặc định"
                />
                <Typography
                  fontWeight={"400"}
                  fontSize={"0.725rem"}
                  color="textSecondary"
                  textAlign={"end"}
                  mx="14px"
                  sx={{ cursor: "pointer" }}
                  px="6px"
                  py="2px"
                  my="2px"
                  onClick={() => handleClickViewTemporaryMatching(g.group, g.matching[0]?._id)}
                >
                  <em>Xem</em>
                </Typography>
              </>
            ) : (
              <Typography
                as={"span"}
                fontSize={"0.725rem"}
                display={"flex"}
                textAlign={"center"}
                alignItems={"center"}
                sx={{ color: "#000" }}
              >
                {g.matched.length === 0 && <em>Chưa tìm thấy nhóm phù hợp</em>}
              </Typography>
            )}
            {g.matched.length > 0 && (
              <Mentor
                username={g.matched[0]?.username}
                image={g.matched[0]?.image || ""}
                email={g.matched[0]?.email}
                mentorcategories={g.matchedMentorcategories}
              />
            )}
            <Box
              px={2}
              py={1}
              sx={{
                bgcolor: "#F4F4F4",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={"0.825rem"} variant="body2">
                {g.userCount} Thành viên
              </Typography>
              <Typography
                variant="body2"
                fontSize={"0.725rem"}
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => handleGroupDetailClick(g.group._id)}
              >
                <em>Chi tiết nhóm</em>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ViewAllGroup;
