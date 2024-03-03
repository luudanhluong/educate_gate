import matched from "../../repositories/matched/index.js";

const addMatched = async (req, res, next) => {
  try {
    const { groupId, mentorId } = req.body;
    res.status(200).json(await matched.addMatched({ groupId, mentorId }));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default {
  addMatched,
};
