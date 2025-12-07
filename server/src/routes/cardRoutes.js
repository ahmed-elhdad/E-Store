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

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Shopping cart endpoints (authenticated)
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 29.99
 *         product:
 *           type: object
 *           description: Populated product object or null
 *
 *     GetCartResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalPrice:
 *           type: number
 *           example: 59.98
 *         itemCount:
 *           type: integer
 *           example: 2
 *
 *     AddCartRequest:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         quantity:
 *           type: integer
 *           example: 1
 *
 *     UpdateCartRequest:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         quantity:
 *           type: integer
 *           description: Set to 0 to remove the item
 *           example: 3
 *
 *     RemoveCartRequest:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 */

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get authenticated user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartResponse'
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized - missing/invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/", verifyToken, getCart);

/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     summary: Add a product to the authenticated user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCartRequest'
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product added to cart successfully"
 *       400:
 *         description: Missing/invalid input or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or product not found
 *       500:
 *         description: Server error
 */
router.post("/add", verifyToken, addPrudoct);

/**
 * @swagger
 * /api/v1/cart/update:
 *   put:
 *     summary: Update product quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartRequest'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart updated successfully"
 *       400:
 *         description: Missing/invalid input or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or product not found / product not in cart
 *       500:
 *         description: Server error
 */
router.put("/update", verifyToken, editPrudoct);

/**
 * @swagger
 * /api/v1/cart/remove:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveCartRequest'
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product removed from cart successfully"
 *       400:
 *         description: Missing/invalid productId
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found or product not in cart
 *       500:
 *         description: Server error
 */
router.delete("/remove", verifyToken, removePrudoct);

/**
 * @swagger
 * /api/v1/cart/clear:
 *   delete:
 *     summary: Clear entire cart for authenticated user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart cleared successfully"
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/clear", verifyToken, removeCart);

export default router;
