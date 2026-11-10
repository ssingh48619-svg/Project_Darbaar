"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Eye, Sparkles, ArrowRight } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURATED_ASSETS } from "@/lib/data";
import { LuxuryImage } from "@/components/LuxuryImage";

export default function FineArtPage() {
  const { formatRange, openSpecimenModal, openInquiryModal } = useDarbaar();
  const artAssets = CURATED_ASSETS.filter((a) => a.category === "fine-art");

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen">
      {/* Category Editorial Banner */}
      <section className="bg-[#F7F5F0] border-b border-[#E5E5EA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Department • DARBAAR</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] font-normal leading-tight">
              Fine Art & Miniatures
            </h1>
            <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed">
              From the luminous mineral pigments and burnished gold leaf of 18th-century Rajput palace court workshops to significant mid-century modernist European bronzeworks, our Fine Art department curates objects of documented cultural prominence.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Fine Art Assets */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5E5EA]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#686868]">
            Showing <strong className="text-[#111111]">{artAssets.length}</strong> Curated Masterworks
          </span>
          <span className="text-[11px] text-[#A68A55] font-medium tracking-wider uppercase">
            Archival Provenance Cleared
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#F7F5F0] border border-[#E5E5EA] flex flex-col justify-between group hover:border-[#A68A55] transition-all duration-300"
            >
              <div className="relative h-80 w-full bg-[#EAE5DC] overflow-hidden">
                <LuxuryImage
                  src={asset.image}
                  alt={asset.title}
                  fallbackTitle={asset.title}
                  categoryLabel={asset.categoryLabel}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/75 text-white text-[9px] uppercase tracking-wider px-2 py-0.5">
                  Demonstration Listing
                </div>
                <div className="absolute top-3 right-3 bg-white/90 text-[#263A31] text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#A68A55]" />
                  <span>{asset.provenanceStatus}</span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4 bg-white">
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-widest text-[#A68A55] font-medium block">
                    {asset.makerOrArtist} • {asset.year}
                  </span>
                  <Link href={`/asset/${asset.slug}`} className="hover:underline">
                    <h3 className="text-lg font-serif text-[#111111] font-normal leading-snug">
                      {asset.title}
                    </h3>
                  </Link>
                  <p className="text-[11px] text-[#686868] font-mono">
                    {asset.referenceNumber}
                  </p>
                  <p className="text-xs text-[#686868] font-light line-clamp-2 mt-1">
                    {asset.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E5EA] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#686868]">
                      Indicative Valuation:
                    </span>
                    <span className="text-sm font-serif font-semibold text-[#263A31]">
                      {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openSpecimenModal(asset)}
                      className="py-2.5 px-2 text-[10px] uppercase tracking-[0.16em] font-medium text-[#111111] bg-[#F7F5F0] hover:bg-[#EAE5DC] border border-[#E5E5EA] transition-colors"
                    >
                      Inspect Specimen
                    </button>
                    <button
                      onClick={() => openInquiryModal(asset)}
                      className="py-2.5 px-2 text-[10px] uppercase tracking-[0.16em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                    >
                      Private Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Sourcing Footer Banner */}
        <div className="mt-16 p-8 bg-[#F7F5F0] border border-[#E5E5EA] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-serif text-[#111111]">
              Seeking specific court schools or modern masterworks?
            </h4>
            <p className="text-xs text-[#686868] font-light">
              We maintain confidential acquisition mandates with private family collections across Jaipur, London, and New York.
            </p>
          </div>
          <button
            onClick={() => openInquiryModal()}
            className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
          >
            Commission Fine Art Sourcing
          </button>
        </div>
      </section>
    </div>
  );
}

