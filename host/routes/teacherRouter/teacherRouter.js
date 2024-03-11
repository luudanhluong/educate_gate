import express from "express";
import teacherController from "../../controllers/teacherController/teacherController.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const teacherRouter = express.Router();

teacherRouter.get(
  "/:teacherId/suggest",
  verifyAccessToken,
  teacherController.suggestMatching
);
teacherRouter.get("/classes", teacherController.getClassListByTeacher);
teacherRouter.get(
  "/:teacherId",
  verifyAccessToken,
  teacherController.getGroupsByTeacherId
);

export default teacherRouter;
