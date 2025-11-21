import express from "express";
import {
  addPrudoctToWishList,
  getWishList,
  removePrudoctFromWishList,
} from "../controllers/wishList.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// All wishlist routes require authentication
router.get("/", verifyToken, getWishList);
router.post("/add", verifyToken, addPrudoctToWishList);
router.delete("/remove", verifyToken, removePrudoctFromWishList);

export default router;
