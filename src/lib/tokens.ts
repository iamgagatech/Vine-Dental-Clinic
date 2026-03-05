// =============================================================================
// VINE DENTAL CLINIC — Design Tokens
// Single source of truth for all visual design decisions.
// These values are mirrored in tailwind.config — keep in sync.
// =============================================================================

/**
 * Brand color palette.
 * Primary: Deep teal — conveys trust, cleanliness, medical professionalism.
 * Secondary: Warm amber/gold — used for CTAs, highlights, warmth.
 */
export const COLORS = {
  // ── Primary Teal ──────────────────────────────────────────────────────────
  primary: {
    50:  "#f0fafa",
    100: "#d0f0f0",
    200: "#a1e0e0",
    300: "#6bc8c9",
    400: "#38adb0",
    500: "#0D7377",   // Brand primary — main teal
    600: "#0a5e62",
    700: "#08484c",
    800: "#063337",
    900: "#041f21",
    950: "#020f10",
  },

  // ── Secondary Amber / Gold ────────────────────────────────────────────────
  secondary: {
    50:  "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",   // Brand secondary — warm amber
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },

  // ── Neutral Grays ─────────────────────────────────────────────────────────
  neutral: {
    0:   "#ffffff",
    50:  "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },

  // ── Semantic ──────────────────────────────────────────────────────────────
  success: {
    light: "#d1fae5",
    DEFAULT: "#10b981",
    dark: "#065f46",
  },
  warning: {
    light: "#fef3c7",
    DEFAULT: "#f59e0b",
    dark: "#92400e",
  },
  error: {
    light: "#fee2e2",
    DEFAULT: "#ef4444",
    dark: "#991b1b",
  },
  info: {
    light: "#dbeafe",
    DEFAULT: "#3b82f6",
    dark: "#1e3a8a",
  },

  // ── Aliases ───────────────────────────────────────────────────────────────
  /** Main interactive / brand color */
  brand: "#0D7377",
  /** CTA buttons, highlights */
  cta: "#f59e0b",
  /** Page background */
  background: "#f9fafb",
  /** Card surfaces */
  surface: "#ffffff",
  /** Primary text */
  textPrimary: "#111827",
  /** Secondary / muted text */
  textSecondary: "#4b5563",
  /** Disabled / placeholder text */
  textMuted: "#9ca3af",
  /** Default border */
  border: "#e5e7eb",
  /** Focus ring */
  focusRing: "#0D7377",
} as const;

/**
 * Typography scale.
 * Body text uses Inter; headings use a display-weight variant.
 */
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
    display: ["Inter", "system-ui", "sans-serif"],   // TODO: swap for Playfair Display if brand approves serif
    mono: ["JetBrains Mono", "Fira Code", "monospace"],
  },
  fontSize: {
    xs:   ["0.75rem",  { lineHeight: "1rem" }],
    sm:   ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem",     { lineHeight: "1.5rem" }],
    lg:   ["1.125rem", { lineHeight: "1.75rem" }],
    xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem",  { lineHeight: "2rem" }],
    "3xl": ["1.875rem",{ lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem",    { lineHeight: "1.15" }],
    "6xl": ["3.75rem", { lineHeight: "1.1" }],
    "7xl": ["4.5rem",  { lineHeight: "1.05" }],
  },
  fontWeight: {
    light:    "300",
    normal:   "400",
    medium:   "500",
    semibold: "600",
    bold:     "700",
    extrabold:"800",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight:   "-0.025em",
    normal:  "0em",
    wide:    "0.025em",
    wider:   "0.05em",
    widest:  "0.1em",
  },
} as const;

/**
 * Spacing scale — extends Tailwind's default.
 * 1 unit = 4px (0.25rem).
 */
export const SPACING = {
  px:   "1px",
  0:    "0px",
  0.5:  "0.125rem",
  1:    "0.25rem",
  1.5:  "0.375rem",
  2:    "0.5rem",
  2.5:  "0.625rem",
  3:    "0.75rem",
  3.5:  "0.875rem",
  4:    "1rem",
  5:    "1.25rem",
  6:    "1.5rem",
  7:    "1.75rem",
  8:    "2rem",
  9:    "2.25rem",
  10:   "2.5rem",
  11:   "2.75rem",
  12:   "3rem",
  14:   "3.5rem",
  16:   "4rem",
  20:   "5rem",
  24:   "6rem",
  28:   "7rem",
  32:   "8rem",
  36:   "9rem",
  40:   "10rem",
  44:   "11rem",
  48:   "12rem",
  52:   "13rem",
  56:   "14rem",
  60:   "15rem",
  64:   "16rem",
  72:   "18rem",
  80:   "20rem",
  96:   "24rem",
} as const;

/**
 * Border radius scale.
 */
export const RADII = {
  none:    "0px",
  sm:      "0.125rem",
  DEFAULT: "0.25rem",
  md:      "0.375rem",
  lg:      "0.5rem",
  xl:      "0.75rem",
  "2xl":   "1rem",
  "3xl":   "1.5rem",
  full:    "9999px",
} as const;

/**
 * Shadow scale — medical/clinical feel, not overly dramatic.
 */
export const SHADOWS = {
  sm:      "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md:      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg:      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl:      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl":   "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner:   "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none:    "none",
  /** Branded glow for primary CTA hover states */
  tealGlow: "0 0 0 3px rgb(13 115 119 / 0.25)",
  /** Amber glow for secondary CTA hover states */
  amberGlow: "0 0 0 3px rgb(245 158 11 / 0.25)",
} as const;

/**
 * Breakpoints — matches Tailwind defaults for consistency.
 */
export const BREAKPOINTS = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
} as const;

/**
 * Animation / transition tokens.
 */
export const ANIMATION = {
  duration: {
    fast:   "150ms",
    normal: "200ms",
    slow:   "300ms",
    slower: "500ms",
  },
  easing: {
    linear:     "linear",
    easeIn:     "cubic-bezier(0.4, 0, 1, 1)",
    easeOut:    "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut:  "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce:     "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

/**
 * Z-index scale — prevents stacking context conflicts.
 */
export const Z_INDEX = {
  base:       0,
  raised:     10,
  dropdown:   100,
  sticky:     200,
  overlay:    300,
  modal:      400,
  toast:      500,
  tooltip:    600,
  max:        9999,
} as const;
