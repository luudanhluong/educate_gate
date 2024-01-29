import express, { json } from "express";
import dotnv from "dotenv";
import cors from "cors";
import connectDB from "./database.js";
import registerRouter from "./routes/registerRouter/index.js";
import loginRouter from "./routes/loginRouter/index.js";
import insertListUserRouter from "./routes/insertListUser/index.js";
import multer from "multer";
import path from "path";

const app = express();
dotnv.config();
app.use(cors());
app.use(json());
const port = process.env.PORT || 8080;
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  console.log("hello world");
});
app.use("/insert-list-users", upload.single("file"), insertListUserRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.listen(port, (req, res) => {
  connectDB();
  console.log(`listening on ${port}`);
});
