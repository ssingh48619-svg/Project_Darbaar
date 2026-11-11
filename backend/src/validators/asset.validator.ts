import { z } from "zod";

export const CreateAssetSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().optional(),
    makerOrArtist: z.string().min(2, "Maker or artist is required"),
    year: z.string().optional(),
    category: z.enum(["fine-art", "timepieces", "collectibles", "private-sales"]),
    categoryLabel: z.string().optional(),
    referenceNumber: z.string().min(2, "Reference number is required"),
    dimensionsOrSpecs: z.string().optional(),
    conditionSummary: z.string().optional(),
    provenanceSummary: z.string().optional(),
    provenanceStatus: z.enum(["Documented", "Private Estate", "Archival Verified", "Palace Heritage"]).optional(),
    valuationMinUSD: z.number().nonnegative(),
    valuationMaxUSD: z.number().nonnegative(),
    isFeatured: z.boolean().optional(),
    isPrivateSale: z.boolean().optional(),
    isDemonstration: z.boolean().optional(),
    image: z.string().url("Valid image URL required"),
    galleryImages: z.array(z.string()).optional(),
    summary: z.string().optional(),
    historicalContext: z.string().optional(),
    specimenDetails: z.any().optional(),
  }),
});
