import jwt from "jsonwebtoken";
import dotnv from "dotenv";
import bcrypt from "bcrypt";
import User from "../../models/userModel.js";
import UserType from "../../models/userTypeModel.js";

const createNewUser = async ({ username, email, password, role }) => {
  const formData = { username, email, password, role };
  const userObj = await User.findOne({ email: email }).exec();
  try {
    if (!userObj) {
      const teacher = await User.create(formData);
      return teacher._doc;
    } else {
      throw new Error("Email đã tồn tại trong hệ thống");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
const loginUser = async ({ email, password }) => {
  try {
    dotnv.config();
    const token = jwt.sign({ email, password }, process.env.SECRETKEY, {
      expiresIn: "2h",
    });
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordTeacher = await bcrypt.compare(password, user.password);
      if (isPasswordTeacher) {
        return { ...user._doc, token };
      } else return res.status(401).json({ error: "Mật khẩu không đúng." });
    }
    return res.status(404).json({ error: "Người dùng không tồn tại." });
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const getUsers = async ({ item, order, skip, limit }) => {
  try {
    const listUsers = await User.find({}, "-password")
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

export default {
  createNewUser,
  loginUser,
  getUsers,
};
