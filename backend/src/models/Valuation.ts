import mongoose, { Document, Schema } from "mongoose";

export interface IValuation extends Document {
  assetId?: mongoose.Types.ObjectId;
  assetTitle: string;
  department: "fine-art" | "timepieces" | "collectibles" | "other";
  clientId: mongoose.Types.ObjectId;
  clientName: string;
  clientEmail: string;
  indicativeRange: {
    min: number;
    max: number;
    currency: string;
  };
  valuationPurpose: "insurance" | "private-sale" | "estate-planning" | "acquisition" | "curiosity";
  methodology: string;
  assignedSpecialist?: string;
  status: "pending" | "under-review" | "completed" | "archived";
  notes?: string;
  issuedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ValuationSchema = new Schema<IValuation>(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Asset" },
    assetTitle: { type: String, required: true },
    department: {
      type: String,
      enum: ["fine-art", "timepieces", "collectibles", "other"],
      required: true,
    },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    indicativeRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
    valuationPurpose: {
      type: String,
      enum: ["insurance", "private-sale", "estate-planning", "acquisition", "curiosity"],
      default: "private-sale",
    },
    methodology: {
      type: String,
      default: "Comparative historical auction analysis & specialist condition review",
    },
    assignedSpecialist: { type: String },
    status: {
      type: String,
      enum: ["pending", "under-review", "completed", "archived"],
      default: "pending",
    },
    notes: { type: String },
    issuedAt: { type: Date },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export const Valuation = mongoose.model<IValuation>("Valuation", ValuationSchema);

