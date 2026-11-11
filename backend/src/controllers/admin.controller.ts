import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { Asset } from "../models/Asset";
import { Enquiry } from "../models/Enquiry";
import { AdvisoryRequest } from "../models/AdvisoryRequest";
import { User } from "../models/User";
import { AuditLog } from "../models/AuditLog";

export async function getOverviewStats(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const [totalAssets, totalEnquiries, pendingEnquiries, totalAdvisories, totalUsers, auditLogs] =
      await Promise.all([
        Asset.countDocuments(),
        Enquiry.countDocuments(),
        Enquiry.countDocuments({ status: "pending" }),
        AdvisoryRequest.countDocuments(),
        User.countDocuments(),
        AuditLog.find().sort({ timestamp: -1 }).limit(10),
      ]);

    // Aggregate total indicative asset value under management
    const valuationAggregation = await Asset.aggregate([
      {
        $group: {
          _id: null,
          totalMin: { $sum: "$indicativeValuation.min" },
          totalMax: { $sum: "$indicativeValuation.max" },
        },
      },
    ]);

    const aum = valuationAggregation[0]
      ? Math.round((valuationAggregation[0].totalMin + valuationAggregation[0].totalMax) / 2)
      : 24500000;

    res.status(200).json({
      success: true,
      stats: {
        totalAssets,
        totalEnquiries,
        pendingEnquiries,
        totalAdvisories,
        totalUsers,
        assetsUnderManagementUSD: aum,
      },
      recentAuditLogs: auditLogs,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to compile curatorial directorate intelligence.",
    });
  }
}

export async function getUsers(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 }).limit(50);
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to retrieve collector registry.",
    });
  }
}

export async function updateUserPermissions(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { role, isKycVerified } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "Collector or curator profile not found in DARBAAR registry.",
      });
      return;
    }

    if (role !== undefined) {
      user.role = role;
    }
    if (isKycVerified !== undefined) {
      user.isKycVerified = Boolean(isKycVerified);
    }

    await user.save();

    // Create Audit Log
    try {
      await AuditLog.create({
        action: "CURATOR_PERMISSIONS_UPDATED",
        userId: req.user?._id,
        entityType: "User",
        entityId: user._id.toString(),
        changes: {
          role: user.role,
          isKycVerified: user.isKycVerified,
        },
      });
    } catch {
      // Audit log non-blocking
    }

    const hasPublishingRights =
      user.role === "admin" ||
      user.role === "advisor" ||
      (user.role === "dealer" && user.isKycVerified);

    res.status(200).json({
      success: true,
      message: `Permissions updated successfully for ${user.fullName}. Publishing rights: ${
        hasPublishingRights ? "ACTIVE" : "RESTRICTED"
      }`,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isKycVerified: user.isKycVerified,
        hasPublishingRights,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Failed to update curator permissions.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

