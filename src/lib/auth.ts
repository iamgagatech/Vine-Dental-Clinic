// =============================================================================
// VINE DENTAL CLINIC — Admin Authentication
// Simple token-based auth for the admin dashboard.
//
// SECURITY WARNING: This is an MVP/demo authentication system.
// It uses a static token stored in localStorage — NOT production-safe.
//
// TODO (PRODUCTION — CRITICAL):
//   1. Replace with a proper auth provider:
//      - Clerk:   npm install @clerk/clerk-react (easiest, recommended)
//      - Supabase Auth: built-in if using Supabase DB
//      - NextAuth.js: if migrating to Next.js
//      - Firebase Auth: Google/social login support
//
//   2. Implement proper session management:
//      - Server-side sessions with httpOnly cookies
//      - JWT tokens with short expiry + refresh tokens
//      - NEVER store session tokens in localStorage (XSS risk)
//
//   3. Implement RBAC (Role-Based Access Control):
//      - admin: full access
//      - receptionist: view + update bookings only
//      - dentist: view bookings for their schedule
//
//   4. Add audit logging:
//      - Log all admin actions: who, what, when, from which IP
//      - Store in separate audit_log table
//
//   5. Enable 2FA for admin accounts
//
//   6. Rate-limit login attempts (max 5 per 15 minutes per IP)
// =============================================================================

const STORAGE_KEY = "vdc_admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

// ─── Session Type ─────────────────────────────────────────────────────────────

export interface AdminSession {
  authenticated: boolean;
  expiresAt: number;           // Unix timestamp
  role: "admin" | "receptionist";
  /** TODO: Replace with real user ID from auth provider */
  userId: "demo_admin";
}

// ─── Validate Credentials ─────────────────────────────────────────────────────

/**
 * Validates admin login credentials.
 *
 * TODO (PRODUCTION):
 *   - Query your auth provider (Clerk, Supabase, etc.)
 *   - Hash passwords with bcrypt — never store plaintext
 *   - Add rate limiting on this function
 *   - Return a proper JWT/session token from server
 *
 * Demo credentials (set in .env):
 *   VITE_ADMIN_USERNAME=admin
 *   VITE_ADMIN_PASSWORD=VineDental2025!
 *
 * SECURITY NOTE: In production, authentication MUST happen server-side.
 * Client-side credential validation is trivially bypassable.
 */
export function validateAdminCredentials(
  username: string,
  password: string
): boolean {
  const env = (import.meta as unknown as { env: Record<string, string> }).env;

  // TODO (PRODUCTION): Remove client-side validation entirely
  //                    Replace with: POST /api/auth/login → server validates
  const validUsername = env["VITE_ADMIN_USERNAME"] ?? "admin";
  const validPassword = env["VITE_ADMIN_PASSWORD"] ?? "VineDental2025!";

  // Constant-time comparison would be better — but this is client-side anyway
  return username === validUsername && password === validPassword;
}

// ─── Session Management ───────────────────────────────────────────────────────

/**
 * Creates and persists an admin session.
 * TODO (PRODUCTION): Replace localStorage with httpOnly cookie set by server.
 */
export function createAdminSession(): void {
  const session: AdminSession = {
    authenticated: true,
    expiresAt: Date.now() + SESSION_DURATION_MS,
    role: "admin",
    userId: "demo_admin",
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Private browsing or storage quota exceeded
    console.warn("[Auth] Could not persist session to localStorage");
  }
}

/**
 * Retrieves the current admin session if valid.
 * Returns null if no session or if session has expired.
 */
export function getAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (Date.now() > session.expiresAt) {
      clearAdminSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Check if admin is currently authenticated.
 */
export function isAdminAuthenticated(): boolean {
  return getAdminSession()?.authenticated === true;
}

/**
 * Clears the admin session (logout).
 */
export function clearAdminSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Returns time remaining in current session (formatted).
 */
export function getSessionTimeRemaining(): string {
  const session = getAdminSession();
  if (!session) return "No session";
  const remainingMs = session.expiresAt - Date.now();
  if (remainingMs <= 0) return "Expired";
  const hours = Math.floor(remainingMs / 3600000);
  const minutes = Math.floor((remainingMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}
