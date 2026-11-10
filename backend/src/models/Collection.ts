import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICollection extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  isPrivate: boolean;
  assetIds: mongoose.Types.ObjectId[];
  totalEstimatedValueUSD: number;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: "My Private Vault Portfolio",
    },
    description: {
      type: String,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    assetIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],
    totalEstimatedValueUSD: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Collection: Model<ICollection> =
  mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema);

