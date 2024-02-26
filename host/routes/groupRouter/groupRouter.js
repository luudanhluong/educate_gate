import express from "express";
import groupController from "../../controllers/groupController/index.js";

const groupRouter = express.Router();

groupRouter.get("/:groupId/members", groupController.getGroupMembers);

export default groupRouter;
import express from "express";
import groupController from "../../controllers/groupController/index.js";

const groupRouter = express.Router();

groupRouter.get("/:id", groupController.getGroupById);

export default groupRouter;
