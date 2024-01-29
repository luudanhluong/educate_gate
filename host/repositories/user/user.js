import jwt from "jsonwebtoken";
import dotnv from "dotenv";
import bcrypt from "bcrypt";
import User from "../../models/userModel.js";

const createNewUser = async ({ username, email, password, role }) => {
  const formData = { username, email, password, role };
  const userObj = await User.find({ email: email }).exec();
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

const createListUsers = async (listData) => {
  const emailList = listData.map((user) => user.email);
  const teacherObj = await User.findOne({
    email: { $in: emailList },
  }).exec();
  try {
    if (!teacherObj) {
      const user = await User.insertMany(listData);
      return user._doc;
    }
  } catch (e) {
    throw new Error(e.message.toString());
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
        saveTokenToDatabase(
          user._id,
          token,
          new Date(Date.now() + 60 * 60 * 1000 * 2)
        );
        return { ...user._doc, token };
      } else return res.status(401).json({ error: "Mật khẩu không đúng." });
    }
    return res.status(404).json({ error: "Người dùng không tồn tại." });
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const saveTokenToDatabase = async (userId, role, token, expiresIn) => {
  try {
    // await UserToken.create({
    //   userId: userId,
    //   userType: role,
    //   token: token,
    //   expiresIn: expiresIn,
    // });
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
export default {
  createNewUser,
  loginUser,
  createListUsers,
};
