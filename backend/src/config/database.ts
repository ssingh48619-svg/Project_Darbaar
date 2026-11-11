import mongoose from "mongoose";

export async function connectDatabase(uri?: string): Promise<boolean> {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn("[DARBAAR] No MONGODB_URI provided. Running without active database connection.");
    return false;
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    console.log("[DARBAAR] Connecting to MongoDB...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[DARBAAR] Connected securely to MongoDB database: ${mongoose.connection.name}`);
    return true;
  } catch (error: any) {
    console.error("[DARBAAR] MongoDB connection error:", error.message || error);
    return false;
  }
}
