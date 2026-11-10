import { Router } from "express";
import {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../controllers/asset.controller";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { CreateAssetSchema } from "../validators/asset.validator";

const router = Router();

router.get("/", getAssets);
router.get("/:id", getAssetById);
router.post("/", authenticate, authorize("admin", "advisor", "dealer"), validate(CreateAssetSchema), createAsset);
router.patch("/:id", authenticate, authorize("admin", "advisor"), updateAsset);
router.delete("/:id", authenticate, authorize("admin"), deleteAsset);

export default router;

