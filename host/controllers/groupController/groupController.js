import groupDAO from "../../repositories/group/index.js";

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await groupDAO.getGroupById(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// const groupDetail = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getGroupsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const groups = await groupDAO.getGroupsByClassId(classId);
    res.status(200).json(groups);
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

      const members = users.splice(0, groupSize);
      for (const member of members) {
        await groupDAO.addUserToGroup(member._id, group._id);
      }

      groups.push(group);
    }

    res.status(201).json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  // groupDetail,
  getGroupById,
  getGroupsByClass,
  createRandomGroups,
};
