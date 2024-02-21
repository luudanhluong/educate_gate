import express from "express";
import mentorCategoryController from "../../controllers/mentorCategoryController/index.js";

const mentorCategoriesRouter = express.Router();

mentorCategoriesRouter.post(
  "/addNew",
  mentorCategoryController.addNewMentorCategory
);
mentorCategoriesRouter.get(
  "/:userId",
  mentorCategoryController.getAllMentorCategory
);
mentorCategoriesRouter.delete(
  "/delete/:id",
  mentorCategoryController.deleteMentorCategory
);

export default mentorCategoriesRouter;
