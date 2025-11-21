import express from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  removeOrder,
  updateOrderStatus,
} from "../controllers/orders.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// All order routes require authentication
router.get("/", verifyToken, getOrders); // Get all orders for user
router.get("/:orderId", verifyToken, getOrder); // Get single order
router.post("/", verifyToken, createOrder); // Create order from cart (checkout)
router.put("/:orderId/status", verifyToken, updateOrderStatus); // Update order status (e.g., after payment)
router.delete("/:orderId", verifyToken, removeOrder); // Remove/cancel order

export default router;
