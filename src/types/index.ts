// =============================================================================
// VINE DENTAL CLINIC — Type Definitions Re-exports
// Central import point: import { Booking, Service, ... } from '@/types'
// =============================================================================

export type {
  Booking,
  BookingStatus,
  BookingFormData,
  BookingConfirmation,
  TimeSlot,
  PaystackPayload,
  PaymentMethod,
} from "./booking";

export type {
  Service,
  ServiceCategory,
  ServiceSummary,
  ServicesByCategory,
  PriceRange,
  ServiceSEO,
} from "./service";

export type {
  Review,
  ReviewSource,
  RatingAggregate,
  Testimonial,
} from "./review";

export type {
  APIResponse,
  APIError,
  APIErrorCode,
  ValidationError,
  PaystackAPIError,
  PaystackWebhookEvent,
  AvailabilityResponse,
  PaginatedResponse,
} from "./api";
