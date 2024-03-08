import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotnv from "dotenv";
import User from "../../models/userModel.js";
dotnv.config();

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
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordTeacher = await bcrypt.compare(password, user.password);
      if (isPasswordTeacher) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
          expiresIn: "12h",
        });
        return token;
      } else return res.status(401).json({ error: "Mật khẩu không đúng." });
    }
    return res.status(404).json({ error: "Người dùng không tồn tại." });
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const userUpdateProfile = async (
  id,
  { username, gender, Dob, phoneNumber, menteeCount, degree }
) => {
  try {
    await User.updateOne(
      { _id: id },
      {
        $set: {
          username,
          gender,
          Dob,
          phoneNumber,
          menteeCount,
          degree,
        },
      }
    );
    const token = jwt.sign({ _id: id }, process.env.SECRETKEY, {
      expiresIn: "12h",
    });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id }).populate("classId").exec();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getMentors = async (skip) => {
  try {
    const result = await User.aggregate([
      { $match: { role: 3 } },
      {
        $lookup: {
          from: "mentorcategories",
          localField: "_id",
          foreignField: "userId",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories.categoryId",
          foreignField: "_id",
          as: "categories",
        },
      },
    ])
      .limit(10)
      .skip(skip)
      .exec();
    const count = await User.countDocuments({ role: 3 });
    return { data: result, count };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getTeachers = async (skip) => {
  try {
    const result = await User.find({ role: 2 }).limit(10).skip(skip).exec();
    const count = await User.countDocuments({ role: 2 });
    return { data: result, count };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getStudents = async (skip) => {
  try {
    const result = await User.find({ role: 4 }).limit(10).skip(skip).exec();
    const count = await User.countDocuments({ role: 4 });
    return { data: result, count };
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  createNewUser,
  loginUser,
  userUpdateProfile,
  findUserById,
  getMentors,
  getStudents,
  getTeachers,
};
