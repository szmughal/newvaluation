/* ============================================================================
   BEST VALUATION — SITE CONTENT
   ----------------------------------------------------------------------------
   This is the single source of truth for the whole website.
   Edit values here, run `node build.js`, and every page updates.

   !! ITEMS MARKED "TODO:" MUST BE REVIEWED BY THE BUSINESS OWNER BEFORE LAUNCH.
      They are structural placeholders, not verified facts.
   ========================================================================== */

const site = {
  name: 'Best Valuation',
  legalName: 'The Experts – A House of Prudent (Pvt.) Ltd.',
  tagline: 'A PBA and SECP approved valuation company for all Pakistan',
  // TODO: replace with your live domain before launch (used for canonical + sitemap)
  url: 'https://bestvaluation.com.pk',

  phone: '0300-6878765',
  phoneHref: '+923006878765',
  whatsapp: '923006878765',
  email: 'the.experts.ho@gmail.com',
  directorEmail: 'imran.the.experts.pk@gmail.com',

  address: {
    street: '',              // TODO: add office street / building name
    city: 'Lahore',
    region: 'Punjab',
    country: 'Pakistan',
    full: 'Head Office: Lahore, Pakistan'
  },

  hours: 'Mon – Sat, 9:00 AM – 7:00 PM',

  // TODO: add your real profile URLs, or delete the ones you do not use.
  social: [
    { name: 'Facebook',  url: '#', icon: 'facebook'  },
    { name: 'LinkedIn',  url: '#', icon: 'linkedin'  },
    { name: 'Instagram', url: '#', icon: 'instagram' },
    { name: 'WhatsApp',  url: 'https://wa.me/923006878765', icon: 'whatsapp' }
  ]
};

/* --- Credentials shown in the header strip and about page ------------------
   TODO: Add your registration numbers in `ref`, or leave `ref: ''` to hide it.
   Remove any body you are not actually registered with. -------------------- */
const credentials = [
  { body: 'SECP', label: 'SECP Registered',       ref: '' },
  { body: 'PBA',  label: 'PBA Approved Panel',    ref: '' },
  { body: 'ICAP', label: 'ICAP Compliant Format', ref: '' }
];

/* --- Leadership / CEO ---------------------------------------------------- */
const ceo = {
  name: 'Mr. Muhammad Imran',
  title: 'Director · The Experts – A House of Prudent (Pvt.) Ltd.',
  credentials: 'Master degree in Economics · 20+ Years Experience',
  quote: 'He is committed to delivering accurate, transparent, and regulator-compliant valuation and monitoring reports in line with current banking standards.',
  message: [
    'Mr. Muhammad Imran director of The Experts – A House of Prudent (Pvt.) Ltd. holds a Master degree in Economics. He also brings over 20 years of extensive hands-on experience in Muccadam, property valuations, and stock inspections services for banks and embassies and other financial institutions.',
    'He leads his staff and company with strong dedication and a forward-looking vision. He is recognized for being highly hardworking, detail-conscious, and committed to maintaining the highest standards of professionalism and accuracy.',
    'He has provided Muccadums, Property valuations and stock inspection services to various reputed banks. He has deep exposure to banking SOPs, collateral verification, post-disbursement monitoring, and compliance reporting.',
    'He is committed to delivering accurate, transparent, and regulator-compliant valuation and monitoring reports in line with current banking standards.'
  ]
};

/* --- Headline statistics --------------------------------------------------
   TODO: replace with your firm's real figures. ---------------------------- */
const stats = [
  { value: 12500, suffix: '+', label: 'Valuation reports delivered' },
  { value: 3400,  suffix: '+', label: 'Visa & immigration reports' },
  { value: 480,   suffix: '+', label: 'Court & dispute valuations' },
  { value: 20,    suffix: '+', label: 'Years of combined experience' }
];

/* --- Services -------------------------------------------------------------
   `slug` becomes the page filename. `price` is a starting rate in PKR.
   -------------------------------------------------------------------------*/
