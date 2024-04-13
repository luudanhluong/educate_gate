import express from "express";
import temporaryMatchingController from "../../controllers/temporaryMatchingController/index.js";
import { verifyAccessToken } from "../../utilities/jwt.js";

const temporaryMatchingRouter = express.Router();

temporaryMatchingRouter.get(
  "/:gid/group",
  verifyAccessToken,
  temporaryMatchingController.getAllTempararyMatching
);
temporaryMatchingRouter.post(
  "/:gid/group",
  verifyAccessToken,
  temporaryMatchingController.addTempararyMatchingByGid
);

export default temporaryMatchingRouter;
