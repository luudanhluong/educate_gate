import mongoose, { Schema } from "mongoose";

const mentorSchema = new Schema({
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
  categoryId: { type: Number },
  phoneNumber: { type: String },
  menteeCount: { type: Number },
  menteeCurr: { type: Number },
  status: { type: String },
});

const Mentor = mongoose.model("Mentor", mentorSchema);
export default Mentor;
