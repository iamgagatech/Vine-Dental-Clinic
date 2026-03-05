// =============================================================================
// VINE DENTAL CLINIC — In-Memory Data Store
// Mock database layer for MVP/demo. All data is session-scoped (resets on reload).
//
// PRODUCTION MIGRATION PATH:
//   1. Replace this module with a real DB client (Supabase, Prisma + PostgreSQL, MongoDB)
//   2. All CRUD operations are isolated here — only this file needs changing.
//   3. Each function signature is designed to be async-ready (returns Promises).
//
// TODO (PRODUCTION):
//   - Move to Supabase: `import { createClient } from '@supabase/supabase-js'`
//   - Or Prisma: `import { PrismaClient } from '@prisma/client'`
//   - Add proper indexing, foreign keys, audit timestamps
//   - Implement soft deletes (deletedAt field) instead of hard removal
//   - Encrypt PII fields at rest (patientPhone, patientEmail, patientName)
// =============================================================================

import type { Booking, BookingStatus } from "../types/booking";

// ─── Lead Type ────────────────────────────────────────────────────────────────

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  serviceId?: string;
  source: "contact_form" | "booking_form" | "whatsapp" | "phone" | "walk_in";
  status: "new" | "contacted" | "converted" | "closed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── In-Memory Store ──────────────────────────────────────────────────────────

/**
 * In-memory store — module-level singleton.
 * Survives hot module reloads in dev, resets on full page reload.
 *
 * TODO (PRODUCTION): Replace with DB client instance.
 */
const store = {
  bookings: [] as Booking[],
  leads: [] as Lead[],
};

// ─── Seed Data ────────────────────────────────────────────────────────────────

/**
 * Seeds demo bookings for admin dashboard demonstration.
 * TODO (PRODUCTION): Remove this function entirely. Use DB migrations/seeds.
 */
