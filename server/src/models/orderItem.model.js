import mongoose from "mongoose";
const orderItemSchema = mongoose.Schema({
  prudoct_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  prudoct_price: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
    default: 0,
  },
});
export default mongoose.model("Order_item", orderItemSchema);
