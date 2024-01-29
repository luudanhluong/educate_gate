import mongoose, { Schema } from "mongoose";

const adminModel = new Schema({
  image: { type: String },
  phoneNumber: { type: String },
  status: { type: String },
});

const Admin = mongoose.model("Admin", adminModel);
export default Admin;
