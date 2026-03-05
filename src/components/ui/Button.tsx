// =============================================================================
// VINE DENTAL CLINIC — Button Components
// Typed, accessible, variant-driven button system.
// =============================================================================

import React from "react";
import { cn } from "../../lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "whatsapp";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 focus-visible:ring-teal-500 shadow-sm hover:shadow-md",
  secondary:
    "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 focus-visible:ring-amber-400 shadow-sm hover:shadow-md",
  outline:
    "border-2 border-teal-700 text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500 bg-transparent",
  ghost:
    "text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500 bg-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-sm",
  whatsapp:
    "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus-visible:ring-green-400 shadow-sm hover:shadow-md",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-base gap-2",
  lg: "h-12 px-7 text-lg gap-2",
  xl: "h-14 px-8 text-xl gap-2.5",
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size }: { size: ButtonSize }) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : size === "xl" ? "h-5 w-5" : "h-4 w-4";
  return (
    <svg
      className={cn("animate-spin shrink-0", sz)}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Base Button ──────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      href,
      external,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = cn(
      // Base
      "inline-flex items-center justify-center font-semibold rounded-lg",
      "transition-all duration-200 ease-in-out cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      // Variant
      variantStyles[variant],
      // Size
      sizeStyles[size],
      // State
      isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
      fullWidth && "w-full",
      className
    );

    // Render as anchor if href provided
    if (href) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
          aria-disabled={isDisabled}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {loading ? <Spinner size={size} /> : leftIcon}
          {children && <span>{children}</span>}
          {!loading && rightIcon}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={classes}
        aria-busy={loading}
        onClick={onClick}
        {...props}
      >
        {loading ? <Spinner size={size} /> : leftIcon}
        {children && <span>{children}</span>}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

// ─── WhatsApp Button ──────────────────────────────────────────────────────────

interface WhatsAppButtonProps extends Omit<ButtonProps, "variant" | "href"> {
  link: string;
  label?: string;
}

export function WhatsAppButton({
  link,
  label = "Chat on WhatsApp",
  size = "md",
  fullWidth,
  className,
  onClick,
}: WhatsAppButtonProps) {
  return (
    <Button
      variant="whatsapp"
      size={size}
      href={link}
      external
      fullWidth={fullWidth}
      className={className}
      onClick={onClick}
      leftIcon={
        <svg
          className="h-5 w-5 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      }
    >
      {label}
    </Button>
  );
}

// ─── Convenience Variants ─────────────────────────────────────────────────────

export function PrimaryButton(props: ButtonProps) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: ButtonProps) {
  return <Button {...props} variant="secondary" />;
}

export function OutlineButton(props: ButtonProps) {
  return <Button {...props} variant="outline" />;
}
