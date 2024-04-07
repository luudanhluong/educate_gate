import express from "express";
import adminstrationController from "../../controllers/adminstrationController/index.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const adminsRouter = express.Router();

adminsRouter.get("/list-classes", adminstrationController.getClasses);
adminsRouter.get("/all_categories", adminstrationController.getAllCategories);
adminsRouter.get("/users", adminstrationController.getUsers);
adminsRouter.get(
  "/delete-classes-empty",
  adminstrationController.deleteClassEmpty
);
adminsRouter.get(
  "/add-teacher-in-class",
  adminstrationController.addTeacherInClass
);
adminsRouter.get(
  "/add-student-in-class",
  adminstrationController.addStuentdInClass
);
adminsRouter.post("/create-new-classes", adminstrationController.createClass);
adminsRouter.post(
  "/create_new_category",
  adminstrationController.addNewCategory
);
adminsRouter.patch(
  "/update_category/:id",
  adminstrationController.updateCategory
);
adminsRouter.post(
  "/insert-list-users",
  adminstrationController.insertListUsers
);
adminsRouter.delete(
  "/delete_category/:id",
  adminstrationController.deleteCategory
);
adminsRouter.delete(
  "/:userId/user",
  verifyAccessToken,
  adminstrationController.deleteUserById
);

export default adminsRouter;
