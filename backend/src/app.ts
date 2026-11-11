import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Route Imports
import authRoutes from "./routes/auth.routes";
import assetRoutes from "./routes/asset.routes";
import enquiryRoutes from "./routes/enquiry.routes";
import advisoryRoutes from "./routes/advisory.routes";
import collectionRoutes from "./routes/collection.routes";
import adminRoutes from "./routes/admin.routes";
import uploadRoutes from "./routes/upload.routes";

export function createApp(): Application {
  const app: Application = express();

  // Allowed origins (support both port 3000 and 3001)
  const allowedOrigins = [
    process.env.CORS_ORIGIN || "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3000",
  ];

  // Security headers & CORS
  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, true); // Dev-friendly permissive callback
        }
      },
      credentials: true,
    })
  );

  // Parsing & Logging
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser(process.env.COOKIE_SECRET || "darbaar-secret"));
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  // Health and System Check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "operational",
      house: "DARBAAR",
      tagline: "Where Heritage Meets Rarity",
      timestamp: new Date().toISOString(),
      salons: ["Geneva", "London", "New York", "Singapore", "Mumbai"],
    });
  });

  // REST API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/assets", assetRoutes);
  app.use("/api/enquiries", enquiryRoutes);
  app.use("/api/advisory", advisoryRoutes);
  app.use("/api/collections", collectionRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/upload", uploadRoutes);

  // 404 Handler for Unrecognized Corridors
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: "The requested curatorial corridor does not exist in DARBAAR.",
    });
  });

  // Global Error Handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[DARBAAR API Error]:", err);
    res.status(500).json({
      success: false,
      error: "Internal Advisory Service Error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  });

  return app;
}
const app = createApp();
export default app;
