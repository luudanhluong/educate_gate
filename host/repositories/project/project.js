import Group from "../../models/groupModel.js";
import Matched from "../../models/matchedModel.js";
import MentorCategory from "../../models/mentorCategory.js";
import ProjectCategory from "../../models/projectCategory.js";
import Project from "../../models/projectModel.js";
import TemporaryMatching from "../../models/temporaryMatching.js";
import User from "../../models/userModel.js";

const createProject = async (projectData) => {
  try {
    const project = await Project.create(projectData);
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateProject = async (id, project) => {
  try {
    const result = await Project.findByIdAndUpdate(id, project);
    const group = await Group.findOne({ projectId: result._id });
    const matched = await Matched.findOne({ groupId: group._id });
    if (!matched._id) {
      const listProjectCategories = await ProjectCategory.find({
        projectId: result._id,
      });
      const listCategoryId = listProjectCategories.map((c) => c.categoryId);
      await TemporaryMatching.deleteMany({ groupId: group._id });
      const mentorCategories = await MentorCategory.find({
        categoryId: { $in: listCategoryId },
      });
      const userIds = [];
      mentorCategories.map(async (c) => {
        if (!userIds.includes(c.userId.toString())) {
          userIds.push(c.userId.toString());
          const user = await User.findById(c.userId);
          const matchedQtt = await Matched.countDocuments({
            mentorId: c.userId,
          });
          if (user.menteeCount > matchedQtt) {
            await TemporaryMatching.create({
              groupId: group._id,
              mentorId: c.userId,
            });
          }
        }
      });
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getProjectById = async (id) => {
  try {
    const project = await Project.findOne({ _id: id }).exec();
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createProject,
  getProjectById,
  updateProject,
};
