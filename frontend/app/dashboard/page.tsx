"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  FileText,
  Clock,
  Compass,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Plus,
  TrendingUp,
  Award,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { LuxuryImage } from "@/components/LuxuryImage";
import { darbaarApi } from "@/lib/api";

export default function ClientDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "collection" | "saved" | "enquiries" | "documents"
  >("overview");
  const [userName, setUserName] = useState("Client Principal");
  const [accountRef, setAccountRef] = useState("DARBAAR-PVT-001");
  const [userEnquiries, setUserEnquiries] = useState<any[]>([]);

  const {
    formatAmount,
    formatRange,
    openSpecimenModal,
    openInquiryModal,
    currentUser,
    currency,
  } = useDarbaar();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("darbaar_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.fullName) setUserName(u.fullName);
        if (u.id || u._id) {
          const idStr = u.id || u._id;
          setAccountRef(`DARBAAR-PVT-${idStr.slice(-4).toUpperCase()}`);
        }
      }
      const token = localStorage.getItem("darbaar_token") || "";
      if (token) {
        darbaarApi.enquiries
          .getAll(token)
          .then((res) => {
            if (res.success && Array.isArray(res.enquiries)) {
              setUserEnquiries(res.enquiries);
            }
          })
          .catch(() => {});
      }
    } catch {}
  }, []);

  // Client vault starts clean and genuine
  const clientCollection: any[] = [];
  const savedAssets: any[] = [];
  const totalPortfolioUSD = 0;

  return (
    <div className="w-full bg-[#F7F5F0] min-h-screen pb-24">
      {/* Top Client Profile Header Bar */}
      <div className="bg-[#263A31] text-white border-b border-[#1B2A23] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C4AC79]">
              <Shield className="w-3.5 h-3.5" />
              <span>DARBAAR Private Client Vault • Authenticated Corridor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white">
              Private Collection & Advisory Desk
            </h1>
            <p className="text-xs text-[#EAE5DC]/80 font-light">
              Client Principal: <span className="text-white font-medium">{currentUser?.fullName || userName}</span> • Account Reference:{" "}
              <span className="font-mono text-[#C4AC79]">{accountRef}</span>
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
            { id: "collection", label: `My Collection (${clientCollection.length})` },
            { id: "saved", label: `Saved Assets (${savedAssets.length})` },
            { id: "enquiries", label: `Active Mandates (${userEnquiries.length})` },
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
                  Total Vault Portfolio Valuation ({currency})
                </span>
                <p className="text-2xl font-serif font-semibold text-[#263A31]">
                  {formatAmount(totalPortfolioUSD)}
                </p>
                <div className="flex items-center space-x-1 text-[11px] text-[#A68A55]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Real-Time Archival Valuation</span>
                </div>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">
                  Catalogued Heirlooms
                </span>
                <p className="text-2xl font-serif font-semibold text-[#111111]">
                  {clientCollection.length.toString().padStart(2, "0")} Specimens
                </p>
                <p className="text-[11px] text-[#686868]">Geneva & London Freeports</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">
                  Active Advisory Mandates
                </span>
                <p className="text-2xl font-serif font-semibold text-[#111111]">
                  {userEnquiries.length.toString().padStart(2, "0")} Active
                </p>
                <p className="text-[11px] text-[#686868]">Private Sourcing & Inquiries</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#686868] block">
                  Archival Condition Dossiers
                </span>
                <p className="text-2xl font-serif font-semibold text-[#111111]">
                  00 Certified
                </p>
                <p className="text-[11px] text-[#263A31] font-medium">Encrypted Vault Storage</p>
              </div>
            </div>

            {/* Curated Collection Status */}
            <div className="bg-white border border-[#E5E5EA] p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F7F5F0] border border-[#E5E5EA] flex items-center justify-center mx-auto text-[#A68A55]">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-[#111111]">
                  Vault Collection Ledger
                </h3>
                <p className="text-xs text-[#686868] max-w-md mx-auto leading-relaxed">
                  Your private collection ledger is currently empty. Authenticated acquisitions and museum accession records will appear here upon transfer of custody.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => openInquiryModal()}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                >
                  Consult Advisory Desk
                </button>
                <Link
                  href="/marketplace"
                  className="px-6 py-2.5 text-xs uppercase tracking-wider text-[#263A31] bg-white border border-[#263A31] hover:bg-[#F7F5F0] transition-colors"
                >
                  Explore Curated Holdings
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "collection" && (
          <div className="bg-white p-8 border border-[#E5E5EA] text-center space-y-4">
            <h3 className="text-xl font-serif text-[#111111]">Registered Collection Assets</h3>
            <p className="text-xs text-[#686868] max-w-md mx-auto">
              No authenticated specimens currently held in your private vault. Once an acquisition mandate clears laboratory spectrometry and archival settlement, its ledger record will appear here.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openInquiryModal()}
                className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#263A31] text-white"
              >
                Initiate Private Acquisition
              </button>
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-white p-8 border border-[#E5E5EA] text-center space-y-4">
            <h3 className="text-xl font-serif text-[#111111]">Saved Private Catalogue Records</h3>
            <p className="text-xs text-[#686868] max-w-md mx-auto">
              No specimens saved to your private acquisition watchlist. Explore the curatorial catalogue or commission a bespoke acquisition through our private advisory desk.
            </p>
            <div className="pt-2">
              <Link
                href="/marketplace"
                className="inline-block px-6 py-2.5 text-xs uppercase tracking-wider bg-[#263A31] text-white"
              >
                Browse Curated Gallery
              </Link>
            </div>
          </div>
        )}

        {activeTab === "enquiries" && (
          <div className="bg-white p-8 border border-[#E5E5EA] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4">
              <div>
                <h3 className="text-xl font-serif text-[#111111]">Active Advisory & Sourcing Mandates</h3>
                <p className="text-xs text-[#686868] mt-0.5">
                  Direct communication channels with the DARBAAR Curatorial Directorate.
                </p>
              </div>
              <button
                onClick={() => openInquiryModal()}
                className="px-4 py-2 text-xs uppercase tracking-wider text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
              >
                + New Mandate
              </button>
            </div>

            {userEnquiries.length === 0 ? (
              <div className="py-12 text-center space-y-3 bg-[#F7F5F0] border border-[#E5E5EA] p-6">
                <Inbox className="w-8 h-8 text-[#A68A55] mx-auto" />
                <h4 className="text-base font-serif text-[#111111]">No Active Mandates on File</h4>
                <p className="text-xs text-[#686868] max-w-md mx-auto">
                  When you submit an acquisition inquiry or advisory mandate, status updates and curatorial correspondence will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userEnquiries.map((m: any) => (
                  <div key={m._id || m.id} className="p-4 border border-[#E5E5EA] bg-[#F7F5F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#A68A55]">
                        {m._id ? `REF-${m._id.slice(-6).toUpperCase()}` : "DARBAAR-MND"}
                      </span>
                      <h4 className="text-sm font-serif text-[#111111] font-medium">
                        {m.assetTitle || m.inquiryType || "Confidential Advisory Mandate"}
                      </h4>
                      <p className="text-xs text-[#686868]">
                        Salon: {m.preferredSalon || "Geneva / Mumbai"} • Date: {new Date(m.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 bg-white border border-[#E5E5EA] text-[#263A31] font-medium self-start sm:self-auto uppercase tracking-wider text-[10px]">
                      {m.status || "Under Review"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-white p-8 border border-[#E5E5EA] text-center space-y-4">
            <h3 className="text-xl font-serif text-[#111111]">Certified Archival Documents & Reports</h3>
            <p className="text-xs text-[#686868] max-w-md mx-auto">
              Certified provenance certificates, laboratory spectrometry reports, and Swiss freeport storage receipts will be issued directly to your account upon verified specimen acquisition.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openInquiryModal()}
                className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#263A31] text-white"
              >
                Request Archival Verification
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
