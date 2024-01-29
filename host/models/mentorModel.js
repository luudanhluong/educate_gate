import mongoose, { Schema } from "mongoose";

const mentorSchema = new Schema({
  degree: { type: String },
  image: { type: String },
  categoryId: { type: Number },
  phoneNumber: { type: String },
  menteeCount: { type: Number },
  menteeCurr: { type: Number },
  status: { type: String },
});

const Mentor = mongoose.model("Mentor", mentorSchema);
export default Mentor;
