import { Router } from "express";
import { getMyCollection, addToCollection } from "../controllers/collection.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/my", getMyCollection);
router.post("/items", addToCollection);

export default router;
