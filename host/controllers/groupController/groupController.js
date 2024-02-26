import groupDAO from "../../repositories/group";

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await groupDAO.getGroupById(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default {
  getGroupById,
};
