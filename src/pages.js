/* ============================================================================
   PAGES — every page body, built from the content in data.js
   ========================================================================== */

const D = require('./data');
const { site, services, stats, differentiators, process, useCases, testimonials, cities, karachiAreas, accepted, faqs, credentials, ceo } = D;
const { sectionHead, pageHero, ctaBand, faqSchema, serviceSchema, esc, money } = require('./layout');
const { icon } = require('./icons');

/* ---------- small reusable blocks ---------------------------------------- */

const starRow = r => {
  let out = '';
  for (let i = 1; i <= 5; i++) {
    const cls = r >= i ? 'is-on' : (r >= i - 0.5 ? 'is-half' : '');
    out += `<span class="star ${cls}">${icon('star', { size: 15 })}</span>`;
  }
  return `<div class="stars" role="img" aria-label="${r} out of 5 stars">${out}</div>`;
};

const serviceCard = (s, i) => `<article class="svc-card" data-reveal style="--d:${i * 60}ms">
  <div class="svc-card__top">
    <div class="svc-card__holder">
      <img src="${s.image}" alt="${esc(s.imageAlt || s.name)}" width="76" height="76" loading="lazy" class="svc-card__holder-img" />
      <span class="svc-card__holder-badge" aria-hidden="true">${icon(s.icon, { size: 13 })}</span>
    </div>
    <span class="svc-card__price">from ${money(s.price)}</span>
  </div>
  <h3 class="svc-card__title"><a href="${s.slug}.html">${esc(s.name)}</a></h3>
  <p class="svc-card__body">${esc(s.short)}</p>
  <ul class="svc-card__meta">
    <li>${icon('clockSm', { size: 15 })} ${esc(s.turnaround)}</li>
    <li>${icon('doc', { size: 15 })} Soft + hard copy</li>
  </ul>
  <span class="svc-card__link">View details ${icon('arrow', { size: 16 })}</span>
</article>`;

const faqList = (list, idPrefix = 'faq') => `<div class="faqs">
  ${list.map((f, i) => `<details class="faq" name="${idPrefix}"${i === 0 ? ' open' : ''}>
    <summary><span>${esc(f.q)}</span><i aria-hidden="true">${icon('chevron', { size: 20 })}</i></summary>
    <div class="faq__body"><p>${esc(f.a)}</p></div>
  </details>`).join('\n  ')}
</div>`;

const heroDemoCard = ({
  image,
  imageAlt,
  tag = 'Inspection Specimen',
  badge = 'Live Report Demo',
  ref = 'BV/REP/2026',
  docType = 'Valuation Certificate',
  rows = [],
  valueLabel = 'Assessed Value',
  value = 'PKR 14,25,00,000',
  chips = []
}) => {
  const chipHtml = chips.map((c, idx) =>
    `<div class="demo-chip demo-chip--${idx + 1}">${icon(c.icon || 'check', { size: 14 })} ${esc(c.text)}</div>`
  ).join('\n  ');

  return `<div class="hero-demo">
  <div class="demo-card">
    <div class="demo-card__media">
      <img src="${image}" alt="${esc(imageAlt)}" width="640" height="360" loading="eager" />
      <span class="demo-card__pill"><span class="pulse-dot"></span> ${esc(badge)}</span>
      <span class="demo-card__tag">${esc(tag)}</span>
    </div>
    <div class="demo-card__body">
      <div class="demo-card__head">
        <div class="demo-card__brand">
          <span class="demo-card__logo">${icon('shield', { size: 16 })}</span>
          <span><b>BEST VALUATION</b><small>Certified Asset Valuers &middot; Pakistan</small></span>
        </div>
        <span class="demo-card__seal">
          <svg viewBox="0 0 64 64" width="46" height="46" aria-hidden="true">
            <circle cx="32" cy="32" r="29" class="cert__seal-ring"/>
            <circle cx="32" cy="32" r="24" class="cert__seal-ring2"/>
            <path d="M22 33.5l7 7 14-15" class="cert__seal-tick"/>
          </svg>
        </span>
      </div>
      <p class="demo-card__doctype">${esc(docType)}</p>
      <div class="demo-card__rows">
        <div class="demo-card__row"><span>Reference</span><b>${esc(ref)}</b></div>
        ${rows.map(r => `<div class="demo-card__row"><span>${esc(r.label)}</span><b>${esc(r.val)}</b></div>`).join('\n        ')}
      </div>
      <div class="demo-card__val">
        <div>
          <span>${esc(valueLabel)}</span>
          <strong>${esc(value)}</strong>
        </div>
        <span class="demo-card__status">${icon('check', { size: 13 })} Verified &amp; Signed</span>
      </div>
      <div class="demo-card__foot">
        <span class="demo-card__sign"><i></i>Authorised Valuer</span>
        <span class="demo-card__date">Issued 2026</span>
      </div>
    </div>
  </div>
  ${chipHtml ? `<div class="demo-chips">\n    ${chipHtml}\n  </div>` : ''}
</div>`;
};

