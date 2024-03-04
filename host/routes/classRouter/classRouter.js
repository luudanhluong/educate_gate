import express from "express";
import classController from "../../controllers/classController/index.js";

const classRouter = express.Router();
classRouter.get("/:classId/students", classController.getStudentInClass);
classRouter.get("/student/:classId", classController.getClassById);

export default classRouter;
