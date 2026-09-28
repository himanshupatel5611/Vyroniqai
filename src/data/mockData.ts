import { PortfolioItem, ServiceItem, WebsiteRequest, Testimonial } from '../types/index.ts';

export const HERO_SHOWCASE_IMAGE = '/src/assets/images/vyroniq_hero_showcase_1790598092161.jpg';
export const VYRONIQ_LOGO_IMAGE = '/src/assets/images/vyroniq_official_logo_1790599417432.jpg';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'urban-roast-cafe',
    title: 'Urban Roast Roastery & Kitchen',
    category: 'Dining & Hospitality',
    tagline: 'Specialty Coffee House & Artisanal Bistro',
    description: 'A dark, rich aesthetic website with digital QR menu, table reservations, and automated WhatsApp order inquiries for a specialty coffee shop.',
    image: '/src/assets/images/portfolio_cafe_mockup_1790598106873.jpg',
    highlights: ['Online Menu Integration', 'Instant WhatsApp Reservation', 'Google Maps Sync'],
    features: ['Dark ambient aesthetic', 'Fast 0.8s mobile load time', 'One-click directions & call'],
    turnaroundDays: 2
  },
  {
    id: 'aura-dental-studio',
    title: 'Aura Dental & Aesthetic Care',
    category: 'Healthcare & Wellness',
    tagline: 'Modern Multi-Specialty Dental & Smile Clinic',
    description: 'A clean, metallic slate medical website featuring doctor credentials, interactive treatments menu, and frictionless patient appointment scheduling.',
    image: '/src/assets/images/portfolio_clinic_mockup_1790598116771.jpg',
    highlights: ['Appointment Request Engine', 'Doctor Credentials Showcase', 'Patient Reviews Display'],
    features: ['HIPAA-conscious privacy form', 'Mobile quick-dial call CTA', 'Treatment comparison cards'],
    turnaroundDays: 3
  },
  {
    id: 'vanguard-leathercraft',
    title: 'Vanguard Atelier Leatherworks',
    category: 'Retail & Commerce',
    tagline: 'Handcrafted Luxury Goods & Bespoke Accessories',
    description: 'A luxury boutique storefront displaying handcrafted leather goods with rich imagery, WhatsApp direct purchasing, and catalog downloads.',
    image: '/src/assets/images/portfolio_retail_mockup_1790598128092.jpg',
    highlights: ['Product Lookbook Gallery', 'Direct WhatsApp Checkout', 'Customer Inquiry Tracking'],
    features: ['High-resolution zoom gallery', 'Zero-transaction-fee ordering', 'Instagram social feed link'],
    turnaroundDays: 3
  },
  {
    id: 'vertex-legal-associates',
    title: 'Vertex Law & Corporate Advisory',
    category: 'Professional Services',
    tagline: 'Corporate Advisory, Taxation & Litigation Partners',
    description: 'A sharp, authoritative corporate portal for legal practitioners and chartered accountants, featuring case studies, fee schedule guides, and consultation booking.',
    image: '/src/assets/images/vyroniq_hero_showcase_1790598092161.jpg',
    highlights: ['Client Consultation Scheduler', 'Practice Areas Index', 'Confidential Inquiry Portal'],
    features: ['Bilingual language support ready', 'Document upload interface', 'Secure SSL configuration'],
    turnaroundDays: 2
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    title: 'Custom Responsive Web Architecture',
    description: 'Hand-tailored websites designed specifically for your brand personality and customers. No rigid template restrictions or outdated layouts.',
    deliverables: [
      'Tailored dark or modern aesthetic',
      'Pixel-perfect mobile, tablet & desktop layout',
      'Lightning-fast page speeds (<1.2s)',
      'Clean typography & custom brand palette'
    ],
    iconName: 'Layout'
  },
  {
    number: '02',
    title: 'Continuous Maintenance & Updates Included',
    description: 'Never worry about your website breaking or becoming obsolete. All minor content updates, menu changes, image swaps, and security patches are included.',
    deliverables: [
      'Unlimited monthly text & image updates',
      'Continuous security & SSL management',
      '24/7 uptime monitoring & daily backups',
      'Zero maintenance headache for your team'
    ],
    iconName: 'ShieldCheck'
  },
  {
    number: '03',
    title: 'High-Speed Cloud Hosting & SSL Security',
    description: 'Enterprise-grade hosting infrastructure on global content delivery networks with automated HTTPS certificate renewal and 99.9% uptime reliability.',
    deliverables: [
      'Global Edge CDN acceleration',
      'Free SSL security certificate',
      'Custom domain connection support',
      'DDoS protection and automated backup'
    ],
    iconName: 'Server'
  },
  {
    number: '04',
    title: 'Frictionless WhatsApp Lead Capture',
    description: 'Turn casual visitors into immediate paying customers with one-tap WhatsApp chat buttons that prefill specific inquiries directly to your phone.',
    deliverables: [
      'Instant floating WhatsApp button',
      'Automated prefilled message templates',
      'Direct call-now phone buttons',
      'Custom lead capture inquiry forms'
    ],
    iconName: 'MessageSquare'
  },
  {
    number: '05',
    title: 'Local SEO & Google Maps Placement',
    description: 'Structured search engine optimization metadata and Google Business profile optimization so local clients find you on Google Search and Maps.',
    deliverables: [
      'Schema.org local business structured data',
      'Targeted local keywords & meta tags',
      'Google Maps embed & click-to-navigate',
      'OpenGraph preview cards for social sharing'
    ],
    iconName: 'Search'
  },
  {
    number: '06',
    title: 'E-Commerce & Digital Catalog Ready',
    description: 'Showcase your full inventory or services catalog with filterable product galleries, pricing tables, and WhatsApp direct checkout with zero commissions.',
    deliverables: [
      'Interactive catalog with categories',
      'Direct order via WhatsApp cart',
      'Downloadable PDF menus & brochures',
      'Zero percentage cuts on your revenue'
    ],
    iconName: 'ShoppingBag'
  }
];

