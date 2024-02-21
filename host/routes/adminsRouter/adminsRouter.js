import express from "express";   
import adminstrationController from "../../controllers/adminstrationController/index.js";

const adminsRouter = express.Router();

adminsRouter.get("/list-classes", adminstrationController.getClasses); 
adminsRouter.get("/users", adminstrationController.getUsers); 
adminsRouter.get("/delete-classes-empty", adminstrationController.deleteClassEmpty); 
adminsRouter.get("/add-teacher-in-class", adminstrationController.addTeacherInClass); 
adminsRouter.get("/add-student-in-class", adminstrationController.addStuentdInClass)
adminsRouter.post("/create-new-classes", adminstrationController.createNewListClass); 
adminsRouter.post("/insert-list-users", adminstrationController.insertListUsers);

export default adminsRouter;