const serviceDemoConfigs = {
  'property-valuation': {
    image: 'assets/img/hero/property.jpg',
    imageAlt: 'Property in Pakistan Valuation Specimen',
    badge: 'Property in Pakistan Demo',
    tag: 'Current Market Rates of Pakistan',
    ref: 'BV/PROP/2026-1184',
    docType: 'Property Valuation Certificate',
    rows: [
      { label: 'Asset Inspected', val: 'Residential & Commercial Property' },
      { label: 'Location Scope', val: 'Property in Pakistan (All Cities)' },
      { label: 'Valuation Basis', val: 'Current Market Rates of Pakistan' },
      { label: 'Method Used', val: 'Sales Comparison & Cost Approach' }
    ],
    valueLabel: 'Assessed Market Value',
    value: 'PKR 14,25,00,000',
    chips: [
      { icon: 'bolt', text: 'Delivered in 1 Day' },
      { icon: 'passport', text: 'Embassy & Visa Ready' },
      { icon: 'bank', text: 'Bank & Court Approved' }
    ]
  },
  'vehicle-valuation': {
    image: 'assets/img/hero/vehicle.jpg',
    imageAlt: 'Toyota Land Cruiser Prado Vehicle Valuation Specimen',
    badge: 'Vehicle Inspection Demo',
    tag: 'Physical 60-Point Audit',
    ref: 'BV/VEH/2026-0429',
    docType: 'Vehicle Appraisal Certificate',
    rows: [
      { label: 'Vehicle Model', val: 'Toyota Land Cruiser Prado TX' },
      { label: 'Year / Reg', val: '2022 Model (Lahore Registered)' },
      { label: 'Chassis / Engine', val: 'Verified & Mechanically Inspected' },
      { label: 'Condition Rating', val: 'Grade 4.5A (Pristine Condition)' }
    ],
    valueLabel: 'Assessed Vehicle Value',
    value: 'PKR 3,85,00,000',
    chips: [
      { icon: 'bolt', text: 'Same Day Delivery' },
      { icon: 'shield', text: 'Insurance & Bank Ready' },
      { icon: 'doc', text: 'Physical Stamped Hard Copy' }
    ]
  },
  'gold-valuation': {
    image: 'assets/img/hero/gold.jpg',
    imageAlt: '24K Gold Bullion and 22K Bridal Jewellery Assay Valuation Specimen',
    badge: 'Gold Assay & Purity Demo',
    tag: 'Lahore Sarafa Rates',
    ref: 'BV/GLD/2026-0812',
    docType: 'Gold & Jewellery Assay Certificate',
    rows: [
      { label: 'Articles Assayed', val: '24K Minted Bars + 22K Bridal Set' },
      { label: 'Net Weight', val: '14.50 Tolas (169.13 grams)' },
      { label: 'Purity Test', val: 'Electronic Specific Gravity (916 / 999.9)' },
      { label: 'Rate Basis', val: 'Daily Live Lahore Sarafa Bullion' }
    ],
    valueLabel: 'Assessed Gold Value',
    value: 'PKR 39,15,000',
    chips: [
      { icon: 'bolt', text: 'Same Day Turnaround' },
      { icon: 'passport', text: 'Embassy Wealth Proof' },
      { icon: 'scale', text: 'Assayed with Precision' }
    ]
  },
  'stock-valuation': {
    image: 'assets/img/hero/stock.jpg',
    imageAlt: 'Warehouse Commercial Inventory Audit and Valuation Specimen',
    badge: 'Inventory Audit Demo',
    tag: 'Lahore Industrial Area',
    ref: 'BV/STK/2026-0315',
    docType: 'Stock & Inventory Valuation Report',
    rows: [
      { label: 'Facility Assessed', val: 'Bonded Warehouse, Lahore Industrial Area' },
      { label: 'Stock Categories', val: 'Pharmaceutical & Consumer FMCG' },
      { label: 'Audit Methodology', val: 'Physical Batch Count & Weighted FIFO' },
      { label: 'Inspection Scope', val: 'Shelf Life & Condition Verification' }
    ],
    valueLabel: 'Assessed Stock Value',
    value: 'PKR 8,60,00,000',
    chips: [
      { icon: 'bank', text: 'Bank Running Finance' },
      { icon: 'shield', text: 'Auditor & FBR Ready' },
      { icon: 'clockSm', text: '2 – 4 Working Days' }
    ]
  },
  'net-worth-report': {
    image: 'assets/img/hero/networth.jpg',
    imageAlt: 'Consolidated Wealth Certificate & Net Worth Report Specimen',
    badge: 'Wealth & Net Worth Demo',
    tag: 'Movable & Immovable Assets',
    ref: 'BV/NW/2026-0192',
    docType: 'Wealth Certificate / Net Worth Report',
    rows: [
      { label: 'Asset Scope', val: 'Movable & Immovable Assets Certified' },
      { label: 'Target Authority', val: 'World Embassies, Court, Bank & Audit' },
      { label: 'Evaluation Basis', val: 'Current Market Rates of Pakistan' },
      { label: 'Format Compliance', val: 'PBA, SECP & Embassy Standard Format' }
    ],
    valueLabel: 'Consolidated Net Worth',
    value: 'PKR 31,40,00,000',
    chips: [
      { icon: 'passport', text: '100% Embassy Accepted' },
      { icon: 'bolt', text: '2 – 3 Working Days' },
      { icon: 'doc', text: 'Full Annexures Included' }
    ]
  },
  'back-date-valuation': {
    image: 'assets/img/hero/backdate.jpg',
    imageAlt: 'Historical Retrospective Valuation Specimen with Archival Records',
    badge: 'Historical Valuation Demo',
    tag: 'Court & Capital Gains Tax',
    ref: 'BV/HIS/2026-0074',
    docType: 'Retrospective Valuation Certificate',
    rows: [
      { label: 'Property Assessed', val: 'Commercial Plot, DHA Lahore Area' },
      { label: 'Valuation As-Of Date', val: '30 June 2018 (Historical Record)' },
      { label: 'Archival Sources', val: 'Sub-Registrar Gazette & Past Deeds' },
      { label: 'Legal Standing', val: 'Civil Court & FBR Dispute Ready' }
    ],
    valueLabel: 'Historical Value (2018)',
    value: 'PKR 6,20,00,000',
    chips: [
      { icon: 'scale', text: 'Court & FBR Admissible' },
      { icon: 'doc', text: 'Gazette Verified Data' },
      { icon: 'shield', text: 'Historical Archives' }
    ]
  }
};

const statsBand = () => `<section class="stats">
  <div class="wrap">
    <div class="stats__grid" data-reveal>
      ${stats.map(s => `<div class="stat">
        <div class="stat__value"><span data-count="${s.value}">0</span><em>${esc(s.suffix)}</em></div>
        <div class="stat__label">${esc(s.label)}</div>
      </div>`).join('')}
    </div>
    <p class="stats__note">Figures cover all reporting lines since inception.</p>
  </div>
</section>`;

const testimonialSection = () => `<section class="section section--muted" id="reviews">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Client feedback',
      title: 'The report is only useful if it is <em>accepted</em>.',
      lead: 'Visa officers, judges and credit committees are the real audience. Here is how that has gone for our clients.'
    })}
  </div>
  <div class="tcarousel" data-carousel>
    <div class="tcarousel__track" data-track tabindex="0" aria-label="Client testimonials, scrollable">
      ${testimonials.map(t => `<figure class="tcard">
        <span class="tcard__quote" aria-hidden="true">${icon('quote', { size: 28 })}</span>
        ${starRow(t.rating)}
        <blockquote><p>${esc(t.quote)}</p></blockquote>
        <figcaption>
          ${t.avatar ? `
          <span class="tcard__avatar tcard__avatar--photo">
            <img src="${t.avatar}" alt="${esc(t.name)}" width="48" height="48" loading="lazy" class="tcard__avatar-img" />
          </span>` : `
          <span class="tcard__avatar" aria-hidden="true">${esc(t.name.split(' ').map(w => w[0]).join('').slice(0, 2))}</span>
          `}
          <span><strong>${esc(t.name)}</strong><small>${esc(t.role)}</small></span>
        </figcaption>
      </figure>`).join('')}
    </div>
    <div class="wrap tcarousel__nav">
      <button class="tbtn" type="button" data-prev aria-label="Previous testimonials"><span style="transform:rotate(180deg);display:flex">${icon('arrow', { size: 18 })}</span></button>
      <button class="tbtn" type="button" data-next aria-label="Next testimonials">${icon('arrow', { size: 18 })}</button>
    </div>
  </div>
</section>`;

