// =============================================================================
// VINE DENTAL CLINIC — Site Header
// Sticky navigation with logo, desktop nav, mobile hamburger, and Book CTA.
// =============================================================================

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/cn";
import { CLINIC_INFO, NAV_LINKS } from "../../lib/constants";
import { generateWhatsAppLink } from "../../lib/whatsapp";
import { trackWhatsAppClick, trackBookCTAClick, trackCallClick } from "../../lib/analytics";

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ scrolled }: { scrolled: boolean }) {
  void scrolled;
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg min-w-0"
      aria-label="Vine Dental Clinic — Home"
    >
      {/* Logo image — drop logo.svg into /public/images/logo.svg */}
      <img
        src="/images/logo.svg"
        alt="Vine Dental Clinic logo"
        className="h-9 w-auto shrink-0"
        onError={(e) => {
          // Fallback to icon if image missing
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      {/* Fallback icon (always rendered, hidden when image loads) */}
      <div className="h-9 w-9 rounded-xl bg-teal-700 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-teal-600 transition-colors hidden">
        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4c-1.5 0-2.8.8-3.5 2-.7-1.2-2-2-3.5-2C3.1 4 1.5 5.6 1.5 7.5c0 4 4.5 7.5 10.5 10.5 6-3 10.5-6.5 10.5-10.5C22.5 5.6 20.9 4 19 4c-1.5 0-2.8.8-3.5 2z" />
        </svg>
      </div>
      {/* Text — always visible, not hidden on mobile */}
      <div className="min-w-0">
        <p className="font-bold text-sm sm:text-base text-gray-900 leading-tight whitespace-nowrap">
          Vine Dental Clinic
        </p>
        <p className="text-[10px] sm:text-xs text-teal-600 font-medium hidden xs:block sm:block whitespace-nowrap">
          Est. 1995 · Ikeja GRA
        </p>
      </div>
    </Link>
  );
}

// ─── Desktop Nav ──────────────────────────────────────────────────────────────

function DesktopNav() {
  const location = useLocation();

  return (
    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const href = link.href as string;
        const isActive =
          link.exact
            ? location.pathname === href
            : href !== "/" && location.pathname.startsWith(href);

        return (
          <Link
            key={href}
            to={link.href}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
              isActive
                ? "bg-teal-50 text-teal-700"
                : "text-gray-600 hover:text-teal-700 hover:bg-teal-50"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

// ─── Header Actions ───────────────────────────────────────────────────────────

function HeaderActions() {
  const waLink = generateWhatsAppLink({ context: "general" });

  return (
    <div className="hidden md:flex items-center gap-2">
      {/* Phone quick-dial */}
      <a
        href={`tel:${CLINIC_INFO.contact.phoneTel}`}
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-teal-700 transition-colors rounded-lg hover:bg-teal-50"
        aria-label={`Call us: ${CLINIC_INFO.contact.phoneDisplay}`}
        onClick={() => trackCallClick("header")}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="hidden xl:block font-medium">{CLINIC_INFO.contact.phoneDisplay}</span>
      </a>

      {/* WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-green-700 hover:text-green-800 transition-colors rounded-lg hover:bg-green-50"
        aria-label="Chat with us on WhatsApp"
        onClick={() => trackWhatsAppClick("header")}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden xl:block font-medium">WhatsApp</span>
      </a>

      {/* Book CTA */}
      <Link
        to="/book"
        className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 active:bg-teal-900 transition-colors shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        onClick={() => trackBookCTAClick("header")}
      >
        Book Appointment
      </Link>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  const waLink = generateWhatsAppLink({ context: "general" });

  // Close on route change
  useEffect(() => { onClose(); }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100">
          <span className="font-bold text-gray-900">Vine Dental Clinic</span>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            const mHref = link.href as string;
            const isActive =
              link.exact
                ? location.pathname === mHref
                : mHref !== "/" && location.pathname.startsWith(mHref);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-teal-700"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTAs */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            to="/book"
            className="flex items-center justify-center h-12 w-full rounded-xl bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 transition-colors"
            onClick={() => trackBookCTAClick("mobile_menu")}
          >
            Book Appointment
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-12 w-full rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
            onClick={() => trackWhatsAppClick("header")}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${CLINIC_INFO.contact.phoneTel}`}
            className="flex items-center justify-center h-11 w-full rounded-xl border-2 border-gray-200 text-gray-700 font-medium text-sm hover:border-teal-300 hover:text-teal-700 transition-colors"
            onClick={() => trackCallClick("mobile_menu")}
          >
            {CLINIC_INFO.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const lastScrollY                 = useRef(0);
  const [visible, setVisible]       = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      // Hide header on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Logo scrolled={scrolled} />
            <DesktopNav />
            <HeaderActions />

            {/* Mobile hamburger */}
            <button
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Clinic status bar */}
        <div className="hidden sm:block bg-teal-700 text-white text-xs py-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <span>Mon–Sat 9:00 AM – 4:00 PM · Sundays Closed</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              HMOs Accepted · Paystack Payments
            </span>
          </div>
        </div>
      </header>

      {/* Push content below sticky header */}
      <div className="h-16 sm:h-[52px]" aria-hidden="true" />

      {/* Mobile menu drawer */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
