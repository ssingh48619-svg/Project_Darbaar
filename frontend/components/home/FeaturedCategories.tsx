"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LuxuryImage } from "@/components/LuxuryImage";

export function FeaturedCategories() {
  const categories = [
    {
      title: "Fine Art & Miniatures",
      subtitle: "Imperial Indian Court Ateliers & Modernist Works",
      description:
        "Monumental court miniatures, 18th-century Rajput and Mughal masterworks, alongside significant post-war and modern sculptural milestones.",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
      link: "/fine-art",
      itemCount: "Indic & Modern Art",
    },
    {
      title: "Rare Timepieces",
      subtitle: "Haute Horlogerie & Historic Complications",
      description:
        "Patek Philippe, F.P. Journe, Audemars Piguet, and historically significant neo-vintage complications preserved in unpolished condition.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85",
      link: "/timepieces",
      itemCount: "Geneva Vault Council",
    },
    {
      title: "Heritage Collectibles",
      subtitle: "Palace Toshakhana Antiquities & Royal Regalia",
      description:
        "Museum-standard wootz steel blades, carved nephrite jade hilts, royal gemstones, and priceless ceremonial relics preserved across centuries.",
      image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=85",
      link: "/collectibles",
      itemCount: "Royal Toshakhana",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#E5E5EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-[#E5E5EA] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
              Curated Fields of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] font-normal">
              Three Pillars of Enduring Rarity
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#686868] max-w-md font-light mt-4 md:mt-0">
            Each category represents objects that satisfy strict historical integrity, verifiable provenance, and aesthetic significance.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group block bg-[#F7F5F0] border border-[#E5E5EA] overflow-hidden hover:border-[#A68A55] transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#EAE5DC]">
                <LuxuryImage
                  src={cat.image}
                  alt={cat.title}
                  fallbackTitle={cat.title}
                  categoryLabel={cat.subtitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-white/90 text-[#111111] font-medium backdrop-blur-xs">
                    {cat.itemCount}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#C4AC79] block">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-xl font-serif font-medium mt-1 group-hover:text-[#F7F5F0]">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-[#686868] leading-relaxed font-light">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#263A31] font-medium group-hover:text-[#A68A55] transition-colors">
                  <span>Consult Department</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

