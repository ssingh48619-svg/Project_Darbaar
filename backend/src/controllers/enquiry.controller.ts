import { Response } from "express";
import mongoose from "mongoose";
import { Enquiry } from "../models/Enquiry";
import { AuthenticatedRequest } from "../middleware/auth";
import { AuditLog } from "../models/AuditLog";
import { emailService } from "../services/email.service";

export async function createEnquiry(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const {
      assetId,
      assetTitle,
      fullName,
      email,
      phone,
      preferredSalon,
      salonCityPreference,
      inquiryType,
      message,
      confidentialNotes,
      confidentialityAgreed,
    } = req.body;

    const isObjectId = assetId && mongoose.Types.ObjectId.isValid(assetId);

    const newEnquiry = await Enquiry.create({
      assetId: isObjectId ? assetId : undefined,
      assetReference: typeof assetId === "string" ? assetId : undefined,
      assetTitle: assetTitle || undefined,
      userId: req.user?._id,
      fullName,
      email: email.toLowerCase(),
      phone,
      preferredSalon: preferredSalon || salonCityPreference || "Geneva",
      inquiryType: inquiryType || "Acquisition",
      message: message || confidentialNotes || `Inquiry for ${assetTitle || "curated specimen"}`,
      confidentialityAgreed: confidentialityAgreed !== undefined ? confidentialityAgreed : true,
      status: "pending",
    });

    try {
      await AuditLog.create({
        userId: req.user?._id,
        action: "ENQUIRY_CREATED",
        resource: "Enquiry",
        resourceId: newEnquiry._id.toString(),
        details: { assetTitle, email, salon: newEnquiry.preferredSalon },
      });
    } catch {
      // Non-blocking
    }

    // Trigger instant email alert to Directorate (darbaar3001@gmail.com)
    emailService
      .notifyNewEnquiry({
        fullName,
        email,
        phone,
        assetTitle,
        preferredSalon: newEnquiry.preferredSalon,
        inquiryType: newEnquiry.inquiryType,
        message: newEnquiry.message,
        referenceNumber: newEnquiry._id.toString().slice(-8).toUpperCase(),
      })
      .catch((e) => console.warn("[Enquiry Alert Error]", e.message));

    res.status(201).json({
      success: true,
      message: "Confidential inquiry submitted. A DARBAAR Senior Specialist will contact you discreetly.",
      enquiry: {
        id: newEnquiry._id,
        referenceNumber: newEnquiry._id.toString().slice(-8).toUpperCase(),
        inquiryType: newEnquiry.inquiryType,
        status: newEnquiry.status,
        createdAt: newEnquiry.createdAt,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to lodge confidential inquiry at this time.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function getMyEnquiries(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    const enquiries = await Enquiry.find({
      $or: [{ userId: req.user._id }, { email: req.user.email.toLowerCase() }],
    })
      .populate("assetId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to retrieve personal inquiry records.",
    });
  }
}

export async function getAllEnquiries(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { status, salon } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (salon) filter.preferredSalon = salon;

    const enquiries = await Enquiry.find(filter)
      .populate("userId", "fullName email")
      .populate("assetId")
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Archival inquiry log inaccessible.",
    });
  }
}

export async function updateEnquiryStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status, internalNotes } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(internalNotes && { internalNotes }),
      },
      { new: true }
    );

    if (!enquiry) {
      res.status(404).json({ success: false, error: "Enquiry record not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Enquiry status updated.",
      enquiry,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Failed to update inquiry status.",
    });
  }
}
