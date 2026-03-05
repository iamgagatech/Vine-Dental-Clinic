// =============================================================================
// VINE DENTAL CLINIC — Multi-Step Booking Form
// Step 1: Service + Date + Time
// Step 2: Contact Details + Consent + Submit
// =============================================================================

import { useState, useCallback } from "react";
import { Input, Select, Textarea, Checkbox } from "./Input";
import { Button } from "./Button";
import { SERVICES_SUMMARY, APPOINTMENT_TIMES } from "../../lib/constants";
import {
  trackBookingFormStart,
  trackBookingFormStep,
  trackBookingFormError,
  trackSubmitBooking,
} from "../../lib/analytics";
import { generateBookingRef } from "../../lib/format";
import { whatsAppBookingConfirmLink } from "../../lib/whatsapp";
import { cn } from "../../lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes: string;
  consentGiven: boolean;
}

interface FormErrors {
  serviceId?: string;
  preferredDate?: string;
  preferredTime?: string;
  patientName?: string;
  patientEmail?: string;
  patientPhone?: string;
  notes?: string;
  consentGiven?: string;
}

interface BookingFormProps {
  defaultServiceId?: string;
  onSuccess?: (ref: string) => void;
  compact?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMinDate(): string {
  const d = new Date();
  d.setHours(d.getHours() + 2);
  return d.toISOString().split("T")[0] ?? "";
}

function getMaxDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().split("T")[0] ?? "";
}

function isSunday(dateStr: string): boolean {
  return new Date(dateStr).getDay() === 0;
}

function validateStep1(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.serviceId) errors.serviceId = "Please select a service";
  if (!data.preferredDate) errors.preferredDate = "Please choose a date";
  else if (isSunday(data.preferredDate)) errors.preferredDate = "We are closed on Sundays. Please choose another day.";
  if (!data.preferredTime) errors.preferredTime = "Please select a time";
  return errors;
}

