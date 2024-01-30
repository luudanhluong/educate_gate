import mongoose, { Schema } from "mongoose";

const semesterSchema = new Schema(
  {
    name: {type: String, required: true},
    code: {type: Number, required: true},
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const Semester = mongoose.model("Semester", semesterSchema);
export default Semester;
