import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  preName: { type: String, required: true },
  suffName: { type: String, required: true },
  code: { type: Number, required: true },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true });

const Class = mongoose.model("Class", classSchema);

export default Class;
