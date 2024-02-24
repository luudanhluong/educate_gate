import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    preName: { type: String, required: true },
    suffName: { type: String },
    code: { type: Number, required: true },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
