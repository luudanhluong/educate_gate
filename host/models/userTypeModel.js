import mongoose, { Schema } from "mongoose";

const userType = Schema(
  {
    name: { type: String, required: [true, "Class name không được để trống"] },
    userTypeCode: { type: Number, required: true },
    status: {type: String},
  },
  {
    timestamps: true,
  }
);
const UserType = mongoose.model("UserType", userType);
export default UserType;
