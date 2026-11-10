"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Layers,
  Heart,
  FileText,
  Clock,
  Sparkles,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURATED_ASSETS } from "@/lib/data";
import { LuxuryImage } from "@/components/LuxuryImage";

export default function DashboardPage() {
  const { formatAmount, formatRange, openSpecimenModal, openInquiryModal } = useDarbaar();
  const [activeTab, setActiveTab] = useState<
    "overview" | "collection" | "saved" | "enquiries" | "documents"
  >("overview");

  // Demonstration Client Portfolio Assets
  const clientCollection = [CURATED_ASSETS[0], CURATED_ASSETS[1]];
  const savedAssets = [CURATED_ASSETS[2], CURATED_ASSETS[3]];

  const totalPortfolioUSD = 160000 + 315000;

  return (
    <div className="w-full bg-[#F7F5F0] min-h-screen pb-24">
      {/* Top Client Profile Header Bar */}
      <div className="bg-[#263A31] text-white border-b border-[#1B2A23] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C4AC79]">
              <Shield className="w-3.5 h-3.5" />
              <span>DARBAAR Private Client Vault • Tier I Sovereign</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white">
              Private Collection & Advisory Desk
            </h1>
            <p className="text-xs text-[#EAE5DC]/80 font-light">
              Client Principal: <span className="text-white font-medium">Lord Alistair Vance</span> • Account Reference: <span className="font-mono text-[#C4AC79]">DARBAAR-PVT-8821</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openInquiryModal()}
              className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#111111] bg-[#C4AC79] hover:bg-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Commission New Advisory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Sub-Bar */}
      <div className="bg-white border-b border-[#E5E5EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-8 overflow-x-auto text-xs uppercase tracking-[0.16em]">
          {[
            { id: "overview", label: "Overview & Analytics" },
            { id: "collection", label: "My Collection (2)" },
            { id: "saved", label: "Saved Assets (2)" },
            { id: "enquiries", label: "Active Mandates (3)" },
            { id: "documents", label: "Documents & Reports" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-[#263A31] text-[#263A31]"
                  : "border-transparent text-[#686868] hover:text-[#111111]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 4 Summary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#E5E5EA] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">
                  Total Vault Portfolio Valuation
                </span>
                <p className="text-2xl font-serif font-semibold text-[#263A31]">
                  {formatAmount(totalPortfolioUSD)}
                </p>
                <div className="flex items-center space-x-1 text-[11px] text-[#A68A55]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Verified Archival Valuation</span>
                </div>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">
                  Catalogued Heirlooms
                </span>
                <p className="text-2xl font-serif font-semibold text-[#111111]">
                  02 Specimens
                </p>
                <p className="text-[11px] text-[#686868]">Geneva & London Freeports</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">
                  Active Advisory Mandates
                </span>
                <p className="text-2xl font-serif font-semibold text-[#111111]">
                  03 Active
                </p>
                <p className="text-[11px] text-[#686868]">1 Private Sourcing • 2 Valuations</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">
                  Archival Condition Dossiers
                </span>
                <p className="text-2xl font-serif font-semibold text-[#111111]">
                  06 Certified
                </p>
                <p className="text-[11px] text-[#263A31] font-medium">Encrypted Vault Storage</p>
              </div>
            </div>

            {/* Curated Collection Highlight */}
            <div className="bg-white border border-[#E5E5EA] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4">
                <div>
                  <h3 className="text-lg font-serif text-[#111111]">
                    Curated Holdings Under Management
                  </h3>
                  <p className="text-xs text-[#686868] font-light">
                    Physical specimens vaulted under climate control with independent condition scorecards.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("collection")}
                  className="text-xs uppercase tracking-wider text-[#263A31] hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientCollection.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex border border-[#E5E5EA] p-4 bg-[#F7F5F0] rounded-sm gap-4 group"
                  >
                    <div className="relative w-28 h-28 flex-shrink-0 bg-white border border-[#E5E5EA] overflow-hidden">
                      <LuxuryImage
                        src={asset.image}
                        alt={asset.title}
                        fallbackTitle={asset.title}
                        categoryLabel={asset.categoryLabel}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#A68A55] font-semibold">
                          {asset.makerOrArtist} • {asset.year}
                        </span>
                        <h4 className="text-sm font-serif text-[#111111] font-medium">
                          {asset.title}
                        </h4>
                        <p className="text-xs font-serif text-[#263A31] font-semibold mt-1">
                          Indicative: {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center space-x-3 text-[11px]">
                        <button
                          onClick={() => openSpecimenModal(asset)}
                          className="text-[#263A31] font-medium hover:underline flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3 text-[#A68A55]" />
                          Scorecard ({asset.specimenDetails.conditionScorecard.preservationScore}/100)
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "collection" && (
          <div className="bg-white p-8 border border-[#E5E5EA] space-y-6">
            <h3 className="text-xl font-serif text-[#111111]">Registered Collection Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientCollection.map((asset) => (
                <div key={asset.id} className="border border-[#E5E5EA] p-6 bg-[#F7F5F0] space-y-4">
                  <div className="relative h-64 w-full bg-[#EAE5DC]">
                    <LuxuryImage
                      src={asset.image}
                      alt={asset.title}
                      fallbackTitle={asset.title}
                      categoryLabel={asset.categoryLabel}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-[#A68A55] uppercase tracking-wider">{asset.makerOrArtist}</span>
                    <h4 className="text-lg font-serif text-[#111111]">{asset.title}</h4>
                    <p className="text-xs text-[#686868] mt-1">{asset.dimensionsOrSpecs}</p>
                    <p className="text-sm font-serif text-[#263A31] font-semibold mt-2">
                      Est. Valuation: {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                    </p>
                  </div>
                  <button
                    onClick={() => openSpecimenModal(asset)}
                    className="w-full py-2.5 text-xs uppercase tracking-wider bg-[#263A31] text-white"
                  >
                    Inspect Physical Dossier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-white p-8 border border-[#E5E5EA] space-y-6">
            <h3 className="text-xl font-serif text-[#111111]">Saved Private Catalogue Records</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedAssets.map((asset) => (
                <div key={asset.id} className="border border-[#E5E5EA] p-4 bg-[#F7F5F0] flex gap-4">
                  <div className="relative w-32 h-32 flex-shrink-0 bg-white">
                    <LuxuryImage
                      src={asset.image}
                      alt={asset.title}
                      fallbackTitle={asset.title}
                      categoryLabel={asset.categoryLabel}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-xs text-[#A68A55]">{asset.makerOrArtist}</span>
                      <h4 className="text-sm font-serif text-[#111111] font-medium">{asset.title}</h4>
                      <p className="text-xs font-serif text-[#263A31] font-semibold mt-1">
                        {formatRange(asset.valuationMinUSD, asset.valuationMaxUSD)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openInquiryModal(asset)}
                        className="py-1.5 px-3 text-[10px] uppercase tracking-wider bg-[#263A31] text-white"
                      >
                        Enquire Privately
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "enquiries" && (
          <div className="bg-white p-8 border border-[#E5E5EA] space-y-6">
            <h3 className="text-xl font-serif text-[#111111]">Active Advisory & Sourcing Mandates</h3>
            <div className="space-y-4">
              {[
                {
                  id: "MND-2024-081",
                  title: "Private Sourcing: Patek Philippe Ref. 2499 First Series",
                  status: "Off-Market Research in Progress",
                  lead: "Senior Horological Partner, Geneva",
                  updated: "Nov 02, 2024",
                },
                {
                  id: "MND-2024-074",
                  title: "Provenance Due Diligence: 17th Century Rajput Miniature",
                  status: "Archival Translation Cleared",
                  lead: "Indic Art Specialist, London",
                  updated: "Oct 28, 2024",
                },
                {
                  id: "MND-2024-069",
                  title: "Vault Liaison & Freeport Insurance Appraisal Coordination",
                  status: "Completed — Dossier Dispatched",
                  lead: "Client Custody Liaison, Zurich",
                  updated: "Oct 15, 2024",
                },
              ].map((m) => (
                <div key={m.id} className="p-4 border border-[#E5E5EA] bg-[#F7F5F0] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#A68A55]">{m.id}</span>
                    <h4 className="text-sm font-serif text-[#111111] font-medium">{m.title}</h4>
                    <p className="text-xs text-[#686868]">Lead: {m.lead} • Last Update: {m.updated}</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-white border border-[#E5E5EA] text-[#263A31] font-medium">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-white p-8 border border-[#E5E5EA] space-y-6">
            <h3 className="text-xl font-serif text-[#111111]">Certified Archival Documents & Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Patek Philippe Extract from the Archives (Ref. 3970E)", date: "Sep 2024", size: "4.2 MB PDF" },
                { name: "City Palace Atelier Udaipur Devanagari Translation Dossier", date: "Oct 2024", size: "8.1 MB PDF" },
                { name: "Metallurgical Wootz Damascus Analysis Certificate", date: "Aug 2024", size: "3.5 MB PDF" },
                { name: "Freeport Geneva Vault Storage Inspection Receipt", date: "Nov 2024", size: "1.2 MB PDF" },
              ].map((doc, idx) => (
                <div key={idx} className="p-4 border border-[#E5E5EA] bg-[#F7F5F0] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-[#A68A55]" />
                    <div>
                      <p className="text-xs font-serif font-medium text-[#111111]">{doc.name}</p>
                      <span className="text-[10px] text-[#686868]">{doc.date} • {doc.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Accessing certified encrypted document: ${doc.name}`)}
                    className="text-[10px] uppercase tracking-wider text-[#263A31] font-semibold hover:underline"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

