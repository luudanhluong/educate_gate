import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import moment from "moment";
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
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
      {
        $lookup: {
          from: "categories",
          localField: "categories.categoryId",
          foreignField: "_id",
          as: "categories",
        },
      },
    ])
      .skip(skip)
      .limit(10);
    const count = await User.aggregate([
      { $match: { role: 3 } },
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
    ]).count("countMentor");
    return { data: result, count: count[0]?.countMentor };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getTeachers = async (skip) => {
  try {
    const result = await User.aggregate([
      { $match: { role: 2 } },
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
    ])
      .skip(skip)
      .limit(10);
    const count = await User.aggregate([
      { $match: { role: 2 } },
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
    ]).count("countTeacher");
    return { data: result, count: count[0]?.countTeacher };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getStudents = async (skip) => {
  try {
    const result = await User.aggregate([
      { $match: { role: 4 } },
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
    ])
      .skip(skip)
      .limit(10);
    const count = await User.aggregate([
      { $match: { role: 4 } },
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
    ]).count("countStudent");
    return { data: result, count: count[0]?.countStudent };
  } catch (error) {
    throw new Error(error.message);
  }
};
const pmtUser = async () => {
  try {
    const oneYearAgo = moment().subtract(1, "year");
    const usersByMonth = [];

    for (let month = 0; month < 12; month++) {
      const startDate = moment(oneYearAgo)
        .add(month, "months")
        .startOf("month");
      const endDate = moment(startDate).endOf("month");

      const userCount = await User.countDocuments({
        createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
      });

      const monthLabel = startDate.format("MMMM");
      usersByMonth.push({ month: monthLabel, userCount });
    }
    const countStudent = await User.countDocuments({ role: 4 }).exec();
    const countTeacher = await User.countDocuments({ role: 2 }).exec();
    const countMentor = await User.countDocuments({ role: 3 }).exec();
    const countAdmin = await User.countDocuments({ role: 1 }).exec();
    return {
      usersByMonth: usersByMonth,
      student: countStudent,
      mentor: countMentor,
      admin: countAdmin,
      teacher: countTeacher,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserByRole = async (role) => {
  try {
    return await User.aggregate([
      { $match: { role: role } },
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
    ]);
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
  pmtUser,
  getUserByRole,
};
