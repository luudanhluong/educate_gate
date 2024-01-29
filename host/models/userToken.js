import mongoose, { Schema } from "mongoose";

const userTokenSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  token: { type: String, required: true },
  expiresIn: { type: Date, required: true },
});

const UserToken = mongoose.model("Token", userTokenSchema);
export default UserToken;
