import {z} from "zod"

export const zSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be at most 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),


    otp: z
      .string()
      .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
    
})