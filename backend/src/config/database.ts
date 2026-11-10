import mongoose from "mongoose";

export async function connectDatabase(uri?: string): Promise<void> {
  const mongoUri = uri || process.env.MONGODB_URI || "mongodb://localhost:27017/darbaar";
  try {
    await mongoose.connect(mongoUri);
    console.log(`[DARBAAR] Connected securely to MongoDB database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("[DARBAAR] MongoDB connection failed:", error);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
}

