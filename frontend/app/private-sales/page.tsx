"use client";

import React from "react";
import { Lock, Shield, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export default function PrivateSalesPage() {
  const { openInquiryModal } = useDarbaar();

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="bg-[#263A31] text-white py-16 sm:py-24 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C4AC79] font-semibold block">
              Discreet Off-Market Brokerage
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-normal">
              Private Treaty Sales
            </h1>
            <p className="text-sm sm:text-base text-[#EAE5DC]/80 font-light leading-relaxed">
              Tailored acquisitions and direct consignments outside public auctions. Protecting collector anonymity and preserving asset market values through private negotiation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
            <span className="text-xs font-serif text-[#A68A55] font-semibold">01 / SOURCING</span>
            <h3 className="text-xl font-serif text-[#111111]">Targeted Acquisition</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Locating historical wristwatches, court miniatures, or rare palace arms held in private trusts that never reach public auctions.
            </p>
          </div>

          <div className="p-8 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
            <span className="text-xs font-serif text-[#A68A55] font-semibold">02 / BROKERAGE</span>
            <h3 className="text-xl font-serif text-[#111111]">Seller Representation</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Consign high-value assets directly to vetted private buyers under binding confidentiality agreements, avoiding public hammer price exposure.
            </p>
          </div>

          <div className="p-8 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
            <span className="text-xs font-serif text-[#A68A55] font-semibold">03 / SETTLEMENT</span>
            <h3 className="text-xl font-serif text-[#111111]">Regulated Escrow Liaison</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Coordinating title transfer and escrow settlements with accredited third-party Swiss and UK trust entities.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 bg-[#F7F5F0] border border-[#E5E5EA] text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
            Initiate a Confidential Sourcing or Consignment Mandate
          </h2>
          <p className="text-xs sm:text-sm text-[#686868] font-light max-w-xl mx-auto">
            Our Senior Private Treaty Advisors are available across our Geneva, London, New York, and Singapore private corridors.
          </p>
          <button
            onClick={() => openInquiryModal()}
            className="inline-flex items-center space-x-2 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-[#C4AC79]" />
            <span>Request Private Sales Consultation</span>
          </button>
        </div>
      </section>
    </div>
  );
}
