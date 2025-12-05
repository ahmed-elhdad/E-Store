import Router from "express";
import { add, edit, get, remove } from "../controllers/reviews.controllers";
const router = Router();
router.get("/review/:id", get);
router.post("/add", add);
router.put("/edit/:id", edit);
router.delete("/remove/:id", remove);
export default router;
