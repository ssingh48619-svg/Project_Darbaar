import { z } from "zod";

export const CreateEnquirySchema = z.object({
  body: z.object({
    assetId: z.string().optional(),
    assetTitle: z.string().min(2, "Asset title is required"),
    department: z.enum(["fine-art", "timepieces", "collectibles", "advisory", "general"]),
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    representativeFirm: z.string().optional(),
    preferredContactMethod: z.enum(["email", "phone", "confidential-salon"]).optional(),
    salonCityPreference: z.enum(["Geneva", "London", "New York", "Singapore", "Mumbai"]).optional(),
    confidentialNotes: z.string().min(5, "Inquiry note must be at least 5 characters"),
  }),
});

