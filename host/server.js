import express, { json } from "express";
import dotnv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import connectDB from "./database.js";
import {
  adminsRouter,
  catergoryRouter,
  classRouter,
  mentorCategoriesRouter,
  userRouter,
} from "./routes/index.js";

const app = express();
dotnv.config();
app.use(cors());
app.use(json());
const port = process.env.PORT || 8080;
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  console.log("hello world");
});
app.use("/user", userRouter);
app.use("/class", classRouter);
app.use("/category", catergoryRouter);
app.use("/mentorCategory", mentorCategoriesRouter);
app.use("/admins", upload.single("file"), adminsRouter);
app.listen(port, (req, res) => {
  connectDB();
  console.log(`listening on ${port}`);
});

import express, { json } from "express";
import dotnv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import connectDB from "./database.js";
// import registerRouter from "./routes/registerRouter/index.js";
// import loginRouter from "./routes/loginRouter/index.js";
// import insertListUserRouter from "./routes/insertListUser/index.js";
import userRouter from "./routes/user/userRouter.js";
import classRouter from "./routes/classRouter/classRouter.js";
import adminsRouter from "./routes/adminsRouter/adminsRouter.js";
import teacherRouter from './routes/teacherRouter/teacherRouter.js';
const app = express();
dotnv.config();
app.use(cors());
app.use(json());
const port = process.env.PORT || 8080;
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  console.log("hello world");
});
app.use('/teacher', teacherRouter);
app.use("/user", userRouter);
app.use("/class", classRouter);
app.use("/admins", upload.single("file"), adminsRouter);
app.listen(port, (req, res) => {
  connectDB();
  console.log(`listening on ${port}`);
});
