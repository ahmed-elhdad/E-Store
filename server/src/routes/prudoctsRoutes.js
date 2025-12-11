import express from "express";
import {
  createPrudoct,
  editPrudoct,
  getPrudoct,
  getPrudocts,
  removePrudoct,
} from "../controllers/prudocts.controllers.js";
import verifyToken from "../middleware/verifyToken.js";
import { uploadProductImages } from "../config/multer.config.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/v1/prudocts:
 *   get:
 *     summary: Get all products or filter by category
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category (optional)
 *         example: tech
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/", getPrudocts);

/**
 * @swagger
 * /api/v1/prudocts/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", getPrudoct);

/**
 * @swagger
 * /api/v1/prudocts:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - nested_category
 *               - images
 *               - price
 *               - saler
 *               - quantity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Laptop
 *               description:
 *                 type: string
 *                 example: High-performance laptop
 *               category:
 *                 type: string
 *                 example: tech
 *                nested_category:
 *                  type: string
 *                 example: tech
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product images (up to 10 files)
 *               price:
 *                 type: number
 *                 example: 999.99
 *               saler:
 *                 type: string
 *                 format: email
 *                 example: seller@example.com
 *               quantity:
 *                 type: number
 *                 example: 50
 *               prudoctNo:
 *                 type: number
 *                 example: 12345
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Product already exists
 */
router.post("/", verifyToken, uploadProductImages, createPrudoct);

/**
 * @swagger
 * /api/v1/prudocts/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Additional product images
 *               price:
 *                 type: number
 *               saler:
 *                 type: string
 *                 format: email
 *               quantity:
 *                 type: number
 *               prudoctNo:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.put("/:id", verifyToken, uploadProductImages, editPrudoct);

/**
 * @swagger
 * /api/v1/prudocts/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete("/:id", verifyToken, removePrudoct);

export default router;
