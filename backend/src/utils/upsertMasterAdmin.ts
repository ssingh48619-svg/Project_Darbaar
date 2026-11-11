import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/database";
import { User } from "../models/User";

async function upsertMaster() {
  console.log("[DARBAAR] Upserting Master Superadmin Account...");
  const isConnected = await connectDatabase();
  if (!isConnected) {
    console.error("[DARBAAR] Cannot connect to MongoDB Atlas.");
    process.exit(1);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("1234@Darbaar", salt);

    // Upsert primary owner/directorate account
    const masterEmail = "darbaar3001@gmail.com";
    let user = await User.findOne({ email: masterEmail });

    if (user) {
      user.passwordHash = passwordHash;
      user.role = "admin";
      user.isKycVerified = true;
      user.fullName = "DARBAAR Directorate (Master)";
      await user.save();
      console.log(`[DARBAAR] Existing master account updated: ${masterEmail}`);
    } else {
      user = await User.create({
        fullName: "DARBAAR Directorate (Master)",
        email: masterEmail,
        passwordHash,
        role: "admin",
        isKycVerified: true,
        preferredCurrency: "INR",
        preferredSalon: "Mumbai",
        phone: "+91 98765 00000",
      });
      console.log(`[DARBAAR] Created new master superadmin account: ${masterEmail}`);
    }

    // Also sync admin@darbaar.luxury with same password for backward compatibility
    const legacyAdmin = await User.findOne({ email: "admin@darbaar.luxury" });
    if (legacyAdmin) {
      legacyAdmin.passwordHash = passwordHash;
      legacyAdmin.role = "admin";
      legacyAdmin.isKycVerified = true;
      await legacyAdmin.save();
      console.log("[DARBAAR] Synced legacy admin@darbaar.luxury account.");
    }

    console.log("[DARBAAR] Master account setup verified!");
    console.log("Credentials:");
    console.log(`Email: ${masterEmail}`);
    console.log("Password hash stored safely in MongoDB Atlas.");
    process.exit(0);
  } catch (err: any) {
    console.error("[DARBAAR] Upsert failed:", err.message);
    process.exit(1);
  }
}

upsertMaster();

