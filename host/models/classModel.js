import { Schema } from "mongoose";

const classModel = Schema({
  name: { type: String, required: [true, "Class name không được để trống"] },
  code: { type: String, unique: [true, "Mõi class chỉ có một code"] },
});
