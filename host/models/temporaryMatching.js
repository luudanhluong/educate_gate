import mongoose, { Schema } from "mongoose";

const temporaryMatchingSchema = new Schema(
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
const TemporaryMatching = mongoose.model("TemporaryMatching", temporaryMatchingSchema);
export default TemporaryMatching;
