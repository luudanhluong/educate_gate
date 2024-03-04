import projectDAO from "../../repositories/project/index.js";

const updateProject = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const project = await projectDAO.updateProject(id, {
      name,
      description,
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectDAO.getProjectById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  updateProject,
  getProjectById,
};
