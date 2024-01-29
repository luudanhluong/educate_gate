import express from "express";
import loginController from "../../controllers/loginController/index.js";

const userLogin = express.Router();

userLogin.post("/", loginController.getUserLogin);

export default userLogin;
