import mongoose from "mongoose";
import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";
const getGroupById = async (id) => {
  try {
    const group = await Group.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "groupId",
          as: "members",
        },
      },
      {
        $lookup: {
          from: "matcheds",
          localField: "_id",
          foreignField: "groupId",
          as: "matched",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "matched.mentorId",
          foreignField: "_id",
          as: "mentorDetails",
        },
      },
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $addFields: {
          userCount: { $size: "$members" },
        },
      },
    ]);
    return group;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getGroupMembers = async (groupId) => {
  try {
    const members = await User.find({ groupId: groupId }).exec();
    return members;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getGroupsByClassId = async (classId) => {
  try {
    const groups = await Group.aggregate([
      {
        $lookup: {
          from: "matcheds",
          localField: "_id",
          foreignField: "groupId",
          as: "matched",
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "groupId",
          as: "userCount",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "matched.mentorId",
          foreignField: "_id",
          as: "mentorDetails",
        },
      },
      { $match: { classId: new mongoose.Types.ObjectId(classId) } },
      {
        $addFields: {
          userCount: { $size: "$userCount" },
        },
      },
    ]);
    return groups;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getGroupById,
  getGroupMembers,
  getGroupsByClassId,
};
