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
    const matched = Matched.findOne({ projectId: result._id });
    if (!matched) {
      const listProjectCategories = await ProjectCategory.find({
        projectId: result._id,
      });
      const listCategoryId = listProjectCategories.map((c) => c.categoryId);
      const mentorCategories = await MentorCategory.find({
        categoryId: { $in: listCategoryId },
      });
      const user = await User.findById(mentorCategories[0].userId);
      const matchedQtt = await Matched.countDocuments({ mentorId: user._id });
      const temporaryMatching = mentorCategories.map((c) => ({
        groupId: group._id,
        mentorId: c.userId,
      }));
      if (user.menteeCount > matchedQtt) {
        await TemporaryMatching.deleteMany({ groupId: group._id });
        await TemporaryMatching.insertMany(temporaryMatching);
      }
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
