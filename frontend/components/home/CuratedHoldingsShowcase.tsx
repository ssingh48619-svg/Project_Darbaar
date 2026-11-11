"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Eye, Sparkles, ArrowRight, ArrowUpRight, Scale } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURRENCIES } from "@/lib/currency";
import { LuxuryImage } from "@/components/LuxuryImage";

export function CuratedHoldingsShowcase() {
  const { assets, formatRange, currency, openSpecimenModal, openInquiryModal } = useDarbaar();

  // Take the primary curated specimens
  const specimens = assets.slice(0, 6);

  return (
    <section id="curated-specimens" className="py-20 sm:py-28 bg-white border-b border-[#E5E5EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5EA] pb-6 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Permanent Holdings • Live Archival Catalogue</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] font-normal">
              Curated Masterpieces & Rare Holdings
            </h2>
            <p className="text-xs sm:text-sm text-[#686868] font-light max-w-2xl leading-relaxed">
              Every specimen is preserved under strict museum conservation guidelines, authenticated via laboratory spectrometry, and inscribed into the DARBAAR archival registry.
            </p>
          </div>

          {/* Active Valuation Currency Pill */}
          <div className="flex items-center space-x-2 bg-[#F7F5F0] border border-[#E5E5EA] px-3.5 py-2 rounded-xs flex-shrink-0">
            <span className="text-sm">{CURRENCIES[currency]?.flag}</span>
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-[#686868] block">Live Currency</span>
              <span className="text-xs font-semibold text-[#111111]">
                {currency} ({CURRENCIES[currency]?.symbol})
              </span>
            </div>
          </div>
        </div>

        {/* Specimen Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specimens.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#F7F5F0] border border-[#E5E5EA] overflow-hidden flex flex-col justify-between group hover:border-[#A68A55] transition-all duration-300 shadow-xs"
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 w-full bg-[#EAE5DC] overflow-hidden">
                <LuxuryImage
                  src={asset.image}
                  alt={asset.title}
                  fallbackTitle={asset.title}
                  categoryLabel={asset.categoryLabel}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest px-2.5 py-1 z-10">
                  {asset.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#263A31] text-[9px] uppercase tracking-wider px-2 py-0.5 font-mono font-medium border border-[#E5E5EA] z-10">
                  {asset.referenceNumber}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                    {asset.makerOrArtist} • {asset.year}
                  </span>
                  <h3 className="text-lg font-serif text-[#111111] leading-snug line-clamp-2">
                    <Link href={`/asset/${asset.slug || asset.id}`} className="hover:text-[#A68A55] transition-colors">
                      {asset.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#686868] font-light line-clamp-2 leading-relaxed">
                    {asset.summary}
                  </p>
                </div>

                {/* Valuation Display with Live Converted Currency */}
                <div className="pt-4 border-t border-[#E5E5EA] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#686868]">
                      Indicative Valuation ({currency}):
                    </span>
                    <span className="text-sm font-serif font-bold text-[#263A31]">
                      {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                    </span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openSpecimenModal(asset)}
                      className="w-full text-center py-2 text-[10px] uppercase tracking-[0.16em] font-medium text-[#111111] bg-white hover:bg-[#EAE5DC] border border-[#E5E5EA] transition-colors"
                    >
                      Dossier
                    </button>
                    <button
                      type="button"
                      onClick={() => openInquiryModal(asset)}
                      className="w-full text-center py-2 text-[10px] uppercase tracking-[0.16em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to View Full Marketplace / Collection */}
        <div className="text-center pt-4">
          <Link
            href="/marketplace"
            className="inline-flex items-center space-x-2 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors shadow-sm"
          >
            <span>Explore Full Curatorial Inventory ({assets.length} Holdings)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C4AC79]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
