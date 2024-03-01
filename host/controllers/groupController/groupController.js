import groupDAO from "../../repositories/group/index.js";
import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await groupDAO.getGroupById(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const groupDetail = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await groupDAO.getGroupById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const members = await groupDAO.getGroupMembers(groupId);
    if (!members) {
      return res
        .status(404)
        .json({ message: "No members found for this group" });
    }
    const membersCount = members.length;
    res.json({
      groupName: group.name,
      membersCount: membersCount,
      members: members,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getGroupsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const groups = await groupDAO.getGroupsByClassId(classId);
    const groupsWithDetails = await Promise.all(
      groups.map(async (group) => {
        const members = await groupDAO.getGroupMembers(group._id);
        const membersCount = members.length;
        const mentor = group.mentorId
          ? await User.findById(group.mentorId)
          : null;
        const project = group.projectId
          ? await Project.findById(group.projectId)
          : null;

        return {
          ...group.toJSON(),
          membersCount,
          mentorName: mentor ? mentor.username : "No mentor assigned",
          mentorDetails: mentor
            ? {
                id: mentor._id,
                name: mentor.username,
                email: mentor.email,
              }
            : null,
          projectName: project ? project.name : "No project assigned",
        };
      })
    );
    res.status(200).json(groupsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  groupDetail,
  getGroupById,
  getGroupsByClass,
};
