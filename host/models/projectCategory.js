import mongoose, { Schema } from "mongoose";

const projectCategorySchema = new Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const ProjectCategory = mongoose.model(
  "ProjectCategory",
  projectCategorySchema
);
export default ProjectCategory;
