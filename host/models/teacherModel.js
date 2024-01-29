import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
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
  degree: { type: String },
  image: { type: String },
  phoneNumber: { type: String },
  token: { type: String },
  subjectId: { type: Number },
  status: { type: String },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
