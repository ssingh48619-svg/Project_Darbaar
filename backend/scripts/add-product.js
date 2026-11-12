/**
 * DARBAAR — Direct Database Asset Inscriber
 * 
 * Usage:
 *   cd backend
 *   node scripts/add-product.js
 */

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://ssingh48619_db_user:LmnePvuftJGqa10T@ac-bvflyvr-shard-00-00.0ix10w9.mongodb.net:27017,ac-bvflyvr-shard-00-01.0ix10w9.mongodb.net:27017,ac-bvflyvr-shard-00-02.0ix10w9.mongodb.net:27017/darbaar?ssl=true&replicaSet=atlas-t6pgaj-shard-0&authSource=admin&compressors=zlib";

// =============================================================================
// YAHAN APNE PRODUCT KI DETAILS LIKHO:
// =============================================================================
const newProduct = {
  title: "Royal Mewar Ceremonial Khanda Sword",
  makerOrArtist: "Udaipur Royal Toshakhana Armory",
  year: "Circa 1750",
  category: "collectibles", // Options: "fine-art", "timepieces", "collectibles", "private-sales"
  categoryLabel: "Palace Toshakhana & Antiquities",
  referenceNumber: "DARBAAR-KHA-1750",
  dimensionsOrSpecs: "92cm Crucible Wootz Damascus Steel, 24k Gold Koftgari Basket Hilt",
  conditionSummary: "Pristine museum preservation, razor-sharp geometric blade with original jauhar pattern",
  provenanceSummary: "Preserved in private sovereign trust; documented in royal armory inventory register.",
  provenanceStatus: "Palace Heritage", // Options: "Palace Heritage", "Archival Verified", "Private Estate", "Documented"
  valuationMinUSD: 85000,   // Minimum valuation (USD) -> Website par INR me auto convert hoga
  valuationMaxUSD: 120000,  // Maximum valuation (USD)
  isFeatured: true,
  isPrivateSale: false,
  isDemonstration: false,   // Genuine live product
  image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1200&q=85",
  galleryImages: [
    "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1200&q=85",
  ],
  summary:
    "An exceptional sovereign court khanda forged from high-carbon crucible wootz steel. Adorned with 24-carat gold koftgari floral calligraphy along the reinforced spine and broad basket guard.",
  historicalContext:
    "Carried during ceremonial Darbaar assemblies under the reign of the Maharanas of Udaipur. Authenticated through non-invasive metallurgical analysis and court seal translation.",
  specimenDetails: {
    conditionScorecard: {
      overallGrade: "Grade I — Imperial Standard",
      preservationScore: 97,
      caseOrSupport: "Original gold koftgari overlay intact",
      dialOrSurface: "Authentic crystalline jauhar water pattern",
      movementOrStructure: "Crucible steel metallurgical integrity verified",
      originalityRating: "100% Period Authentic",
      inspectionLocation: "DARBAAR Mumbai Vault Suite",
    },
    provenanceTimeline: [
      {
        year: "1750",
        location: "Udaipur, Rajasthan",
        description: "Commissioned for the royal armory of Mewar.",
        documentationType: "Palace Toshakhana Ledger Entry",
        isVerified: true,
      },
    ],
    independentInspector: "DARBAAR Curatorial Directorate",
    inspectionDate: "Current Season",
    dossierReference: "DARBAAR-REF-KHA-1750",
    availableReports: ["Archival Metallurgical Dossier"],
  },
};

// =============================================================================
// DATABASE INSERTION LOGIC:
// =============================================================================
async function insertProduct() {
  console.log("Connecting to MongoDB Atlas...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully to database!");

    // Generate unique slug
    const slug = newProduct.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const productDocument = {
      ...newProduct,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await mongoose.connection.collection("assets").insertOne(productDocument);
    console.log("\n=======================================================");
    console.log("SUCCESS! Product inserted into MongoDB Atlas!");
    console.log("Inserted ID:", result.insertedId);
    console.log("Product Title:", newProduct.title);
    console.log("Category:", newProduct.category);
    console.log("Reference:", newProduct.referenceNumber);
    console.log("=======================================================\n");
    console.log("Yeh product ab live website par turant dikhne lagega!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Failed to insert product:", err);
    process.exit(1);
  }
}

insertProduct();

