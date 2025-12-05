import Router from "express";
import { add, edit, get, remove } from "../controllers/reviews.controllers";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Reviews management endpoints
 */
router.get("/reviews/:id", get);

/**
 * @swagger
 * /api/v1/reviews/:id:
 *   post:
 *     summary: get a review
 *     tags: [reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - prudoctId
 *               - reviewId
 *             properties:
 *               prudoctId:
 *                 type: string
 *                 example: John Doe
 *               reviewId:
 *                 type: string
 *     responses:
 *       301:
 *         description: Valid ID required
 *       404:
 *         description: prudcot not found
 *       201:
 *         description: success
 */
router.post("/add", add);
router.put("/edit/:id", edit);
router.delete("/remove/:id", remove);
export default router;
