import groupDAO from "../../repositories/group/index.js";
import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";
import Group from "../../models/groupModel.js";
import Matched from "../../models/matchedModel.js";
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
    const group = await Group.findById(groupId).populate("projectId").exec();
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const matched = await Matched.findOne({ groupId: group._id })
      .populate("mentorId")
      .exec();
    if (!matched) {
      return res
        .status(404)
        .json({ message: "Matched mentor not found for this group" });
    }

    const mentor = matched.mentorId
      ? {
          name: matched.mentorId.username,
          email: matched.mentorId.email,
          image: matched.mentorId.image,
        }
      : null;

    const members = await User.find({ groupId: groupId });
    const membersCount = members.length;

    res.json({
      groupName: group.name,
      membersCount: membersCount,
      members: members.map((member) => ({
        username: member.username,
        email: member.email,
      })),
      project: group.projectId
        ? {
            projectId: group.projectId._id,
            nameProject: group.projectId.name,
            description: group.projectId.description,
          }
        : null,
      mentor: mentor,
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
