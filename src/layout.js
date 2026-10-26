/* ============================================================================
   LAYOUT — document shell, header, footer and shared UI partials.
   ========================================================================== */

const { site, services, credentials, social } = require('./data');
const D = require('./data');
const { icon } = require('./icons');

const nav = [
  { label: 'Home',     href: 'index.html' },
  { label: 'Services', href: 'services.html', children: services.map(s => ({ label: s.name, href: s.slug + '.html', desc: s.short, icon: s.icon, image: s.image, imageAlt: s.imageAlt })) },
  { label: 'Pricing',  href: 'pricing.html' },
  { label: 'About',    href: 'about.html' },
  { label: 'FAQ',      href: 'faq.html' },
  { label: 'Contact',  href: 'contact.html' }
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = n => 'Rs. ' + n.toLocaleString('en-US');

/* --- brand mark ---------------------------------------------------------- */
function logo(variant = 'dark') {
  return `<a class="brand brand--${variant}" href="index.html" aria-label="${esc(site.name)} — home">
  <span class="brand__mark" aria-hidden="true">
    <svg viewBox="0 0 40 40" width="40" height="40">
      <path class="brand__shield" d="M20 2.5 35 7.4v12.3c0 8.6-6.4 14.6-15 18.3-8.6-3.7-15-9.7-15-18.3V7.4L20 2.5Z"/>
      <path class="brand__bar" d="M13 25.5v-6M20 25.5V13.5M27 25.5v-9.5"/>
      <path class="brand__tick" d="M12.5 29.5h15"/>
    </svg>
  </span>
  <span class="brand__text">
    <span class="brand__name">Best<em>Valuation</em></span>
    <span class="brand__sub">Certified Asset Valuers</span>
  </span>
</a>`;
}

/* --- header -------------------------------------------------------------- */
function header(current) {
  const isActive = href => href === current;

  const navItems = nav.map(item => {
    if (item.children) {
      const active = isActive(item.href) || item.children.some(c => isActive(c.href));
      const sub = item.children.map(c => `
          <li><a class="megamenu__item${isActive(c.href) ? ' is-current' : ''}" href="${c.href}">
            <span class="megamenu__thumb">
              <img src="${c.image}" alt="${esc(c.imageAlt || c.label)}" width="54" height="54" loading="lazy" class="megamenu__thumb-img" />
              <span class="megamenu__thumb-badge" aria-hidden="true">${icon(c.icon, { size: 12 })}</span>
            </span>
            <span class="megamenu__copy">
              <span class="megamenu__title">${esc(c.label)}</span>
              <span class="megamenu__desc">${esc(c.desc)}</span>
            </span>
          </a></li>`).join('');
      return `<li class="nav__item nav__item--has-menu">
        <a class="nav__link${active ? ' is-current' : ''}" href="${item.href}" aria-expanded="false" aria-haspopup="true">
          ${esc(item.label)}<span class="nav__caret" aria-hidden="true">${icon('chevron', { size: 16 })}</span>
        </a>
        <div class="megamenu" role="group" aria-label="Valuation services">
          <ul class="megamenu__grid">${sub}</ul>
          <div class="megamenu__foot">
            <span>Not sure which report you need?</span>
            <a href="contact.html">Ask us — we will tell you in one call ${icon('arrow', { size: 16 })}</a>
          </div>
        </div>
      </li>`;
    }
    return `<li class="nav__item"><a class="nav__link${isActive(item.href) ? ' is-current' : ''}" href="${item.href}"${isActive(item.href) ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
  }).join('');

  const creds = credentials.map(c =>
    `<li class="topbar__cred"><span>${esc(c.label)}</span>${c.ref ? `<b>${esc(c.ref)}</b>` : ''}</li>`
  ).join('');

  return `<a class="skip-link" href="#main">Skip to content</a>

<div class="topbar">
  <div class="wrap topbar__inner">
    <ul class="topbar__creds">${creds}</ul>
    <div class="topbar__contact">
      <a href="mailto:${site.email}">${icon('mail', { size: 15 })}<span>${esc(site.email)}</span></a>
      <span class="topbar__sep" aria-hidden="true"></span>
      <span class="topbar__hours">${icon('clockSm', { size: 15 })}<span>${esc(site.hours)}</span></span>
    </div>
  </div>
</div>

<header class="header" id="header">
  <div class="wrap header__inner">
    ${logo()}
    <nav class="nav" aria-label="Primary">
      <ul class="nav__list">${navItems}</ul>
    </nav>
    <div class="header__actions">
      <a class="header__phone" href="tel:${site.phoneHref}">
        <span class="header__phone-icon">${icon('phone', { size: 18 })}</span>
        <span class="header__phone-copy"><small>Speak to a valuer</small><strong>${esc(site.phone)}</strong></span>
      </a>
      <a class="btn btn--primary btn--sm" href="contact.html">Get a Quote</a>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
        <span class="burger__open">${icon('menu')}</span>
        <span class="burger__close">${icon('close')}</span>
      </button>
    </div>
  </div>
</header>

<div class="drawer" id="mobile-nav" hidden>
  <div class="drawer__header">
    <span class="drawer__title">Navigation</span>
    <button class="drawer__close" type="button" aria-label="Close menu">${icon('close')}</button>
  </div>
  <nav class="drawer__inner" aria-label="Mobile">
    <ul class="drawer__list">
      ${nav.map(item => item.children
        ? `<li class="drawer__group">
             <button class="drawer__toggle" type="button" aria-expanded="false">${esc(item.label)}<span aria-hidden="true">${icon('chevron', { size: 18 })}</span></button>
             <ul class="drawer__sub">${item.children.map(c => `<li><a href="${c.href}">${esc(c.label)}</a></li>`).join('')}</ul>
           </li>`
        : `<li><a class="drawer__link${isActive(item.href) ? ' is-current' : ''}" href="${item.href}">${esc(item.label)}</a></li>`
      ).join('')}
    </ul>
    <div class="drawer__foot">
      <a class="btn btn--primary btn--block" href="contact.html">Get a Free Quote</a>
      <a class="drawer__call" href="tel:${site.phoneHref}">${icon('phone', { size: 18 })} ${esc(site.phone)}</a>
      <a class="drawer__email" href="mailto:${site.email}">${icon('mail', { size: 16 })} ${esc(site.email)}</a>
    </div>
  </nav>
</div>`;
}

/* --- footer -------------------------------------------------------------- */
function footer() {
  const svcLinks = services.map(s => `<li><a href="${s.slug}.html">${esc(s.name)}</a></li>`).join('');
  const socials = site.social.map(s =>
    `<a class="social" href="${s.url}" aria-label="${esc(s.name)}"${s.url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${icon(s.icon, { size: 18 })}</a>`
  ).join('');

  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__top">
      <div class="footer__brand">
        ${logo('light')}
        <p class="footer__blurb">Independent, certified valuation of property, vehicles, gold, stock and net worth — prepared to the standard embassies, courts, banks and the FBR expect. Head Office in Lahore, serving all Pakistan.</p>
        <div class="footer__socials">${socials}</div>
      </div>

      <div class="footer__col">
        <h3 class="footer__title">Services</h3>
        <ul class="footer__links">${svcLinks}</ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__title">Company</h3>
        <ul class="footer__links">
          <li><a href="about.html">About us</a></li>
          <li><a href="services.html">All services</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="footer__col footer__col--contact">
        <h3 class="footer__title">Get in touch</h3>
        <ul class="footer__contact">
          <li>${icon('phone', { size: 18 })}<a href="tel:${site.phoneHref}">${esc(site.phone)}</a></li>
          <li>${icon('mail', { size: 18 })}<a href="mailto:${site.email}">${esc(site.email)}</a></li>
          <li>${icon('mail', { size: 18 })}<a href="mailto:${site.directorEmail}">${esc(site.directorEmail)}</a></li>
          <li>${icon('pin', { size: 18 })}<span>${esc(site.address.full)}</span></li>
          <li>${icon('clockSm', { size: 18 })}<span>${esc(site.hours)}</span></li>
        </ul>
        <a class="btn btn--gold btn--sm footer__cta" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', { size: 16 })} Message on WhatsApp</a>
      </div>
    </div>

    <div class="footer__bottom">
      <p>&copy; <span data-year>2026</span> ${esc(site.name)} &middot; ${esc(site.legalName.replace(/\.+$/, ''))}. All rights reserved.</p>
      <p class="footer__note">${esc(site.tagline)} &middot; Reports issued for lawful use by the named client only.</p>
    </div>
  </div>
</footer>

<a class="totop" href="#top" aria-label="Back to top">${icon('up', { size: 18 })}</a>
<a class="wa-float" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon('whatsapp', { size: 26 })}</a>`;
}

/* --- shared partials ------------------------------------------------------ */
function sectionHead({ eyebrow, title, lead, align = 'center', level = 2 }) {
  return `<div class="sec-head sec-head--${align}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h${level} class="sec-head__title">${title}</h${level}>
    ${lead ? `<p class="sec-head__lead">${lead}</p>` : ''}
  </div>`;
}

function breadcrumb(trail) {
  const items = trail.map((t, i) =>
    i === trail.length - 1
      ? `<li aria-current="page">${esc(t.label)}</li>`
      : `<li><a href="${t.href}">${esc(t.label)}</a></li>`
  ).join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="wrap"><ol>${items}</ol></div></nav>`;
}

function pageHero({ eyebrow, title, lead, trail, visual }) {
  return `<section class="phero${visual ? ' phero--has-visual' : ''}">
  <div class="phero__glow" aria-hidden="true"></div>
  <div class="wrap phero__inner${visual ? ' phero__inner--split' : ''}">
    <div class="phero__copy">
      ${eyebrow ? `<p class="eyebrow eyebrow--light">${esc(eyebrow)}</p>` : ''}
      <h1 class="phero__title">${title}</h1>
      ${lead ? `<p class="phero__lead">${lead}</p>` : ''}
    </div>
    ${visual ? `<div class="phero__visual" aria-hidden="true">${visual}</div>` : ''}
  </div>
</section>
${trail ? breadcrumb(trail) : ''}`;
}

function ctaBand({ title, lead, primary = { label: 'Get a Free Quote', href: 'contact.html' } } = {}) {
  return `<section class="cta-band">
  <div class="wrap cta-band__inner" data-reveal>
    <div class="cta-band__copy">
      <h2>${title || 'Make confident decisions about what you own.'}</h2>
      <p>${lead || 'Tell us the asset and the purpose. We will confirm the fee, the turnaround and exactly what we need from you — before you commit to anything.'}</p>
    </div>
    <div class="cta-band__actions">
      <a class="btn btn--gold" href="${primary.href}">${esc(primary.label)}</a>
      <a class="btn btn--ghost-light" href="tel:${site.phoneHref}">${icon('phone', { size: 17 })} ${esc(site.phone)}</a>
    </div>
  </div>
</section>`;
}

/* --- structured data ------------------------------------------------------ */
function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': site.url + '/#organization',
    name: site.name,
    description: 'A PBA and SECP approved valuation company for all Pakistan. Certified property, vehicle, gold, stock and net worth valuation reports.',
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street || undefined,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: 'PK'
    },
    areaServed: D.cities.map(c => ({ '@type': 'City', name: c })),
    openingHours: 'Mo-Sa 09:00-19:00',
    priceRange: 'Rs. 5,000 – Rs. 25,000',
    serviceType: services.map(s => s.name)
  };
}

function faqSchema(list) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function serviceSchema(s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.short,
    provider: { '@id': site.url + '/#organization' },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    offers: {
      '@type': 'Offer',
      price: s.price,
      priceCurrency: 'PKR',
      description: 'Starting fee. Final quotation confirmed in writing before work begins.'
    }
  };
}

/* --- page loader --------------------------------------------------------- */
function pageLoader() {
  return `<div class="page-loader" id="page-loader" role="status" aria-live="polite" aria-label="Loading page">
  <div class="page-loader__card">
    <div class="page-loader__flag-emblem">
      <div class="page-loader__flag" aria-label="Flag of Pakistan">
        <svg viewBox="0 0 900 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Official Flag of Pakistan">
          <rect width="900" height="600" fill="#01411C"/>
          <rect width="225" height="600" fill="#FFFFFF"/>
          <circle cx="562.5" cy="300" r="180" fill="#FFFFFF"/>
          <circle cx="587.2" cy="278.1" r="165" fill="#01411C"/>
          <g transform="translate(635, 235) rotate(48.4)">
            <polygon points="0,-60 17.6,-18.5 60,-18.5 24.7,7.1 37.1,50 0,22.9 -37.1,50 -24.7,7.1 -60,-18.5 -17.6,-18.5" fill="#FFFFFF"/>
          </g>
        </svg>
      </div>
      <div class="page-loader__ring" aria-hidden="true"></div>
    </div>
    <div class="page-loader__meta">
      <span class="page-loader__brand">Best<em>Valuation</em></span>
      <span class="page-loader__sub">Certified Asset Valuers &middot; Pakistan</span>
    </div>
    <div class="page-loader__bar" aria-hidden="true"><span class="page-loader__bar-fill"></span></div>
  </div>
</div>`;
}

/* --- document shell ------------------------------------------------------- */
function page({ file, title, description, body, schema = [], bodyClass = '' }) {
  const canonical = site.url + '/' + (file === 'index.html' ? '' : file);
  const ld = [orgSchema(), ...schema]
    .map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n  ');

  return `<!DOCTYPE html>
<html lang="en" id="top">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#0B1B2B">
  <meta name="robots" content="index, follow">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="en_PK">
  <meta name="twitter:card" content="summary_large_image">

  <script>document.documentElement.classList.add('js');</script>

  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/img/favicon.svg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">

  ${ld}
</head>
<body class="${bodyClass}">
${pageLoader()}
<div class="progress" aria-hidden="true"><span class="progress__bar" data-progress></span></div>
${header(file)}
<main id="main">
${body}
</main>
${footer()}
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

module.exports = { page, sectionHead, pageHero, breadcrumb, ctaBand, faqSchema, serviceSchema, esc, money, nav, logo };
