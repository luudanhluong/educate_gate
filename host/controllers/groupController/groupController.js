import User from "../../models/userModel.js";
import groupDAO from "../../repositories/group/index.js";
import projectDAO from "../../repositories/project/project.js";
import userDAO from "../../repositories/user/index.js";

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await groupDAO.getGroupById(id));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getGroupsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const groups = await groupDAO.getGroupsByClassId(classId);
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkGroupsExistController = async (req, res) => {
  const classId = req.params.classId;
  try {
    const groupsExist = await groupDAO.checkGroupsExist(classId);
    res.status(200).json({ exists: groupsExist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createRandomGroups = async (req, res) => {
  const { classId, numberOfGroups } = req.body;
  try {
    let users = await User.find({ classId }).exec();
    users = users.sort(() => 0.5 - Math.random());

    const baseGroupSize = Math.floor(users.length / numberOfGroups);
    const numLargerGroups = users.length % numberOfGroups;
    const groups = [];

    for (let i = 0, userIndex = 0; i < numberOfGroups; i++) {
      const project = await groupDAO.createEmptyProject(i + 1);
      const groupSize = i < numLargerGroups ? baseGroupSize + 1 : baseGroupSize;
      const group = await groupDAO.createGroup({
        name: `Nhóm ${i + 1}`,
        classId,
        projectId: project._id,
      });

      const members = users.slice(userIndex, userIndex + groupSize);
      userIndex += groupSize;

      for (let j = 0; j < members.length; j++) {
        const member = members[j];
        const isLeader = j === 0;
        await groupDAO.addUserToGroup(member._id, group._id, isLeader);
      }

      groups.push(group);
    }

    res.status(201).json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGroupsFromExcel = async (req, res, next) => {
  try {
    const { id: classId } = req.query;
    const datas = req.body;
    let project;
    let group;
    let user;
    let flag = false;
    for (const data of datas) {
      const { Email, RollNumber, MemberCode, ProjectName, FullName, GroupNo } =
        data;
      if (GroupNo) {
        if (ProjectName) {
          project = await projectDAO.createProject({ name: ProjectName });
        }
        group = await groupDAO.createGroup({
          classId: classId,
          projectId: project?._id || "",
          name: "Nhóm " + GroupNo,
        });
        if (group)
          user = await userDAO.updateUser(
            {
              email: Email,
              rollNumber: RollNumber,
              memberCode: MemberCode,
              username: FullName,
            },
            { groupId: group?._id || "" }
          );
        if (user) flag = true;
      }
    }
    if (flag) res.send("success");
  } catch (error) {
    next(error);
  }
};
const countGroupGetMatched = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const result = await groupDAO.countGroupGetMatched(teacherId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export default {
  // groupDetail,
  getGroupById,
  getGroupsByClass,
  createRandomGroups,
  createGroupsFromExcel,
  checkGroupsExistController,
  countGroupGetMatched,
};
