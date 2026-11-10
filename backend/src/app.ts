import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

export function createApp(): Application {
  const app: Application = express();

  // Security headers & CORS
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
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
      salons: ["Geneva", "London", "New York", "Singapore"],
    });
  });

  // Global Error Handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[DARBAAR API Error]:", err);
    res.status(500).json({
      error: "Internal Advisory Service Error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  });

  return app;
}

