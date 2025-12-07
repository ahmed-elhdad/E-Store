import Router from "express";
import { add, edit, get, remove } from "../controllers/reviews.controllers.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: Reviews management endpoints
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: prudoctId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to fetch reviews for
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       text:
 *                         type: string
 *       301:
 *         description: Valid ID required
 *       404:
 *         description: Product not found or prudoctId required
 *       501:
 *         description: Server error
 */
router.get("/reviews", get);

/**
 * @swagger
 * /api/v1/reviews/new:
 *   post:
 *     summary: Add a new review to a product
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prudoctId
 *               - userId
 *               - text
 *             properties:
 *               prudoctId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               userId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *               text:
 *                 type: string
 *                 example: "Great product! Highly recommend."
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Add successfully"
 *       301:
 *         description: Valid IDs and text are required
 *       404:
 *         description: User or product not found
 *       501:
 *         description: Server error
 */
router.post("/new", add);

/**
 * @swagger
 * /api/v1/reviews/edit/{id}:
 *   put:
 *     summary: Edit an existing review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - prudoctId
 *               - reviewId
 *               - text
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *               prudoctId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               reviewId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439013"
 *               text:
 *                 type: string
 *                 example: "Updated review text"
 *     responses:
 *       201:
 *         description: Review edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "review edited successfully"
 *       301:
 *         description: Valid IDs required or user/review not found
 *       404:
 *         description: Unauthorized - you can't edit this review
 *       501:
 *         description: Server error
 */
router.put("/edit/:id", edit);

/**
 * @swagger
 * /api/v1/reviews/remove/{id}:
 *   delete:
 *     summary: Remove a review from a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID to remove
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - prudoctId
 *               - reviewId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *               prudoctId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               reviewId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439013"
 *     responses:
 *       201:
 *         description: Review removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "removed successfully"
 *       301:
 *         description: Valid IDs required or user/review not found
 *       404:
 *         description: Unauthorized - you can't delete this review
 *       501:
 *         description: Server error
 */
router.delete("/remove/:id", remove);

export default router;
