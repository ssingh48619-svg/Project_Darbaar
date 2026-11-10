"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Globe, ChevronDown, Menu, X, Shield, Lock } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURRENCIES, SupportedCurrency } from "@/lib/currency";

export function Header() {
  const pathname = usePathname();
  const { currency, setCurrency, openSearch, openInquiryModal } = useDarbaar();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "The House", href: "/about" },
    { label: "Fine Art", href: "/fine-art" },
    { label: "Timepieces", href: "/timepieces" },
    { label: "Collectibles", href: "/collectibles" },
    { label: "Private Sales", href: "/private-sales" },
    { label: "Advisory", href: "/advisory" },
    { label: "Provenance", href: "/provenance" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-md border-b border-[#E5E5EA]">
      {/* 1. Top Utility Row: Discretion, Currency & Client Access */}
      <div className="bg-[#263A31] text-[#F7F5F0] text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Tagline */}
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.2em] uppercase text-[#EAE5DC]/90 font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4AC79]"></span>
            <span>Where Heritage Meets Rarity</span>
            <span className="text-[#A68A55]/40 hidden md:inline">•</span>
            <span className="text-[#C4AC79] hidden md:inline">Private Advisory & Curatorial House</span>
          </div>

          {/* Right Utilities: Currency, Search, Portal, Appointment */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] tracking-wider">
            {/* Currency Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1.5 text-[#EAE5DC] hover:text-white transition-colors"
                title="Select Valuation Currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#C4AC79]" />
                <span className="font-medium tracking-wide">{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#C4AC79]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5EA] shadow-xl py-2 z-50 rounded-xs text-[#111111]">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#686868] border-b border-[#E5E5EA]/60 font-medium">
                    Valuation Currency
                  </div>
                  {(Object.keys(CURRENCIES) as SupportedCurrency[]).map((currKey) => {
                    const meta = CURRENCIES[currKey];
                    const isSelected = currency === currKey;
                    return (
                      <button
                        key={currKey}
                        onClick={() => {
                          setCurrency(currKey);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F7F5F0] transition-colors ${
                          isSelected ? "bg-[#F7F5F0] text-[#111111] font-semibold" : "text-[#686868]"
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <span>{meta.flag}</span>
                          <span>{meta.code}</span>
                        </span>
                        <span className="text-[11px] text-[#A68A55]">{meta.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="text-[#EAE5DC] hover:text-white transition-colors flex items-center space-x-1"
              title="Search Curatorial Records"
            >
              <Search className="w-3.5 h-3.5 text-[#C4AC79]" />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Client Portal Link */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="text-[#EAE5DC] hover:text-white transition-colors flex items-center space-x-1"
                title="Client Portal & Private Vault"
              >
                <User className="w-3.5 h-3.5 text-[#C4AC79]" />
                <span className="hidden sm:inline">Client Vault</span>
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E5E5EA] shadow-xl py-2 z-50 rounded-xs text-[#111111]">
                  <div className="px-4 py-1.5 border-b border-[#E5E5EA] text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                    Private Client Portals
                  </div>
                  <Link
                    href="/login"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-[#111111] hover:bg-[#F7F5F0] hover:text-[#A68A55] transition-colors"
                  >
                    Sign In to Vault
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-[#111111] hover:bg-[#F7F5F0] hover:text-[#A68A55] transition-colors"
                  >
                    Apply for Private Admission
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-[#111111] hover:bg-[#F7F5F0] hover:text-[#A68A55] transition-colors border-t border-[#E5E5EA]/60"
                  >
                    My Collection Portfolio
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-[11px] text-[#686868] hover:bg-[#F7F5F0] hover:text-[#111111] transition-colors"
                  >
                    Curatorial Control Desk
                  </Link>
                </div>
              )}
            </div>

            {/* Private Appointment CTA */}
            <button
              onClick={() => openInquiryModal()}
              className="text-[#C4AC79] hover:text-white transition-colors flex items-center gap-1 font-medium underline underline-offset-4 decoration-[#A68A55]/60"
            >
              <Shield className="w-3 h-3" />
              <span>Private Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Editorial Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-22 gap-6">
          {/* Left: Brand Crest & Typography */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex flex-col items-start">
              <span className="text-2xl sm:text-3xl font-serif tracking-[0.24em] text-[#111111] font-normal group-hover:text-[#A68A55] transition-colors uppercase">
                DARBAAR
              </span>
              <span className="text-[9px] tracking-[0.32em] text-[#686868] uppercase font-light -mt-0.5">
                Where Heritage Meets Rarity
              </span>
            </Link>
          </div>

          {/* Center-Right: Editorial Navigation Links (Single line, whitespace-nowrap, zero overlap) */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8 flex-shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] 2xl:text-xs uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-200 py-1 border-b-2 ${
                    isActive
                      ? "text-[#111111] border-[#A68A55] font-semibold"
                      : "text-[#686868] border-transparent hover:text-[#111111] hover:border-[#E5E5EA]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Request Private Advisory Button */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => openInquiryModal()}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] border border-[#263A31] transition-all shadow-xs whitespace-nowrap"
            >
              Private Advisory
            </button>

            {/* Mobile / Tablet Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#111111] hover:text-[#A68A55] transition-colors focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E5E5EA] bg-[#F7F5F0] px-6 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.16em] text-[#111111] hover:text-[#A68A55] py-2 border-b border-[#E5E5EA]/60 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-[#686868] border-t border-[#E5E5EA] pt-3">
              <span>Valuation Currency:</span>
              <span className="font-semibold text-[#111111]">{currency}</span>
            </div>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-wider text-[#686868] flex items-center space-x-2 py-1"
            >
              <User className="w-4 h-4 text-[#A68A55]" />
              <span>Client Vault & Collection</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiryModal();
              }}
              className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] transition-colors"
            >
              Request Private Advisory
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
