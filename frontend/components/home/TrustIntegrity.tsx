"use client";

import React from "react";
import { UserCheck, FileCheck, SearchCode, Eye, ShieldCheck, FileKey } from "lucide-react";

export function TrustIntegrity() {
  const steps = [
    {
      title: "Seller Identity Verification",
      desc: "Strict Know-Your-Customer (KYC) and beneficial ownership due diligence on every consigning party.",
      icon: UserCheck,
    },
    {
      title: "Asset Documentation",
      desc: "Comprehensive physical intake audit, micro-photography, serial number registration, and archival stamping.",
      icon: FileCheck,
    },
    {
      title: "Provenance Review",
      desc: "Rigorous historical ownership tracing through institutional catalogues, bill-of-sale registers, and export manifests.",
      icon: SearchCode,
    },
    {
      title: "Condition Inspection Coordination",
      desc: "Multispectral imaging, mechanical amplitude testing, and physical condition scorecards executed in secure vault suites.",
      icon: Eye,
    },
    {
      title: "Independent Expert Reports",
      desc: "Coordination with manufacturer heritage departments, accredited horological institutes, and art historian guilds.",
      icon: ShieldCheck,
    },
    {
      title: "Secure Document Handling",
      desc: "Confidential archival storage, cryptographic record hashing, and restricted-access digital dossiers for principals.",
      icon: FileKey,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E5E5EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
            Verification Protocol & Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] font-normal">
            Every Detail Matters.
          </h2>
          <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed pt-1">
            In an industry where certainty is paramount, DARBAAR enforces a rigorous multi-stage verification protocol for every object submitted to our private catalogue.
          </p>
        </div>

        {/* 6 Step Trust Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3 hover:border-[#A68A55] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center text-[#263A31]">
                    <Icon className="w-4 h-4 text-[#A68A55]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#686868]">0{idx + 1}</span>
                </div>
                <h3 className="text-base font-serif font-medium text-[#111111]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#686868] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsible Compliance Disclosure */}
        <div className="mt-12 p-6 bg-[#F7F5F0] border-l-4 border-[#A68A55] text-xs text-[#686868] space-y-1">
          <p className="font-semibold text-[#111111]">
            Standards of Independent Corroboration:
          </p>
          <p className="font-light leading-relaxed">
            DARBAAR commits to rigorous due diligence and scientific inspection. In accordance with international art and horological best practices, DARBAAR coordinates independent specialist opinions and manufacturer register extracts. We never claim infallible or 100% unilateral authentication guarantees; our assessments reflect the highest prevailing standards of accredited scholarship, scientific analysis, and archival corroboration.
          </p>
        </div>
      </div>
    </section>
  );
}
