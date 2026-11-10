import mongoose from "mongoose";

export async function connectDatabase(uri?: string): Promise<boolean> {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn("[DARBAAR] No MONGODB_URI provided in .env. Running without active database connection.");
    return false;
  }

  try {
    console.log("[DARBAAR] Connecting to MongoDB...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[DARBAAR] Connected securely to MongoDB database: ${mongoose.connection.name}`);
    return true;
  } catch (error: any) {
    console.error("[DARBAAR] MongoDB connection error:", error.message || error);
    console.warn("[DARBAAR] Tip: If using MongoDB Atlas, check that 'Network Access' allows 0.0.0.0/0 and your username/password are correct.");
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    return false;
  }
}
