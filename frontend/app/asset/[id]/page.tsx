"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronLeft,
  FileText,
  Calendar,
  MapPin,
  Eye,
  Sparkles,
  Lock,
  ArrowRight,
  ZoomIn,
} from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURATED_ASSETS } from "@/lib/data";
import { LuxuryImage } from "@/components/LuxuryImage";

export default function AssetDetailPage() {
  const params = useParams();
  const slugOrId = params?.id as string;
  const { formatRange, openSpecimenModal, openInquiryModal } = useDarbaar();

  const asset = CURATED_ASSETS.find(
    (a) => a.slug === slugOrId || a.id === slugOrId
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!asset) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-serif">Asset Not Located</h2>
        <p className="text-xs text-[#686868]">
          The requested archival reference is currently unlisted or held in private treaty reserve.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#263A31]"
        >
          Return to DARBAAR Catalogue
        </Link>
      </div>
    );
  }

  const currentImage = asset.galleryImages[activeImageIndex] || asset.image;

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Back Breadcrumb Bar */}
      <div className="border-b border-[#E5E5EA] bg-[#F7F5F0] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[#686868] hover:text-[#111111] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="uppercase tracking-wider">Back to Catalogue</span>
          </Link>
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#A68A55]">
            <span>{asset.categoryLabel}</span>
            <span>•</span>
            <span className="font-mono text-[#686868]">{asset.referenceNumber}</span>
          </div>
        </div>
      </div>

      {/* Main Asset Detail Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className="relative w-full h-[420px] sm:h-[540px] bg-[#F7F5F0] border border-[#E5E5EA] overflow-hidden group cursor-crosshair"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <LuxuryImage
                src={currentImage}
                alt={asset.title}
                fallbackTitle={asset.title}
                categoryLabel={asset.categoryLabel}
                fill
                priority
                className={`object-cover object-center transition-all duration-300 ${
                  isZoomed ? "scale-150" : "group-hover:scale-105"
                }`}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {asset.isDemonstration && (
                <div className="absolute top-4 left-4 bg-black/75 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 backdrop-blur-xs">
                  Demonstration Listing
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] px-3 py-1.5 rounded flex items-center space-x-1 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? "Click to reset" : "Click to magnify"}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {asset.galleryImages.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {asset.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-20 h-20 flex-shrink-0 border-2 overflow-hidden transition-all ${
                      activeImageIndex === i
                        ? "border-[#A68A55] opacity-100"
                        : "border-[#E5E5EA] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <LuxuryImage
                      src={img}
                      alt={`View ${i + 1}`}
                      fallbackTitle={`View ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Historical Context Text Box */}
            <div className="pt-6 border-t border-[#E5E5EA] space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#A68A55] font-semibold">
                Historical Context & Atelier Significance
              </h3>
              <p className="text-xs sm:text-sm text-[#111111] leading-relaxed font-light">
                {asset.historicalContext}
              </p>
            </div>
          </div>

          {/* Right Column: Specifications & Advisory Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-[#E5E5EA] pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold">
                  {asset.makerOrArtist}
                </span>
                <span className="text-xs font-serif text-[#686868]">{asset.year}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-[#111111] font-normal leading-snug">
                {asset.title}
              </h1>

              <div className="pt-1 flex items-center space-x-2 text-[11px] text-[#263A31]">
                <ShieldCheck className="w-4 h-4 text-[#A68A55]" />
                <span className="font-medium">Provenance Status: {asset.provenanceStatus}</span>
              </div>
            </div>

            {/* Indicative Valuation Block */}
            <div className="p-5 bg-[#F7F5F0] border border-[#E5E5EA] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#686868]">
                Indicative Market Valuation:
              </span>
              <p className="text-2xl font-serif text-[#263A31] font-semibold">
                {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
              </p>
              <p className="text-[10px] text-[#686868] italic">
                Converted dynamically via genuine interbank rates. Concluded via private treaty.
              </p>
            </div>

            {/* Specifications Ledger */}
            <div className="space-y-3 text-xs border-b border-[#E5E5EA] pb-6">
              <h4 className="text-[11px] uppercase tracking-wider text-[#111111] font-semibold">
                Technical Specifications & Provenance Ledger
              </h4>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-1">
                <div>
                  <span className="text-[10px] text-[#686868] block">Reference Number:</span>
                  <span className="font-mono text-[#111111]">{asset.referenceNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#686868] block">Period / Date:</span>
                  <span className="text-[#111111]">{asset.year}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-[#686868] block">Dimensions / Movement:</span>
                  <span className="text-[#111111]">{asset.dimensionsOrSpecs}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-[#686868] block">Condition Summary:</span>
                  <span className="text-[#111111]">{asset.conditionSummary}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-[#686868] block">Ownership Continuity:</span>
                  <span className="text-[#111111]">{asset.provenanceSummary}</span>
                </div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => openInquiryModal(asset)}
                className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-all shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-[#C4AC79]" />
                <span>Enquire Privately Regarding Acquisition</span>
              </button>

              <button
                type="button"
                onClick={() => openSpecimenModal(asset)}
                className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] bg-[#F7F5F0] hover:bg-[#EAE5DC] border border-[#E5E5EA] transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-[#A68A55]" />
                <span>Inspect Specimen Scorecard & Timeline</span>
              </button>
            </div>

            {/* Independent Inspection Guarantee Note */}
            <div className="p-4 bg-[#F7F5F0]/60 border border-[#E5E5EA] text-[10px] text-[#686868] space-y-1">
              <span className="font-semibold text-[#111111] block">
                Independent Expert Corroboration:
              </span>
              <p className="font-light leading-relaxed">
                Physical examination coordinated via {asset.specimenDetails.independentInspector}. Full analytical dossiers and archive extracts dispatched upon receipt of client credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

