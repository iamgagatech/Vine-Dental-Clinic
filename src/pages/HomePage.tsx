// =============================================================================
// VINE DENTAL CLINIC — Homepage (Unified, No Duplicate Sections)
// Hero → Services → Why Us → Patient Stories (merged) → FAQ → CTA → Contact
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackViewHome, trackWhatsAppClick, trackBookCTAClick, trackCallClick } from "../lib/analytics";
import { generateWhatsAppLink, WHATSAPP_EMERGENCY_LINK } from "../lib/whatsapp";
import { CLINIC_INFO } from "../lib/constants";
import { getFeaturedServices } from "../data/services";
import { getFeaturedReviews, RATING_AGGREGATE, TESTIMONIALS } from "../data/reviews";
import { getAllFAQs } from "../data/faqs";
import { formatPriceRange } from "../lib/format";
import { FAQAccordion } from "../components/ui/FAQAccordion";
import { cn } from "../lib/cn";

// ─── Tooth SVG Icon ───────────────────────────────────────────────────────────

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C9.5 2 7.5 3.8 7 5.5 6.5 3.8 4.5 2 2 2 1 2 0 3 0 5c0 4 3 7 7 9l5 3 5-3c4-2 7-5 7-9 0-2-1-3-2-3-2.5 0-4.5 1.8-5 3.5C16.5 3.8 14.5 2 12 2z" opacity="0.15"/>
      <path d="M12 3.5c-1.8 0-3.2 1.2-3.8 2.8-.1.3-.5.3-.6 0C7.1 4.7 5.7 3.5 4 3.5c-.8 0-1.5.7-1.5 1.5 0 3.2 2.5 5.8 5.5 7.5L12 15l4-2.5c3-1.7 5.5-4.3 5.5-7.5 0-.8-.7-1.5-1.5-1.5-1.7 0-3.1 1.2-3.7 2.8-.1.3-.5.3-.6 0C15.2 4.7 13.8 3.5 12 3.5z"/>
    </svg>
  );
}

