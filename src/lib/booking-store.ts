// =============================================================================
// VINE DENTAL CLINIC — Booking Service Layer
// Business logic for booking CRUD. Wraps the DB layer with validation,
// reference generation, and side-effect orchestration (notifications).
//
// This is the single entry point for all booking operations across the app.
// Components and pages should import from here, not from db.ts directly.
// =============================================================================

import type { Booking, BookingStatus, BookingFormData } from "../types/booking";
import type { APIResponse } from "../types/api";
import {
  createBookingRecord,
  getAllBookings,
  getBookingById,
  getBookingByReference,
  updateBookingStatus,
  updateBookingFields,
  deleteBookingRecord,
  getBookingsByStatus,
  getBookingStats,
  type BookingStats,
} from "./db";
import { generateId, generateBookingReference } from "./id-generator";
import { SERVICES_SUMMARY } from "./constants";
import { trackSubmitBooking, trackPaymentSuccess } from "./analytics";

// ─── Response Builders ────────────────────────────────────────────────────────

function success<T>(data: T, message?: string): APIResponse<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
    requestId: generateId(),
  };
}

function failure(
  code: string,
  message: string,
  status = 400
): APIResponse<never> {
  return {
    success: false,
    error: {
      code: code as APIResponse<never>["error"] extends infer E
        ? E extends { code: infer C }
          ? C
          : never
        : never,
      message,
      status,
    },
    timestamp: new Date().toISOString(),
  };
}

// ─── Create Booking ───────────────────────────────────────────────────────────

export interface CreateBookingResult {
  bookingRef: string;
  bookingId: string;
  status: BookingStatus;
  message: string;
  whatsappLink: string;
}

/**
 * Creates a new booking from validated form data.
 * Generates a unique reference, persists to store, triggers notifications.
 *
 * @param formData - Validated booking form data
 * @returns APIResponse with booking reference and WhatsApp confirmation link
 */
export async function createBooking(
  formData: BookingFormData
): Promise<APIResponse<CreateBookingResult>> {
  // Resolve service name from ID
  const service = SERVICES_SUMMARY.find((s) => s.id === formData.serviceId);
  if (!service) {
    return failure("VALIDATION_ERROR", "Selected service not found. Please try again.", 400) as APIResponse<CreateBookingResult>;
  }

  // Generate unique IDs
  const id = generateId();
  const reference = generateBookingReference();
  const now = new Date().toISOString();

  const booking: Booking = {
    id,
    reference,
    patientName: formData.patientName,
    patientEmail: formData.patientEmail ?? "",
    patientPhone: formData.patientPhone,
    serviceId: formData.serviceId,
    serviceName: service.name,
    preferredDate: formData.preferredDate,
    preferredTime: formData.preferredTime,
    notes: formData.notes,
    status: "pending",
    paymentMethod: formData.paymentMethod,
    createdAt: now,
    updatedAt: now,
  };

  // Persist to store
  createBookingRecord(booking);

  // Track analytics
  trackSubmitBooking(formData.serviceId, service.name, formData.paymentMethod);

  // Generate WhatsApp confirmation link
  const waText = encodeURIComponent(
    `Hi Vine Dental Clinic 👋\n\nI've just submitted a booking request (Ref: *${reference}*) for *${service.name}* on *${formData.preferredDate}* at *${formData.preferredTime}*.\n\nPlease confirm my appointment. Thank you!`
  );
  const whatsappLink = `https://wa.me/2348023657067?text=${waText}`;

  // TODO (PRODUCTION): Trigger async notifications
  // await notifyAdmin({ booking });
  // await notifyPatient({ booking, type: 'booking_received' });

  return success<CreateBookingResult>(
    {
      bookingRef: reference,
      bookingId: id,
      status: "pending",
      message:
        "Booking received! We'll confirm your appointment within 2 hours during business hours.",
      whatsappLink,
    },
    "Booking submitted successfully"
  );
}

// ─── Get Bookings ─────────────────────────────────────────────────────────────

/** Retrieve all bookings for admin display. */
export function getBookings(): Booking[] {
  return getAllBookings();
}

/** Retrieve a single booking by internal ID. */
export function getBooking(id: string): Booking | undefined {
  return getBookingById(id);
}

/** Retrieve a booking by its human-readable reference. */
export function getBookingByRef(reference: string): Booking | undefined {
  return getBookingByReference(reference);
}

