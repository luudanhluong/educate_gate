import express from "express";
import userController from "../../controllers/userController/index.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const user = express.Router();

user.get("/profile", userController.userProfile);
user.get("/teachers", userController.getTeachers);
user.get("/mentors", userController.getMentors);
user.get("/parameter", verifyAccessToken, userController.pmtUser);
user.get("/students", userController.getStudents);
user.patch("/profile/update", userController.userUpdateProfile);
user.post("/login", userController.getUserLogin);
user.post("/register", userController.addNewUser);
export default user;
