"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { CURATED_ASSETS } from "@/lib/data";

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState<
    "overview" | "assets" | "enquiries" | "verification" | "audit"
  >("overview");

  return (
    <div className="w-full bg-[#F7F5F0] min-h-screen pb-24">
      {/* Top Admin Bar */}
      <div className="bg-[#111111] text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-[#263A31]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h1 className="text-xl font-serif tracking-wider uppercase text-white">
              DARBAAR Administration & Curatorial Control
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-[#A68A55] border border-[#A68A55]/40 px-2 py-0.5">
              Superadmin Mode
            </span>
          </div>
          <span className="text-xs text-[#EAE5DC]/60 font-mono">
            Node: Zurich Vault API Gateway
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
        {activeSection === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Active Curated Listings</span>
                <p className="text-2xl font-serif font-bold text-[#111111]">{CURATED_ASSETS.length}</p>
                <p className="text-[11px] text-emerald-700">100% Archival Scorecards Complete</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Pending Inquiries</span>
                <p className="text-2xl font-serif font-bold text-[#A68A55]">07 Active</p>
                <p className="text-[11px] text-[#686868]">3 Geneva • 2 London • 2 Singapore</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Verified Consignors</span>
                <p className="text-2xl font-serif font-bold text-[#111111]">14 Principals</p>
                <p className="text-[11px] text-[#686868]">KYC & AML Cleared</p>
              </div>

              <div className="bg-white p-6 border border-[#E5E5EA] space-y-1">
                <span className="text-[10px] uppercase text-[#686868]">Aggregate Private Value</span>
                <p className="text-2xl font-serif font-bold text-[#263A31]">$1.68M USD</p>
                <p className="text-[11px] text-[#A68A55]">Mid-Range Valuation</p>
              </div>
            </div>

            {/* Asset Table */}
            <div className="bg-white border border-[#E5E5EA] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif text-[#111111]">Curated Inventory Status</h3>
                <span className="text-xs text-[#686868]">Demonstration Registry</span>
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
                    {CURATED_ASSETS.map((asset) => (
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
                          <button className="text-[10px] uppercase tracking-wider text-[#263A31] font-semibold hover:underline">
                            Edit Dossier
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

        {activeSection !== "overview" && (
          <div className="bg-white p-8 border border-[#E5E5EA] text-center space-y-3">
            <h3 className="text-lg font-serif text-[#111111]">
              Section: {activeSection.toUpperCase()}
            </h3>
            <p className="text-xs text-[#686868] max-w-md mx-auto">
              This module connects directly to backend REST endpoints for Mongoose collections (Assets, Users, Inquiries, Valuations, AuditLogs).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
