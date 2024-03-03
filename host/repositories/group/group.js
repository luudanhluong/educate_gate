import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";
const getGroupById = async (id) => {
  try {
    const group = await Group.findOne({ _id: id }).exec();
    return group;
  } catch (error) {
    throw new Error("Error finding group");
  }
};
const getGroupMembers = async (groupId) => {
  try {
    const members = await User.find({ groupId: groupId }).exec();
    return members;
  } catch (error) {
    throw new Error("Error finding group members");
  }
};
const getGroupsByClassId = async (classId) => {
  try {
    const groups = await Group.find({ classId }).exec();
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
