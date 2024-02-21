import mongoose, { Schema } from "mongoose";

const semesterDetailSchema = new Schema(
  { 
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "semesters",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const SemesterDetail = mongoose.model("SemesterDetail", semesterDetailSchema);
export default SemesterDetail;
