import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const Project = mongoose.model("Project", projectSchema);
export default Project;