const services = [
  {
    slug: 'property-valuation',
    meta: "Certified property valuation in Pakistan at current market rates for visa, court, FBR and bank use. Residential & commercial. From Rs. 5,000 in 1 working day.",
    icon: 'building',
    image: 'assets/img/hero/property.jpg',
    imageAlt: 'Luxury residential property in Pakistan valuation inspection',
    name: 'Property Valuation',
    short: 'Residential, commercial, industrial and agricultural property in Pakistan assessed at current market rates.',
    price: 5000,
    turnaround: '1 working day',
    hero: 'Certified property valuation reports accepted by embassies, courts, banks and the FBR — prepared from current market rates of Pakistan, not guesswork.',
    intro: 'A property valuation report states what your property in Pakistan — land, house, flat, plot, commercial or industrial unit — is genuinely worth at current market rates of Pakistan today. We inspect, verify ownership documents, gather verified comparable sales evidence, and issue a signed certificate on our letterhead in the exact format the receiving authority expects.',
    covers: [
      'Houses, flats and apartments',
      'Residential and commercial plots',
      'Shops, offices and showrooms',
      'Factories, warehouses and industrial land',
      'Agricultural land and farmhouses',
      'Under-construction and part-built property'
    ],
    purposes: [
      'Visa and immigration applications',
      'Court cases and family disputes',
      'FBR tax filing and wealth statements',
      'Bank mortgage and collateral',
      'Inheritance and estate distribution',
      'Buying, selling or partnership settlement'
    ],
    documents: [
      'CNIC or passport of the owner',
      'Ownership proof — registry, transfer letter or Fard-e-Milkiat',
      'Allotment or possession letter (if applicable)',
      'Complete property address with sector / block / plot number',
      'Approved site plan or building plan, if available',
      'Recent photographs (optional — we can photograph on site)'
    ],
    methods: [
      { name: 'Sales comparison approach', body: 'Recent verified transactions of similar properties in the same locality, adjusted for size, condition, road width and corner or facing premium.' },
      { name: 'Cost approach', body: 'Current land rate plus depreciated replacement cost of the construction — used for newer builds and specialised structures.' },
      { name: 'Income capitalisation', body: 'Achievable market rent capitalised at the prevailing yield — applied to shops, offices and rented commercial units.' }
    ],
    faqs: [
      { q: 'Is a site visit always required?', a: 'For built property we strongly recommend it, and for bank and court work it is mandatory. For open plots in a documented scheme we can often value from records and locality evidence. We will tell you which applies to your case before you pay.' },
      { q: 'Can you value a property anywhere in Pakistan?', a: 'Yes. With our Head Office in Lahore, we cover Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and Quetta, and can arrange inspections across all districts nationwide.' },
      { q: 'Will the embassy accept your report?', a: 'Our reports are issued in the standard format embassies expect: valuer credentials, methodology, comparable evidence, photographs and a signed certification page. We have not had a report rejected on format grounds.' }
    ]
  },
  {
    slug: 'vehicle-valuation',
    meta: "Independent vehicle valuation certificates in Pakistan for visa, insurance, court and finance. Cars, imports and machinery. From Rs. 5,000, same-day delivery.",
    icon: 'car',
    image: 'assets/img/hero/vehicle.jpg',
    imageAlt: 'Toyota Land Cruiser Prado SUV vehicle inspection',
    name: 'Vehicle Valuation',
    short: 'Cars, SUVs, commercial vehicles and heavy machinery valued at current resale market rates.',
    price: 5000,
    turnaround: 'Same day',
    hero: 'Independent vehicle valuation certificates for visa files, insurance, court matters, asset declarations and vehicle finance.',
    intro: 'We assess your vehicle against real, current resale evidence — not the showroom sticker and not the depreciated book figure. Make, model, year, variant, mileage, accident and repaint history, engine and body condition, auction grade for imports, and live classified and dealer asking rates for the identical specification in your city.',
    covers: [
      'Private cars, SUVs and 4x4s',
      'Imported and JDM auction-grade vehicles',
      'Motorcycles and three-wheelers',
      'Vans, pickups, buses and trucks',
      'Construction and agricultural machinery',
      'Company and fleet vehicle schedules'
    ],
    purposes: [
      'Visa and immigration asset proof',
      'Insurance claims and total-loss disputes',
      'Court and inheritance settlement',
      'Wealth statement and tax declaration',
      'Bank lease and auto-finance security',
      'Private sale or purchase negotiation'
    ],
    documents: [
      'CNIC or passport of the registered owner',
      'Registration book, card or file',
      'Import documents and auction sheet, for imported units',
      'Current mileage reading',
      'Location and time window for physical inspection'
    ],
    methods: [
      { name: 'Market comparison', body: 'Verified asking and settled prices for the identical make, model, year and variant in the same city, adjusted for mileage and condition.' },
      { name: 'Condition grading', body: 'A documented walk-around: body panels, paint depth, tyres, interior, engine bay and service history, graded and priced against a clean baseline unit.' },
      { name: 'Depreciation schedule', body: 'Age-based depreciation applied against original landed or invoice cost — used for fleet, company and machinery schedules.' }
    ],
    faqs: [
      { q: 'Do you need to see the vehicle?', a: 'For a defensible market value, yes. We can inspect at your home, office or workshop anywhere in Pakistan, usually within the same working day.' },
      { q: 'Can you value a vehicle that is not in my name yet?', a: 'Yes, but the report will record the registered owner as shown on the book, and note your interest separately. Tell us the purpose so we word it correctly.' },
      { q: 'Do you value machinery and plant?', a: 'Yes — generators, forklifts, tractors, excavators, printing and textile machinery. Plant schedules are quoted per site rather than per unit.' }
    ]
  },
  {
    slug: 'gold-valuation',
    meta: "Gold and jewellery valuation in Pakistan. Purity tested, weighed and priced at the day's bullion rate. Embassy-accepted certificates from Rs. 6,000, same day.",
    icon: 'gem',
    image: 'assets/img/hero/gold.jpg',
    imageAlt: '24K gold bullion and jewellery assay testing',
    name: 'Gold & Jewellery Valuation',
    short: 'Purity tested, weighed and valued against the day’s Lahore bullion rate.',
    price: 6000,
    turnaround: 'Same day',
    hero: 'Gold, jewellery and precious metal valuation certificates — purity verified, weight recorded, priced at the live market rate.',
    intro: 'Jewellery is the asset most often questioned in a visa file, because most declarations carry no evidence behind the number. We test purity, record gross and net weight excluding stones, photograph each item, and value against the published Lahore Sarafa rate on the date of inspection — giving a figure the reviewing officer can verify independently.',
    covers: [
      'Gold jewellery — 18k, 21k, 22k and 24k',
      'Bullion bars, biscuits and coins',
      'Diamond and gemstone-set pieces',
      'Silver and platinum articles',
      'Antique, heirloom and bridal sets',
      'Inherited collections and estate lots'
    ],
    purposes: [
      'Visa and immigration asset declaration',
      'Insurance cover and claim support',
      'Inheritance division among heirs',
      'Wealth statement and tax records',
      'Sale, resale or pledge negotiation',
      'Bank locker and safe-custody records'
    ],
    documents: [
      'CNIC or passport of the owner',
      'The items themselves, for testing and weighing',
      'Original purchase receipts, if available',
      'Any existing certificates for stones',
      'A list of items, where the collection is large'
    ],
    methods: [
      { name: 'Purity assay', body: 'Karat verified item by item using electronic testing and touchstone acid comparison, cross-checked against any hallmark present.' },
      { name: 'Net weight capture', body: 'Gross weight recorded, then stone and setting weight deducted to establish the true gold content that carries the value.' },
      { name: 'Live rate application', body: 'Net weight priced at the Lahore Sarafa Bazaar rate for the inspection date, with the rate and date printed in the report.' }
    ],
    faqs: [
      { q: 'Do I have to bring the jewellery to you?', a: 'You can visit our office, or for larger collections we can arrange inspection at your bank locker or home. Testing is non-destructive — nothing is cut, melted or damaged.' },
      { q: 'Are diamonds and stones included in the value?', a: 'Yes. Stones are assessed separately from the metal, and the report shows both figures so the basis of the total is transparent.' },
      { q: 'How long does the certificate stay valid?', a: 'Gold moves daily, so the report is a snapshot of the inspection date. Most embassies accept a report up to three to six months old; for older files we can reissue at a reduced rate.' }
    ]
  },
  {
    slug: 'stock-valuation',
    meta: "Independent stock and inventory valuation in Pakistan for bank finance, audit and insurance. Physical count, reconciliation and forced-sale value from Rs. 15,000.",
    icon: 'boxes',
    image: 'assets/img/hero/stock.jpg',
    imageAlt: 'Commercial warehouse stock and raw material inventory inspection',
    name: 'Stock & Inventory Valuation',
    short: 'Warehouse stock, raw material and finished goods counted, priced and certified for audit or finance.',
    price: 15000,
    turnaround: '2 – 4 working days',
    hero: 'Independent stock and inventory valuation for bank finance, statutory audit, insurance and business sale.',
    intro: 'Banks lending against inventory, auditors signing off a balance sheet, and insurers settling a claim all want the same thing: a count they did not do themselves, priced by someone with no stake in the answer. We attend your warehouse or factory, verify quantities against your records, price at the appropriate basis, and reconcile every variance we find.',
    covers: [
      'Raw material and consumables',
      'Work in progress',
      'Finished goods and packed stock',
      'Retail floor and warehouse inventory',
      'Spare parts and engineering stores',
      'Slow-moving and obsolete stock'
    ],
    purposes: [
      'Bank stock reports and running finance limits',
      'Statutory and internal audit support',
      'Insurance cover and claim substantiation',
      'Business sale, merger or partner exit',
      'Management accounts and year-end close',
      'Shrinkage and pilferage investigation'
    ],
    documents: [
      'Stock ledger or ERP inventory extract',
      'Recent purchase invoices for pricing evidence',
      'Warehouse or godown layout and locations',
      'Goods-in and goods-out records for the cut-off period',
      'Details of stock held on consignment or at third parties'
    ],
    methods: [
      { name: 'Physical verification', body: 'Wall-to-wall or sample count with documented test checks, tied back to your ledger balance with every variance listed.' },
      { name: 'Lower of cost or NRV', body: 'Priced on the audit-accepted basis — cost from recent invoices, tested against realisable value, with obsolescence provisioned separately.' },
      { name: 'Forced-sale value', body: 'A second figure showing what the stock would realise on a rapid liquidation, which is what a lender is actually securing against.' }
    ],
    faqs: [
      { q: 'Will you shut down my warehouse to do this?', a: 'No. We schedule around your operations, count in sections, and can work evenings, weekends or during a scheduled stock freeze.' },
      { q: 'Is this accepted by banks?', a: 'Yes — reports are prepared in the standard bank stock-report format, with the reconciliation and forced-sale value that credit departments look for.' },
      { q: 'How is the fee calculated?', a: 'By site size, stock lines and count days rather than a flat rate. Send us your ledger summary and we will quote before starting.' }
    ]
  },
  {
    slug: 'net-worth-report',
    meta: "Certified wealth certificates & net worth reports in Pakistan certifying movable and immovable assets for visa, court, bank and audit use. From Rs. 12,000.",
    icon: 'chart',
    image: 'assets/img/hero/networth.jpg',
    imageAlt: 'Certified wealth certificate and net worth statement audit',
    name: 'Wealth Certificate / Net Worth Certificates',
    short: 'We certify your movable and immovable assets after evaluation reports.',
    price: 12000,
    turnaround: '2 – 3 working days',
    hero: 'Certified wealth certificates and net worth reports accepted by embassies, courts, banks and the FBR — certifying movable and immovable assets at current market rates.',
    intro: 'A wealth certificate and net worth report certifies your movable and immovable assets, property, vehicles, gold, bank balances, business interests and investments into a single signed document. It is the fastest way to answer “show us your financial position” for all world embassies, court cases, bank finance, and audit purposes.',
    covers: [
      'Immovable property holdings',
      'Vehicles and machinery',
      'Gold, jewellery and valuables',
      'Bank balances and fixed deposits',
      'Shares, funds and investments',
      'Business equity and partnership stakes',
      'Loans, mortgages and payables'
    ],
    purposes: [
      'Visa, study and immigration applications',
      'Bank credit and facility approval',
      'Sponsorship and financial guarantee',
      'Court, divorce and inheritance matters',
      'FBR wealth statement support',
      'Investor or partner due diligence'
    ],
    documents: [
      'CNIC or passport',
      'Ownership documents for each property',
      'Vehicle registration books',
      'Bank statements and deposit certificates',
      'Share certificates or broker statements',
      'Business ownership and financial statements',
      'Loan and liability statements'
    ],
    methods: [
      { name: 'Asset-by-asset valuation', body: 'Each asset class valued on its own correct basis, then consolidated — rather than accepting the figures you supply at face value.' },
      { name: 'Liability verification', body: 'Outstanding loans, mortgages and payables confirmed from statements, so the net figure withstands scrutiny.' },
      { name: 'Certified consolidation', body: 'A single signed statement with supporting schedules attached, in the format embassies and credit committees expect.' }
    ],
    faqs: [
      { q: 'Can you include assets held abroad?', a: 'Yes, where you can evidence ownership and value. Foreign assets are listed separately with the currency and conversion rate shown.' },
      { q: 'Do I need separate reports as well?', a: 'Usually not — the net worth report incorporates them. Some embassies still ask for the individual property or gold certificate alongside it; we can issue both as a bundle at a reduced combined fee.' },
      { q: 'How current does it need to be?', a: 'Most authorities want a report dated within three months of submission. Tell us your filing date and we will time the report accordingly.' }
    ]
  }
];

