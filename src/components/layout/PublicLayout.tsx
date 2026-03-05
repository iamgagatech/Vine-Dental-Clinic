// =============================================================================
// VINE DENTAL CLINIC — Public Site Layout
// Wraps all public-facing pages with Header, Footer, and WhatsApp FAB.
// =============================================================================

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header }       from "./Header";
import { Footer }       from "./Footer";
import { WhatsAppFAB }  from "../ui/WhatsAppFAB";
import { trackPageView } from "../../lib/analytics";

export function PublicLayout() {
  const location = useLocation();

  // Track page view on route change
  useEffect(() => {
    trackPageView(location.pathname);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      {/* Skip to content – accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />

        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* Floating WhatsApp button — mobile-prominent */}
      <WhatsAppFAB />
    </>
  );
}
