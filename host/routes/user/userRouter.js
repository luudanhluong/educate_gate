import express from "express";
import userController from "../../controllers/userController/index.js";

const user = express.Router();

user.post("/add-list", userController.insertListUsers);
user.post("/login", userController.getUserLogin);
user.post("/register", userController.addNewUser);

export default user;
