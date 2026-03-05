// =============================================================================
// VINE DENTAL CLINIC — Paystack Integration
// Client-side Paystack inline checkout + verification stubs.
//
// Architecture:
//   - Client: Uses Paystack's inline JS popup (no server secret needed)
//   - Server: POST /api/payments/initialize → Paystack API (with secret key)
//             POST /api/payments/verify → Paystack verify endpoint
//             POST /api/payments/webhook → Paystack webhook handler
//
// TODO (PRODUCTION):
//   1. Load Paystack inline script in index.html:
//      <script src="https://js.paystack.co/v1/inline.js"></script>
//   2. OR use the official React library: npm install @paystack/inline-js
//   3. Add webhook signature verification on your server
//   4. Never trust client-side payment success — always verify server-side
// =============================================================================

import { PAYSTACK_CONFIG, PAYSTACK_API_BASE } from "./config";
import {
  type PaystackInitRequest,
  type PaystackInitResponse,
  type PaystackVerifyResponse,
  type PaystackMetadata,
  getDepositAmount,
  koboToNaira,
} from "./types";
import { generateBookingReference } from "../id-generator";

// ─── Paystack Inline Types ────────────────────────────────────────────────────

/**
 * Paystack inline popup configuration.
 * Reference: https://paystack.com/docs/payments/accept-payments/#popup
 */
interface PaystackInlineConfig {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref: string;
  metadata?: PaystackMetadata;
  onClose: () => void;
  callback: (response: { reference: string; status: string }) => void;
  channels?: string[];
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: PaystackInlineConfig) => { openIframe: () => void };
    };
  }
}

// ─── Initialize Payment (Client-side Inline Popup) ────────────────────────────

export interface InitiatePaymentOptions {
  bookingId: string;
  bookingReference: string;
  patientEmail: string;
  patientName: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  /** Override amount in kobo — defaults to service deposit */
  amountKobo?: number;
  onSuccess: (reference: string, amountKobo: number) => void;
  onClose: () => void;
  onError?: (error: string) => void;
}

/**
 * Opens the Paystack inline payment popup.
 *
 * USAGE:
 *   initiatePaystackPayment({ ...options })
 *
 * IMPORTANT: The Paystack inline script must be loaded before calling this.
 * Add to index.html: <script src="https://js.paystack.co/v1/inline.js"></script>
 *
 * TODO (PRODUCTION):
 *   - Replace inline popup with server-initialised transaction for better security
 *   - Always verify payment server-side after callback fires
 */
export function initiatePaystackPayment(options: InitiatePaymentOptions): void {
  // Check if Paystack inline script is loaded
  if (!window.PaystackPop) {
    console.error(
      "[Paystack] PaystackPop not found. Ensure Paystack inline script is loaded in index.html."
    );
    options.onError?.(
      "Payment system not ready. Please refresh the page and try again."
    );
    return;
  }

  const amountKobo = options.amountKobo ?? getDepositAmount(options.serviceId);

  // Generate a unique payment reference
  const paymentRef = `PAY-${generateBookingReference()}-${Date.now()}`;

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_CONFIG.publicKey,
    email: options.patientEmail,
    amount: amountKobo,
    currency: PAYSTACK_CONFIG.currency,
    ref: paymentRef,
    channels: [...PAYSTACK_CONFIG.channels],
    metadata: {
      patientName: options.patientName,
      serviceId: options.serviceId,
      serviceName: options.serviceName,
      bookingReference: options.bookingReference,
      bookingDate: options.preferredDate,
      bookingTime: options.preferredTime,
      cancel_action: window.location.href,
      custom_fields: [
        {
          display_name: "Booking Reference",
          variable_name: "booking_reference",
          value: options.bookingReference,
        },
        {
          display_name: "Service",
          variable_name: "service_name",
          value: options.serviceName,
        },
        {
          display_name: "Patient Name",
          variable_name: "patient_name",
          value: options.patientName,
        },
      ],
    },
    onClose: () => {
      console.log("[Paystack] Modal closed by user.");
      options.onClose();
    },
    callback: (response) => {
      console.log("[Paystack] Payment callback:", response);
      if (response.status === "success" || response.reference) {
        // IMPORTANT: Always verify server-side before fulfilling the booking
        // TODO (PRODUCTION): POST to /api/payments/verify with the reference
        //   const verified = await verifyPayment(response.reference);
        //   if (verified) { options.onSuccess(response.reference, amountKobo); }
        options.onSuccess(response.reference, amountKobo);
      }
    },
  });

  handler.openIframe();
}

