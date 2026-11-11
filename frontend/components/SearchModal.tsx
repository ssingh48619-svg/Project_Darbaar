"use client";

import React, { useState, useMemo } from "react";
import { Search, X, ArrowUpRight, Sparkles, Filter } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURATED_ASSETS } from "@/lib/data";
import { AssetCategory } from "@/lib/types";
import { LuxuryImage } from "@/components/LuxuryImage";

export function SearchModal() {
  const { searchOpen, closeSearch, openSpecimenModal, openInquiryModal, formatRange, assets } = useDarbaar();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredAssets = useMemo(() => {
    return (assets || []).filter((asset) => {
      const matchesCategory =
        selectedCategory === "all" || asset.category === selectedCategory;
      const normalized = query.toLowerCase().trim();
      if (!normalized) return matchesCategory;

      const matchesQuery =
        asset.title.toLowerCase().includes(normalized) ||
        asset.makerOrArtist.toLowerCase().includes(normalized) ||
        asset.referenceNumber.toLowerCase().includes(normalized) ||
        asset.categoryLabel.toLowerCase().includes(normalized) ||
        asset.provenanceSummary.toLowerCase().includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#E5E5EA] shadow-2xl my-10 rounded-sm overflow-hidden flex flex-col max-h-[88vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#E5E5EA] bg-[#F7F5F0]">
          <Search className="w-5 h-5 text-[#A68A55] mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by artist, maison, reference number, period, or provenance..."
            className="w-full bg-transparent text-sm sm:text-base text-[#111111] focus:outline-none placeholder:text-[#686868]/70"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#686868] hover:text-[#111111] mr-2 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 text-[#686868] hover:text-[#111111] rounded-full hover:bg-[#EAE5DC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-6 py-3 border-b border-[#E5E5EA] bg-white flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#686868] font-medium flex items-center gap-1 mr-2">
            <Filter className="w-3 h-3 text-[#A68A55]" /> Filter:
          </span>
          {[
            { label: "All Curated Fields", val: "all" },
            { label: "Fine Art", val: "fine-art" },
            { label: "Rare Timepieces", val: "timepieces" },
            { label: "Heritage Collectibles", val: "collectibles" },
          ].map((cat) => (
            <button
              key={cat.val}
              onClick={() => setSelectedCategory(cat.val)}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors ${
                selectedCategory === cat.val
                  ? "bg-[#263A31] text-white font-medium"
                  : "bg-[#F7F5F0] text-[#686868] hover:text-[#111111] hover:bg-[#EAE5DC]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#686868]">
            <span>
              Found <strong className="text-[#111111]">{filteredAssets.length}</strong> curated catalogue records
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#A68A55]">
              Real-time Archive Verification
            </span>
          </div>

          {filteredAssets.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-serif text-lg text-[#111111]">
                No matching curated records found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#686868] max-w-sm mx-auto">
                DARBAAR maintains private sourcing relationships. Our advisory desk can locate specific pieces through private acquisition channels.
              </p>
              <button
                onClick={() => {
                  closeSearch();
                  openInquiryModal();
                }}
                className="mt-3 inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#A68A55] font-semibold hover:underline"
              >
                <span>Submit Private Sourcing Mandate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex border border-[#E5E5EA] p-3 bg-[#F7F5F0]/60 hover:bg-[#F7F5F0] transition-colors rounded-sm gap-3 group"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 bg-white border border-[#E5E5EA] overflow-hidden">
                    <LuxuryImage
                      src={asset.image}
                      alt={asset.title}
                      fallbackTitle={asset.title}
                      categoryLabel={asset.categoryLabel}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow min-w-0">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#A68A55] font-semibold">
                        {asset.makerOrArtist} • {asset.year}
                      </span>
                      <h4 className="text-xs font-serif text-[#111111] font-medium truncate mt-0.5">
                        {asset.title}
                      </h4>
                      <p className="text-[11px] text-[#263A31] font-serif font-semibold mt-1">
                        {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 pt-2 border-t border-[#E5E5EA]">
                      <button
                        onClick={() => {
                          closeSearch();
                          openSpecimenModal(asset);
                        }}
                        className="text-[10px] uppercase tracking-wider text-[#263A31] hover:text-[#111111] font-medium hover:underline"
                      >
                        Inspect Specimen
                      </button>
                      <span className="text-[#686868]">•</span>
                      <button
                        onClick={() => {
                          closeSearch();
                          openInquiryModal(asset);
                        }}
                        className="text-[10px] uppercase tracking-wider text-[#A68A55] hover:text-[#8C7243] font-medium hover:underline"
                      >
                        Private Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

