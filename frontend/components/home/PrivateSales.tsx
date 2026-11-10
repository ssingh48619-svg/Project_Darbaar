"use client";

import React from "react";
import { Lock, FileSearch, Handshake, ShieldCheck, Scale, ArrowRight } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export function PrivateSales() {
  const { openInquiryModal } = useDarbaar();

  const services = [
    {
      title: "Private Sourcing Mandates",
      desc: "Retain DARBAAR to source specific museum-tier horological references, Indian miniature paintings, or royal armory pieces from off-market private estates.",
      icon: FileSearch,
    },
    {
      title: "Discreet Seller Representation",
      desc: "Consign significant assets without public auction cataloguing or price exposure. Direct introduction to qualified private collectors under binding NDAs.",
      icon: Handshake,
    },
    {
      title: "Confidential Client Enquiries",
      desc: "Complete anonymity for principals. All discussions and negotiations are fronted by Senior DARBAAR Partners with rigorous privacy safeguards.",
      icon: Lock,
    },
    {
      title: "Collection Succession Consultation",
      desc: "Structuring long-term preservation, physical vaulting coordination across Zurich and Geneva free ports, and multi-generational collection transfer.",
      icon: Scale,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#263A31] text-[#F7F5F0] border-b border-[#1B2A23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1B2A23] border border-[#344D42] text-[10px] uppercase tracking-[0.25em] text-[#C4AC79]">
              <Lock className="w-3 h-3" />
              <span>Private Treaty & Off-Market Desk</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal leading-tight text-white">
              Access Beyond <br />
              <span className="italic text-[#C4AC79]">the Ordinary.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#EAE5DC]/80 font-light leading-relaxed">
              The world&apos;s most extraordinary objects seldom cross public auction podiums. DARBAAR provides discreet brokerage, private treaty mediation, and bespoke acquisition advisory for high-net-worth patrons, family offices, and institutions.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => openInquiryModal()}
                className="inline-flex items-center space-x-3 px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-[#111111] bg-[#C4AC79] hover:bg-white transition-all shadow-md"
              >
                <span>Initiate Private Mandate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Legal Notice */}
            <div className="p-4 bg-[#1B2A23]/60 border border-[#344D42] text-[10px] text-[#EAE5DC]/60 font-light leading-relaxed">
              <p>
                <strong className="text-[#C4AC79]">Operational Transparency:</strong> DARBAAR acts strictly as a luxury advisory and private treaty transaction coordinator. DARBAAR does not provide banking, escrow, deposit-taking, or investment management services. Settlement and third-party custody are conducted through licensed trust and escrow institutions.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Key Capabilities */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1B2A23] border border-[#344D42] p-6 hover:border-[#C4AC79] transition-all space-y-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#263A31] flex items-center justify-center text-[#C4AC79] border border-[#344D42]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-serif font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#EAE5DC]/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
