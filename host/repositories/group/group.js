import Group from "../../models/groupModel.js"; // Đường dẫn đến Group model của bạn
const getGroupById = async (id) => {
  try {
    const group = await Group.findOne({ id }).exec();
    return group;
  } catch (error) {
    throw new Error("Error finding group");
  }
};
export default {
  getGroupById,
};
