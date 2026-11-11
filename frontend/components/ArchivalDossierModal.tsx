"use client";

import React from "react";
import { X, Printer, ShieldCheck, CheckCircle2, Award, Calendar, MapPin, Download } from "lucide-react";
import { CuratedAsset } from "@/lib/types";

interface ArchivalDossierModalProps {
  asset: CuratedAsset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArchivalDossierModal({ asset, isOpen, onClose }: ArchivalDossierModalProps) {
  if (!isOpen || !asset) return null;

  const { specimenDetails } = asset;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-[#111111] border border-[#A68A55]/40 shadow-2xl my-8 overflow-hidden rounded-xs flex flex-col max-h-[94vh]">
        {/* Top Control Bar (Hidden during Print) */}
        <div className="no-print flex items-center justify-between px-6 py-3.5 border-b border-[#E5E5EA] bg-[#F7F5F0]">
          <div className="flex items-center space-x-2 text-[#263A31]">
            <Award className="w-4 h-4 text-[#A68A55]" />
            <span className="text-xs uppercase tracking-[0.22em] font-semibold">
              Official Archival Dossier & Certificate of Examination
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 text-xs uppercase tracking-wider font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#C4AC79]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#686868] hover:text-[#111111] transition-colors rounded-full hover:bg-[#EAE5DC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Archival Certificate Body */}
        <div className="overflow-y-auto p-8 sm:p-14 space-y-10 print-dossier bg-[#FFFFFF] relative">
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-9xl font-serif tracking-[0.3em] uppercase text-black rotate-[-25deg]">
              DARBAAR
            </span>
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 border-b-2 border-[#A68A55] pb-8 relative">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#A68A55] font-semibold block">
              Curatorial Directorate of Archival Preservation
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-[0.2em] text-[#111111] uppercase">
              DARBAAR
            </h1>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#686868]">
              Where Heritage Meets Rarity • Geneva • London • New York • Singapore
            </p>
            <div className="pt-3">
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.25em] bg-[#F7F5F0] border border-[#E5E5EA] font-mono text-[#263A31]">
                Dossier Inscription Ref: {specimenDetails.dossierReference}
              </span>
            </div>
          </div>

          {/* Specimen Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#E5E5EA] pb-8">
            <div className="sm:col-span-2 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                Catalogue Inscription
              </span>
              <h2 className="text-2xl font-serif text-[#111111]">{asset.title}</h2>
              <p className="text-xs text-[#686868]">
                Atelier / Master: <span className="text-[#111111] font-medium">{asset.makerOrArtist}</span> • Year: <span className="text-[#111111] font-medium">{asset.year}</span>
              </p>
              <p className="text-xs text-[#686868]">
                Reference: <span className="font-mono text-[#111111]">{asset.referenceNumber}</span> | Category: {asset.categoryLabel}
              </p>
            </div>
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E5EA] flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#686868]">Examination Location</span>
              <p className="text-xs font-serif font-medium text-[#111111]">{specimenDetails.conditionScorecard.inspectionLocation}</p>
              <span className="text-[10px] text-[#A68A55] mt-2 block">Date: {specimenDetails.inspectionDate}</span>
            </div>
          </div>

          {/* Physical Condition Scorecard */}
          <div className="space-y-4 border-b border-[#E5E5EA] pb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#A68A55]" />
                <span>Physical Examination Scorecard</span>
              </h3>
              <span className="text-lg font-serif font-bold text-[#263A31]">
                {specimenDetails.conditionScorecard.preservationScore} / 100 ({specimenDetails.conditionScorecard.overallGrade})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#F7F5F0] border border-[#E5E5EA]">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Case / Support Surface:</span>
                <p className="font-light mt-0.5 text-[#111111]">{specimenDetails.conditionScorecard.caseOrSupport}</p>
              </div>
              <div className="p-3 bg-[#F7F5F0] border border-[#E5E5EA]">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Dial / Face Luminescence:</span>
                <p className="font-light mt-0.5 text-[#111111]">{specimenDetails.conditionScorecard.dialOrSurface}</p>
              </div>
              <div className="p-3 bg-[#F7F5F0] border border-[#E5E5EA]">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Movement / Calibre Integrity:</span>
                <p className="font-light mt-0.5 text-[#111111]">{specimenDetails.conditionScorecard.movementOrStructure}</p>
              </div>
              <div className="p-3 bg-[#F7F5F0] border border-[#E5E5EA]">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Originality Assessment:</span>
                <p className="font-medium mt-0.5 text-[#263A31]">{specimenDetails.conditionScorecard.originalityRating}</p>
              </div>
            </div>
          </div>

          {/* Documented Provenance Chronology */}
          <div className="space-y-4 border-b border-[#E5E5EA] pb-8">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111]">
              Documented Ownership Chronology (Provenance Chain)
            </h3>

            <div className="space-y-3">
              {specimenDetails.provenanceTimeline.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-3 bg-[#F7F5F0] border border-[#E5E5EA] text-xs">
                  <div className="w-16 font-serif font-bold text-[#263A31] text-sm flex-shrink-0">
                    {item.year}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#111111]">{item.location}</span>
                      <span className="text-[10px] text-emerald-800 font-medium flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </div>
                    <p className="text-[#686868] font-light">{item.description}</p>
                    <p className="text-[10px] text-[#A68A55] font-mono">Evidence: {item.documentationType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Authorization Seal */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs text-[#111111] font-serif">Independent Laboratory Coordinator</p>
              <p className="text-xs text-[#686868] font-light">{specimenDetails.independentInspector}</p>
              <p className="text-[10px] text-[#A68A55]">Accredited Curatorial Directorate</p>
            </div>

            <div className="w-32 h-32 border-2 border-[#A68A55] rounded-full flex flex-col items-center justify-center text-center p-2 text-[#A68A55]">
              <span className="text-[8px] uppercase tracking-[0.2em] font-bold">DARBAAR</span>
              <span className="text-[7px] uppercase tracking-wider text-[#263A31] my-0.5 font-semibold">CERTIFIED VAULT</span>
              <span className="text-[7px] font-mono text-[#686868]">{specimenDetails.dossierReference}</span>
            </div>

            <div className="space-y-1 text-center sm:text-right">
              <p className="text-xs text-[#111111] font-serif">Managing Curatorial Partner</p>
              <p className="text-xs text-[#686868] font-light">DARBAAR Advisory Directorate</p>
              <p className="text-[10px] text-[#263A31] font-mono">Digital Signature: VERIFIED 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