const processSection = () => `<section class="section" id="process">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'How it works',
      title: 'Four steps, and you know the fee before step&nbsp;three.',
      lead: 'No surprises, no scope creep, no invoice that arrives larger than the quote.'
    })}
    <ol class="steps">
      ${process.map((p, i) => `<li class="step" data-reveal style="--d:${i * 90}ms">
        <span class="step__num">${esc(p.step)}</span>
        <h3 class="step__title">${esc(p.title)}</h3>
        <p class="step__body">${esc(p.body)}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>`;

const ceoSection = () => `<section class="section ceo-section" id="ceo">
  <div class="wrap ceo-layout">
    <div class="ceo-layout__visual" data-reveal="left">
      <div class="ceo-plaque">
        <div class="ceo-plaque__header">
          <div class="ceo-plaque__seal" aria-hidden="true">
            <span class="ceo-plaque__monogram">MI</span>
          </div>
          <div class="ceo-plaque__designation">
            <span class="ceo-plaque__office">DIRECTORATE OF VALUATION &amp; INSPECTION</span>
            <strong class="ceo-plaque__name">${esc(ceo.name)}</strong>
            <span class="ceo-plaque__role">Director · The Experts – A House of Prudent (Pvt.) Ltd.</span>
          </div>
        </div>
        <div class="ceo-plaque__body">
          <div class="ceo-plaque__stat-grid">
            <div class="ceo-plaque__stat">
              <strong>20+ Years</strong>
              <span>Banking &amp; Valuation Practice</span>
            </div>
            <div class="ceo-plaque__stat">
              <strong>Master's Degree</strong>
              <span>in Economics</span>
            </div>
          </div>
          <ul class="ceo-plaque__list">
            <li>${icon('check', { size: 15 })} Muccadam &amp; Stock Inspection Specialist</li>
            <li>${icon('check', { size: 15 })} Property &amp; Asset Valuation Authority</li>
            <li>${icon('check', { size: 15 })} Banking SOPs &amp; Collateral Verification</li>
            <li>${icon('check', { size: 15 })} Post-Disbursement Monitoring &amp; Compliance</li>
          </ul>
        </div>
        <div class="ceo-plaque__footer">
          <span class="ceo-plaque__status"><span class="ceo-plaque__status-dot"></span> Official Signatory &amp; Compliance Authority</span>
        </div>
      </div>
    </div>
    <div class="ceo-layout__content" data-reveal="right" style="--d:120ms">
      <p class="eyebrow">Leadership &amp; Accountability</p>
      <h2 class="ceo-layout__title">Director Profile: <em>${esc(ceo.name)}</em></h2>
      <blockquote class="ceo-quote">
        <span class="ceo-quote__icon" aria-hidden="true">${icon('quote', { size: 28 })}</span>
        <p>“${esc(ceo.quote)}”</p>
      </blockquote>
      <div class="ceo-text">
        ${ceo.message.map(p => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
      <div class="ceo-signoff">
        <div class="ceo-signoff__sig">
          <span class="ceo-signoff__signature-img"><i></i></span>
          <strong>${esc(ceo.name)}</strong>
          <small>${esc(ceo.title)}</small>
        </div>
        <div class="ceo-signoff__contact">
          <a class="btn btn--gold btn--sm" href="tel:${site.phoneHref}">${icon('phone', { size: 15 })} Direct Call</a>
          <a class="btn btn--outline btn--sm" href="mailto:${site.directorEmail || site.email}">${icon('mail', { size: 15 })} Email Director</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

/* ---------- HOME ---------------------------------------------------------- */

function home() {
  const body = `
<section class="hero">
  <div class="hero__bg" aria-hidden="true"><span class="hero__grid"></span><span class="hero__orb"></span></div>
  <div class="wrap hero__inner">
    <div class="hero__copy">
      <p class="hero__eyebrow">${icon('shield', { size: 16 })} <span>A PBA and SECP approved valuation company for all Pakistan</span></p>
      <h1 class="hero__title">Property, vehicle &amp; gold valuation <em>that holds up under scrutiny.</em></h1>
      <p class="hero__lead">We are certified company by SECP and PBA and Providing you a verified and authentic evaluation reports for visa applications of all world embassies, Marital and disputed court cases, for sale and purchase purpose , bank finance,audit Purpose and any requirements etc.</p>

      <ul class="hero__points">
        <li>${icon('check', { size: 16 })} Reports in <strong>one working day</strong></li>
        <li>${icon('check', { size: 16 })} Embassy, court, FBR &amp; bank formats</li>
        <li>${icon('check', { size: 16 })} Free hard copy delivery nationwide</li>
        <li>${icon('check', { size: 16 })} Fee agreed in writing before we start</li>
      </ul>

      <div class="hero__actions">
        <a class="btn btn--primary btn--lg" href="contact.html">Get your valuation report ${icon('arrow', { size: 18 })}</a>
        <a class="btn btn--ghost btn--lg" href="pricing.html">See pricing</a>
      </div>

      <div class="hero__trust">
        <a class="hero__call" href="tel:${site.phoneHref}">${icon('phone', { size: 18 })}<span><small>Talk to a valuer now</small><strong>${esc(site.phone)}</strong></span></a>
        <div class="hero__rating">
          ${starRow(4.9)}
          <span>Trusted for visa, legal &amp; banking files</span>
        </div>
      </div>
    </div>

    <div class="hero__visual" aria-hidden="true">
      <div class="cert">
        <div class="cert__media">
          <img src="assets/img/hero/property.jpg" alt="Property in Pakistan Valuation Specimen" width="560" height="240" loading="eager" />
          <span class="cert__media-pill"><span class="pulse-dot"></span> Live Inspection Specimen</span>
          <span class="cert__media-tag">Current Market Rates of Pakistan</span>
        </div>
        <div class="cert__head">
          <div class="cert__brandline">
            <span class="cert__logo">${icon('shield', { size: 18 })}</span>
            <span><b>BEST VALUATION</b><small>Certified Asset Valuers &middot; Pakistan</small></span>
          </div>
          <span class="cert__seal">
            <svg viewBox="0 0 64 64" width="52" height="52">
              <circle cx="32" cy="32" r="29" class="cert__seal-ring"/>
              <circle cx="32" cy="32" r="24" class="cert__seal-ring2"/>
              <path d="M22 33.5l7 7 14-15" class="cert__seal-tick"/>
            </svg>
          </span>
        </div>
        <p class="cert__doctype">Valuation Certificate</p>
        <div class="cert__rows">
          <div class="cert__row"><span>Reference</span><b>BV/PK/2026/1184</b></div>
          <div class="cert__row"><span>Asset</span><b>Property in Pakistan</b></div>
          <div class="cert__row"><span>Scope</span><b>Residential &amp; Commercial</b></div>
          <div class="cert__row"><span>Basis</span><b>Current market rates of Pakistan</b></div>
          <div class="cert__row"><span>Method</span><b>Sales comparison &amp; PBA criteria</b></div>
        </div>
        <div class="cert__value">
          <span>Assessed market value</span>
          <strong>PKR 14,25,00,000</strong>
        </div>
        <div class="cert__foot">
          <span class="cert__sign"><i></i>Authorised Valuer</span>
          <span class="cert__date">Issued 12 Sep 2026</span>
        </div>
      </div>

      <div class="hero-chips">
        <div class="chip chip--1">${icon('bolt', { size: 15 })} Delivered in 1 day</div>
        <div class="chip chip--2">${icon('passport', { size: 15 })} Embassy accepted</div>
        <div class="chip chip--3">${icon('bank', { size: 15 })} Bank &amp; court ready</div>
      </div>
    </div>
  </div>
</section>

<section class="accepted" aria-label="Where our reports are accepted">
  <div class="accepted__inner">
    <div class="accepted__badge">
      <span class="accepted__badge-dot" aria-hidden="true"></span>
      <span class="accepted__label">Reports Prepared For Submission To</span>
    </div>
    <div class="accepted__slider" tabindex="0" role="region" aria-label="Accepted institutions slider (scrolls continuously, hover to pause)">
      <div class="accepted__track">
        <ul class="accepted__list">
          ${accepted.map(a => `<li><span class="accepted__check" aria-hidden="true">${icon('check', { size: 13 })}</span><span>${esc(a)}</span></li>`).join('')}
        </ul>
        <ul class="accepted__list" aria-hidden="true">
          ${accepted.map(a => `<li><span class="accepted__check" aria-hidden="true">${icon('check', { size: 13 })}</span><span>${esc(a)}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section" id="services">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'What we value',
      title: 'Six report types, one standard of evidence.',
      lead: 'Every report states the method used, the comparables relied on and the valuer who signs it — because that is what turns a number into a document an authority will accept.'
    })}
    <div class="svc-grid">
      ${services.map(serviceCard).join('\n      ')}
    </div>
    <div class="section__foot">
      <a class="btn btn--outline" href="services.html">Compare all services ${icon('arrow', { size: 16 })}</a>
    </div>
  </div>
