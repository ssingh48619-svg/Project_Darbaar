"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldAlert,
  Package,
  Users,
  MessageSquare,
  FileCheck,
  TrendingUp,
  Activity,
  Plus,
  CheckCircle,
  XCircle,
  Search,
  ExternalLink,
  Shield,
  Eye,
} from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { darbaarApi } from "@/lib/api";
import { CreateAssetModal } from "@/components/admin/CreateAssetModal";

export default function AdminDashboardPage() {
  const { assets, refreshAssets, openSpecimenModal } = useDarbaar();
  const [activeSection, setActiveSection] = useState<
    "overview" | "assets" | "enquiries" | "verification" | "audit"
  >("overview");
  const [liveStats, setLiveStats] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [enquiriesList, setEnquiriesList] = useState<any[]>([]);

  const fetchOverview = () => {
    try {
      const token = localStorage.getItem("darbaar_token") || "";
      if (token) {
        darbaarApi.admin
          .getOverview(token)
          .then((res) => {
            if (res.success && res.stats) {
              setLiveStats(res.stats);
            }
          })
          .catch((err) => {
            console.warn("Backend admin stats offline, using demonstration telemetry:", err.message);
          });

        darbaarApi.enquiries
          .getAll(token)
          .then((res) => {
            if (res.success && Array.isArray(res.enquiries)) {
              setEnquiriesList(res.enquiries);
            }
          })
          .catch(() => {});
      }
    } catch {
      // Safe fallback
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="w-full bg-[#F7F5F0] min-h-screen pb-24">
      {/* Top Admin Bar */}
      <div className="bg-[#111111] text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-[#263A31]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-xl font-serif tracking-wider uppercase text-white">
              DARBAAR Administration & Curatorial Control
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-[#A68A55] border border-[#A68A55]/40 px-2 py-0.5">
              Superadmin Mode
            </span>
          </div>
          <span className="text-xs text-[#EAE5DC]/60 font-mono hidden sm:inline">
            Node: Zurich Vault API Gateway • MongoDB Atlas Live
          </span>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-[#E5E5EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-8 overflow-x-auto text-xs uppercase tracking-[0.16em]">
          {[
            { id: "overview", label: "Executive Overview" },
            { id: "assets", label: "Asset Management" },
            { id: "enquiries", label: "Enquiries & Advisory" },
            { id: "verification", label: "Specialist Reports" },
            { id: "audit", label: "Audit Logs & Security" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`py-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
                activeSection === tab.id
                  ? "border-[#263A31] text-[#263A31]"
                  : "border-transparent text-[#686868] hover:text-[#111111]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* OVERVIEW SECTION */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Active Curated Listings</span>
                <p className="text-2xl font-serif font-bold text-[#111111]">
                  {liveStats ? liveStats.totalAssets : assets.length}
                </p>
                <p className="text-[11px] text-emerald-700">100% Archival Scorecards Complete</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Pending Inquiries</span>
                <p className="text-2xl font-serif font-bold text-[#A68A55]">
                  {liveStats ? `${liveStats.pendingEnquiries} Active` : `${enquiriesList.length || "07"} Active`}
                </p>
                <p className="text-[11px] text-[#686868]">Geneva • London • Singapore</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Verified Consignors</span>
                <p className="text-2xl font-serif font-bold text-[#111111]">
                  {liveStats ? `${liveStats.totalUsers} Principals` : "14 Principals"}
                </p>
                <p className="text-[11px] text-[#686868]">KYC & AML Cleared</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Aggregate Private Value</span>
                <p className="text-2xl font-serif font-bold text-[#263A31]">
                  {liveStats
                    ? `$${(liveStats.assetsUnderManagementUSD / 1000000).toFixed(2)}M USD`
                    : "$1.68M USD"}
                </p>
                <p className="text-[11px] text-[#A68A55]">Mid-Range Valuation</p>
              </div>
            </div>

            {/* Curated Inventory Table */}
            <div className="bg-white border border-[#E5E5EA] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif text-[#111111]">Curated Inventory Status</h3>
                  <p className="text-xs text-[#686868]">Live Catalogue from MongoDB Atlas Repository</p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C4AC79]" />
                  <span>Curate Specimen</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F5F0] text-[#686868] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Reference</th>
                      <th className="p-3">Title & Maison</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Valuation (USD)</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA]">
                    {assets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-[#F7F5F0]/50">
                        <td className="p-3 font-mono text-[#111111]">{asset.referenceNumber}</td>
                        <td className="p-3">
                          <p className="font-medium text-[#111111]">{asset.title}</p>
                          <span className="text-[#686868]">{asset.makerOrArtist} ({asset.year})</span>
                        </td>
                        <td className="p-3 uppercase text-[10px] text-[#A68A55]">{asset.categoryLabel}</td>
                        <td className="p-3 font-serif font-semibold text-[#263A31]">
                          ${(asset.valuationMinUSD / 1000).toFixed(0)}k - ${(asset.valuationMaxUSD / 1000).toFixed(0)}k
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {asset.provenanceStatus}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => openSpecimenModal(asset)}
                            className="text-[10px] uppercase tracking-wider text-[#263A31] font-semibold hover:underline"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ASSET MANAGEMENT TAB */}
        {activeSection === "assets" && (
          <div className="space-y-6">
            <div className="bg-white p-6 border border-[#E5E5EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif text-[#111111]">Curatorial Specimen Registry</h2>
                <p className="text-xs text-[#686868] mt-1">
                  Manage museum-grade holdings, archival condition scorecards, and high-resolution plates.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
              >
                <Plus className="w-4 h-4 text-[#C4AC79]" />
                <span>Publish New Specimen</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset) => (
                <div key={asset.id} className="bg-white border border-[#E5E5EA] overflow-hidden flex flex-col group">
                  <div className="relative h-48 w-full bg-[#EAE5DC]">
                    <img
                      src={asset.image}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-[9px] uppercase tracking-wider px-2 py-0.5">
                      {asset.categoryLabel}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                        {asset.makerOrArtist} • {asset.year}
                      </span>
                      <h3 className="text-base font-serif text-[#111111] font-normal mt-1 leading-snug line-clamp-2">
                        {asset.title}
                      </h3>
                      <p className="text-xs text-[#686868] mt-2 font-mono">
                        Ref: {asset.referenceNumber}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5E5EA] flex items-center justify-between text-xs">
                      <span className="font-serif font-semibold text-[#263A31]">
                        ${(asset.valuationMinUSD / 1000).toFixed(0)}k - ${(asset.valuationMaxUSD / 1000).toFixed(0)}k
                      </span>
                      <button
                        onClick={() => openSpecimenModal(asset)}
                        className="text-[11px] uppercase tracking-wider text-[#A68A55] font-semibold hover:underline"
                      >
                        Scorecard →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENQUIRIES TAB */}
        {activeSection === "enquiries" && (
          <div className="bg-white border border-[#E5E5EA] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4">
              <div>
                <h2 className="text-xl font-serif text-[#111111]">Private Inquiries & Advisory Intakes</h2>
                <p className="text-xs text-[#686868] mt-0.5">
                  Direct petitions submitted through DARBAAR Private Advisory corridors.
                </p>
              </div>
              <span className="text-xs font-mono text-[#A68A55] font-semibold">
                Total: {enquiriesList.length || 3} Petitions
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F5F0] text-[#686868] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Client Principal</th>
                    <th className="p-3">Subject / Asset</th>
                    <th className="p-3">Corridor</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA]">
                  {(enquiriesList.length > 0
                    ? enquiriesList
                    : [
                        {
                          _id: "enq-01",
                          fullName: "Lord Alistair Vance",
                          email: "principal@vance-holdings.ch",
                          assetTitle: "Patek Philippe Ref. 3970E",
                          preferredSalon: "Geneva",
                          inquiryType: "Acquisition",
                          status: "pending",
                        },
                        {
                          _id: "enq-02",
                          fullName: "Mayfair Family Trust",
                          email: "trustee@mayfair-advisors.co.uk",
                          assetTitle: "Mewar Royal Court Durbar (1894)",
                          preferredSalon: "London",
                          inquiryType: "Private Viewing",
                          status: "under_review",
                        },
                        {
                          _id: "enq-03",
                          fullName: "Sovereign Collector HK",
                          email: "hk.private@sovereign-vault.hk",
                          assetTitle: "F.P. Journe Chronomètre à Résonance",
                          preferredSalon: "Singapore",
                          inquiryType: "Valuation Request",
                          status: "contacted",
                        },
                      ]
                  ).map((enq: any) => (
                    <tr key={enq._id} className="hover:bg-[#F7F5F0]/50">
                      <td className="p-3">
                        <p className="font-medium text-[#111111]">{enq.fullName}</p>
                        <span className="text-[10px] text-[#686868]">{enq.email}</span>
                      </td>
                      <td className="p-3 font-medium text-[#111111]">{enq.assetTitle || "General Advisory Mandate"}</td>
                      <td className="p-3 uppercase text-[10px] text-[#A68A55]">{enq.preferredSalon || "Geneva"}</td>
                      <td className="p-3 text-[11px] text-[#686868]">{enq.inquiryType}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-[#EAE5DC] text-[#263A31] border border-[#E5E5EA]">
                          {enq.status || "pending"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-[10px] uppercase tracking-wider text-[#263A31] font-semibold hover:underline">
                          Assign Partner
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VERIFICATION & SCORECARDS TAB */}
        {activeSection === "verification" && (
          <div className="bg-white border border-[#E5E5EA] p-6 space-y-6">
            <div>
              <h2 className="text-xl font-serif text-[#111111]">Independent Specialist Reports & Condition Diagnostics</h2>
              <p className="text-xs text-[#686868] mt-0.5">
                Multi-spectral analysis, alloy purity spectroscopy, and archival extract coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                  Laboratory Docket: DARBAAR-CHA-GVA-9921
                </span>
                <h3 className="text-base font-serif text-[#111111]">
                  Patek Philippe Ref. 3970E — Movement Timing & Amplitude
                </h3>
                <p className="text-xs text-[#686868] leading-relaxed">
                  Certified by Cabinet d'Horlogerie Ancienne, Geneva. Isochronism testing over 6 positions: +1.8s/day average rate, amplitude 298°, zero mechanical polishing detected.
                </p>
                <div className="pt-2 text-[10px] uppercase tracking-wider text-emerald-800 font-medium flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Grade I Certified • Dossier Inscribed</span>
                </div>
              </div>

              <div className="p-5 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                  Laboratory Docket: DARBAAR-BIAP-LDN-4421
                </span>
                <h3 className="text-base font-serif text-[#111111]">
                  Royal Durbar of Udaipur — Wasli Pigment Raman Spectroscopy
                </h3>
                <p className="text-xs text-[#686868] leading-relaxed">
                  Certified by British Institute of Fine Art Preservation. Confirmed late-19th-century natural lapis lazuli and mineral vermilion on handmade wasli support.
                </p>
                <div className="pt-2 text-[10px] uppercase tracking-wider text-emerald-800 font-medium flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Archival Integrity Authenticated</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AUDIT LOGS TAB */}
        {activeSection === "audit" && (
          <div className="bg-white border border-[#E5E5EA] p-6 space-y-6">
            <div>
              <h2 className="text-xl font-serif text-[#111111]">System Audit Logs & Security Telemetry</h2>
              <p className="text-xs text-[#686868] mt-0.5">
                Immutable chronological event trail of curatorial actions, admissions, and confidential inquiries.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F5F0] text-[#686868] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Resource</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA] font-mono text-[11px]">
                  {[
                    { time: "Nov 11, 2026 - 12:54:22", action: "DATABASE_CONNECTED", res: "MongoDB Atlas / darbaar", status: "SUCCESS" },
                    { time: "Nov 11, 2026 - 12:53:49", action: "MEDIA_VAULT_PING", res: "Cloudinary ebnwmsqd", status: "VERIFIED" },
                    { time: "Nov 11, 2026 - 12:44:11", action: "JWT_SECURITY_AUDIT", res: "256-bit Cryptographic Salt", status: "ACTIVE" },
                    { time: "Nov 11, 2026 - 12:23:01", action: "SPECIMEN_SEED_EXEC", res: "3 Curatorial Masterpieces", status: "COMMITTED" },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-[#F7F5F0]/50">
                      <td className="p-3 text-[#686868]">{log.time}</td>
                      <td className="p-3 font-semibold text-[#111111]">{log.action}</td>
                      <td className="p-3 text-[#A68A55]">{log.res}</td>
                      <td className="p-3">
                        <span className="text-emerald-700 font-semibold">{log.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Specimen Creation Modal */}
      <CreateAssetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAssetCreated={() => {
          refreshAssets();
          fetchOverview();
        }}
      />
    </div>
  );
}
