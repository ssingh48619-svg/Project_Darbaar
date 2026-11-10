import mongoose, { Document, Schema } from "mongoose";

export interface IProvenanceRecord extends Document {
  assetId: mongoose.Types.ObjectId;
  timeline: Array<{
    period: string;
    holder: string;
    location: string;
    transferType: "inheritance" | "private-sale" | "auction" | "diplomatic-gift" | "commission";
    documentationEvidence?: string;
    isVerified: boolean;
  }>;
  overallStatus: "fully-documented" | "partially-documented" | "under-archival-review" | "unverified";
  archivalNotes?: string;
  verifiedBy?: string;
  verificationDate?: Date;
  certificates: Array<{
    title: string;
    issuingAuthority: string;
    referenceNumber: string;
    fileUrl?: string;
    issuedDate?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ProvenanceRecordSchema = new Schema<IProvenanceRecord>(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Asset", required: true, index: true },
    timeline: [
      {
        period: { type: String, required: true },
        holder: { type: String, required: true },
        location: { type: String, required: true },
        transferType: {
          type: String,
          enum: ["inheritance", "private-sale", "auction", "diplomatic-gift", "commission"],
          default: "private-sale",
        },
        documentationEvidence: { type: String },
        isVerified: { type: Boolean, default: false },
      },
    ],
    overallStatus: {
      type: String,
      enum: ["fully-documented", "partially-documented", "under-archival-review", "unverified"],
      default: "under-archival-review",
    },
    archivalNotes: { type: String },
    verifiedBy: { type: String },
    verificationDate: { type: Date },
    certificates: [
      {
        title: { type: String, required: true },
        issuingAuthority: { type: String, required: true },
        referenceNumber: { type: String, required: true },
        fileUrl: { type: String },
        issuedDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

export const ProvenanceRecord = mongoose.model<IProvenanceRecord>(
  "ProvenanceRecord",
  ProvenanceRecordSchema
);

