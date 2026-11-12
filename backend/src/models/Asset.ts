import mongoose, { Document, Schema, Model } from "mongoose";

export type AssetCategoryType = "fine-art" | "timepieces" | "collectibles" | "private-sales";
export type ProvenanceStatusType = "Documented" | "Private Estate" | "Archival Verified" | "Palace Heritage";

export interface IProvenanceEvent {
  year: string;
  location: string;
  description: string;
  documentationType: string;
  isVerified: boolean;
}

export interface IConditionScorecard {
  overallGrade: string;
  preservationScore: number;
  caseOrSupport: string;
  dialOrSurface: string;
  movementOrStructure: string;
  originalityRating: string;
  inspectionLocation: string;
}

export interface IAsset extends Document {
  title: string;
  slug: string;
  makerOrArtist: string;
  year: string;
  category: AssetCategoryType;
  categoryLabel: string;
  referenceNumber: string;
  dimensionsOrSpecs: string;
  conditionSummary: string;
  provenanceSummary: string;
  provenanceStatus: ProvenanceStatusType;
  valuationMinUSD: number;
  valuationMaxUSD: number;
  isFeatured: boolean;
  isPrivateSale: boolean;
  isDemonstration: boolean;
  image: string;
  galleryImages: string[];
  summary: string;
  historicalContext: string;
  specimenDetails: {
    conditionScorecard: IConditionScorecard;
    provenanceTimeline: IProvenanceEvent[];
    independentInspector: string;
    inspectionDate: string;
    dossierReference: string;
    availableReports: string[];
  };
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>(
  {
    title: {
      type: String,
      required: [true, "Asset title is required"],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    makerOrArtist: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    year: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["fine-art", "timepieces", "collectibles", "private-sales"],
      required: true,
      index: true,
    },
    categoryLabel: {
      type: String,
      required: true,
    },
    referenceNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    dimensionsOrSpecs: {
      type: String,
      required: true,
    },
    conditionSummary: {
      type: String,
      required: true,
    },
    provenanceSummary: {
      type: String,
      required: true,
    },
    provenanceStatus: {
      type: String,
      enum: ["Documented", "Private Estate", "Archival Verified", "Palace Heritage"],
      default: "Documented",
      index: true,
    },
    valuationMinUSD: {
      type: Number,
      required: true,
      min: 0,
    },
    valuationMaxUSD: {
      type: Number,
      required: true,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPrivateSale: {
      type: Boolean,
      default: false,
    },
    isDemonstration: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    summary: {
      type: String,
      required: true,
    },
    historicalContext: {
      type: String,
      required: true,
    },
    specimenDetails: {
      conditionScorecard: {
        overallGrade: { type: String, required: true },
        preservationScore: { type: Number, required: true, min: 0, max: 100 },
        caseOrSupport: { type: String, required: true },
        dialOrSurface: { type: String, required: true },
        movementOrStructure: { type: String, required: true },
        originalityRating: { type: String, required: true },
        inspectionLocation: { type: String, required: true },
      },
      provenanceTimeline: [
        {
          year: { type: String, required: true },
          location: { type: String, required: true },
          description: { type: String, required: true },
          documentationType: { type: String, required: true },
          isVerified: { type: Boolean, default: true },
        },
      ],
      independentInspector: { type: String, required: true },
      inspectionDate: { type: String, required: true },
      dossierReference: { type: String, required: true },
      availableReports: [{ type: String }],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Asset: Model<IAsset> =
  mongoose.models.Asset || mongoose.model<IAsset>("Asset", AssetSchema);

