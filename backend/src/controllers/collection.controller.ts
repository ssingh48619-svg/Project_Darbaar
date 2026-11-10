import { Response } from "express";
import mongoose from "mongoose";
import { Collection } from "../models/Collection";
import { AuthenticatedRequest } from "../middleware/auth";

export async function getMyCollection(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    let collection = await Collection.findOne({ userId: req.user._id }).populate("assetIds");

    if (!collection) {
      collection = await Collection.create({
        userId: req.user._id,
        title: "My Private Vault Portfolio",
        isPrivate: true,
        assetIds: [],
        totalEstimatedValueUSD: 0,
      });
    }

    res.status(200).json({
      success: true,
      collection,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to open private vault collection.",
    });
  }
}

export async function addToCollection(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    const { assetId, estimatedValueUSD } = req.body;

    let collection = await Collection.findOne({ userId: req.user._id });
    if (!collection) {
      collection = new Collection({
        userId: req.user._id,
        title: "My Private Vault Portfolio",
        isPrivate: true,
        assetIds: [],
        totalEstimatedValueUSD: 0,
      });
    }

    if (assetId) {
      const objId = new mongoose.Types.ObjectId(assetId);
      if (!collection.assetIds.some((id) => id.toString() === assetId)) {
        collection.assetIds.push(objId);
      }
    }

    if (estimatedValueUSD) {
      collection.totalEstimatedValueUSD += Number(estimatedValueUSD);
    }

    await collection.save();

    res.status(201).json({
      success: true,
      message: "Specimen deposited into private portfolio vault.",
      collection,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Unable to deposit asset into vault.",
    });
  }
}
