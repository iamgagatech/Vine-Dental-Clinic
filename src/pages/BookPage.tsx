// =============================================================================
// VINE DENTAL CLINIC — Booking Page
// Dedicated booking page with full BookingForm and trust signals.
// =============================================================================

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingForm } from "../components/ui/BookingForm";
import { CLINIC_INFO } from "../lib/constants";
import { generateWhatsAppLink } from "../lib/whatsapp";
import { trackWhatsAppClick } from "../lib/analytics";

export function BookPage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  useEffect(() => {
    document.title = "Book Appointment | Vine Dental Clinic Lagos";
  }, []);

  const waLink = generateWhatsAppLink({ context: "general" });

  return (
    <div className="min-h-screen bg-gray-50 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Info & Trust */}
          <aside className="lg:col-span-2 space-y-6">
            {/* Heading */}
            <div>
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-1">
                Request an Appointment
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                Book Your Visit
              </h1>
              <p className="text-gray-500 leading-relaxed">
                Fill in the form and we'll confirm your appointment within a few hours during business hours. Prefer to call or chat? We're here.
              </p>
            </div>

            {/* Contact options */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 shadow-sm">
              <h2 className="font-bold text-gray-900 text-sm">Other Ways to Book</h2>
              <a
                href={`tel:${CLINIC_INFO.contact.phoneTel}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-teal-700 transition-colors">Call Us Directly</p>
                  <p className="text-teal-600 text-sm">{CLINIC_INFO.contact.phoneDisplay}</p>
                </div>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                onClick={() => trackWhatsAppClick("booking")}
              >
                <div className="h-10 w-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-teal-700 transition-colors">Chat on WhatsApp</p>
                  <p className="text-green-600 text-sm">Quick response guaranteed</p>
                </div>
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 text-sm mb-3">Clinic Hours</h2>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 4:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center">
                    <span className="text-gray-600">{row.day}</span>
                    <span className={`font-medium ${row.hours === "Closed" ? "text-red-500" : "text-gray-900"}`}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-700 font-medium">
                  🚨 Dental emergency? Call us immediately — we prioritise urgent cases.
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-teal-50 rounded-2xl border border-teal-100 p-5">
              <h2 className="font-bold text-gray-900 text-sm mb-3">Why Choose Vine Dental?</h2>
              <ul className="space-y-2 text-sm">
                {[
                  "28+ years of trusted dental care",
                  "4.4★ Google rating from real patients",
                  "HMO plans accepted",
                  "Gentle, pain-free approach",
                  "Family-friendly for all ages",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2 text-gray-700">
                    <svg className="h-4 w-4 text-teal-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right: Booking Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Appointment Request Form</h2>
                <p className="text-sm text-gray-500 mt-1">
                  We'll confirm your appointment within 2 hours during working hours.
                </p>
              </div>
              <BookingForm defaultServiceId={preselectedService} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
