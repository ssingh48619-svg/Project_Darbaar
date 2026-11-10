import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  referenceNumber: string;
  assetId: mongoose.Types.ObjectId;
  assetTitle: string;
  buyerId: mongoose.Types.ObjectId;
  sellerId?: mongoose.Types.ObjectId;
  agreedPrice: {
    amount: number;
    currency: string;
  };
  commissionPercentage: number;
  commissionAmount: number;
  status:
    | "mandate-signed"
    | "escrow-pending"
    | "funds-secured"
    | "inspection-period"
    | "settled"
    | "cancelled";
  legalTermsSummary?: string;
  salonJurisdiction: "Geneva" | "London" | "New York" | "Singapore" | "Mumbai";
  settledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    assetId: { type: Schema.Types.ObjectId, ref: "Asset", required: true },
    assetTitle: { type: String, required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User" },
    agreedPrice: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
    commissionPercentage: { type: Number, default: 10 },
    commissionAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "mandate-signed",
        "escrow-pending",
        "funds-secured",
        "inspection-period",
        "settled",
        "cancelled",
      ],
      default: "mandate-signed",
    },
    legalTermsSummary: { type: String },
    salonJurisdiction: {
      type: String,
      enum: ["Geneva", "London", "New York", "Singapore", "Mumbai"],
      default: "Geneva",
    },
    settledAt: { type: Date },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);

