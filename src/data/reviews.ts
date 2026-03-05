// =============================================================================
// VINE DENTAL CLINIC — Reviews Data
// Structured from real Google My Business reviews. Marked VERIFIED.
// TODO: Periodically sync with Google My Business API for fresh reviews.
// =============================================================================

import type { Review, RatingAggregate, Testimonial } from "../types/review";

export const REVIEWS: Review[] = [
  {
    id: "review-001",
    authorName: "Fey S.",
    authorInitials: "FS",
    rating: 5,
    body: "Quality work still in place after 4 years. I got a couple of fillings done here and they are still going strong. Also great dentistry work overall — very professional team.",
    excerpt: "Quality work still in place after 4 years. Great dentistry work overall — very professional.",
    source: "google",
    verified: true,
    reviewedAt: "2020-01-01",
    serviceId: "dental-fillings-restorations",
    featured: true,
    mentionsHMO: false,
  },
  {
    id: "review-002",
    authorName: "Chika Ndu",
    authorInitials: "CN",
    rating: 5,
    body: "Well experienced dentist. I have been attending this clinic for 16 years and counting. The quality of care has remained consistently excellent throughout. Highly recommended for families.",
    excerpt: "Well experienced dentist. I have been attending this clinic for 16 years and counting.",
    source: "google",
    verified: true,
    reviewedAt: "2021-03-01",
    patientSince: "16 years",
    featured: true,
    mentionsHMO: false,
  },
  {
    id: "review-003",
    authorName: "Alexander Uzoma",
    authorInitials: "AU",
    rating: 5,
    body: "Professional and friendly team who truly care about their patients. The dentist and staff made me feel completely at ease throughout my treatment. I can now smile confidently. Highly recommend Vine Dental Clinic to anyone looking for quality dental care in Lagos.",
    excerpt: "Professional and friendly. The dentist made me feel at ease. I can now smile confidently.",
    source: "google",
    verified: true,
    reviewedAt: "2022-06-01",
    featured: true,
    mentionsHMO: false,
  },
  {
    id: "review-004",
    authorName: "Oluseyi Adejuyigbe",
    authorInitials: "OA",
    rating: 5,
    body: "Very professional clinic and team. The dentist takes time to explain every procedure clearly before starting. I am very satisfied with the quality of service received at Vine Dental Clinic. Will definitely be returning.",
    excerpt: "Very professional. The dentist explains every procedure clearly. Very satisfied with the service.",
    source: "google",
    verified: true,
    reviewedAt: "2022-09-01",
    featured: false,
    mentionsHMO: false,
  },
  {
    id: "review-005",
    authorName: "Olubunmi Ogunshina",
    authorInitials: "OO",
    rating: 5,
    body: "This clinic has been home to me and my children over the years. The doctor and team's courtesy and attention to detail is top-notch. I trust Vine Dental Clinic completely for all of our family's dental needs.",
    excerpt: "Home to me and my children over the years. Courtesy and attention to detail is top-notch.",
    source: "google",
    verified: true,
    reviewedAt: "2021-11-01",
    patientSince: "Many years",
    featured: true,
    mentionsHMO: false,
  },
  {
    id: "review-006",
    authorName: "Matthew Ajaegbo",
    authorInitials: "MA",
    rating: 5,
    body: "Great dental attention at its finest. The care provided at Vine Dental Clinic is exceptional. From the moment you walk in, the team is welcoming and professional. I would recommend this clinic without hesitation.",
    excerpt: "Great dental attention at its finest. Exceptional care from a welcoming, professional team.",
    source: "google",
    verified: true,
    reviewedAt: "2023-02-01",
    featured: false,
    mentionsHMO: false,
  },
  {
    id: "review-007",
    authorName: "Dike Ogbonnaya",
    authorInitials: "DO",
    rating: 5,
    body: "I came in fearing I would need an extraction, but the dentist advised against it and instead treated the tooth. That was in 2003, and I have had no complaint or issue since then. The expertise and conservative approach here is truly remarkable.",
    excerpt: "Advised not to extract — treated the tooth. That was in 2003 and I've had no complaint since.",
    source: "google",
    verified: true,
    reviewedAt: "2023-05-01",
    patientSince: "2003",
    serviceId: "root-canal-treatment",
    featured: true,
    mentionsHMO: false,
  },
  {
    id: "review-008",
    authorName: "Ayo Stilo Oni",
    authorInitials: "AO",
    rating: 5,
    body: "Very professional and personal service. The dentist takes a genuine interest in your dental health and long-term wellbeing. HMOs are welcomed here — great to know that insurance is accepted. Highly recommended.",
    excerpt: "Very professional and personal. HMOs welcomed. Highly recommended for all dental needs.",
    source: "google",
    verified: true,
    reviewedAt: "2023-08-01",
    featured: true,
    mentionsHMO: true,
  },
];

