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
matchedRouter.get(
  "/groups_matched",
  verifyAccessToken,
  matchedController.getMatchedGroups
);
matchedRouter.delete(
  "/:matchedId",
  verifyAccessToken,
  matchedController.deleteMatchedGroup
);

export default matchedRouter;
