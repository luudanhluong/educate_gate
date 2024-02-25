import express from "express";
import projectController from "../../controllers/projectController/projectController.js";

const projectRouter = express.Router();

projectRouter.post("/create_project", projectController.createProject);

export default projectRouter;
