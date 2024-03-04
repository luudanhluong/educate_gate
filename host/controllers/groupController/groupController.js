import groupDAO from "../../repositories/group/index.js";

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await groupDAO.getGroupById(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// const groupDetail = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getGroupsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const groups = await groupDAO.getGroupsByClassId(classId);
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  // groupDetail,
  getGroupById,
  getGroupsByClass,
};
