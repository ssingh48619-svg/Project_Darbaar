import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/database";
import { User } from "../models/User";
import { Asset } from "../models/Asset";

async function runSeed() {
  console.log("[DARBAAR] Initializing Database Seeding...");

  const isConnected = await connectDatabase();
  if (!isConnected) {
    console.error("[DARBAAR] Cannot seed: Database not connected. Please check MONGODB_URI in backend/.env");
    process.exit(1);
  }

  try {
    // 1. Clear existing demonstration records
    console.log("[DARBAAR] Clearing prior demonstration records...");
    await User.deleteMany({});
    await Asset.deleteMany({});

    // 2. Seed Users
    const salt = await bcrypt.genSalt(10);
    const demoPasswordHash = await bcrypt.hash("Darbaar@2026", salt);

    const adminUser = await User.create({
      firstName: "Curatorial",
      lastName: "Directorate",
      email: "admin@darbaar.luxury",
      password: demoPasswordHash,
      role: "admin",
      isVerified: true,
      kycStatus: "approved",
      preferredCurrency: "USD",
      phone: "+91 98765 00000",
    });

    const collectorUser = await User.create({
      firstName: "Maharaja",
      lastName: "Collector",
      email: "collector@darbaar.luxury",
      password: demoPasswordHash,
      role: "client",
      isVerified: true,
      kycStatus: "approved",
      preferredCurrency: "USD",
      phone: "+91 98765 11111",
    });

    console.log(`[DARBAAR] Seeded 2 Users: admin@darbaar.luxury, collector@darbaar.luxury (Password: Darbaar@2026)`);

    // 3. Seed Curated Assets
    const demoAssets = [
      {
        title: "The Coronation Durbar of Maharana Fateh Singh (Demonstration Catalog)",
        subtitle: "A monumental archival tempera and gold leaf composition depicting the Mewar court ceremony",
        department: "fine-art",
        category: "Historical Painting",
        origin: "Udaipur, Rajasthan",
        year: 1894,
        period: "Late 19th Century",
        medium: "Natural pigments and gold leaf on hand-burnished wasli paper",
        dimensions: { height: 112, width: 178, unit: "cm" },
        indicativeValuation: { min: 450000, max: 620000, currency: "USD" },
        curatorialStatus: "curated",
        availability: "private-treaty",
        provenanceStatus: "verified",
        provenanceSummary: "Preserved in private Mewar estate collection until 1974; acquired by private Geneva collector; documented in 1989 Royal Court Retrospective.",
        conditionScore: 94,
        conditionSummary: "Exceptional museum-grade preservation. Pure gold leaf retains high luminescence with zero flaking.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1600",
            caption: "Primary archival plate",
            isPrimary: true,
          },
        ],
        salonLocation: "Geneva",
        createdBy: adminUser._id,
      },
      {
        title: "Reference 2499 Perpetual Calendar Chronograph (Demonstration Catalog)",
        subtitle: "Third Series in 18k Yellow Gold with moon phases and archival extract",
        department: "timepieces",
        category: "Haute Horlogerie",
        origin: "Geneva, Switzerland",
        year: 1972,
        period: "Vintage Mechanical Era",
        medium: "18k Yellow Gold, Caliber 13''' manual-wind movement, Silvered opaline dial",
        dimensions: { height: 37.5, width: 37.5, depth: 13, unit: "mm" },
        indicativeValuation: { min: 850000, max: 1200000, currency: "USD" },
        curatorialStatus: "curated",
        availability: "private-treaty",
        provenanceStatus: "verified",
        provenanceSummary: "Commissioned by European industrial dynasty in 1972; preserved unworn in vault; accompanied by Patek Philippe Archival Extract.",
        conditionScore: 98,
        conditionSummary: "Crisp hallmarks on lugs, unpolished case edges, mint opaline dial with raised hard enamel lettering.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1600",
            caption: "Dial and bezel specimen view",
            isPrimary: true,
          },
        ],
        salonLocation: "London",
        createdBy: adminUser._id,
      },
      {
        title: "The Royal Toshakhana Emerald-Hilted Peshkabz (Demonstration Catalog)",
        subtitle: "Ceremonial court dagger forged in Wootz crucible steel with single carved Colombian emerald pommel",
        department: "collectibles",
        category: "Royal Armory",
        origin: "Hyderabad Deccan",
        year: 1740,
        period: "18th Century Asaf Jahi Dynasty",
        medium: "Damascus crystalline wootz steel, carved natural emerald, pure gold inlay",
        dimensions: { height: 38, width: 5.2, unit: "cm" },
        indicativeValuation: { min: 650000, max: 900000, currency: "USD" },
        curatorialStatus: "curated",
        availability: "private-treaty",
        provenanceStatus: "archived",
        provenanceSummary: "Listed in the 1898 Hyderabad Treasury inventory; presented as diplomatic gift in 1911; private Swiss trust.",
        conditionScore: 91,
        conditionSummary: "Crystalline steel water pattern intact without oxidation. Emerald hilt unblemished.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&q=80&w=1600",
            caption: "Wootz blade and emerald pommel",
            isPrimary: true,
          },
        ],
        salonLocation: "New York",
        createdBy: adminUser._id,
      },
    ];

    await Asset.insertMany(demoAssets);
    console.log(`[DARBAAR] Successfully seeded ${demoAssets.length} Curatorial Demonstration Assets!`);

    console.log("\n[DARBAAR] ✅ Database seeding finished successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[DARBAAR] Seed failed with error:", error);
    process.exit(1);
  }
}

runSeed();

