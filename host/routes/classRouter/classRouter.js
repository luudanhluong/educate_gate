import express from "express"; 
import classController from "../../controllers/classController/index.js";

const classRouter = express.Router();

classRouter.post("/create-new-class", classController.createNewListClass); 

export default classRouter;
