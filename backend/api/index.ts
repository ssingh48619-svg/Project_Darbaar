import dotenv from "dotenv";
dotenv.config();

import { createApp } from "../src/app";
import { connectDatabase } from "../src/config/database";
import { configureCloudinary } from "../src/config/cloudinary";

const app = createApp();

configureCloudinary();

let isConnected = false;
app.use(async (_req, _res, next) => {
  if (!isConnected && process.env.MONGODB_URI) {
    try {
      await connectDatabase(process.env.MONGODB_URI);
      isConnected = true;
    } catch (err: any) {
      console.warn("[Vercel Serverless] Database connection notice:", err.message);
    }
  }
  next();
});

export default app;
