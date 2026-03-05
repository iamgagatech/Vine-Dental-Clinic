// =============================================================================
// VINE DENTAL CLINIC — Reviews Page
// All Google reviews displayed with rating summary and CTA.
// =============================================================================

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllReviews, RATING_AGGREGATE } from "../data/reviews";
import { CLINIC_INFO } from "../lib/constants";
import { trackBookCTAClick } from "../lib/analytics";

function StarDisplay({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-7 w-7" };
  const cls = sizes[size];
  return (
    <div className="flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`${cls} ${s <= rating ? "text-amber-400" : "text-gray-200"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsPage() {
  const reviews = getAllReviews();

  useEffect(() => {
    document.title = "Patient Reviews | Vine Dental Clinic Lagos";
  }, []);

  const distribution = RATING_AGGREGATE.distribution;
  const total = RATING_AGGREGATE.total;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Patient Reviews</h1>
          <p className="text-teal-100 text-lg max-w-xl mx-auto">
            Real experiences from real patients. See why Lagos families have trusted Vine Dental Clinic for over 28 years.
          </p>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Overall score */}
            <div className="text-center sm:pr-8 sm:border-r sm:border-gray-100">
              <p className="text-7xl font-extrabold text-teal-700 leading-none">
                {RATING_AGGREGATE.average}
              </p>
              <StarDisplay rating={4} size="lg" />
              <p className="text-sm text-gray-500 mt-1">{total} Google reviews</p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <img src="https://www.google.com/favicon.ico" alt="" className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs text-gray-500 font-medium">Google</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">VERIFIED</span>
              </div>
            </div>

            {/* Distribution */}
            <div className="flex-1 w-full space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star as keyof typeof distribution] ?? 0;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-4 text-right">{star}</span>
                    <svg className="h-3.5 w-3.5 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                        aria-label={`${pct}% of reviews are ${star} stars`}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href={CLINIC_INFO.rating.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-teal-700 font-semibold hover:text-teal-800 transition-colors underline underline-offset-2"
            >
              View all reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                aria-label={`Review by ${review.authorName}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <StarDisplay rating={review.rating} size="sm" />
                  <div className="flex items-center gap-1">
                    <img src="https://www.google.com/favicon.ico" alt="" className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="text-xs text-gray-400">Google</span>
                    {review.verified && (
                      <span className="text-xs bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded font-medium ml-1">✓ Verified</span>
                    )}
                  </div>
                </div>

                <blockquote className="flex-1 text-sm text-gray-600 leading-relaxed mb-4 italic">
                  "{review.excerpt}"
                </blockquote>

                <footer className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div
                    className="h-9 w-9 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {review.authorInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.authorName}</p>
                    {review.patientSince && (
                      <p className="text-xs text-teal-600">Patient for {review.patientSince}</p>
                    )}
                    {review.mentionsHMO && (
                      <p className="text-xs text-blue-600">Mentions HMO</p>
                    )}
                  </div>
                </footer>
              </article>
            ))}
          </div>

          {/* Leave review CTA */}
          <div className="text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Had a Great Experience?
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
              Your review helps other Lagos families find quality dental care. Share your experience on Google.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={CLINIC_INFO.rating.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 transition-colors"
              >
                Leave a Google Review
              </a>
              <Link
                to="/book"
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl border-2 border-teal-200 text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors"
                onClick={() => trackBookCTAClick("reviews_page")}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
