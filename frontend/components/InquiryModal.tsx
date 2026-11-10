"use client";

import React, { useState } from "react";
import { X, Shield, Lock, CheckCircle2, Send, ArrowRight } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";

export function InquiryModal() {
  const { inquiryOpen, inquiryAsset, closeInquiryModal } = useDarbaar();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredSalon, setPreferredSalon] = useState("Geneva");
  const [inquiryType, setInquiryType] = useState("Acquisition");
  const [message, setMessage] = useState("");
  const [ndaAgreed, setNdaAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!inquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage("Please provide your full name and confidential email address.");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    // Simulate luxury advisory intake (later connected to backend /api/enquiries)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setEmail("");
    setMessage("");
    closeInquiryModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E5EA] shadow-2xl my-8 overflow-hidden rounded-sm flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5EA] bg-[#F7F5F0]">
          <div className="flex items-center space-x-2 text-[#263A31]">
            <Shield className="w-4 h-4 text-[#A68A55]" />
            <span className="text-xs uppercase tracking-[0.22em] font-medium">
              DARBAAR Private Advisory Desk
            </span>
          </div>
          <button
            onClick={closeInquiryModal}
            className="p-1.5 text-[#686868] hover:text-[#111111] transition-colors rounded-full hover:bg-[#EAE5DC]"
            aria-label="Close Inquiry Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#263A31]/10 text-[#263A31] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#263A31]" />
              </div>
              <h3 className="text-2xl font-serif text-[#111111]">
                Your Confidential Inquiry Has Been Transmitted
              </h3>
              <p className="text-xs text-[#686868] max-w-md mx-auto leading-relaxed">
                Thank you, {fullName}. A Senior Advisory Specialist will review your request under strict confidentiality protocols and contact you within 24 hours at <strong className="text-[#111111]">{email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#111111]">
                  Initiate Private Acquisition or Advisory Consultation
                </h3>
                <p className="text-xs text-[#686868] font-light mt-1">
                  All correspondence is conducted with utmost discretion and governed by strict privacy covenants.
                </p>
              </div>

              {/* Prefilled Asset Reference Notice if applicable */}
              {inquiryAsset && (
                <div className="p-3 bg-[#F7F5F0] border border-[#E5E5EA] text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#A68A55] block font-medium">
                    Subject Asset:
                  </span>
                  <div className="font-serif text-[#111111] text-sm mt-0.5">
                    {inquiryAsset.title} — {inquiryAsset.makerOrArtist} ({inquiryAsset.year})
                  </div>
                  <span className="text-[11px] text-[#686868]">
                    Ref: {inquiryAsset.referenceNumber}
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Lord Alistair Vance"
                    className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@privateoffice.com"
                    className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    Telephone (with Country Code)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0912"
                    className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    Target Appointment Corridor
                  </label>
                  <select
                    value={preferredSalon}
                    onChange={(e) => setPreferredSalon(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                  >
                    <option value="Geneva">Geneva (Freeport & Vault Services)</option>
                    <option value="London">London (Mayfair Advisory Liaison)</option>
                    <option value="New York">New York (Americas Salon)</option>
                    <option value="Singapore">Singapore (Asia-Pacific Salon)</option>
                    <option value="Mumbai">Mumbai (Palace Heritage Desk)</option>
                    <option value="Dubai">Dubai (Middle East Liaison)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                  Nature of Engagement
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Acquisition",
                    "Advisory Consultation",
                    "Private Viewing",
                    "Consignment",
                    "Valuation Coordination",
                    "Provenance Research",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      className={`px-3 py-2 text-[11px] border text-left transition-colors ${
                        inquiryType === type
                          ? "border-[#263A31] bg-[#263A31] text-white font-medium"
                          : "border-[#E5E5EA] bg-[#F7F5F0] text-[#686868] hover:border-[#A68A55]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                  Confidential Message & Requirements
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify specific reference numbers, budget thresholds, or particular provenance interests..."
                  className="w-full px-3 py-2 text-xs border border-[#E5E5EA] focus:border-[#A68A55] focus:outline-none bg-white text-[#111111]"
                ></textarea>
              </div>

              {/* Discretion Agreement */}
              <div className="flex items-start space-x-2.5 pt-1">
                <input
                  type="checkbox"
                  id="ndaCheckbox"
                  checked={ndaAgreed}
                  onChange={(e) => setNdaAgreed(e.target.checked)}
                  className="mt-1 accent-[#263A31]"
                />
                <label htmlFor="ndaCheckbox" className="text-[11px] text-[#686868] font-light leading-snug">
                  I understand that DARBAAR operates under strict confidential advisory protocols. Information exchanged is treated with rigorous discretion and will never be shared with unverified third parties.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !ndaAgreed}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Encrypting & Transmitting...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#C4AC79]" />
                      <span>Transmit Confidential Request</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
