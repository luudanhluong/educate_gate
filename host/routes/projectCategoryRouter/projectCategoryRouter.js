import express from "express";
import projectCategoryController from "../../controllers/projectCategoryController/index.js";

const projectCategoryRouter = express.Router();

projectCategoryRouter.get(
  "/:pid",
  projectCategoryController.getAllProjectCategorybyId
);
projectCategoryRouter.post(
  "/add_new",
  projectCategoryController.createProjectCategory
);
projectCategoryRouter.delete(
  "/delete/:id",
  projectCategoryController.deleteProjectCategorybyId
);

export default projectCategoryRouter;
