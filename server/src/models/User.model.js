import mongoose from "mongoose";
// import Joi, { string } from "joi";
const date = new Date();
const userSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: false,
    default: "",
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: { type: String, required: false, unique: true },
  credit_card: { type: String, required: false, unique: true },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Prudoct" },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prudoct",
    },
  ],
  orders: [
    {
      items: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Prudoct" },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      total_price: { type: Number, required: true },
      orderDate: { type: Date, default: Date.now },
      status: { type: String, default: "pending" },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
  total_price: {
    type: Number,
    required: false,
    default: 0,
  },
  isVerified: {
    required: false,
    default: false,
    type: Boolean,
  },
});
export default mongoose.model("User", userSchema);
// export const userValidation = Joi.object({
//   name: Joi.string().trim().min(2).max(100).required(),
//   email: Joi.string().trim().lowercase().email().required(),
//   password: Joi.string().min(6).max(128).required(),
// });
