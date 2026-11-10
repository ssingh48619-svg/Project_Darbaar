"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  ShieldCheck,
  Eye,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURATED_ASSETS } from "@/lib/data";
import { LuxuryImage } from "@/components/LuxuryImage";
import { AssetCategory } from "@/lib/types";

export default function MarketplacePage() {
  const { formatRange, formatAmount, openSpecimenModal, openInquiryModal } = useDarbaar();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [provenanceFilter, setProvenanceFilter] = useState<string>("all");
  const [makerFilter, setMakerFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "valuation-desc" | "valuation-asc" | "year-asc" | "year-desc" | "score-desc"
  >("valuation-desc");
  const [viewMode, setViewMode] = useState<"grid" | "ledger">("grid");

  // Unique makers list
  const uniqueMakers = useMemo(() => {
    const set = new Set<string>();
    CURATED_ASSETS.forEach((a) => set.add(a.makerOrArtist));
    return Array.from(set).sort();
  }, []);

  // Filtered and Sorted Assets
  const filteredAssets = useMemo(() => {
    let result = CURATED_ASSETS.filter((asset) => {
      // Category Match
      if (categoryFilter !== "all" && asset.category !== categoryFilter) {
        return false;
      }
      // Provenance Status Match
      if (provenanceFilter !== "all" && asset.provenanceStatus !== provenanceFilter) {
        return false;
      }
      // Maker / Artist Match
      if (makerFilter !== "all" && asset.makerOrArtist !== makerFilter) {
        return false;
      }
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          asset.title.toLowerCase().includes(q) ||
          asset.makerOrArtist.toLowerCase().includes(q) ||
          asset.referenceNumber.toLowerCase().includes(q) ||
          asset.dimensionsOrSpecs.toLowerCase().includes(q) ||
          asset.provenanceSummary.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "valuation-desc") {
        return b.valuationMaxUSD - a.valuationMaxUSD;
      }
      if (sortBy === "valuation-asc") {
        return a.valuationMinUSD - b.valuationMinUSD;
      }
      if (sortBy === "year-asc") {
        const yA = parseInt(String(a.year).replace(/\D/g, "")) || 0;
        const yB = parseInt(String(b.year).replace(/\D/g, "")) || 0;
        return yA - yB;
      }
      if (sortBy === "year-desc") {
        const yA = parseInt(String(a.year).replace(/\D/g, "")) || 0;
        const yB = parseInt(String(b.year).replace(/\D/g, "")) || 0;
        return yB - yA;
      }
      if (sortBy === "score-desc") {
        return (
          b.specimenDetails.conditionScorecard.preservationScore -
          a.specimenDetails.conditionScorecard.preservationScore
        );
      }
      return 0;
    });

    return result;
  }, [categoryFilter, provenanceFilter, makerFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setProvenanceFilter("all");
    setMakerFilter("all");
    setSortBy("valuation-desc");
  };

  const hasActiveFilters =
    searchQuery ||
    categoryFilter !== "all" ||
    provenanceFilter !== "all" ||
    makerFilter !== "all" ||
    sortBy !== "valuation-desc";

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen">
      {/* Editorial Header */}
      <section className="bg-[#263A31] text-white py-14 sm:py-20 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C4AC79] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Global Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal">
            The Complete DARBAAR Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#EAE5DC]/80 font-light max-w-2xl leading-relaxed">
            Every object below has been documented with archival provenance, independent physical condition scorecards, and expert dossier corroboration.
          </p>
        </div>
      </section>

      {/* Main Filter & Catalogue Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Filter Bar Controls */}
        <div className="bg-[#F7F5F0] border border-[#E5E5EA] p-5 space-y-4 rounded-xs shadow-xs">
          {/* Top Search Input & View Toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#A68A55] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by maison, artist, reference number, or provenance..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
              />
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-1.5 text-xs text-[#111111]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#A68A55]" />
                <span className="text-[10px] uppercase tracking-wider text-[#686868] hidden md:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                >
                  <option value="valuation-desc">Valuation: Highest First</option>
                  <option value="valuation-asc">Valuation: Lowest First</option>
                  <option value="year-asc">Period: Earliest First</option>
                  <option value="year-desc">Period: Latest First</option>
                  <option value="score-desc">Preservation Score: Highest</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-[#E5E5EA] bg-white p-0.5 rounded-xs">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 transition-colors ${
                    viewMode === "grid" ? "bg-[#263A31] text-white" : "text-[#686868] hover:text-[#111111]"
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("ledger")}
                  className={`p-1.5 transition-colors ${
                    viewMode === "ledger" ? "bg-[#263A31] text-white" : "text-[#686868] hover:text-[#111111]"
                  }`}
                  title="Archival Ledger View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sub Filter Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E5E5EA]">
            {/* Category Select */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#686868] block">Field</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
              >
                <option value="all">All Departments ({CURATED_ASSETS.length})</option>
                <option value="fine-art">Fine Art & Miniatures</option>
                <option value="timepieces">Rare Timepieces</option>
                <option value="collectibles">Heritage Collectibles</option>
              </select>
            </div>

            {/* Maker / Maison Select */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#686868] block">Maison / Atelier</label>
              <select
                value={makerFilter}
                onChange={(e) => setMakerFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
              >
                <option value="all">All Maisons & Ateliers</option>
                {uniqueMakers.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Provenance Tier Select */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#686868] block">Provenance Tier</label>
              <select
                value={provenanceFilter}
                onChange={(e) => setProvenanceFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
              >
                <option value="all">All Provenance Statuses</option>
                <option value="Palace Heritage">Palace Heritage (Royal)</option>
                <option value="Archival Verified">Archival Verified</option>
                <option value="Private Estate">Private Estate</option>
                <option value="Documented">Documented Lineage</option>
              </select>
            </div>

            {/* Reset Filters Action */}
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                disabled={!hasActiveFilters}
                className="w-full py-2 px-3 text-xs uppercase tracking-wider font-medium text-[#263A31] border border-[#E5E5EA] bg-white hover:bg-[#EAE5DC] transition-colors disabled:opacity-40 flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#A68A55]" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-[#686868] border-b border-[#E5E5EA] pb-3">
          <span>
            Displaying <strong className="text-[#111111]">{filteredAssets.length}</strong> authenticated specimens
          </span>
          <span className="text-[10px] tracking-wider uppercase text-[#A68A55]">
            Dynamic Multi-Currency Valuation Active
          </span>
        </div>

        {/* Assets Display: Grid View vs. Archival Ledger Table */}
        {filteredAssets.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-[#F7F5F0] border border-[#E5E5EA] p-8">
            <h3 className="text-xl font-serif text-[#111111]">
              No Matching Curated Specimens Located
            </h3>
            <p className="text-xs text-[#686868] max-w-md mx-auto">
              Our private advisory desk maintains off-market mandates with royal estates and private trusts. Submit a sourcing request to acquire specific references.
            </p>
            <button
              onClick={() => openInquiryModal()}
              className="px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#263A31]"
            >
              Submit Private Acquisition Mandate
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white border border-[#E5E5EA] flex flex-col justify-between group hover:border-[#A68A55] transition-all duration-300 shadow-xs hover:shadow-md"
              >
                {/* Image Frame */}
                <div className="relative h-72 sm:h-80 w-full bg-[#EAE5DC] overflow-hidden">
                  <LuxuryImage
                    src={asset.image}
                    alt={asset.title}
                    fallbackTitle={asset.title}
                    categoryLabel={asset.categoryLabel}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {asset.isDemonstration && (
                    <div className="absolute top-3 left-3 bg-black/75 text-[#F7F5F0] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs backdrop-blur-xs">
                      Demonstration Listing
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-white/90 text-[#263A31] text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-xs border border-[#E5E5EA] backdrop-blur-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#A68A55]" />
                    <span>{asset.provenanceStatus}</span>
                  </div>

                  {/* Scorecard Pill Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 text-[#111111] text-[9px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-xs border border-[#E5E5EA] backdrop-blur-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Preservation: {asset.specimenDetails.conditionScorecard.preservationScore}/100</span>
                  </div>
                </div>

                {/* Editorial Information */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#A68A55] font-medium">
                      <span>{asset.makerOrArtist}</span>
                      <span>{asset.year}</span>
                    </div>

                    <Link href={`/asset/${asset.slug}`} className="block group-hover:underline">
                      <h3 className="text-lg font-serif text-[#111111] font-normal leading-snug">
                        {asset.title}
                      </h3>
                    </Link>

                    <p className="text-[11px] font-mono text-[#686868]">
                      {asset.referenceNumber} • {asset.dimensionsOrSpecs}
                    </p>

                    <p className="text-xs text-[#686868] line-clamp-2 font-light leading-relaxed">
                      {asset.summary}
                    </p>
                  </div>

                  {/* Valuation & Dual Actions */}
                  <div className="pt-4 border-t border-[#E5E5EA] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-[#686868]">
                        Indicative Valuation:
                      </span>
                      <span className="text-sm font-serif font-semibold text-[#263A31]">
                        {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => openSpecimenModal(asset)}
                        className="w-full text-center py-2.5 px-2 text-[10px] uppercase tracking-[0.16em] font-medium text-[#111111] bg-[#F7F5F0] hover:bg-[#EAE5DC] border border-[#E5E5EA] transition-colors"
                      >
                        Inspect Specimen
                      </button>
                      <button
                        type="button"
                        onClick={() => openInquiryModal(asset)}
                        className="w-full text-center py-2.5 px-2 text-[10px] uppercase tracking-[0.16em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                      >
                        Enquire Privately
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Ledger Table View */
          <div className="bg-white border border-[#E5E5EA] overflow-hidden rounded-xs shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F5F0] text-[#686868] uppercase text-[10px] tracking-wider border-b border-[#E5E5EA]">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Specimen Details</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Preservation Grade</th>
                    <th className="p-4">Indicative Valuation</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA]">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                      <td className="p-4 font-mono text-[#111111] whitespace-nowrap">
                        {asset.referenceNumber}
                      </td>
                      <td className="p-4">
                        <Link href={`/asset/${asset.slug}`} className="font-serif text-sm text-[#111111] font-medium hover:underline block">
                          {asset.title}
                        </Link>
                        <span className="text-[#686868] text-xs">
                          {asset.makerOrArtist} ({asset.year})
                        </span>
                      </td>
                      <td className="p-4 uppercase text-[10px] tracking-wider text-[#A68A55]">
                        {asset.categoryLabel}
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-[#263A31] block">
                          {asset.specimenDetails.conditionScorecard.preservationScore}/100
                        </span>
                        <span className="text-[10px] text-[#686868]">
                          {asset.provenanceStatus}
                        </span>
                      </td>
                      <td className="p-4 font-serif font-semibold text-[#263A31] whitespace-nowrap">
                        {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => openSpecimenModal(asset)}
                          className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#111111] bg-[#F7F5F0] border border-[#E5E5EA] hover:bg-[#EAE5DC]"
                        >
                          Scorecard
                        </button>
                        <button
                          onClick={() => openInquiryModal(asset)}
                          className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-white bg-[#263A31] hover:bg-[#1B2A23]"
                        >
                          Enquire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

