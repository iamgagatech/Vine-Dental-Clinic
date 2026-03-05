// =============================================================================
// VINE DENTAL CLINIC — Star Rating Component
// =============================================================================

import { cn } from "../../lib/cn";

interface StarRatingProps {
  rating: number;       // 0-5, supports decimals
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
  ariaLabel?: string;
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  className,
  ariaLabel,
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const partial = !filled && i < rating && i + 1 > rating;
    const fillPercent = partial ? Math.round((rating - Math.floor(rating)) * 100) : 0;
    return { filled, partial, fillPercent, index: i };
  });

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={ariaLabel ?? `Rating: ${rating} out of ${maxRating} stars`}
    >
      {stars.map(({ filled, partial, fillPercent, index }) => (
        <svg
          key={index}
          className={cn(sizeMap[size], "shrink-0")}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          {partial ? (
            <defs>
              <linearGradient id={`star-grad-${index}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fillPercent}%`} stopColor="#f59e0b" />
                <stop offset={`${fillPercent}%`} stopColor="#d1d5db" />
              </linearGradient>
            </defs>
          ) : null}
          <path
            fill={
              filled
                ? "#f59e0b"
                : partial
                ? `url(#star-grad-${index})`
                : "#d1d5db"
            }
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
      {showValue && (
        <span className={cn("ml-1 font-semibold text-gray-700", textSizeMap[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
