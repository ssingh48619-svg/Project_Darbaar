import React from "react";

export default function PrivacyPage() {
  return (
    <div className="w-full bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#E5E5EA] pb-6 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
            Legal & Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#111111]">
            Privacy & Client Discretion Policy
          </h1>
          <p className="text-xs text-[#686868]">Last Updated: November 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">1. Commitment to Discretion</h2>
            <p>
              DARBAAR (&ldquo;the House&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) treats client confidentiality as fundamental to our operational ethos. We do not sell, rent, monetize, or publicly disclose information concerning our patrons, their acquisitions, or their collections.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">2. Information Collected</h2>
            <p>
              Information collected is limited to that required for Know-Your-Customer (KYC) identity compliance, anti-money laundering (AML) screening, secure communications, and the execution of private treaty sales or advisory mandates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">3. Third-Party Laboratory & Scientific Verification</h2>
            <p>
              When coordinating independent authentication with manufacturer archives or specialized scientific laboratories, client identities are anonymized behind DARBAAR principal reference numbers to preserve complete privacy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#111111] font-semibold">4. Data Storage & Security</h2>
            <p>
              Client records and digital dossiers are stored using end-to-end encryption with strict role-based access privileges restricted solely to accredited advisory partners.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
