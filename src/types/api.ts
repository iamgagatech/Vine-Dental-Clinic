// =============================================================================
// VINE DENTAL CLINIC — API & Error Types
// =============================================================================

/**
 * Standard envelope for all API responses.
 * Both success and error states use this shape for predictable handling.
 *
 * Usage:
 *   const res: APIResponse<Booking> = await createBooking(data);
 *   if (res.success) { ... } else { console.error(res.error) }
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  /** Human-readable message for toasts/banners */
  message?: string;
  /** ISO timestamp of the response */
  timestamp: string;
  /** Unique request ID for tracing — TODO: correlate with backend logs */
  requestId?: string;
}

/**
 * Structured error object returned from all failing API calls.
 */
export interface APIError {
  code: APIErrorCode;
  message: string;                // User-facing message
  /** Developer-facing detail — only populated in development */
  detail?: string;
  /** Field-level errors from Zod or server validation */
  fieldErrors?: Record<string, string[]>;
  /** HTTP status code */
  status: number;
}

/**
 * Machine-readable error codes.
 * Maps to specific UI messaging and recovery flows.
 */
export type APIErrorCode =
  | "VALIDATION_ERROR"            // Zod / form schema failure
  | "NETWORK_ERROR"               // Fetch failed / timeout
  | "BOOKING_CONFLICT"            // Slot already taken
  | "BOOKING_NOT_FOUND"           // Reference doesn't exist
  | "PAYMENT_FAILED"              // Paystack charge rejected
  | "PAYMENT_VERIFICATION_FAILED" // Paystack webhook mismatch
  | "SLOT_UNAVAILABLE"            // Timeslot no longer free
  | "RATE_LIMITED"                // Too many requests
  | "UNAUTHORIZED"                // Auth required — TODO: patient portal
  | "SERVER_ERROR"                // 5xx from backend
  | "UNKNOWN_ERROR";              // Catch-all

/**
 * Field-level validation error from Zod or server-side validation.
 */
export interface ValidationError {
  field: string;                  // Dot-notation path, e.g. "patientPhone"
  message: string;                // User-facing error text
  code?: string;                  // Zod error code, e.g. "too_small"
}

/**
 * Shape of errors returned by Paystack's API.
 * Reference: https://paystack.com/docs/api/
 */
export interface PaystackAPIError {
  status: false;
  message: string;
  meta?: Record<string, unknown>;
}

/**
 * Paystack webhook event payload.
 * TODO: Validate against Paystack-Signature header in your webhook handler.
 */
export interface PaystackWebhookEvent {
  event: "charge.success" | "charge.failed" | "transfer.success" | string;
  data: {
    id: number;
    reference: string;
    amount: number;               // In kobo
    currency: "NGN";
    status: "success" | "failed" | "pending";
    customer: {
      email: string;
      phone?: string;
    };
    metadata?: Record<string, unknown>;
    paid_at?: string;
    created_at?: string;
  };
}

/**
 * Availability endpoint response.
 */
export interface AvailabilityResponse {
  date: string;
  slots: Array<{
    time: string;
    available: boolean;
    label: string;
  }>;
}

/**
 * Generic paginated response wrapper.
 * TODO: Use when implementing review/booking list endpoints.
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}
