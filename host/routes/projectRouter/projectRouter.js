import express from "express";
import projectController from "../../controllers/projectController/projectController.js";

const projectRouter = express.Router();

projectRouter.get("/:id", projectController.getProjectById);
projectRouter.patch("/update_project/:id", projectController.updateProject);
export default projectRouter;