</section>

<section class="section section--dark why" id="why">
  <div class="wrap">
    <div class="why__layout">
      <div class="why__intro">
        <p class="eyebrow eyebrow--light">Why Best Valuation</p>
        <h2 class="why__title">Most valuation reports fail for the same&nbsp;reason.</h2>
        <p class="why__lead">They give a figure without showing where it came from. A reviewing officer cannot verify it, so they discount it — or reject the file. We write reports the other way round: evidence first, figure last.</p>
        <a class="btn btn--gold" href="about.html">More about our approach ${icon('arrow', { size: 16 })}</a>
        <div class="why__ceo" data-reveal>
          <div class="why__ceo-badge" aria-hidden="true">
            <span>MI</span>
          </div>
          <div class="why__ceo-copy">
            <blockquote>“${esc(ceo.quote)}”</blockquote>
            <cite><strong>${esc(ceo.name)}</strong>, ${esc(ceo.title)}</cite>
          </div>
        </div>
      </div>
      <ul class="why__list">
        ${differentiators.map((d, i) => `<li class="why__item" data-reveal style="--d:${i * 80}ms">
          <span class="why__icon">${icon(d.icon, { size: 22 })}</span>
          <div>
            <h3>${esc(d.title)}</h3>
            <p>${esc(d.body)}</p>
          </div>
        </li>`).join('')}
      </ul>
    </div>
  </div>
</section>

${statsBand()}

${processSection()}