/** Aggregate rating data */
export const RATING_AGGREGATE: RatingAggregate = {
  average: 4.4,
  total: 12,
  source: "google",
  fetchedAt: "2024-01-01T00:00:00Z",
  distribution: {
    5: 10,
    4: 1,
    3: 0,
    2: 0,
    1: 1,
  },
};

/** Get featured reviews for homepage carousel */
export function getFeaturedReviews(limit = 6): Review[] {
  return REVIEWS.filter((r) => r.featured).slice(0, limit);
}

/** Get all reviews sorted by most recent */
export function getAllReviews(): Review[] {
  return [...REVIEWS].sort(
    (a, b) => new Date(b.reviewedAt).getTime() - new Date(a.reviewedAt).getTime()
  );
}

// =============================================================================
// TESTIMONIALS — Curated marketing-optimised versions of reviews
// =============================================================================

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-001",
    reviewId: "review-002",
    quote: "Well experienced dentist. I have been attending this clinic for 16 years and counting. The quality of care has remained consistently excellent.",
    authorName: "Chika Ndu",
    authorTitle: "Patient for 16+ years",
    authorInitials: "CN",
    rating: 5,
    highlightedService: "General Dentistry",
    featured: true,
    order: 1,
  },
  {
    id: "testimonial-002",
    reviewId: "review-007",
    quote: "I came in fearing I would need an extraction, but the dentist advised against it and treated the tooth. That was in 2003, and I've had no complaint since.",
    authorName: "Dike Ogbonnaya",
    authorTitle: "Patient since 2003",
    authorInitials: "DO",
    rating: 5,
    highlightedService: "Root Canal Treatment",
    featured: true,
    order: 2,
  },
  {
    id: "testimonial-003",
    reviewId: "review-005",
    quote: "This clinic has been home to me and my children over the years. The courtesy and attention to detail is top-notch.",
    authorName: "Olubunmi Ogunshina",
    authorTitle: "Family Patient",
    authorInitials: "OO",
    rating: 5,
    highlightedService: "Pediatric Dentistry",
    featured: true,
    order: 3,
  },
  {
    id: "testimonial-004",
    reviewId: "review-003",
    quote: "Professional and friendly team who truly care about their patients. I can now smile confidently. Highly recommend Vine Dental Clinic.",
    authorName: "Alexander Uzoma",
    authorTitle: "Verified Patient",
    authorInitials: "AU",
    rating: 5,
    highlightedService: "Dental Restoration",
    featured: true,
    order: 4,
  },
  {
    id: "testimonial-005",
    reviewId: "review-001",
    quote: "Quality work still in place after 4 years. I got fillings done here and they are still going strong. Great dentistry work overall.",
    authorName: "Fey S.",
    authorTitle: "Verified Patient",
    authorInitials: "FS",
    rating: 5,
    highlightedService: "Dental Fillings",
    featured: true,
    order: 5,
  },
  {
    id: "testimonial-006",
    reviewId: "review-008",
    quote: "Very professional and personal service. The dentist takes a genuine interest in your dental health. HMOs are welcomed here.",
    authorName: "Ayo Stilo Oni",
    authorTitle: "Verified Patient",
    authorInitials: "AO",
    rating: 5,
    highlightedService: "General Dentistry",
    featured: true,
    order: 6,
  },
];
