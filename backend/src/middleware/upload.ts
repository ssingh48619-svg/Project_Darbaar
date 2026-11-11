import multer from "multer";
import { Request } from "express";

// Store in memory as Buffer for direct streaming to Cloudinary
const storage = multer.memoryStorage();

// Allowed MIME types for museum-grade artwork and asset photographs
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const uploadArtworkMiddleware = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1, // 1 file per upload request
  },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error(
          `Unsupported file format: ${file.mimetype}. DARBAAR accepts only JPEG, PNG, and WebP artwork plates.`
        )
      );
    }
  },
});

