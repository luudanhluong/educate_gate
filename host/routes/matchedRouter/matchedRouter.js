import express from "express";
import matchedController from "../../controllers/matchedController/index.js";

const matchedRouter = express.Router();

matchedRouter.post("/add_new", matchedController.addMatched);

export default matchedRouter;
