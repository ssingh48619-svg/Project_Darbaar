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
    const masterPasswordHash = await bcrypt.hash("1234@Darbaar", salt);

    const masterAdmin = await User.create({
      fullName: "DARBAAR Directorate (Master)",
      email: "darbaar3001@gmail.com",
      passwordHash: masterPasswordHash,
      role: "admin",
      isKycVerified: true,
      preferredCurrency: "INR",
      preferredSalon: "Mumbai",
      phone: "+91 98765 00000",
    });

    const adminUser = await User.create({
      fullName: "Curatorial Directorate",
      email: "admin@darbaar.luxury",
      passwordHash: masterPasswordHash,
      role: "admin",
      isKycVerified: true,
      preferredCurrency: "USD",
      preferredSalon: "Geneva",
      phone: "+91 98765 00001",
    });

    const collectorUser = await User.create({
      fullName: "Maharaja Collector",
      email: "collector@darbaar.luxury",
      passwordHash: masterPasswordHash,
      role: "client",
      isKycVerified: true,
      preferredCurrency: "USD",
      preferredSalon: "London",
      phone: "+91 98765 11111",
    });

    console.log(`[DARBAAR] Seeded 3 Users: darbaar3001@gmail.com, admin@darbaar.luxury, collector@darbaar.luxury (Password: 1234@Darbaar)`);

    // 3. Seed Curated Assets matching Asset schema
    const demoAssets = [
      {
        slug: "patek-philippe-perpetual-calendar-chronograph-3970",
        title: "Perpetual Calendar Chronograph in 18k Pink Gold",
        makerOrArtist: "Patek Philippe",
        year: "1991",
        category: "timepieces",
        categoryLabel: "Rare Timepieces",
        referenceNumber: "Ref. 3970E-002",
        dimensionsOrSpecs: "36mm Case, Calibre CH 27-70 Q, 24-Hour Indicator",
        conditionSummary: "Pristine, crisp hallmarks with factory geometry intact",
        provenanceSummary: "Single-owner private Swiss collection, complete with archive certificate",
        provenanceStatus: "Archival Verified",
        valuationMinUSD: 145000,
        valuationMaxUSD: 175000,
        isFeatured: true,
        isPrivateSale: false,
        isDemonstration: true,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
        galleryImages: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
        ],
        summary:
          "An immaculate demonstration exemplar of late-20th-century Haute Horlogerie, combining a perpetual calendar with column-wheel chronograph. Housed in warm 18-carat pink gold with double stepped lugs.",
        historicalContext:
          "Introduced in 1986 to succeed the legendary Reference 2499, the 3970 represents the golden era of neo-vintage complications. Preserved with unpolished case bevels and deep Swiss gold hallmarks on the reverse of the lugs.",
        specimenDetails: {
          conditionScorecard: {
            overallGrade: "Grade I (Exceptional Museum Grade)",
            preservationScore: 98,
            caseOrSupport: "18k Rose Gold, zero mechanical polishing, all 4 lug hallmarks razor-sharp",
            dialOrSurface: "Original opaline-silver dial with applied pink gold baton hour markers",
            movementOrStructure: "Calibre CH 27-70 Q, adjusted to heat/cold and isochronism, amplitude 298°",
            originalityRating: "100% Period-Correct Components, original signed buckle and presentation box",
            inspectionLocation: "Geneva Free Port Vault Inspection Chamber",
          },
          provenanceTimeline: [
            {
              year: "1991",
              location: "Geneva, Switzerland",
              description: "Commissioned and acquired from official Geneva boutique.",
              documentationType: "Original Certificate of Origin & Bill of Sale",
              isVerified: true,
            },
            {
              year: "2012",
              location: "Zurich, Switzerland",
              description: "Recorded in private Swiss horological trust inventory.",
              documentationType: "Patek Philippe Extract from the Archives",
              isVerified: true,
            },
            {
              year: "2024",
              location: "DARBAAR Inspection Vault",
              description: "Physical inspection and condition verification completed.",
              documentationType: "Independent Specialist Condition Dossier",
              isVerified: true,
            },
          ],
          independentInspector: "Cabinet d'Horlogerie Ancienne, Geneva",
          inspectionDate: "14 October 2024",
          dossierReference: "DARBAAR-CHA-GVA-9921",
          availableReports: [
            "Full Calibre Micro-Photography Assessment",
            "Archive Extract Verification (Patek Philippe)",
            "Spectrometric Alloy Purity Certificate",
          ],
        },
        createdBy: adminUser._id,
      },
      {
        slug: "fp-journe-chronometre-a-resonance-platinum",
        title: "Chronomètre à Résonance Dual Resonance in Platinum",
        makerOrArtist: "F.P. Journe",
        year: "2004",
        category: "timepieces",
        categoryLabel: "Rare Timepieces",
        referenceNumber: "Calibre 1499.2",
        dimensionsOrSpecs: "38mm Case, 18k Rose Gold Movement, Dual Symmetrical Dials",
        conditionSummary: "Flawless unpolished platinum case, warm rose gold movement patina",
        provenanceSummary: "Acquired directly from early private Geneva collection; original brass-era box",
        provenanceStatus: "Private Estate",
        valuationMinUSD: 290000,
        valuationMaxUSD: 340000,
        isFeatured: true,
        isPrivateSale: false,
        isDemonstration: true,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
        galleryImages: [
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
        ],
        summary:
          "A masterpiece of contemporary horological chronometry utilizing the physical phenomenon of resonance through two balance wheels beating in natural synchronization.",
        historicalContext:
          "First manufactured in 2000, the early 38mm brass-movement iterations are among the most revered independent creations of the 21st century.",
        specimenDetails: {
          conditionScorecard: {
            overallGrade: "Grade I (Flawless Preservation)",
            preservationScore: 97,
            caseOrSupport: "Platinum 950, 38mm case diameter, pristine hallmarks and original crown",
            dialOrSurface: "Dual white gold dials with guilloché centers, blued steel hands",
            movementOrStructure: "Calibre 1499.2 in solid 18k rose gold, dual resonance synchronization verified",
            originalityRating: "100% Factory Correct, complete with wooden presentation case and warranty card",
            inspectionLocation: "Zurich Private Deposit Vault",
          },
          provenanceTimeline: [
            {
              year: "2004",
              location: "Geneva, Switzerland",
              description: "Direct atelier delivery to European private patron.",
              documentationType: "Original F.P. Journe Warranty Certificate",
              isVerified: true,
            },
            {
              year: "2024",
              location: "DARBAAR Inspection Facility",
              description: "Complete resonance amplitude verification and movement service check.",
              documentationType: "Horological Laboratory Diagnostic Report",
              isVerified: true,
            },
          ],
          independentInspector: "Swiss Independent Watchmaking Institute",
          inspectionDate: "02 November 2024",
          dossierReference: "DARBAAR-SIWI-ZRH-8832",
          availableReports: [
            "Harmonic Resonance Synchronization Certificate",
            "Atelier Origin Verification",
            "High-Resolution Micro-Radiography",
          ],
        },
        createdBy: adminUser._id,
      },
      {
        slug: "coronation-durbar-maharana-fateh-singh",
        title: "The Royal Coronation Durbar of Udaipur (Demonstration Catalog)",
        makerOrArtist: "Attributed to Master Painter Shivalal of Udaipur",
        year: "1894",
        category: "fine-art",
        categoryLabel: "Fine Art & Paintings",
        referenceNumber: "DARBAAR-FA-MEW-1894",
        dimensionsOrSpecs: "112 cm × 178 cm (Framed: 135 cm × 201 cm)",
        conditionSummary: "Museum grade; luminous mineral pigments with raised gold foil intact",
        provenanceSummary: "Royal Court of Mewar until 1952; private London family trust; private acquisition",
        provenanceStatus: "Palace Heritage",
        valuationMinUSD: 450000,
        valuationMaxUSD: 620000,
        isFeatured: true,
        isPrivateSale: false,
        isDemonstration: true,
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
        galleryImages: [
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
        ],
        summary:
          "A monumental royal court composition executed on burnished wasli paper with pure gold leaf and lapis lazuli pigments, capturing the regal ceremonial grandeur of the Mewar Durbar.",
        historicalContext:
          "Commissioned to commemorate the state assembly of 1894. The painting documents the intricate hierarchy of nobles, royal regalia, and ceremonial courtesies.",
        specimenDetails: {
          conditionScorecard: {
            overallGrade: "Grade I (Imperial Museum Condition)",
            preservationScore: 95,
            caseOrSupport: "Multi-layered handmade wasli paper, minimal edge discoloration, zero tears",
            dialOrSurface: "Natural gouache and gold leaf, no flaking, vivid mineral luminescence",
            movementOrStructure: "Archival teak backing with museum-grade UV-filtering museum glass",
            originalityRating: "100% Original late-19th-century court pigments and gold leaf application",
            inspectionLocation: "London Mayfair Conservation Laboratory",
          },
          provenanceTimeline: [
            {
              year: "1894",
              location: "Udaipur, Rajasthan",
              description: "Court commission for the Royal Palace Toshakhana archives.",
              documentationType: "Palace Inventory Register Entry",
              isVerified: true,
            },
            {
              year: "1952",
              location: "London, United Kingdom",
              description: "Transferred to private British diplomatic collection.",
              documentationType: "Diplomatic Export Certificate",
              isVerified: true,
            },
            {
              year: "2024",
              location: "DARBAAR London Curatorial Salon",
              description: "Pigment spectroscopy and archival documentation verified.",
              documentationType: "Art Conservation Laboratory Dossier",
              isVerified: true,
            },
          ],
          independentInspector: "British Institute of Fine Art Preservation",
          inspectionDate: "18 September 2024",
          dossierReference: "DARBAAR-BIAP-LDN-4421",
          availableReports: [
            "Pigment Raman Spectroscopy Analysis",
            "Wasli Paper Carbon Verification",
            "Archival Provenance Chain Dossier",
          ],
        },
        createdBy: adminUser._id,
      },
    ];

    await Asset.insertMany(demoAssets);
    console.log(`[DARBAAR] Successfully seeded ${demoAssets.length} Curatorial Demonstration Assets!`);

    console.log("\n[DARBAAR] ✅ Database seeding finished successfully into MongoDB Atlas!");
    process.exit(0);
  } catch (error) {
    console.error("[DARBAAR] Seed failed with error:", error);
    process.exit(1);
  }
}

runSeed();
