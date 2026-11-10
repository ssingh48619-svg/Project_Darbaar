"use client";

import React from "react";
import { BookOpen, Shield, Layers, Scale, Sparkles } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export default function AdvisoryPage() {
  const { openInquiryModal } = useDarbaar();

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="bg-[#F7F5F0] border-b border-[#E5E5EA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
              Private Client Advisory
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] font-normal leading-tight">
              Advisory & Collection Stewardship
            </h1>
            <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed">
              We provide fiduciary-grade guidance across acquisition due diligence, independent authentication coordination, provenance reconstruction, and multi-generational collection preservation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#F7F5F0] border border-[#E5E5EA] space-y-4">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center text-[#263A31]">
              <BookOpen className="w-5 h-5 text-[#A68A55]" />
            </div>
            <h3 className="text-xl font-serif text-[#111111]">Provenance Archival Research</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Deciphering royal Persian and Devanagari inscriptions, cross-referencing toshakhana records, colonial customs ledgers, and auction archive catalogues to establish unbroken title and authentic cultural heritage standing.
            </p>
          </div>

          <div className="p-8 bg-[#F7F5F0] border border-[#E5E5EA] space-y-4">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center text-[#263A31]">
              <Shield className="w-5 h-5 text-[#A68A55]" />
            </div>
            <h3 className="text-xl font-serif text-[#111111]">Independent Laboratory Coordination</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Facilitating scientific condition testing, metallurgical analysis of wootz steel, carbon dating of wasli supports, and manufacturer register extracts with accredited global specialists.
            </p>
          </div>

          <div id="collection" className="p-8 bg-[#F7F5F0] border border-[#E5E5EA] space-y-4">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center text-[#263A31]">
              <Layers className="w-5 h-5 text-[#A68A55]" />
            </div>
            <h3 className="text-xl font-serif text-[#111111]">Collection Management & Vaulting</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Digital cataloguing, high-resolution condition imaging, conservation planning, and secure vault liaison in Geneva and Singapore Free Ports.
            </p>
          </div>

          <div id="valuations" className="p-8 bg-[#F7F5F0] border border-[#E5E5EA] space-y-4">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center text-[#263A31]">
              <Scale className="w-5 h-5 text-[#A68A55]" />
            </div>
            <h3 className="text-xl font-serif text-[#111111]">Valuation Coordination</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Coordinating insurance and estate appraisals with certified valuation fellows, distinguishing current replacement cost from private treaty realization values.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => openInquiryModal()}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
          >
            Retain DARBAAR Advisory Desk
          </button>
        </div>
      </section>
    </div>
  );
}
