import express from "express";
import projectController from "../../controllers/projectController/projectController.js";

const projectRouter = express.Router();

projectRouter.get("/:id", projectController.getProjectById);
projectRouter.patch("/:id/update_project", projectController.updateProject);
export default projectRouter;
