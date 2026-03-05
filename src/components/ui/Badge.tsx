// =============================================================================
// VINE DENTAL CLINIC — Badge Component
// =============================================================================

import React from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-teal-100 text-teal-800",
  secondary: "bg-amber-100 text-amber-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-800",
  outline: "border border-gray-300 text-gray-700 bg-transparent",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-2.5 py-1 gap-1.5",
};

export function Badge({
  variant = "default",
  size = "md",
  children,
  className,
  icon,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

/** Trust badge for hero section and cards */
export function TrustBadge({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm",
        "text-white rounded-lg px-3 py-2 text-sm font-medium border border-white/20",
        className
      )}
    >
      <span className="text-amber-400 shrink-0">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
