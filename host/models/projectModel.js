import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const Project = mongoose.model("Project", projectSchema);
export default Project;
