import express from "express";
import groupController from "../../controllers/groupController/index.js";

const groupRouter = express.Router();
import multer from "multer";

const upload = multer({ dest: "uploads/" });
// groupRouter.get("/:groupId/members", groupController.groupDetail);
groupRouter.get("/:id", groupController.getGroupById);
groupRouter.get("/:classId/groups", groupController.getGroupsByClass);
groupRouter.get("/:teacherId/teacher", groupController.countGroupGetMatched);
groupRouter.post("/createRandom", groupController.createRandomGroups);
groupRouter.get(
  "/checkGroupsExist/:classId",
  groupController.checkGroupsExistController
);
groupRouter.post(
  "/createGroupsFromFile",
  upload.single("file"),
  groupController.createGroupsFromExcel
);
export default groupRouter;
