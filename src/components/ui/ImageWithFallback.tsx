// =============================================================================
// VINE DENTAL CLINIC — Enhanced Image Component with Fallback & Effects
// =============================================================================
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { generateBlurPlaceholder, getServiceColor } from '@/lib/images';

// ============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface ImageWithFallbackProps {
  /** Image source URL */
  src: string;
  /** Fallback image if main fails to load */
  fallback?: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Image width (for aspect ratio) */
  width?: number;
  /** Image height (for aspect ratio) */
  height?: number;
  /** Loading strategy: 'lazy', 'eager', or 'auto' */
  loading?: 'lazy' | 'eager';
  /** Show shimmer effect while loading */
  shimmer?: boolean;
  /** Service slug for themed placeholder colors */
  serviceSlug?: string;
  /** Custom placeholder color */
  placeholderColor?: string;
  /** Object fit behavior */
  objectFit?: 'cover' | 'contain' | 'fill';
  /** Whether to show error state */
  showFallback?: boolean;
  /** On load callback */
  onLoad?: () => void;
  /** On error callback */
  onError?: () => void;
}

// ============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Enhanced image component with:
 * - Smooth loading with shimmer effect
 * - Automatic fallback to placeholder
 * - Beautiful error states
 * - Blur-up loading technique
 * - Service-themed colors
 */
export function ImageWithFallback({
  src,
  fallback = '/images/placeholder-clinic.svg',
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  shimmer = true,
  serviceSlug,
  placeholderColor,
  objectFit = 'cover',
  showFallback = true,
  onLoad,
  onError,
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Determine theme color
  const themeColor = placeholderColor || (serviceSlug ? getServiceColor(serviceSlug) : '#0D7377');

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    if (!hasError && showFallback) {
      setHasError(true);
      setImageSrc(fallback);
      setHasError(false); // Don't show error state if we have fallback
    } else {
      setHasError(true);
    }
    onError?.();
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{ width, height }}
    >
      {/* Shimmer loading effect */}
      {shimmer && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 z-10 animate-pulse"
          style={{ backgroundColor: themeColor + '20' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${themeColor}15, transparent)`,
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>
      )}

      {/* Skeleton placeholder while loading */}
      {!isLoaded && !hasError && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-gradient-to-br from-[#0D7377]/10 to-[#14919B]/5'
          )}
        >
          <svg
            className="w-12 h-12 text-[#0D7377]/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <svg
            className="w-12 h-12 text-red-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Image unavailable</p>
        </div>
      )}

      {/* Main image */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={cn(
          'absolute inset-0 w-full h-full',
          'transition-opacity duration-500 ease-out',
          'object-cover',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100'
        )}
        style={{ objectFit }}
      />

      

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// WEIGHTED IMAGE COMPONENT (Reserved Slots)
// ============================================================================

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Optimized image wrapper for above-fold content with blur-up
 */
export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `url('${generateBlurPlaceholder()}')`,
            backgroundSize: 'cover',
            backgroundColor: '#0D7377',
          }}
        />
      )}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full object-cover',
          'transition-opacity duration-500',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100'
        )}
      />
    </div>
  );
}

// ============================================================================
// SERVICE CARD IMAGE WITH THEME COLORS
// ============================================================================

interface ServiceCardImageProps {
  serviceSlug: string;
  serviceName: string;
  className?: string;
}

/**
 * Service-specific image with themed placeholder colors
 */
export function ServiceCardImage({ serviceSlug, serviceName, className }: ServiceCardImageProps) {
  const themeColor = getServiceColor(serviceSlug);
  const imageSrc = `/images/services/${serviceSlug}.jpg`;
  const fallbackSrc = '/images/placeholder-clinic.svg';

  return (
    <div className={cn('relative aspect-[4/3] overflow-hidden', className)}>
      {/* Themed gradient background */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: themeColor + '15' }}
      >
        {/* Animated gradient */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `linear-gradient(135deg, ${themeColor}20 0%, transparent 50%, ${themeColor}10 100%)`,
          }}
        />
      </div>

      {/* Service icon placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: themeColor + '20' }}
        >
          <svg className="w-10 h-10" style={{ color: themeColor }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      <ImageWithFallback
        src={imageSrc}
        fallback={fallbackSrc}
        alt={serviceName}
        className="absolute inset-0"
        serviceSlug={serviceSlug}
        shimmer
      />
    </div>
  );
}

// ============================================================================
// HERO IMAGE WITH PARALLAX EFFECT
// ============================================================================

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
}

/**
 * Hero section image with optional parallax effect
 */
export function HeroImage({ src, alt, className, parallax = false }: HeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D7377]/90 via-[#0D7377]/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Image */}
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out',
          parallax && 'hover:scale-105',
          !isLoaded && 'bg-gray-200'
        )}
        style={{ backgroundImage: `url('${src}')` }}
      />

      {/* Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0D7377] z-0">
          <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Actual image element for loading */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default ImageWithFallback;