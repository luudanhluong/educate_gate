// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Author from "layouts/pages/landing-pages/author";
import SignIn from "layouts/pages/authentication/sign-in";
import ListAccountBase from "layouts/admin/add-list-account";
import AddListClassBase from "layouts/admin/add-list-class";
import TeacherFunction from "layouts/sections/featuers";
import DashboardAdmin from "layouts/admin/dashboard";
import { useDispatch, useSelector } from "react-redux";
import GroupDetail from "layouts/user/students";
import ViewAllGroup from "layouts/sections/featuers/components/FeaturesOne/viewAllGroup";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setAllGroup } from "app/slices/groupSlice";
import { setUserLogin } from "app/slices/userSlice";
import { setClassList } from "app/slices/classSlice";

function routes() {
  const dispatch = useDispatch();
  const { classList } = useSelector((state) => state.class);
  const { userLogin } = useSelector((state) => state.user);
  // const { allGroups } = useSelector((state) => state.group);

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
    if (userLogin?._id)
      axios
        .get(`${BASE_URL}/teacher/${userLogin?._id}`, config)
        .then((res) => dispatch(setAllGroup(res.data)))
        .then((err) => console.log(err));
  }, [userLogin, dispatch]);
  useEffect(() => {
    if (userLogin?._id)
      axios
        .get(`${BASE_URL}/class/${userLogin?._id}`, config)
        .then((res) => dispatch(setClassList(res.data)))
        .catch((err) => console.log(err));
  }, [dispatch, userLogin]);
  let result = [
    {
      name: "pages",
      icon: <Icon>dashboard</Icon>,
      columns: 1,
      rowsPerColumn: 2,
      collapse: [
        {
          name: "landing pages",
          collapse: [
            {
              name: "about us",
              route: "/pages/landing-pages/about-us",
              component: <AboutUs />,
            },
            {
              name: "contact us",
              route: "/pages/landing-pages/contact-us",
              component: <ContactUs />,
            },
            {
              name: "author",
              route: "/pages/landing-pages/author",
              component: <Author />,
            },
          ],
        },
        {
          name: "account",
          collapse: [
            {
              name: "sign in",
              route: "/pages/authentication/sign-in",
              component: <SignIn />,
            },
          ],
        },
      ],
    },
  ];
  if (userLogin?.role === 2 || userLogin?.role === 4) {
    result.push({
      name: "Lớp Học",
      dropdown: true,
      icon: <Icon>article</Icon>,
      columns: 1,
      rowsPerColumn: 2,
      collapse: [
        {
          name: "Lớp của bạn",
          collapse: classList.map((c) => ({
            name: c.preName + c.suffName,
            route: "/presentation/class/" + c._id,
            component: <TeacherFunction />,
          })),
        },
      ],
    });
  }

  if (userLogin?.groupId?.[0]?._id && userLogin?.role === 4) {
    result.push({
      name: "Nhóm",
      dropdown: false,
      route: `/group/${userLogin?.groupId?.[0]?._id}/members`,
      component: <GroupDetail />,
    });
  }

  if (userLogin?.role === 2) {
    result.push({
      name: "Chức năng",
      dropdown: true,
      icon: <Icon>article</Icon>,
      collapse: [
        { name: "Ghép Mentor", route: `/presentation/groups`, component: <ViewAllGroup /> },
      ],
    });
  }
  if (userLogin?.role === 1) {
    result.push({
      name: "admins",
      dropdown: true,
      icon: <Icon>article</Icon>,
      description: "Xem tất cả",
      collapse: [
        {
          name: "Thống Kê",
          route: "/admin/dashboard",
          component: <DashboardAdmin />,
        },
        {
          name: "Danh Sách Người Dùng",
          route: "/admin/create-new-list-account",
          component: <ListAccountBase />,
        },
        {
          name: "Danh Sách Lớp Học",
          route: "/admin/create-new-class",
          component: <AddListClassBase />,
        },
      ],
    });
  }
  return result;
}
export default routes;
