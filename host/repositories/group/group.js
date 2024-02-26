import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";
const findGroupById = async (id) => {
  try {
    const group = await Group.findOne({ id }).exec();
    return group;
  } catch (error) {
    console.error("Error finding group by ID:", error);
    throw new Error("Error finding group");
  }
};
const getGroupMembers = async (groupId) => {
  try {
    const members = await User.find({ groupId: groupId }).exec();
    return members;
  } catch (error) {
    console.error("Error finding group members:", error);
    throw new Error("Error finding group members");
  }
};
export default {
  findGroupById,
  getGroupMembers,
};
