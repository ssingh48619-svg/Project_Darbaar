import React from "react";

export default function TermsPage() {
  return (
    <div className="w-full bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#E5E5EA] pb-6 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
            Legal & Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#111111]">
            Terms of Private Treaty & Advisory
          </h1>
          <p className="text-xs text-[#686868]">Last Updated: November 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">1. Scope of Services</h2>
            <p>
              DARBAAR acts exclusively as a luxury advisory house, private treaty intermediary, and curatorial coordinator. DARBAAR does not provide banking, deposit-taking, investment management, or direct custodial financial services. Escrow and financial settlements are executed via regulated financial partners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">2. Demonstration & Curatorial Entries</h2>
            <p>
              Catalogue records marked with demonstration indicators represent illustrative records for curatorial presentation. Genuine listings are presented to accredited clients under individualized private treaty agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">3. Independent Condition & Authentication Opinions</h2>
            <p>
              All condition scorecards and provenance timelines are formulated based on careful scholarly review and independent specialist reports. While DARBAAR exercises the highest standard of due diligence, opinions of authenticity reflect prevailing scholarship and are not unilateral financial guarantees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">4. Governing Law</h2>
            <p>
              Private treaty contracts are governed by the specific jurisdiction specified in each executed bilateral agreement, typically England & Wales or the Canton of Geneva, Switzerland.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
