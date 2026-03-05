// =============================================================================
// VINE DENTAL CLINIC — Analytics Module
// Centralised event tracking with console stubs.
//
// PRODUCTION INTEGRATION:
//   1. Install PostHog: npm install posthog-js
//      Replace captureEvent() body with: posthog.capture(name, props)
//   2. OR install GA4: npm install gtag
//      Replace captureEvent() body with: gtag('event', name, props)
//   3. Set VITE_ANALYTICS_ENABLED=true and VITE_POSTHOG_KEY=phc_xxx in .env
// =============================================================================

// ─── Configuration ────────────────────────────────────────────────────────────

const isDev = (import.meta as unknown as { env: { DEV?: boolean } }).env?.DEV ?? true;
// TODO: Replace with: const isEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
const isEnabled = !isDev;

// ─── Event Name Registry ─────────────────────────────────────────────────────

/**
 * All trackable analytics event names.
 * Naming convention: object_action (snake_case)
 */
export type AnalyticsEvent =
  // Page views
  | "view_home"
  | "view_services"
  | "view_service_detail"
  | "view_about"
  | "view_contact"
  | "view_booking"
  | "view_reviews"
  // Engagement
  | "click_whatsapp"
  | "click_call"
  | "click_email"
  | "click_maps"
  | "click_book_cta"
  | "click_emergency_cta"
  | "click_service_card"
  | "click_nav_link"
  // Booking flow
  | "booking_form_start"
  | "booking_form_step"
  | "booking_form_error"
  | "submit_booking"
  | "booking_success"
  | "booking_cancelled"
  // Payment
  | "start_payment"
  | "payment_modal_opened"
  | "payment_success"
  | "payment_failed"
  | "payment_dismissed"
  // Reviews
  | "click_write_review"
  | "view_all_reviews"
  // Conversion
  | "lead_generated"
  | "newsletter_signup";

/**
 * Property bag for analytics events.
 * All values must be serialisable.
 */
export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

// ─── Core Tracking Function ───────────────────────────────────────────────────

/**
 * Core event capture — all named functions funnel through here.
 *
 * PRODUCTION: Replace the console.log body with your analytics provider call.
 *
 * PostHog example:
 *   import posthog from 'posthog-js'
 *   posthog.capture(name, props)
 *
 * GA4 example:
 *   window.gtag?.('event', name, props)
 */
function captureEvent(
  name: AnalyticsEvent,
  properties?: AnalyticsProperties
): void {
  if (isDev) {
    // Development: log events to console for debugging
    console.log(`[Analytics] ${name}`, properties ?? {});
    return;
  }

  if (!isEnabled) return;

  // TODO: PRODUCTION — uncomment and configure your provider:
  //
  // Option A: PostHog
  // import posthog from 'posthog-js'
  // posthog.capture(name, properties)
  //
  // Option B: Google Analytics 4
  // window.gtag?.('event', name, {
  //   event_category: properties?.category ?? 'engagement',
  //   event_label: properties?.label,
  //   value: properties?.value,
  //   ...properties,
  // })
  //
  // Option C: Segment
  // window.analytics?.track(name, properties)

  void name;
  void properties;
}

// ─── Identify User ────────────────────────────────────────────────────────────

/**
 * Identify a patient for analytics.
 * Call after booking confirmation to tie events to a person.
 *
 * PRODUCTION: Replace with posthog.identify() or analytics.identify()
 * NEVER pass full PII in production — use a hashed ID.
 *
 * @param userId - Hashed/anonymised user ID
 * @param traits - Non-PII traits (e.g. has_booked_before)
 */
export function identifyUser(
  userId: string,
  traits?: AnalyticsProperties
): void {
  if (isDev) {
    console.log("[Analytics] identify", userId, traits ?? {});
    return;
  }
  // TODO: posthog.identify(userId, traits)
  void userId;
  void traits;
}

// ─── Page View Tracking ───────────────────────────────────────────────────────

