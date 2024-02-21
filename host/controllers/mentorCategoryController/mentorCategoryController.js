import mentorCategory from "../../repositories/metorCategory/index.js";

const addNewMentorCategory = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied");
    const { userId, categoryId } = req.body;
    res
      .status(201)
      .json(await mentorCategory.addNewMentorCategory({ userId, categoryId }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllMentorCategory = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied");
    const { userId } = req.params;
    return res
      .status(200)
      .json(await mentorCategory.getAllMentorCategory(userId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMentorCategory = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied");
    const { id } = req.params;
    return res.status(200).json(await mentorCategory.deleteMentorCategory(id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addNewMentorCategory,
  getAllMentorCategory,
  deleteMentorCategory,
};