/* --- Why choose us -------------------------------------------------------- */
const differentiators = [
  { icon: 'bolt',   title: 'Reports in one working day', body: 'Standard property, vehicle and gold valuations are inspected, prepared and delivered within a single working day. Urgent same-day handling is available when a filing deadline is close.' },
  { icon: 'shield', title: 'Accepted where it counts',   body: 'Formatted for embassies, courts, the FBR and bank credit departments — with methodology, comparable evidence and a signed certification page, not a one-line figure on a letterhead.' },
  { icon: 'map',    title: 'Current market rates across Pakistan', body: 'Deep comparable data across Lahore, Karachi, Islamabad and all major districts — verified market transactions, DC rates and current market rates of Pakistan.' },
  { icon: 'tag',    title: 'Quoted before we start',     body: 'You get the full fee in writing before any work begins. No revision charges, no delivery charges, no fee that moves once the number is known.' }
];

/* --- The four-step process ------------------------------------------------ */
const process = [
  { step: '01', title: 'Tell us the purpose', body: 'Call or message us with the asset and what the report is for. The purpose decides the format, the basis of value and the documents needed — so we confirm this first, every time.' },
  { step: '02', title: 'Confirm scope and fee', body: 'We send the exact fee, turnaround and document checklist in writing. Nothing starts until you approve it, and the figure does not change afterwards.' },
  { step: '03', title: 'Inspection and analysis', body: 'A certified valuer inspects the asset, photographs it, and builds the valuation from verified market comparables using the method appropriate to your purpose.' },
  { step: '04', title: 'Delivery, soft and hard', body: 'Signed PDF the moment it is ready, with stamped hard copies couriered free anywhere in Pakistan. We stand behind the report if the authority raises a query.' }
];

