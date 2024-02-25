import projectDAO from "../../repositories/project/index.js";

const createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = await projectDAO.createProject({ name, description });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createProject,
};
