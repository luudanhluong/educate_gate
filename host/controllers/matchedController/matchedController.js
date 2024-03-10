import matched from "../../repositories/matched/index.js";

const addMatched = async (req, res, next) => {
  try {
    const { groupId, userId } = req.body;
    res.status(200).json(await matched.addMatched(groupId, userId));
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const addAllMatching = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    res.status(200).json(await matched.addAllMatching(teacherId));
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default {
  addMatched,
  addAllMatching,
};
