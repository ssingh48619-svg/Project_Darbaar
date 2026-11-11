"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Sparkles, Plus, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { darbaarApi } from "@/lib/api";

interface CreateAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetCreated: () => void;
}

export function CreateAssetModal({ isOpen, onClose, onAssetCreated }: CreateAssetModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [makerOrArtist, setMakerOrArtist] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState<"fine-art" | "timepieces" | "collectibles" | "private-sales">("fine-art");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [dimensionsOrSpecs, setDimensionsOrSpecs] = useState("");
  const [valuationMinUSD, setValuationMinUSD] = useState<number>(100000);
  const [valuationMaxUSD, setValuationMaxUSD] = useState<number>(150000);
  const [provenanceStatus, setProvenanceStatus] = useState<"Documented" | "Private Estate" | "Archival Verified" | "Palace Heritage">("Archival Verified");
  const [provenanceSummary, setProvenanceSummary] = useState("");
  const [conditionSummary, setConditionSummary] = useState("Pristine museum conservation grade");
  const [preservationScore, setPreservationScore] = useState<number>(96);
  const [summary, setSummary] = useState("");
  const [historicalContext, setHistoricalContext] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      setError("");
      const token = localStorage.getItem("darbaar_token") || "";
      const res = await darbaarApi.media.uploadArtwork(file, token);
      if (res.success && res.media?.url) {
        setImageUrl(res.media.url);
      }
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      setError("Failed to upload photograph to Cloudinary: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !makerOrArtist.trim() || !referenceNumber.trim()) {
      setError("Please provide specimen title, atelier/maker, and reference accession number.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("darbaar_token") || "";

      const categoryLabels: Record<string, string> = {
        "fine-art": "Fine Art & Paintings",
        timepieces: "Rare Timepieces",
        collectibles: "Palace Toshakhana & Antiquities",
        "private-sales": "Private Treaty Reserve",
      };

      const payload = {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
        makerOrArtist,
        year: year || "Circa 1900",
        category,
        categoryLabel: categoryLabels[category],
        referenceNumber,
        dimensionsOrSpecs: dimensionsOrSpecs || "Museum standard proportions",
        conditionSummary,
        provenanceSummary: provenanceSummary || "Preserved in private sovereign estate.",
        provenanceStatus,
        valuationMinUSD: Number(valuationMinUSD),
        valuationMaxUSD: Number(valuationMaxUSD),
        isFeatured: true,
        isPrivateSale: category === "private-sales",
        isDemonstration: true,
        image: imageUrl,
        galleryImages: [imageUrl],
        summary: summary || `${title} by ${makerOrArtist}. An exceptional historical creation.`,
        historicalContext: historicalContext || "Archival documentation verified under strict curatorial guidelines.",
        specimenDetails: {
          conditionScorecard: {
            overallGrade: "Grade I — Imperial Standard",
            preservationScore: Number(preservationScore),
            caseOrSupport: "Verified museum conservation",
            dialOrSurface: "Original surface luminescence",
            movementOrStructure: "Period-authentic assembly",
            originalityRating: "100% Period-Correct Components",
            inspectionLocation: "Geneva Vault Inspection Facility",
          },
          provenanceTimeline: [
            {
              year: year || "1900",
              location: "Royal Ateliers",
              description: "Original commission entry documented in state register.",
              documentationType: "Palace Treasury Inscription",
              isVerified: true,
            },
          ],
          independentInspector: "DARBAAR Curatorial Directorate",
          inspectionDate: "Autumn 2026",
          dossierReference: `DARBAAR-REF-${referenceNumber}`,
          availableReports: ["Archival Authentication Dossier"],
        },
      };

      await darbaarApi.assets.create(payload, token);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onAssetCreated();
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error("Asset creation error:", err);
      setError(err.message || "Failed to publish specimen to catalogue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-[#E5E5EA] shadow-2xl my-8 overflow-hidden rounded-sm flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5EA] bg-[#F7F5F0]">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-[#A68A55]" />
            <h2 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#111111]">
              Inscribe New Specimen to DARBAAR Catalogue
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#686868] hover:text-[#111111] transition-colors rounded-full hover:bg-[#EAE5DC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Specimen successfully inscribed into DARBAAR catalogue and MongoDB Atlas!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Specimen Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Coronation Durbar of Udaipur"
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Maker / Atelier / Artist *
                </label>
                <input
                  type="text"
                  required
                  value={makerOrArtist}
                  onChange={(e) => setMakerOrArtist(e.target.value)}
                  placeholder="e.g. Patek Philippe, Master Shivalal"
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Year / Era
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 1894, Circa 1972"
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Curatorial Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                >
                  <option value="fine-art">Fine Art & Miniatures</option>
                  <option value="timepieces">Rare Timepieces & Complications</option>
                  <option value="collectibles">Palace Toshakhana & Antiquities</option>
                  <option value="private-sales">Private Treaty Reserve</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Reference / Accession Number *
                </label>
                <input
                  type="text"
                  required
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="e.g. DARBAAR-TIM-3970"
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Dimensions or Horological Specifications
                </label>
                <input
                  type="text"
                  value={dimensionsOrSpecs}
                  onChange={(e) => setDimensionsOrSpecs(e.target.value)}
                  placeholder="e.g. 36mm Case, Calibre CH 27-70 Q, 18k Rose Gold"
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Indicative Valuation Min (USD)
                </label>
                <input
                  type="number"
                  value={valuationMinUSD}
                  onChange={(e) => setValuationMinUSD(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Indicative Valuation Max (USD)
                </label>
                <input
                  type="number"
                  value={valuationMaxUSD}
                  onChange={(e) => setValuationMaxUSD(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Provenance Status
                </label>
                <select
                  value={provenanceStatus}
                  onChange={(e) => setProvenanceStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                >
                  <option value="Archival Verified">Archival Verified</option>
                  <option value="Documented">Documented</option>
                  <option value="Private Estate">Private Estate</option>
                  <option value="Palace Heritage">Palace Heritage</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Preservation Score (0 - 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={preservationScore}
                  onChange={(e) => setPreservationScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium block">
                  Artwork Photograph (Cloudinary Media Vault)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#F7F5F0] border border-[#E5E5EA]">
                  <div className="relative w-24 h-24 bg-white border border-[#E5E5EA] flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Plate preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-[#A68A55]" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center space-x-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] cursor-pointer transition-colors">
                      <Plus className="w-3.5 h-3.5 text-[#C4AC79]" />
                      <span>{uploadingImage ? "Securing to Cloudinary..." : "Upload from Device to Cloudinary"}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or paste secure image URL (https://...)"
                      className="w-full px-3 py-1.5 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Documented Provenance Summary
                </label>
                <textarea
                  rows={2}
                  value={provenanceSummary}
                  onChange={(e) => setProvenanceSummary(e.target.value)}
                  placeholder="e.g. Single-owner private Swiss collection, preserved in Geneva vault since 1991."
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#686868] font-medium">
                  Curatorial Historical Context
                </label>
                <textarea
                  rows={2}
                  value={historicalContext}
                  onChange={(e) => setHistoricalContext(e.target.value)}
                  placeholder="Historical context, atelier importance, and cultural heritage background..."
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5EA] flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#686868] hover:text-[#111111] border border-[#E5E5EA]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors disabled:opacity-50"
              >
                {loading ? "Inscribing..." : "Publish to Catalogue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

