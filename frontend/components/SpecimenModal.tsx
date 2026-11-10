"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ShieldCheck, CheckCircle2, FileText, Calendar, MapPin, ZoomIn, Eye, Sparkles, Send } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export function SpecimenModal() {
  const { specimenAsset, closeSpecimenModal, openInquiryModal, formatRange } = useDarbaar();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [dossierRequested, setDossierRequested] = useState(false);

  if (!specimenAsset) return null;

  const { specimenDetails } = specimenAsset;
  const currentImage = specimenAsset.galleryImages[activeImageIndex] || specimenAsset.image;

  const handleRequestDossier = (e: React.FormEvent) => {
    e.preventDefault();
    setDossierRequested(true);
    setTimeout(() => {
      setDossierRequested(false);
      closeSpecimenModal();
      openInquiryModal(specimenAsset);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FFFFFF] border border-[#E5E5EA] shadow-2xl my-8 overflow-hidden rounded-sm flex flex-col max-h-[92vh]">
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5EA] bg-[#F7F5F0]">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#263A31]" />
              Physical Specimen Inspection & Archival Dossier
            </span>
            {specimenAsset.isDemonstration && (
              <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#EAE5DC] text-[#686868] border border-[#E5E5EA] rounded">
                Demonstration Record
              </span>
            )}
          </div>
          <button
            onClick={closeSpecimenModal}
            className="p-1.5 text-[#686868] hover:text-[#111111] transition-colors rounded-full hover:bg-[#EAE5DC]"
            aria-label="Close Inspection Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Section 1: Title and Core Reference */}
          <div className="border-b border-[#E5E5EA] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A68A55] font-medium">
                {specimenAsset.makerOrArtist} • {specimenAsset.year}
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] mt-1 font-normal">
                {specimenAsset.title}
              </h2>
              <p className="text-xs text-[#686868] mt-1 tracking-wide">
                Reference / Accession: <span className="font-mono text-[#111111]">{specimenAsset.referenceNumber}</span> | Category: {specimenAsset.categoryLabel}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[11px] uppercase tracking-wider text-[#686868]">Indicative Valuation</p>
              <p className="text-xl font-serif text-[#263A31] font-semibold">
                {formatRange(specimenAsset.valuationMinUSD, specimenAsset.valuationMaxUSD)}
              </p>
              <p className="text-[10px] text-[#686868] italic">Subject to private treaty confirmation</p>
            </div>
          </div>

          {/* Section 2: Visual Inspection & Magnification */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              <div
                className={`relative w-full h-[340px] sm:h-[420px] bg-[#F7F5F0] border border-[#E5E5EA] overflow-hidden group cursor-crosshair ${
                  isZoomed ? "scale-105 transition-transform duration-300" : ""
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={currentImage}
                  alt={specimenAsset.title}
                  fill
                  className={`object-cover object-center transition-all duration-300 ${
                    isZoomed ? "scale-150" : "group-hover:scale-105"
                  }`}
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded backdrop-blur-sm flex items-center space-x-1 pointer-events-none">
                  <ZoomIn className="w-3 h-3" />
                  <span>{isZoomed ? "Click to reset" : "Click to magnify"}</span>
                </div>
              </div>

              {/* Thumbnails */}
              {specimenAsset.galleryImages.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                  {specimenAsset.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border-2 overflow-hidden transition-all ${
                        activeImageIndex === idx ? "border-[#A68A55] opacity-100" : "border-[#E5E5EA] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`Angle ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Condition Scorecard Column */}
            <div className="lg:col-span-5 bg-[#F7F5F0] p-6 border border-[#E5E5EA] space-y-5">
              <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-3">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#A68A55]" />
                  Condition Scorecard
                </h3>
                <div className="text-right">
                  <span className="text-lg font-serif font-bold text-[#263A31]">
                    {specimenDetails.conditionScorecard.preservationScore}/100
                  </span>
                  <p className="text-[9px] uppercase tracking-wider text-[#A68A55]">
                    {specimenDetails.conditionScorecard.overallGrade}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#111111]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Case & Support:</span>
                  <p className="font-light mt-0.5">{specimenDetails.conditionScorecard.caseOrSupport}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Dial & Surface:</span>
                  <p className="font-light mt-0.5">{specimenDetails.conditionScorecard.dialOrSurface}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Movement & Structure:</span>
                  <p className="font-light mt-0.5">{specimenDetails.conditionScorecard.movementOrStructure}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Originality Assessment:</span>
                  <p className="font-medium text-[#263A31] mt-0.5">{specimenDetails.conditionScorecard.originalityRating}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E5EA] text-[11px] text-[#686868] space-y-1">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A68A55]" />
                  <span>Vault: {specimenDetails.conditionScorecard.inspectionLocation}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A68A55]" />
                  <span>Inspected on: {specimenDetails.inspectionDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Provenance Records & Archival Timeline */}
          <div className="border-t border-[#E5E5EA] pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-[0.2em] text-[#111111] font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A68A55]" />
                Documented Provenance Records
              </h3>
              <span className="text-xs text-[#263A31] font-medium bg-[#EAE5DC] px-2.5 py-1 rounded">
                Status: {specimenAsset.provenanceStatus}
              </span>
            </div>

            <div className="relative pl-6 border-l border-[#A68A55]/40 space-y-6">
              {specimenDetails.provenanceTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#A68A55] border-2 border-white"></div>
                  <div className="bg-[#F7F5F0]/60 p-4 border border-[#E5E5EA]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-serif font-bold text-[#111111]">{item.year}</span>
                      <span className="text-[11px] text-[#686868] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#A68A55]" /> {item.location}
                      </span>
                    </div>
                    <p className="text-xs text-[#111111] mt-1.5 font-light">{item.description}</p>
                    <div className="mt-2 flex items-center space-x-1.5 text-[10px] text-[#263A31] font-medium">
                      <CheckCircle2 className="w-3 h-3 text-[#263A31]" />
                      <span>Documentation: {item.documentationType}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Independent Specialist Reports Available */}
          <div className="border-t border-[#E5E5EA] pt-6 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold">
              Available Specialist Reports & Dossiers
            </h3>
            <p className="text-xs text-[#686868] font-light">
              Coordinated via {specimenDetails.independentInspector}. Full physical and digital dossiers are accessible to verified collectors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {specimenDetails.availableReports.map((report, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-start space-x-2.5 p-3 bg-[#F7F5F0] border border-[#E5E5EA] text-xs text-[#111111]"
                >
                  <FileText className="w-4 h-4 text-[#A68A55] flex-shrink-0 mt-0.5" />
                  <span className="font-light">{report}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Confidential Dossier Request Action */}
          <div className="border-t border-[#E5E5EA] pt-6 bg-[#F7F5F0] p-6 rounded-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm uppercase tracking-[0.18em] text-[#111111] font-medium">
                  Request Complete Archival Dossier
                </h4>
                <p className="text-xs text-[#686868] font-light mt-0.5">
                  Receive high-resolution microscopic condition files, laboratory spectrography, and full ownership records under NDA.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRequestDossier}
                disabled={dossierRequested}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors flex-shrink-0"
              >
                {dossierRequested ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C4AC79]" />
                    <span>Preparing Private Dossier...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#C4AC79]" />
                    <span>Request Confidential Dossier</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
