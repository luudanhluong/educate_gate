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
          phoneNumber: matched.mentorId.phoneNumber,
          degree: matched.mentorId.degree,
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
        image: member.image,
      })),
      project: group.projectId
        ? {
            id: group.projectId._id,
            name: group.projectId.name,
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

const createRandomGroups = async (req, res) => {
  const { classId, numberOfGroups } = req.body;
  if (!classId || !numberOfGroups) {
    return res
      .status(400)
      .json({ message: "Class ID and number of groups are required." });
  }

  try {
    let users = await User.find({ classId }).exec();
    if (users.length < numberOfGroups) {
      return res
        .status(400)
        .json({ message: "Number of groups exceeds the number of students." });
    }

    users = users.sort(() => 0.5 - Math.random());
    const groupSize = Math.ceil(users.length / numberOfGroups);
    const groups = [];

    for (let i = 0; i < numberOfGroups; i++) {
      const project = await groupDAO.createEmptyProject();
      const group = await groupDAO.createGroup({
        name: `Group ${i + 1}`,
        classId,
        projectId: project._id,
      });

      for (let j = 0; j < groupSize && users.length; j++) {
        await groupDAO.addUserToGroup(users.pop()._id, group._id);
      }

      groups.push(group);
    }

    res.status(201).json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  groupDetail,
  getGroupById,
  getGroupsByClass,
  createRandomGroups,
};
