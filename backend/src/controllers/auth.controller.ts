import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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
    const { firstName, lastName, fullName, email, password, phone, role, preferredCurrency } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Please provide both email address and password.",
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters in length.",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: "An account with this email address is already registered. Please sign in.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const displayName = fullName || `${firstName || ""} ${lastName || ""}`.trim() || "Private Collector";

    const newUser = await User.create({
      fullName: displayName,
      email: cleanEmail,
      passwordHash,
      phone: phone ? phone.trim() : undefined,
      role: role || "client",
      preferredCurrency: preferredCurrency || "USD",
      isKycVerified: false,
    });

    const token = signToken(newUser._id.toString(), newUser.role);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Account created successfully. Welcome to DARBAAR!",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        isKycVerified: newUser.isKycVerified,
        preferredCurrency: newUser.preferredCurrency,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to create account at this time. Please try again shortly.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Please provide both your registered email address and password.",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail }).select("+passwordHash");
    if (!user) {
      res.status(404).json({
        success: false,
        error: "No account found matching this email address. Please create an account first.",
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Incorrect password. Please verify your credentials and try again.",
      });
      return;
    }

    const token = signToken(user._id.toString(), user.role);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful. Welcome to DARBAAR!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isKycVerified: user.isKycVerified,
        preferredCurrency: user.preferredCurrency,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Authentication service unavailable. Server connection error.",
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
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
      isKycVerified: req.user.isKycVerified,
      preferredCurrency: req.user.preferredCurrency,
      phone: req.user.phone,
    },
  });
}
