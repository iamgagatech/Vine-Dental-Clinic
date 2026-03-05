// =============================================================================
// VINE DENTAL CLINIC — Contact Page
// All contact methods, clinic info, map embed, and contact form.
// =============================================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CLINIC_INFO } from "../lib/constants";
import { generateWhatsAppLink } from "../lib/whatsapp";
import { trackWhatsAppClick, trackCallClick } from "../lib/analytics";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const [data, setData] = useState<ContactFormData>({
    name: "", phone: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<ContactFormData> = {};
    if (!data.name.trim()) errs.name = "Please enter your name";
    if (!data.phone.trim() || data.phone.length < 8) errs.phone = "Please enter a valid phone number";
    if (!data.message.trim() || data.message.length < 10) errs.message = "Please enter a message (at least 10 characters)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center">
          <svg className="h-7 w-7 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500 mb-4">Thank you, {data.name.split(" ")[0]}. We'll get back to you shortly.</p>
        <button onClick={() => { setSubmitted(false); setData({ name: "", phone: "", email: "", subject: "", message: "" }); }} className="text-sm text-teal-700 font-medium hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Chidi Okafor"
            value={data.name}
            onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
            className={`w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="08023657067"
            value={data.phone}
            onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
            className={`w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="chidi@email.com"
          value={data.email}
          onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <select
          id="contact-subject"
          value={data.subject}
          onChange={(e) => setData((p) => ({ ...p, subject: e.target.value }))}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        >
          <option value="">Select a subject</option>
          <option value="booking">Appointment Booking</option>
          <option value="pricing">Pricing Enquiry</option>
          <option value="emergency">Dental Emergency</option>
          <option value="hmo">HMO Coverage</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="How can we help you?"
          value={data.message}
          onChange={(e) => setData((p) => ({ ...p, message: e.target.value }))}
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full h-12 rounded-xl bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | Vine Dental Clinic Lagos";
  }, []);

  const waLink = generateWhatsAppLink({ context: "contact" });

  const contactMethods = [
    {
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
      label: "Phone",
      value: CLINIC_INFO.contact.phoneDisplay,
      href: `tel:${CLINIC_INFO.contact.phoneTel}`,
      color: "bg-teal-100 text-teal-700",
      onClick: () => trackCallClick("contact"),
    },
    {
      icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
      label: "WhatsApp",
      value: "Chat with us instantly",
      href: waLink,
      external: true,
      color: "bg-green-100 text-green-700",
      onClick: () => trackWhatsAppClick("contact"),
    },
    {
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      label: "Email",
      value: CLINIC_INFO.contact.email,
      href: `mailto:${CLINIC_INFO.contact.email}`,
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: "Address",
      value: CLINIC_INFO.address.full,
      href: CLINIC_INFO.address.mapsUrl,
      external: true,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Get in Touch</h1>
          <p className="text-teal-100 text-lg max-w-xl mx-auto">
            We're here to help. Reach out via phone, WhatsApp, email, or visit us at Ikeja GRA.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                onClick={method.onClick}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-teal-200 transition-all group"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-3 ${method.color}`}>
                  {method.icon}
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{method.label}</p>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors leading-snug">{method.value}</p>
              </a>
            ))}
          </div>

          {/* Main grid: form + map */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Send Us a Message</h2>
              <p className="text-sm text-gray-500 mb-6">We'll respond within 24 hours during business days.</p>
              <ContactForm />
            </div>

            {/* Info + Map */}
            <div className="space-y-6">
              {/* Hours */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4">Clinic Hours</h2>
                <div className="space-y-3 text-sm">
                  {[
                    { day: "Monday", hours: "9:00 AM – 4:00 PM" },
                    { day: "Tuesday", hours: "9:00 AM – 4:00 PM" },
                    { day: "Wednesday", hours: "9:00 AM – 4:00 PM" },
                    { day: "Thursday", hours: "9:00 AM – 4:00 PM" },
                    { day: "Friday", hours: "9:00 AM – 4:00 PM" },
                    { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row) => {
                    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
                    const isToday = today === row.day;
                    return (
                      <div key={row.day} className={`flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 ${isToday ? "text-teal-700 font-semibold" : ""}`}>
                        <span className="text-gray-700">{row.day} {isToday && <span className="text-xs font-normal text-teal-500">(Today)</span>}</span>
                        <span className={row.hours === "Closed" ? "text-red-500 font-medium" : "font-medium text-gray-900"}>{row.hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <iframe
                  src={CLINIC_INFO.address.mapsEmbedUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vine Dental Clinic location map"
                  aria-label="Google Maps showing Vine Dental Clinic at 42 Oduduwa Crescent, Ikeja GRA, Lagos"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-900">42 Oduduwa Crescent</p>
                  <p className="text-xs text-gray-500">Ikeja GRA, Lagos 101233, Nigeria</p>
                  <a
                    href={CLINIC_INFO.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-teal-700 font-medium hover:underline mt-1 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Banner */}
          <div className="mt-10 bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-red-700 text-lg mb-2">Dental Emergency?</h3>
            <p className="text-red-600 text-sm mb-4">
              For urgent dental pain, broken teeth, or injuries — call us immediately or message on WhatsApp. We prioritise emergency cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${CLINIC_INFO.contact.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
              >
                Call Now: {CLINIC_INFO.contact.phoneDisplay}
              </a>
              <Link
                to="/book"
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl border-2 border-red-300 text-red-700 font-semibold text-sm hover:bg-red-100 transition-colors"
              >
                Book Emergency Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
