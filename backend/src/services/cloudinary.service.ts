import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { Readable } from "stream";
import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary";

export interface ArtworkUploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  createdAt: string;
}

/**
 * Uploads an artwork buffer securely to Cloudinary Media Vault
 */
export async function uploadArtworkBuffer(
  buffer: Buffer,
  folder: string = "darbaar/artworks"
): Promise<ArtworkUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary credentials are not configured in backend/.env. Please specify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        quality: "auto:best",
        fetch_format: "auto",
        use_filename: false,
        unique_filename: true,
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed without specific response"));
        }

        resolve({
          publicId: result.public_id,
          url: result.url,
          secureUrl: result.secure_url,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          createdAt: result.created_at,
        });
      }
    );

    // Stream buffer into Cloudinary upload stream using Node.js stream
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}

/**
 * Deletes an artwork or asset photograph from Cloudinary Media Vault by publicId
 */
export async function deleteArtworkImage(publicId: string): Promise<{ success: boolean; result: string }> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary credentials are not configured in backend/.env.");
  }

  const res = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  return {
    success: res.result === "ok",
    result: res.result,
  };
}
