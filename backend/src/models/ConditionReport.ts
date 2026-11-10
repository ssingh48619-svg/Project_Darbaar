import mongoose, { Document, Schema } from "mongoose";

export interface IConditionReport extends Document {
  assetId: mongoose.Types.ObjectId;
  score: number; // 0 - 100
  inspector: {
    name: string;
    laboratoryOrInstitute: string;
    credentials?: string;
  };
  inspectionDate: Date;
  summary: string;
  structuralIntegrity: "pristine" | "excellent" | "minor-wear" | "restored" | "attention-required";
  surfacePreservation: string;
  restorationHistory?: string;
  observations: string[];
  photographicEvidence: Array<{
    area: string;
    photoUrl: string;
    notes?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ConditionReportSchema = new Schema<IConditionReport>(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Asset", required: true, index: true },
    score: { type: Number, min: 0, max: 100, required: true },
    inspector: {
      name: { type: String, required: true },
      laboratoryOrInstitute: { type: String, required: true },
      credentials: { type: String },
    },
    inspectionDate: { type: Date, default: Date.now },
    summary: { type: String, required: true },
    structuralIntegrity: {
      type: String,
      enum: ["pristine", "excellent", "minor-wear", "restored", "attention-required"],
      default: "pristine",
    },
    surfacePreservation: { type: String, required: true },
    restorationHistory: { type: String },
    observations: [{ type: String }],
    photographicEvidence: [
      {
        area: { type: String, required: true },
        photoUrl: { type: String, required: true },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const ConditionReport = mongoose.model<IConditionReport>(
  "ConditionReport",
  ConditionReportSchema
);

