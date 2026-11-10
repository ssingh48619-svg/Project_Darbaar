"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Compass, Mail, Globe, ArrowUpRight } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export function Footer() {
  const { openInquiryModal } = useDarbaar();

  return (
    <footer className="bg-[#111111] text-[#F7F5F0] border-t border-[#263A31]/40">
      {/* Upper Subtle Distinction Bar */}
      <div className="border-b border-[#263A31]/30 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-medium">
              Private Client Advisory Desk
            </p>
            <p className="text-sm text-[#EAE5DC]/80 font-light max-w-xl">
              Discreet acquisitions, museum-standard condition assessments, and international provenance stewardship for discerning private collectors.
            </p>
          </div>
          <button
            onClick={() => openInquiryModal()}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#111111] bg-[#C4AC79] hover:bg-[#A68A55] px-6 py-3 font-medium transition-colors duration-200"
          >
            <span>Initiate Confidential Inquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-serif tracking-[0.25em] text-white font-normal uppercase">
                DARBAAR
              </span>
              <p className="text-[10px] tracking-[0.35em] text-[#A68A55] uppercase mt-1">
                Where Heritage Meets Rarity
              </p>
            </Link>
            <p className="text-xs text-[#EAE5DC]/70 leading-relaxed font-light max-w-sm">
              Inspired by the grandeur of India&apos;s historic royal courts and the refined discretion of international auction houses. Curating exceptional fine art, rare horology, and heirloom assets across generations.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#A68A55]">
              <ShieldCheck className="w-4 h-4 text-[#C4AC79]" />
              <span>Independent Expert Condition & Provenance Coordination</span>
            </div>
          </div>

          {/* Curated Categories */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#A68A55] font-medium">
              Curated Fields
            </p>
            <ul className="space-y-2.5 text-xs text-[#EAE5DC]/80 font-light">
              <li>
                <Link href="/fine-art" className="hover:text-white hover:underline transition-colors">
                  Fine Art & Miniatures
                </Link>
              </li>
              <li>
                <Link href="/timepieces" className="hover:text-white hover:underline transition-colors">
                  Rare Timepieces
                </Link>
              </li>
              <li>
                <Link href="/collectibles" className="hover:text-white hover:underline transition-colors">
                  Antique Collectibles
                </Link>
              </li>
              <li>
                <Link href="/private-sales" className="hover:text-white hover:underline transition-colors">
                  Private Treaty Sales
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white hover:underline transition-colors">
                  Consign With DARBAAR
                </Link>
              </li>
            </ul>
          </div>

          {/* Advisory & Services */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#A68A55] font-medium">
              Advisory & Research
            </p>
            <ul className="space-y-2.5 text-xs text-[#EAE5DC]/80 font-light">
              <li>
                <Link href="/advisory" className="hover:text-white hover:underline transition-colors">
                  Acquisition Advisory
                </Link>
              </li>
              <li>
                <Link href="/provenance" className="hover:text-white hover:underline transition-colors">
                  Provenance & Authentication
                </Link>
              </li>
              <li>
                <Link href="/advisory#collection" className="hover:text-white hover:underline transition-colors">
                  Collection Management
                </Link>
              </li>
              <li>
                <Link href="/advisory#valuations" className="hover:text-white hover:underline transition-colors">
                  Valuation Coordination
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white hover:underline transition-colors">
                  Client Vault Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* House & Governance */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#A68A55] font-medium">
              House & Governance
            </p>
            <ul className="space-y-2.5 text-xs text-[#EAE5DC]/80 font-light">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  About DARBAAR
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Private Appointments
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline transition-colors">
                  Privacy & Discretion Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline transition-colors">
                  Terms of Private Treaty
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Appointment Salons & Compliance Disclosure */}
        <div className="mt-16 pt-8 border-t border-white/10 text-[11px] text-[#EAE5DC]/60 space-y-4 leading-relaxed font-light">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-[#C4AC79]">
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest text-[10px]">International Operations:</span>
              <span className="text-white/80">London • Geneva • New York • Singapore • Mumbai • Dubai</span>
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <a href="mailto:advisory@darbaar.luxury" className="hover:text-white flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#A68A55]" /> advisory@darbaar.luxury
              </a>
            </div>
          </div>

          {/* Essential Legal Transparency Notice (as mandated) */}
          <div className="bg-[#1B2A23]/50 p-4 rounded border border-[#263A31] text-[10px] text-[#EAE5DC]/70">
            <p>
              <strong className="text-[#C4AC79]">Regulatory & Demonstration Notice:</strong> DARBAAR operates as a specialized luxury advisory and private treaty intermediary. DARBAAR does not provide banking, escrow, deposit-taking, or custodial financial services. All asset records marked with demonstration markers are curated illustrative catalogue entries for technical and presentation demonstration. Regional salon mentions represent planned client appointment corridors and advisory liaisons. Independent inspection reports and authentication dossiers are coordinated through accredited external specialists and laboratories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[10px] text-[#EAE5DC]/50">
            <p>© {new Date().getFullYear()} DARBAAR Global Luxury Holdings Ltd. All rights reserved.</p>
            <p className="tracking-widest uppercase">London • Geneva • New York • Singapore</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

