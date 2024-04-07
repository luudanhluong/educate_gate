import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import moment from "moment";
import dotnv from "dotenv";
import User from "../../models/userModel.js";
import mongoose from "mongoose";
import user from "../../routes/user/userRouter.js";
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
    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classId",
        },
      },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "groupId",
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "groupId.projectId",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $lookup: {
          from: "matcheds",
          localField: "groupId.matchedId",
          foreignField: "_id",
          as: "matched",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "matched.mentorId",
          foreignField: "_id",
          as: "mentor",
        },
      },
    ]);
    return user[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserWithoutSmt = async (skip, role) => {
  try {
    const pipline = [
      { $match: { role: role, status: "InActive" } },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "teacherId",
          as: "classId",
        },
      },
      {
        $addFields: {
          ["classCount"]: { $size: "$classId" },
        },
      },
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
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $project: { classId: 0 } },
      { $match: { semesterdetail: [] } },
    ];
    const result = await User.aggregate(pipline).skip(skip).limit(10);
    const count = await User.aggregate(pipline);
    return { data: result, total: count.length };
  } catch (error) {
    throw new Error(error.message);
  }
};
// Thống kê người dùng theo năm
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
const getUserByRole = async (role, status) => {
  try {
    const pipline = [
      { $match: { role: role, status: status } },
      {
        $lookup: {
          from: "semesterdetails",
          localField: "_id",
          foreignField: "userId",
          as: "semesterdetail",
        },
      },
      { $match: { semesterdetail: [] } },
    ];
    return await User.aggregate(pipline);
  } catch (error) {
    throw new Error(error.message);
  }
};
const getClassesByUserId = async (userId) => {
  try {
    return await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
        status: "Active",
      },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classes",
        },
      },
      {
        $unwind: "$classes",
      },
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateUsers = async (listUser, status) => {
  try {
    await User.updateMany(
      { _id: { $in: listUser } },
      {
        $set: { status: status },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createNewUser,
  loginUser,
  userUpdateProfile,
  findUserById,
  getUserWithoutSmt,
  pmtUser,
  getUserByRole,
  getClassesByUserId,
  updateUsers,
};
