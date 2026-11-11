"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Watch, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";
import { CURRENCIES } from "@/lib/currency";

export default function TimepiecesPage() {
  const { assets, formatRange, currency, openSpecimenModal, openInquiryModal } = useDarbaar();

  const departmentAssets = assets.filter((a) => a.category === "timepieces");

  const categories = [
    {
      title: "High Complications & Calendar Chronographs",
      maisons: "Patek Philippe, Audemars Piguet, Vacheron Constantin",
      description:
        "Perpetual calendar chronographs, minute repeaters, split-seconds, and tourbillons from the golden eras of classical watchmaking. Strict curatorial criteria requiring unpolished case bevels, factory hallmarks, and complete archival extracts.",
      protocols: "Extract from the Archives coordination, 360-degree microscopic case geometry audit, isochronism timing verification.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Independent Contemporary Haute Horlogerie",
      maisons: "F.P. Journe, Philippe Dufour, Kari Voutilainen",
      description:
        "The avant-garde mastery of independent watchmakers. Featuring solid gold movements, resonance chronometers, and hand-finished guilloché dials produced in limited annual volumes.",
      protocols: "Movement rate diagnostics, boutique guarantee verification, caseback serial matching.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Iconic Historical Design & Monobloc Architecture",
      maisons: "Cartier London, Audemars Piguet (A-Series), Vacheron Constantin (222)",
      description:
        "Groundbreaking silhouettes that redefined horological aesthetics: from the Cartier Crash born in Swinging London to the integrated steel revolution of Gérald Genta and Jörg Hysek.",
      protocols: "Dial originality audit, UV luminescence tritium decay analysis, hallmarking spectrometry.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen">
      {/* Department Hero */}
      <section className="bg-[#263A31] text-white py-16 sm:py-24 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C4AC79] font-semibold">
            <Watch className="w-3.5 h-3.5" />
            <span>Haute Horlogerie • DARBAAR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal leading-tight">
            Rare & Historical Timepieces
          </h1>
          <p className="text-sm sm:text-base text-[#EAE5DC]/80 font-light leading-relaxed">
            Curated advisory for the world&apos;s most discerning collectors. Every horological specimen evaluated by DARBAAR undergoes rigorous physical examination in our Geneva and London vault suites, prioritizing untouched original condition and unquestioned provenance.
          </p>
        </div>
      </section>

      {/* Main Department Treatise */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="space-y-12">
          <div className="border-b border-[#E5E5EA] pb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
              Horological Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] font-normal mt-1">
              Curatorial Standards for Haute Horlogerie
            </h2>
          </div>

          <div className="space-y-12">
            {categories.map((c, idx) => (
              <div
                key={idx}
                className="bg-[#F7F5F0] border border-[#E5E5EA] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 relative h-72 sm:h-84 w-full bg-[#EAE5DC] overflow-hidden border border-[#E5E5EA]">
                  <LuxuryImage
                    src={c.image}
                    alt={c.title}
                    fallbackTitle={c.title}
                    categoryLabel={c.maisons}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                      {c.maisons}
                    </span>
                    <h3 className="text-2xl font-serif text-[#111111] font-normal mt-0.5">
                      {c.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
                    {c.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#E5E5EA] text-xs">
                    <div>
                      <strong className="text-[#111111] font-medium">Evaluation Protocols:</strong>{" "}
                      <span className="text-[#686868] font-light">{c.protocols}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Department Inventory */}
        {departmentAssets.length > 0 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E5EA] pb-6 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
                  Archival Horological Inventory
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] font-normal mt-1">
                  Timepiece Specimens & Live Valuations
                </h2>
              </div>
              <div className="flex items-center space-x-2 bg-[#F7F5F0] border border-[#E5E5EA] px-3.5 py-1.5 rounded-xs self-start sm:self-auto">
                <span className="text-sm">{CURRENCIES[currency]?.flag}</span>
                <span className="text-xs font-semibold text-[#111111]">
                  Active Currency: {currency} ({CURRENCIES[currency]?.symbol})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departmentAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-[#F7F5F0] border border-[#E5E5EA] flex flex-col justify-between group hover:border-[#A68A55] transition-all duration-300 shadow-xs"
                >
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
                    <div className="absolute top-3 left-3 bg-black/75 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 z-10">
                      {asset.referenceNumber}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-[#263A31] text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#E5E5EA] z-10">
                      {asset.provenanceStatus}
                    </div>
                  </div>

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

                    <div className="pt-4 border-t border-[#E5E5EA] space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-[#686868]">
                          Indicative Valuation:
                        </span>
                        <span className="text-sm font-serif font-bold text-[#263A31]">
                          {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => openSpecimenModal(asset)}
                          className="w-full text-center py-2 text-[10px] uppercase tracking-[0.16em] font-medium text-[#111111] bg-white hover:bg-[#EAE5DC] border border-[#E5E5EA] transition-colors"
                        >
                          Scorecard
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
          </div>
        )}

        {/* Advisory Action Section */}
        <div className="p-8 sm:p-12 bg-[#263A31] text-[#F7F5F0] text-center space-y-6 max-w-3xl mx-auto rounded-xs">
          <h3 className="text-2xl sm:text-3xl font-serif text-white">
            Commission a Private Horological Sourcing Mandate
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE5DC]/80 font-light max-w-xl mx-auto leading-relaxed">
            Whether seeking an unpolished perpetual calendar or negotiating an off-market private treaty acquisition, our Senior Horological Partners provide fiduciary-level guidance.
          </p>
          <button
            onClick={() => openInquiryModal()}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] bg-[#C4AC79] hover:bg-white transition-colors"
          >
            Initiate Horological Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
