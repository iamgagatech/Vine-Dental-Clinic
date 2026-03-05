// =============================================================================
// VINE DENTAL CLINIC — Application Constants
// Single source of truth for clinic info, hours, navigation, and services list.
// =============================================================================

import type { ServiceSummary } from "../types/service";

// ─── Clinic Information ───────────────────────────────────────────────────────

export const CLINIC_INFO = {
  name: "Vine Dental Clinic",
  tagline: "Trusted Dental Care Since 1995",
  shortTagline: "Your Smile. Our Mission.",
  established: 1995,
  description:
    "Vine Dental Clinic has been delivering compassionate, high-quality dental care to families in Ikeja GRA and across Lagos since 1995. From routine check-ups to complex restorations, our experienced team is dedicated to your long-term oral health.",

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    phone: "+2348023657067",
    /** Formatted for display: breaks after country code */
    phoneDisplay: "+234 802 365 7067",
    /** Stripped digits for tel: href */
    phoneTel: "+2348023657067",
    email: "vinedentalclinic@yahoo.co.uk",
    whatsapp: "2348023657067",       // No leading +, Paystack/WA format
  },

  // ── Location ─────────────────────────────────────────────────────────────
  address: {
    street: "42 Oduduwa Crescent",
    area: "Ikeja GRA",
    city: "Lagos",
    state: "Lagos State",
    country: "Nigeria",
    postalCode: "101233",
    /** Single-line display address */
    full: "42 Oduduwa Crescent, Ikeja GRA, Lagos 101233, Nigeria",
    /** Short form for cards */
    short: "Ikeja GRA, Lagos",
    /** Google Maps embed URL — TODO: replace with actual Maps embed key */
    mapsUrl: "https://maps.google.com/?q=42+Oduduwa+Crescent+Ikeja+GRA+Lagos+Nigeria",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.397!2d3.3488!3d6.5965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmluZSBEZW50YWwgQ2xpbmlj!5e0!3m2!1sen!2sng!4v1234567890",
    // TODO: Replace mapsEmbedUrl with actual embed URL from Google Maps console
  },

  // ── Business Hours ────────────────────────────────────────────────────────
  hours: {
    monday:    { open: "09:00", close: "16:00", label: "9:00 AM – 4:00 PM" },
    tuesday:   { open: "09:00", close: "16:00", label: "9:00 AM – 4:00 PM" },
    wednesday: { open: "09:00", close: "16:00", label: "9:00 AM – 4:00 PM" },
    thursday:  { open: "09:00", close: "16:00", label: "9:00 AM – 4:00 PM" },
    friday:    { open: "09:00", close: "16:00", label: "9:00 AM – 4:00 PM" },
    saturday:  { open: "09:00", close: "16:00", label: "9:00 AM – 4:00 PM" },
    sunday:    { open: null,    close: null,    label: "Closed" },
  },

  /** Human-readable hours summary for footer / contact page */
  hoursDisplay: "Mon – Sat: 9:00 AM – 4:00 PM  |  Sunday: Closed",

  // ── Ratings & Social Proof ────────────────────────────────────────────────
  rating: {
    score: 4.4,
    totalReviews: 12,
    source: "Google",
    /** TODO: Replace with actual Google Place ID */
    googlePlaceId: "ChIJ_REPLACE_WITH_REAL_PLACE_ID",
    googleReviewsUrl: "https://g.page/vine-dental-clinic-lagos/review",
  },

  // ── Social Media ──────────────────────────────────────────────────────────
  social: {
    // TODO: Confirm and add real social media handles
    facebook:  null as string | null,
    instagram: null as string | null,
    twitter:   null as string | null,
    linkedin:  null as string | null,
  },

  // ── Payment ───────────────────────────────────────────────────────────────
  payment: {
    acceptedMethods: ["paystack", "cash", "hmo", "transfer"] as const,
    currency: "NGN" as const,
    currencySymbol: "₦",
    /** TODO: Set your Paystack public key in .env as VITE_PAYSTACK_PUBLIC_KEY */
    paystackPublicKey: (import.meta as unknown as { env: Record<string, string> }).env["VITE_PAYSTACK_PUBLIC_KEY"] ?? "",
  },

  // ── SEO Defaults ─────────────────────────────────────────────────────────
  seo: {
    siteName: "Vine Dental Clinic",
    defaultTitle: "Vine Dental Clinic | Trusted Dental Care in Ikeja GRA, Lagos",
    titleTemplate: "%s | Vine Dental Clinic Lagos",
    defaultDescription:
      "Professional dental care in Ikeja GRA, Lagos since 1995. Book appointments for scaling, implants, orthodontics, whitening & more. HMOs accepted. Call +2348023657067.",
    siteUrl: (import.meta as unknown as { env: Record<string, string> }).env["VITE_SITE_URL"] ?? "https://vinedentalclinic.com.ng",
    // TODO: Replace siteUrl with your production domain
    ogImage: "/images/og-default.jpg",
    twitterHandle: "@vinedentallagos",
    locale: "en_NG",
  },
} as const;

// ─── Business Hours Utility ───────────────────────────────────────────────────

type DayKey = keyof typeof CLINIC_INFO.hours;
const DAY_KEYS: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/**
 * Returns whether the clinic is currently open based on the system clock.
 * NOTE: This uses the user's local timezone — for production, use a server-side
 * check or specify Africa/Lagos timezone explicitly.
 */
export function isClinicOpenNow(): boolean {
  const now = new Date();
  const dayKey = DAY_KEYS[now.getDay()];
  const todayHours = CLINIC_INFO.hours[dayKey];

  if (!todayHours.open || !todayHours.close) return false;

  const [openH, openM]   = todayHours.open.split(":").map(Number);
  const [closeH, closeM] = todayHours.close.split(":").map(Number);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes  = (openH ?? 0) * 60 + (openM ?? 0);
  const closeMinutes = (closeH ?? 0) * 60 + (closeM ?? 0);

  return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
}