function seedDemoData(): void {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const twoWeeks = new Date(now);
  twoWeeks.setDate(twoWeeks.getDate() + 14);

  store.bookings = [
    {
      id: "demo-001",
      reference: "VDC-25A3K9M",
      patientName: "Adaeze Okonkwo",
      patientEmail: "adaeze.o@gmail.com",
      patientPhone: "+2348023456789",
      serviceId: "dental-scaling-polishing",
      serviceName: "Dental Scaling & Polishing",
      preferredDate: tomorrow.toISOString().split("T")[0]!,
      preferredTime: "10:00",
      notes: "First time patient. Slight sensitivity on upper left.",
      status: "confirmed",
      paymentMethod: "cash",
      createdAt: yesterday.toISOString(),
      updatedAt: yesterday.toISOString(),
    },
    {
      id: "demo-002",
      reference: "VDC-25B7R2P",
      patientName: "Emeka Nwosu",
      patientEmail: "emeka.nwosu@yahoo.com",
      patientPhone: "+2348034567890",
      serviceId: "teeth-whitening",
      serviceName: "Teeth Whitening",
      preferredDate: tomorrow.toISOString().split("T")[0]!,
      preferredTime: "14:00",
      notes: "",
      status: "pending",
      paymentMethod: "paystack",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: "demo-003",
      reference: "VDC-25C1X5N",
      patientName: "Funmilayo Bakare",
      patientEmail: "",
      patientPhone: "+2348045678901",
      serviceId: "pediatric-dentistry",
      serviceName: "Pediatric Dentistry",
      preferredDate: nextWeek.toISOString().split("T")[0]!,
      preferredTime: "09:00",
      notes: "For my 7-year-old daughter. Routine check-up.",
      status: "pending",
      paymentMethod: "hmo",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: "demo-004",
      reference: "VDC-25D8Y6Q",
      patientName: "Chukwuemeka Ibe",
      patientEmail: "c.ibe@company.ng",
      patientPhone: "+2348056789012",
      serviceId: "dental-implants",
      serviceName: "Dental Implants",
      preferredDate: nextWeek.toISOString().split("T")[0]!,
      preferredTime: "11:00",
      notes: "Lost molar on lower right side. Interested in implant options.",
      status: "confirmed",
      paymentMethod: "transfer",
      createdAt: yesterday.toISOString(),
      updatedAt: yesterday.toISOString(),
    },
    {
      id: "demo-005",
      reference: "VDC-25E4Z3W",
      patientName: "Ngozi Anyanwu",
      patientEmail: "ngozi.a@hotmail.com",
      patientPhone: "+2348067890123",
      serviceId: "root-canal-treatment",
      serviceName: "Root Canal Treatment",
      preferredDate: twoWeeks.toISOString().split("T")[0]!,
      preferredTime: "13:00",
      notes: "Severe pain in upper right second premolar since last week.",
      status: "pending",
      paymentMethod: "paystack",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: "demo-006",
      reference: "VDC-25F2L8K",
      patientName: "Oluwafemi Adeleke",
      patientEmail: "femi.adeleke@gmail.com",
      patientPhone: "+2348078901234",
      serviceId: "orthodontics-braces",
      serviceName: "Orthodontics (Braces)",
      preferredDate: yesterday.toISOString().split("T")[0]!,
      preferredTime: "10:30",
      notes: "Interested in ceramic braces. Adult patient.",
      status: "completed",
      paymentMethod: "cash",
      createdAt: new Date(now.getTime() - 7 * 24 * 3600000).toISOString(),
      updatedAt: yesterday.toISOString(),
    },
    {
      id: "demo-007",
      reference: "VDC-25G9M4V",
      patientName: "Blessing Okafor",
      patientEmail: "blessing.o@company.ng",
      patientPhone: "+2348089012345",
      serviceId: "emergency-dental-care",
      serviceName: "Emergency Dental Care",
      preferredDate: yesterday.toISOString().split("T")[0]!,
      preferredTime: "09:00",
      notes: "Broken tooth from accident. In pain.",
      status: "completed",
      paymentMethod: "cash",
      createdAt: yesterday.toISOString(),
      updatedAt: yesterday.toISOString(),
    },
    {
      id: "demo-008",
      reference: "VDC-25H6N7U",
      patientName: "Tunde Fashola",
      patientEmail: "tunde.f@gmail.com",
      patientPhone: "+2348090123456",
      serviceId: "dental-fillings-restorations",
      serviceName: "Dental Fillings & Restorations",
      preferredDate: twoWeeks.toISOString().split("T")[0]!,
      preferredTime: "15:00",
      notes: "Two cavities identified at last check-up elsewhere.",
      status: "cancelled",
      paymentMethod: "cash",
      createdAt: new Date(now.getTime() - 3 * 24 * 3600000).toISOString(),
      updatedAt: now.toISOString(),
    },
  ];

  store.leads = [
    {
      id: "LEAD-100000001",
      name: "Amaka Obi",
      email: "amaka.obi@gmail.com",
      phone: "+2348011234567",
      message: "Please let me know about your teeth whitening packages and pricing.",
      serviceId: "teeth-whitening",
      source: "contact_form",
      status: "new",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: "LEAD-100000002",
      name: "Rotimi Adesanya",
      email: "rotimi.a@yahoo.com",
      phone: "+2348022345678",
      message: "I need urgent dental extraction. Can you see me today?",
      serviceId: "tooth-extraction",
      source: "contact_form",
      status: "contacted",
      notes: "Called back 2PM. Appointment booked via phone.",
      createdAt: yesterday.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: "LEAD-100000003",
      name: "Chinwe Okoye",
      phone: "+2348033456789",
      message: "Interested in braces for my teenage daughter.",
      serviceId: "orthodontics-braces",
      source: "whatsapp",
      status: "new",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
  ];
}

// Seed demo data immediately on module load
seedDemoData();

// ─── Booking CRUD ─────────────────────────────────────────────────────────────

/** Retrieve all bookings, sorted by most recent first. */
export function getAllBookings(): Booking[] {
  return [...store.bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** Find a single booking by its internal ID. */
export function getBookingById(id: string): Booking | undefined {
  return store.bookings.find((b) => b.id === id);
}

/** Find a booking by its human-readable reference (e.g. VDC-25A3K9M). */
export function getBookingByReference(reference: string): Booking | undefined {
  return store.bookings.find(
    (b) => b.reference.toLowerCase() === reference.toLowerCase()
  );
}

/** Insert a new booking record. Returns the created booking. */
export function createBookingRecord(booking: Booking): Booking {
  // TODO (PRODUCTION): INSERT INTO bookings ... RETURNING *
  store.bookings.unshift(booking);
  return booking;
}

/**
 * Update a booking's status and optional Paystack reference.
 * Returns the updated booking or undefined if not found.
 */
export function updateBookingStatus(
  id: string,
  status: BookingStatus,
  paystackReference?: string
): Booking | undefined {
  // TODO (PRODUCTION): UPDATE bookings SET status=$1, updated_at=NOW() WHERE id=$2
  const idx = store.bookings.findIndex((b) => b.id === id);
  if (idx === -1) return undefined;
  const booking = store.bookings[idx];
  if (!booking) return undefined;
  const updated: Booking = {
    ...booking,
    status,
    updatedAt: new Date().toISOString(),
    ...(paystackReference ? { paystackReference } : {}),
  };
  store.bookings[idx] = updated;
  return updated;
}

/** Update arbitrary fields on a booking (admin edit). */
export function updateBookingFields(
  id: string,
  fields: Partial<Omit<Booking, "id" | "reference" | "createdAt">>
): Booking | undefined {
  const idx = store.bookings.findIndex((b) => b.id === id);
  if (idx === -1) return undefined;
  const booking = store.bookings[idx];
  if (!booking) return undefined;
  const updated: Booking = {
    ...booking,
    ...fields,
    updatedAt: new Date().toISOString(),
  };
  store.bookings[idx] = updated;
  return updated;
}

/** Soft-delete a booking by setting status to cancelled. */
export function deleteBookingRecord(id: string): boolean {
  // TODO (PRODUCTION): Implement soft delete: UPDATE bookings SET deleted_at=NOW() WHERE id=$1
  const idx = store.bookings.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  const booking = store.bookings[idx];
  if (booking) {
    store.bookings[idx] = {
      ...booking,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    };
  }
  return true;
}

/** Get bookings by status filter. */
export function getBookingsByStatus(status: BookingStatus): Booking[] {
  return store.bookings
    .filter((b) => b.status === status)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/** Get bookings for a specific date (YYYY-MM-DD). */
export function getBookingsByDate(date: string): Booking[] {
  return store.bookings.filter((b) => b.preferredDate === date);
}

// ─── Aggregate Queries ────────────────────────────────────────────────────────

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  todayCount: number;
  thisWeekCount: number;
  pendingConfirmation: number;
}

/** Compute dashboard statistics from current store state. */
export function getBookingStats(): BookingStats {
  const all = store.bookings;
  const today = new Date().toISOString().split("T")[0]!;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return {
    total: all.length,
    pending: all.filter((b) => b.status === "pending").length,
    confirmed: all.filter((b) => b.status === "confirmed").length,
    completed: all.filter((b) => b.status === "completed").length,
    cancelled: all.filter((b) => b.status === "cancelled").length,
    todayCount: all.filter((b) => b.preferredDate === today).length,
    thisWeekCount: all.filter(
      (b) => new Date(b.createdAt) >= weekAgo
    ).length,
    pendingConfirmation: all.filter((b) => b.status === "pending").length,
  };
}

// ─── Lead CRUD ────────────────────────────────────────────────────────────────

/** Retrieve all leads, newest first. */
export function getAllLeads(): Lead[] {
  return [...store.leads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** Find a lead by ID. */
export function getLeadById(id: string): Lead | undefined {
  return store.leads.find((l) => l.id === id);
}

/** Insert a new lead. */
export function createLeadRecord(lead: Lead): Lead {
  // TODO (PRODUCTION): INSERT INTO leads ...
  store.leads.unshift(lead);
  return lead;
}

/** Update a lead's status and notes. */
export function updateLeadStatus(
  id: string,
  status: Lead["status"],
  notes?: string
): Lead | undefined {
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  const lead = store.leads[idx];
  if (!lead) return undefined;
  const updated: Lead = {
    ...lead,
    status,
    notes: notes ?? lead.notes,
    updatedAt: new Date().toISOString(),
  };
  store.leads[idx] = updated;
  return updated;
}
