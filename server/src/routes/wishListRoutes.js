import express from "express";
import {
  addPrudoctToWishList,
  getWishList,
  removePrudoctFromWishList,
} from "../controllers/wishList.controllers.js";
const router = express.Router();
router.get("/getList", getWishList);
router.post("/addPrudoctToList", addPrudoctToWishList);
router.delete("/removePrudoctFromList", removePrudoctFromWishList);
export default router;
