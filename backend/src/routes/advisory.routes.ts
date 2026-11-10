import { Router } from "express";
import {
  createAdvisoryRequest,
  getMyAdvisoryRequests,
  getAllAdvisoryRequests,
} from "../controllers/advisory.controller";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { CreateAdvisorySchema } from "../validators/advisory.validator";

const router = Router();

// Submit advisory request
router.post("/", validate(CreateAdvisorySchema), createAdvisoryRequest);

// Client's mandates
router.get("/my", authenticate, getMyAdvisoryRequests);

// Admin oversight
router.get("/", authenticate, authorize("admin", "advisor"), getAllAdvisoryRequests);

export default router;
