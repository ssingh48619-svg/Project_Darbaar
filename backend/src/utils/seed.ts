import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/database";
import { User } from "../models/User";
import { Asset } from "../models/Asset";

async function runSeed() {
  console.log("[DARBAAR] Initializing Database Master Setup...");

  const isConnected = await connectDatabase();
  if (!isConnected) {
    console.error("[DARBAAR] Cannot seed: Database not connected. Please check MONGODB_URI in backend/.env");
    process.exit(1);
  }

  try {
    // 1. Purge legacy demo users and mock demonstration items
    console.log("[DARBAAR] Purging mock/demonstration records...");
    await Asset.deleteMany({ isDemonstration: true });
    await User.deleteMany({
      email: { $in: ["admin@darbaar.luxury", "collector@darbaar.luxury"] },
    });

    // 2. Ensure Master Superadmin exists with provided credentials
    const salt = await bcrypt.genSalt(10);
    const masterPasswordHash = await bcrypt.hash("1234@Darbaar", salt);

    const masterEmail = "darbaar3001@gmail.com";
    let masterAdmin = await User.findOne({ email: masterEmail });

    if (masterAdmin) {
      masterAdmin.fullName = "DARBAAR Directorate (Master)";
      masterAdmin.passwordHash = masterPasswordHash;
      masterAdmin.role = "admin";
      masterAdmin.isKycVerified = true;
      masterAdmin.preferredCurrency = "INR";
      await masterAdmin.save();
      console.log(`[DARBAAR] Master account verified & updated: ${masterEmail}`);
    } else {
      masterAdmin = await User.create({
        fullName: "DARBAAR Directorate (Master)",
        email: masterEmail,
        passwordHash: masterPasswordHash,
        role: "admin",
        isKycVerified: true,
        preferredCurrency: "INR",
        preferredSalon: "Mumbai",
        phone: "+91 98765 00000",
      });
      console.log(`[DARBAAR] Created Master Superadmin account: ${masterEmail}`);
    }

    const totalUsers = await User.countDocuments();
    const totalAssets = await Asset.countDocuments();

    console.log(`[DARBAAR] Master verification complete.`);
    console.log(`- Registered Users in Database: ${totalUsers}`);
    console.log(`- Curated Assets in Database: ${totalAssets} (Awaiting genuine additions via /admin)`);

    process.exit(0);
  } catch (err: any) {
    console.error("[DARBAAR] Setup failed:", err.message);
    process.exit(1);
  }
}

runSeed();
