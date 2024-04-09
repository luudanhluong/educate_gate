import express from "express";
import classController from "../../controllers/classController/index.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const classRouter = express.Router();
classRouter.get("/", classController.getClasses);
classRouter.get("/add_student_in_class", classController.addStuentdInClass);
classRouter.post("/create_new_classes", classController.createClass);
classRouter.delete("/:id", classController.deleteClass);
classRouter.get(
  "/:userId/user",
  verifyAccessToken,
  classController.getClassesByUserId
);
classRouter.get("/:classId/students", classController.getStudentInClass);
classRouter.get("/student/:classId", classController.getClassById);
classRouter.get("/:id", classController.getClass);

export default classRouter;
