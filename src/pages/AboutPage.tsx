// =============================================================================
// VINE DENTAL CLINIC — About Page
// Clinic story, values, credentials, team section.
// =============================================================================

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { generateWhatsAppLink } from "../lib/whatsapp";
import { trackWhatsAppClick, trackBookCTAClick } from "../lib/analytics";

export function AboutPage() {
  useEffect(() => {
    document.title = "About Us | Vine Dental Clinic Lagos – Est. 1995";
  }, []);

  const waLink = generateWhatsAppLink({ context: "general" });

  const values = [
    {
      icon: "🏆",
      title: "Clinical Excellence",
      description: "We uphold the highest standards of clinical care, using modern techniques and evidence-based practice to deliver consistently outstanding results.",
    },
    {
      icon: "💚",
      title: "Patient-First Care",
      description: "Every decision we make centres on what's best for you. We take time to listen, explain, and ensure you're comfortable and informed throughout.",
    },
    {
      icon: "🌿",
      title: "Conservative Dentistry",
      description: "We preserve your natural teeth whenever possible. Like Dike Ogbonnaya's case — we advised against extraction and successfully treated his tooth. That was 2003, and he's had no issues since.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Family-Centred Practice",
      description: "We treat every member of your family — from your youngest child to your grandparents — with age-appropriate, personalised care. Many families have been with us for generations.",
    },
    {
      icon: "🔬",
      title: "Continuous Learning",
      description: "Dentistry evolves constantly. Our team stays current with continuing education, bringing the latest techniques and materials to Ikeja GRA.",
    },
    {
      icon: "🤝",
      title: "Integrity & Transparency",
      description: "We give honest advice, clear pricing, and never recommend unnecessary treatment. Your trust is our most valued asset.",
    },
  ];

  const milestones = [
    { year: "1995", event: "Vine Dental Clinic established at Ikeja GRA, Lagos." },
    { year: "2000s", event: "Expanded services to include orthodontics and cosmetic dentistry." },
    { year: "2010s", event: "Adopted modern digital X-ray and advanced restorative techniques." },
    { year: "2020", event: "Continued serving patients safely through the pandemic with enhanced protocols." },
    { year: "2023+", event: "28+ years strong — over 12 Google reviews, thousands of satisfied patients." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-700 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
                Caring for Lagos Smiles Since <span className="text-amber-300">1995</span>
              </h1>
              <p className="text-teal-100 text-lg leading-relaxed mb-8">
                For nearly three decades, Vine Dental Clinic has been the trusted dental home for families across Ikeja GRA and all of Lagos. What started as a commitment to bring compassionate, expert dental care to our community has grown into a legacy of thousands of healthy smiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-400 transition-all"
                  onClick={() => trackBookCTAClick("about_hero")}
                >
                  Book Appointment
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 transition-all border border-white/30"
                  onClick={() => trackWhatsAppClick("hero")}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "28+", label: "Years of Service", sub: "Est. 1995" },
                { number: "4.4★", label: "Google Rating", sub: "12 verified reviews" },
                { number: "10+", label: "Services Offered", sub: "Complete family care" },
                { number: "HMO", label: "Insurance Welcome", sub: "Major plans accepted" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
                  <p className="text-2xl font-extrabold text-amber-300 mb-1">{stat.number}</p>
                  <p className="font-semibold text-white text-sm">{stat.label}</p>
                  <p className="text-teal-200 text-xs mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">Our Mission</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Your Smile. Our Mission.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            At Vine Dental Clinic, our mission is simple: to provide every patient with the highest quality dental care in a comfortable, welcoming environment — from their very first visit to a lifetime of healthy smiles.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe dental care should be accessible, honest, and compassionate. We never recommend unnecessary treatment, and we always take the time to explain your options clearly. Our relationship with your family doesn't end when you leave the chair — it's a long-term partnership in your oral health.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-18 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all">
                <span className="text-3xl block mb-3" aria-hidden="true">{v.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-100" aria-hidden="true" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative pl-16">
                  <div className="absolute left-0 top-1 h-12 w-12 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold text-center leading-tight p-1">
                    {m.year}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-700 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-teal-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Become Part of the Vine Dental Family
          </h2>
          <p className="text-teal-200 mb-6">
            Join thousands of Lagos families who trust us with their smiles. Book your first appointment today.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center h-12 px-10 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-400 transition-all shadow-lg"
            onClick={() => trackBookCTAClick("about_bottom_cta")}
          >
            Book Your Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
