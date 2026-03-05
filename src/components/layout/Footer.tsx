// =============================================================================
// VINE DENTAL CLINIC — Site Footer
// Full-width footer with links, contact info, hours, and social.
// =============================================================================

import { Link } from "react-router-dom";
import { CLINIC_INFO, NAV_LINKS } from "../../lib/constants";
import { generateWhatsAppLink } from "../../lib/whatsapp";
import { trackCallClick, trackWhatsAppClick } from "../../lib/analytics";

const currentYear = new Date().getFullYear();

function FooterLogo() {
  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-3 group" aria-label="Vine Dental Clinic - Home">
        <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4c-1.5 0-2.8.8-3.5 2-.7-1.2-2-2-3.5-2C3.1 4 1.5 5.6 1.5 7.5c0 4 4.5 7.5 10.5 10.5 6-3 10.5-6.5 10.5-10.5C22.5 5.6 20.9 4 19 4c-1.5 0-2.8.8-3.5 2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-white text-base leading-tight">Vine Dental Clinic</p>
          <p className="text-xs text-teal-300">Trusted Care Since 1995</p>
        </div>
      </Link>
      <p className="mt-4 text-sm text-gray-400 max-w-xs leading-relaxed">
        {CLINIC_INFO.description.slice(0, 120)}...
      </p>

      {/* Rating badge */}
      <div className="mt-4 inline-flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
        <div className="flex" aria-label={`${CLINIC_INFO.rating.score} stars`}>
          {[1,2,3,4,5].map((s) => (
            <svg key={s} className={`h-4 w-4 ${s <= 4 ? "text-amber-400" : "text-gray-600"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-white">{CLINIC_INFO.rating.score}</span>
        <span className="text-xs text-gray-400">({CLINIC_INFO.rating.totalReviews} Google reviews)</span>
      </div>
    </div>
  );
}

export function Footer() {
  const waLink = generateWhatsAppLink({ context: "general" });

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Footer Grid ─────────────────────────────────────── */}
        <div className="py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterLogo />
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/book" className="text-sm text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                  Book Appointment →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5" role="list">
              {[
                ["Dental Scaling & Polishing", "dental-scaling-polishing"],
                ["Teeth Whitening", "teeth-whitening"],
                ["Dental Implants", "dental-implants"],
                ["Orthodontics (Braces)", "orthodontics-braces"],
                ["Root Canal Treatment", "root-canal-treatment"],
                ["Emergency Dental Care", "emergency-dental-care"],
                ["Pediatric Dentistry", "pediatric-dentistry"],
              ].map(([name, slug]) => (
                <li key={slug}>
                  <Link
                    to={`/services/${slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:underline underline-offset-2"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                  All services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Contact & Hours
            </h3>
            <ul className="space-y-3" role="list">
              {/* Address */}
              <li>
                <a
                  href={CLINIC_INFO.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                  aria-label="Get directions to Vine Dental Clinic"
                >
                  <svg className="h-4 w-4 mt-0.5 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{CLINIC_INFO.address.full}</span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href={`tel:${CLINIC_INFO.contact.phoneTel}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => trackCallClick("footer")}
                  aria-label={`Call: ${CLINIC_INFO.contact.phoneDisplay}`}
                >
                  <svg className="h-4 w-4 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {CLINIC_INFO.contact.phoneDisplay}
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${CLINIC_INFO.contact.email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  aria-label={`Email: ${CLINIC_INFO.contact.email}`}
                >
                  <svg className="h-4 w-4 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{CLINIC_INFO.contact.email}</span>
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => trackWhatsAppClick("contact")}
                  aria-label="Chat on WhatsApp"
                >
                  <svg className="h-4 w-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </li>

              {/* Hours */}
              <li className="pt-2 border-t border-gray-800">
                <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Hours</p>
                <p className="text-sm text-gray-400">Mon – Sat: 9:00 AM – 4:00 PM</p>
                <p className="text-sm text-gray-500">Sunday: Closed</p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────────────────────── */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} Vine Dental Clinic. All rights reserved. · Est. 1995 · Ikeja GRA, Lagos, Nigeria
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700" aria-hidden="true">·</span>
            <Link to="/about" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              About Us
            </Link>
            <span className="text-gray-700" aria-hidden="true">·</span>
            <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