/** Retrieve bookings filtered by status. */
export function getFilteredBookings(status?: BookingStatus): Booking[] {
  if (!status) return getAllBookings();
  return getBookingsByStatus(status);
}

// ─── Update Booking ───────────────────────────────────────────────────────────

/**
 * Update a booking's status (admin action: confirm, cancel, complete).
 *
 * Status transition rules:
 *   pending → confirmed | cancelled
 *   confirmed → completed | cancelled
 *   completed → (terminal)
 *   cancelled → (terminal)
 *
 * TODO (PRODUCTION): Add audit log entry on every status change.
 */
export async function updateStatus(
  id: string,
  newStatus: BookingStatus,
  adminNote?: string
): Promise<APIResponse<Booking>> {
  const existing = getBookingById(id);
  if (!existing) {
    return failure("BOOKING_NOT_FOUND", "Booking not found.", 404) as APIResponse<Booking>;
  }

  // Validate transition
  const terminalStatuses: BookingStatus[] = ["completed", "cancelled", "no_show"];
  if (terminalStatuses.includes(existing.status)) {
    return failure(
      "VALIDATION_ERROR",
      `Cannot update a ${existing.status} booking.`,
      400
    ) as APIResponse<Booking>;
  }

  const updated = updateBookingStatus(id, newStatus);
  if (!updated) {
    return failure("SERVER_ERROR", "Failed to update booking.", 500) as APIResponse<Booking>;
  }

  // Optionally add admin note
  if (adminNote) {
    updateBookingFields(id, { notes: `${updated.notes ?? ""}\n[Admin]: ${adminNote}`.trim() });
  }

  // TODO (PRODUCTION): Send status update notification to patient
  // if (newStatus === 'confirmed') await notifyPatient({ booking: updated, type: 'confirmed' });
  // if (newStatus === 'cancelled') await notifyPatient({ booking: updated, type: 'cancelled' });

  const finalBooking = getBookingById(id) ?? updated;
  return success(finalBooking, `Booking ${newStatus} successfully.`);
}

/** Update Paystack payment reference after payment initialisation. */
export function setPaystackReference(
  bookingId: string,
  paystackReference: string
): Booking | undefined {
  return updateBookingStatus(bookingId, "payment_init", paystackReference);
}

/** Mark booking as paid after Paystack verification. */
export function confirmPayment(
  bookingId: string,
  paystackReference: string,
  amountKobo: number
): Booking | undefined {
  const updated = updateBookingFields(bookingId, {
    status: "confirmed",
    paystackReference,
    amountPaid: amountKobo,
    updatedAt: new Date().toISOString(),
  });

  if (updated) {
    trackPaymentSuccess(updated.reference, amountKobo, updated.serviceId);
  }

  return updated;
}

// ─── Delete Booking ───────────────────────────────────────────────────────────

/**
 * Soft-deletes a booking (sets to cancelled).
 * TODO (PRODUCTION): Implement actual soft-delete with deletedAt timestamp.
 */
export function removeBooking(id: string): boolean {
  return deleteBookingRecord(id);
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

/** Returns aggregated stats for the admin dashboard. */
export function getDashboardStats(): BookingStats {
  return getBookingStats();
}

// ─── Export CSV ───────────────────────────────────────────────────────────────

/**
 * Generates a CSV string from all bookings for download.
 * TODO (PRODUCTION): Move to server-side for large datasets.
 *                    Add field-level encryption removal before export.
 *                    Log all CSV exports in audit trail.
 */
export function exportBookingsCSV(): string {
  const bookings = getAllBookings();
  const headers = [
    "Reference",
    "Patient Name",
    "Phone",
    "Email",
    "Service",
    "Date",
    "Time",
    "Status",
    "Payment Method",
    "Amount Paid (NGN)",
    "Notes",
    "Created At",
  ];

  const rows = bookings.map((b) => [
    b.reference,
    `"${b.patientName}"`,
    b.patientPhone,
    b.patientEmail,
    `"${b.serviceName}"`,
    b.preferredDate,
    b.preferredTime,
    b.status,
    b.paymentMethod,
    b.amountPaid ? String(b.amountPaid / 100) : "",
    `"${(b.notes ?? "").replace(/"/g, "'")}"`,
    b.createdAt,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
