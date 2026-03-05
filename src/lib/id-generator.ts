// =============================================================================
// VINE DENTAL CLINIC — Booking Reference & ID Generator
// Generates unique, human-readable booking references and internal IDs.
// =============================================================================

/**
 * Generates a unique booking reference in VDC-XXXXXX format.
 * Alphanumeric, uppercase, URL-safe — easy to read over the phone.
 *
 * Format: VDC-[YEAR_SHORT][5 random alphanumeric chars]
 * Example: VDC-25A3K9M
 *
 * NOTE: This is a client-side generator suitable for demo/MVP.
 * TODO (PRODUCTION): Generate server-side with collision checking against DB.
 *       Use a distributed ID strategy (nanoid + DB unique constraint) or
 *       a sequential counter with prefix: VDC-2025-000001.
 */
export function generateBookingReference(): string {
  const yearShort = String(new Date().getFullYear()).slice(2); // "25"
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous: 0/O, 1/I
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VDC-${yearShort}${random}`;
}

/**
 * Generates a UUID v4-like string for internal record IDs.
 * Uses crypto.randomUUID() when available (modern browsers), falls back to Math.random().
 *
 * TODO (PRODUCTION): Replace with DB-generated UUIDs / auto-increment IDs.
 */
export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generates a short, numeric lead ID.
 * Format: LEAD-XXXXXXXXX (9 digit epoch fragment)
 */
export function generateLeadId(): string {
  const epochFragment = String(Date.now()).slice(-9);
  return `LEAD-${epochFragment}`;
}

/**
 * Validates that a string looks like a Vine Dental booking reference.
 * Useful for lookup forms and admin search.
 */
export function isValidBookingReference(ref: string): boolean {
  return /^VDC-\d{2}[A-Z0-9]{5}$/.test(ref);
}
