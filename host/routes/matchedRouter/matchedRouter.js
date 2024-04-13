import express from "express";
import matchedController from "../../controllers/matchedController/index.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const matchedRouter = express.Router();

matchedRouter.post("/", verifyAccessToken, matchedController.addMatched);
matchedRouter.get(
  "/:teacherId/teacher",
  verifyAccessToken,
  matchedController.addAllMatching
);

export default matchedRouter;
