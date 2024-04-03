import mongoose from "mongoose";
import SemesterDetail from "../../models/SemesterDetail.js";
import User from "../../models/userModel.js";

const getSmtDetailsBySmtId = async (smtId) => {
  try {
    return await SemesterDetail.find({ semesterId: smtId }).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

const addSmtDetails = async (listSmtDet) => {
  try {
    return await SemesterDetail.insertMany(listSmtDet);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserInSemester = async (smtId, role) => {
  try {
    const result = await SemesterDetail.aggregate([
      { $match: { semesterId: new mongoose.Types.ObjectId(smtId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "teacherId",
          as: "classes",
        },
      },
      {
        $addFields: {
          user: "$userId",
        },
      },
      {
        $addFields: {
          ["user.classCount"]: { $size: "$classes" },
        },
      },
      { $project: { userId: 0, classes: 0 } },
      { $unwind: "$user" },
      { $match: { "user.role": role } },
      {
        $lookup: {
          from: "mentorcategories",
          localField: "user._id",
          foreignField: "userId",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories.categoryId",
          foreignField: "_id",
          as: "user.categories",
        },
      },
      { $project: { userId: 0, categories: 0 } },
    ]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  getSmtDetailsBySmtId,
  addSmtDetails,
  getUserInSemester,
};
