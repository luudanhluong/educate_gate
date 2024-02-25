// Trong file projectCategoryRepository.js

import ProjectCategory from "../../models/projectCategory.js";

const create = async ({ categoryId, projectId }) => {
  try {
    const projectCategory = new ProjectCategory({ categoryId, projectId });
    await projectCategory.save();
    return projectCategory;
  } catch (error) {
    console.error("Error creating project category:", error);
    throw new Error("Error creating project category");
  }
};

const deleteByProjectId = async (projectId) => {
  try {
    await ProjectCategory.deleteOne({ projectId: projectId });
  } catch (error) {
    console.error("Error deleting project categories:", error);
    throw new Error("Error deleting project categories");
  }
};
const updateProjectCategories = async (projectId, categoryIds) => {
  try {
    await deleteByProjectId(projectId);
    const projectCategories = await Promise.all(
      categoryIds.map((categoryId) => create({ categoryId, projectId }))
    );
    return projectCategories;
  } catch (error) {
    console.error("Error updating project categories:", error);
    throw new Error("Error updating project categories");
  }
};

export default {
  create,
  deleteByProjectId,
  updateProjectCategories,
};
