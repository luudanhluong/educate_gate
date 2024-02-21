import express from "express";
import userController from "../../controllers/userController/index.js";

const user = express.Router();

user.get("/profile", userController.userProfile);
user.patch("/profile/update", userController.userUpdateProfile);
user.post("/login", userController.getUserLogin);
user.post("/register", userController.addNewUser);

export default user;
