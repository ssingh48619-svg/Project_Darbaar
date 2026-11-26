"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Mail,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  RotateCw,
  ArrowLeft,
} from "lucide-react";
import { darbaarApi } from "@/lib/api";
import { useDarbaar } from "@/features/context/DarbaarContext";

export default function RegisterPage() {
  const router = useRouter();
  const { loginUser } = useDarbaar();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Flow control: "form" -> "otp" -> success
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Resend Countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Step 1: Submit Registration Form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please create a confidential password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters in length.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please ensure both fields are identical.");
      return;
    }

    try {
      setLoading(true);
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || fullName.trim();
      const lastName = nameParts.slice(1).join(" ") || firstName;
      const targetEmail = email.trim().toLowerCase();

      const res = await darbaarApi.auth.register({
        fullName: fullName.trim(),
        firstName,
        lastName,
        email: targetEmail,
        phone: phone.trim() || undefined,
        password,
        role: "client",
      });

      // Check if backend requires OTP verification
      if (res.requiresOtp || (!res.token && res.success)) {
        setOtpEmail(targetEmail);
        setStep("otp");
        setResendCountdown(60);
      } else if (res.success && res.token && res.user) {
        // Direct auto-login fallback
        loginUser(res.token, res.user);
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1800);
      } else {
        const detailMsg = (res as any).details?.map((d: any) => d.message).join(". ");
        setError(detailMsg || res.error || "Unable to create account. Please verify your details.");
      }
    } catch (err: any) {
      // If unverified account already exists, prompt OTP verification
      if (err.requiresOtp || err.data?.requiresOtp) {
        setOtpEmail(email.trim().toLowerCase());
        setStep("otp");
        setResendCountdown(60);
      } else {
        setError(
          err.message ||
            "Registration encountered an issue. If this email is already registered, please sign in."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify 6-digit OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");

    const cleanOtp = otp.trim().replace(/\D/g, "");
    if (cleanOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code dispatched to your email.");
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
          router.push("/dashboard");
        }, 1800);
      } else {
        setError(res.error || "Verification failed. Please check the code and try again.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid or expired verification passkey. Please request a new one.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
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
      setError(err.message || "Unable to resend passkey at this moment. Please wait a minute.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#F7F5F0] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white border border-[#E5E5EA] shadow-2xl p-6 sm:p-10 space-y-6 rounded-xs relative">
        {/* Subtle royal gold corners */}
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
              {step === "otp" ? "Verify Email Passkey" : "Create Your Collector Account"}
            </h1>
            <p className="text-xs text-[#686868] mt-1">
              {step === "otp"
                ? `A confidential 6-digit code was dispatched to ${otpEmail}`
                : "Register for verified provenance records and confidential acquisition mandates"}
            </p>
          </div>
        </div>

        {/* Success Screen */}
        {success ? (
          <div className="py-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 p-6 rounded-sm">
            <CheckCircle2 className="w-14 h-14 text-emerald-700 mx-auto animate-bounce" />
            <h2 className="text-xl font-serif text-emerald-900 font-semibold">
              Account Activated & Verified
            </h2>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
              Welcome, <strong>{fullName || "Collector"}</strong>. Your email has been authenticated and your collector profile has been inscribed into the DARBAAR vault.
              Redirecting to your portfolio...
            </p>
            <div className="pt-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
              >
                Go to Dashboard Now →
              </button>
            </div>
          </div>
        ) : step === "otp" ? (
          /* STEP 2: OTP VERIFICATION FORM */
          <div className="space-y-5">
            {/* Error Notification */}
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xs flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Resend Success Notification */}
            {resendMessage && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="font-medium">{resendMessage}</p>
              </div>
            )}

            <div className="bg-[#F7F5F0] border border-[#E5E5EA] p-4 text-center rounded-xs space-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#263A31] text-[#C4AC79] mb-1">
                <KeyRound className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#111111]">
                Check Your Inbox
              </p>
              <p className="text-[11px] text-[#686868] break-all">
                We sent a 6-digit one-time passkey to <strong className="text-[#263A31]">{otpEmail}</strong>.
                Valid for 10 minutes.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111111] flex items-center justify-between">
                  <span>Enter 6-Digit Code</span>
                  <span className="text-[10px] text-[#A68A55] font-mono">NUMERIC PASSKEY</span>
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
                <span>{loading ? "Verifying Passkey..." : "Verify Passkey & Activate"}</span>
                <ArrowRight className="w-4 h-4 text-[#C4AC79]" />
              </button>
            </form>

            {/* Resend and Edit Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-[#686868] gap-3 border-t border-[#E5E5EA]">
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setError("");
                  setResendMessage("");
                }}
                className="inline-flex items-center text-[#263A31] hover:underline space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Details / Change Email</span>
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
          /* STEP 1: REGISTRATION FORM */
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {/* Error Notification */}
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xs flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium">{error}</p>
                  {error.toLowerCase().includes("already registered") && (
                    <Link
                      href="/login"
                      className="inline-block text-[11px] text-[#263A31] font-semibold underline underline-offset-2"
                    >
                      Already have an account? Sign in here →
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] flex items-center justify-between">
                <span>1. Full Name *</span>
                <span className="text-[10px] text-[#686868] font-normal">Required</span>
              </label>
              <div className="flex items-center border border-[#E5E5EA] bg-white rounded-xs focus-within:border-[#A68A55] px-3 py-2.5 gap-3 transition-colors shadow-2xs">
                <User className="w-4 h-4 text-[#A68A55] flex-shrink-0" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Satyam Kumar or Lord Alistair Vance"
                  className="w-full bg-transparent text-sm text-[#111111] focus:outline-none placeholder:text-[#686868]/60 border-0 p-0 m-0"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] flex items-center justify-between">
                <span>2. Confidential Email Address *</span>
                <span className="text-[10px] text-[#A68A55] font-semibold">OTP Verification Required</span>
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

            {/* Mobile Number Field (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] flex items-center justify-between">
                <span>3. Direct Telephone / Mobile</span>
                <span className="text-[10px] text-[#686868] font-normal">(Optional)</span>
              </label>
              <div className="flex items-center border border-[#E5E5EA] bg-white rounded-xs focus-within:border-[#A68A55] px-3 py-2.5 gap-3 transition-colors shadow-2xs">
                <Phone className="w-4 h-4 text-[#A68A55] flex-shrink-0" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210 or +44 20 7946 0912"
                  className="w-full bg-transparent text-sm text-[#111111] focus:outline-none placeholder:text-[#686868]/60 border-0 p-0 m-0"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] flex items-center justify-between">
                <span>4. Create Confidential Password *</span>
                <span className="text-[10px] text-[#686868] font-normal">Minimum 6 characters</span>
              </label>
              <div className="flex items-center border border-[#E5E5EA] bg-white rounded-xs focus-within:border-[#A68A55] px-3 py-2.5 gap-3 transition-colors shadow-2xs">
                <Lock className="w-4 h-4 text-[#A68A55] flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create your confidential password"
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

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] flex items-center justify-between">
                <span>5. Confirm Confidential Password *</span>
                <span className="text-[10px] text-[#686868] font-normal">Must match above</span>
              </label>
              <div className="flex items-center border border-[#E5E5EA] bg-white rounded-xs focus-within:border-[#A68A55] px-3 py-2.5 gap-3 transition-colors shadow-2xs">
                <Lock className="w-4 h-4 text-[#A68A55] flex-shrink-0" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password to confirm"
                  className="w-full bg-transparent text-sm text-[#111111] focus:outline-none placeholder:text-[#686868]/60 border-0 p-0 m-0"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-[#686868] hover:text-[#111111] flex-shrink-0 p-1"
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-[11px] text-red-600 font-medium pt-0.5">
                  ⚠️ Passwords do not match. Please verify both entries.
                </p>
              )}
            </div>

            {/* Big Easy Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#263A31] text-white hover:bg-[#1B2A23] font-medium text-xs uppercase tracking-[0.2em] transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? "Dispatching Verification..." : "Continue to Verification"}</span>
                <ArrowRight className="w-4 h-4 text-[#C4AC79]" />
              </button>
            </div>

            {/* Link to Login */}
            <div className="pt-4 border-t border-[#E5E5EA] text-center">
              <p className="text-xs text-[#686868]">
                Already have a registered account?{" "}
                <Link
                  href="/login"
                  className="text-[#263A31] font-bold hover:underline ml-1 uppercase tracking-wider text-[11px]"
                >
                  Sign In Here →
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
