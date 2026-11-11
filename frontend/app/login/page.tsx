"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import { darbaarApi } from "@/lib/api";
import { useDarbaar } from "@/features/context/DarbaarContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useDarbaar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsNotRegistered(false);

    if (!email.trim() || !password) {
      setError("Kripya email aur password dono enter karein (Please enter both email and password).");
      return;
    }

    try {
      setLoading(true);
      const res = await darbaarApi.auth.login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (res.success && res.token && res.user) {
        loginUser(res.token, res.user);
        setSuccess(true);

        setTimeout(() => {
          if (res.user.role === "admin" || res.user.role === "advisor") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        }, 1200);
      } else {
        setError(res.error || "Login nahi ho paya. Kripya check karein.");
      }
    } catch (err: any) {
      const msg = err.message || "";
      if (
        msg.toLowerCase().includes("no account found") ||
        msg.toLowerCase().includes("nahi mila") ||
        msg.toLowerCase().includes("404")
      ) {
        setIsNotRegistered(true);
        setError("Is email se koi account nahi mila. Pehle naya account banana hoga.");
      } else if (
        msg.toLowerCase().includes("incorrect password") ||
        msg.toLowerCase().includes("galat password") ||
        msg.toLowerCase().includes("invalid security")
      ) {
        setError("Galat password! Kripya apna sahi password dalein.");
      } else {
        setError(msg || "Login me samasya aayi. Kripya apna email aur password check karein.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#F7F5F0] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-[#E5E5EA] shadow-2xl p-6 sm:p-10 space-y-6 rounded-xs relative">
        {/* Subtle decorative gold corners */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#A68A55]"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#A68A55]"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#A68A55]"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#A68A55]"></div>

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
          <div className="pt-2 border-t border-[#E5E5EA]">
            <h1 className="text-xl sm:text-2xl font-serif text-[#111111]">
              Apne Account me Login Karein
            </h1>
            <p className="text-xs text-[#686868] mt-1">
              Sign In with your registered Email ID & Password
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xs flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800">Login Kamyab Raha!</p>
              <p className="text-[11px] text-emerald-700">Aapko account me le jaya jaa raha hai...</p>
            </div>
          </div>
        )}

        {/* Error Notification with helpful action */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xs space-y-2">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-medium">{error}</p>
            </div>
            {isNotRegistered && (
              <div className="pt-2 border-t border-red-200/60">
                <Link
                  href="/register"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#263A31] text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs hover:bg-[#1B2A23] transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#C4AC79]" />
                  <span>Yaha Naya Account Banayein →</span>
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111111] block">
              Aapka Registered Email ID *
            </label>
            <div className="flex items-center border border-[#E5E5EA] bg-white rounded-xs focus-within:border-[#A68A55] px-3 py-2.5 gap-3 transition-colors shadow-2xs">
              <Mail className="w-4 h-4 text-[#A68A55] flex-shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Jaise: aapka.naam@gmail.com"
                className="w-full bg-transparent text-sm text-[#111111] focus:outline-none placeholder:text-[#686868]/60 border-0 p-0 m-0"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111111] block">
              Password *
            </label>
            <div className="flex items-center border border-[#E5E5EA] bg-white rounded-xs focus-within:border-[#A68A55] px-3 py-2.5 gap-3 transition-colors shadow-2xs">
              <Lock className="w-4 h-4 text-[#A68A55] flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Apna password dalein"
                className="w-full bg-transparent text-sm text-[#111111] focus:outline-none placeholder:text-[#686868]/60 border-0 p-0 m-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#686868] hover:text-[#111111] flex-shrink-0 p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Big Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 bg-[#263A31] text-white hover:bg-[#1B2A23] font-medium text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? "Checking Credentials..." : "Login Karein (Sign In)"}</span>
              <ArrowRight className="w-4 h-4 text-[#C4AC79]" />
            </button>
          </div>
        </form>

        {/* Big Visible Box for First-Time Users */}
        <div className="p-4 bg-[#F7F5F0] border border-[#E5E5EA] text-center space-y-2 rounded-xs">
          <p className="text-xs text-[#111111] font-medium">
            Pehli baar DARBAAR par aaye hain?
          </p>
          <p className="text-[11px] text-[#686868] leading-tight">
            Pehle apna account banana zaroori hai, tabhi aap login kar payenge.
          </p>
          <div className="pt-1">
            <Link
              href="/register"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-[#263A31] text-[#263A31] hover:bg-[#263A31] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider rounded-xs"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#A68A55]" />
              <span>Naya Account Banayein (Create Account) →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
