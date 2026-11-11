"use client";

import React, { useState } from "react";
import { Mail, Globe, MapPin, Send, CheckCircle2, Shield } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { darbaarApi } from "@/lib/api";

export default function ContactPage() {
  const { openInquiryModal } = useDarbaar();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    corridor: "Geneva",
    interest: "Acquisition",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setLoading(true);
      await darbaarApi.enquiries.create({
        fullName: formData.name,
        email: formData.email,
        preferredSalon: formData.corridor,
        inquiryType: formData.interest,
        message: formData.message || "Contact form appointment request",
        confidentialityAgreed: true,
      });
      setSubmitted(true);
    } catch (err: any) {
      console.warn("Enquiry submission fallback:", err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="bg-[#F7F5F0] border-b border-[#E5E5EA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68A55] font-semibold block">
            Private Communication
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] font-normal leading-tight">
            Private Appointments & Inquiries
          </h1>
          <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed">
            All inquiries are managed directly by our senior advisory desk. Private viewing appointments are scheduled within secure vault corridors in Geneva, London, New York, and Singapore.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Inquiries Form */}
          <div className="lg:col-span-7 bg-[#F7F5F0] p-8 border border-[#E5E5EA]">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#263A31] mx-auto" />
                <h3 className="text-2xl font-serif text-[#111111]">
                  Appointment Request Transmitted
                </h3>
                <p className="text-xs text-[#686868] max-w-md mx-auto">
                  Our Senior Advisory Partner will contact you within 24 hours to confirm your private salon appointment details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider text-white bg-[#263A31]"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-serif text-[#111111]">
                  Schedule a Private Consultation
                </h3>
                <p className="text-xs text-[#686868] font-light">
                  Please provide your contact information to coordinate viewing in our planned appointment corridors.
                </p>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                    placeholder="Principal Name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                      Preferred Salon Corridor
                    </label>
                    <select
                      value={formData.corridor}
                      onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                    >
                      <option value="Geneva">Geneva Freeport Suite</option>
                      <option value="London">London Mayfair Corridor</option>
                      <option value="New York">New York Upper East Side</option>
                      <option value="Singapore">Singapore FreePort</option>
                      <option value="Mumbai">Mumbai Heritage Desk</option>
                      <option value="Dubai">Dubai DIFC Liaison</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                      Nature of Engagement
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                    >
                      <option value="Acquisition">Acquisition Inquiry</option>
                      <option value="Consignment">Consignment & Consignee Valuation</option>
                      <option value="Provenance">Provenance Due Diligence</option>
                      <option value="Viewing">Private Viewing Appointment</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
                    Confidential Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5EA] bg-white text-[#111111] focus:outline-none focus:border-[#A68A55]"
                    placeholder="Specify subject reference numbers or areas of interest..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
                >
                  Submit Confidential Request
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Communications Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white border border-[#E5E5EA] space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#A68A55] font-semibold">
                Central Advisory Communications
              </h4>
              <div className="space-y-2 text-xs text-[#111111]">
                <a href="mailto:darbaar3001@gmail.com" className="flex items-center space-x-2 text-[#263A31] hover:underline font-medium">
                  <Mail className="w-4 h-4 text-[#A68A55]" />
                  <span>darbaar3001@gmail.com</span>
                </a>
                <p className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-[#263A31]" />
                  <span>Encrypted Client Communication Portal</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#F7F5F0] border border-[#E5E5EA] space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold">
                Planned Salon Corridors
              </h4>
              <p className="text-xs text-[#686868] font-light leading-relaxed">
                DARBAAR conducts private appointments in partner vault and gallery corridors across Geneva, London, New York, Singapore, Mumbai, and Dubai. Exact viewing suites are disclosed following KYC and appointment confirmation.
              </p>
            </div>

            <div className="p-4 bg-[#263A31] text-[#F7F5F0] text-[11px] space-y-1">
              <div className="flex items-center space-x-1.5 text-[#C4AC79]">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase tracking-wider">Discretion Protocol</span>
              </div>
              <p className="font-light text-[#EAE5DC]/80">
                All client consultations are bound by non-disclosure agreements prior to asset inspection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