// ─── Star component ───────────────────────────────────────────────────────────

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <div className="flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={cn(sz, s <= rating ? "text-amber-400" : "text-gray-200")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const waLink = generateWhatsAppLink({ context: "hero" });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a5759 0%, #0D7377 40%, #0f8a8f 70%, #1a6b6e 100%)",
      }}
      aria-labelledby="hero-heading"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-400/5 blur-3xl" />
        {/* Decorative tooth pattern */}
        <div className="absolute top-8 right-8 opacity-5">
          <ToothIcon className="h-48 w-48 text-white" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-5 rotate-12">
          <ToothIcon className="h-32 w-32 text-white" />
        </div>
      </div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/95 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/25 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              Now Accepting Appointments · Mon–Sat 9AM–4PM
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              Trusted Dental Care{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-amber-300">Since 1995</span>
                <span className="absolute bottom-1 left-0 right-0 h-2 bg-amber-400/20 rounded-full -z-0" />
              </span>
              <br />
              <span className="text-teal-200">Healthier Smiles</span>
              <br />
              Start Here
            </h1>

            <p className="text-lg sm:text-xl text-teal-100/90 mb-8 max-w-xl leading-relaxed">
              Expert dentists in Ikeja GRA delivering gentle, professional treatment for the whole family — from first teeth to lifetime care.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/book"
                className="group inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-2xl bg-amber-500 text-white font-bold text-base hover:bg-amber-400 active:bg-amber-600 transition-all duration-200 shadow-xl shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
                onClick={() => trackBookCTAClick("hero")}
              >
                <svg className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-2xl bg-white/15 text-white font-semibold text-base hover:bg-white/25 active:bg-white/20 transition-all duration-200 border border-white/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                onClick={() => trackWhatsAppClick("hero")}
              >
                <svg className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: "🏆", text: "28+ Years Experience" },
                { icon: "⭐", text: "4.4★ Google Rating" },
                { icon: "🦷", text: "State-of-the-Art Clinic" },
                { icon: "💳", text: "HMOs Accepted" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 bg-white/12 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 hover:bg-white/20 transition-colors"
                >
                  <span aria-hidden="true" className="text-sm">{badge.icon}</span>
                  <span className="text-xs font-semibold text-white/90 whitespace-nowrap">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Glassmorphism Stats Card ── */}
          <div className="hidden lg:block">
            <div
              className="rounded-3xl p-8 space-y-5 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.20)",
                boxShadow: "0 32px 64px -12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* Card inner glow */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-amber-400/10 rounded-full blur-2xl" aria-hidden="true" />

              <div className="flex items-center justify-between mb-2">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Why Vine Dental?</p>
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-400/80" />
                  <div className="h-2 w-2 rounded-full bg-amber-400/80" />
                  <div className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>
              </div>

              {[
                { number: "28+", label: "Years of Excellence", sub: "Serving Lagos since 1995", color: "text-amber-300" },
                { number: "4.4★", label: "Google Rating", sub: `${CLINIC_INFO.rating.totalReviews} verified reviews`, color: "text-amber-300" },
                { number: "10+", label: "Dental Services", sub: "Comprehensive family care", color: "text-teal-300" },
                { number: "6 Days", label: "Open Every Week", sub: "Mon–Sat, 9:00 AM–4:00 PM", color: "text-teal-300" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4 group">
                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    <span className={cn("font-extrabold text-sm leading-tight text-center", stat.color)}>{stat.number}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{stat.label}</p>
                    <p className="text-teal-200/80 text-xs mt-0.5">{stat.sub}</p>
                  </div>
                </div>
              ))}

              {/* Emergency CTA */}
              <div className="border-t border-white/15 pt-4 mt-2">
                <a
                  href={WHATSAPP_EMERGENCY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/80 hover:text-white transition-colors group"
                  aria-label="Dental emergency? Contact us on WhatsApp now"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400 animate-pulse shrink-0" aria-hidden="true" />
                  <span className="font-medium group-hover:underline underline-offset-2">Dental emergency? Chat now →</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

function ServicesSection() {
  const featured = getFeaturedServices();

  const icons: Record<string, React.ReactNode> = {
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
  };

  const defaultIcon = (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );

  return (
    <section className="py-16 sm:py-24 bg-white" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-teal-100">
            What We Offer
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Comprehensive Dental Services
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From routine check-ups to advanced restorations — complete dental care under one roof for every member of your family.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {featured.map((service, i) => (
            <Link
              key={service.id}
              to={`/services/${service.slug}`}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" aria-hidden="true" />

              <div className="relative">
                {/* Icon */}
                <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                  {icons[service.icon] ?? defaultIcon}
                </div>

                <h3 className="font-bold text-gray-900 mb-2 text-base group-hover:text-teal-700 transition-colors duration-200">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-full group-hover:bg-teal-700 group-hover:text-white group-hover:border-teal-700 transition-all duration-300">
                    {formatPriceRange(service.priceRange.min, service.priceRange.max, service.priceRange.fromOnly)}
                  </span>
                  <span className="flex items-center gap-1 text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all duration-200">
                    Learn more
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border-2 border-teal-700 text-teal-700 font-semibold text-sm hover:bg-teal-700 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm hover:shadow-md"
          >
            View All 10 Services
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyChooseUsSection() {
  const reasons = [
    { icon: "🏆", title: "28+ Years of Excellence", description: "Established in 1995, we've built an unmatched reputation for consistent, high-quality dental care across thousands of Lagos families." },
    { icon: "💉", title: "Pain-Free Dentistry", description: "Modern anaesthesia and a gentle, patient-centred approach ensures your comfort throughout every procedure." },
    { icon: "👨‍👩‍👧‍👦", title: "Complete Family Care", description: "From toddlers to grandparents — personalised, age-appropriate dental care for every generation." },
    { icon: "💳", title: "HMOs & Flexible Payment", description: "Major HMO plans accepted. Pay via cash, Paystack, or bank transfer — whatever works for you." },
    { icon: "🚨", title: "Same-Day Emergencies", description: "Dental pain doesn't wait. We prioritise urgent cases for same-day treatment wherever possible." },
    { icon: "📍", title: "Prime Ikeja GRA Location", description: "Easily accessible at 42 Oduduwa Crescent, Ikeja GRA — central to Lagos Island and Mainland." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-teal-100">
              The Vine Dental Difference
            </span>
            <h2 id="why-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
              Why Thousands of Lagos Patients Choose Us
            </h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              We combine decades of clinical experience with genuine care for every patient — building relationships that last generations.
            </p>

            {/* Featured quote */}
            <div className="relative bg-white rounded-2xl p-6 border border-teal-100 shadow-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-teal-500 to-teal-700 rounded-l-2xl" />
              <svg className="h-8 w-8 text-teal-200 mb-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-gray-700 italic text-base leading-relaxed mb-3">
                "I came in fearing I would need an extraction, but the dentist advised against it and treated the tooth. That was in 2003, and I have had no complaint or issue since then."
              </blockquote>
              <footer className="text-sm font-bold text-teal-700">— Dike Ogbonnaya, Patient since 2003</footer>
            </div>
          </div>

          {/* Right: grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="group flex gap-4 p-5 rounded-2xl bg-white hover:bg-teal-700 transition-all duration-300 border border-gray-100 hover:border-teal-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <span className="text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">{r.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-white text-sm mb-1.5 transition-colors">{r.title}</h3>
                  <p className="text-xs text-gray-500 group-hover:text-teal-100 leading-relaxed transition-colors">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── UNIFIED Patient Stories Section ─────────────────────────────────────────
// Replaces both old TrustSection + TestimonialsSection with ONE premium section.

function PatientStoriesSection() {
  const reviews = getFeaturedReviews(6);
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate featured testimonial
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const featured = TESTIMONIALS[activeIdx];

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0fafa 50%, #e6f7f7 100%)" }}
      aria-labelledby="stories-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-amber-100">
            Patient Stories
          </span>
          <h2 id="stories-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Trusted by Lagos Families for{" "}
            <span className="text-teal-700">28+ Years</span>
          </h2>

          {/* ── Google Rating Badge ── */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-3 mt-2">
            <Stars rating={4} size="md" />
            <span className="font-extrabold text-gray-900 text-xl">{RATING_AGGREGATE.average}</span>
            <div className="w-px h-6 bg-gray-200" />
            <span className="text-gray-500 text-sm font-medium">{RATING_AGGREGATE.total} Google reviews</span>
            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 ml-1" aria-hidden="true" />
          </div>
        </div>

        {/* ── Featured Rotating Testimonial ── */}
        <div className="max-w-3xl mx-auto mb-14">
          <div
            className="relative rounded-3xl p-8 sm:p-10 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0D7377 0%, #0a5759 100%)",
              boxShadow: "0 24px 48px -12px rgba(13,115,119,0.35)",
            }}
          >
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} aria-hidden="true" />
            <div className="relative">
              <svg className="h-10 w-10 text-teal-300/60 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-white text-lg sm:text-xl font-medium leading-relaxed mb-6 italic">
                "{featured?.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm"
                  aria-hidden="true"
                >
                  {featured?.authorName?.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm">{featured?.authorName}</p>
                  <p className="text-teal-300 text-xs">{featured?.authorTitle}</p>
                </div>
                <Stars rating={featured?.rating ?? 5} size="sm" />
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === activeIdx}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => {
                      setActiveIdx(i);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                    }}
                    className={cn(
                      "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      i === activeIdx ? "bg-amber-400 w-6 h-2" : "bg-white/30 hover:bg-white/50 w-2 h-2"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Reviews Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-teal-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              aria-label={`Review by ${review.authorName}`}
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <Stars rating={review.rating} size="sm" />
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-sm text-gray-600 leading-relaxed mb-5 italic">
                "{review.excerpt}"
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                >
                  {review.authorInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{review.authorName}</p>
                  {review.patientSince && (
                    <p className="text-xs text-teal-600 font-medium">Patient since {review.patientSince}</p>
                  )}
                </div>
                <img src="https://www.google.com/favicon.ico" alt="Google review" className="h-4 w-4 ml-auto opacity-50 shrink-0" aria-hidden="true" />
              </footer>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={CLINIC_INFO.rating.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-xl border-2 border-teal-200 text-teal-700 font-semibold text-sm hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <img src="https://www.google.com/favicon.ico" alt="" className="h-4 w-4" aria-hidden="true" />
            View all {CLINIC_INFO.rating.totalReviews} reviews on Google →
          </a>
        </div>

      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const faqs = getAllFAQs().slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-teal-100">
            Got Questions?
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Common questions from our patients — answered honestly.
          </p>
        </div>
        <FAQAccordion faqs={faqs} />
        <div className="text-center mt-10">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-800 transition-colors text-base hover:underline underline-offset-4"
          >
            Still have questions? Contact us →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  const waLink = generateWhatsAppLink({ context: "general" });

  return (
    <section className="py-16 sm:py-20 bg-gray-50" aria-label="Book your appointment">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl p-10 sm:p-16 overflow-hidden text-center"
          style={{
            background: "linear-gradient(135deg, #0a5759 0%, #0D7377 50%, #1a8a8f 100%)",
            boxShadow: "0 32px 64px -12px rgba(13,115,119,0.4)",
          }}
        >
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 blur-xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-amber-400/10 translate-y-1/2 -translate-x-1/2 blur-xl" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="absolute top-6 right-16 opacity-10">
              <ToothIcon className="h-24 w-24 text-white" />
            </div>
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Book Today — Slots Filling Fast
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Ready for Your Best Smile?
            </h2>
            <p className="text-teal-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Book your appointment today. Our friendly team is ready to give you and your family the care you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book"
                className="group inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-2xl bg-amber-500 text-white font-bold text-base hover:bg-amber-400 transition-all duration-200 shadow-xl shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
                onClick={() => trackBookCTAClick("cta_banner")}
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Your Visit Today
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-2xl bg-white/15 text-white font-semibold text-base hover:bg-white/25 transition-all duration-200 border border-white/30 backdrop-blur-sm"
                onClick={() => trackWhatsAppClick("hero")}
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const waLink = generateWhatsAppLink({ context: "contact" });

  return (
    <section className="py-16 sm:py-24 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Info */}
          <div>
            <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-teal-100">
              Find Us
            </span>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
              Visit Vine Dental Clinic
            </h2>

            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Address", value: CLINIC_INFO.address.full, href: CLINIC_INFO.address.mapsUrl,
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "Phone", value: CLINIC_INFO.contact.phoneDisplay, href: `tel:${CLINIC_INFO.contact.phoneTel}`,
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email", value: CLINIC_INFO.contact.email, href: `mailto:${CLINIC_INFO.contact.email}`,
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: "Hours", value: "Mon–Sat: 9:00 AM – 4:00 PM · Sunday Closed", href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="h-11 w-11 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-all duration-200">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-gray-700 font-medium hover:text-teal-700 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-700 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={`tel:${CLINIC_INFO.contact.phoneTel}`}
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
                onClick={() => trackCallClick("contact_section")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
                onClick={() => trackWhatsAppClick("contact")}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-80 lg:h-[460px] ring-1 ring-gray-200">
            <iframe
              src={CLINIC_INFO.address.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vine Dental Clinic location map"
              aria-label="Google Maps showing Vine Dental Clinic at 42 Oduduwa Crescent, Ikeja GRA, Lagos"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage() {
  useEffect(() => {
    trackViewHome();
    document.title = "Vine Dental Clinic | Trusted Dental Care in Ikeja GRA, Lagos";
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      {/* SINGLE unified patient stories section — no duplicates */}
      <PatientStoriesSection />
      <FAQSection />
      <CTABanner />
      <ContactSection />
    </>
  );
}
