import express from "express";
import mentorController from "../../controllers/mentorController/index.js";

const mentorRouter = express.Router();

mentorRouter.get("/:groupId", mentorController.getMentorsInGroup);

export default mentorRouter;
