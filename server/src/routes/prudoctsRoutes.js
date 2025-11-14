import express from "express";
import {
  createPrudoct,
  editPrudoct,
  getPrudocts,
  removePrudoct,
} from "../controllers/prudoctsControllers.js";
const router = express.Router();
router.post("/createPrudoct", createPrudoct);
router.put("/editPrudoct", editPrudoct);
router.get("prudocts", getPrudocts);
router.post("/removePrudoct", removePrudoct);
export default router;
