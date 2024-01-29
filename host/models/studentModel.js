import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({ 
  gender: { type: Boolean },
  image: { type: String },
  DOB: { type: Date },
  classId: { type: Number },
  groupId: { type: Number },
  status: { type: String },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
