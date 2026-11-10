"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, KeyRound, Sparkles, ArrowRight, UserCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "dealer" | "advisor">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoFill = () => {
    if (role === "client") {
      setEmail("principal@vance-holdings.ch");
      setPassword("DarbaarVault2026!");
    } else if (role === "dealer") {
      setEmail("salon.mayfair@horology-partners.co.uk");
      setPassword("MayfairDealer2026!");
    } else {
      setEmail("advisory.geneva@darbaar.luxury");
      setPassword("GenevaAdvisory2026!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please input your accredited credentials.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === "advisor") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 800);
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#F7F5F0] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-[#E5E5EA] shadow-xl p-8 sm:p-10 space-y-8 rounded-xs relative">
        {/* Subtle decorative gold corners */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#A68A55]"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#A68A55]"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#A68A55]"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#A68A55]"></div>

        {/* Brand Crest & Title */}
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
            <h2 className="text-lg font-serif text-[#111111]">
              Private Vault & Advisory Desk
            </h2>
            <p className="text-xs text-[#686868] font-light">
              Secure authentication for accredited patrons and advisory partners.
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#F7F5F0] border border-[#E5E5EA] text-[10px] uppercase tracking-wider text-center">
          {[
            { id: "client", label: "Client Vault" },
            { id: "dealer", label: "Consignor" },
            { id: "advisor", label: "Advisory" },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRole(r.id as any);
                setEmail("");
                setPassword("");
              }}
              className={`py-2 transition-colors ${
                role === r.id
                  ? "bg-[#263A31] text-white font-medium"
                  : "text-[#686868] hover:text-[#111111]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium flex items-center justify-between">
              <span>Accredited Email</span>
              <span className="text-[10px] text-[#A68A55] font-light">Confidential</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A68A55] absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="principal@privateoffice.ch"
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium flex items-center justify-between">
              <span>Access Key / Password</span>
              <span className="text-[10px] text-[#686868] hover:text-[#111111] cursor-pointer">Forgot Key?</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A68A55] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
              />
            </div>
          </div>

          {/* Quick Demo Fill Pill */}
          <div className="pt-1 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[#A68A55] hover:underline flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3" />
              <span>Fill Demonstration Credentials</span>
            </button>
            <span className="text-[#686868] text-[10px]">256-bit SSL</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <KeyRound className="w-3.5 h-3.5 text-[#C4AC79]" />
                <span>Enter Private Vault</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="border-t border-[#E5E5EA] pt-4 text-center space-y-2 text-xs text-[#686868]">
          <p>
            Seeking private representation?{" "}
            <Link href="/register" className="text-[#263A31] font-medium underline">
              Apply for Private Admission
            </Link>
          </p>
          <p className="text-[10px] text-[#686868]/70">
            All portal sessions are encrypted and subject to DARBAAR confidentiality covenants.
          </p>
        </div>
      </div>
    </div>
  );
}
