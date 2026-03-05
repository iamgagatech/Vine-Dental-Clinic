// =============================================================================
// VINE DENTAL CLINIC — Notification Dispatcher
// Central orchestration for all patient and admin notifications.
// Sends email + SMS concurrently. Failures are logged but not thrown
// (notifications should never break the booking flow).
// =============================================================================

import type { Booking } from "../../types/booking";
import {
  sendBookingConfirmation,
  sendAdminNewBookingAlert,
  sendAppointmentReminder,
} from "./email";
import {
  sendBookingConfirmationSMS,
  sendAdminSMSAlert,
  sendReminderSMS,
} from "./sms";

// ─── Notification Events ──────────────────────────────────────────────────────

export type NotificationEvent =
  | "booking_received"     // Patient submitted form
  | "booking_confirmed"    // Admin confirmed appointment
  | "booking_cancelled"    // Booking was cancelled
  | "booking_reminder_24h" // 24-hour pre-appointment reminder
  | "payment_received"     // Paystack payment confirmed
  | "post_visit_feedback"; // Follow-up after appointment

// ─── Dispatch: New Booking ────────────────────────────────────────────────────

/**
 * Fires all notifications when a new booking is received.
 * Sends: patient confirmation (email + SMS) + admin alert (email + SMS).
 *
 * Errors are caught and logged — notification failure should NOT break booking creation.
 *
 * TODO (PRODUCTION):
 *   - Move to a background job queue (BullMQ, Vercel Queue, etc.)
 *   - Add retry logic with exponential backoff
 *   - Add delivery tracking to DB
 */
export async function notifyNewBooking(booking: Booking): Promise<void> {
  const params = {
    bookingRef: booking.reference,
    patientName: booking.patientName,
    patientPhone: booking.patientPhone,
    patientEmail: booking.patientEmail,
    serviceName: booking.serviceName,
    preferredDate: booking.preferredDate,
    preferredTime: booking.preferredTime,
    notes: booking.notes,
    paymentMethod: booking.paymentMethod,
  };

  // Fire all notifications concurrently — don't await individually
  const notifications: Promise<boolean>[] = [];

  // Patient email (if provided)
  if (booking.patientEmail) {
    notifications.push(
      sendBookingConfirmation(params).catch((err) => {
        console.error("[Notifications] Patient email failed:", err);
        return false;
      })
    );
  }

  // Patient SMS
  notifications.push(
    sendBookingConfirmationSMS(params).catch((err) => {
      console.error("[Notifications] Patient SMS failed:", err);
      return false;
    })
  );

  // Admin email
  notifications.push(
    sendAdminNewBookingAlert(params).catch((err) => {
      console.error("[Notifications] Admin email failed:", err);
      return false;
    })
  );

  // Admin SMS
  notifications.push(
    sendAdminSMSAlert(params).catch((err) => {
      console.error("[Notifications] Admin SMS failed:", err);
      return false;
    })
  );

  const results = await Promise.allSettled(notifications);
  const successCount = results.filter(
    (r) => r.status === "fulfilled" && r.value === true
  ).length;

  console.log(
    `[Notifications] New booking (${booking.reference}): ${successCount}/${notifications.length} notifications sent`
  );
}

// ─── Dispatch: Booking Confirmed ──────────────────────────────────────────────

/**
 * Fires when admin confirms an appointment.
 * TODO: Implement confirmation email/SMS template.
 */
export async function notifyBookingConfirmed(booking: Booking): Promise<void> {
  console.log("[Notifications] Booking confirmed:", booking.reference);

  // TODO (PRODUCTION): Send confirmation email to patient
  // await sendBookingConfirmedEmail({ ... });
  // await sendConfirmationSMS({ ... });
}

// ─── Dispatch: Booking Cancelled ─────────────────────────────────────────────

/**
 * Fires when a booking is cancelled (by patient or admin).
 * TODO: Implement cancellation notification template.
 */
export async function notifyBookingCancelled(
  booking: Booking,
  reason?: string
): Promise<void> {
  console.log("[Notifications] Booking cancelled:", booking.reference, reason);

  // TODO (PRODUCTION): Send cancellation email to patient
  // await sendCancellationEmail({ ...booking, reason });
  void reason;
}

// ─── Dispatch: 24h Reminder ───────────────────────────────────────────────────

/**
 * Sends 24-hour appointment reminders.
 * TODO: Schedule with a CRON job (Vercel CRON, GitHub Actions, etc.)
 *
 * Scheduling approach:
 *   1. Run a CRON daily at 9:00 AM WAT (Africa/Lagos)
 *   2. Query all bookings where preferredDate = tomorrow AND status = confirmed
 *   3. Call notifyReminder() for each
 */
export async function notifyReminder(booking: Booking): Promise<void> {
  const firstName = booking.patientName.split(" ")[0] ?? booking.patientName;

  const reminderParams = {
    patientPhone: booking.patientPhone,
    firstName,
    serviceName: booking.serviceName,
    preferredDate: booking.preferredDate,
    preferredTime: booking.preferredTime,
  };

  await Promise.allSettled([
    // Email reminder
    booking.patientEmail
      ? sendAppointmentReminder({
          patientEmail: booking.patientEmail,
          patientName: booking.patientName,
          bookingRef: booking.reference,
          serviceName: booking.serviceName,
          preferredDate: booking.preferredDate,
          preferredTime: booking.preferredTime,
        }).catch((err) => console.error("[Notifications] Reminder email failed:", err))
      : Promise.resolve(false),

    // SMS reminder
    sendReminderSMS(reminderParams).catch((err) =>
      console.error("[Notifications] Reminder SMS failed:", err)
    ),
  ]);

  console.log(`[Notifications] Reminder sent for booking ${booking.reference}`);
}

// ─── Dispatch: Payment Received ───────────────────────────────────────────────

/**
 * Fires after a successful Paystack payment.
 * TODO: Implement payment receipt email.
 */
export async function notifyPaymentReceived(
  booking: Booking,
  amountNGN: number
): Promise<void> {
  console.log(
    `[Notifications] Payment received for ${booking.reference}: ₦${amountNGN.toLocaleString()}`
  );

  // TODO (PRODUCTION): Send payment receipt email
  // await sendPaymentReceiptEmail({ ...booking, amountNGN });
  void amountNGN;
}
