import express from "express";
import categoryController from "../../controllers/categoryController/index.js";

const catergoryRouter = express.Router();

catergoryRouter.get("/", categoryController.getAllCategories);

export default catergoryRouter;
