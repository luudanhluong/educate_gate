import express from "express";
import userController from "../../controllers/userController/index.js";

const userLogin = express.Router();

userLogin.post("/", userController.getUserLogin);

export default userLogin;
