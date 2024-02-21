import mongoose, { Schema } from "mongoose";

const MatchedSchema = new Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
const Matched = mongoose.model("Matched", MatchedSchema);
export default Matched;
