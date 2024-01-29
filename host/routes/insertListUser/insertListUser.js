import express from "express"; 
import userController from "../../controllers/userController/index.js";

const insertListUser = express.Router();

insertListUser.post("/", userController.insertListUsers);

export default insertListUser;
