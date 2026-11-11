import { z } from "zod";

export const CreateAdvisorySchema = z.object({
  body: z.object({
    mandateType: z.string().optional().default("private-acquisition"),
    serviceType: z.string().optional(),
    departmentFocus: z.array(z.string()).optional().default(["general"]),
    clientName: z.string().optional(),
    fullName: z.string().optional(),
    clientEmail: z.string().optional(),
    email: z.string().optional(),
    clientPhone: z.string().optional(),
    phone: z.string().optional(),
    primarySalon: z.string().optional(),
    preferredSalon: z.string().optional(),
    budgetHorizon: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().default("USD"),
    }).optional(),
    specificMandateDetails: z.string().optional(),
    description: z.string().optional(),
  }),
});

