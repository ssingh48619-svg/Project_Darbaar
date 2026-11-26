import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { AuthenticatedRequest } from "../middleware/auth";
import { emailService } from "../services/email.service";

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

/**
 * Generate 6-digit numeric passkey
 */
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
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

    // If user already registered AND verified, reject
    if (existingUser && existingUser.isEmailVerified) {
      res.status(409).json({
        success: false,
        error: "An account with this email address is already registered. Please sign in.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const displayName = fullName || `${firstName || ""} ${lastName || ""}`.trim() || "Private Collector";
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (existingUser && !existingUser.isEmailVerified) {
      // Re-use unverified record and refresh OTP
      existingUser.fullName = displayName;
      existingUser.passwordHash = passwordHash;
      if (phone) existingUser.phone = phone.trim();
      existingUser.emailVerificationOtp = otp;
      existingUser.emailVerificationOtpExpires = otpExpires;
      await existingUser.save();
    } else {
      // Create new unverified account
      await User.create({
        fullName: displayName,
        email: cleanEmail,
        passwordHash,
        phone: phone ? phone.trim() : undefined,
        role: role || "client",
        preferredCurrency: preferredCurrency || "INR",
        isKycVerified: false,
        isEmailVerified: false,
        emailVerificationOtp: otp,
        emailVerificationOtpExpires: otpExpires,
      });
    }

    // Send royal email with OTP passkey
    await emailService.sendRegistrationOtp({
      email: cleanEmail,
      fullName: displayName,
      otp,
    });

    res.status(200).json({
      success: true,
      requiresOtp: true,
      email: cleanEmail,
      message: `A 6-digit verification code has been dispatched to ${cleanEmail}. Please verify to complete your registration.`,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to process registration at this time. Please try again shortly.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function verifyOtp(req: Request, res: Response): Promise<void> {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({
        success: false,
        error: "Please provide both email address and verification code.",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail }).select("+emailVerificationOtp +emailVerificationOtpExpires");

    if (!user) {
      res.status(404).json({
        success: false,
        error: "No pending registration found for this email address. Please register again.",
      });
      return;
    }

    // If already verified, log them in
    if (user.isEmailVerified) {
      const token = signToken(user._id.toString(), user.role);
      setAuthCookie(res, token);
      res.status(200).json({
        success: true,
        message: "Email already verified. Welcome to DARBAAR!",
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
      return;
    }

    // Check code match
    const submittedOtp = otp.toString().trim();
    if (!user.emailVerificationOtp || user.emailVerificationOtp !== submittedOtp) {
      res.status(400).json({
        success: false,
        error: "Invalid verification code. Please check your email inbox and enter the 6-digit code.",
      });
      return;
    }

    // Check expiry
    if (user.emailVerificationOtpExpires && user.emailVerificationOtpExpires < new Date()) {
      res.status(400).json({
        success: false,
        error: "Verification code has expired. Please request a new code using the 'Resend Code' option.",
      });
      return;
    }

    // Mark as verified and clear OTP
    user.isEmailVerified = true;
    user.emailVerificationOtp = undefined;
    user.emailVerificationOtpExpires = undefined;
    await user.save();

    const token = signToken(user._id.toString(), user.role);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Email verified successfully. Welcome to the Sovereign House of DARBAAR!",
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
      error: "Verification service temporarily unavailable. Please try again.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function resendOtp(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: "Please provide your email address.",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      res.status(404).json({
        success: false,
        error: "No account record found matching this email address.",
      });
      return;
    }

    if (user.isEmailVerified) {
      res.status(400).json({
        success: false,
        error: "This account is already verified. Please sign in directly.",
      });
      return;
    }

    const otp = generateOtp();
    user.emailVerificationOtp = otp;
    user.emailVerificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await emailService.sendRegistrationOtp({
      email: cleanEmail,
      fullName: user.fullName,
      otp,
    });

    res.status(200).json({
      success: true,
      message: `A fresh 6-digit verification code has been dispatched to ${cleanEmail}.`,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to dispatch verification code. Please try again shortly.",
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

    // Check if account email is verified
    if (user.isEmailVerified === false) {
      const otp = generateOtp();
      user.emailVerificationOtp = otp;
      user.emailVerificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      await emailService.sendRegistrationOtp({
        email: cleanEmail,
        fullName: user.fullName,
        otp,
      });

      res.status(403).json({
        success: false,
        requiresOtp: true,
        email: cleanEmail,
        error: "Your email address is not yet verified. A fresh 6-digit verification code has been sent to your inbox.",
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
