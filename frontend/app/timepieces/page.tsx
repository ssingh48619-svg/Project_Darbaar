"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Watch, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";

export default function TimepiecesPage() {
  const { openInquiryModal } = useDarbaar();

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
