"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SupportedCurrency,
  DEFAULT_RATES,
  CURRENCIES,
  formatCurrencyAmount,
  formatPriceRange,
} from "@/lib/currency";
import { CuratedAsset } from "@/lib/types";
import { CURATED_ASSETS } from "@/lib/data";
import { darbaarApi } from "@/lib/api";

interface DarbaarContextType {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  rates: Record<SupportedCurrency, number>;
  ratesLastUpdated: string;
  ratesSource: string;
  formatAmount: (amountUSD: number) => string;
  formatRange: (minUSD: number, maxUSD: number) => string;
  // Live Curated Assets
  assets: CuratedAsset[];
  loadingAssets: boolean;
  refreshAssets: () => Promise<void>;
  // Theme: Light / Dark Mode
  theme: "light" | "dark";
  toggleTheme: () => void;
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
  // User Authentication Session
  currentUser: any | null;
  loadingAuth: boolean;
  loginUser: (token: string, user: any) => void;
  logoutUser: () => void;
  refreshCurrentUser: () => Promise<void>;
}

const DarbaarContext = createContext<DarbaarContextType | undefined>(undefined);

export function DarbaarProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>("INR");
  const [rates, setRates] = useState<Record<SupportedCurrency, number>>(DEFAULT_RATES);
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string>("Nov 2026 Live Interbank");
  const [ratesSource, setRatesSource] = useState<string>("Global Interbank Reference");

  // Load saved currency from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("darbaar_currency") as SupportedCurrency;
        if (saved && CURRENCIES[saved]) {
          setCurrencyState(saved);
        } else {
          // Default to INR for royal heritage Indian patrons
          setCurrencyState("INR");
        }
      }
    } catch {}
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("darbaar_currency", c);
      }
    } catch {}
  };

  const [specimenAsset, setSpecimenAsset] = useState<CuratedAsset | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryAsset, setInquiryAsset] = useState<CuratedAsset | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const refreshCurrentUser = async () => {
    try {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("darbaar_token");
      if (!token) {
        setCurrentUser(null);
        setLoadingAuth(false);
        return;
      }
      const cached = localStorage.getItem("darbaar_user");
      if (cached) {
        try {
          setCurrentUser(JSON.parse(cached));
        } catch {}
      }
      const res = await darbaarApi.auth.getMe(token);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem("darbaar_user", JSON.stringify(res.user));
      } else {
        localStorage.removeItem("darbaar_token");
        localStorage.removeItem("darbaar_user");
        setCurrentUser(null);
      }
    } catch {
      // Keep cached if offline
    } finally {
      setLoadingAuth(false);
    }
  };

  const loginUser = (token: string, user: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darbaar_token", token);
      localStorage.setItem("darbaar_user", JSON.stringify(user));
    }
    setCurrentUser(user);
  };

  const logoutUser = () => {
    try {
      darbaarApi.auth.logout().catch(() => {});
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("darbaar_token");
      localStorage.removeItem("darbaar_user");
    }
    setCurrentUser(null);
  };

  useEffect(() => {
    refreshCurrentUser();
  }, []);

  // Dynamic Live Assets from MongoDB Atlas (with baseline fallback)
  const [assets, setAssets] = useState<CuratedAsset[]>(CURATED_ASSETS);
  const [loadingAssets, setLoadingAssets] = useState(false);

  const refreshAssets = async () => {
    try {
      setLoadingAssets(true);
      const res = await darbaarApi.assets.list();
      if (res.success && Array.isArray(res.assets) && res.assets.length > 0) {
        const mapped: CuratedAsset[] = res.assets.map((item: any) => ({
          id: item._id || item.id,
          slug: item.slug || item.referenceNumber?.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: item.title,
          makerOrArtist: item.makerOrArtist,
          year: item.year,
          category: item.category,
          categoryLabel: item.categoryLabel || "Curated Asset",
          referenceNumber: item.referenceNumber,
          dimensionsOrSpecs: item.dimensionsOrSpecs || "",
          conditionSummary: item.conditionSummary || "",
          provenanceSummary: item.provenanceSummary || "",
          provenanceStatus: item.provenanceStatus || "Documented",
          valuationMinUSD: item.valuationMinUSD || 0,
          valuationMaxUSD: item.valuationMaxUSD || 0,
          isFeatured: item.isFeatured ?? true,
          isPrivateSale: item.isPrivateSale ?? false,
          isDemonstration: item.isDemonstration ?? true,
          image: item.image || item.galleryImages?.[0] || "",
          galleryImages: item.galleryImages?.length ? item.galleryImages : [item.image || ""],
          summary: item.summary || "",
          historicalContext: item.historicalContext || "",
          specimenDetails: item.specimenDetails || {
            conditionScorecard: {
              overallGrade: "Grade I — Imperial Standard",
              preservationScore: 95,
              caseOrSupport: "Verified museum conservation",
              dialOrSurface: "Original surface luminescence",
              movementOrStructure: "Period-authentic assembly",
              originalityRating: "100% Period-Correct Components",
              inspectionLocation: "Geneva Vault Inspection Facility",
            },
            provenanceTimeline: [],
            independentInspector: "DARBAAR Curatorial Directorate",
            inspectionDate: "Autumn 2026",
            dossierReference: `DARBAAR-REF-${item._id?.slice(-4) || "01"}`,
            availableReports: ["Archival Authentication Dossier"],
          },
        }));
        setAssets(mapped);
      }
    } catch (err: any) {
      console.warn("Using baseline curated inventory:", err.message);
    } finally {
      setLoadingAssets(false);
    }
  };

  useEffect(() => {
    refreshAssets();
  }, []);

  // Sync theme with localStorage & document element on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("darbaar_theme") as "light" | "dark" | null;
      if (savedTheme === "dark") {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Safe fallback if localStorage not accessible
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("darbaar_theme", nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch {
        // Safe fallback
      }
      return nextTheme;
    });
  };

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
        theme,
        toggleTheme,
        assets,
        loadingAssets,
        refreshAssets,
        currentUser,
        loadingAuth,
        loginUser,
        logoutUser,
        refreshCurrentUser,
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

