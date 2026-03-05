// =============================================================================
// VINE DENTAL CLINIC — Form Input Components
// =============================================================================

import React from "react";
import { cn } from "../../lib/cn";

// ─── Input ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      required,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                ? `${inputId}-hint`
                : undefined
            }
            className={cn(
              "w-full rounded-lg border bg-white text-gray-900 placeholder-gray-400",
              "text-base transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500",
              "disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500",
              leftIcon ? "pl-10" : "pl-4",
              rightIcon ? "pr-10" : "pr-4",
              "py-2.5",
              hasError
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-gray-300 hover:border-gray-400",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-sm text-red-600 flex items-center gap-1"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  maxLength?: number;
  currentLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      required,
      maxLength,
      currentLength,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "w-full rounded-lg border bg-white text-gray-900 placeholder-gray-400",
            "text-base px-4 py-3 transition-colors duration-150 resize-y min-h-[100px]",
            "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            hasError
              ? "border-red-400 focus:ring-red-400"
              : "border-gray-300 hover:border-gray-400",
            className
          )}
          {...props}
        />

        <div className="flex justify-between">
          {error ? (
            <p id={`${inputId}-error`} role="alert" className="text-sm text-red-600">
              {error}
            </p>
          ) : hint ? (
            <p className="text-sm text-gray-500">{hint}</p>
          ) : (
            <span />
          )}
          {maxLength && (
            <span className="text-xs text-gray-400 shrink-0">
              {currentLength ?? 0}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, required, options, placeholder, className, id, ...props },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            className={cn(
              "w-full rounded-lg border bg-white text-gray-900 appearance-none",
              "text-base pl-4 pr-10 py-2.5 transition-colors duration-150 cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500",
              "disabled:bg-gray-50 disabled:cursor-not-allowed",
              hasError
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300 hover:border-gray-400",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            aria-invalid={Boolean(error)}
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 text-teal-700",
              "focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer",
              className
            )}
            {...props}
          />
          <span className="text-sm text-gray-600 leading-relaxed">{label}</span>
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-600 ml-8">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
