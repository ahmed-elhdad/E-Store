import express from "express";
import {
  addPrudoct,
  editPrudoct,
  getCart,
  removeCart,
  removePrudoct,
} from "../controllers/cart.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// All cart routes require authentication
router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addPrudoct);
router.put("/update", verifyToken, editPrudoct);
router.delete("/remove", verifyToken, removePrudoct);
router.delete("/clear", verifyToken, removeCart);

export default router;