// ─── Server-Side: Initialize Payment ─────────────────────────────────────────

/**
 * Server-side payment initialisation via Paystack API.
 *
 * NOTE: This function requires your SECRET key and should ONLY run on the server.
 * In a Vite SPA, this is a stub — implement in your serverless function.
 *
 * TODO (PRODUCTION): Move to /api/payments/initialize route (Vercel function, etc.)
 *   const response = await fetch('https://api.paystack.co/transaction/initialize', {
 *     method: 'POST',
 *     headers: {
 *       Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
 *       'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify(payload),
 *   });
 */
export async function initializePaymentServerSide(
  payload: PaystackInitRequest
): Promise<PaystackInitResponse | null> {
  // STUB — this would run on the server with the secret key
  console.log("[Paystack] initializePaymentServerSide called (STUB)", {
    api: `${PAYSTACK_API_BASE}/transaction/initialize`,
    email: payload.email,
    amount: payload.amount,
    reference: payload.reference,
    // TODO: Secret key: Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
  });

  // Return a mock response for development
  return {
    status: true,
    message: "Authorization URL created",
    data: {
      authorization_url: `https://checkout.paystack.com/mock_${payload.reference}`,
      access_code: `mock_access_${Date.now()}`,
      reference: payload.reference,
    },
  };
}

// ─── Server-Side: Verify Payment ─────────────────────────────────────────────

/**
 * Verifies a Paystack payment by reference.
 * MUST be called server-side — requires secret key.
 *
 * TODO (PRODUCTION): Implement in /api/payments/verify serverless route.
 *   const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
 *     headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
 *   });
 */
export async function verifyPaymentServerSide(
  reference: string
): Promise<PaystackVerifyResponse | null> {
  console.log("[Paystack] verifyPaymentServerSide called (STUB)", { reference });

  // Mock success response for development
  return {
    status: true,
    message: "Verification successful",
    data: {
      id: Date.now(),
      reference,
      amount: 200000, // ₦2,000 in kobo
      currency: "NGN",
      status: "success",
      gateway_response: "Successful",
      paid_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      channel: "card",
      customer: {
        id: 1,
        email: "patient@example.com",
        customer_code: "CUS_mock",
      },
    },
  };
}

// ─── Webhook Handler (Stub) ───────────────────────────────────────────────────

/**
 * Processes a Paystack webhook event.
 * MUST run on the server — validates signature and updates booking status.
 *
 * TODO (PRODUCTION): Implement in /api/payments/webhook serverless route.
 *
 * Security:
 *   1. Validate X-Paystack-Signature header:
 *      const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
 *                         .update(rawBody)
 *                         .digest('hex');
 *      if (hash !== req.headers['x-paystack-signature']) return 401;
 *
 *   2. Only process 'charge.success' events
 *   3. Verify the amount matches what you expected
 *   4. Idempotency: check if reference was already processed
 */
export async function handleWebhookServerSide(rawBody: string): Promise<{ received: boolean }> {
  console.log("[Paystack] Webhook received (STUB)", rawBody.slice(0, 100));
  // TODO: Parse body, verify signature, update booking status
  return { received: true };
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Format deposit amount for display on payment buttons. */
export function formatDepositDisplay(serviceId: string): string {
  const kobo = getDepositAmount(serviceId);
  return `₦${koboToNaira(kobo).toLocaleString("en-NG")}`;
}

/**
 * Checks if Paystack inline JS is loaded.
 * Use to conditionally show "Pay Now" vs "Pay at Clinic" buttons.
 */
export function isPaystackLoaded(): boolean {
  return typeof window !== "undefined" && !!window.PaystackPop;
}
