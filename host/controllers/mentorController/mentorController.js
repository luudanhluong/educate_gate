import User from "../../models/userModel.js";
import Group from "../../models/groupModel.js";

const getMentorsInGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const mentors = await User.find({ groupId: groupId, role: 3 });

    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getMentorsInGroup };

export default {
  getMentorsInGroup,
};