export const INITIAL_REQUESTS: WebsiteRequest[] = [];

export const FAQS = [
  {
    question: 'How can VYRONIQ.AI offer professional websites starting at only ₹699/month?',
    answer: 'We utilize an optimized, high-efficiency engineering workflow combining modern responsive web frameworks and proprietary design systems. Instead of charging huge upfront fees (₹30,000–₹80,000) that burden small businesses, we provide continuous service and maintenance under a manageable, transparent subscription.'
  },
  {
    question: 'Is website maintenance really included in both plans?',
    answer: 'Yes! Both the ₹699/month and ₹6,999/year plans include full ongoing maintenance. If you need to change your prices, update your phone number, add new photos, or post a new announcement, simply WhatsApp our team and we handle it promptly at no extra charge.'
  },
  {
    question: 'How fast will my website be live?',
    answer: 'Once you submit your "Build My Website" brief, our team delivers your live preview draft within 48 to 72 hours. You review it, request any changes, and once approved, we connect your custom domain and take it live.'
  },
  {
    question: 'What happens if I already have a domain name?',
    answer: 'We seamlessly connect your existing domain (from GoDaddy, Namecheap, Google Domains, etc.) at no additional charge. If you do not have one yet, our annual plan (₹6,999/year) includes full domain assistance.'
  },
  {
    question: 'Do I have to pay anything right now to submit the form?',
    answer: 'Zero upfront payment is required to submit your request! Our engineering team reviews your questionnaire, confirms details with you via WhatsApp, and builds your working draft. You only begin your subscription once you are thrilled with your website.'
  },
  {
    question: 'Can I cancel or switch plans anytime?',
    answer: 'Yes, absolutely. There are no lock-in contracts on the monthly plan. You can pause or cancel anytime, and you always retain full ownership of your business content and data.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Dr. Priya Ramesh',
    businessName: 'Apex Health Physio Care',
    role: 'Lead Physiotherapist & Founder',
    category: 'Healthcare & Wellness',
    rating: 5,
    quote: 'Before VYRONIQ.AI, we were quoted ₹55,000 by a local agency and left in the dark. With VYRONIQ, our dark futuristic clinic site was live in 48 hours. The WhatsApp appointment button brings in 4 to 6 new patient inquiries every single day. And when our holiday timings change, their team updates it within 1 hour!',
    plan: '₹699/month',
    turnaround: '48 Hours',
    metrics: '+320% WhatsApp Patient Leads',
    verified: true,
    createdAt: '2026-09-15T10:00:00.000Z'
  },
  {
    id: 'test-2',
    clientName: 'Arjun Singhania',
    businessName: 'The Craft Kitchen & Bar',
    role: 'Managing Partner',
    category: 'Dining & Hospitality',
    rating: 5,
    quote: 'The digital QR menu and table reservation flow VYRONIQ built is pure perfection. Our weekend table bookings jumped immediately, and our patrons constantly compliment how sleek and modern the website looks on their iPhones. Paying ₹6,999 for the full year with maintenance included is the best marketing investment we made.',
    plan: '₹6,999/year',
    turnaround: '3 Days',
    metrics: '+45% Table Bookings & QR Scans',
    verified: true,
    createdAt: '2026-09-18T14:30:00.000Z'
  },
  {
    id: 'test-3',
    clientName: 'Natasha Mehta',
    businessName: 'Vanguard Atelier Leatherworks',
    role: 'Founder & Head Artisan',
    category: 'Retail & Commerce',
    rating: 5,
    quote: 'We sell luxury bespoke handcrafted goods and needed a website that reflected true premium craftsmanship. VYRONIQ delivered an obsidian dark lookbook with direct WhatsApp ordering. We have zero transaction commission fees, and whenever we launch a seasonal collection, we simply send photos over WhatsApp to get them published.',
    plan: '₹6,999/year',
    turnaround: '3 Days',
    metrics: 'Saved ₹40k+ in marketplace fees',
    verified: true,
    createdAt: '2026-09-20T11:15:00.000Z'
  },
  {
    id: 'test-4',
    clientName: 'Advocate Arun Verma',
    businessName: 'Zenith Legal Consultants',
    role: 'Managing Partner',
    category: 'Professional Services',
    rating: 5,
    quote: 'As a corporate legal practice, credibility and authority are paramount. VYRONIQ.AI engineered a razor-sharp, executive portal with an encrypted client consultation intake form. New startup founders find us on Google Maps effortlessly now.',
    plan: '₹699/month',
    turnaround: '48 Hours',
    metrics: '#1 Local Map Search Rank',
    verified: true,
    createdAt: '2026-09-22T08:45:00.000Z'
  },
  {
    id: 'test-5',
    clientName: 'Kabir Oberoi',
    businessName: 'IronVault Strength Studio',
    role: 'Head Performance Coach',
    category: 'Fitness & Sports',
    rating: 5,
    quote: 'Every member who walks in says our website looks like an elite athletic brand. The membership breakdown and trial session booking has transformed our member acquisition. Unbelievable value for ₹699/month.',
    plan: '₹699/month',
    turnaround: '48 Hours',
    metrics: '28 Trial Passes booked in week 1',
    verified: true,
    createdAt: '2026-09-24T16:20:00.000Z'
  },
  {
    id: 'test-6',
    clientName: 'Sonia D\'Souza',
    businessName: 'Glow Aesthetics & Wellness Spa',
    role: 'Creative Director',
    category: 'Beauty & Wellness',
    rating: 5,
    quote: 'The metallic purple accents and fluid mobile animation match our boutique spa ambiance flawlessly. Our clients love booking treatments directly over WhatsApp, and the team handles all our monthly treatment menu updates with zero fuss.',
    plan: '₹6,999/year',
    turnaround: '3 Days',
    metrics: '+85% Online Treatment Enquiries',
    verified: true,
    createdAt: '2026-09-25T13:10:00.000Z'
  }
];

