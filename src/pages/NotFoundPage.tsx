// =============================================================================
// VINE DENTAL CLINIC — 404 Not Found Page
// =============================================================================

import { useEffect } from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found | Vine Dental Clinic";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-teal-100 flex items-center justify-center">
          <svg className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-6xl font-extrabold text-teal-700 mb-3">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-teal-700 text-white font-semibold hover:bg-teal-800 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl border-2 border-teal-700 text-teal-700 font-semibold hover:bg-teal-50 transition-colors"
          >
            Book Appointment
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "Services", href: "/services" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Reviews", href: "/reviews" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-teal-700 font-medium hover:text-teal-800 hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
