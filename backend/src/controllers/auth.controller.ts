import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthenticatedRequest } from "../middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "darbaar_luxury_ultra_secure_jwt_secret_key_2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function signToken(userId: string, role: string): string {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
  });
}

function setAuthCookie(res: Response, token: string): void {
  res.cookie("darbaar_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, email, password, phone, role, preferredCurrency } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: "An account with this email address already holds registration with DARBAAR.",
      });
      return;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      role: role || "client",
      preferredCurrency: preferredCurrency || "USD",
      isVerified: true,
    });

    const token = signToken(newUser._id.toString(), newUser.role);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Admission granted to DARBAAR Private Vault.",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        kycStatus: newUser.kycStatus,
        preferredCurrency: newUser.preferredCurrency,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to process admission petition.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({
        success: false,
        error: "Invalid email credentials or unauthorized account.",
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid security passphrase.",
      });
      return;
    }

    const token = signToken(user._id.toString(), user.role);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Credentials accepted. Welcome to DARBAAR.",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        kycStatus: user.kycStatus,
        preferredCurrency: user.preferredCurrency,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Authentication service unavailable.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie("darbaar_token");
  res.status(200).json({
    success: true,
    message: "Session concluded discreetly.",
  });
}

export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, error: "Unauthenticated" });
    return;
  }
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      kycStatus: req.user.kycStatus,
      preferredCurrency: req.user.preferredCurrency,
      phone: req.user.phone,
    },
  });
}
