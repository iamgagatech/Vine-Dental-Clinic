// =============================================================================
// VINE DENTAL CLINIC — Testimonial Card Component
// =============================================================================

import { cn } from "../../lib/cn";
import { StarRating } from "./StarRating";
import type { Review } from "../../types/review";
import type { Testimonial } from "../../types/review";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const colours = [
    "bg-teal-100 text-teal-700",
    "bg-amber-100 text-amber-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-green-100 text-green-700",
  ];
  const index = initials.charCodeAt(0) % colours.length;
  const colour = colours[index];

  const sizeMap = { sm: "h-9 w-9 text-sm", md: "h-11 w-11 text-base", lg: "h-14 w-14 text-lg" };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold shrink-0",
        colour,
        sizeMap[size]
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ─── Quote Icon ───────────────────────────────────────────────────────────────

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-8 text-teal-100", className)}
      fill="currentColor"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────

interface ReviewCardProps {
  review: Review;
  compact?: boolean;
  className?: string;
}

export function ReviewCard({ review, compact = false, className }: ReviewCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col relative overflow-hidden",
        className
      )}
      aria-label={`Review by ${review.authorName}`}
    >
      <QuoteIcon className="absolute top-4 right-4 opacity-60" />

      {/* Stars */}
      <div className="mb-3">
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">
        &ldquo;{compact ? review.excerpt : review.body}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <Avatar initials={review.authorInitials} size="sm" />
        <div>
          <div className="font-semibold text-gray-900 text-sm">{review.authorName}</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {review.patientSince && (
              <span>Patient for {review.patientSince}</span>
            )}
            {review.verified && (
              <span className="inline-flex items-center gap-0.5 text-green-700">
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified Google
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Testimonial Card (marketing-optimised) ────────────────────────────────────

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-2xl shadow-md p-7 flex flex-col relative overflow-hidden",
        "border border-gray-100",
        className
      )}
      aria-label={`Testimonial from ${testimonial.authorName}`}
    >
      <QuoteIcon className="absolute top-5 right-5" />

      <StarRating rating={testimonial.rating} size="sm" className="mb-4" />

      <blockquote className="text-gray-800 leading-relaxed flex-1 mb-6 text-base font-medium">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 mt-auto">
        <Avatar initials={testimonial.authorInitials} />
        <div>
          <div className="font-bold text-gray-900">{testimonial.authorName}</div>
          {testimonial.authorTitle && (
            <div className="text-sm text-gray-500">{testimonial.authorTitle}</div>
          )}
        </div>
      </div>
    </article>
  );
}
