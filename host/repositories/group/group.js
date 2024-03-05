import mongoose from "mongoose";
import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";
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
const getMatchedByGroupId = async (groupId) => {
  return await Matched.findOne({ groupId }).populate("mentorId").exec();
};

const createEmptyProject = async () => {
  try {
    const project = new Project({
      name: "",
      description: "",
    });
    await project.save();
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createGroup = async (groupData) => {
  try {
    const group = new Group(groupData);
    await group.save();
    return group;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addUserToGroup = async (userId, groupId) => {
  try {
    const user = await User.findById(userId);
    user.groupId = groupId;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  getGroupById,
  getGroupMembers,
  getGroupsByClassId,
  createEmptyProject,
  createGroup,
  addUserToGroup,
  getMatchedByGroupId,
};
