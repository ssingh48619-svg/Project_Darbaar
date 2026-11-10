import { z } from "zod";

export const RegisterSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, "First name must have at least 2 characters"),
    lastName: z.string().min(2, "Last name must have at least 2 characters"),
    email: z.string().email("Invalid email address format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().optional(),
    role: z.enum(["client", "dealer", "advisor", "admin"]).optional(),
    preferredCurrency: z.enum(["USD", "EUR", "GBP", "CHF", "AED", "INR"]).optional(),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});
