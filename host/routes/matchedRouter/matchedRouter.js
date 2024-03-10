import express from "express";
import matchedController from "../../controllers/matchedController/index.js";

const matchedRouter = express.Router();

matchedRouter.post("/", matchedController.addMatched);
matchedRouter.get("/:teacherId/teacher", matchedController.addAllMatching);

export default matchedRouter;
