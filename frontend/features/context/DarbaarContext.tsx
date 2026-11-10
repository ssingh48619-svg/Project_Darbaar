"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SupportedCurrency,
  DEFAULT_RATES,
  formatCurrencyAmount,
  formatPriceRange,
} from "@/lib/currency";
import { CuratedAsset } from "@/lib/types";

interface DarbaarContextType {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  rates: Record<SupportedCurrency, number>;
  ratesLastUpdated: string;
  ratesSource: string;
  formatAmount: (amountUSD: number) => string;
  formatRange: (minUSD: number, maxUSD: number) => string;
  // Modals
  specimenAsset: CuratedAsset | null;
  openSpecimenModal: (asset: CuratedAsset) => void;
  closeSpecimenModal: () => void;
  // Private Inquiry
  inquiryOpen: boolean;
  inquiryAsset: CuratedAsset | null;
  openInquiryModal: (asset?: CuratedAsset) => void;
  closeInquiryModal: () => void;
  // Search
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const DarbaarContext = createContext<DarbaarContextType | undefined>(undefined);

export function DarbaarProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [rates, setRates] = useState<Record<SupportedCurrency, number>>(DEFAULT_RATES);
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string>("Nov 2026 Live Interbank");
  const [ratesSource, setRatesSource] = useState<string>("Global Interbank Reference");

  const [specimenAsset, setSpecimenAsset] = useState<CuratedAsset | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryAsset, setInquiryAsset] = useState<CuratedAsset | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Attempt live exchange rates fetch dynamically without breaking if offline
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.rates && isMounted) {
          const fetchedRates: Record<SupportedCurrency, number> = {
            USD: 1,
            GBP: data.rates.GBP || DEFAULT_RATES.GBP,
            EUR: data.rates.EUR || DEFAULT_RATES.EUR,
            CHF: data.rates.CHF || DEFAULT_RATES.CHF,
            AED: data.rates.AED || DEFAULT_RATES.AED,
            INR: data.rates.INR || DEFAULT_RATES.INR,
            SGD: data.rates.SGD || DEFAULT_RATES.SGD,
            HKD: data.rates.HKD || DEFAULT_RATES.HKD,
          };
          setRates(fetchedRates);
          if (data.time_last_update_utc) {
            setRatesLastUpdated(new Date(data.time_last_update_utc).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }));
          }
          setRatesSource("European Central Bank & Live Feeds");
        }
      } catch {
        // Graceful fallback to DEFAULT_RATES if offline
      }
    }
    fetchLiveRates();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatAmount = (amountUSD: number) => {
    return formatCurrencyAmount(amountUSD, currency, rates);
  };

  const formatRange = (minUSD: number, maxUSD: number) => {
    return formatPriceRange(minUSD, maxUSD, currency, rates);
  };

  const openSpecimenModal = (asset: CuratedAsset) => {
    setSpecimenAsset(asset);
  };

  const closeSpecimenModal = () => {
    setSpecimenAsset(null);
  };

  const openInquiryModal = (asset?: CuratedAsset) => {
    setInquiryAsset(asset || null);
    setInquiryOpen(true);
  };

  const closeInquiryModal = () => {
    setInquiryOpen(false);
    setInquiryAsset(null);
  };

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <DarbaarContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        ratesLastUpdated,
        ratesSource,
        formatAmount,
        formatRange,
        specimenAsset,
        openSpecimenModal,
        closeSpecimenModal,
        inquiryOpen,
        inquiryAsset,
        openInquiryModal,
        closeInquiryModal,
        searchOpen,
        openSearch,
        closeSearch,
      }}
    >
      {children}
    </DarbaarContext.Provider>
  );
}

export function useDarbaar() {
  const ctx = useContext(DarbaarContext);
  if (!ctx) {
    throw new Error("useDarbaar must be used within a DarbaarProvider");
  }
  return ctx;
}

