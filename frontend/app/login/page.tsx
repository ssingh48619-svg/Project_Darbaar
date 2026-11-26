"use client";

import React, { useState, useEffect } from "react";
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
  RotateCw,
  ArrowLeft,
} from "lucide-react";
import { darbaarApi } from "@/lib/api";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { DarbaarCrest } from "@/components/DarbaarCrest";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useDarbaar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP flow for unverified accounts
  const [step, setStep] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const [success, setSuccess] = useState(false);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsNotRegistered(false);

    if (!email.trim() || !password) {
      setError("Please enter both your email address and password.");
      return;
    }

    try {
      setLoading(true);
      const targetEmail = email.trim().toLowerCase();
      const res = await darbaarApi.auth.login({
        email: targetEmail,
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
        setError(res.error || "Authentication failed. Please verify your credentials.");
      }
    } catch (err: any) {
      const msg = err.message || "";
      // Check if user requires OTP verification
      if (
        err.requiresOtp ||
        err.data?.requiresOtp ||
        msg.toLowerCase().includes("verify your email")
      ) {
        setOtpEmail(email.trim().toLowerCase());
        setStep("otp");
        setResendCountdown(60);
        setError("");
        setResendMessage("A fresh verification code was sent to your email. Please enter it below.");
      } else if (
        msg.toLowerCase().includes("no account found") ||
        msg.toLowerCase().includes("404") ||
        msg.toLowerCase().includes("not registered")
      ) {
        setIsNotRegistered(true);
        setError("No account found matching this email. Please create a new account first.");
      } else if (
        msg.toLowerCase().includes("incorrect password") ||
        msg.toLowerCase().includes("invalid security")
      ) {
        setError("Incorrect password. Please verify your credentials and try again.");
      } else {
        setError(msg || "Unable to sign in. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");

    const cleanOtp = otp.trim().replace(/\D/g, "");
    if (cleanOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      const res = await darbaarApi.auth.verifyOtp({
        email: otpEmail,
        otp: cleanOtp,
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
        setError(res.error || "Verification failed. Please check the code and try again.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid or expired verification code. Please request a new code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0 || resending) return;
    try {
      setResending(true);
      setError("");
      setResendMessage("");
      const res = await darbaarApi.auth.resendOtp({ email: otpEmail });
      setResendMessage(res.message || "A new 6-digit verification passkey has been dispatched.");
      setResendCountdown(60);
    } catch (err: any) {
      setError(err.message || "Unable to resend passkey at this moment.");
    } finally {
      setResending(false);
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
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="relative p-0.5 rounded-sm bg-gradient-to-br from-[#C4AC79]/40 to-transparent mb-1.5 flex-shrink-0">
              <DarbaarCrest className="w-12 h-12 shadow-md group-hover:scale-105 transition-transform" />
            </div>
            <span className="text-3xl font-serif tracking-[0.25em] text-[#111111] uppercase font-normal">
              DARBAAR
            </span>
            <p className="text-[9px] tracking-[0.35em] text-[#A68A55] uppercase mt-0.5">
              Where Heritage Meets Rarity
            </p>
          </Link>
          <div className="pt-2 border-t border-[#E5E5EA]">
            <h1 className="text-xl sm:text-2xl font-serif text-[#111111]">
              {step === "otp" ? "Verify Email Address" : "Sign In to Your Account"}
            </h1>
            <p className="text-xs text-[#686868] mt-1">
              {step === "otp"
                ? `Enter the 6-digit passkey sent to ${otpEmail}`
                : "Enter your registered Email Address & Password"}
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xs flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800">Authentication Successful</p>
              <p className="text-[11px] text-emerald-700">Redirecting to your private portal...</p>
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
                  <span>Create a New Account →</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Resend Notice */}
        {resendMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="font-medium">{resendMessage}</p>
          </div>
        )}

        {step === "otp" ? (
          /* UNVERIFIED EMAIL OTP SCREEN */
          <div className="space-y-4">
            <div className="bg-[#F7F5F0] border border-[#E5E5EA] p-3.5 text-center rounded-xs space-y-1">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#263A31] text-[#C4AC79] mb-1">
                <KeyRound className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-[#111111]">
                Email Verification Required
              </p>
              <p className="text-[11px] text-[#686868] break-all">
                Your account is pending email confirmation. Please enter the 6-digit code sent to{" "}
                <strong className="text-[#263A31]">{otpEmail}</strong>.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111111] flex items-center justify-between">
                  <span>Enter 6-Digit Passkey</span>
                  <span className="text-[10px] text-[#A68A55] font-mono">10 MIN EXPIRY</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="• • • • • •"
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl py-3 border-2 border-[#A68A55] text-[#263A31] bg-white rounded-xs focus:outline-none focus:ring-2 focus:ring-[#A68A55]/30 font-bold placeholder:text-gray-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.trim().length !== 6}
                className="w-full py-3.5 bg-[#263A31] text-white hover:bg-[#1B2A23] font-medium text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? "Verifying..." : "Verify Passkey & Enter Vault"}</span>
                <ArrowRight className="w-4 h-4 text-[#C4AC79]" />
              </button>
            </form>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-[#686868] gap-3 border-t border-[#E5E5EA]">
              <button
                type="button"
                onClick={() => {
                  setStep("login");
                  setError("");
                  setResendMessage("");
                }}
                className="inline-flex items-center text-[#263A31] hover:underline space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>

              <button
                type="button"
                disabled={resendCountdown > 0 || resending}
                onClick={handleResendOtp}
                className="inline-flex items-center text-[#A68A55] hover:text-[#8E7343] font-semibold disabled:opacity-50 space-x-1"
              >
                <RotateCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                <span>
                  {resendCountdown > 0
                    ? `Resend Code (${resendCountdown}s)`
                    : resending
                    ? "Sending..."
                    : "Resend Code"}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD LOGIN SCREEN */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] block">
                Registered Email Address *
              </label>
              <div className="flex items-center border border-[#E5E5EA] bg-white rounded-xs focus-within:border-[#A68A55] px-3 py-2.5 gap-3 transition-colors shadow-2xs">
                <Mail className="w-4 h-4 text-[#A68A55] flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. collector@darbaar.luxury"
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
                  placeholder="Enter your confidential password"
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
                <span>{loading ? "Verifying Credentials..." : "Sign In to DARBAAR"}</span>
                <ArrowRight className="w-4 h-4 text-[#C4AC79]" />
              </button>
            </div>
          </form>
        )}

        {/* Big Visible Box for First-Time Users */}
        {step === "login" && (
          <div className="p-4 bg-[#F7F5F0] border border-[#E5E5EA] text-center space-y-2 rounded-xs">
            <p className="text-xs text-[#111111] font-medium">
              First time visiting DARBAAR?
            </p>
            <p className="text-[11px] text-[#686868] leading-tight">
              Create an account to view restricted valuations, participate in private acquisitions, and access archival scorecards.
            </p>
            <div className="pt-1">
              <Link
                href="/register"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-[#263A31] text-[#263A31] hover:bg-[#263A31] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider rounded-xs"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#A68A55]" />
                <span>Create an Account →</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
