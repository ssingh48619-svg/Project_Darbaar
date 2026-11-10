"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Compass, BookOpen, KeyRound, Sparkles, ArrowRight, ArrowUpRight, Scale, Eye } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";

export function CuratedAssetsGrid() {
  const { openInquiryModal } = useDarbaar();

  const disciplines = [
    {
      id: "fine-art",
      title: "Imperial Fine Art & Miniatures",
      subtitle: "18th-Century Court Ateliers & Modernist Sculptures",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
      description:
        "Specializing in the royal ateliers of Mewar, Kangra, Kishangarh, and Mughal courts, executed with mineral pigments and gold foil on wasli paper, alongside significant post-war European modernist sculptures.",
      standards: [
        "Primary source archival epigraph translation (Takri, Devanagari, Persian)",
        "Non-invasive infrared reflectography & pigment spectrometry",
        "Clearance under national & international cultural property treaties",
      ],
      link: "/fine-art",
    },
    {
      id: "timepieces",
      title: "Haute Horlogerie & Rare Complications",
      subtitle: "Historical Complications & Neo-Vintage Masterworks",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
      description:
        "Curating investment-grade complications from Patek Philippe, F.P. Journe, Audemars Piguet, and Vacheron Constantin. Prioritizing unpolished factory case geometry, documented archive extracts, and pristine period dials.",
      standards: [
        "Official Extract from the Archives coordination in Geneva",
        "Microscopic case bevel integrity & hallmarking verification",
        "Timing diagnostic & amplitude testing in secure vault suites",
      ],
      link: "/timepieces",
    },
    {
      id: "collectibles",
      title: "Palace Toshakhana & Royal Antiquities",
      subtitle: "Imperial Arms, Carved Jade & Ceremonial Regalia",
      image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1200&q=85",
      description:
        "Documenting sovereign court regalia, crucible wootz steel blades with jauhar crystallization, carved nephrite jade hilts, and royal gemstone insignia preserved from royal treasury inventories.",
      standards: [
        "Metallurgical alloy testing & crucible steel carbon verification",
        "Royal Toshakhana inventory cross-referencing",
        "Gemmological origin determination for untreated royal stones",
      ],
      link: "/collectibles",
    },
  ];

  return (
    <section id="curated-collection" className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E5E5EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5EA] pb-6 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
              Curatorial Scope & Departmental Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] font-normal">
              Three Curatorial Disciplines of DARBAAR
            </h2>
            <p className="text-xs sm:text-sm text-[#686868] font-light max-w-2xl leading-relaxed">
              DARBAAR does not maintain a commercial storefront. We operate as a private curatorial house, conducting bespoke acquisition due diligence and off-market private sourcing across three specialized historical fields.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openInquiryModal()}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] px-6 py-3 transition-colors flex-shrink-0"
          >
            <span>Retain Advisory Desk</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C4AC79]" />
          </button>
        </div>

        {/* 3 Editorial Discipline Deep-Dives */}
        <div className="space-y-12">
          {disciplines.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white border border-[#E5E5EA] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#A68A55] transition-all duration-300 shadow-xs ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Frame */}
              <div className="lg:col-span-5 relative h-72 sm:h-96 w-full bg-[#EAE5DC] overflow-hidden border border-[#E5E5EA]">
                <LuxuryImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  categoryLabel={item.subtitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C4AC79] block">
                    Curatorial Focus 0{index + 1}
                  </span>
                  <p className="text-base font-serif font-medium mt-0.5">{item.title}</p>
                </div>
              </div>

              {/* Text & Curatorial Standards */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#111111] font-normal leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Standards Checklist */}
                <div className="space-y-2.5 pt-2 border-t border-[#E5E5EA]">
                  <p className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    DARBAAR Acquisition & Stewardship Protocols:
                  </p>
                  <div className="space-y-2 text-xs text-[#111111]">
                    {item.standards.map((std, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-2.5">
                        <ShieldCheck className="w-4 h-4 text-[#263A31] flex-shrink-0 mt-0.5" />
                        <span className="font-light">{std}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Department Link & Advisory CTA */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href={item.link}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.18em] text-[#263A31] hover:text-[#A68A55] font-medium transition-colors"
                  >
                    <span>Read Department Treatise</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => openInquiryModal()}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.18em] text-[#A68A55] hover:text-[#8C7243] font-medium underline underline-offset-4"
                  >
                    <span>Commission Sourcing Mandate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Statement Box */}
        <div className="p-8 sm:p-10 bg-white border border-[#E5E5EA] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-serif text-[#111111]">
              Seeking Specific Archival Heirlooms or Sourcing Mandates?
            </h4>
            <p className="text-xs text-[#686868] font-light max-w-xl">
              DARBAAR does not publicly display private client inventory. All transactions and sourcing requests are conducted discreetly under mutual non-disclosure agreements.
            </p>
          </div>
          <button
            onClick={() => openInquiryModal()}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors flex-shrink-0"
          >
            Initiate Confidential Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
