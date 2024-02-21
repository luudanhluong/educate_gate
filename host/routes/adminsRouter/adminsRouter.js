import express from "express";   
import adminstrationController from "../../controllers/AdminstrationController/index.js";

const adminsRouter = express.Router();

adminsRouter.get("/users", adminstrationController.getUsers); 
adminsRouter.post("/insert-list-users", adminstrationController.insertListUsers);

export default adminsRouter;
