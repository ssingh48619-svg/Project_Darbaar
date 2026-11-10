"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Gem, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";

export default function CollectiblesPage() {
  const { openInquiryModal } = useDarbaar();

  const traditions = [
    {
      title: "Crucible Wootz Steel & Imperial Court Blades",
      period: "16th – 18th Century",
      description:
        "Crucible Damascus steel (jauhar) forged in high-carbon crucibles across Southern and Western India, celebrated worldwide for its crystalline watery damascening. Fitted with nephrite jade hilts, gold koftgari calligraphy, and cabochon gemstones.",
      focus: "Imperial Mughal Khanjars, Rajput Tulwars, and Peshwa court ceremonial daggers.",
      protocols: "Metallurgical crystallite structure analysis, carbon dating of scabbard wood core, and epigraphic verification.",
      image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Royal Enamelled Jewels & Kundan Regalia",
      period: "17th & 18th Century",
      description:
        "The zenith of Indian royal goldsmithing. Featuring pure 24k gold refined in kundan foil techniques, set with unheated Burmese rubies, Colombian emerald drops, Basra seed pearls, and reverse Jaipur meenakari champlevé polychrome enamel.",
      focus: "Royal turban aigrettes (Sarpech), ceremonial armbands (Bazuband), and sovereign toshakhana regalia.",
      protocols: "SSEF/GIA gemmological origin certification, 24k gold purity spectrometry, and historical palace inventory cross-referencing.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Palace Toshakhana Objects & Bronzes",
      period: "11th – 18th Century",
      description:
        "Priceless lost-wax cast sacred bronzes from the Imperial Chola Dynasty alongside ceremonial toshakhana decorative heirlooms, huqqa bases in bidriware, and rock crystal cups from courtly treasuries.",
      focus: "Utsava Murti temple procession bronzes, royal treasury silver, and bidriware masterworks.",
      protocols: "Thermoluminescence core testing, XRF copper alloy metallurgy report, and international cultural property title clearance.",
      image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen">
      {/* Department Hero */}
      <section className="bg-[#263A31] text-white py-16 sm:py-24 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C4AC79] font-semibold">
            <Gem className="w-3.5 h-3.5" />
            <span>Palace Heritage • DARBAAR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal leading-tight">
            Antique & Heritage Collectibles
          </h1>
          <p className="text-sm sm:text-base text-[#EAE5DC]/80 font-light leading-relaxed">
            Curated preservation of India&apos;s royal court treasures. We advise patrons, family trusts, and institutions on the acquisition, provenance reconstruction, and conservation of imperial arms, royal jewelry, and palace regalia.
          </p>
        </div>
      </section>

      {/* Main Department Treatise */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="space-y-12">
          <div className="border-b border-[#E5E5EA] pb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
              Treasury Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] font-normal mt-1">
              Historic Royal Court Heritage Disciplines
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
                      <strong className="text-[#111111] font-medium">Curatorial Focus:</strong>{" "}
                      <span className="text-[#686868] font-light">{t.focus}</span>
                    </div>
                    <div>
                      <strong className="text-[#111111] font-medium">Scientific Due Diligence:</strong>{" "}
                      <span className="text-[#686868] font-light">{t.protocols}</span>
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
            Commission a Palace Heritage Consultation
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE5DC]/80 font-light max-w-xl mx-auto leading-relaxed">
            Our Senior Indic Arms & Heritage Jewelry Specialists coordinate discreet provenance audits, laboratory metallography, and private treaty transactions for historic family estates.
          </p>
          <button
            onClick={() => openInquiryModal()}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] bg-[#C4AC79] hover:bg-white transition-colors"
          >
            Initiate Heritage Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
