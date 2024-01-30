import mongoose, { Schema } from "mongoose";

const classStudentSchema = new Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teachers",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "semesters",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {type: String}
  },
  {
    timestamps: true,
  }
);
const ClassStudent = mongoose.model("ClassStudent", classStudentSchema);
export default ClassStudent;
