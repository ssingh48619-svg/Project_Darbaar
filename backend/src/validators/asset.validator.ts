import { z } from "zod";

export const CreateAssetSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    subtitle: z.string().optional(),
    department: z.enum(["fine-art", "timepieces", "collectibles"]),
    category: z.string().min(2, "Category is required"),
    artistOrMaker: z.string().optional(),
    origin: z.string().optional(),
    year: z.number().optional(),
    period: z.string().optional(),
    medium: z.string().optional(),
    indicativeValuation: z.object({
      min: z.number().positive(),
      max: z.number().positive(),
      currency: z.string().default("USD"),
    }),
    curatorialStatus: z.enum(["curated", "review", "archived"]).optional(),
    availability: z.enum(["private-treaty", "reserved", "transferred", "archival-only"]).optional(),
    provenanceStatus: z.enum(["verified", "archived", "under-review"]).optional(),
    provenanceSummary: z.string().optional(),
    conditionScore: z.number().min(0).max(100).optional(),
    conditionSummary: z.string().optional(),
    images: z.array(
      z.object({
        url: z.string().url(),
        caption: z.string().optional(),
        isPrimary: z.boolean().optional(),
      })
    ).optional(),
    salonLocation: z.enum(["Geneva", "London", "New York", "Singapore", "Mumbai"]).optional(),
  }),
});

