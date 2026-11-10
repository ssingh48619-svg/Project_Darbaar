import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = createApp();

  if (process.env.MONGODB_URI) {
    await connectDatabase(process.env.MONGODB_URI);
  } else {
    console.warn("[DARBAAR] MONGODB_URI not set. Running in development demonstration mode.");
  }

  app.listen(PORT, () => {
    console.log(`[DARBAAR] Core API Service listening on port ${PORT}`);
    console.log(`[DARBAAR] Brand: DARBAAR — Where Heritage Meets Rarity`);
  });
}

bootstrap();

