export type SupportedCurrency =
  | "USD"
  | "GBP"
  | "EUR"
  | "CHF"
  | "AED"
  | "INR"
  | "SGD"
  | "HKD";

export interface CurrencyMetadata {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  locale: string;
  flag: string;
}

export const CURRENCIES: Record<SupportedCurrency, CurrencyMetadata> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", flag: "🇺🇸" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB", flag: "🇬🇧" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE", flag: "🇪🇺" },
  CHF: { code: "CHF", symbol: "CHF ", name: "Swiss Franc", locale: "de-CH", flag: "🇨🇭" },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham", locale: "ar-AE", flag: "🇦🇪" },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN", flag: "🇮🇳" },
  SGD: { code: "SGD", symbol: "S$", name: "Singapore Dollar", locale: "en-SG", flag: "🇸🇬" },
  HKD: { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", locale: "zh-HK", flag: "🇭🇰" },
};

// Benchmark baseline exchange rates (updated dynamically via open live API)
export const DEFAULT_RATES: Record<SupportedCurrency, number> = {
  USD: 1.0,
  GBP: 0.79,
  EUR: 0.92,
  CHF: 0.88,
  AED: 3.67,
  INR: 85.80,
  SGD: 1.34,
  HKD: 7.78,
};

export interface ExchangeRatesState {
  base: string;
  rates: Record<SupportedCurrency, number>;
  lastUpdated: string;
  source: string;
}

export function formatCurrencyAmount(
  amountInUSD: number,
  currency: SupportedCurrency = "INR",
  rates: Record<SupportedCurrency, number> = DEFAULT_RATES
): string {
  if (typeof amountInUSD !== "number" || isNaN(amountInUSD) || amountInUSD <= 0) {
    return "Valuation Upon Request";
  }

  const rate = rates[currency] || DEFAULT_RATES[currency] || 1;
  const converted = Math.round(amountInUSD * rate);
  const meta = CURRENCIES[currency] || CURRENCIES.INR;

  try {
    return new Intl.NumberFormat(meta.locale || "en-IN", {
      style: "currency",
      currency: meta.code,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(converted);
  } catch {
    return `${meta.symbol}${converted.toLocaleString("en-IN")}`;
  }
}

export function formatPriceRange(
  minUSD: number,
  maxUSD: number,
  currency: SupportedCurrency = "INR",
  rates: Record<SupportedCurrency, number> = DEFAULT_RATES
): string {
  if (!minUSD && !maxUSD) return "Estimate Upon Private Consultation";
  const minFormatted = formatCurrencyAmount(minUSD || 0, currency, rates);
  const maxFormatted = formatCurrencyAmount(maxUSD || minUSD || 0, currency, rates);
  return `${minFormatted} – ${maxFormatted}`;
}

