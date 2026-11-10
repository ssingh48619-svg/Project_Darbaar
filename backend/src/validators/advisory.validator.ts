import { z } from "zod";

export const CreateAdvisorySchema = z.object({
  body: z.object({
    mandateType: z.enum([
      "private-acquisition",
      "provenance-research",
      "independent-authentication",
      "collection-curation",
      "estate-succession",
    ]),
    departmentFocus: z.array(z.string()).min(1, "Select at least one department focus"),
    clientName: z.string().min(2, "Name is required"),
    clientEmail: z.string().email("Valid email required"),
    clientPhone: z.string().optional(),
    primarySalon: z.enum(["Geneva", "London", "New York", "Singapore", "Mumbai"]).optional(),
    budgetHorizon: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().default("USD"),
    }).optional(),
    specificMandateDetails: z.string().min(10, "Please provide mandate details"),
  }),
});
