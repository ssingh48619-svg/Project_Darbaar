import dotenv from "dotenv";
dotenv.config();

import { createApp } from "../src/app";
import { connectDatabase } from "../src/config/database";
import { configureCloudinary } from "../src/config/cloudinary";

configureCloudinary();
const app = createApp();

export default async function handler(req: any, res: any) {
  await connectDatabase(process.env.MONGODB_URI);
  return app(req, res);
}
