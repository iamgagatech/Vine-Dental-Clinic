// =============================================================================
// VINE DENTAL CLINIC — Image Utilities & Placeholders
// =============================================================================

/**
 * Centralized image paths for the entire application.
 * Replace these paths with your actual local images when ready.
 *
 * IMAGE GUIDELINES:
 * - JPEG: Best for photos (hero, services, team, clinic)
 * - PNG: For images with transparency
 * - WebP: Modern format, smaller files, use when possible
 * - SVG: For icons, patterns, and illustrations
 *
 * RECOMMENDED DIMENSIONS:
 * ===============
 * Hero images: 1920x1080 (full-width header)
 * Service images: 800x600 (service cards)
 * Team photos: 400x500 (individual), 1200x600 (group)
 * Clinic photos: 1200x800 (interior, reception)
 * Before/After: 800x600 each (same framing)
 * Icons: 64x64 or 128x128
 * PWA icons: 192x192, 512x512
 * Open Graph: 1200x630
 */

export const IMAGES = {
  // ====================
  // HERO SECTION
  // ====================
  hero: {
    dentist: '/images/hero/hero-dentist.jpg',    // Professional dentist with patient
    smile: '/images/hero/hero-smile.jpg',         // Beautiful closeup smile
    clinic: '/images/hero/hero-clinic.jpg',       // Clinic interior wide shot
    // Placeholder fallbacks (delete when real images added)
    dentist__placeholder: '/images/placeholder-dentist.svg',
    smile__placeholder: '/images/placeholder-smile.svg',
    clinic__placeholder: '/images/placeholder-clinic.svg',
  },

  // ====================
  // SERVICES
  // ====================
  // Replace with your actual images: /images/services/[filename].jpg
  services: {
    'scaling-polishing': {
      image: '/images/services/scaling-polishing.jpg',
      alt: 'Dental scaling and polishing treatment in progress',
    },
    'tooth-extraction': {
      image: '/images/services/extraction.jpg',
      alt: 'Safe and painless tooth extraction procedure',
    },
    'fillings': {
      image: '/images/services/fillings.jpg',
      alt: 'Natural-looking dental fillings and restorations',
    },
    'root-canal': {
      image: '/images/services/root-canal.jpg',
      alt: 'Professional root canal treatment',
    },
    'teeth-whitening': {
      image: '/images/services/whitening.jpg',
      alt: 'Professional teeth whitening for a brighter smile',
    },
    'dental-implants': {
      image: '/images/services/implants.jpg',
      alt: 'Permanent dental implant restorations',
    },
    'orthodontics': {
      image: '/images/services/braces.jpg',
      alt: 'Orthodontic braces for straightening teeth',
    },
    'crowns-bridges': {
      image: '/images/services/crowns.jpg',
      alt: 'Custom dental crowns and bridges',
    },
    'emergency': {
      image: '/images/services/emergency.jpg',
      alt: 'Emergency dental care and immediate treatment',
    },
    'pediatric': {
      image: '/images/services/pediatric.jpg',
      alt: 'Child-friendly pediatric dental care',
    },
  },

  // ====================
  // BEFORE & AFTER GALLERY
  // ====================
  beforeAfter: {
    case1: {
      before: '/images/before-after/case-01-before.jpg',
      after: '/images/before-after/case-01-after.jpg',
      title: 'Smile Transformation',
    },
    case2: {
      before: '/images/before-after/case-02-before.jpg',
      after: '/images/before-after/case-02-after.jpg',
      title: 'Restoration Work',
    },
    case3: {
      before: '/images/before-after/case-03-before.jpg',
      after: '/images/before-after/case-03-after.jpg',
      title: 'Whitening Results',
    },
  },

  // ====================
  // TEAM & CLINIC
  // ====================
  team: {
    lead: '/images/team/lead-dentist.jpg',        // Lead dentist portrait
    group: '/images/team/clinic-team.jpg',        // Full team photo
    lead__placeholder: '/images/placeholder-team-lead.svg',
    group__placeholder: '/images/placeholder-team-group.svg',
  },

  clinic: {
    reception: '/images/clinic/reception.jpg',    // Modern reception area
    room: '/images/clinic/treatment-room.jpg',    // Treatment room with equipment
    waiting: '/images/clinic/waiting-area.jpg',   // Comfortable waiting area
    equipment: '/images/clinic/equipment.jpg',    // Modern dental equipment
    reception__placeholder: '/images/placeholder-reception.svg',
  },

  // ====================
  // OPEN GRAPH & SOCIAL
  // ====================
  og: {
    default: '/images/og-image.jpg',              // 1200x630 for social sharing
  },

  // ====================
  // PWA ICONS
  // ====================
  icons: {
    pwa192: '/images/icons/icon-192x192.png',
    pwa512: '/images/icons/icon-512x512.png',
    favicon: '/images/icons/favicon.ico',
  },

  // ====================
  // BACKGROUND PATTERNS
  // ====================
  bg: {
    dots: '/images/bg/pattern-dots.svg',
    curves: '/images/bg/pattern-curves.svg',
    gradient: '/images/bg/gradient-overlay.png',
  },
} as const;

