"use client";

import React from "react";
import { Sparkles, Shield, Compass, Landmark } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";

export default function AboutPage() {
  const { openInquiryModal } = useDarbaar();

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Editorial Header */}
      <section className="bg-[#F7F5F0] border-b border-[#E5E5EA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The House of DARBAAR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] font-normal leading-tight">
            Where Heritage Meets Rarity
          </h1>
          <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed">
            DARBAAR was conceived to bridge the royal courts of India—celebrated for their patronages of priceless gems, illuminated manuscripts, and extraordinary mechanical curiosities—with the precision and discretion of modern international auction houses.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-serif text-[#111111]">
              A Curatorial Vision Rooted in Timeless Value
            </h2>
            <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
              In centuries past, a royal *Darbaar* was the sovereign assembly where master craftsmen, painters, scholars, and envoys presented the most extraordinary creations of human endeavor. Objects were not merely acquired; they were preserved across dynasties as symbols of enduring legacy.
            </p>
            <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
              Today, DARBAAR reimagines this tradition for the international collector. We operate as a private luxury house and advisory firm focused on Fine Art, Haute Horlogerie, and Heritage Collectibles, prioritizing provenance transparency and intellectual rigor over mass marketplace volume.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-[380px] sm:h-[460px] w-full border border-[#E5E5EA] overflow-hidden bg-[#EAE5DC]">
              <LuxuryImage
                src="https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1000&q=85"
                alt="Palace Architecture Inspiration"
                fallbackTitle="Royal Architecture & Sovereign Heritage"
                categoryLabel="Palace Heritage"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#E5E5EA]">
          <div className="space-y-3">
            <Landmark className="w-6 h-6 text-[#A68A55]" />
            <h3 className="text-lg font-serif text-[#111111]">Royal Lineage & Restraint</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              We present only objects of genuine historic merit, avoiding trend-driven commercial luxury in favor of heirloom significance.
            </p>
          </div>

          <div className="space-y-3">
            <Shield className="w-6 h-6 text-[#A68A55]" />
            <h3 className="text-lg font-serif text-[#111111]">Uncompromising Discretion</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              All transactions and advisory mandates are conducted under strict confidentiality. Principals interact directly with senior partners.
            </p>
          </div>

          <div className="space-y-3">
            <Compass className="w-6 h-6 text-[#A68A55]" />
            <h3 className="text-lg font-serif text-[#111111]">Empirical Provenance</h3>
            <p className="text-xs text-[#686868] font-light leading-relaxed">
              Every catalogue entry is corroborated through independent scientific testing, manufacturer archives, and academic research.
            </p>
          </div>
        </div>

        {/* Demonstration & Transparency Notice */}
        <div className="p-6 bg-[#F7F5F0] border border-[#E5E5EA] text-xs text-[#686868] space-y-2">
          <p className="font-semibold text-[#111111]">Corporate & Development Transparency:</p>
          <p className="font-light leading-relaxed">
            DARBAAR is actively establishing its global advisory network and private appointment corridors. All transaction numbers, catalogue items marked with demonstration markers, and regional salon corridors represent our curated development phase and planned operations.
          </p>
        </div>
      </section>
    </div>
  );
}

