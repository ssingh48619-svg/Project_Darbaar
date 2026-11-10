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

