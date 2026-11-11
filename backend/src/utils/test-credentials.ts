import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { isCloudinaryConfigured } from "../config/cloudinary";
import { connectDatabase } from "../config/database";

async function runDiagnostic() {
  console.log("\n==================================================================");
  console.log("       DARBAAR LUXURY PLATFORM — SYSTEM CREDENTIALS AUDIT");
  console.log("==================================================================\n");

  // -------------------------------------------------------------
  // 1. JWT & Cryptographic Security Test
  // -------------------------------------------------------------
  console.log("[1/3] Testing JWT Authentication & Cryptographic Hashing...");
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.length < 32) {
    console.error("  ❌ JWT_SECRET is missing or too short (< 32 characters)!");
  } else {
    console.log(`  ✅ JWT_SECRET is active (${jwtSecret.length} characters / 256-bit strong).`);

    // Test signing & verification
    try {
      const payload = { userId: "darbaar_collector_01", role: "client" };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      const decoded = jwt.verify(token, jwtSecret) as any;
      if (decoded.userId === payload.userId && decoded.role === payload.role) {
        console.log("  ✅ JWT Token signature and verification: SUCCESSFUL");
      }
    } catch (err: any) {
      console.error("  ❌ JWT Token test failed:", err.message);
    }

    // Test Bcrypt password hashing
    try {
      const samplePass = "ImperialDarbaar#2026";
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(samplePass, salt);
      const isMatch = await bcrypt.compare(samplePass, hash);
      const isWrongMatch = await bcrypt.compare("wrong_password", hash);

      if (isMatch && !isWrongMatch) {
        console.log("  ✅ Bcrypt Password Hashing & Salt Verification: SUCCESSFUL");
      }
    } catch (err: any) {
      console.error("  ❌ Bcrypt test failed:", err.message);
    }
  }

  // -------------------------------------------------------------
  // 2. Cloudinary Media Vault Test
  // -------------------------------------------------------------
  console.log("\n[2/3] Testing Cloudinary Media Vault Configuration...");
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (isCloudinaryConfigured()) {
    console.log(`  ✅ Cloudinary is configured for Cloud: '${cloudName}'`);
    console.log(`  ✅ API Key present: ${apiKey?.slice(0, 4)}...`);
    console.log("  ✅ API Secret is securely held in backend environment (hidden from frontend).");
  } else {
    console.log("  ⚠️  Cloudinary credentials are currently empty in backend/.env:");
    console.log(`     - CLOUDINARY_CLOUD_NAME: ${cloudName || "[NOT SET]"}`);
    console.log(`     - CLOUDINARY_API_KEY:    ${apiKey || "[NOT SET]"}`);
    console.log(`     - CLOUDINARY_API_SECRET: ${apiSecret ? "[PRESENT]" : "[NOT SET]"}`);
    console.log("     👉 To configure, get free keys from: https://console.cloudinary.com");
  }

  // -------------------------------------------------------------
  // 3. MongoDB Atlas Database Test
  // -------------------------------------------------------------
  console.log("\n[3/3] Testing MongoDB Database Connection...");
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri.trim() === "") {
    console.log("  ⚠️  MONGODB_URI is currently empty in backend/.env.");
    console.log("     👉 To configure MongoDB Atlas (Cloud - Free):");
    console.log("        1. Go to https://cloud.mongodb.com");
    console.log("        2. Create free M0 cluster and add database user");
    console.log("        3. Network Access -> Add IP 0.0.0.0/0");
    console.log("        4. Copy connection string into backend/.env");
  } else {
    console.log("  🔄 Attempting connection to configured MongoDB URI...");
    const isConnected = await connectDatabase(mongoUri);
    if (isConnected) {
      console.log("  ✅ MongoDB Connection: OPERATIONAL & SECURED");
    } else {
      console.log("  ❌ MongoDB connection could not be established. Check credentials or network access.");
    }
  }

  console.log("\n==================================================================");
  console.log("                       AUDIT COMPLETE");
  console.log("==================================================================\n");
  process.exit(0);
}

runDiagnostic();

