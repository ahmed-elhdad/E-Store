import mongoose from "mongoose";
import Joi, { string } from "joi";
const date = new Date();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bought: [],
  createdAt: {
    type: Date,
    default: date.getDay(),
  },
  role: {
    type: String,
    default: "user",
  },
  isVerified: {
    required: true,
    default: false,
    type: Boolean,
  },
});
export default mongoose.model("User", userSchema);
export const userValidation = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).max(128).required(),
});
