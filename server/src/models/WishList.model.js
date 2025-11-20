import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
  prudoctId: {
    type: String,
    required: true,
  },
});
export default mongoose.model("WishList", wishListSchema);
