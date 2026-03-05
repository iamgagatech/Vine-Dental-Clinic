// =============================================================================
// VINE DENTAL CLINIC — Service Detail Page
// Full service info: description, benefits, pricing, FAQs, booking CTA.
// =============================================================================

import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getServiceBySlug } from "../data/services";
import { getAllFAQs } from "../data/faqs";
import { FAQAccordion } from "../components/ui/FAQAccordion";
import { BookingForm } from "../components/ui/BookingForm";
import { formatPriceRange } from "../lib/format";
import { whatsAppServiceLink } from "../lib/whatsapp";
import { trackWhatsAppClick, trackBookCTAClick } from "../lib/analytics";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Sparkles: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  Sun: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="5" /><path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
  Anchor: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="5" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13M5 12H2a10 10 0 0020 0h-3M5 12a7 7 0 0014 0" /></svg>,
  Heart: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  GitMerge: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v6" /><circle cx="18" cy="9" r="3"/><path d="M18 12v0a6 6 0 01-6 6H9" strokeLinecap="round" /><path d="M6 9a6 6 0 016 6" strokeLinecap="round" /></svg>,
  Shield: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  AlertCircle: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4M12 16h.01" /></svg>,
  Crown: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l3-8 4 5 3-7 4 10H3zM3 17h18" /></svg>,
  Activity: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Scissors: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path strokeLinecap="round" d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" /></svg>,
};

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    if (service) {
      document.title = service.seo.metaTitle;
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const waLink = whatsAppServiceLink(service.name);
  const relatedFaqs = getAllFAQs().slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-100 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-teal-700 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link to="/services" className="text-gray-500 hover:text-teal-700 transition-colors">Services</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">{service.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
                  {SERVICE_ICONS[service.icon] ?? <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                </div>
                <span className="text-teal-200 text-sm font-semibold capitalize border border-teal-400/40 px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                {service.name}
              </h1>
              <p className="text-teal-100 text-lg mb-6 leading-relaxed">
                {service.shortDescription}
              </p>

              {/* Quick meta */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <svg className="h-4 w-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm text-white font-medium">{service.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <svg className="h-4 w-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm text-white font-medium">
                    {formatPriceRange(service.priceRange.min, service.priceRange.max, service.priceRange.fromOnly)}
                  </span>
                </div>
                {service.sameDayAvailable && (
                  <div className="flex items-center gap-2 bg-green-500/20 rounded-lg px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
                    <span className="text-sm text-white font-medium">Same-day available</span>
                  </div>
                )}
                {service.hmoEligible && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <span className="text-sm text-white font-medium">✓ HMO Eligible</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/book?service=${service.id}`}
                  className="inline-flex items-center justify-center h-13 px-8 py-3 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-400 transition-all shadow-lg"
                  onClick={() => trackBookCTAClick(`service_detail_${service.id}`)}
                >
                  {service.bookingCTA}
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 transition-all border border-white/30"
                  onClick={() => trackWhatsAppClick("service")}
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Booking form card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Book This Service</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Fill in your details and we'll confirm your appointment shortly.
                </p>
                <BookingForm defaultServiceId={service.id} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Full description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Treatment
                </h2>
                <div className="service-prose text-gray-600 leading-relaxed space-y-4">
                  {service.fullDescription.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                  Key Benefits
                </h2>
                <ul className="space-y-3" role="list">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                  Common Questions
                </h2>
                <FAQAccordion faqs={relatedFaqs} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-bold text-gray-900 mb-4">Pricing Guide</h3>
                <div className="text-2xl font-extrabold text-teal-700 mb-2">
                  {formatPriceRange(service.priceRange.min, service.priceRange.max, service.priceRange.fromOnly)}
                </div>
                {service.priceRange.label && (
                  <p className="text-sm text-gray-500 mb-3">{service.priceRange.label}</p>
                )}
                <p className="text-xs text-gray-500 mb-4">
                  Final pricing depends on treatment complexity. We'll provide a full quote after your examination.
                </p>
                <div className="space-y-2 text-sm">
                  {service.hmoEligible && (
                    <div className="flex items-center gap-2 text-teal-700">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      HMO plans accepted
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-teal-700">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Cash & bank transfer
                  </div>
                  <div className="flex items-center gap-2 text-teal-700">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Paystack online payment
                  </div>
                </div>
              </div>

              {/* Mobile Booking Form */}
              <div className="lg:hidden bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Book This Service</h3>
                <BookingForm defaultServiceId={service.id} compact />
              </div>

              {/* Contact Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Have Questions?</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Our team is happy to explain the procedure, costs, and what to expect.
                </p>
                <div className="space-y-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-10 w-full rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
                    onClick={() => trackWhatsAppClick("service")}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:+2348023657067"
                    className="flex items-center justify-center h-10 w-full rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:border-teal-300 hover:text-teal-700 transition-colors"
                  >
                    +234 802 365 7067
                  </a>
                </div>
              </div>

              {/* Back to services */}
              <Link
                to="/services"
                className="flex items-center gap-2 text-sm text-teal-700 font-medium hover:text-teal-800 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All Services
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
