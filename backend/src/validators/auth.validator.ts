import { z } from "zod";

export const RegisterSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name must have at least 2 characters").optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    role: z.enum(["client", "dealer", "advisor", "admin"]).optional(),
    preferredCurrency: z.string().optional(),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

