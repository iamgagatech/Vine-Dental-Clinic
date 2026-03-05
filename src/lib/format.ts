// =============================================================================
// VINE DENTAL CLINIC — Formatting Utilities
// =============================================================================

/**
 * Format a phone number for display.
 * Input: +2348023657067 → Output: +234 802 365 7067
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("234") && cleaned.length === 13) {
    return `+234 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
}

/**
 * Format a date string for display.
 * mode "display" → "Monday, 15 January 2025"
 * mode "short"   → "15 Jan 2025"
 * mode "input"   → "2025-01-15"
 */
export function formatDate(
  dateStr: string,
  mode: "display" | "short" | "input" = "display"
): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  if (mode === "input") {
    return date.toISOString().split("T")[0] ?? dateStr;
  }
  if (mode === "short") {
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a number as Nigerian Naira.
 * formatCurrency(15000) → "₦15,000"
 * formatCurrency(15000, true) → "₦15,000.00"
 */
export function formatCurrency(
  amount: number,
  showDecimals = false
): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * Format a price range for display.
 * { min: 5000, max: 15000 } → "₦5,000 – ₦15,000"
 */
export function formatPriceRange(
  min: number,
  max: number,
  fromOnly = false
): string {
  if (fromOnly) return `From ${formatCurrency(min)}`;
  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

/**
 * Generate a booking reference.
 * Format: VDC-YYYY-XXXXX
 */
export function generateBookingRef(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `VDC-${year}-${random}`;
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Convert minutes to a human-readable duration.
 * 90 → "1 hr 30 mins"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} mins`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} mins`;
}
