import categoryDAO from "../../repositories/catergory/index.js";

const getAllCategories = async (req, res, next) => {
  try {
    res.status(200).json(await categoryDAO.getAllCategories());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllCategories,
};
