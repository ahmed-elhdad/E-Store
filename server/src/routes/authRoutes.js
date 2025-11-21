import express from "express";
const router = express.Router();
import {
  delUser,
  login,
  register,
  resetPassword,
  me,
  googleAuth,
  facebookAuth,
  updatePhoto,
} from "../controllers/auth.controllers.js";
import verifyToken from "../middleware/verifyToken.js";
import { uploadUserPhoto } from "../config/multer.config.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management endpoints
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: User profile photo (optional)
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 default: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
router.post("/register", uploadUserPhoto, register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/auth/resetPassword:
 *   post:
 *     summary: Reset password (send reset code)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Reset code sent to email
 *       400:
 *         description: Invalid email
 *       404:
 *         description: User not found
 */
router.post("/resetPassword", resetPassword);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - No token provided
 *       404:
 *         description: User not found
 */
router.get("/me", verifyToken, me);

/**
 * @swagger
 * /api/v1/auth/photo:
 *   put:
 *     summary: Update user profile photo
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: User profile photo
 *     responses:
 *       200:
 *         description: Photo updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/photo", verifyToken, uploadUserPhoto, updatePhoto);

/**
 * @swagger
 * /api/v1/auth/delUser:
 *   delete:
 *     summary: Delete user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID (optional, defaults to current user)
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Unauthorized to delete this user
 *       404:
 *         description: User not found
 */
router.delete("/delUser", verifyToken, delUser);

/**
 * @swagger
 * /api/v1/auth/google:
 *   post:
 *     summary: Google OAuth authentication
 *     tags: [Auth]
 *     description: Endpoint for Google OAuth callback
 *     responses:
 *       200:
 *         description: Google authentication successful
 */
router.post("/google", googleAuth);

/**
 * @swagger
 * /api/v1/auth/facebook:
 *   post:
 *     summary: Facebook OAuth authentication
 *     tags: [Auth]
 *     description: Endpoint for Facebook OAuth callback
 *     responses:
 *       200:
 *         description: Facebook authentication successful
 */
router.post("/facebook", facebookAuth);

export default router;
