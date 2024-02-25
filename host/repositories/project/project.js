import Project from "../../models/projectModel.js";

const createProject = async (projectData) => {
  try {
    const project = await Project.create(projectData);
    return project;
  } catch (error) {
    console.error("Error saving to database:", error);
    throw new Error("Internal Server Error");
  }
};
const findProjectById = async (id) => {
  try {
    const project = await Project.findOne({ id });
    return project;
  } catch (error) {
    console.error("Error finding project by ID:", error);
    throw new Error("Error finding project");
  }
};

export default {
  createProject,
  findProjectById,
};
