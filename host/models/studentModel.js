import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  username: {
    type: String,
    required: [true, "Tên người dùng không được để trống"],
  },
  email: {
    type: String,
    required: [true, "Email không được để trống"],
    unique: [true, "Email này đã tồn tại trong hệ thống"],
  },
  password: {
    type: String,
    required: [true, "Mật khẩu không được để trống"],
    min: [6, "Mật khẩu phải dài hơn 6 chữ số"],
  },
  gender: { type: Boolean },
  image: { type: String },
  DOB: { type: Date },
  classId: { type: Number },
  groupId: { type: Number },
  status: { type: String },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
