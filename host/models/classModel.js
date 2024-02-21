import mongoose, { Schema } from "mongoose";

const classSchema = new Schema(
  {
    preName: { type: String, require: true },
    suffName: { type: String, require: true },
    code: { type: Number, require: true },
    enrollmentLimit: { type: Number, require: true },
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
const Class = mongoose.model("Class", classSchema);
export default Class;
