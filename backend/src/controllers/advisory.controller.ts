import { Response } from "express";
import { AdvisoryRequest } from "../models/AdvisoryRequest";
import { AuthenticatedRequest } from "../middleware/auth";
import { AuditLog } from "../models/AuditLog";
import { emailService } from "../services/email.service";

export async function createAdvisoryRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const {
      serviceType,
      mandateType,
      fullName,
      clientName,
      email,
      clientEmail,
      phone,
      preferredSalon,
      description,
      specificMandateDetails,
    } = req.body;

    const newMandate = await AdvisoryRequest.create({
      serviceType: serviceType || mandateType || "acquisition",
      fullName: fullName || clientName || "Private Collector",
      email: (email || clientEmail || "").toLowerCase(),
      phone,
      preferredSalon: preferredSalon || "Geneva",
      description: description || specificMandateDetails || "Confidential Advisory Mandate",
      userId: req.user?._id,
      status: "submitted",
    });

    try {
      await AuditLog.create({
        userId: req.user?._id,
        action: "ADVISORY_MANDATE_SUBMITTED",
        resource: "AdvisoryRequest",
        resourceId: newMandate._id.toString(),
        details: { serviceType: newMandate.serviceType, email: newMandate.email, salon: newMandate.preferredSalon },
      });
    } catch {
      // Non-blocking
    }

    // Trigger instant email alert to Directorate (darbaar3001@gmail.com)
    emailService
      .notifyNewAdvisoryMandate({
        fullName: newMandate.fullName,
        email: newMandate.email,
        phone,
        serviceType: newMandate.serviceType,
        preferredSalon: newMandate.preferredSalon,
        description: newMandate.description,
      })
      .catch((e) => console.warn("[Advisory Alert Error]", e.message));

    res.status(201).json({
      success: true,
      message: "Advisory mandate petition received. A dedicated Managing Partner has been notified.",
      mandate: {
        id: newMandate._id,
        serviceType: newMandate.serviceType,
        status: newMandate.status,
        createdAt: newMandate.createdAt,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to lodge advisory mandate petition.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function getMyAdvisoryRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    const mandates = await AdvisoryRequest.find({
      $or: [{ userId: req.user._id }, { email: req.user.email.toLowerCase() }],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mandates.length,
      mandates,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to retrieve personal advisory mandates.",
    });
  }
}

export async function getAllAdvisoryRequests(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const mandates = await AdvisoryRequest.find({})
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: mandates.length,
      mandates,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Advisory registry inaccessible.",
    });
  }
}
