import { Request, Response } from "express";
import { Asset } from "../models/Asset";
import { AuthenticatedRequest } from "../middleware/auth";

export async function getAssets(req: Request, res: Response): Promise<void> {
  try {
    const { department, category, search, isFeatured, isPrivateSale } = req.query;

    const filter: any = {};
    const cat = category || department;
    if (cat && cat !== "all") {
      filter.category = cat;
    }
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured === "true";
    }
    if (isPrivateSale !== undefined) {
      filter.isPrivateSale = isPrivateSale === "true";
    }

    if (search && typeof search === "string") {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { makerOrArtist: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { provenanceSummary: { $regex: search, $options: "i" } },
        { referenceNumber: { $regex: search, $options: "i" } },
      ];
    }

    const assets = await Asset.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: assets.length,
      assets,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to retrieve curated records from archival repository.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function getAssetById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const asset = await Asset.findById(id).populate("createdBy", "firstName lastName");

    if (!asset) {
      res.status(404).json({
        success: false,
        error: "Specimen not found in DARBAAR curatorial inventory.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      asset,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Error accessing specimen record.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function createAsset(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const payload = {
      ...req.body,
      createdBy: req.user?._id,
    };

    const newAsset = await Asset.create(payload);
    res.status(201).json({
      success: true,
      message: "Specimen successfully inscribed into DARBAAR catalogue.",
      asset: newAsset,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Catalogue inscription failed.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function updateAsset(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await Asset.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      res.status(404).json({ success: false, error: "Specimen not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Catalogue record updated.",
      asset: updated,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Update failed.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

export async function deleteAsset(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await Asset.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: "Specimen not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Specimen record removed from active catalogue.",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Deletion failed.",
    });
  }
}