function validateStep2(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.patientName || data.patientName.trim().length < 2)
    errors.patientName = "Please enter your full name";
  if (!data.patientPhone || data.patientPhone.trim().length < 8)
    errors.patientPhone = "Please enter a valid Nigerian phone number";
  if (data.patientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.patientEmail))
    errors.patientEmail = "Please enter a valid email address";
  if (!data.consentGiven)
    errors.consentGiven = "You must accept the terms to proceed";
  return errors;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center mb-6" aria-label={`Step ${step} of 2`}>
      {[1, 2].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200",
              s < step
                ? "bg-teal-600 text-white"
                : s === step
                ? "bg-teal-700 text-white ring-4 ring-teal-200"
                : "bg-gray-200 text-gray-500"
            )}
            aria-current={s === step ? "step" : undefined}
          >
            {s < step ? (
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              s
            )}
          </div>
          {s === 1 && (
            <div
              className={cn(
                "h-1 w-12 mx-1 rounded transition-colors duration-300",
                step > 1 ? "bg-teal-600" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
      <span className="sr-only">Step {step} of 2</span>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  bookingRef,
  data,
}: {
  bookingRef: string;
  data: FormData;
}) {
  const serviceName =
    SERVICES_SUMMARY.find((s) => s.id === data.serviceId)?.name ?? data.serviceId;

  const waLink = whatsAppBookingConfirmLink(
    bookingRef,
    serviceName,
    data.preferredDate,
    data.preferredTime
  );

  return (
    <div className="text-center py-6">
      <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Booking Request Sent!
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        Thank you, {data.patientName.split(" ")[0]}. We'll confirm your appointment and reach out within a few hours.
      </p>

      <div className="bg-teal-50 rounded-xl p-5 mb-6 text-left border border-teal-100">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-3">
          Booking Summary
        </p>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Reference</dt>
            <dd className="font-bold text-teal-700">{bookingRef}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Service</dt>
            <dd className="font-medium text-gray-900">{serviceName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Preferred Date</dt>
            <dd className="font-medium text-gray-900">{data.preferredDate}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Preferred Time</dt>
            <dd className="font-medium text-gray-900">
              {APPOINTMENT_TIMES.find((t) => t.value === data.preferredTime)?.label ?? data.preferredTime}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Confirm via WhatsApp
        </a>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-gray-500 hover:text-teal-700 transition-colors"
        >
          Make another booking
        </button>
      </div>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export function BookingForm({
  defaultServiceId = "",
  onSuccess,
  compact = false,
}: BookingFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [started, setStarted] = useState(false);

  const [data, setData] = useState<FormData>({
    serviceId: defaultServiceId,
    preferredDate: "",
    preferredTime: "",
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    notes: "",
    consentGiven: false,
  });

  const handleChange = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      if (!started) {
        setStarted(true);
        trackBookingFormStart(data.serviceId || undefined);
      }
      setData((prev) => ({ ...prev, [field]: value }));
      // Clear field error on change
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [started, data.serviceId]
  );

  const handleStep1Next = () => {
    const errs = validateStep1(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      Object.entries(errs).forEach(([field, msg]) =>
        trackBookingFormError(field, msg ?? "")
      );
      return;
    }
    trackBookingFormStep(1, "service-datetime");
    setStep(2);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep2(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    const ref = generateBookingRef();

    try {
      // TODO: POST to /api/bookings with booking data
      // const res = await fetch("/api/bookings", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...data, reference: ref }),
      // });

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1200));

      const serviceName = SERVICES_SUMMARY.find((s) => s.id === data.serviceId)?.name ?? "";
      trackSubmitBooking(data.serviceId, serviceName, "form");
      trackBookingFormStep(2, "contact-submit");

      setBookingRef(ref);
      setSubmitted(true);
      onSuccess?.(ref);
    } catch {
      setErrors({ consentGiven: "Submission failed. Please try again or call us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen bookingRef={bookingRef} data={data} />;
  }

  const serviceOptions = SERVICES_SUMMARY.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const timeOptions = APPOINTMENT_TIMES.map((t) => ({
    value: t.value,
    label: t.label,
  }));

  return (
    <div className={cn(!compact && "max-w-lg mx-auto")}>
      <StepIndicator step={step} />

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Choose Your Appointment
            </h3>
            <p className="text-sm text-gray-500">
              Select a service and your preferred date and time.
            </p>
          </div>

          <Select
            label="Service"
            required
            options={serviceOptions}
            placeholder="Select a dental service"
            value={data.serviceId}
            onChange={(e) => handleChange("serviceId", e.target.value)}
            error={errors.serviceId}
          />

          <Input
            label="Preferred Date"
            type="date"
            required
            value={data.preferredDate}
            min={getMinDate()}
            max={getMaxDate()}
            onChange={(e) => handleChange("preferredDate", e.target.value)}
            error={errors.preferredDate}
            hint="Monday–Saturday only (9 AM–4 PM)"
          />

          <Select
            label="Preferred Time"
            required
            options={timeOptions}
            placeholder="Select a time slot"
            value={data.preferredTime}
            onChange={(e) => handleChange("preferredTime", e.target.value)}
            error={errors.preferredTime}
          />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleStep1Next}
            rightIcon={
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Your Contact Details
            </h3>
            <p className="text-sm text-gray-500">
              We'll use these to confirm your appointment.
            </p>
          </div>

          <Input
            label="Full Name"
            type="text"
            required
            placeholder="e.g. Chidi Okafor"
            value={data.patientName}
            onChange={(e) => handleChange("patientName", e.target.value)}
            error={errors.patientName}
            autoComplete="name"
          />

          <Input
            label="Phone Number"
            type="tel"
            required
            placeholder="e.g. 08023657067"
            value={data.patientPhone}
            onChange={(e) => handleChange("patientPhone", e.target.value)}
            error={errors.patientPhone}
            hint="Nigerian mobile number — we'll WhatsApp or call to confirm"
            autoComplete="tel"
          />

          <Input
            label="Email Address (optional)"
            type="email"
            placeholder="e.g. chidi@email.com"
            value={data.patientEmail}
            onChange={(e) => handleChange("patientEmail", e.target.value)}
            error={errors.patientEmail}
            autoComplete="email"
          />

          <Textarea
            label="Additional Notes (optional)"
            placeholder="Any symptoms, concerns, or things we should know before your visit..."
            value={data.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            error={errors.notes}
            maxLength={500}
            currentLength={data.notes.length}
          />

          <Checkbox
            label={
              <span>
                I consent to Vine Dental Clinic contacting me about my appointment
                and agree to the{" "}
                <a
                  href="/privacy"
                  className="text-teal-700 underline hover:text-teal-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </a>
                .
              </span>
            }
            checked={data.consentGiven}
            onChange={(e) => handleChange("consentGiven", e.target.checked)}
            error={errors.consentGiven}
          />

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setErrors({});
              }}
              className="flex-1 h-12 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submitting}
              className="flex-[2]"
            >
              {submitting ? "Submitting..." : "Request Appointment"}
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center pt-1">
            We'll confirm your appointment within a few hours during business hours.
          </p>
        </form>
      )}
    </div>
  );
}
