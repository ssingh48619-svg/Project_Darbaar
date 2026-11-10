"use client";

import React from "react";
import { ShieldCheck, Search, FileText, CheckCircle2 } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export default function ProvenancePage() {
  const { openInquiryModal } = useDarbaar();

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="bg-[#F7F5F0] border-b border-[#E5E5EA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
            Academic & Archival Standards
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] font-normal leading-tight">
            Provenance & Authentication Standards
          </h1>
          <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed">
            In the global market for historic collectibles and high horology, provenance is the ultimate determinant of integrity and enduring value.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <h2 className="text-2xl font-serif text-[#111111]">Our Due Diligence Framework</h2>
          <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
            DARBAAR conducts exhaustive multi-source verification on every item presented to our clients. We work directly with manufacturer archives, independent horological laboratories, accredited gemmologists, and specialist art historians.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[
              "Title and ownership history verification",
              "National and international cultural property screening",
              "Infrared reflectography and pigment spectrometry",
              "Microscopic movement and case geometry diagnostics",
              "Extract from the Archives coordination",
              "Comprehensive physical condition scorecards",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 p-3.5 bg-[#F7F5F0] border border-[#E5E5EA]">
                <CheckCircle2 className="w-4 h-4 text-[#263A31] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-[#111111] font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clear non-fabrication disclosure */}
        <div className="p-6 bg-[#F7F5F0] border-l-4 border-[#A68A55] text-xs text-[#686868] space-y-2">
          <p className="font-semibold text-[#111111]">Declaration of Integrity:</p>
          <p className="font-light leading-relaxed">
            DARBAAR does not fabricate condition scores, ownership timelines, or inspection credentials. Authentication opinions are coordinated with independent, accredited specialists and laboratories. We do not make misleading claims of infallible guarantees; we provide verified empirical dossiers.
          </p>
        </div>
      </section>
    </div>
  );
}
