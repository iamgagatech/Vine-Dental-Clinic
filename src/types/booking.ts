// =============================================================================
// VINE DENTAL CLINIC — Booking Types
// =============================================================================

/**
 * Possible states of a booking through its lifecycle.
 * Maps directly to Paystack payment status + internal states.
 */
export type BookingStatus =
  | "pending"       // Form submitted, awaiting payment
  | "payment_init"  // Paystack modal opened
  | "payment_failed"// Paystack charge failed or dismissed
  | "confirmed"     // Payment successful, booking confirmed
  | "cancelled"     // Cancelled by patient or clinic
  | "completed"     // Appointment attended
  | "no_show";      // Patient did not attend

/**
 * Payment methods accepted at Vine Dental Clinic.
 * TODO: Extend as new payment channels are onboarded.
 */
export type PaymentMethod =
  | "paystack"      // Online card/bank transfer via Paystack
  | "cash"          // Pay at clinic
  | "hmo"           // HMO / insurance coverage
  | "transfer";     // Direct bank transfer

/**
 * Core booking entity — what gets stored in your DB after confirmation.
 * TODO: Sync field names with your backend schema (Supabase / Prisma model).
 */
export interface Booking {
  id: string;
  reference: string;           // Unique booking ref, e.g. VDC-2024-0001
  patientName: string;
  patientEmail: string;
  patientPhone: string;        // Nigerian format: +234XXXXXXXXXX
  serviceId: string;
  serviceName: string;
  preferredDate: string;       // ISO 8601 date string
  preferredTime: string;       // e.g. "10:00"
  notes?: string;              // Optional patient notes
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paystackReference?: string;  // Populated after Paystack initialisation
  amountPaid?: number;         // In kobo (Paystack convention) — TODO: confirm with backend
  createdAt: string;           // ISO 8601 datetime
  updatedAt: string;           // ISO 8601 datetime
}

/**
 * Raw form data collected before a booking is created.
 * Validated by bookingSchema in /lib/validation.ts.
 */
export interface BookingFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  /** True when patient has accepted terms & privacy policy */
  consentGiven: boolean;
}

/**
 * Lightweight booking summary for confirmation screens / WhatsApp messages.
 */
export interface BookingConfirmation {
  reference: string;
  patientName: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  amountPaid?: number;
  status: BookingStatus;
}

/**
 * Available appointment time slots returned from availability API.
 * TODO: Connect to a real availability/scheduling endpoint.
 */
export interface TimeSlot {
  time: string;       // "09:00", "09:30", etc.
  available: boolean;
  label: string;      // "9:00 AM"
}

/**
 * Payload sent to Paystack initialisation endpoint.
 * Reference: https://paystack.com/docs/api/transaction/#initialize
 */
export interface PaystackPayload {
  email: string;
  amount: number;          // In kobo
  reference: string;
  currency: "NGN";
  metadata: {
    patientName: string;
    serviceId: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  callback_url?: string;   // TODO: Set to your production callback URL
}
