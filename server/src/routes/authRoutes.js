import express from "express";
const router = express.Router();
import {
  delUser,
  login,
  register,
  resetPassword,
} from "../controllers/authControllers.js";
router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword);
router.post("/delUser", delUser);

export default router;
