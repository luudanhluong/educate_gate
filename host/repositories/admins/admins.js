import User from "../../models/userModel.js";
import UserType from "../../models/userTypeModel.js";

const getUsers = async ({ item, order, skip, limit, role }) => {
  try {
    let query = {};
    if (Number(role) !== 0) {
      query = { role: role };
    }
    const listUsers = await User.find(query, "-password")
      .sort({ [item]: order })
      .skip(skip)
      .limit(limit)
      .exec();
    const userRole = await User.distinct("role").exec();
    const userTypes = await UserType.find({
      role: { $in: userRole },
    }).exec();
    const total = await User.countDocuments({}).exec();
    return { data: listUsers, total, skip, limit, userTypes };
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const createListUsers = async (listData) => {
  const emailList = listData.map((user) => user.email);
  const userList = await User.find({
    email: { $in: emailList },
  })
    .select("email username")
    .exec();
  try {
    if (userList.length === 0) {
      const user = await User.insertMany(listData);
      return user._doc;
    }
    return {
      data: userList,
      message: "Email đã tồn tại trong hệ thống",
    };
  } catch (e) {
    throw new Error(e.message.toString());
  }
};

export default {
  getUsers,
  createListUsers,
};
