import express from "express";
import groupController from "../../controllers/groupController/index.js";

const groupRouter = express.Router();

// groupRouter.get("/:groupId/members", groupController.groupDetail);
groupRouter.get("/:id", groupController.getGroupById);
groupRouter.get("/:classId/groups", groupController.getGroupsByClass);
export default groupRouter;