/* --- Use cases ------------------------------------------------------------ */
const useCases = [
  {
    icon: 'passport',
    title: 'Visa & immigration',
    image: 'assets/img/usecases/visa.jpg',
    imageAlt: 'Passport, visa stamps, and wealth valuation certificate for embassy submission',
    body: 'Asset proof for visitor, study, work and settlement applications to the UK, USA, Canada, Schengen, Australia and the Gulf.'
  },
  {
    icon: 'scale',
    title: 'Court & legal',
    image: 'assets/img/usecases/legal.jpg',
    imageAlt: 'Court judge gavel, scales of justice, and certified litigation valuation records',
    body: 'Valuations for family division, inheritance, partnership dissolution, execution proceedings and arbitration.'
  },
  {
    icon: 'receipt',
    title: 'Tax & FBR',
    image: 'assets/img/usecases/tax.jpg',
    imageAlt: 'Official FBR wealth statement declaration and capital gains tax audit documentation',
    body: 'Supporting evidence for wealth statements, capital gains computation and declared asset positions.'
  },
  {
    icon: 'bank',
    title: 'Banking & finance',
    image: 'assets/img/usecases/banking.jpg',
    imageAlt: 'Commercial bank collateral agreement and credit limit approval dossier',
    body: 'Collateral and security valuations for mortgage, running finance, lease and credit-limit approval.'
  },
  {
    icon: 'family',
    title: 'Inheritance',
    image: 'assets/img/usecases/inheritance.jpg',
    imageAlt: 'Family estate title deed, inheritance division agreement, and house keys',
    body: 'Impartial valuation figures for distributing an estate among heirs and resolving family settlements.'
  },
  {
    icon: 'handshake',
    title: 'Buying & selling',
    image: 'assets/img/usecases/deal.jpg',
    imageAlt: 'Property sale contract agreement, keys, and architectural blueprint on negotiation table',
    body: 'An independent number before you negotiate, so the price is anchored to evidence and not to the other side’s claim.'
  }
];

