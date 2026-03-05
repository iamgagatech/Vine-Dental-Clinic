// =============================================================================
// VINE DENTAL CLINIC — Root App Component
// React Router v6 SPA with full page routing and admin dashboard.
// =============================================================================

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// ─── Layout ───────────────────────────────────────────────────────────────────
import { PublicLayout } from "./components/layout/PublicLayout";

// ─── Public Pages ─────────────────────────────────────────────────────────────
import { HomePage }        from "./pages/HomePage";
import { ServicesPage }    from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { BookPage }        from "./pages/BookPage";
import { ContactPage }     from "./pages/ContactPage";
import { AboutPage }       from "./pages/AboutPage";
import { ReviewsPage }     from "./pages/ReviewsPage";
import { PrivacyPage }     from "./pages/PrivacyPage";
import { NotFoundPage }    from "./pages/NotFoundPage";

// ─── Admin ────────────────────────────────────────────────────────────────────
import { AdminApp }        from "./admin/AdminApp";

// ─── Analytics ────────────────────────────────────────────────────────────────
import { trackPageView } from "./lib/analytics";

// ─── Page View Tracker ────────────────────────────────────────────────────────

function RouteTracker() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);
  return null;
}

// ─── App ──────────────────────────────────────────────────────────────────────

export function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        {/* ── Public Site ─────────────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/"              element={<HomePage />} />
          <Route path="/services"      element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/book"          element={<BookPage />} />
          <Route path="/contact"       element={<ContactPage />} />
          <Route path="/about"         element={<AboutPage />} />
          <Route path="/reviews"       element={<ReviewsPage />} />
          <Route path="/privacy"       element={<PrivacyPage />} />
        </Route>

        {/* ── Admin Dashboard ─────────────────────────────────── */}
        <Route path="/admin/*"        element={<AdminApp />} />

        {/* ── Fallback ─────────────────────────────────────────── */}
        <Route path="/404"            element={<NotFoundPage />} />
        <Route path="*"              element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
