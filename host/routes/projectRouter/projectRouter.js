import express from "express";
import projectController from "../../controllers/projectController/projectController.js";

const projectRouter = express.Router();

projectRouter.post("/update_project", projectController.updateProject);

export default projectRouter;
