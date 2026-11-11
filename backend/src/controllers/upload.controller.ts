import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { uploadArtworkBuffer, deleteArtworkImage } from "../services/cloudinary.service";
import { isCloudinaryConfigured } from "../config/cloudinary";

export async function uploadArtwork(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No artwork file attached. Please provide an image file under the field name 'image'.",
      });
      return;
    }

    if (!isCloudinaryConfigured()) {
      res.status(503).json({
        success: false,
        error:
          "Cloudinary credentials are not configured in backend/.env. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
      });
      return;
    }

    const result = await uploadArtworkBuffer(req.file.buffer, "darbaar/artworks");

    res.status(201).json({
      success: true,
      message: "Artwork photograph successfully secured in DARBAAR Media Vault.",
      media: {
        publicId: result.publicId,
        url: result.secureUrl, // Always deliver secure HTTPS url to clients
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      },
    });
  } catch (err: any) {
    console.error("[DARBAAR Upload Error]:", err);
    res.status(500).json({
      success: false,
      error: "Failed to upload artwork photograph.",
      message: err.message || "Cloudinary media service encounter.",
    });
  }
}

export async function deleteArtwork(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const publicId = req.params.publicId || req.body.publicId || (req.query.publicId as string);

    if (!publicId) {
      res.status(400).json({
        success: false,
        error: "Missing publicId parameter for media purge.",
      });
      return;
    }

    if (!isCloudinaryConfigured()) {
      res.status(503).json({
        success: false,
        error: "Cloudinary credentials are not configured in backend/.env.",
      });
      return;
    }

    const result = await deleteArtworkImage(publicId);

    res.status(200).json({
      success: result.success,
      message: result.success
        ? "Artwork plate purged from DARBAAR Media Vault."
        : "Purge petition processed.",
      result: result.result,
    });
  } catch (err: any) {
    console.error("[DARBAAR Purge Error]:", err);
    res.status(500).json({
      success: false,
      error: "Unable to remove image from media vault.",
      message: err.message,
    });
  }
}

