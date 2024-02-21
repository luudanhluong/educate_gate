import mongoose, { Schema } from "mongoose";

const projectCategorySchema = new Schema(
  { 
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const ProjectCategory = mongoose.model("ProjectCategory", projectCategorySchema);
export default ProjectCategory;
