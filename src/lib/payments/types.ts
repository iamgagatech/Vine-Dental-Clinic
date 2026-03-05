// =============================================================================
// VINE DENTAL CLINIC — Payment Types
// Paystack-specific types and payment domain models.
// Reference: https://paystack.com/docs/api/
// =============================================================================

// ─── Payment Status ───────────────────────────────────────────────────────────

export type PaymentStatus =
  | "idle"           // No payment initiated
  | "initialising"   // Fetching Paystack access code
  | "open"           // Paystack modal is open
  | "success"        // Payment completed successfully
  | "failed"         // Charge declined / error
  | "cancelled"      // User closed modal before paying
  | "verifying"      // Verifying webhook/callback with Paystack
  | "verified";      // Server confirmed payment is genuine

// ─── Payment Intent ───────────────────────────────────────────────────────────

/**
 * Internal payment intent — created when user initiates "Pay Now".
 * Links a booking to a Paystack transaction.
 */
export interface PaymentIntent {
  id: string;
  bookingId: string;
  bookingReference: string;
  patientEmail: string;
  patientName: string;
  serviceId: string;
  serviceName: string;
  amountKobo: number;          // Amount in kobo (₦1 = 100 kobo)
  currency: "NGN";
  status: PaymentStatus;
  paystackReference?: string;  // Set after Paystack init
  paystackAccessCode?: string; // Set after Paystack init — used to reopen modal
  createdAt: string;
  updatedAt: string;
}

// ─── Paystack API Shapes ──────────────────────────────────────────────────────

/**
 * Request payload for Paystack /transaction/initialize.
 * Reference: https://paystack.com/docs/api/transaction/#initialize
 */
export interface PaystackInitRequest {
  email: string;
  amount: number;              // In kobo
  reference: string;
  currency?: "NGN" | "USD" | "GHS";
  callback_url?: string;
  metadata?: PaystackMetadata;
  channels?: PaystackChannel[];
}

export type PaystackChannel =
  | "card"
  | "bank"
  | "ussd"
  | "qr"
  | "mobile_money"
  | "bank_transfer"
  | "eft";

export interface PaystackMetadata {
  patientName: string;
  serviceId: string;
  serviceName: string;
  bookingReference: string;
  bookingDate: string;
  bookingTime: string;
  cancel_action?: string;     // URL to redirect to if user cancels
  custom_fields?: PaystackCustomField[];
}

export interface PaystackCustomField {
  display_name: string;
  variable_name: string;
  value: string;
}

/**
 * Paystack /transaction/initialize success response.
 */
export interface PaystackInitResponse {
  status: true;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

/**
 * Paystack /transaction/verify response data.
 * Reference: https://paystack.com/docs/api/transaction/#verify
 */
export interface PaystackVerifyData {
  id: number;
  reference: string;
  amount: number;              // In kobo
  currency: string;
  status: "success" | "failed" | "abandoned" | "pending";
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  customer: {
    id: number;
    email: string;
    customer_code: string;
  };
  metadata?: PaystackMetadata;
}

export interface PaystackVerifyResponse {
  status: true;
  message: string;
  data: PaystackVerifyData;
}

/**
 * Paystack webhook event payload.
 * TODO (PRODUCTION): Validate X-Paystack-Signature header on every webhook.
 *   Use crypto.createHmac('sha512', secret).update(rawBody).digest('hex')
 *   and compare to the signature header.
 */
export interface PaystackWebhookPayload {
  event: "charge.success" | "charge.failed" | "transfer.success" | string;
  data: {
    id: number;
    reference: string;
    amount: number;
    currency: string;
    status: "success" | "failed" | "pending";
    gateway_response: string;
    paid_at?: string;
    customer: {
      email: string;
      phone?: string;
    };
    metadata?: PaystackMetadata;
  };
}

// ─── Service Pricing ──────────────────────────────────────────────────────────

/**
 * Maps service IDs to their deposit amounts (kobo).
 * Patients pay a deposit online; remainder settled at clinic.
 *
 * TODO (PRODUCTION): Store pricing in database, not hardcoded.
 *                    Allow admin to update pricing from dashboard.
 */
export const SERVICE_DEPOSITS: Record<string, number> = {
  "dental-scaling-polishing":     1000 * 100,   // ₦1,000 deposit
  "tooth-extraction":             1000 * 100,   // ₦1,000 deposit
  "dental-fillings-restorations": 2000 * 100,   // ₦2,000 deposit
  "root-canal-treatment":         5000 * 100,   // ₦5,000 deposit
  "teeth-whitening":              5000 * 100,   // ₦5,000 deposit
  "dental-implants":             10000 * 100,   // ₦10,000 deposit
  "orthodontics-braces":         10000 * 100,   // ₦10,000 deposit
  "crowns-bridges":               5000 * 100,   // ₦5,000 deposit
  "emergency-dental-care":        2000 * 100,   // ₦2,000 deposit
  "pediatric-dentistry":          1000 * 100,   // ₦1,000 deposit
};

/** Returns the deposit amount in kobo for a given service. */
export function getDepositAmount(serviceId: string): number {
  return SERVICE_DEPOSITS[serviceId] ?? 2000 * 100; // Default ₦2,000
}

/** Converts kobo to NGN naira. */
export function koboToNaira(kobo: number): number {
  return kobo / 100;
}

/** Converts NGN naira to kobo. */
export function nairaToKobo(naira: number): number {
  return naira * 100;
}