/* --- Testimonials --------------------------------------------------------- */
/* TODO: replace with real, permitted client feedback before launch.          */
const testimonials = [
  { name: 'Adnan Sheikh',   role: 'UK visitor visa applicant, DHA Phase 6, Lahore', rating: 5,   avatar: 'assets/img/testimonials/adnan.jpg', quote: 'I needed a property and gold report in two days for a UK file. They inspected on Tuesday morning and the signed PDF was with me that evening. The visa officer did not raise a single question about the assets.' },
  { name: 'Farah Qureshi',  role: 'Inheritance matter, Gulberg, Lahore',            rating: 5,   avatar: 'assets/img/testimonials/farah.jpg', quote: 'We had four siblings and no agreement on what the house was worth. Their report laid out the comparables so clearly that everyone accepted it and the division was settled without going to court.' },
  { name: 'Muhammad Bilal', role: 'Finance Manager, textile exporter',              rating: 5,   avatar: 'assets/img/testimonials/bilal.jpg', quote: 'Our bank wanted an independent stock report at short notice. They counted across two godowns over a weekend, reconciled to our ERP, and the limit was approved without a follow-up query.' },
  { name: 'Sana Ahmed',     role: 'Canada study visa applicant',                    rating: 5,   avatar: 'assets/img/testimonials/sana.jpg', quote: 'The net worth report saved me from submitting a pile of separate documents. Everything on one certified statement, properly explained. Worth every rupee for the peace of mind.' },
  { name: 'Kashif Mehmood', role: 'Vehicle insurance claim, DHA Lahore',            rating: 4.5, avatar: 'assets/img/testimonials/kashif.jpg', quote: 'The insurer had lowballed my car after an accident. Their valuation was detailed enough that the assessor revised the offer. Straightforward people to deal with.' }
];