// ====================
// HELPER FUNCTIONS
// ====================

/**
 * Get service image by service slug. Falls back to placeholder if missing.
 */
export function getServiceImage(slug: string): string {
  const service = IMAGES.services[slug as keyof typeof IMAGES.services] as 
    { image?: string; alt?: string } | undefined;
  return service?.image || '/images/placeholder-service.svg';
}

/**
 * Get service alt text by slug.
 */
export function getServiceAlt(slug: string): string {
  const service = IMAGES.services[slug as keyof typeof IMAGES.services] as 
    { image?: string; alt?: string } | undefined;
  return service?.alt || 'Dental service image';
}

/**
 * Get hero image with fallback
 */
export function getHeroImage(type: 'dentist' | 'smile' | 'clinic'): string {
  return IMAGES.hero[type] || IMAGES.hero.dentist;
}

/**
 * Generate blur data URL placeholder (for Next Image component)
 * This creates a subtle gradient placeholder that looks professional
 */
export function generateBlurPlaceholder(): string {
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwRDczNzciIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==';
}

/**
 * Image loading strategy types
 */
export type ImageLoadingStrategy = 'lazy' | 'eager' | 'auto';

/**
 * Get loading strategy based on image position
 */
export function getLoadingStrategy(position: 'above-fold' | 'below-fold'): ImageLoadingStrategy {
  return position === 'above-fold' ? 'eager' : 'lazy';
}

/**
 * Get responsive srcset sizes for responsive images
 */
export function getSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}

/**
 * Prioritize image loading based on viewport
 * Use this for images that should load faster based on fold position
 */
export function getImagePriority(isAboveFold: boolean): boolean {
  return isAboveFold;
}

// ====================
// IMAGE CATEGORIES FOR PLACEHOLDER GENERATION
// ====================

export const PLACEHOLDER_COLORS = {
  primary: '#0D7377',
  secondary: '#14919B',
  accent: '#D4A853',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

/**
 * Generate service-specific placeholder colors
 */
export function getServiceColor(slug: string): string {
  const colors: Record<string, string> = {
    'scaling-polishing': '#14919B',
    'tooth-extraction': '#0D7377',
    'fillings': '#D4A853',
    'root-canal': '#10B981',
    'teeth-whitening': '#FBBF24',
    'dental-implants': '#8B5CF6',
    'orthodontics': '#EC4899',
    'crowns-bridges': '#06B6D4',
    'emergency': '#EF4444',
    'pediatric': '#F472B6',
  };
  return colors[slug] || '#0D7377';
}

// ====================
// TODO: Production Integration Points
// ====================

/**
 * TODO: When deploying to production:
 * 1. Replace all placeholder SVG paths with real JPEG/WebP images
 * 2. Add responsive srcsets with multiple image sizes
 * 3. Implement image CDN (Cloudinary, Vercel Blob, or AWS S3)
 * 4. Add blur data URLs for each image for improved LCP
 * 5. Configure WebP/AVIF format serving
 * 6. Set up image optimization pipeline
 *
 * IMAGE OPTIMIZATION CHECKLIST:
 * □ All images compressed to <500KB each
 * □ Progressive JPEG format for photos
 * □ WebP with fallback for modern browsers
 * □ Proper EXIF data removed (privacy)
 * □ Alt text added for all images
 * □ Responsive srcsets configured
 * □ Lazy loading for below-fold images
 * □ Blur placeholders generated
 */