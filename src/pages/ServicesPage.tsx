// =============================================================================
// VINE DENTAL CLINIC — Services Listing Page
// All 10 services with category filters and booking CTAs.
// =============================================================================

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "../data/services";
import { formatPriceRange } from "../lib/format";
import { generateWhatsAppLink } from "../lib/whatsapp";
import { trackWhatsAppClick, trackBookCTAClick } from "../lib/analytics";
import { cn } from "../lib/cn";

const CATEGORIES = [
  { value: "all", label: "All Services" },
  { value: "preventive", label: "Preventive" },
  { value: "restorative", label: "Restorative" },
  { value: "cosmetic", label: "Cosmetic" },
  { value: "surgical", label: "Surgical" },
  { value: "orthodontic", label: "Orthodontic" },
  { value: "pediatric", label: "Pediatric" },
  { value: "emergency", label: "Emergency" },
] as const;

const SERVICE_ICONS: Record<string, React.ReactElement> = {
  Sparkles: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Sun: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="5" /><path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  Anchor: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="5" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13M5 12H2a10 10 0 0020 0h-3M5 12a7 7 0 0014 0" />
    </svg>
  ),
  Heart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  GitMerge: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M6 9v6" /><circle cx="18" cy="9" r="3" /><path d="M18 12v0a6 6 0 01-6 6H9" strokeLinecap="round" /><path d="M6 9a6 6 0 016 6" strokeLinecap="round" />
    </svg>
  ),
  Shield: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  AlertCircle: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4M12 16h.01" />
    </svg>
  ),
  Crown: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l3-8 4 5 3-7 4 10H3zM3 17h18" />
    </svg>
  ),
  Activity: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Scissors: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path strokeLinecap="round" d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
    </svg>
  ),
};

const DefaultIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const CATEGORY_COLORS: Record<string, string> = {
  preventive: "bg-blue-50 text-blue-700 border-blue-100",
  restorative: "bg-purple-50 text-purple-700 border-purple-100",
  cosmetic: "bg-amber-50 text-amber-700 border-amber-100",
  surgical: "bg-red-50 text-red-700 border-red-100",
  orthodontic: "bg-indigo-50 text-indigo-700 border-indigo-100",
  pediatric: "bg-pink-50 text-pink-700 border-pink-100",
  emergency: "bg-orange-50 text-orange-700 border-orange-100",
};

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    document.title = "Dental Services | Vine Dental Clinic Lagos";
  }, []);

  const filtered =
    activeCategory === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-700 text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Comprehensive Dental Services
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
            From routine check-ups to advanced restorations — we provide complete dental care for every member of your family under one roof.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-400 transition-all shadow-lg"
              onClick={() => trackBookCTAClick("hero")}
            >
              Book Appointment
            </Link>
            <a
              href={generateWhatsAppLink({ context: "general" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 transition-all border border-white/30"
              onClick={() => trackWhatsAppClick("hero")}
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-100 sticky top-16 sm:top-[52px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "shrink-0 h-9 px-4 rounded-full text-sm font-medium transition-all border",
                  activeCategory === cat.value
                    ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-700"
                )}
                aria-pressed={activeCategory === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-6">
            Showing {filtered.length} service{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all" && ` in ${activeCategory}`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <article
                key={service.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-teal-200 transition-all duration-200 flex flex-col"
              >
                {/* Card Header */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      {SERVICE_ICONS[service.icon] ?? DefaultIcon}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full border capitalize",
                        CATEGORY_COLORS[service.category] ?? "bg-gray-50 text-gray-600 border-gray-100"
                      )}
                    >
                      {service.category}
                    </span>
                  </div>

                  <h2 className="font-bold text-gray-900 text-lg mb-2">
                    {service.name}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.duration}
                    </span>
                    {service.sameDayAvailable && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
                        Same-day
                      </span>
                    )}
                    {service.hmoEligible && (
                      <span className="text-xs text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                        HMO
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <p className="text-sm font-semibold text-teal-700">
                    {formatPriceRange(service.priceRange.min, service.priceRange.max, service.priceRange.fromOnly)}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 flex gap-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex-1 h-10 flex items-center justify-center rounded-lg border-2 border-teal-700 text-teal-700 text-sm font-semibold hover:bg-teal-700 hover:text-white transition-all"
                  >
                    Learn More
                  </Link>
                  <Link
                    to={`/book?service=${service.id}`}
                    className="flex-1 h-10 flex items-center justify-center rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition-colors"
                    onClick={() => trackBookCTAClick(`service_card_${service.id}`)}
                  >
                    Book Now
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No services found in this category.</p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-teal-700 font-semibold hover:underline"
              >
                View all services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-teal-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-teal-200 mb-6">
            Our friendly team can help you find the right treatment. Book a consultation or chat with us on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-400 transition-all"
            >
              Book a Consultation
            </Link>
            <a
              href={generateWhatsAppLink({ context: "general" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 transition-all border border-white/30"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
