// =============================================================================
// VINE DENTAL CLINIC — WhatsApp Deep Link Generator
// Generates properly-encoded WhatsApp click-to-chat URLs.
// =============================================================================

import { CLINIC_INFO } from "./constants";
import { formatDate } from "./format";

/** WhatsApp business number — no + prefix, no spaces */
const WA_NUMBER = CLINIC_INFO.contact.whatsapp; // "2348023657067"

// ─── Link Options ─────────────────────────────────────────────────────────────

export interface WhatsAppLinkOptions {
  /** Service the patient is enquiring about */
  service?: string;
  /** Confirmed booking reference (post-payment) */
  bookingRef?: string;
  /** Appointment date (ISO string or display string) */
  bookingDate?: string;
  /** Appointment time (e.g. "10:00 AM") */
  bookingTime?: string;
  /** Override the entire message body */
  message?: string;
  /** Short context for analytics (not included in message) */
  context?: "hero" | "service" | "booking_confirm" | "emergency" | "general" | "contact";
}

// ─── Message Templates ────────────────────────────────────────────────────────

/**
 * Builds a natural, pre-filled WhatsApp message based on context.
 * Messages are friendly, concise, and action-oriented.
 */
function buildMessage(options: WhatsAppLinkOptions): string {
  // Override: use custom message as-is
  if (options.message) return options.message;

  const clinicName = CLINIC_INFO.name;

  // Post-booking confirmation
  if (options.bookingRef) {
    const dateStr = options.bookingDate
      ? formatDate(options.bookingDate, "display")
      : "my scheduled date";
    const timeStr = options.bookingTime ? ` at ${options.bookingTime}` : "";
    return (
      `Hi ${clinicName} 👋\n\n` +
      `I've just completed my booking (Ref: *${options.bookingRef}*) for *${options.service ?? "my appointment"}* ` +
      `on *${dateStr}${timeStr}*.\n\n` +
      `I'd like to confirm the details. Thank you!`
    );
  }

  // Service-specific enquiry
  if (options.service) {
    return (
      `Hi ${clinicName} 👋\n\n` +
      `I'm interested in *${options.service}* and would like to book an appointment or get more information.\n\n` +
      `Could you please let me know your available slots? Thank you!`
    );
  }

  // Emergency
  if (options.context === "emergency") {
    return (
      `Hi ${clinicName} 👋\n\n` +
      `I have a *dental emergency* and need urgent attention as soon as possible.\n\n` +
      `Please let me know your earliest available slot today. Thank you!`
    );
  }

  // General enquiry (default)
  return (
    `Hi ${clinicName} 👋\n\n` +
    `I'd like to book a dental appointment. Could you please help me with available slots and any information I need to prepare?\n\n` +
    `Thank you!`
  );
}

// ─── URL Builder ──────────────────────────────────────────────────────────────

/**
 * Generates a WhatsApp click-to-chat deep link.
 *
 * On mobile: opens the WhatsApp app directly.
 * On desktop: opens web.whatsapp.com.
 *
 * Format: https://wa.me/<number>?text=<encoded_message>
 *
 * @example
 * // General CTA
 * generateWhatsAppLink()
 * // → "https://wa.me/2348023657067?text=Hi+Vine+Dental..."
 *
 * // Service-specific
 * generateWhatsAppLink({ service: "Teeth Whitening" })
 *
 * // Post-booking
 * generateWhatsAppLink({ bookingRef: "VDC-2024-0001", service: "Root Canal", bookingDate: "2024-12-15", bookingTime: "10:00 AM" })
 */
export function generateWhatsAppLink(options: WhatsAppLinkOptions = {}): string {
  const message = buildMessage(options);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;
}

// ─── Convenience Exports ──────────────────────────────────────────────────────

/**
 * WhatsApp link for the main header / hero CTA.
 * Pre-fills a general booking enquiry message.
 */
export const WHATSAPP_GENERAL_LINK = generateWhatsAppLink({ context: "general" });

/**
 * WhatsApp link for emergency dental care CTA.
 * Pre-fills an urgent care message.
 */
export const WHATSAPP_EMERGENCY_LINK = generateWhatsAppLink({ context: "emergency" });

/**
 * Generate a WhatsApp link for a specific service page CTA.
 */
export function whatsAppServiceLink(serviceName: string): string {
  return generateWhatsAppLink({ service: serviceName, context: "service" });
}

/**
 * Generate a WhatsApp link for a booking confirmation screen.
 */
export function whatsAppBookingConfirmLink(
  bookingRef: string,
  serviceName: string,
  bookingDate: string,
  bookingTime: string
): string {
  return generateWhatsAppLink({
    bookingRef,
    service: serviceName,
    bookingDate,
    bookingTime,
    context: "booking_confirm",
  });
}

/**
 * Checks if the device is likely mobile (for platform-specific deep linking).
 * Used to decide between wa.me (universal) and whatsapp:// (native iOS/Android).
 *
 * @returns true on mobile devices
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Returns the appropriate WhatsApp URL for the current device.
 * Mobile: uses native whatsapp:// protocol for direct app open.
 * Desktop: uses https://wa.me/ which opens web.whatsapp.com.
 */
export function getWhatsAppLink(options: WhatsAppLinkOptions = {}): string {
  const universalLink = generateWhatsAppLink(options);

  if (isMobileDevice()) {
    // Native deep link — opens WhatsApp app without browser redirect
    const message = buildMessage(options);
    return `whatsapp://send?phone=${WA_NUMBER}&text=${encodeURIComponent(message)}`;
  }

  return universalLink;
}
