// =============================================================================
// VINE DENTAL CLINIC — Payment Configuration
// Paystack setup and environment-based config.
//
// TODO (PRODUCTION):
//   1. Set VITE_PAYSTACK_PUBLIC_KEY in .env and Vercel/hosting env vars
//   2. Never expose the SECRET key to the client — keep server-side only
//   3. Enable webhook endpoint in Paystack dashboard:
//      https://dashboard.paystack.com/#/settings/developer → Webhook URL
//   4. Set webhook URL to: https://yourdomain.com/api/payments/webhook
// =============================================================================

const env = (import.meta as unknown as { env: Record<string, string> }).env;

export const PAYSTACK_CONFIG = {
  /**
   * Paystack public key — safe to expose to client.
   * Prefixed with pk_test_ (test) or pk_live_ (production).
   * TODO: Set VITE_PAYSTACK_PUBLIC_KEY in your .env file.
   */
  publicKey: env["VITE_PAYSTACK_PUBLIC_KEY"] ?? "pk_test_placeholder_replace_me",

  /**
   * Currency for all transactions.
   * Vine Dental Clinic operates exclusively in NGN.
   */
  currency: "NGN" as const,

  /**
   * Paystack payment channels to enable.
   * Bank transfer is popular in Nigeria — always include it.
   */
  channels: ["card", "bank", "ussd", "bank_transfer"] as const,

  /**
   * Callback URL after successful payment.
   * Paystack redirects here with ?reference=xxx on inline/redirect mode.
   * TODO: Update to production domain.
   */
  callbackUrl:
    env["VITE_SITE_URL"]
      ? `${env["VITE_SITE_URL"]}/booking/success`
      : "http://localhost:5173/booking/success",

  /**
   * Whether to use Paystack test mode.
   * Automatically true when using a test key (pk_test_*).
   */
  isTestMode:
    (env["VITE_PAYSTACK_PUBLIC_KEY"] ?? "").startsWith("pk_test_") ||
    !env["VITE_PAYSTACK_PUBLIC_KEY"],
} as const;

/**
 * Minimum deposit label for display.
 * TODO: Retrieve from admin settings once DB is live.
 */
export const DEPOSIT_LABEL = "Appointment Deposit (₦)";

/**
 * Paystack's API base URL.
 * NOTE: This should only be used server-side (Node/Vercel functions).
 *       Never call Paystack's API directly from the browser with your secret key.
 * TODO: Move all Paystack API calls to server-side API routes.
 */
export const PAYSTACK_API_BASE = "https://api.paystack.co";
