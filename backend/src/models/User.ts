import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "client" | "dealer" | "advisor" | "admin";

export interface IUser extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  phone?: string;
  country?: string;
  preferredCurrency: string;
  preferredSalon?: string;
  isKycVerified: boolean;
  kycDocuments: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, "Confidential email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ["client", "dealer", "advisor", "admin"],
      default: "client",
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    preferredCurrency: {
      type: String,
      default: "USD",
      enum: ["USD", "GBP", "EUR", "CHF", "AED", "INR", "SGD", "HKD"],
    },
    preferredSalon: {
      type: String,
      enum: ["Geneva", "London", "New York", "Singapore", "Mumbai", "Dubai"],
      default: "Geneva",
    },
    isKycVerified: {
      type: Boolean,
      default: false,
    },
    kycDocuments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method to verify password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

