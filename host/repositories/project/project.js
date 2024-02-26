import Project from "../../models/projectModel.js";

const createProject = async (projectData) => {
  try {
    const project = await Project.create(projectData);
    return project;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};
const updateProject = async (id, project) => {
  try {
    const project = await Project.findByIdAndUpdate(id, project);
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findProjectById = async (id) => {
  try {
    const project = await Project.findOne({ id });
    return project;
  } catch (error) {
    throw new Error("Error finding project");
  }
};

export default {
  createProject,
  findProjectById,
  updateProject,
};
