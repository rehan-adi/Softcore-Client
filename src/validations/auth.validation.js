import { z } from "zod";

export const SignupValidation = z.object({
  username: z.string()
    .min(2, "Username must be at least 2 characters")
    .max(10, "Username must be at most 10 characters"),
  fullname: z.string()
    .min(2, "Full Name must be at least 2 characters")
    .max(20, "Full Name must be at most 20 characters"),
  email: z.string()
    .email("Invalid email address")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z.string()
    .min(1, "Password must be needed")
    .max(6, "Password must be at most 6 characters"),
});

export const SigninValidation = z.object({
  email: z.string()
    .email("Invalid email address")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z.string()
    .min(1, "Password must be needed")
    .max(6, "Password must be at most 6 characters"),
});
