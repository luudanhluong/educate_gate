import groupDAO from "../../repositories/group";

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await groupDAO.getGroupById(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getGroupMembers = async (req, res) => {
  const { groupId } = req.params;
  try {
    const members = await groupDAO.getGroupMembers(groupId);
    if (!members) {
      return res
        .status(404)
        .json({ message: "No members found for this group" });
    }
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getGroupMembers,
  getGroupById,
};
