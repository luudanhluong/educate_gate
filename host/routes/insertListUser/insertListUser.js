import express from "express";
import insertListUsersController from "../../controllers/insertListUser/index.js";

const insertListUser = express.Router();

insertListUser.post("/", insertListUsersController.insertListUsers);

export default insertListUser;
