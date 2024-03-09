import express from "express";
import userController from "../../controllers/userController/index.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const user = express.Router();

user.get("/profile", userController.userProfile);
user.get("/teachers", verifyAccessToken, userController.getTeachers);
user.get("/mentors", verifyAccessToken, userController.getMentors);
user.get("/parameter", verifyAccessToken, userController.pmtUser);
user.get("/students", verifyAccessToken, userController.getStudents);
user.patch(
  "/profile/update",
  verifyAccessToken,
  userController.userUpdateProfile
);
user.post("/login", userController.getUserLogin);
user.post("/register", userController.addNewUser);
export default user;
