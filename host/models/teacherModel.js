import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
  userId: { type: String },
  degree: { type: String },
  image: { type: String },
  phoneNumber: { type: String },
  token: { type: String },
  subjectId: { type: Number },
  status: { type: String },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
