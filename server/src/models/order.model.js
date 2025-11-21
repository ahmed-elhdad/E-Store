import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
  items: [],
  total_price: {
    type: Number,
    required: true,
    default: 0,
  },
});
export default mongoose.model("Order", orderSchema);