<section class="section section--muted" id="use-cases">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Why people need us',
      title: 'A valuation is rarely the point. <em>The decision behind it is.</em>',
      lead: 'Tell us what the report is for and we will format it for that audience — the requirements are genuinely different.'
    })}
    <div class="uc-grid">
      ${useCases.map((u, i) => `<article class="uc" data-reveal style="--d:${i * 50}ms">
        <div class="uc__media">
          <img src="${u.image}" alt="${esc(u.imageAlt || u.title)}" width="420" height="236" loading="lazy" class="uc__img" />
          <span class="uc__icon" aria-hidden="true">${icon(u.icon, { size: 20 })}</span>
        </div>
        <div class="uc__content">
          <h3 class="uc__title">${esc(u.title)}</h3>
          <p class="uc__body">${esc(u.body)}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section coverage" id="coverage">
  <div class="wrap coverage__inner">
    <div class="coverage__copy" data-reveal="left">
      <p class="eyebrow">Coverage</p>
      <h2 class="coverage__title">Nationwide valuation coverage across all Pakistan.</h2>
      <p>Accurate valuation requires verified local intelligence and current market rates across Pakistan. With our Head Office in Lahore and experienced inspection teams stationed nationwide, we inspect and certify residential, commercial, industrial and agricultural assets across all cities and districts of Pakistan.</p>
      <ul class="coverage__areas">
        ${cities.map(c => `<li>${icon('pin', { size: 14 })} ${esc(c)}</li>`).join('')}
      </ul>
      <p class="coverage__cities"><strong>Head Office:</strong> Lahore, Pakistan &middot; <strong>Active hubs:</strong> ${karachiAreas.slice(0, 6).map(esc).join(' &middot; ')} &middot; and all districts nationwide.</p>
    </div>
    <div class="coverage__panel" data-reveal="right">
      <div class="cov-card">
        <h3>${icon('doc', { size: 20 })} What every report contains</h3>
        <ul>
          <li>${icon('check', { size: 15 })} Valuer credentials and signature</li>
          <li>${icon('check', { size: 15 })} Stated basis and method of valuation</li>
          <li>${icon('check', { size: 15 })} Comparable evidence with sources</li>
          <li>${icon('check', { size: 15 })} Dated site photographs</li>
          <li>${icon('check', { size: 15 })} Assumptions and limiting conditions</li>
          <li>${icon('check', { size: 15 })} Certification page on letterhead</li>
        </ul>
        <p class="cov-card__note">Delivered as a signed PDF, with stamped hard copies couriered free of charge.</p>
      </div>
    </div>
  </div>
</section>

${testimonialSection()}

<section class="section" id="faq">
  <div class="wrap faq-layout">
    <div class="faq-layout__aside" data-reveal>
      <p class="eyebrow">Questions</p>
      <h2>Answers before you&nbsp;call.</h2>
      <p>The things people ask us most often, answered honestly — including the parts that are not in our favour.</p>
      <a class="btn btn--outline btn--sm" href="faq.html">Read all FAQs ${icon('arrow', { size: 15 })}</a>
    </div>
    <div class="faq-layout__main">
      ${faqList(faqs.slice(0, 6), 'home-faq')}
    </div>
  </div>
</section>

${ctaBand()}
`;

  return {
    file: 'index.html',
    title: 'Property, Vehicle & Gold Valuation in Pakistan | Best Valuation',
    description: 'A PBA and SECP approved valuation company for all Pakistan. Certified property, vehicle, gold and net worth valuation reports. From Rs. 5,000 in one working day.',
    bodyClass: 'page-home',
    schema: [faqSchema(faqs.slice(0, 6))],
    body
  };
}

/* ---------- SERVICES INDEX ------------------------------------------------ */

function servicesIndex() {
  const visual = heroDemoCard({
    image: 'assets/img/hero/services.jpg',
    imageAlt: 'Multi-Asset Valuation Portfolio Best Valuation Lahore',
    badge: 'Multi-Asset Suite Demo',
    tag: 'All 6 Asset Disciplines',
    ref: 'BV/SUITE/2026-EXP',
    docType: 'Asset Valuation Practice Portfolio',
    rows: [
      { label: 'Covered Assets', val: 'Property, Vehicles, Gold, Stock, Net Worth' },
      { label: 'Standard', val: 'Embassy, Court, FBR & Bank Compliant' },
      { label: 'Speed', val: '1 Working Day Standard' }
    ],
    valueLabel: 'Starting Service Rates',
    value: 'from PKR 5,000',
    chips: [
      { icon: 'bolt', text: '1 Working Day Standard' },
      { icon: 'shield', text: 'Official Letterhead' },
      { icon: 'doc', text: 'Free Hard Copy Courier' }
    ]
  });

  const body = `
${pageHero({
  eyebrow: 'Our services',
  title: 'Valuation reports for <em>every asset that has to be proven.</em>',
  lead: 'Property, vehicles, gold, stock, net worth and historical values — each prepared on the correct basis for the authority that will read it.',
  trail: [{ label: 'Home', href: 'index.html' }, { label: 'Services' }],
  visual
})}

<section class="section">
  <div class="wrap">
    <div class="svc-grid svc-grid--wide">
      ${services.map(serviceCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--muted">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Choosing correctly',
      title: 'Not sure which report you need?',
      lead: 'The purpose decides the report — not the asset. Here is the short version.'
    })}
    <div class="chooser table-scroll">
      <table class="ctable">
        <caption class="sr-only">Which valuation report to request for each purpose</caption>
        <thead>
          <tr><th scope="col">If you need it for…</th><th scope="col">Ask for</th><th scope="col">Typical turnaround</th></tr>
        </thead>
        <tbody>
          <tr><td>A visa or immigration file listing property</td><td><a href="property-valuation.html">Property Valuation</a></td><td>1 working day</td></tr>
          <tr><td>A visa file declaring several asset types</td><td><a href="net-worth-report.html">Wealth Certificate / Net Worth Report</a></td><td>2 – 3 working days</td></tr>
          <tr><td>Jewellery declared in an application</td><td><a href="gold-valuation.html">Gold &amp; Jewellery Valuation</a></td><td>Same day</td></tr>
          <tr><td>An insurance claim on a damaged car</td><td><a href="vehicle-valuation.html">Vehicle Valuation</a></td><td>Same day</td></tr>
          <tr><td>A bank running-finance limit against stock</td><td><a href="stock-valuation.html">Stock &amp; Inventory Valuation</a></td><td>2 – 4 working days</td></tr>
          <tr><td>Capital gains tax on a property sold</td><td><a href="back-date-valuation.html">Back-Date Valuation</a></td><td>3 – 5 working days</td></tr>
          <tr><td>Dividing an inherited estate between heirs</td><td><a href="property-valuation.html">Property</a> + <a href="back-date-valuation.html">Back-Date</a></td><td>3 – 5 working days</td></tr>
          <tr><td>A court case where value is disputed</td><td>Depends on the asset — <a href="contact.html">call us first</a></td><td>Confirmed on review</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

${processSection()}
${statsBand()}
${ctaBand({ title: 'Still not sure? One call settles it.', lead: 'Describe the asset and who is going to read the report. We will tell you exactly which valuation you need, what it costs and how long it takes — with no obligation.' })}
`;

  return {
    file: 'services.html',
    title: 'Valuation Services in Pakistan | Best Valuation',
    description: 'Six certified valuation services in Pakistan: property, vehicle, gold, stock, wealth certificates and back-date reports for visa, court and bank use.',
    body
  };
}

/* ---------- SERVICE DETAIL ------------------------------------------------ */

function serviceDetail(s) {
  const others = services.filter(o => o.slug !== s.slug).slice(0, 3);
  const demo = serviceDemoConfigs[s.slug];
  const visual = demo ? heroDemoCard(demo) : '';

  const body = `
${pageHero({
  eyebrow: 'Valuation service',
  title: esc(s.name),
  lead: esc(s.hero),
  trail: [{ label: 'Home', href: 'index.html' }, { label: 'Services', href: 'services.html' }, { label: s.name }],
  visual
})}

<section class="section svc-detail">
  <div class="wrap svc-detail__layout">
    <div class="svc-detail__main">
      <p class="lede">${esc(s.intro)}</p>

      <h2 class="h-rule">What this covers</h2>
      <ul class="tick-grid">
        ${s.covers.map(c => `<li>${icon('check', { size: 15 })} ${esc(c)}</li>`).join('')}
      </ul>

      <h2 class="h-rule">Common purposes</h2>
      <ul class="tick-grid">
        ${s.purposes.map(c => `<li>${icon('check', { size: 15 })} ${esc(c)}</li>`).join('')}
      </ul>

      <h2 class="h-rule">How we arrive at the figure</h2>
      <div class="methods">
        ${s.methods.map((m, i) => `<div class="method">
          <span class="method__n">${i + 1}</span>
          <div><h3>${esc(m.name)}</h3><p>${esc(m.body)}</p></div>
        </div>`).join('')}
      </div>

      <h2 class="h-rule">What we need from you</h2>
      <div class="doclist">
        <ol>
          ${s.documents.map(d => `<li>${esc(d)}</li>`).join('')}
        </ol>
        <p class="doclist__note">${icon('shield', { size: 16 })} Documents are used solely to prepare your report and are not shared with any third party.</p>
      </div>

      <h2 class="h-rule">Questions about ${esc(s.slug === 'net-worth-report' ? 'wealth & net worth certificates' : s.name.toLowerCase())}</h2>
      ${faqList(s.faqs, 'svc-faq')}
    </div>

    <aside class="svc-detail__aside">
      <div class="quote-card">
        <p class="quote-card__label">Starting fee</p>
        <p class="quote-card__price">${money(s.price)}<span>onwards</span></p>
        <ul class="quote-card__meta">
          <li>${icon('clockSm', { size: 16 })}<span>Turnaround</span><b>${esc(s.turnaround)}</b></li>
          <li>${icon('doc', { size: 16 })}<span>Delivery</span><b>PDF + hard copy</b></li>
          <li>${icon('map', { size: 16 })}<span>Coverage</span><b>Nationwide</b></li>
        </ul>
        <a class="btn btn--primary btn--block" href="contact.html?service=${s.slug}">Request this report</a>
        <a class="btn btn--ghost btn--block" href="tel:${site.phoneHref}">${icon('phone', { size: 16 })} ${esc(site.phone)}</a>
        <p class="quote-card__fine">Exact fee confirmed in writing before any work begins.</p>
      </div>

      <div class="aside-card">
        <h3>Accepted by</h3>
        <ul class="aside-card__list">
          ${accepted.map(a => `<li>${icon('check', { size: 14 })} ${esc(a)}</li>`).join('')}
        </ul>
      </div>

      <div class="aside-card aside-card--other">
        <h3>Other services</h3>
        <ul class="aside-card__links">
          ${others.map(o => `<li><a href="${o.slug}.html">${icon(o.icon, { size: 18 })} ${esc(o.name)}</a></li>`).join('')}
        </ul>
        <a class="aside-card__all" href="services.html">All services ${icon('arrow', { size: 15 })}</a>
      </div>
    </aside>
  </div>
</section>

${processSection()}
${ctaBand({ title: s.slug === 'net-worth-report' ? 'Need a wealth or net worth certificate?' : `Need a ${s.name.toLowerCase()} report?`, lead: 'Send us the details and we will come back with the fee, the turnaround and the document checklist — usually within the hour during working hours.' })}
`;

  return {
    file: s.slug + '.html',
    title: `${s.name.includes('/') ? 'Wealth & Net Worth Certificates' : s.name} in Pakistan | Best Valuation`,
    description: s.meta,
    schema: [serviceSchema(s), faqSchema(s.faqs)],
    body
  };
}

/* ---------- PRICING ------------------------------------------------------- */

function pricing() {
  const rows = services.map(s => `<tr>
    <th scope="row"><a href="${s.slug}.html">${esc(s.name)}</a><small>${esc(s.short)}</small></th>
    <td class="ptable__price">${money(s.price)}<span>onwards</span></td>
    <td>${esc(s.turnaround)}</td>
    <td>PDF + free hard copy</td>
  </tr>`).join('');

  const cards = services.slice(0, 3).map((s, i) => `<article class="price-card${i === 0 ? ' price-card--feature' : ''}" data-reveal style="--d:${i * 80}ms">
    ${i === 0 ? '<span class="price-card__flag">Most requested</span>' : ''}
    <span class="price-card__icon">${icon(s.icon, { size: 26 })}</span>
    <h3>${esc(s.name)}</h3>
    <p class="price-card__price">${money(s.price)}<span>onwards</span></p>
    <p class="price-card__body">${esc(s.short)}</p>
    <ul class="price-card__list">
      <li>${icon('check', { size: 15 })} ${esc(s.turnaround)} turnaround</li>
      <li>${icon('check', { size: 15 })} Embassy, court &amp; bank format</li>
      <li>${icon('check', { size: 15 })} Signed PDF + stamped hard copy</li>
      <li>${icon('check', { size: 15 })} Free nationwide courier</li>
      <li>${icon('check', { size: 15 })} Query support at no extra cost</li>
    </ul>
    <a class="btn ${i === 0 ? 'btn--primary' : 'btn--outline'} btn--block" href="contact.html?service=${s.slug}">Request a quote</a>
  </article>`).join('');

  const visual = heroDemoCard({
    image: 'assets/img/hero/pricing.jpg',
    imageAlt: 'Best Valuation Fixed Rate Card and Fee Transparency Specimen',
    badge: 'Fee Transparency Demo',
    tag: 'Zero Hidden Charges',
    ref: 'BV/FEE/2026-GUARANTEE',
    docType: 'Fixed Rate Guarantee Voucher',
    rows: [
      { label: 'Property & Vehicle', val: 'From PKR 5,000 (1 Working Day)' },
      { label: 'Gold & Jewellery', val: 'From PKR 6,000 (Same Day)' },
      { label: 'Delivery Policy', val: 'Signed PDF + Free Nationwide Courier' }
    ],
    valueLabel: 'Pricing Commitment',
    value: 'Fee Fixed Upfront',
    chips: [
      { icon: 'check', text: 'No Revision Charges' },
      { icon: 'bolt', text: 'No Delivery Fee' },
      { icon: 'shield', text: 'Invoice Matches Quote' }
    ]
  });

  const body = `
${pageHero({
  eyebrow: 'Pricing',
  title: 'Published starting rates. <em>Exact fee before we start.</em>',
  lead: 'No hidden charges, no delivery fee, no revision fee. What we quote in writing is what you pay.',
  trail: [{ label: 'Home', href: 'index.html' }, { label: 'Pricing' }],
  visual
})}

<section class="section">
  <div class="wrap">
    <div class="price-grid">${cards}</div>
  </div>
</section>

<section class="section section--muted">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Full rate card', title: 'All services and starting fees', lead: 'Final fees vary with asset type, location, complexity and the purpose of the report.' })}
    <div class="table-scroll">
      <table class="ptable">
        <caption class="sr-only">Starting fees for all valuation services</caption>
        <thead><tr><th scope="col">Service</th><th scope="col">Starting fee</th><th scope="col">Turnaround</th><th scope="col">Delivery</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <div class="notes">
      <div class="note">
        <h3>${icon('tag', { size: 20 })} What moves the price</h3>
        <ul>
          <li>Asset value, size and complexity</li>
          <li>Distance and travel outside standard coverage</li>
          <li>Number of assets or items in one report</li>
          <li>Urgency — same-day handling on a deadline</li>
          <li>Depth of evidence needed for court or back-date work</li>
        </ul>
      </div>
      <div class="note">
        <h3>${icon('check', { size: 20 })} Always included</h3>
        <ul>
          <li>Physical inspection where the report requires it</li>
          <li>Signed PDF plus stamped hard copies</li>
          <li>Free courier anywhere in Pakistan</li>
          <li>Responses to queries from the receiving authority</li>
          <li>Secure handling of every document you send us</li>
        </ul>
      </div>
      <div class="note">
        <h3>${icon('doc', { size: 20 })} Bundles &amp; repeat work</h3>
        <ul>
          <li>Multiple assets in one net worth report — combined rate</li>
          <li>Property + gold for the same visa file — bundle rate</li>
          <li>Reissue of a previous report — reduced rate</li>
          <li>Corporate, panel and retainer arrangements — on request</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap faq-layout">
    <div class="faq-layout__aside" data-reveal>
      <p class="eyebrow">Fees &amp; payment</p>
      <h2>Common questions about cost.</h2>
      <p>If your case is unusual, call us — an accurate quote takes about two minutes on the phone.</p>
      <a class="btn btn--primary btn--sm" href="contact.html">Get a written quote ${icon('arrow', { size: 15 })}</a>
    </div>
    <div class="faq-layout__main">
      ${faqList([faqs[2], faqs[4], faqs[9], faqs[5], faqs[7]], 'price-faq')}
    </div>
  </div>
</section>

${ctaBand({ title: 'Get a firm quote in writing.', lead: 'Send the asset details and the purpose. We reply with the exact fee, the turnaround and the documents needed — before you commit to anything.' })}
`;

  return {
    file: 'pricing.html',
    title: 'Valuation Charges & Rates in Pakistan | Best Valuation',
    description: 'Transparent valuation pricing across Pakistan. Property and vehicle from Rs. 5,000, gold Rs. 6,000, net worth Rs. 12,000. No hidden, revision or delivery charges.',
    schema: [faqSchema([faqs[2], faqs[4], faqs[9], faqs[5], faqs[7]])],
    body
  };
}

/* ---------- ABOUT --------------------------------------------------------- */

function about() {
  const values = [
    { icon: 'scale',  title: 'Independence', body: 'We are paid for the report, never for the number in it. If the honest figure is lower than you hoped, that is the figure you get — which is precisely why the report carries weight with the person reading it.' },
    { icon: 'doc',    title: 'Evidence on the page', body: 'Every valuation shows its working: the comparables, their sources, the adjustments made and the assumptions relied on. A reviewer should be able to follow our reasoning without calling us.' },
    { icon: 'shield', title: 'Confidentiality',      body: 'Ownership documents, financial statements and asset details stay between us and you. Nothing is shared, sold or reused, and files are held securely.' },
    { icon: 'bolt',   title: 'Speed without shortcuts', body: 'One working day is our standard because our process is organised, not because steps are skipped. If a case genuinely needs longer, we say so upfront rather than rushing a weak report.' }
  ];

  const visual = heroDemoCard({
    image: 'assets/img/hero/about.jpg',
    imageAlt: 'Best Valuation Firm Credentials and Accreditation Dossier',
    badge: 'Accreditation Demo',
    tag: 'Head Office: Lahore, Pakistan',
    ref: 'BV/CRED/2026-CORP',
    docType: 'Certified Valuer Practice Dossier',
    rows: [
      { label: 'Registrations', val: 'SECP Registered & PBA Approved Panel' },
      { label: 'Standard', val: 'ICAP & International Standards (IVS)' },
      { label: 'Experience', val: '15+ Years & 12,500+ Reports Delivered' }
    ],
    valueLabel: 'Proven Track Record',
    value: '12,500+ Reports',
    chips: [
      { icon: 'shield', text: '100% Independent' },
      { icon: 'check', text: 'Evidence-First Standard' },
      { icon: 'passport', text: 'Nationwide Standing' }
    ]
  });

  const body = `
${pageHero({
  eyebrow: 'About us',
  title: 'A valuation firm built around <em>one question:</em> will this report be accepted?',
  lead: 'Best Valuation is an independent, PBA and SECP approved asset valuation practice with Head Office in Lahore, serving clients across all Pakistan.',
  trail: [{ label: 'Home', href: 'index.html' }, { label: 'About' }],
  visual
})}

<section class="section">
  <div class="wrap about__intro">
    <div class="about__copy" data-reveal>
      <p class="lede">Most people come to us with a deadline and a form that has a box on it marked “value of assets”. What they actually need is not a number — it is a document that the embassy, the court, the bank or the tax authority will accept without argument.</p>
      <p>That distinction shapes everything we do. Before we quote, we ask who is going to read the report, because a bank credit committee, a visa officer and a civil judge each want something different on the page. Then we inspect, gather comparable evidence from the specific locality, apply the method appropriate to the purpose, and set out our reasoning so it can be checked.</p>
      <p>We are a certified valuation company by SECP and PBA with our Head Office in Lahore, serving clients across all Pakistan. We track submarket dynamics in detail — from prime residential societies to commercial centres and industrial estates across all provinces. That local depth and reliance on current market rates of Pakistan is what separates a defensible valuation from a plausible guess.</p>
      <p>The practice covers property, vehicles, gold and jewellery, stock and inventory, consolidated net worth statements, and back-dated valuations for tax and litigation. Whatever the asset, the standard is the same: show the evidence, state the method, sign the certificate.</p>
    </div>
    <aside class="about__facts" data-reveal>
      <div class="fact-card">
        <h2>At a glance</h2>
        <dl>
          <div><dt>Based in</dt><dd>${esc(site.address.full)}</dd></div>
          <div><dt>Coverage</dt><dd>All major cities nationwide</dd></div>
          <div><dt>Services</dt><dd>${services.length} report types</dd></div>
          <div><dt>Standard turnaround</dt><dd>1 working day</dd></div>
          <div><dt>Delivery</dt><dd>Signed PDF + free hard copy</dd></div>
          <div><dt>Hours</dt><dd>${esc(site.hours)}</dd></div>
        </dl>
        <a class="btn btn--primary btn--block" href="contact.html">Talk to us</a>
      </div>
    </aside>
  </div>
</section>

${statsBand()}

${ceoSection()}

<section class="section section--muted">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'How we work', title: 'Four commitments we do not trade&nbsp;away.', lead: 'These are the things clients are really buying when they choose an independent valuer.' })}
    <div class="values">
      ${values.map((v, i) => `<article class="value" data-reveal style="--d:${i * 70}ms">
        <span class="value__icon">${icon(v.icon, { size: 24 })}</span>
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.body)}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Standards', title: 'Registrations &amp; professional standing', lead: 'Valuation in Pakistan is a regulated space, and the receiving authority checks who signed the report.', align: 'center' })}
    <ul class="cred-grid">
      ${credentials.map(c => `<li class="cred">
        <span class="cred__body">${esc(c.body)}</span>
        <span class="cred__label">${esc(c.label)}</span>
        ${c.ref ? `<span class="cred__ref">Reg. ${esc(c.ref)}</span>` : ''}
      </li>`).join('')}
    </ul>
    <p class="cred-note">Registration references are provided on every report and are available on request.</p>
  </div>
