"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Eye, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURATED_ASSETS } from "@/lib/data";
import { AssetCategory } from "@/lib/types";
import { LuxuryImage } from "@/components/LuxuryImage";

export function CuratedAssetsGrid() {
  const { formatRange, openSpecimenModal, openInquiryModal } = useDarbaar();
  const [filter, setFilter] = useState<string>("all");

  const filteredAssets = CURATED_ASSETS.filter((a) => {
    if (filter === "all") return true;
    return a.category === filter;
  });

  return (
    <section id="curated-collection" className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E5E5EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Filter Nav */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E5E5EA] pb-6 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
              Curated Catalogue
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] font-normal mt-1">
              Exceptional Works & Rare Complications
            </h2>
            <p className="text-xs text-[#686868] font-light mt-1 max-w-xl">
              Each specimen below has been catalogued with comprehensive condition scorecards, archival provenance records, and independent specialist dossier coordination.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {[
              { id: "all", label: "Complete Gallery" },
              { id: "timepieces", label: "Rare Watches" },
              { id: "fine-art", label: "Fine Art" },
              { id: "collectibles", label: "Heritage Collectibles" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all whitespace-nowrap border ${
                  filter === tab.id
                    ? "bg-[#263A31] text-white border-[#263A31] font-medium"
                    : "bg-white text-[#686868] border-[#E5E5EA] hover:border-[#A68A55] hover:text-[#111111]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white border border-[#E5E5EA] flex flex-col justify-between group hover:border-[#A68A55] transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Asset Image Frame */}
              <div className="relative h-72 sm:h-80 w-full bg-[#EAE5DC] overflow-hidden">
                <LuxuryImage
                  src={asset.image}
                  alt={asset.title}
                  fallbackTitle={asset.title}
                  categoryLabel={asset.categoryLabel}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Demonstration Marker Badge */}
                {asset.isDemonstration && (
                  <div className="absolute top-3 left-3 bg-black/75 text-[#F7F5F0] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs backdrop-blur-xs">
                    Demonstration Listing
                  </div>
                )}

                {/* Provenance Status Tag */}
                <div className="absolute top-3 right-3 bg-white/90 text-[#263A31] text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-xs border border-[#E5E5EA] backdrop-blur-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#A68A55]" />
                  <span>{asset.provenanceStatus}</span>
                </div>

                {/* Quick Inspection Action Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <button
                    onClick={() => openSpecimenModal(asset)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-[#111111] text-xs uppercase tracking-[0.18em] font-medium shadow-lg hover:bg-[#F7F5F0] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#A68A55]" />
                    <span>Inspect Specimen</span>
                  </button>
                </div>
              </div>

              {/* Asset Editorial Information */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#A68A55] font-medium">
                    <span>{asset.makerOrArtist}</span>
                    <span>{asset.year}</span>
                  </div>

                  <h3 className="text-lg font-serif text-[#111111] font-normal leading-snug group-hover:text-[#263A31] transition-colors">
                    {asset.title}
                  </h3>

                  <p className="text-[11px] font-mono text-[#686868]">
                    {asset.referenceNumber} • {asset.dimensionsOrSpecs}
                  </p>

                  <p className="text-xs text-[#686868] line-clamp-2 font-light leading-relaxed">
                    {asset.summary}
                  </p>
                </div>

                {/* Valuation & Actions Bar */}
                <div className="pt-4 border-t border-[#E5E5EA] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#686868]">
                      Indicative Valuation:
                    </span>
                    <span className="text-sm font-serif font-semibold text-[#263A31]">
                      {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openSpecimenModal(asset)}
                      className="w-full text-center py-2.5 px-2 text-[10px] uppercase tracking-[0.16em] font-medium text-[#111111] bg-[#F7F5F0] hover:bg-[#EAE5DC] border border-[#E5E5EA] transition-colors"
                    >
                      Scorecard
                    </button>
                    <button
                      type="button"
                      onClick={() => openInquiryModal(asset)}
                      className="w-full text-center py-2.5 px-2 text-[10px] uppercase tracking-[0.16em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                    >
                      Enquire Privately
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Sourcing Note */}
        <div className="mt-14 p-6 sm:p-8 bg-white border border-[#E5E5EA] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-serif text-[#111111] font-normal">
              Seeking an uncatalogued reference or specific museum acquisition?
            </h4>
            <p className="text-xs text-[#686868] font-light">
              Our private advisory desk maintains off-market mandates with international estates, private trusts, and royal collections.
            </p>
          </div>
          <button
            onClick={() => openInquiryModal()}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#263A31] hover:text-[#111111] border-b border-[#263A31] pb-1 hover:border-[#111111] transition-all flex-shrink-0"
          >
            <span>Commission Private Sourcing Mandate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

