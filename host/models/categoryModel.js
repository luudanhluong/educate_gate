import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, require: true },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
