import { z } from "zod";

export const CreateEnquirySchema = z.object({
  body: z.object({
    assetId: z.string().optional(),
    assetTitle: z.string().optional().default("Curatorial Portfolio Inquiry"),
    department: z.string().optional().default("advisory"),
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    preferredSalon: z.string().optional(),
    salonCityPreference: z.string().optional(),
    inquiryType: z.string().optional(),
    representativeFirm: z.string().optional(),
    preferredContactMethod: z.string().optional(),
    message: z.string().optional(),
    confidentialNotes: z.string().optional(),
    confidentialityAgreed: z.boolean().optional(),
  }),
});

