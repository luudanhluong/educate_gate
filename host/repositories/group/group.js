import mongoose from "mongoose";
import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";
import xlsx from "xlsx";
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
          as: "categories",
        },
      },
      {
        $addFields: {
          categories: "$categories.name",
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
const createGroupsFromExcel = async (filePath, classId) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const groupsMap = {};

  for (const data of xlData) {
    const groupName = `Group ${data["Tên Nhóm"]}`;
    if (!groupsMap[groupName]) {
      const group = await createGroup(groupName, classId);
      groupsMap[groupName] = group._id;
    }
  }

  return Object.values(groupsMap).map((groupId) => ({ groupId }));
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
  createGroupsFromExcel,
};
