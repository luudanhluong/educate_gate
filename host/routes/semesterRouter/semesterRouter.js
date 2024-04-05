import express from "express";
import semesterController from "../../controllers/semesterController/index.js";

const semesterRouter = express.Router();

semesterRouter.get("/", semesterController.getAllSemesters);
semesterRouter.get("/upcoming", semesterController.getSemestersUpcoming);
semesterRouter.post("/", semesterController.createNewSemester);
semesterRouter.patch("/:id", semesterController.updateSemester);
semesterRouter.delete("/:id", semesterController.deleteSemester);

export default semesterRouter;
