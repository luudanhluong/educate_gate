import express from "express";
import classController from "../../controllers/classController/index.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const classRouter = express.Router();
classRouter.get(
  "/:userId",
  verifyAccessToken,
  classController.getClassesByUserId
);
classRouter.get("/:classId/students", classController.getStudentInClass);
classRouter.get("/student/:classId", classController.getClassById);

export default classRouter;
