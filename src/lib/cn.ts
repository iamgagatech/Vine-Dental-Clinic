// =============================================================================
// VINE DENTAL CLINIC — Class Name Utility
// Combines clsx (conditional classes) + tailwind-merge (conflict resolution).
// =============================================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely, resolving conflicts automatically.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary-500", className)
 * cn("text-sm text-gray-500", "text-base") // → "text-base" (conflict resolved)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
