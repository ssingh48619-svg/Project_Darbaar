import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;

    // 1. Check Bearer token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2. Fallback to HttpOnly cookie
    else if (req.cookies && req.cookies.darbaar_token) {
      token = req.cookies.darbaar_token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: "Authentication required. Please present valid DARBAAR credentials.",
      });
      return;
    }

    const secret = process.env.JWT_SECRET || "darbaar_luxury_ultra_secure_jwt_secret_key_2026";
    const decoded = jwt.verify(token, secret) as { id: string; role: string };

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401).json({
        success: false,
        error: "The account associated with this session no longer exists.",
      });
      return;
    }

    req.user = user;
    next();
  } catch (err: any) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired authorization token.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export function authorize(...roles: Array<"client" | "dealer" | "advisor" | "admin">) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: "Access restricted. Insufficient privileges for this royal corridor.",
      });
      return;
    }
    next();
  };
}
