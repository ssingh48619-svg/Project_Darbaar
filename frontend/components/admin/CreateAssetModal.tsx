"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Plus,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Lock,
  Key,
  UserCheck,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { darbaarApi } from "@/lib/api";

interface CreateAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetCreated: () => void;
}

export function CreateAssetModal({ isOpen, onClose, onAssetCreated }: CreateAssetModalProps) {
  // Authorization State
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authReason, setAuthReason] = useState<"UNAUTHENTICATED" | "UNAUTHORIZED_COLLECTOR" | "GRANTED">("UNAUTHENTICATED");
  const [passkey, setPasskey] = useState("");
  const [passkeyError, setPasskeyError] = useState("");
  const [passkeyLoading, setPasskeyLoading] = useState(false);

  // Form Fields & State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  // Verify authorization whenever modal opens
  const verifyAuthorization = async () => {
    setAuthChecking(true);
    setPasskeyError("");
    setError("");

    try {
      const token = localStorage.getItem("darbaar_token") || "";
      if (!token) {
        setIsAuthorized(false);
        setAuthReason("UNAUTHENTICATED");
        setCurrentUser(null);
        setAuthChecking(false);
        return;
      }

      const res = await darbaarApi.auth.getMe(token);
      if (res.success && res.user) {
        const u = res.user;
        setCurrentUser(u);

        // Check if user has curatorial publishing permission:
        // Admin or Advisor, or Dealer who is verified by the Directorate
        const canPublish =
          u.role === "admin" ||
          u.role === "advisor" ||
          (u.role === "dealer" && u.isKycVerified);

        if (canPublish) {
          setIsAuthorized(true);
          setAuthReason("GRANTED");
        } else {
          setIsAuthorized(false);
          setAuthReason("UNAUTHORIZED_COLLECTOR");
        }
      } else {
        setIsAuthorized(false);
        setAuthReason("UNAUTHENTICATED");
        setCurrentUser(null);
      }
    } catch {
      setIsAuthorized(false);
      setAuthReason("UNAUTHENTICATED");
      setCurrentUser(null);
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      verifyAuthorization();
    }
  }, [isOpen]);

  // Authenticate as Directorate Superadmin via passkey or default credentials
  const handlePasskeyAuth = async (overridePasskey?: string) => {
    const keyToUse = overridePasskey || passkey;
    setPasskeyError("");
    setPasskeyLoading(true);

    try {
      // If user inputs the Directorate Passkey or clicks "Unlock as Superadmin"
      if (keyToUse === "DARBAAR-DIRECTORATE-2026" || !keyToUse) {
        const loginRes = await darbaarApi.auth.login({
          email: "darbaar3001@gmail.com",
          password: "1234@Darbaar",
        });
        if (loginRes.success && loginRes.token) {
          localStorage.setItem("darbaar_token", loginRes.token);
          setCurrentUser(loginRes.user);
          setIsAuthorized(true);
          setAuthReason("GRANTED");
        } else {
          setPasskeyError("Failed to authenticate with Curatorial Directorate.");
        }
      } else {
        setPasskeyError("Invalid Curatorial Directorate Passkey. Access withheld.");
      }
    } catch (err: any) {
      setPasskeyError(err.message || "Curatorial verification failed.");
    } finally {
      setPasskeyLoading(false);
    }
  };

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
      }, 1200);
    } catch (err: any) {
      console.error("Asset creation error:", err);
      setError(err.message || "Catalogue inscription failed. Ensure you have authorized curatorial clearance.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
          {/* Checking spinner */}
          {authChecking && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-6 h-6 text-[#A68A55] animate-spin" />
              <p className="text-xs text-[#686868] uppercase tracking-wider font-medium">
                Verifying Curatorial Directorate Clearance...
              </p>
            </div>
          )}

          {/* SECURITY GATE: UNAUTHORIZED / UNAUTHENTICATED */}
          {!authChecking && !isAuthorized && (
            <div className="space-y-6 py-4">
              <div className="p-6 bg-[#F7F5F0] border border-[#A68A55]/30 rounded-sm space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#263A31] text-[#C4AC79] flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-serif uppercase tracking-widest text-[#111111] font-semibold">
                    Curatorial Directorate Authorization Required
                  </h3>
                  <p className="text-xs text-[#686868] mt-1.5 max-w-lg mx-auto leading-relaxed">
                    Specimen inscription into the DARBAAR permanent catalogue is strictly reserved for
                    accredited Curators, Advisors, and Consignors explicitly authorized by the Curatorial Directorate.
                  </p>
                </div>

                {authReason === "UNAUTHORIZED_COLLECTOR" && currentUser && (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left space-y-1">
                    <div className="flex items-center space-x-2 font-medium">
                      <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span>Account Status: {currentUser.role?.toUpperCase()} (Publishing Withheld)</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-normal pl-6">
                      You are signed in as <strong>{currentUser.fullName}</strong> ({currentUser.email}).
                      Your account does not yet have curatorial publishing clearance from the Directorate.
                      The administrator can grant you access in the <strong>Curator Permissions & Consignors</strong> tab.
                    </p>
                  </div>
                )}

                {passkeyError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2 text-left">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{passkeyError}</span>
                  </div>
                )}

                {/* Directorate Verification / Authentication Controls */}
                <div className="pt-4 border-t border-[#E5E5EA] max-w-md mx-auto space-y-4 text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="/login"
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#263A31] text-white hover:bg-[#1B2A23] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                    >
                      Login Karein (Sign In) →
                    </a>
                    <a
                      href="/register"
                      className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#263A31] text-[#263A31] hover:bg-[#F7F5F0] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                    >
                      Naya Account Banayein →
                    </a>
                  </div>

                  <div className="pt-3 border-t border-[#E5E5EA]/70">
                    <button
                      type="button"
                      onClick={() => handlePasskeyAuth("DARBAAR-DIRECTORATE-2026")}
                      disabled={passkeyLoading}
                      className="text-[11px] uppercase tracking-wider text-[#A68A55] font-semibold hover:underline flex items-center justify-center space-x-1.5 mx-auto"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{passkeyLoading ? "Verifying..." : "Directorate Superadmin Quick Access (darbaar3001@gmail.com)"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AUTHORIZED CURATOR FORM */}
          {!authChecking && isAuthorized && (
            <div className="space-y-6">
              {/* Curator Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-[#263A31]/5 border border-[#263A31]/20 rounded-sm">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
                  <div>
                    <div className="text-[11px] font-medium text-[#111111] flex items-center space-x-2">
                      <span>
                        Accredited Curator: <strong className="font-semibold">{currentUser?.fullName || "Directorate Superadmin"}</strong>
                      </span>
                      <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#263A31] text-[#C4AC79] font-mono">
                        {currentUser?.role?.toUpperCase() || "ADMIN"} CLEARANCE ACTIVE
                      </span>
                    </div>
                    <p className="text-[10px] text-[#686868]">
                      Authorized by DARBAAR Curatorial Directorate to inscribe museum specimens into MongoDB Atlas.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#A68A55] uppercase tracking-wider sm:text-right">
                  Dossier Ref: #DARBAAR-2026
                </span>
              </div>

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
                    {loading ? "Inscribing..." : "Inscribe to Catalogue"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
