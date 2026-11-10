"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Globe, ChevronDown, Menu, X, Shield, Sparkles } from "lucide-react";
import { useDarbaar } from "@/features/context/DarbaarContext";
import { CURRENCIES, SupportedCurrency } from "@/lib/currency";

export function Header() {
  const pathname = usePathname();
  const { currency, setCurrency, openSearch, openInquiryModal } = useDarbaar();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E5EA]">
      {/* 1. Utility Top Bar */}
      <div className="bg-[#263A31] text-[#F7F5F0] text-xs py-2 px-4 md:px-8 border-b border-[#1B2A23]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Tagline & Ethos */}
          <div className="flex items-center space-x-2 text-[11px] tracking-widest uppercase text-[#EAE5DC]/90 font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4AC79]"></span>
            <span>Where Heritage Meets Rarity</span>
            <span className="text-[#A68A55]/50 hidden sm:inline">•</span>
            <span className="text-[#C4AC79] hidden sm:inline">Private Advisory & Curatorial House</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] tracking-wider">
            <button
              onClick={() => openInquiryModal()}
              className="text-[#C4AC79] hover:text-white transition-colors flex items-center gap-1.5 font-medium underline underline-offset-4 decoration-[#A68A55]/50"
            >
              <Shield className="w-3 h-3" />
              <span>Private Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Left: Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:text-[#A68A55] transition-colors focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Center-Left: Prestigious DARBAAR Brand Mark */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="group flex flex-col items-center sm:items-start">
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-serif tracking-[0.22em] text-[#111111] font-normal group-hover:text-[#A68A55] transition-colors uppercase">
                  DARBAAR
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#A68A55]"></span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-[#686868] uppercase font-light -mt-0.5">
                Where Heritage Meets Rarity
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.18em] transition-all duration-200 py-1 border-b-2 ${
                    isActive
                      ? "text-[#111111] border-[#A68A55] font-medium"
                      : "text-[#686868] border-transparent hover:text-[#111111] hover:border-[#E5E5EA]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1.5 text-xs text-[#111111] hover:text-[#A68A55] px-2.5 py-1.5 rounded border border-[#E5E5EA] bg-[#F7F5F0]/60 transition-colors"
                title="Select Valuation Currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#A68A55]" />
                <span className="font-medium tracking-wide">{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#686868]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5EA] shadow-xl py-2 z-50 rounded-sm">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#686868] border-b border-[#E5E5EA]/60 font-medium">
                    Select Currency
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
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7F5F0] transition-colors ${
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

            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="p-2 text-[#111111] hover:text-[#A68A55] transition-colors rounded-full hover:bg-[#F7F5F0]"
              aria-label="Search Catalogue"
              title="Search Fine Art, Timepieces, Collectibles"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="p-2 text-[#111111] hover:text-[#A68A55] transition-colors rounded-full hover:bg-[#F7F5F0]"
                aria-label="Client Portal"
                title="Client Portal & Private Collection"
              >
                <User className="w-4 h-4" />
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E5EA] shadow-xl py-2 z-50 rounded-xs">
                  <div className="px-4 py-2 border-b border-[#E5E5EA] text-[10px] uppercase tracking-wider text-[#A68A55] font-semibold">
                    Client & Advisory Portals
                  </div>
                  <Link
                    href="/login"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-[#111111] hover:bg-[#F7F5F0] hover:text-[#A68A55] transition-colors"
                  >
                    Sign In to Private Vault
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

            {/* Private Inquiry CTA */}
            <button
              type="button"
              onClick={() => openInquiryModal()}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium text-white bg-[#263A31] hover:bg-[#1B2A23] border border-[#263A31] transition-all duration-300 shadow-sm hover:shadow"
            >
              Private Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5EA] bg-[#F7F5F0] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider text-[#111111] hover:text-[#A68A55] py-2 border-b border-[#E5E5EA]/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col space-y-3">
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

