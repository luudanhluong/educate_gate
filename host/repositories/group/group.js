import Group from "../../models/groupModel.js"; // Đường dẫn đến Group model của bạn

const getGroupsByClassId = async (classId) => {
  try {
    return await Group.find({ classId }).populate("studentId");
  } catch (error) {
    throw new Error(error.message);
  }
};

const getGroupDetailsById = async (groupId) => {
  try {
    return await Group.findById(groupId).populate("studentId");
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getGroupsByClassId,
  getGroupDetailsById,
};
