// =============================================================================
// VINE DENTAL CLINIC — Review & Testimonial Types
// =============================================================================

/**
 * Where the review was originally posted.
 */
export type ReviewSource = "google" | "facebook" | "internal" | "verified_patient";

/**
 * Core review entity — structured from real patient reviews.
 */
export interface Review {
  id: string;
  authorName: string;
  /** Reviewer's initials for avatar fallback */
  authorInitials: string;
  /** Optional avatar URL — TODO: do not use real photos without explicit consent */
  authorAvatarUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;                   // Full review text
  /** Short excerpt for cards (max 120 chars) */
  excerpt: string;
  source: ReviewSource;
  /** Marks reviews collected from Google My Business */
  verified: boolean;
  /** ISO date string — use approximate year if exact date unknown */
  reviewedAt: string;
  /** ID of service mentioned, if identifiable */
  serviceId?: string;
  /** Approximate tenure as a patient */
  patientSince?: string;          // e.g. "2003", "16 years"
  /** Whether to feature on homepage hero / testimonial carousel */
  featured: boolean;
  /** Whether HMO usage was mentioned — for social proof targeting */
  mentionsHMO?: boolean;
}

/**
 * Aggregate rating summary for structured data / display.
 */
export interface RatingAggregate {
  average: number;                // e.g. 4.4
  total: number;                  // Total review count
  source: ReviewSource;
  /** ISO datetime of last fetch — for cache invalidation */
  fetchedAt: string;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

/**
 * Testimonial — a curated review formatted specifically for marketing display.
 * May be derived from a Review but with added context.
 */
export interface Testimonial {
  id: string;
  reviewId: string;               // Links back to source Review
  quote: string;                  // Curated quote — may be shorter than full review
  authorName: string;
  authorTitle?: string;           // e.g. "Patient since 2003", "Parent of 2"
  authorInitials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Service this testimonial best supports */
  highlightedService?: string;
  featured: boolean;
  order: number;                  // Display order in carousel
}
