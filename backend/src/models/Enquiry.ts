import mongoose, { Document, Schema, Model } from "mongoose";

export type EnquiryStatusType = "pending" | "under_review" | "contacted" | "scheduled" | "closed";
export type SalonType = "Geneva" | "London" | "New York" | "Singapore" | "Mumbai" | "Dubai";

export interface IEnquiry extends Document {
  assetId?: mongoose.Types.ObjectId;
  assetReference?: string;
  assetTitle?: string;
  userId?: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  preferredSalon: SalonType;
  inquiryType: "Acquisition" | "Advisory Consultation" | "Private Viewing" | "Consignment" | "Valuation Request";
  message?: string;
  confidentialityAgreed: boolean;
  status: EnquiryStatusType;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Asset",
    },
    assetReference: {
      type: String,
      trim: true,
    },
    assetTitle: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: [true, "Full legal name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Confidential email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    preferredSalon: {
      type: String,
      enum: ["Geneva", "London", "New York", "Singapore", "Mumbai", "Dubai"],
      default: "Geneva",
    },
    inquiryType: {
      type: String,
      enum: ["Acquisition", "Advisory Consultation", "Private Viewing", "Consignment", "Valuation Request"],
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    confidentialityAgreed: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: String,
      enum: ["pending", "under_review", "contacted", "scheduled", "closed"],
      default: "pending",
      index: true,
    },
    internalNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