</section>

${processSection()}
${testimonialSection()}
${ctaBand({ title: 'Work with a valuer who shows the evidence.', lead: 'Call, email or send a message on WhatsApp. Tell us the asset and the purpose, and we will tell you exactly what is involved.' })}
`;

  return {
    file: 'about.html',
    title: 'About Best Valuation — PBA & SECP Approved Asset Valuers in Pakistan',
    description: 'SECP & PBA approved valuation firm with Head Office in Lahore. Certified property, vehicle, gold, stock and wealth reports accepted nationwide.',
    body
  };
}

/* ---------- FAQ ----------------------------------------------------------- */

function faqPage() {
  const groups = [
    { title: 'Getting started', items: faqs.slice(0, 4) },
    { title: 'Delivery & coverage', items: faqs.slice(4, 7) },
    { title: 'Validity & payment', items: faqs.slice(7) }
  ];

  const visual = heroDemoCard({
    image: 'assets/img/hero/faq.jpg',
    imageAlt: 'Valuation Advisory and Regulatory Compliance Guidance Desk',
    badge: 'Advisory Desk Demo',
    tag: 'Direct Valuer Guidance',
    ref: 'BV/ADV/2026-HELP',
    docType: 'Client Advisory & Compliance Brief',
    rows: [
      { label: 'Key Queries', val: 'Embassy Formats, Turnaround & Validity' },
      { label: 'Checklist', val: 'Ownership Proof & Inspection Details' },
      { label: 'Support Line', val: 'Mon – Sat, 9:00 AM – 7:00 PM' }
    ],
    valueLabel: 'Initial Consultation',
    value: 'Free of Charge',
    chips: [
      { icon: 'phone', text: `Direct: ${site.phone}` },
      { icon: 'bolt', text: 'Fast Document Check' },
      { icon: 'check', text: 'Honest Advice' }
    ]
  });

  const body = `
