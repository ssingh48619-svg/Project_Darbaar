"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, KeyRound, ShieldAlert, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export function AdvisoryPillars() {
  const { openInquiryModal } = useDarbaar();

  const pillars = [
    {
      id: "provenance-research",
      number: "01",
      title: "Provenance Research",
      subtitle: "Archival Lineage & Historical Tracing",
      icon: BookOpen,
      scope: "Directly Conducted by DARBAAR Archival Team",
      description:
        "Comprehensive documentary investigation through royal archives, colonial export registers, exhibition catalogues raisonnés, and estate inventories to establish verified ownership continuity.",
      details: [
        "Primary source archival retrieval (Devanagari, Persian, English manifests)",
        "Title clearance & cultural heritage export compliance verification",
        "Continuous ownership lineage reconstruction",
      ],
    },
    {
      id: "private-acquisition",
      number: "02",
      title: "Private Acquisition & Sourcing",
      subtitle: "Discreet Off-Market Representation",
      icon: KeyRound,
      scope: "Directly Conducted by Senior DARBAAR Partners",
      description:
        "Anonymous buyer and seller representation in private treaty transactions. Sourcing institutional-grade assets from private family offices, trusts, and collector dynasties without public auction exposure.",
      details: [
        "Confidential bidding and treaty price negotiation",
        "Off-market mandates across Switzerland, UK, UAE, and India",
        "Direct peer-to-peer settlement coordination",
      ],
    },
    {
      id: "independent-authentication",
      number: "03",
      title: "Independent Authentication Coordination",
      subtitle: "Third-Party Scientific Verification",
      icon: ShieldAlert,
      scope: "Coordinated with Independent Accredited Laboratories & Maisons",
      description:
        "DARBAAR facilitates physical transit to recognized third-party scientific laboratories, manufacturer heritage departments, and accredited art historians for empirical, objective validation.",
      details: [
        "Extracts from manufacturer archives (Patek Philippe, Audemars Piguet, etc.)",
        "Infrared reflectography, Raman spectroscopy & metallurgical testing",
        "External independent condition report covenants",
      ],
    },
    {
      id: "collection-management",
      number: "04",
      title: "Collection Management & Valuations",
      subtitle: "Long-Term Heritage Stewardship",
      icon: Layers,
      scope: "Hybrid Advisory & Independent Valuation Coordination",
      description:
        "Comprehensive collection digitization, climate-controlled vault liaison in Geneva and Singapore Free Ports, insurance appraisal coordination, and multi-generational succession planning.",
      details: [
        "Private digital collection ledger with multi-currency tracking",
        "Freeport custody and conservation facility liaison",
        "Estate dispersal planning & institutional donation advisory",
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E5E5EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
            Advisory & Stewardship
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] font-normal leading-tight">
            Beyond Acquisition. <br />
            <span className="italic text-[#263A31]">A Commitment to Preservation.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed pt-2">
            Discreet counsel for international families, collectors, and trusts. We separate direct advisory services from independent third-party laboratory verification to maintain uncompromising integrity.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-[#F7F5F0] border border-[#E5E5EA] p-8 flex flex-col justify-between group hover:border-[#A68A55] transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center text-[#263A31]">
                      <Icon className="w-5 h-5 text-[#A68A55]" />
                    </div>
                    <span className="text-xs font-serif text-[#A68A55] tracking-widest font-semibold">
                      PILLAR {pillar.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif text-[#111111] font-normal">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#A68A55] tracking-wide mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Clear Scope Distinction */}
                  <div className="p-2.5 bg-white border border-[#E5E5EA] rounded-xs text-[11px] text-[#263A31] font-medium flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#A68A55]"></span>
                    <span>{pillar.scope}</span>
                  </div>

                  <p className="text-xs text-[#686868] font-light leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#E5E5EA]/70">
                    {pillar.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 text-xs text-[#111111]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#263A31] flex-shrink-0 mt-0.5" />
                        <span className="font-light">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5E5EA]">
                  <button
                    type="button"
                    onClick={() => openInquiryModal()}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] font-medium text-[#263A31] hover:text-[#A68A55] transition-colors"
                  >
                    <span>Consult on {pillar.title}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
