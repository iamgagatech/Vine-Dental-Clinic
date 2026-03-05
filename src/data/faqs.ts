// =============================================================================
// VINE DENTAL CLINIC — FAQs Data
// 10 FAQs addressing key patient objections: safety, pain, pricing, insurance,
// booking, results, and emergency care.
// =============================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "safety" | "pricing" | "pain" | "insurance" | "booking" | "results" | "general";
  order: number;
}

export const FAQS: FAQ[] = [
  {
    id: "faq-001",
    question: "Is dental treatment at Vine Dental Clinic safe?",
    answer:
      "Absolutely. Patient safety is our highest priority. We follow strict sterilisation and infection control protocols recommended by the Nigerian Dental Association. All instruments are sterilised between patients, and our clinic is maintained to the highest standards of hygiene. With over 28 years in practice, our team is experienced in safely managing all types of dental procedures for patients of all ages.",
    category: "safety",
    order: 1,
  },
  {
    id: "faq-002",
    question: "Will the treatment be painful?",
    answer:
      "Modern dentistry has come a long way — most procedures involve minimal to no discomfort when performed under appropriate local anaesthesia. We take great care to ensure you are comfortable before and during every procedure. For anxious patients, we discuss your concerns beforehand and take a gentle, patient-centred approach. Many of our patients are pleasantly surprised by how comfortable their experience is.",
    category: "pain",
    order: 2,
  },
  {
    id: "faq-003",
    question: "How much does treatment cost?",
    answer:
      "Treatment costs vary depending on the procedure. Routine scaling and polishing starts from ₦8,000, while more complex treatments like dental implants or orthodontics are priced based on an individual assessment. We provide transparent pricing before any treatment begins — no hidden fees. We also offer indicative price ranges on each service page to help you plan. Call us at +2348023657067 for a specific quote.",
    category: "pricing",
    order: 3,
  },
  {
    id: "faq-004",
    question: "Do you accept HMO / health insurance?",
    answer:
      "Yes, we welcome patients with HMO (Health Maintenance Organisation) coverage. We accept several major HMO plans. Please contact us with your HMO details before your visit so we can confirm coverage and ensure a smooth experience. As one of our patients noted in their review: 'HMOs are welcomed here.' We also accept cash, Paystack (card/bank transfer), and direct bank transfers.",
    category: "insurance",
    order: 4,
  },
  {
    id: "faq-005",
    question: "How do I book an appointment?",
    answer:
      "Booking is simple. You can use our online booking form on this website, send us a WhatsApp message, call us directly at +2348023657067, or send an email to vinedentalclinic@yahoo.co.uk. We're available Monday to Saturday, 9:00 AM to 4:00 PM. Online bookings can be made 24/7. We'll confirm your appointment within a few hours during business hours.",
    category: "booking",
    order: 5,
  },
  {
    id: "faq-006",
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit typically includes a comprehensive examination of your teeth, gums, and oral tissues. We'll take any necessary X-rays to get a full picture of your oral health. We'll then discuss our findings with you, explain any recommended treatments, and answer all your questions — with no pressure to proceed immediately. Plan for about 45-60 minutes for an initial appointment.",
    category: "general",
    order: 6,
  },
  {
    id: "faq-007",
    question: "How long do teeth whitening results last?",
    answer:
      "Professional teeth whitening results typically last between 1 to 3 years, depending on your diet and oral hygiene habits. Avoiding staining foods and beverages (tea, coffee, red wine) and maintaining good brushing habits will significantly extend your results. We can also provide take-home maintenance trays to help you top up your whitening and keep your smile bright longer.",
    category: "results",
    order: 7,
  },
  {
    id: "faq-008",
    question: "Do you treat children?",
    answer:
      "Yes! We have a dedicated pediatric dentistry service and are experienced in creating a positive, comfortable environment for children. We recommend children have their first dental visit by age 2-3, or when their first teeth appear. Early visits help establish good habits and reduce anxiety about dental care. Our team is patient, gentle, and skilled at working with children of all ages.",
    category: "general",
    order: 8,
  },
  {
    id: "faq-009",
    question: "What should I do in a dental emergency?",
    answer:
      "If you're experiencing severe tooth pain, a knocked-out tooth, a broken tooth, or significant swelling, call us immediately at +2348023657067. We prioritise emergency patients and will see you as quickly as possible. For a knocked-out tooth: keep it moist (place in milk or your own saliva), handle it by the crown (not the root), and get to us within the hour for the best chance of saving it. You can also WhatsApp us for immediate guidance.",
    category: "general",
    order: 9,
  },
  {
    id: "faq-010",
    question: "How often should I visit the dentist?",
    answer:
      "We recommend a check-up and professional cleaning every 6 months for most patients. Some patients with gum disease, a high cavity risk, or other ongoing conditions may benefit from more frequent visits — we'll advise you personally based on your oral health status. Regular check-ups are the most cost-effective way to maintain your dental health and avoid expensive treatments down the line.",
    category: "general",
    order: 10,
  },
];

/** Get FAQs by category */
export function getFAQsByCategory(category: FAQ["category"]): FAQ[] {
  return FAQS.filter((f) => f.category === category).sort(
    (a, b) => a.order - b.order
  );
}

/** Get all FAQs sorted by order */
export function getAllFAQs(): FAQ[] {
  return [...FAQS].sort((a, b) => a.order - b.order);
}
