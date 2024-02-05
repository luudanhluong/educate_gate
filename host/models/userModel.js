import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Tên người dùng không được để trống"],
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      index: true,
      unique: [true, "Email này đã tồn tại trong hệ thống"],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      min: [6, "Mật khẩu phải dài hơn 6 chữ số"],
    },
    role: {
      type: Number,
      required: [true, "Role không được để trống"],
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    },
    DOB: { type: Date },
    gender: { type: Boolean },
    phoneNumber: { type: String },
    image: { type: String },
    degree: { type: String },
    groupId: { type: Number },
    menteeCount: { type: Number },
    isLeader: { type: Boolean },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
