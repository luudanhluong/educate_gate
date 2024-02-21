import mongoose, { Schema } from "mongoose";

const mentorCatergorySchema = new Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
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
const MentorCategory = mongoose.model("MentorCategory", mentorCatergorySchema);
export default MentorCategory;
