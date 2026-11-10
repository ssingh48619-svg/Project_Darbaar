import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAdvisoryRequest extends Document {
  userId?: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  serviceType: "provenance" | "acquisition" | "authentication" | "collection_management";
  description: string;
  preferredSalon: "Geneva" | "London" | "New York" | "Singapore" | "Mumbai" | "Dubai";
  status: "submitted" | "in_review" | "assigned" | "concluded";
  assignedAdvisorId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AdvisoryRequestSchema = new Schema<IAdvisoryRequest>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: ["provenance", "acquisition", "authentication", "collection_management"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    preferredSalon: {
      type: String,
      enum: ["Geneva", "London", "New York", "Singapore", "Mumbai", "Dubai"],
      default: "Geneva",
    },
    status: {
      type: String,
      enum: ["submitted", "in_review", "assigned", "concluded"],
      default: "submitted",
      index: true,
    },
    assignedAdvisorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const AdvisoryRequest: Model<IAdvisoryRequest> =
  mongoose.models.AdvisoryRequest ||
  mongoose.model<IAdvisoryRequest>("AdvisoryRequest", AdvisoryRequestSchema);

