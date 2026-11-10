"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, User, Phone, CheckCircle2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [targetCategory, setTargetCategory] = useState("Fine Art & Timepieces");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#F7F5F0] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white border border-[#E5E5EA] shadow-xl p-8 sm:p-10 space-y-6 rounded-xs relative">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <span className="text-3xl font-serif tracking-[0.25em] text-[#111111] uppercase font-normal">
              DARBAAR
            </span>
            <p className="text-[9px] tracking-[0.35em] text-[#A68A55] uppercase mt-0.5">
              Where Heritage Meets Rarity
            </p>
          </Link>
          <div className="pt-2">
            <h2 className="text-xl font-serif text-[#111111]">
              Apply for Private Admission
            </h2>
            <p className="text-xs text-[#686868] font-light">
              Exclusive advisory, off-market treaty access, and certified collection vaulting.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#263A31] mx-auto" />
            <h3 className="text-xl font-serif text-[#111111]">
              Admission Mandate Received
            </h3>
            <p className="text-xs text-[#686868] leading-relaxed max-w-sm mx-auto">
              Thank you, {fullName}. Your credentials have been submitted to our Client Onboarding Committee under strict confidentiality covenants.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#263A31]"
            >
              Enter Client Vault
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                Full Legal Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#A68A55] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Principal or Representative Name"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                Confidential Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A68A55] absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@privateoffice.ch"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                  Direct Telephone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#A68A55] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0912"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                  Primary Collecting Focus
                </label>
                <select
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                >
                  <option value="Fine Art & Timepieces">Fine Art & Rare Timepieces</option>
                  <option value="Haute Horlogerie">Haute Horlogerie Exclusively</option>
                  <option value="Heritage Miniatures">Indian Palace Miniatures</option>
                  <option value="Arms & Antiquities">Imperial Arms & Antiquities</option>
                  <option value="Comprehensive">Comprehensive Collection Advisory</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                Create Private Access Key *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A68A55] absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters with numbers"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Transmitting Credentials...</span>
                ) : (
                  <>
                    <Shield className="w-3.5 h-3.5 text-[#C4AC79]" />
                    <span>Submit Private Admission Mandate</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="border-t border-[#E5E5EA] pt-4 text-center text-xs text-[#686868]">
          Already have verified credentials?{" "}
          <Link href="/login" className="text-[#263A31] font-medium underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

