// =============================================================================
// VINE DENTAL CLINIC — Services Data
// Full service definitions. Single source of truth for all service content.
// =============================================================================

import type { Service } from "../types/service";

export const SERVICES: Service[] = [
  {
    id: "dental-scaling-polishing",
    name: "Dental Scaling & Polishing",
    slug: "dental-scaling-polishing",
    category: "preventive",
    icon: "Sparkles",
    shortDescription:
      "Remove stubborn stains and plaque for a brighter, healthier smile in one visit.",
    fullDescription:
      "Professional dental scaling and polishing is the cornerstone of preventive dental care. Our skilled hygienists use ultrasonic scalers to gently remove calculus (hardened plaque) and tartar buildup from above and below the gum line — areas your toothbrush simply cannot reach.\n\nAfter scaling, we polish your teeth using a fine paste that removes surface stains from tea, coffee, red wine, and other foods, leaving your teeth noticeably cleaner and brighter. The procedure is comfortable, and most patients report immediate freshness.\n\nWe recommend this treatment every 6 months to prevent gum disease, tooth decay, and bad breath. Our experienced team at Vine Dental Clinic has been providing this essential service since 1995, keeping thousands of Lagos families smiling confidently.",
    benefits: [
      "Prevents gum disease (gingivitis & periodontitis) before it starts",
      "Removes years of stubborn stains in a single appointment",
      "Leaves teeth noticeably smoother and fresher immediately",
      "Early detection of cavities or issues during the examination",
    ],
    priceRange: { min: 8000, max: 20000, currency: "NGN" },
    duration: "45-60 mins",
    bookingCTA: "Book Scaling & Polishing",
    requiresConsultation: false,
    sameDayAvailable: true,
    hmoEligible: true,
    featured: true,
    order: 1,
    seo: {
      metaTitle: "Dental Scaling & Polishing in Ikeja Lagos | Vine Dental Clinic",
      metaDescription:
        "Professional dental scaling and polishing in Ikeja GRA, Lagos. Remove stains, plaque & tartar for a brighter smile. Book today — HMOs accepted.",
      keywords: ["dental scaling Lagos", "teeth polishing Ikeja", "plaque removal Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "tooth-extraction",
    name: "Tooth Extraction",
    slug: "tooth-extraction",
    category: "surgical",
    icon: "Scissors",
    shortDescription:
      "Safe, painless removal with expert aftercare guidance for fast, comfortable recovery.",
    fullDescription:
      "At Vine Dental Clinic, we always explore every option to save your natural tooth before recommending extraction. When extraction is necessary — due to severe decay, crowding, or infection — our experienced dentists ensure the procedure is as comfortable and painless as possible.\n\nWe use effective local anaesthesia to ensure you feel no pain during the procedure. Our team then guides you step-by-step through post-extraction aftercare to minimise swelling, prevent dry socket, and promote rapid healing.\n\nWhether you need a simple extraction or a more complex surgical removal, our 28+ years of experience means you're in safe, skilled hands. We also discuss tooth replacement options such as dental implants or bridges to restore your smile after healing.",
    benefits: [
      "Thorough anaesthesia ensures a pain-free procedure",
      "Detailed aftercare instructions for fast, smooth recovery",
      "Same-day extraction available for urgent cases",
      "Post-extraction replacement options discussed at your visit",
    ],
    priceRange: { min: 5000, max: 25000, currency: "NGN" },
    duration: "30-60 mins",
    bookingCTA: "Book Tooth Extraction",
    requiresConsultation: false,
    sameDayAvailable: true,
    hmoEligible: true,
    featured: false,
    order: 2,
    seo: {
      metaTitle: "Tooth Extraction in Ikeja Lagos | Vine Dental Clinic",
      metaDescription:
        "Safe, painless tooth extraction in Ikeja GRA, Lagos. Expert dentists with 28+ years experience. Same-day available. Call +2348023657067.",
      keywords: ["tooth extraction Lagos", "teeth removal Ikeja", "dental extraction Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "dental-fillings-restorations",
    name: "Dental Fillings & Restorations",
    slug: "dental-fillings-restorations",
    category: "restorative",
    icon: "Shield",
    shortDescription:
      "Restore damaged teeth with durable, natural-looking materials that last for years.",
    fullDescription:
      "Cavities and tooth damage left untreated will worsen over time, leading to pain, infection, and potential tooth loss. At Vine Dental Clinic, we offer composite resin (tooth-coloured) and other high-quality filling materials to restore the integrity and appearance of your teeth.\n\nOur tooth-coloured composite fillings blend seamlessly with your natural teeth, making them virtually invisible. They bond directly to the tooth structure, providing excellent support and durability. The entire procedure is completed in a single visit under local anaesthesia.\n\nBeyond simple cavities, we also restore cracked, chipped, or fractured teeth — helping you regain full chewing function and a natural-looking smile. Our restoration work is designed to last, backed by over 28 years of clinical expertise.",
    benefits: [
      "Tooth-coloured fillings that match your natural enamel perfectly",
      "Completed in a single appointment — no return visits needed",
      "Stops decay progression, protecting the tooth from further damage",
      "Restores full chewing strength and comfort immediately",
    ],
    priceRange: { min: 10000, max: 35000, currency: "NGN" },
    duration: "30-60 mins",
    bookingCTA: "Book a Filling Consultation",
    requiresConsultation: false,
    sameDayAvailable: true,
    hmoEligible: true,
    featured: true,
    order: 3,
    seo: {
      metaTitle: "Dental Fillings & Restorations in Lagos | Vine Dental Clinic",
      metaDescription:
        "Natural-looking dental fillings and tooth restorations in Ikeja GRA, Lagos. Tooth-coloured composite fillings. Book your appointment today.",
      keywords: ["dental fillings Lagos", "tooth restoration Ikeja", "composite filling Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "root-canal-treatment",
    name: "Root Canal Treatment",
    slug: "root-canal-treatment",
    category: "surgical",
    icon: "Activity",
    shortDescription:
      "Save your natural tooth and eliminate pain permanently with modern root canal therapy.",
    fullDescription:
      "Root canal treatment often carries an unfair reputation for being painful — the truth is, modern root canal therapy is no more uncomfortable than getting a filling, and it eliminates the severe pain caused by an infected or inflamed tooth pulp.\n\nDuring the procedure, our dentist carefully removes the infected pulp tissue, cleans and shapes the root canals, then seals them with a biocompatible material. The tooth is then typically capped with a crown for full strength restoration. Most patients feel significant relief immediately after treatment.\n\nAt Vine Dental Clinic, we've been saving teeth that patients feared they would lose for over 28 years. Like one of our long-term patients, Dike Ogbonnaya, who came in fearing extraction — we treated him successfully, and he has had no complaints since 2003.",
    benefits: [
      "Saves your natural tooth — avoiding extraction and costly replacements",
      "Eliminates infection and severe toothache permanently",
      "Modern techniques make the procedure gentle and low-discomfort",
      "Treated tooth can last a lifetime with proper care",
    ],
    priceRange: { min: 35000, max: 80000, currency: "NGN" },
    duration: "60-90 mins",
    bookingCTA: "Book Root Canal Consultation",
    requiresConsultation: true,
    sameDayAvailable: false,
    hmoEligible: true,
    featured: false,
    order: 4,
    seo: {
      metaTitle: "Root Canal Treatment in Ikeja Lagos | Vine Dental Clinic",
      metaDescription:
        "Expert root canal treatment in Ikeja GRA, Lagos. Save your natural tooth and relieve pain. 28+ years experience. HMOs accepted. Book today.",
      keywords: ["root canal Lagos", "root canal treatment Ikeja", "endodontics Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    slug: "teeth-whitening",
    category: "cosmetic",
    icon: "Sun",
    shortDescription:
      "Professional whitening for visibly brighter teeth in under an hour. Immediate results.",
    fullDescription:
      "Professional teeth whitening at Vine Dental Clinic delivers dramatically brighter results that no over-the-counter product can match. Using clinically proven whitening agents in a controlled environment, we can lighten your teeth by several shades in a single session.\n\nUnlike store-bought strips or trays, our professional treatment is customised to your teeth's current shade and your desired outcome. We protect your gums and surrounding tissue throughout the process to ensure safety and minimise any temporary sensitivity.\n\nTeeth whitening is ideal for removing stains from coffee, tea, red wine, tobacco, and the natural yellowing that comes with age. Many patients describe the confidence boost they feel afterwards as life-changing — and it shows in their smiles.",
    benefits: [
      "Visibly brighter teeth by several shades in one appointment",
      "Safe, professionally controlled process with gum protection",
      "Results that last 1-3 years with proper oral hygiene",
      "Immediate confidence boost for special occasions or everyday life",
    ],
    priceRange: { min: 25000, max: 60000, currency: "NGN" },
    duration: "45-60 mins",
    bookingCTA: "Book Teeth Whitening",
    requiresConsultation: false,
    sameDayAvailable: false,
    hmoEligible: false,
    featured: true,
    order: 5,
    seo: {
      metaTitle: "Professional Teeth Whitening in Lagos | Vine Dental Clinic",
      metaDescription:
        "Professional teeth whitening in Ikeja GRA, Lagos. Brighten your smile by several shades in one visit. Book your whitening appointment today.",
      keywords: ["teeth whitening Lagos", "professional whitening Ikeja", "tooth bleaching Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    slug: "dental-implants",
    category: "restorative",
    icon: "Anchor",
    shortDescription:
      "Permanent tooth replacement that looks, feels, and functions exactly like natural teeth.",
    fullDescription:
      "Dental implants are the gold standard for tooth replacement. A titanium post is surgically placed into the jawbone, where it integrates with the bone over several weeks — creating a permanent, stable root for a custom-crafted crown that looks and functions just like a natural tooth.\n\nUnlike dentures or bridges, implants don't shift, slip, or require adhesives. They stimulate the jawbone, preventing the bone loss that naturally occurs after tooth extraction. With proper care, a dental implant can last a lifetime.\n\nAt Vine Dental Clinic, we conduct a thorough assessment including X-rays to determine your suitability for implants. We'll walk you through every stage of the process and discuss financing options to make this life-changing treatment accessible.",
    benefits: [
      "Permanent, lifetime solution that never needs removing",
      "Preserves jawbone density — prevents the 'sunken' appearance of bone loss",
      "Eat, speak, and smile with complete confidence and comfort",
      "No impact on adjacent healthy teeth (unlike bridges)",
    ],
    priceRange: { min: 150000, max: 350000, currency: "NGN", fromOnly: true },
    duration: "Multiple visits",
    bookingCTA: "Book Implant Consultation",
    requiresConsultation: true,
    sameDayAvailable: false,
    hmoEligible: false,
    featured: true,
    order: 6,
    seo: {
      metaTitle: "Dental Implants in Ikeja Lagos | Vine Dental Clinic",
      metaDescription:
        "Premium dental implants in Ikeja GRA, Lagos. Permanent tooth replacement that looks and feels natural. Expert consultation. Book today.",
      keywords: ["dental implants Lagos", "tooth implant Ikeja", "dental implants Nigeria"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "orthodontics-braces",
    name: "Orthodontics (Braces)",
    slug: "orthodontics-braces",
    category: "orthodontic",
    icon: "GitMerge",
    shortDescription:
      "Straighten teeth and correct bite issues for a confident, lasting smile you'll love.",
    fullDescription:
      "Crooked teeth, gaps, and bite problems affect not just your appearance but also your oral health — misaligned teeth are harder to clean, increasing the risk of cavities and gum disease. Our orthodontic treatments correct these issues effectively for both children and adults.\n\nWe offer traditional metal braces, ceramic (tooth-coloured) braces, and will guide you through which option best suits your lifestyle, budget, and treatment goals. Our orthodontist designs a personalised treatment plan and monitors progress at regular adjustment appointments throughout your journey.\n\nStraightening your teeth is one of the most impactful investments in your long-term oral health and self-confidence. Many of our adult patients tell us they wish they'd done it sooner.",
    benefits: [
      "Corrects crowding, gaps, overbite, underbite, and crossbite",
      "Improves oral hygiene — straight teeth are easier to clean properly",
      "Options for adults and children with discreet ceramic choices",
      "Boosts confidence with a straight, healthy smile that lasts a lifetime",
    ],
    priceRange: { min: 150000, max: 400000, currency: "NGN", fromOnly: true },
    duration: "12-24 months",
    bookingCTA: "Book Orthodontic Consultation",
    requiresConsultation: true,
    sameDayAvailable: false,
    hmoEligible: false,
    featured: true,
    order: 7,
    seo: {
      metaTitle: "Braces & Orthodontics in Ikeja Lagos | Vine Dental Clinic",
      metaDescription:
        "Professional orthodontic treatment and braces in Ikeja GRA, Lagos. Straighten your teeth with expert care. Book a consultation today.",
      keywords: ["braces Lagos", "orthodontics Ikeja", "teeth straightening Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "crowns-bridges",
    name: "Crowns & Bridges",
    slug: "crowns-bridges",
    category: "restorative",
    icon: "Crown",
    shortDescription:
      "Custom restorations crafted to blend seamlessly with your natural teeth in shape and colour.",
    fullDescription:
      "Dental crowns and bridges are precision-crafted restorations that repair and replace teeth with lasting results. A crown (cap) is placed over a damaged or weakened tooth to restore its full shape, strength, and appearance. A bridge uses crowns on adjacent teeth to support one or more artificial teeth in a gap.\n\nOur crowns are fabricated from high-quality materials including porcelain-fused-to-metal and all-ceramic options that match the shade, shape, and translucency of your natural teeth. The result is a restoration that looks completely natural and withstands the full forces of everyday chewing.\n\nThe process typically involves two appointments: one to prepare the tooth and take impressions, and a second to fit and cement your permanent restoration. We provide a temporary crown in between to keep you comfortable.",
    benefits: [
      "Custom-shade matched to your natural teeth for invisible results",
      "Restores full biting and chewing strength to damaged teeth",
      "Protects teeth weakened by large fillings or root canal treatment",
      "Fixed bridge permanently replaces missing teeth without surgery",
    ],
    priceRange: { min: 40000, max: 120000, currency: "NGN" },
    duration: "2 visits",
    bookingCTA: "Book Crown/Bridge Consultation",
    requiresConsultation: true,
    sameDayAvailable: false,
    hmoEligible: true,
    featured: false,
    order: 8,
    seo: {
      metaTitle: "Dental Crowns & Bridges in Lagos | Vine Dental Clinic",
      metaDescription:
        "Custom dental crowns and bridges in Ikeja GRA, Lagos. Natural-looking restorations from expert dentists. HMOs accepted. Book today.",
      keywords: ["dental crowns Lagos", "dental bridge Ikeja", "tooth cap Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "emergency-dental-care",
    name: "Emergency Dental Care",
    slug: "emergency-dental-care",
    category: "emergency",
    icon: "AlertCircle",
    shortDescription:
      "Same-day relief for sudden dental pain, broken teeth, or dental injuries. We're here.",
    fullDescription:
      "Dental emergencies are frightening and often intensely painful. A broken tooth, severe toothache, knocked-out tooth, or a lost filling can happen at any time — and at Vine Dental Clinic, we prioritise emergency patients to get you seen and treated as quickly as possible.\n\nCalled us in crisis? We'll assess your situation over the phone, advise you on immediate steps to take, and schedule you for the earliest possible appointment. Our team is experienced in emergency extractions, emergency pulp therapy, re-cementing crowns, and managing dental trauma.\n\nIf you're experiencing severe pain, visible swelling, a broken tooth, or a dental injury, please call us immediately at +2348023657067. Do not wait — dental emergencies can escalate quickly.",
    benefits: [
      "Priority same-day appointments for patients in pain",
      "Immediate phone guidance on managing pain before your visit",
      "Full range of emergency treatments — extractions, repairs, root canals",
      "Experienced team who have managed dental emergencies since 1995",
    ],
    priceRange: { min: 10000, max: 50000, currency: "NGN", label: "Varies by treatment" },
    duration: "Same day",
    bookingCTA: "Get Emergency Help Now",
    requiresConsultation: false,
    sameDayAvailable: true,
    hmoEligible: true,
    featured: false,
    order: 9,
    seo: {
      metaTitle: "Emergency Dental Care in Lagos | Vine Dental Clinic Ikeja",
      metaDescription:
        "Emergency dental care in Ikeja GRA, Lagos. Same-day appointments for severe toothache, broken teeth & dental injuries. Call +2348023657067 now.",
      keywords: ["emergency dentist Lagos", "emergency dental care Ikeja", "urgent dentist Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    slug: "pediatric-dentistry",
    category: "pediatric",
    icon: "Heart",
    shortDescription:
      "Gentle, child-friendly dental care in a warm, comfortable environment kids actually enjoy.",
    fullDescription:
      "A positive early dental experience shapes a child's attitude towards oral health for life. At Vine Dental Clinic, we've been the dental home for families across Lagos since 1995 — treating children with the gentle, patient approach they deserve.\n\nOur team is experienced in managing child anxiety, explaining procedures in child-friendly language, and making the dental chair feel safe and even fun. We offer routine check-ups, fluoride treatments, fissure sealants, and paediatric restorations — all tailored to a child's developing dentition.\n\nAs one of our long-term patients, Olubunmi Ogunshina, shared: 'This clinic has been home to me and my children over the years... the courtesy and attention to detail is top-notch.' We are proud to be trusted by Lagos families generation after generation.",
    benefits: [
      "Child-friendly environment that reduces dental anxiety from the start",
      "Preventive treatments: fluoride, sealants to protect developing teeth",
      "Experienced team in managing children's unique dental needs",
      "Builds lifelong positive attitudes towards dental health",
    ],
    priceRange: { min: 5000, max: 25000, currency: "NGN" },
    duration: "30-45 mins",
    bookingCTA: "Book for Your Child",
    requiresConsultation: false,
    sameDayAvailable: true,
    hmoEligible: true,
    featured: true,
    order: 10,
    seo: {
      metaTitle: "Pediatric Dentistry for Children in Lagos | Vine Dental Clinic",
      metaDescription:
        "Child-friendly pediatric dentistry in Ikeja GRA, Lagos. Gentle, expert care for children of all ages. Trusted by Lagos families since 1995.",
      keywords: ["pediatric dentist Lagos", "children's dentist Ikeja", "kids dentist Lagos"],
      schemaType: "MedicalProcedure",
    },
  },
];

/** Get a service by its slug */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Get featured services for homepage display */
export function getFeaturedServices(): Service[] {
  return SERVICES.filter((s) => s.featured).sort((a, b) => a.order - b.order);
}

/** Get services by category */
export function getServicesByCategory(category: string): Service[] {
  return SERVICES.filter((s) => s.category === category).sort(
    (a, b) => a.order - b.order
  );
}
