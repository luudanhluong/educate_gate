import Icon from "assets/theme/components/icon";
import AddListAccountBase from "layouts/admin/add-list-account";

const routesAdmin = [
  {
    name: "admins",
    icon: <Icon>view_day</Icon>,
    collapse: [
      {
        name: "creates",
        dropdown: true,
        description: "Xem tất cả",
        collapse: [
          {
            name: "Thêm danh sách người dùng",
            route: "/create-new-list-account",
            component: <AddListAccountBase />,
          },
        ],
      },
    ],
  },
];

export default routesAdmin;