/* --- Coverage ------------------------------------------------------------- */
const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Sukkur'];

const karachiAreas = ['Lahore (Head Office)', 'DHA Lahore & Gulberg', 'Model Town & Johar Town', 'Bahria Town Lahore', 'Sundar Industrial Estate', 'Quaid-e-Azam Industrial Area', 'Islamabad & Rawalpindi', 'Faisalabad Industrial', 'Multan & Southern Punjab', 'Peshawar & KPK'];

/* --- Who accepts our reports ---------------------------------------------- */
const accepted = ['Embassies & Consulates', 'Courts of Pakistan', 'Federal Board of Revenue', 'Commercial Banks', 'Insurance Companies', 'Universities'];

/* --- General FAQs (home + FAQ page) --------------------------------------- */
const faqs = [
  { q: 'How quickly can I get my valuation report?', a: 'Standard property, vehicle and gold valuations are delivered within one working day of inspection. Wealth certificates / net worth and stock reports take two to four working days because more evidence has to be gathered. If you have a filing deadline, tell us the date when you first call and we will confirm whether we can meet it before you pay anything.' },
  { q: 'Will embassies and courts actually accept your reports?', a: 'Yes. Our reports carry the valuer’s credentials, the method used, the comparable evidence relied on, dated photographs and a signed certification page — which is what makes a report defensible rather than just a number on a letterhead. If a reviewing authority raises a query, we respond to it at no additional charge.' },
  { q: 'What does a valuation cost?', a: 'Property and vehicle valuations start at Rs. 5,000, gold at Rs. 6,000, wealth certificate / net worth reports at Rs. 12,000 and stock valuations at Rs. 15,000. The final figure depends on asset type, location and purpose. You get the exact fee in writing before any work begins, and it does not change afterwards.' },
  { q: 'What documents do I need to provide?', a: 'At minimum, your CNIC or passport and proof of ownership for the asset. The full checklist differs by asset — property needs the registry or transfer letter, vehicles need the registration book, gold needs the items themselves. Each service page lists exactly what is required.' },
  { q: 'Do you charge extra for the hard copy or delivery?', a: 'No. Stamped hard copies are couriered anywhere in Pakistan at no extra cost, and the signed PDF is emailed as soon as the report is ready.' },
  { q: 'Can you value assets across all Pakistan?', a: 'Yes. With our Head Office in Lahore, we cover Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and all other districts nationwide as standard.' },
  { q: 'Is a physical inspection always necessary?', a: 'For built property, vehicles and jewellery, yes — a value defended without inspection is easy to challenge. For open plots in documented schemes we can often work from society records and verified market evidence. We will tell you which applies to your case before you commit.' },
  { q: 'How long does a valuation report remain valid?', a: 'There is no fixed expiry, but most embassies and banks want a report dated within three to six months of submission. Markets move, so an older report simply carries less weight. We can reissue a previous report at a reduced rate if your circumstances have not changed.' },
  { q: 'How do I pay, and do you issue a receipt?', a: 'Bank transfer, cash or online payment. A receipt is issued for every payment, and the fee is confirmed in writing before work starts.' }
];

module.exports = { site, credentials, stats, services, differentiators, process, useCases, testimonials, cities, karachiAreas, accepted, faqs, ceo };
