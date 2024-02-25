import Group from "../../models/groupModel.js"; // Đường dẫn đến Group model của bạn
const findGroupById = async (id) => {
  try {
    const group = await Group.findOne({ id }).exec();
    return group;
  } catch (error) {
    console.error("Error finding group by ID:", error);
    throw new Error("Error finding group");
  }
};
export default {
  findGroupById,
};
