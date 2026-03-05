// =============================================================================
// VINE DENTAL CLINIC — SMS Notification Stub
// Console stub with Africa's Talking & Termii integration points.
//
// PRODUCTION INTEGRATION (choose one):
//
// Option A: Termii (Nigerian-focused — RECOMMENDED)
//   npm install termii-node  OR  use their REST API directly
//   API: https://developers.termii.com/
//   Good for: Nigerian numbers, WhatsApp Business, bulk SMS
//
// Option B: Africa's Talking
//   npm install africastalking
//   const AT = AfricasTalking({ apiKey, username });
//   await AT.SMS.send({ to: [phone], message, from: shortcode });
//
// Option C: Twilio
//   npm install twilio
//   const client = twilio(accountSid, authToken);
//   await client.messages.create({ body, from: '+1234...', to: phone });
//
// TODO (PRODUCTION):
//   - Register a sender ID with Termii/AT for Nigerian delivery
//   - Nigerian numbers require country code: +234XXXXXXXXXX
//   - DND (Do Not Disturb) opt-out: some Nigerian numbers block promotional SMS
//   - Use transactional message type (not promotional) for booking confirmations
//   - Store SMS logs in DB for audit trail
// =============================================================================

export interface SMSPayload {
  to: string;           // Nigerian phone in +234XXXXXXXXXX format
  message: string;      // Max 160 chars for single SMS (160 GSM-7)
  senderId?: string;    // Alphanumeric sender ID, e.g. "VineDental"
}

// ─── Core Send Function ───────────────────────────────────────────────────────

/**
 * Sends an SMS message. Currently a console stub.
 *
 * @returns true on success, false on failure
 */
export async function sendSMS(payload: SMSPayload): Promise<boolean> {
  // STUB
  console.log("[SMS] Sending SMS:", {
    to: payload.to,
    preview: payload.message.slice(0, 80) + (payload.message.length > 80 ? "..." : ""),
    chars: payload.message.length,
  });

  // TODO (PRODUCTION — Termii):
  // const response = await fetch('https://api.ng.termii.com/api/sms/send', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     to: payload.to,
  //     from: payload.senderId ?? 'VineDental',
  //     sms: payload.message,
  //     type: 'plain',
  //     channel: 'generic',     // or 'whatsapp' for WhatsApp Business
  //     api_key: process.env.TERMII_API_KEY,
  //   }),
  // });
  // const data = await response.json();
  // return data.message === 'Successfully Sent';

  // TODO (PRODUCTION — Africa's Talking):
  // const AT = AfricasTalking({
  //   apiKey: process.env.AT_API_KEY,
  //   username: process.env.AT_USERNAME,
  // });
  // const result = await AT.SMS.send({
  //   to: [payload.to],
  //   message: payload.message,
  //   from: payload.senderId,
  // });
  // return result.SMSMessageData.Recipients[0]?.status === 'Success';

  return true; // Stub always succeeds
}

// ─── Specific SMS Senders ─────────────────────────────────────────────────────

/** Send booking confirmation SMS to patient. */
export async function sendBookingConfirmationSMS(params: {
  patientPhone: string;
  patientName: string;
  bookingRef: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<boolean> {
  // Keep under 160 chars for single SMS delivery
  const message =
    `VineDental: Hi ${params.patientName.split(" ")[0]}, ` +
    `your ${params.serviceName} booking (${params.bookingRef}) ` +
    `on ${params.preferredDate} at ${params.preferredTime} is received. ` +
    `We'll confirm shortly. Queries: +2348023657067`;

  return sendSMS({
    to: params.patientPhone,
    message: message.slice(0, 160), // Hard cap at 160 chars
    senderId: "VineDental",
  });
}

/** Send booking confirmation SMS to admin/staff. */
export async function sendAdminSMSAlert(params: {
  patientName: string;
  patientPhone: string;
  bookingRef: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<boolean> {
  const message =
    `[New Booking] ${params.bookingRef}\n` +
    `Patient: ${params.patientName} (${params.patientPhone})\n` +
    `Service: ${params.serviceName}\n` +
    `Date: ${params.preferredDate} ${params.preferredTime}\n` +
    `Action needed: Confirm appointment`;

  // TODO (PRODUCTION): Replace with clinic admin's phone number from env
  const adminPhone = (import.meta as unknown as { env: Record<string, string> }).env["VITE_ADMIN_PHONE"] ?? "+2348023657067";

  return sendSMS({
    to: adminPhone,
    message: message.slice(0, 160),
    senderId: "VineDental",
  });
}

/** Send 24-hour appointment reminder SMS. */
export async function sendReminderSMS(params: {
  patientPhone: string;
  firstName: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<boolean> {
  const message =
    `VineDental Reminder: Hi ${params.firstName}, ` +
    `you have ${params.serviceName} tomorrow (${params.preferredDate}) ` +
    `at ${params.preferredTime}. ` +
    `To reschedule: +2348023657067`;

  return sendSMS({
    to: params.patientPhone,
    message: message.slice(0, 160),
    senderId: "VineDental",
  });
}
