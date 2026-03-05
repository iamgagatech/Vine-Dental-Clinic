// =============================================================================
// VINE DENTAL CLINIC — Zod Validation Schemas
// Runtime validation for all user-submitted data.
// =============================================================================

import { z } from "zod";

// ─── Phone Validators ─────────────────────────────────────────────────────────

/**
 * Validates Nigerian phone numbers.
 * Accepts formats:
 *   +2348023657067
 *   2348023657067
 *   08023657067
 *   8023657067
 *
 * Normalises to international format: +234XXXXXXXXXX
 */
export const nigerianPhoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .transform((val) => val.replace(/\s+/g, "").replace(/-/g, ""))
  .refine(
    (val) => {
      // Strip leading + for length check
      const digits = val.startsWith("+") ? val.slice(1) : val;
      // Must be 10-13 digits after stripping
      return /^\d{10,13}$/.test(digits);
    },
    { message: "Enter a valid Nigerian phone number" }
  )
  .transform((val): string => {
    // Normalise to +234XXXXXXXXXX
    if (val.startsWith("+234")) return val;
    if (val.startsWith("234")) return `+${val}`;
    if (val.startsWith("0")) return `+234${val.slice(1)}`;
    return `+234${val}`;
  });

/**
 * Type-safe phone validator utility.
 * Returns { success, data, error } — use in forms & API handlers.
 */
export function validateNigerianPhone(phone: string): {
  success: boolean;
  normalised?: string;
  error?: string;
} {
  const result = nigerianPhoneSchema.safeParse(phone);
  if (result.success) {
    return { success: true, normalised: result.data };
  }
  return {
    success: false,
    error: result.error.issues[0]?.message ?? "Invalid phone number",
  };
}

// ─── Booking Schema ───────────────────────────────────────────────────────────

/**
 * Validates booking form data before submission.
 * Used on both client (live validation) and server (API handler).
 */
export const bookingSchema = z.object({
  patientName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),

  patientEmail: z
    .string()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),

  patientPhone: nigerianPhoneSchema,

  serviceId: z
    .string()
    .min(1, "Please select a service"),

  preferredDate: z
    .string()
    .min(1, "Please choose an appointment date")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Appointment date cannot be in the past")
    .refine((val) => {
      // Clinic is closed on Sundays
      const day = new Date(val).getDay();
      return day !== 0;
    }, "We are closed on Sundays. Please choose another day.")
    .refine((val) => {
      // Max 60 days ahead (APP_CONFIG.maxBookingDaysAhead)
      const date = new Date(val);
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 60);
      return date <= maxDate;
    }, "You can only book up to 60 days in advance"),

  preferredTime: z
    .string()
    .min(1, "Please select a preferred time")
    .regex(/^\d{2}:\d{2}$/, "Invalid time format"),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),

  paymentMethod: z.enum(["paystack", "cash", "hmo", "transfer"], {
    error: "Please select a payment method",
  }),

  consentGiven: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and privacy policy to proceed",
    }),
});

export type BookingSchemaInput = z.input<typeof bookingSchema>;
export type BookingSchemaOutput = z.output<typeof bookingSchema>;

// ─── Contact Schema ───────────────────────────────────────────────────────────

/**
 * Validates the contact/enquiry form.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),

  email: z
    .string()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),

  phone: nigerianPhoneSchema.optional().or(z.literal("")),

  subject: z
    .string()
    .min(1, "Please enter a subject")
    .max(150, "Subject is too long"),

  message: z
    .string()
    .min(10, "Message is too short — please provide more detail")
    .max(2000, "Message cannot exceed 2000 characters"),

  /** Optional: which service they're enquiring about */
  serviceId: z.string().optional(),

  consentGiven: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the privacy policy to send your message",
    }),
});

export type ContactSchemaInput = z.input<typeof contactSchema>;
export type ContactSchemaOutput = z.output<typeof contactSchema>;

// ─── Newsletter Schema ────────────────────────────────────────────────────────

/**
 * Minimal newsletter signup validation.
 * TODO: Wire to Mailchimp / ConvertKit API.
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  name: z
    .string()
    .min(1, "Your name is required")
    .max(80, "Name is too long")
    .optional(),
});

export type NewsletterSchemaInput = z.input<typeof newsletterSchema>;

// ─── Schema Utilities ─────────────────────────────────────────────────────────

/**
 * Extract the first error message per field from a ZodError.
 * Returns a flat Record<fieldName, errorMessage> for form state.
 *
 * @example
 * const errors = extractZodErrors(result.error);
 * // { patientName: "Please enter your full name", patientPhone: "Enter a valid Nigerian phone number" }
 */
export function extractZodErrors(
  error: z.ZodError
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (path && !fieldErrors[path]) {
      fieldErrors[path] = issue.message;
    }
  }
  return fieldErrors;
}
