// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Author from "layouts/pages/landing-pages/author";
import ListAccountBase from "layouts/admin/add-list-account";
import AddListClassBase from "layouts/admin/add-list-class";
import TeacherFunction from "layouts/sections/featuers";
import DashboardAdmin from "layouts/admin/dashboard";
import SemesterAdmin from "layouts/admin/semester";
import { useDispatch, useSelector } from "react-redux";
import GroupDetail from "layouts/user/students";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setUserLogin } from "app/slices/userSlice";
import { setAllGroup } from "app/slices/groupSlice";
import { setClassList } from "app/slices/classSlice";
import GroupsAdmin from "layouts/admin/list-groups";
import CategoriesAdmin from "layouts/admin/list-categories";
import ViewGroups from "ViewGroups";

function Routes() {
  const dispatch = useDispatch();
  const { classList } = useSelector((state) => state.class);
  const { userLogin } = useSelector((state) => state.user);
  const { allGroups } = useSelector((state) => state.group);
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    if (jwt)
      axios
        .get(BASE_URL + "/user/profile", config)
        .then((res) => dispatch(setUserLogin(res.data)))
        .catch((err) => console.log(err.message));
  }, [dispatch]);
  useEffect(() => {
    if (userLogin.role === 2 && jwt)
      axios
        .get(`${BASE_URL}/teacher/${userLogin?._id}/groups`, config)
        .then((res) => dispatch(setAllGroup(res.data)))
        .catch((err) => console.log(err));
    if (userLogin?._id && jwt) {
      axios
        .get(`${BASE_URL}/class/${userLogin?._id}/user`, config)
        .then((res) => dispatch(setClassList(res.data)))
        .catch((err) => console.log(err.message));
    }
  }, [userLogin, dispatch]);
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
              name: "Tài khoản",
              route: "/pages/landing-pages/author",
              component: <Author />,
            },
          ],
        },
      ],
    },
  ];
  if (classList?.length > 0 && userLogin?._id) {
    result.push({
      name: "Lớp Học",
      dropdown: true,
      icon: <Icon>article</Icon>,
      columns: 1,
      rowsPerColumn: 2,
      collapse: [
        {
          name: "Lớp của bạn",
          collapse: classList?.map((c) => ({
            name: c.className,
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
  if (allGroups?.length > 0 && userLogin?.role === 2) {
    result.push({
      name: "Nhóm",
      dropdown: false,
      route: `/presentation/groups`,
      component: <ViewGroups teacherId={userLogin?._id} />,
    });
  }
  if (userLogin?.role === 1) {
    result.push({
      name: "người quản lý",
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
          name: "Kỳ học",
          route: "/admin/semester",
          component: <SemesterAdmin />,
        },
        {
          name: "Danh Sách Người Dùng",
          route: "/admin/list-accounts",
          component: <ListAccountBase />,
        },
        {
          name: "Danh Sách Lớp Học",
          route: "/admin/list-classes",
          component: <AddListClassBase />,
        },
        {
          name: "Danh Sách Các Nhóm",
          route: "/admin/list-groups",
          component: <GroupsAdmin />,
        },
        {
          name: "Danh Sách Các Lĩnh Vực",
          route: "/admin/list-categories",
          component: <CategoriesAdmin />,
        },
      ],
    });
  }
  return result;
}
export default Routes;
