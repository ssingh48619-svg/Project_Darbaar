import { Router, Request, Response, NextFunction } from "express";
import { uploadArtwork, deleteArtwork } from "../controllers/upload.controller";
import { authenticate, authorize } from "../middleware/auth";
import { uploadArtworkMiddleware } from "../middleware/upload";
import multer from "multer";

const router = Router();

// Wrap multer to capture file size or format errors cleanly
function handleMulterErrors(req: Request, res: Response, next: NextFunction) {
  uploadArtworkMiddleware.single("image")(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({
          success: false,
          error: "File size exceeds 10MB limit. Please compress high-resolution plate.",
        });
        return;
      }
      res.status(400).json({ success: false, error: err.message });
      return;
    } else if (err) {
      res.status(400).json({ success: false, error: err.message });
      return;
    }
    next();
  });
}

// Upload artwork plate (Requires client/dealer/admin authentication)
router.post("/image", authenticate, handleMulterErrors, uploadArtwork);

// Purge artwork plate (Restricted to Curators, Advisors & Admins)
router.delete("/image/:publicId", authenticate, authorize("admin", "advisor", "dealer"), deleteArtwork);
router.delete("/image", authenticate, authorize("admin", "advisor", "dealer"), deleteArtwork);

export default router;

