// =============================================================================
// VINE DENTAL CLINIC — Admin Dashboard App
// Protected admin area: login, bookings management, dashboard overview.
// =============================================================================

import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { getBookings } from "../lib/booking-store";
import { updateBookingStatus } from "../lib/db";
import type { Booking, BookingStatus } from "../types/booking";
import { formatDate } from "../lib/format";
import { generateWhatsAppLink } from "../lib/whatsapp";

// ─── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_TOKEN_KEY = "vdc_admin_token";
// TODO: Replace with real auth (NextAuth, Clerk, etc.) in production.
// TODO: In production, validate token server-side on every request.
const DEMO_TOKEN = "vine2025admin";

function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem(ADMIN_TOKEN_KEY) === DEMO_TOKEN
  );

  const login = (token: string): boolean => {
    if (token === DEMO_TOKEN) {
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
}

// ─── Login Page ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: (token: string) => boolean }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = onLogin(token);
    setLoading(false);
    if (ok) {
      navigate("/admin");
    } else {
      setError("Invalid admin token. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-teal-700 flex items-center justify-center">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 4c-1.5 0-2.8.8-3.5 2-.7-1.2-2-2-3.5-2C3.1 4 1.5 5.6 1.5 7.5c0 4 4.5 7.5 10.5 10.5 6-3 10.5-6.5 10.5-10.5C22.5 5.6 20.9 4 19 4c-1.5 0-2.8.8-3.5 2z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Vine Dental Clinic</p>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Sign In</h1>
        <p className="text-sm text-gray-500 mb-6">Enter your admin token to access the dashboard.</p>

        {/* DEMO notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-5">
          <p className="text-xs text-amber-700 font-medium">
            Demo mode: use token <code className="bg-amber-100 px-1 rounded">vine2025admin</code>
          </p>
          <p className="text-xs text-amber-600 mt-1">
            TODO: Replace with real auth (NextAuth/Clerk) in production.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-token" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Token
            </label>
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={(e) => { setToken(e.target.value); setError(""); }}
              placeholder="Enter admin token"
              autoComplete="current-password"
              className={`w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full h-11 rounded-xl bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link to="/" className="text-xs text-gray-400 hover:text-teal-700 transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending:         "bg-amber-100 text-amber-700 border border-amber-200",
  payment_init:    "bg-blue-100 text-blue-700 border border-blue-200",
  payment_failed:  "bg-orange-100 text-orange-700 border border-orange-200",
  confirmed:       "bg-teal-100 text-teal-700 border border-teal-200",
  completed:       "bg-green-100 text-green-700 border border-green-200",
  cancelled:       "bg-red-100 text-red-700 border border-red-200",
  no_show:         "bg-gray-100 text-gray-600 border border-gray-200",
};

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    exact: true,
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    exact: false,
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
];

function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();

  return (
    <aside className="w-56 bg-gray-900 min-h-screen flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-4 border-b border-gray-700">
        <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center shrink-0">
          <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 4c-1.5 0-2.8.8-3.5 2-.7-1.2-2-2-3.5-2C3.1 4 1.5 5.6 1.5 7.5c0 4 4.5 7.5 10.5 10.5 6-3 10.5-6.5 10.5-10.5C22.5 5.6 20.9 4 19 4c-1.5 0-2.8.8-3.5 2z" />
          </svg>
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-tight">Vine Dental</p>
          <p className="text-gray-400 text-xs">Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Admin navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.href
            : location.pathname.startsWith(item.href) && item.href !== "/admin";
          const isCurrent = location.pathname === "/admin" && item.href === "/admin";
          const active = isActive || isCurrent;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-teal-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-700 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Website
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors w-full"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ─── Stats Card ───────────────────────────────────────────────────────────────

function StatsCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className={`rounded-xl p-5 ${color}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-extrabold mb-0.5">{value}</p>
      {sub && <p className="text-xs opacity-60">{sub}</p>}
    </div>
  );
}

// ─── Dashboard Overview ───────────────────────────────────────────────────────

function DashboardOverview() {
  const bookings = getBookings();
  const today = new Date().toISOString().split("T")[0]!;

  const todayBookings = bookings.filter((b) => b.preferredDate === today);
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const thisWeek = bookings.filter((b) => {
    const d = new Date(b.preferredDate);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return d >= weekStart;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Today's Bookings" value={todayBookings.length} color="bg-teal-50 text-teal-700" />
        <StatsCard label="Pending Confirmation" value={pendingBookings.length} sub="Need action" color="bg-amber-50 text-amber-700" />
        <StatsCard label="This Week" value={thisWeek.length} color="bg-blue-50 text-blue-700" />
        <StatsCard label="Total Bookings" value={bookings.length} color="bg-gray-100 text-gray-700" />
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-xs text-teal-700 font-medium hover:underline">
            View all →
          </Link>
        </div>
        {bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No bookings yet. They'll appear here when patients submit the booking form.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{booking.patientName}</p>
                  <p className="text-xs text-gray-500">{booking.serviceName} · {formatDate(booking.preferredDate, "short")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={booking.status} />
                  <Link to="/admin/bookings" className="text-xs text-gray-400 hover:text-teal-700 transition-colors">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="bg-teal-50 rounded-xl border border-teal-100 p-4">
        <h2 className="font-semibold text-teal-800 text-sm mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/bookings"
            className="h-9 px-4 rounded-lg bg-teal-700 text-white text-xs font-semibold flex items-center hover:bg-teal-800 transition-colors"
          >
            Manage Bookings
          </Link>
          <Link
            to="/book"
            target="_blank"
            className="h-9 px-4 rounded-lg border border-teal-300 text-teal-700 text-xs font-semibold flex items-center hover:bg-teal-100 transition-colors"
          >
            Open Booking Form ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Bookings Manager ─────────────────────────────────────────────────────────

function BookingsManager() {
  const [bookings, setBookings] = useState<Booking[]>(getBookings());
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [search, setSearch] = useState("");

  const refresh = () => setBookings(getBookings());

  const handleStatusChange = (id: string, status: BookingStatus) => {
    updateBookingStatus(id, status);
    refresh();
  };

  const filtered = bookings
    .filter((b) => filter === "all" || b.status === filter)
    .filter((b) =>
      !search ||
      b.patientName.toLowerCase().includes(search.toLowerCase()) ||
      b.reference.toLowerCase().includes(search.toLowerCase()) ||
      b.patientPhone.includes(search)
    );

  const exportCSV = () => {
    const headers = ["Ref", "Name", "Phone", "Service", "Date", "Time", "Status", "Created"];
    const rows = bookings.map((b) => [
      b.reference, b.patientName, b.patientPhone, b.serviceName,
      b.preferredDate, b.preferredTime, b.status,
      new Date(b.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vine-dental-bookings-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => { refresh(); }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500">{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 h-9 px-4 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, ref, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 px-4 rounded-xl border border-gray-200 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex gap-1">
          {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`h-10 px-3 rounded-xl text-xs font-semibold transition-all capitalize ${
                filter === s ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-400 text-sm">
              {bookings.length === 0
                ? "No bookings yet. Submit the booking form on the website to see them here."
                : "No bookings match your filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Bookings table">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Reference", "Patient", "Service", "Date / Time", "Status", "Actions"].map((col) => (
                    <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((booking) => {
                  const waLink = generateWhatsAppLink({
                    bookingRef: booking.reference,
                    service: booking.serviceName,
                    bookingDate: booking.preferredDate,
                    bookingTime: booking.preferredTime,
                    context: "booking_confirm",
                  });

                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold text-teal-700">{booking.reference}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{booking.patientName}</p>
                        <p className="text-xs text-gray-500">{booking.patientPhone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-700">{booking.serviceName}</p>
                        {booking.notes && (
                          <p className="text-xs text-gray-400 truncate max-w-xs" title={booking.notes}>
                            Note: {booking.notes}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-700">{formatDate(booking.preferredDate, "short")}</p>
                        <p className="text-xs text-gray-500">{booking.preferredTime}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 flex-wrap">
                          {booking.status === "pending" && (
                            <button
                              onClick={() => handleStatusChange(booking.id, "confirmed")}
                              className="h-7 px-2.5 rounded-lg bg-teal-100 text-teal-700 text-xs font-semibold hover:bg-teal-200 transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {booking.status === "confirmed" && (
                            <button
                              onClick={() => handleStatusChange(booking.id, "completed")}
                              className="h-7 px-2.5 rounded-lg bg-green-100 text-green-700 text-xs font-semibold hover:bg-green-200 transition-colors"
                            >
                              Complete
                            </button>
                          )}
                          {["pending", "confirmed"].includes(booking.status) && (
                            <button
                              onClick={() => handleStatusChange(booking.id, "cancelled")}
                              className="h-7 px-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 px-2.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors"
                            title="Contact patient on WhatsApp"
                          >
                            WA
                          </a>
                          {booking.patientPhone && (
                            <a
                              href={`tel:${booking.patientPhone}`}
                              className="h-7 px-2.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
                              title="Call patient"
                            >
                              Call
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Layout ─────────────────────────────────────────────────────────────

function AdminLayout({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar onLogout={onLogout} />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="bookings" element={<BookingsManager />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// ─── AdminApp ─────────────────────────────────────────────────────────────────

export function AdminApp() {
  const { authenticated, login, logout } = useAdminAuth();
  const location = useLocation();

  if (!authenticated) {
    if (location.pathname !== "/admin/login") {
      return <Navigate to="/admin/login" replace />;
    }
    return <LoginPage onLogin={login} />;
  }

  return (
    <Routes>
      <Route path="login" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<AdminLayout onLogout={logout} />} />
    </Routes>
  );
}
