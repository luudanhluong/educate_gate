import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
  role: {
    type: String,
    required: [true, "Role không được để trống"],
  }
});

const User = mongoose.model("User", userSchema);
export default User;
