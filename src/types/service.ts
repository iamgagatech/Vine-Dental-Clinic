// =============================================================================
// VINE DENTAL CLINIC — Service Types
// =============================================================================

/**
 * Top-level groupings shown in the navigation / services menu.
 */
export type ServiceCategory =
  | "preventive"       // Scaling, polishing, check-ups
  | "restorative"      // Fillings, crowns, bridges, implants
  | "cosmetic"         // Whitening, veneers
  | "orthodontic"      // Braces, aligners
  | "surgical"         // Extractions, root canals
  | "emergency"        // Same-day urgent care
  | "pediatric";       // Children's dentistry

/**
 * Indicative price range shown to patients before consultation.
 * All values in Nigerian Naira (NGN).
 */
export interface PriceRange {
  min: number;         // Minimum indicative price
  max: number;         // Maximum indicative price
  currency: "NGN";
  /** When true, shows "From ₦X" instead of a range */
  fromOnly?: boolean;
  /** Override display string, e.g. "Price on consultation" */
  label?: string;
}

/**
 * SEO-friendly metadata attached to each service.
 */
export interface ServiceSEO {
  metaTitle: string;
  metaDescription: string;        // 150-160 chars
  keywords: string[];
  /** Structured data type for JSON-LD */
  schemaType: "MedicalProcedure" | "Service";
}

/**
 * Core service entity — single source of truth for all service data.
 * Consumed by: service cards, service pages, booking form, sitemap.
 */
export interface Service {
  id: string;
  name: string;
  slug: string;                   // URL-safe, e.g. "dental-scaling-polishing"
  category: ServiceCategory;
  icon: string;                   // Lucide icon name or emoji fallback
  /** 15-20 word benefit-focused tagline shown on cards */
  shortDescription: string;
  /** Full rich description for the service detail page (2-3 paragraphs) */
  fullDescription: string;
  /** 3-4 bullet points highlighting patient benefits */
  benefits: string[];
  priceRange: PriceRange;
  /** Typical appointment duration */
  duration: string;               // e.g. "45-60 mins", "1-2 hours"
  /** CTA button copy on the booking form */
  bookingCTA: string;
  /** Whether this service requires prior consultation */
  requiresConsultation: boolean;
  /** Whether same-day appointment is possible */
  sameDayAvailable: boolean;
  /** Whether HMO plans typically cover this service */
  hmoEligible: boolean;
  seo: ServiceSEO;
  /** Display order on the services page */
  order: number;
  featured: boolean;              // Show on homepage services section
}

/**
 * Lightweight version used in navigation dropdowns and booking select inputs.
 */
export type ServiceSummary = Pick<
  Service,
  "id" | "name" | "slug" | "category" | "icon" | "shortDescription" | "duration"
>;

/**
 * Services grouped by category for structured display.
 */
export interface ServicesByCategory {
  category: ServiceCategory;
  label: string;
  services: Service[];
}
