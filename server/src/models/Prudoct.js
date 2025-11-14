import mongoose from "mongoose";

const prudoctSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: Array, required: true },
  price: { type: Number, required: true },
  saler: { type: String, required: true },
  prudoctsNum: { type: Number, required: true },
  prudoctNo: { type: Number, required: false },
});
export default mongoose.model("Prudoct", prudoctSchema);
