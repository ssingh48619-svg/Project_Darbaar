"use client";

import React from "react";
import { Handshake, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export default function SellPage() {
  const { openInquiryModal } = useDarbaar();

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="bg-[#263A31] text-white py-16 sm:py-24 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C4AC79] font-semibold block">
            Consignment & Private Treaty
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal">
            Consign With DARBAAR
          </h1>
          <p className="text-sm sm:text-base text-[#EAE5DC]/80 font-light leading-relaxed">
            Direct access to qualified collectors, royal family offices, and institutions across Geneva, London, Dubai, and Singapore without public auction exposure.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
            <span className="text-xs font-serif text-[#A68A55] font-semibold">STAGE 01</span>
            <h3 className="text-lg font-serif text-[#111111]">Confidential Appraisal</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Submit images and documentation under a mutual non-disclosure agreement for an initial valuation range and market assessment.
            </p>
          </div>

          <div className="p-6 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
            <span className="text-xs font-serif text-[#A68A55] font-semibold">STAGE 02</span>
            <h3 className="text-lg font-serif text-[#111111]">Vault Intake & Inspection</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Physical intake at our Geneva, Zurich, or Singapore vault corridors for scientific photography and condition scorecard creation.
            </p>
          </div>

          <div className="p-6 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
            <span className="text-xs font-serif text-[#A68A55] font-semibold">STAGE 03</span>
            <h3 className="text-lg font-serif text-[#111111]">Private Treaty Placement</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Discreet presentation to pre-qualified buyers with guaranteed settlement escrow through authorized banking partners.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => openInquiryModal()}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
          >
            Submit an Asset for Private Valuation
          </button>
        </div>
      </section>
    </div>
  );
}

