"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, BookOpen, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";

export default function FineArtPage() {
  const { openInquiryModal } = useDarbaar();

  const traditions = [
    {
      title: "Mewar & Udaipur Court Ateliers",
      period: "17th & 18th Century",
      description:
        "Monumental court scenes depicting royal Darbaar audiences, elephant processions, and festival spectacles. Characterized by deep red cinnabar borders, lapis lazuli pigments, and burnished gold leaf on multi-layered wasli paper.",
      focus: "Royal Darbaar audiences, sovereign portraiture, and court ceremonial documents.",
      standards: "Devanagari colophon translation, court treasury seals, and pigment spectrometry.",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "The Pahari School: Kangra & Basohli",
      period: "Circa 1690 – 1800",
      description:
        "Lyrical devotion and naturalistic landscape poetry. Originating in the Himalayan foothills under royal patronage, celebrated for delicate facial profiles, flowering creepers, and transcendental compositions.",
      focus: "Gita Govinda series, Ragamala musical modes, and Bhagavata Purana masterworks.",
      standards: "Takri epigraph analysis, organic binder testing, and colonial manifest verification.",
      image: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Post-War European Modernist Bronzes",
      period: "Mid-20th Century",
      description:
        "Monumental sculptural inquiries into human form, spatial tension, and existential balance. Preserving Susse Fondeur and French foundry casts with authentic dark brown and olive studio patinas.",
      focus: "Attenuated modernist figures, numbered foundry lifetime casts, and artist plinths.",
      standards: "Ultrasonic alloy thickness diagnostics, foundry ledger audit, and catalogue raisonné verification.",
      image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen">
      {/* Department Hero */}
      <section className="bg-[#263A31] text-white py-16 sm:py-24 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C4AC79] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curatorial Discipline • DARBAAR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal leading-tight">
            Imperial Fine Art & Miniatures
          </h1>
          <p className="text-sm sm:text-base text-[#EAE5DC]/80 font-light leading-relaxed">
            From the illuminated ateliers of Rajasthani royal courts to pivotal modernist sculptural milestones. DARBAAR coordinates confidential acquisition, archival provenance tracing, and museum-grade condition reports for discerning private collectors and institutions.
          </p>
        </div>
      </section>

      {/* Main Department Treatise */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Curatorial Traditions */}
        <div className="space-y-12">
          <div className="border-b border-[#E5E5EA] pb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
              Areas of Specialization
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] font-normal mt-1">
              Historic Court Ateliers & Sculptural Traditions
            </h2>
          </div>

          <div className="space-y-12">
            {traditions.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#F7F5F0] border border-[#E5E5EA] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 relative h-72 sm:h-84 w-full bg-[#EAE5DC] overflow-hidden border border-[#E5E5EA]">
                  <LuxuryImage
                    src={t.image}
                    alt={t.title}
                    fallbackTitle={t.title}
                    categoryLabel={t.period}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                      {t.period}
                    </span>
                    <h3 className="text-2xl font-serif text-[#111111] font-normal mt-0.5">
                      {t.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
                    {t.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#E5E5EA] text-xs">
                    <div>
                      <strong className="text-[#111111] font-medium">Curatorial Scope:</strong>{" "}
                      <span className="text-[#686868] font-light">{t.focus}</span>
                    </div>
                    <div>
                      <strong className="text-[#111111] font-medium">Authentication Protocol:</strong>{" "}
                      <span className="text-[#686868] font-light">{t.standards}</span>
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
            Commission a Fine Art Acquisition or Provenance Mandate
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE5DC]/80 font-light max-w-xl mx-auto leading-relaxed">
            Our Senior Indic & Modern Art Advisors assist private patrons, trusts, and family offices with discreet off-market sourcing, estate appraisals, and title clearance.
          </p>
          <button
            onClick={() => openInquiryModal()}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] bg-[#C4AC79] hover:bg-white transition-colors"
          >
            Initiate Fine Art Advisory Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
