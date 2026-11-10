"use client";

import React from "react";
import { ArrowDown, Shield, Sparkles, ChevronRight } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";

export function Hero() {
  const { openInquiryModal } = useDarbaar();

  const scrollToCollection = () => {
    const el = document.getElementById("curated-collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#F7F5F0] border-b border-[#E5E5EA] overflow-hidden">
      {/* Decorative Subtle Royal Watermark Texture / Framing */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#263A31_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text / Editorial Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Royal House Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E5EA] rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A68A55]"></span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#263A31] font-semibold">
                DARBAAR • Global Luxury House
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111111] leading-[1.12] font-normal tracking-tight">
              Extraordinary Objects. <br />
              <span className="italic font-light text-[#263A31]">Enduring Legacies.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#686868] font-light leading-relaxed max-w-xl">
              Discover, acquire and preserve exceptional works of fine art, rare timepieces and collectible assets through a curated global luxury experience inspired by India&apos;s royal heritage and the discretion of private international auction houses.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToCollection}
                className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] border border-[#263A31] shadow-sm hover:shadow transition-all group"
              >
                <span>Explore the Collection</span>
                <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => openInquiryModal()}
                className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium text-[#111111] bg-white hover:bg-[#F7F5F0] border border-[#E5E5EA] transition-all"
              >
                <span>Request Private Advisory</span>
              </button>
            </div>

            {/* Distinctive Credentials Highlight */}
            <div className="pt-6 border-t border-[#E5E5EA] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-serif text-[#111111] font-normal">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-[#686868] mt-0.5">
                  Archival Provenance Review
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif text-[#111111] font-normal">6</p>
                <p className="text-[10px] uppercase tracking-wider text-[#686868] mt-0.5">
                  Global Appointment Salons
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif text-[#111111] font-normal">Strict</p>
                <p className="text-[10px] uppercase tracking-wider text-[#686868] mt-0.5">
                  Client Confidentiality
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Architectural / Fine Object Image */}
              <div className="relative h-[440px] sm:h-[520px] w-full bg-white border border-[#E5E5EA] shadow-xl overflow-hidden">
                <LuxuryImage
                  src="https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=85"
                  alt="Historic Indian Royal Architecture and Heritage Aesthetics"
                  fallbackTitle="Historic Palace Architecture & Royal Ateliers"
                  categoryLabel="Heritage Ateliers"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Overlaid Caption Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md border border-[#E5E5EA] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#A68A55] font-semibold block">
                        Heritage Aesthetic
                      </span>
                      <p className="text-xs font-serif text-[#111111] font-medium mt-0.5">
                        Palace Ateliers & The Architectural Grandeur of Mewar
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#686868]">
                      DARBAAR ARCHIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Horological Inset */}
              <div className="hidden sm:block absolute -bottom-6 -left-8 w-48 h-56 bg-white border border-[#E5E5EA] shadow-2xl p-2 z-10">
                <div className="relative w-full h-full overflow-hidden bg-[#F7F5F0]">
                  <LuxuryImage
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85"
                    alt="High Horology Timepiece"
                    fallbackTitle="Perpetual Calendar Chronograph"
                    categoryLabel="Haute Horlogerie"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white p-2 text-center">
                    <span className="text-[9px] uppercase tracking-wider block font-light">
                      Rare Horology
                    </span>
                  </div>
                </div>
              </div>

              {/* Gold Accent Corner Seal */}
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#A68A55] text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

