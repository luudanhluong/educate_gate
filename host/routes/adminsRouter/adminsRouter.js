import express from "express";
import adminstrationController from "../../controllers/adminstrationController/index.js";

const adminsRouter = express.Router();

adminsRouter.get("/list-classes", adminstrationController.getClasses);
adminsRouter.get("/all_categories", adminstrationController.getAllCategories);
adminsRouter.get("/all_semesters", adminstrationController.getAllSemesters);
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
adminsRouter.post(
  "/create-new-classes",
  adminstrationController.createNewListClass
);
adminsRouter.post(
  "/create_new_category",
  adminstrationController.addNewCategory
);
adminsRouter.post(
  "/create_new_semester",
  adminstrationController.createNewSemester
);
adminsRouter.patch(
  "/update_semester/:id",
  adminstrationController.updateSemester
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
  "/delete_semester/:id",
  adminstrationController.deleteSemester
);

export default adminsRouter;
