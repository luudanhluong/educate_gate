import express from "express";
import userController from "../../controllers/userController/index.js";

const userRegister = express.Router();

userRegister.post("/", userController.addNewUser);

export default userRegister;
