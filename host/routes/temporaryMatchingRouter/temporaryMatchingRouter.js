import express from "express";
import temporaryMatchingController from "../../controllers/temporaryMatchingController/index.js";

const temporaryMatchingRouter = express.Router();

temporaryMatchingRouter.get(
  "/:gid/group",
  temporaryMatchingController.getAllTempararyMatching
);

export default temporaryMatchingRouter;
