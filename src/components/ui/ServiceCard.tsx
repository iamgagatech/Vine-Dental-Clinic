// =============================================================================
// VINE DENTAL CLINIC — Service Card Component
// =============================================================================

import {
  Sparkles, Scissors, Shield, Activity, Sun, Anchor,
  GitMerge, Crown, AlertCircle, Heart, ArrowRight
} from "lucide-react";
import { cn } from "../../lib/cn";
import type { Service } from "../../types/service";
import { formatPriceRange } from "../../lib/format";
import { Badge } from "./Badge";
import { trackServiceCardClick, trackBookCTAClick } from "../../lib/analytics";
import { generateWhatsAppLink } from "../../lib/whatsapp";

// ─── Icon Resolver ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Scissors, Shield, Activity, Sun, Anchor,
  GitMerge, Crown, AlertCircle, Heart,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={cn("h-6 w-6", className)} />;
}

// ─── Category Colours ─────────────────────────────────────────────────────────

const categoryColours: Record<string, string> = {
  preventive:  "bg-teal-50 text-teal-700",
  restorative: "bg-blue-50 text-blue-700",
  cosmetic:    "bg-amber-50 text-amber-700",
  orthodontic: "bg-purple-50 text-purple-700",
  surgical:    "bg-red-50 text-red-700",
  emergency:   "bg-red-50 text-red-700",
  pediatric:   "bg-green-50 text-green-700",
};

const categoryIconBg: Record<string, string> = {
  preventive:  "bg-teal-100 text-teal-600",
  restorative: "bg-blue-100 text-blue-600",
  cosmetic:    "bg-amber-100 text-amber-600",
  orthodontic: "bg-purple-100 text-purple-600",
  surgical:    "bg-red-100 text-red-600",
  emergency:   "bg-red-100 text-red-600",
  pediatric:   "bg-green-100 text-green-600",
};

// ─── Category Label Map ────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  preventive:  "Preventive",
  restorative: "Restorative",
  cosmetic:    "Cosmetic",
  orthodontic: "Orthodontic",
  surgical:    "Surgical",
  emergency:   "Emergency",
  pediatric:   "Pediatric",
};

// ─── Service Card ─────────────────────────────────────────────────────────────

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact" | "featured";
  onBook?: (serviceId: string) => void;
  location?: string;
  className?: string;
}

export function ServiceCard({
  service,
  variant = "default",
  onBook,
  location = "services-grid",
  className,
}: ServiceCardProps) {
  const handleCardClick = () => {
    trackServiceCardClick(service.id, service.name, location);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackBookCTAClick(location, service.id);
    if (onBook) {
      onBook(service.id);
    } else {
      window.location.hash = "book";
    }
  };

  const whatsappLink = generateWhatsAppLink({
    service: service.name,
    context: "service",
  });

  const priceLabel =
    service.priceRange.label ??
    formatPriceRange(
      service.priceRange.min,
      service.priceRange.max,
      service.priceRange.fromOnly
    );

  if (variant === "compact") {
    return (
      <a
        href={`/services/${service.slug}`}
        className={cn(
          "flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100",
          "hover:shadow-md hover:border-teal-200 transition-all duration-200 group",
          className
        )}
        onClick={handleCardClick}
      >
        <div className={cn("p-2.5 rounded-lg shrink-0", categoryIconBg[service.category])}>
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{service.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{service.duration}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 transition-colors shrink-0" />
      </a>
    );
  }

  return (
    <article
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden",
        "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Card Header */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={cn(
              "p-3 rounded-xl shrink-0",
              categoryIconBg[service.category] ?? "bg-teal-100 text-teal-600"
            )}
          >
            <ServiceIcon name={service.icon} className="h-6 w-6" />
          </div>
          <Badge
            variant="default"
            size="sm"
            className={cn(categoryColours[service.category])}
          >
            {categoryLabels[service.category] ?? service.category}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
          {service.name}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {service.shortDescription}
        </p>
      </div>

      {/* Benefits */}
      {variant === "featured" && (
        <div className="px-6 mb-4">
          <ul className="space-y-1.5">
            {service.benefits.slice(0, 3).map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <svg
                  className="h-4 w-4 text-teal-600 shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Meta */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {service.duration}
          </span>
          {service.hmoEligible && (
            <span className="flex items-center gap-1 text-green-700">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              HMO
            </span>
          )}
          {service.sameDayAvailable && (
            <span className="text-amber-700 font-medium">Same-day</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 pb-6 pt-4 border-t border-gray-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            From
          </span>
          <span className="font-bold text-gray-900 text-sm">{priceLabel}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleBookClick}
            className={cn(
              "flex-1 h-10 rounded-lg text-sm font-semibold",
              "bg-teal-700 text-white hover:bg-teal-800 transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1"
            )}
          >
            {service.bookingCTA}
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-lg shrink-0",
              "bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-1"
            )}
            aria-label={`Enquire about ${service.name} on WhatsApp`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