${pageHero({
  eyebrow: 'FAQ',
  title: 'Everything people ask us, <em>answered straight.</em>',
  lead: 'Including the answers that are not in our commercial interest — you should know them before you pay anyone for a valuation.',
  trail: [{ label: 'Home', href: 'index.html' }, { label: 'FAQ' }],
  visual
})}

<section class="section">
  <div class="wrap faqpage">
    <div class="faqpage__main">
      ${groups.map((g, gi) => `<div class="faqgroup">
        <h2 class="faqgroup__title">${esc(g.title)}</h2>
        ${faqList(g.items, 'faq-' + gi)}
      </div>`).join('')}

      <div class="faqgroup">
        <h2 class="faqgroup__title">Service-specific questions</h2>
        ${faqList(services.map(s => ({ q: `${s.name}: ${s.faqs[0].q}`, a: s.faqs[0].a })), 'faq-svc')}
      </div>
    </div>

    <aside class="faqpage__aside">
      <div class="help-card">
        <h2>Still stuck?</h2>
        <p>Some cases genuinely do not fit a standard answer — disputed ownership, assets abroad, an unusual deadline. Call and describe it; there is no charge for the conversation.</p>
        <a class="btn btn--gold btn--block" href="tel:${site.phoneHref}">${icon('phone', { size: 16 })} ${esc(site.phone)}</a>
        <a class="btn btn--ghost-light btn--block" href="contact.html">Send a message</a>
        <p class="help-card__hours">${icon('clockSm', { size: 15 })} ${esc(site.hours)}</p>
      </div>
      <div class="aside-card">
        <h3>Jump to a service</h3>
        <ul class="aside-card__links">
          ${services.map(s => `<li><a href="${s.slug}.html">${icon(s.icon, { size: 18 })} ${esc(s.name)}</a></li>`).join('')}
        </ul>
      </div>
    </aside>
  </div>
</section>

