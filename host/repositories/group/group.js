import mongoose from "mongoose";
import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";

const getGroupById = async (id) => {
  try {
    const group = await Group.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
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

const createEmptyProject = async (index) => {
  try {
    const project = new Project({
      name: `Nhóm ${index}`,
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

const addUserToGroup = async (userId, groupId, isLeader = false) => {
  try {
    const user = await User.findById(userId);
    user.groupId = groupId;
    user.isLeader = isLeader;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkGroupsExist = async (classId) => {
  const groups = await Group.find({ classId: classId });
  return groups.length > 0;
};

const countGroupGetMatched = async (teacherId) => {
  try {
    const pipline = [
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "class",
        },
      },
      { $match: { "class.teacherId": new mongoose.Types.ObjectId(teacherId) } },
      {
        $lookup: {
          from: "matcheds",
          localField: "_id",
          foreignField: "groupId",
          as: "matched",
        },
      },
      { $unwind: "$matched" },
    ];
    const results = await Group.aggregate(pipline);
    return results.length;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllTempMatchingByGId = async (gId, { search, skip, limit }) => {
  try {
    const group = await Group.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(gId) },
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
        $unwind: "$project",
      },
      {
        $lookup: {
          from: "projectcategories",
          localField: "project._id",
          foreignField: "projectId",
          as: "projectCategories",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "projectCategories.categoryId",
          foreignField: "_id",
          as: "projectCategories",
        },
      },
    ]);
    let pipeline = [
      { $match: { role: 3, status: "Active" } },
      {
        $lookup: {
          from: "mentorcategories",
          localField: "_id",
          foreignField: "userId",
          as: "mentorcategories",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "mentorcategories.categoryId",
          foreignField: "_id",
          as: "mentorcategories",
        },
      },
      {
        $match: {
          "mentorcategories._id": {
            $in: group?.[0]?.projectCategories?.map(
              (category) => new mongoose.Types.ObjectId(category._id)
            ),
          },
        },
      },
    ];
    if (search && search.length > 0)
      pipeline.push({
        $match: { email: { $regex: search, $options: "i" } },
      });
    const listMentors = await User.aggregate(pipeline).skip(skip).limit(limit);
    const total = await Group.aggregate(pipeline);
    return { data: listMentors, total: total.length };
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
  checkGroupsExist,
  countGroupGetMatched,
  getAllTempMatchingByGId,
};