/** Track a page view — call in route change handler or page component mount */
export function trackPageView(
  page: string,
  properties?: AnalyticsProperties
): void {
  captureEvent(`view_${page.replace(/^\//, "").replace(/\//g, "_") || "home"}` as AnalyticsEvent, {
    page,
    ...properties,
  });
}

// ─── Named Event Helpers ──────────────────────────────────────────────────────

/** Home page viewed */
export function trackViewHome(): void {
  captureEvent("view_home");
}

/** Service listing page viewed */
export function trackViewServices(): void {
  captureEvent("view_services");
}

/** Individual service detail page viewed */
export function trackViewServiceDetail(serviceId: string, serviceName: string): void {
  captureEvent("view_service_detail", { service_id: serviceId, service_name: serviceName });
}

/** Service card clicked on listing or homepage */
export function trackServiceCardClick(serviceId: string, serviceName: string, location: string): void {
  captureEvent("click_service_card", {
    service_id: serviceId,
    service_name: serviceName,
    location,
  });
}

/** WhatsApp CTA clicked */
export function trackWhatsAppClick(
  context: "header" | "hero" | "service" | "contact" | "floating" | "booking",
  serviceId?: string
): void {
  captureEvent("click_whatsapp", {
    context,
    service_id: serviceId,
  });
}

/** Phone number clicked */
export function trackCallClick(context: string): void {
  captureEvent("click_call", { context });
}

/** Book Appointment CTA clicked */
export function trackBookCTAClick(
  context: string,
  serviceId?: string
): void {
  captureEvent("click_book_cta", {
    context,
    service_id: serviceId,
  });
}

/** Booking form started (first field interaction) */
export function trackBookingFormStart(serviceId?: string): void {
  captureEvent("booking_form_start", { service_id: serviceId });
}

/** Multi-step form — step completed */
export function trackBookingFormStep(step: number, stepName: string): void {
  captureEvent("booking_form_step", { step, step_name: stepName });
}

/** Form validation error shown */
export function trackBookingFormError(field: string, error: string): void {
  captureEvent("booking_form_error", { field, error });
}

/** Booking form submitted successfully (pre-payment) */
export function trackSubmitBooking(
  serviceId: string,
  serviceName: string,
  paymentMethod: string
): void {
  captureEvent("submit_booking", {
    service_id: serviceId,
    service_name: serviceName,
    payment_method: paymentMethod,
  });
}

/** Paystack modal opened */
export function trackStartPayment(
  bookingReference: string,
  amountKobo: number,
  serviceId: string
): void {
  captureEvent("start_payment", {
    booking_reference: bookingReference,
    amount_ngn: amountKobo / 100,
    service_id: serviceId,
  });
}

/** Paystack payment completed successfully */
export function trackPaymentSuccess(
  bookingReference: string,
  amountKobo: number,
  serviceId: string
): void {
  captureEvent("payment_success", {
    booking_reference: bookingReference,
    amount_ngn: amountKobo / 100,
    service_id: serviceId,
    revenue: amountKobo / 100,  // Used by GA4 for revenue tracking
  });
}

/** Paystack payment failed */
export function trackPaymentFailed(
  bookingReference: string,
  reason?: string
): void {
  captureEvent("payment_failed", {
    booking_reference: bookingReference,
    reason,
  });
}

/** Emergency CTA clicked */
export function trackEmergencyCTAClick(context: string): void {
  captureEvent("click_emergency_cta", { context });
}

/** Write a review CTA clicked */
export function trackWriteReviewClick(): void {
  captureEvent("click_write_review");
}

/** Newsletter signup completed */
export function trackNewsletterSignup(): void {
  captureEvent("newsletter_signup");
}

// ─── Analytics Reset ──────────────────────────────────────────────────────────

/**
 * Reset analytics identity — call on "sign out" if patient portal is added.
 * TODO: posthog.reset()
 */
export function resetAnalytics(): void {
  if (isDev) {
    console.log("[Analytics] reset");
  }
  // TODO: posthog.reset()
}
