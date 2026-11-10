export type AssetCategory =
  | "fine-art"
  | "timepieces"
  | "collectibles"
  | "private-sales";

export interface ConditionScorecard {
  overallGrade: string; // e.g. "Grade I — Exceptional"
  preservationScore: number; // e.g. 98 out of 100
  caseOrSupport: string; // e.g. "Flawless unpolished edges, crisp hallmarks"
  dialOrSurface: string; // e.g. "Original enamel dial, no hairline cracks, luminous patina"
  movementOrStructure: string; // e.g. "Original cal. 27-460 Q, amplitude 295°, ±2s/day"
  originalityRating: string; // e.g. "100% Period-Correct Components"
  inspectionLocation: string; // e.g. "Freeport Geneva Vault Inspection Facility"
}

export interface ProvenanceEvent {
  year: string;
  location: string;
  description: string;
  documentationType: string;
  isVerified: boolean;
}

export interface CuratedAsset {
  id: string;
  slug: string;
  title: string;
  makerOrArtist: string;
  year: number | string;
  category: AssetCategory;
  categoryLabel: string;
  referenceNumber: string;
  dimensionsOrSpecs: string;
  conditionSummary: string;
  provenanceSummary: string;
  provenanceStatus: "Documented" | "Private Estate" | "Archival Verified" | "Palace Heritage";
  valuationMinUSD: number;
  valuationMaxUSD: number;
  isPrivateSale?: boolean;
  isFeatured?: boolean;
  isDemonstration: boolean;
  image: string;
  galleryImages: string[];
  summary: string;
  historicalContext: string;
  specimenDetails: {
    conditionScorecard: ConditionScorecard;
    provenanceTimeline: ProvenanceEvent[];
    independentInspector: string;
    inspectionDate: string;
    dossierReference: string;
    availableReports: string[];
  };
}

export interface AdvisoryInquiry {
  assetId?: string;
  assetTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  preferredSalon: "Geneva" | "London" | "New York" | "Singapore" | "Mumbai" | "Dubai";
  inquiryType: "Acquisition" | "Advisory Consultation" | "Private Viewing" | "Consignment" | "Valuation Request";
  message: string;
  confidentialityAgreed: boolean;
}
