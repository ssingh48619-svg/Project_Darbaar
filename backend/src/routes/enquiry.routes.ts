import { Router } from "express";
import {
  createEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  updateEnquiryStatus,
} from "../controllers/enquiry.controller";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { CreateEnquirySchema } from "../validators/enquiry.validator";

const router = Router();

// Public / Guest / Client enquiry submission
router.post("/", validate(CreateEnquirySchema), createEnquiry);

// Client personal inquiries
router.get("/my", authenticate, getMyEnquiries);

// Curatorial Directorate / Admin inquiry management
router.get("/", authenticate, authorize("admin", "advisor"), getAllEnquiries);
router.patch("/:id", authenticate, authorize("admin", "advisor"), updateEnquiryStatus);

export default router;

