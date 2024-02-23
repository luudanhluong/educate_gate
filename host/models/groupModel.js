import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    groupName: { type: String, require: true },
    isLeader: { type: Boolean, require: true },
    enrollmentLimit: { type: Number, require: true },
    description: { type: String },
    status: { type: String },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
const Group = mongoose.model("Group", groupSchema);
export default Group;
