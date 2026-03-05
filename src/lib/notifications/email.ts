// =============================================================================
// VINE DENTAL CLINIC — Email Notification Stub
// Console-based stub with clear SMTP integration points.
//
// PRODUCTION INTEGRATION (choose one):
//
// Option A: Resend (recommended for Next.js/Vercel)
//   npm install resend
//   import { Resend } from 'resend';
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   await resend.emails.send({ from, to, subject, html });
//
// Option B: Nodemailer + SMTP
//   npm install nodemailer
//   const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } });
//   await transporter.sendMail({ from, to, subject, html });
//
// Option C: SendGrid
//   npm install @sendgrid/mail
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   await sgMail.send({ to, from, subject, html });
//
// TODO (PRODUCTION):
//   - Set FROM address to a verified domain email (not Yahoo — use info@vinedentalclinic.ng)
//   - Store email templates in DB or CMS for easy editing
//   - Add unsubscribe links for marketing emails (CAN-SPAM/GDPR compliance)
//   - Add email open/click tracking
//   - Set up DKIM/SPF records for your domain to avoid spam filters
// =============================================================================

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;                    // Plain text fallback
  replyTo?: string;
}

// ─── Core Send Function ───────────────────────────────────────────────────────

/**
 * Sends an email. Currently a console stub.
 * Replace the body with your email provider's SDK call.
 *
 * @returns true on success, false on failure
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  // STUB: Log to console in development
  console.log("[Email] Sending email:", {
    to: payload.to,
    subject: payload.subject,
    preview: payload.html.replace(/<[^>]+>/g, "").slice(0, 100) + "...",
  });

  // TODO (PRODUCTION — Resend):
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const { error } = await resend.emails.send({
  //   from: 'Vine Dental Clinic <noreply@vinedentalclinic.ng>',
  //   to: payload.to,
  //   subject: payload.subject,
  //   html: payload.html,
  //   text: payload.text,
  //   reply_to: payload.replyTo ?? 'vinedentalclinic@yahoo.co.uk',
  // });
  // if (error) { console.error('[Email] Send failed:', error); return false; }

  // TODO (PRODUCTION — Nodemailer):
  // await transporter.sendMail({
  //   from: '"Vine Dental Clinic" <noreply@vinedentalclinic.ng>',
  //   to: payload.to,
  //   subject: payload.subject,
  //   html: payload.html,
  //   text: payload.text,
  // });

  return true; // Stub always succeeds
}

// ─── Specific Email Senders ───────────────────────────────────────────────────

/** Send booking confirmation to patient. */
export async function sendBookingConfirmation(params: {
  patientEmail: string;
  patientName: string;
  bookingRef: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<boolean> {
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
      <div style="background: #0D7377; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Booking Request Received ✓</h1>
      </div>
      <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">Dear ${params.patientName},</p>
        <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">
          Thank you for booking with Vine Dental Clinic. We've received your appointment request
          and will confirm it within 2 hours during business hours.
        </p>
        <div style="background: white; border: 1px solid #d1d5db; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <h2 style="color: #0D7377; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Booking Details</h2>
          <table style="width: 100%; font-size: 14px;">
            <tr><td style="color: #6b7280; padding: 4px 0;">Reference:</td><td style="color: #111827; font-weight: bold;">${params.bookingRef}</td></tr>
            <tr><td style="color: #6b7280; padding: 4px 0;">Service:</td><td style="color: #111827;">${params.serviceName}</td></tr>
            <tr><td style="color: #6b7280; padding: 4px 0;">Date:</td><td style="color: #111827;">${params.preferredDate}</td></tr>
            <tr><td style="color: #6b7280; padding: 4px 0;">Time:</td><td style="color: #111827;">${params.preferredTime}</td></tr>
          </table>
        </div>
        <p style="color: #374151; font-size: 14px; margin: 0 0 8px;"><strong>Questions?</strong></p>
        <p style="color: #374151; font-size: 14px; margin: 0;">
          Call us: <a href="tel:+2348023657067" style="color: #0D7377;">+234 802 365 7067</a><br>
          WhatsApp: <a href="https://wa.me/2348023657067" style="color: #0D7377;">Chat with us</a><br>
          Email: <a href="mailto:vinedentalclinic@yahoo.co.uk" style="color: #0D7377;">vinedentalclinic@yahoo.co.uk</a>
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
          Vine Dental Clinic · 42 Oduduwa Crescent, Ikeja GRA, Lagos · Est. 1995
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: params.patientEmail,
    subject: `Booking Request Received — Ref: ${params.bookingRef} | Vine Dental Clinic`,
    html,
    replyTo: "vinedentalclinic@yahoo.co.uk",
  });
}

/** Send admin notification of new booking. */
export async function sendAdminNewBookingAlert(params: {
  bookingRef: string;
  patientName: string;
  patientPhone: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  paymentMethod: string;
}): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px;">
      <h2 style="color: #0D7377;">🦷 New Booking — ${params.bookingRef}</h2>
      <table style="font-size: 14px; width: 100%;">
        <tr><td style="color: #6b7280; padding: 4px 0; width: 140px;">Patient:</td><td>${params.patientName}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Phone:</td><td><a href="tel:${params.patientPhone}">${params.patientPhone}</a></td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Service:</td><td>${params.serviceName}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Date:</td><td>${params.preferredDate}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Time:</td><td>${params.preferredTime}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Payment:</td><td>${params.paymentMethod}</td></tr>
        ${params.notes ? `<tr><td style="color: #6b7280; padding: 4px 0;">Notes:</td><td>${params.notes}</td></tr>` : ""}
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f0fafa; border-radius: 8px;">
        <p style="margin: 0; font-size: 13px; color: #374151;">
          <a href="https://vinedentalclinic.com.ng/admin/bookings" style="color: #0D7377; font-weight: bold;">
            → View in Admin Dashboard
          </a>
        </p>
      </div>
    </div>
  `;

  // TODO (PRODUCTION): Replace with actual admin email
  return sendEmail({
    to: "vinedentalclinic@yahoo.co.uk",
    subject: `[NEW BOOKING] ${params.patientName} — ${params.serviceName} — ${params.bookingRef}`,
    html,
  });
}

/** Send 24-hour appointment reminder to patient. */
export async function sendAppointmentReminder(params: {
  patientEmail: string;
  patientName: string;
  bookingRef: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<boolean> {
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
      <h2 style="color: #0D7377;">⏰ Reminder: Your Appointment is Tomorrow</h2>
      <p style="color: #374151;">Hi ${params.patientName},</p>
      <p style="color: #374151;">
        Just a friendly reminder that you have a dental appointment at <strong>Vine Dental Clinic</strong> tomorrow.
      </p>
      <div style="background: #f0fafa; border: 1px solid #a1e0e0; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0; font-size: 14px;"><strong>${params.serviceName}</strong></p>
        <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">${params.preferredDate} at ${params.preferredTime}</p>
        <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">Ref: ${params.bookingRef}</p>
      </div>
      <p style="color: #374151; font-size: 14px;">
        📍 42 Oduduwa Crescent, Ikeja GRA, Lagos<br>
        📞 <a href="tel:+2348023657067" style="color: #0D7377;">+234 802 365 7067</a> (to reschedule)
      </p>
      <p style="color: #374151; font-size: 14px;">Please arrive 5-10 minutes early. We look forward to seeing you!</p>
    </div>
  `;

  return sendEmail({
    to: params.patientEmail,
    subject: `Reminder: ${params.serviceName} Tomorrow — Vine Dental Clinic`,
    html,
    replyTo: "vinedentalclinic@yahoo.co.uk",
  });
}
