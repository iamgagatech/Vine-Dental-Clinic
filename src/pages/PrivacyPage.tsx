// =============================================================================
// VINE DENTAL CLINIC — Privacy Policy Page
// =============================================================================

import { useEffect } from "react";
import { CLINIC_INFO } from "../lib/constants";

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Vine Dental Clinic Lagos";
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

          <div className="prose prose-gray max-w-none space-y-8 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Vine Dental Clinic ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and protect information about you when you visit our website or book an appointment.
              </p>
              <p className="mt-3">
                By using our website or services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Name and contact details (phone number, email address)</li>
                <li>Appointment preferences (service, date, time)</li>
                <li>Medical notes or symptoms you choose to share</li>
                <li>Payment information (processed securely via Paystack)</li>
              </ul>
              <p className="mt-3">
                We may also automatically collect certain information when you visit our website, including browser type, IP address, pages visited, and time spent on pages (via analytics tools).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Schedule and confirm your dental appointments</li>
                <li>Contact you regarding your appointments via phone, WhatsApp, or email</li>
                <li>Send appointment reminders and follow-up communications</li>
                <li>Improve our website and services</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Data Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your data with:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Payment processors (Paystack) solely to process payments securely</li>
                <li>Communication providers (email/SMS services) to send confirmations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Data Security</h2>
              <p>
                We implement appropriate technical and organisational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, or unauthorised disclosure. However, no method of electronic transmission or storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Dental records are typically retained for a minimum of 7 years in accordance with Nigerian health regulations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information (subject to legal obligations)</li>
                <li>Object to the processing of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Cookies</h2>
              <p>
                Our website may use cookies to improve your experience. Cookies are small text files placed on your device. You can control cookie settings through your browser preferences. Essential cookies required for the website to function cannot be disabled.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites (such as Google Maps, WhatsApp, and Google Reviews). We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-3 bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <p className="font-semibold text-gray-900">Vine Dental Clinic</p>
                <p>{CLINIC_INFO.address.full}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${CLINIC_INFO.contact.email}`} className="text-teal-700 hover:underline">
                    {CLINIC_INFO.contact.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href={`tel:${CLINIC_INFO.contact.phoneTel}`} className="text-teal-700 hover:underline">
                    {CLINIC_INFO.contact.phoneDisplay}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