${ctaBand()}
`;

  return {
    file: 'faq.html',
    title: 'Valuation FAQs — Documents, Fees & Turnaround | Best Valuation',
    description: 'Answers on valuation turnaround, required documents, fees, report validity and acceptance by embassies, courts, banks and the FBR in Pakistan.',
    schema: [faqSchema(faqs)],
    body
  };
}

/* ---------- CONTACT ------------------------------------------------------- */

function contact() {
  const visual = heroDemoCard({
    image: 'assets/img/hero/contact.jpg',
    imageAlt: 'Best Valuation Priority Dispatch and Consultation Desk',
    badge: 'Express Dispatch Demo',
    tag: '1-Hour Written Quote',
    ref: 'BV/DISP/2026-PRIORITY',
    docType: 'Priority Quote Assessment Card',
    rows: [
      { label: 'Response Line', val: `${site.phone} (Phone & WhatsApp)` },
      { label: 'Headquarters', val: 'Head Office: Lahore, Pakistan' },
      { label: 'Written Quote', val: 'Guaranteed Within 60 Minutes' }
    ],
    valueLabel: 'Firm Written Quote',
    value: '100% Free & Fast',
    chips: [
      { icon: 'bolt', text: 'Quote in 60 Minutes' },
      { icon: 'whatsapp', text: 'WhatsApp Direct Desk' },
      { icon: 'shield', text: 'Zero Obligation' }
    ]
  });

  const body = `
${pageHero({
  eyebrow: 'Contact',
  title: 'Tell us the asset and the purpose.',
  lead: 'We reply with the exact fee, the turnaround and the documents needed — usually within the hour during working hours.',
  trail: [{ label: 'Home', href: 'index.html' }, { label: 'Contact' }],
  visual
})}

<section class="section">
  <div class="wrap contact__layout">
    <div class="contact__form-wrap">
      <form class="cform" id="quote-form" novalidate>
        <h2 class="cform__title">Request a free quote</h2>
        <p class="cform__sub">No obligation. We will not start work or charge anything until you approve the fee in writing.</p>

        <div class="field-row">
          <div class="field">
            <label for="f-name">Full name <span aria-hidden="true">*</span></label>
            <input type="text" id="f-name" name="name" autocomplete="name" required>
            <p class="field__error" data-error-for="f-name"></p>
          </div>
          <div class="field">
            <label for="f-phone">Phone / WhatsApp <span aria-hidden="true">*</span></label>
            <input type="tel" id="f-phone" name="phone" autocomplete="tel" placeholder="03XX-XXXXXXX" required>
            <p class="field__error" data-error-for="f-phone"></p>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-email">Email</label>
            <input type="email" id="f-email" name="email" autocomplete="email">
            <p class="field__error" data-error-for="f-email"></p>
          </div>
          <div class="field">
            <label for="f-city">City</label>
            <input type="text" id="f-city" name="city" value="Lahore" autocomplete="address-level2">
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-service">Valuation required <span aria-hidden="true">*</span></label>
            <select id="f-service" name="service" required>
              <option value="">Select a service…</option>
              ${services.map(s => `<option value="${s.slug}">${esc(s.name)}</option>`).join('')}
              <option value="other">Something else / not sure</option>
            </select>
            <p class="field__error" data-error-for="f-service"></p>
          </div>
          <div class="field">
            <label for="f-purpose">Purpose of the report</label>
            <select id="f-purpose" name="purpose">
              <option value="">Select a purpose…</option>
              <option>Visa / immigration</option>
              <option>Court / legal matter</option>
              <option>Tax / FBR filing</option>
              <option>Bank / finance</option>
              <option>Inheritance / family division</option>
              <option>Insurance</option>
              <option>Buying or selling</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label for="f-message">Asset details <span aria-hidden="true">*</span></label>
          <textarea id="f-message" name="message" rows="5" required placeholder="For example: 1 Kanal house in DHA Lahore Phase 6, needed for a UK visitor visa file by 20 September."></textarea>
          <p class="field__error" data-error-for="f-message"></p>
        </div>

        <div class="field field--check">
          <input type="checkbox" id="f-consent" name="consent" required>
          <label for="f-consent">I agree to be contacted about this enquiry. <span aria-hidden="true">*</span></label>
          <p class="field__error" data-error-for="f-consent"></p>
        </div>

        <button class="btn btn--primary btn--lg btn--block" type="submit">Send enquiry ${icon('arrow', { size: 18 })}</button>

        <p class="cform__note">${icon('shield', { size: 15 })} Your details are used only to respond to this enquiry.</p>
        <div class="cform__status" role="status" aria-live="polite"></div>
      </form>
    </div>

    <aside class="contact__aside">
      <div class="contact-card">
        <h2>Speak to us directly</h2>
        <p>Most enquiries are settled faster on a call than by email — two minutes and you will know the fee and the timeline.</p>
        <ul class="contact-card__list">
          <li>
            <span class="contact-card__ico">${icon('phone', { size: 20 })}</span>
            <span><small>Phone</small><a href="tel:${site.phoneHref}">${esc(site.phone)}</a></span>
          </li>
          <li>
            <span class="contact-card__ico">${icon('whatsapp', { size: 20 })}</span>
            <span><small>WhatsApp</small><a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">Send a message</a></span>
          </li>
          <li>
            <span class="contact-card__ico">${icon('mail', { size: 20 })}</span>
            <span><small>Head Office Email</small><a href="mailto:${site.email}">${esc(site.email)}</a></span>
          </li>
          <li>
            <span class="contact-card__ico">${icon('mail', { size: 20 })}</span>
            <span><small>Director's Office</small><a href="mailto:${site.directorEmail}">${esc(site.directorEmail)}</a></span>
          </li>
          <li>
            <span class="contact-card__ico">${icon('pin', { size: 20 })}</span>
            <span><small>Office</small><b>${esc(site.address.full)}</b></span>
          </li>
          <li>
            <span class="contact-card__ico">${icon('clockSm', { size: 20 })}</span>
            <span><small>Working hours</small><b>${esc(site.hours)}</b></span>
          </li>
        </ul>
      </div>

      <div class="aside-card">
        <h3>Before you write to us</h3>
        <p class="aside-card__intro">Including these three things gets you an accurate quote first time:</p>
        <ol class="aside-card__ol">
          <li>What the asset is, and roughly where it is</li>
          <li>Who will receive the report — embassy, court, bank, FBR</li>
          <li>The date you need it by</li>
        </ol>
      </div>
    </aside>
  </div>
</section>

<section class="section section--muted">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Coverage', title: 'Where we work', lead: 'Head Office in Lahore. We take instructions across all Pakistan.' })}
    <ul class="city-grid">
      ${cities.map(c => `<li>${icon('pin', { size: 15 })} ${esc(c)}</li>`).join('')}
    </ul>
  </div>
</section>
`;

  return {
    file: 'contact.html',
    title: 'Contact Best Valuation — Get a Free Valuation Quote in Pakistan',
    description: `Contact Best Valuation in Pakistan for certified property, vehicle, gold and net worth valuation reports. Call ${site.phone} or request a free written quote.`,
    body
  };
}

/* ---------- 404 ----------------------------------------------------------- */

function notFound() {
  const body = `
<section class="section notfound">
  <div class="wrap notfound__inner">
    <p class="eyebrow">Error 404</p>
    <h1>That page could not be valued.</h1>
    <p class="notfound__lead">The link may be out of date, or the page may have moved. Here is where most people were heading:</p>
    <div class="notfound__links">
      <a class="btn btn--primary" href="index.html">Back to home</a>
      <a class="btn btn--outline" href="services.html">All services</a>
      <a class="btn btn--outline" href="contact.html">Contact us</a>
    </div>
  </div>
</section>`;

  return { file: '404.html', title: 'Page not found | Best Valuation', description: 'The page you requested could not be found. Browse our valuation services or contact Best Valuation in Pakistan for help finding what you need.', body };
}

module.exports = { home, servicesIndex, serviceDetail, pricing, about, faqPage, contact, notFound };