/**
 * Returns today's opening hours label.
 */
export function getTodayHours(): string {
  const now = new Date();
  const dayKey = DAY_KEYS[now.getDay()];
  return CLINIC_INFO.hours[dayKey].label;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    exact: true,
  },
  {
    label: "Services",
    href: "/services",
    exact: false,
    hasDropdown: true,
    children: [
      { label: "Dental Scaling & Polishing", href: "/services/dental-scaling-polishing" },
      { label: "Teeth Whitening",            href: "/services/teeth-whitening" },
      { label: "Dental Implants",            href: "/services/dental-implants" },
      { label: "Orthodontics (Braces)",      href: "/services/orthodontics-braces" },
      { label: "Root Canal Treatment",       href: "/services/root-canal-treatment" },
      { label: "Dental Fillings",            href: "/services/dental-fillings-restorations" },
      { label: "Crowns & Bridges",           href: "/services/crowns-bridges" },
      { label: "Tooth Extraction",           href: "/services/tooth-extraction" },
      { label: "Emergency Dental Care",      href: "/services/emergency-dental-care" },
      { label: "Pediatric Dentistry",        href: "/services/pediatric-dentistry" },
    ],
  },
  {
    label: "About",
    href: "/about",
    exact: false,
    hasDropdown: false,
  },
  {
    label: "Reviews",
    href: "/reviews",
    exact: false,
    hasDropdown: false,
  },
  {
    label: "Contact",
    href: "/contact",
    exact: false,
    hasDropdown: false,
  },
] as const;

// ─── Services Summary (for selects, cards, nav) ───────────────────────────────

/**
 * Lightweight service list for dropdowns and navigation.
 * Full data lives in /data/services.ts.
 */
export const SERVICES_SUMMARY: ServiceSummary[] = [
  {
    id: "dental-scaling-polishing",
    name: "Dental Scaling & Polishing",
    slug: "dental-scaling-polishing",
    category: "preventive",
    icon: "Sparkles",
    shortDescription: "Remove stubborn stains and plaque for a brighter, healthier smile in one visit.",
    duration: "45-60 mins",
  },
  {
    id: "tooth-extraction",
    name: "Tooth Extraction",
    slug: "tooth-extraction",
    category: "surgical",
    icon: "Scissors",
    shortDescription: "Safe, painless removal with expert aftercare guidance for fast, comfortable recovery.",
    duration: "30-60 mins",
  },
  {
    id: "dental-fillings-restorations",
    name: "Dental Fillings & Restorations",
    slug: "dental-fillings-restorations",
    category: "restorative",
    icon: "Shield",
    shortDescription: "Restore damaged teeth with durable, natural-looking materials that last for years.",
    duration: "30-60 mins",
  },
  {
    id: "root-canal-treatment",
    name: "Root Canal Treatment",
    slug: "root-canal-treatment",
    category: "surgical",
    icon: "Activity",
    shortDescription: "Save your natural tooth and eliminate pain permanently with modern root canal therapy.",
    duration: "60-90 mins",
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    slug: "teeth-whitening",
    category: "cosmetic",
    icon: "Sun",
    shortDescription: "Professional whitening for visibly brighter teeth in under an hour. Immediate results.",
    duration: "45-60 mins",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    slug: "dental-implants",
    category: "restorative",
    icon: "Anchor",
    shortDescription: "Permanent tooth replacement that looks, feels, and functions exactly like natural teeth.",
    duration: "Multiple visits",
  },
  {
    id: "orthodontics-braces",
    name: "Orthodontics (Braces)",
    slug: "orthodontics-braces",
    category: "orthodontic",
    icon: "GitMerge",
    shortDescription: "Straighten teeth and correct bite issues for a confident, lasting smile you'll love.",
    duration: "12-24 months",
  },
  {
    id: "crowns-bridges",
    name: "Crowns & Bridges",
    slug: "crowns-bridges",
    category: "restorative",
    icon: "Crown",
    shortDescription: "Custom restorations crafted to blend seamlessly with your natural teeth in shape and colour.",
    duration: "2 visits",
  },
  {
    id: "emergency-dental-care",
    name: "Emergency Dental Care",
    slug: "emergency-dental-care",
    category: "emergency",
    icon: "AlertCircle",
    shortDescription: "Same-day relief for sudden dental pain, broken teeth, or dental injuries. We're here.",
    duration: "Same day",
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    slug: "pediatric-dentistry",
    category: "pediatric",
    icon: "Heart",
    shortDescription: "Gentle, child-friendly dental care in a warm, comfortable environment kids actually enjoy.",
    duration: "30-45 mins",
  },
];

// ─── Appointment Time Slots ───────────────────────────────────────────────────

/** Available booking times (Mon–Sat, 9AM–4PM, 30-min intervals) */
export const APPOINTMENT_TIMES = [
  { value: "09:00", label: "9:00 AM" },
  { value: "09:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  // Last slot 30 mins before close
] as const;

// ─── Misc App Config ──────────────────────────────────────────────────────────

export const APP_CONFIG = {
  /** Maximum notes length in booking form */
  maxNotesLength: 500,
  /** How many reviews to show on homepage */
  homepageReviewCount: 6,
  /** Days ahead a patient can book */
  maxBookingDaysAhead: 60,
  /** Minimum hours notice required for a booking */
  minBookingHoursNotice: 2,
  /** Toast auto-dismiss duration in ms */
  toastDuration: 5000,
  /** Debounce delay for search/filter inputs in ms */
  debounceDelay: 300,
} as const;
