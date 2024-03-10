import express from "express";
import teacherController from "../../controllers/teacherController/teacherController.js";

const teacherRouter = express.Router();

teacherRouter.get("/", teacherController.suggestMatching);
teacherRouter.get("/classes", teacherController.getClassListByTeacher);

export default teacherRouter;
