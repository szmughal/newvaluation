/* ============================================================================
   ICONS — hand-drawn 24x24 line SVGs, inlined at build time.
   No icon font, no network request, inherits currentColor.
   ========================================================================== */

const paths = {
  /* --- service icons --- */
  building: '<path d="M3 21h18M5 21V6l7-3 7 3v15M9 9h2M13 9h2M9 13h2M13 13h2M9 17h6"/>',
  car: '<path d="M5 17h14M4 17v-4.5L6.2 7A2 2 0 0 1 8.1 5.7h7.8A2 2 0 0 1 17.8 7L20 12.5V17M4 12.5h16"/><circle cx="7.5" cy="17" r="1.6"/><circle cx="16.5" cy="17" r="1.6"/>',
  gem: '<path d="M6 3h12l3 6-9 12L3 9l3-6Z"/><path d="M3 9h18M9 3l-1 6 4 12 4-12-1-6"/>',
  boxes: '<path d="M3 8.5 12 4l9 4.5v7L12 20l-9-4.5v-7Z"/><path d="m3 8.5 9 4.5 9-4.5M12 13v7"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2M4.2 5.4 6.6 7.2"/>',

  /* --- differentiator icons --- */
  bolt: '<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',
  shield: '<path d="M12 22s8-3.6 8-9.4V5.4L12 2.5 4 5.4v7.2C4 18.4 12 22 12 22Z"/><path d="m8.8 12 2.3 2.3 4.2-4.6"/>',
  map: '<path d="M9 3 3 5.6v15.1L9 18l6 3 6-2.6V3.3L15 6 9 3Z"/><path d="M9 3v15M15 6v15"/>',
  tag: '<path d="M3 11.6V4.5A1.5 1.5 0 0 1 4.5 3h7.1a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0L3.6 13a2 2 0 0 1-.6-1.4Z"/><circle cx="7.8" cy="7.8" r="1.4"/>',

  /* --- use case icons --- */
  passport: '<rect x="4" y="2.5" width="16" height="19" rx="2.2"/><circle cx="12" cy="10" r="3.2"/><path d="M9 17.5h6M8.9 10h6.2"/>',
  scale: '<path d="M12 3v18M7 21h10M12 6 4 8.4M12 6l8 2.4"/><path d="M4 8.4 1.6 14a2.6 2.6 0 0 0 4.8 0L4 8.4ZM20 8.4 17.6 14a2.6 2.6 0 0 0 4.8 0L20 8.4Z"/>',
  receipt: '<path d="M5 2.8v18.4l2.3-1.5 2.4 1.5 2.3-1.5 2.4 1.5 2.3-1.5 2 1.5V2.8l-2 1.4-2.3-1.4-2.4 1.4-2.3-1.4-2.4 1.4L5 2.8Z"/><path d="M9 9h6M9 13h6"/>',
  bank: '<path d="M3 9.6 12 4l9 5.6M4.5 9.6V18M9 9.6V18M15 9.6V18M19.5 9.6V18M2.5 21h19"/>',
  family: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.4"/><path d="M2.5 20v-1.6A4.4 4.4 0 0 1 6.9 14h2.2a4.4 4.4 0 0 1 4.4 4.4V20M15 14h1.6a4 4 0 0 1 4 4v2"/>',
  handshake: '<path d="m11 6 2-1.6a2 2 0 0 1 2.4 0L21 9v6h-2l-3.6 3.4a1.8 1.8 0 0 1-2.5 0L11 16"/><path d="M3 9 8 4.4a2 2 0 0 1 2.5 0L13 6.4 9.6 9.7a1.9 1.9 0 0 0 2.6 2.7l1.6-1.5M3 9v6h2"/>',

  /* --- UI icons --- */
  phone: '<path d="M21 16.9v2.6a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6A19.6 19.6 0 0 1 1.3 4a2 2 0 0 1 2-2.2h2.6a2 2 0 0 1 2 1.7c.1 1 .35 1.9.7 2.8a2 2 0 0 1-.5 2.1L7 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.35 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.2"/><path d="m3 6.5 9 6.2 9-6.2"/>',
  pin: '<path d="M20 10.4c0 5.6-8 11.6-8 11.6s-8-6-8-11.6a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.2" r="2.9"/>',
  clockSm: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m4 12.5 5.2 5.2L20 6.8"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  doc: '<path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5l-5-5Z"/><path d="M14 2.5v5h5M9 13h6M9 17h4"/>',
  star: '<path d="m12 2.8 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.05L6.2 20.75l1.1-6.5-4.7-4.6 6.5-.95L12 2.8Z"/>',
  quote: '<path d="M9.5 5.5C6.4 7 4.5 9.9 4.5 13.4c0 3 1.8 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.06-1 .13.4-1.9 2-3.6 4.2-4.6l-3-1.33ZM19 5.5c-3.1 1.5-5 4.4-5 7.9 0 3 1.8 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.06-1 .13.4-1.9 2-3.6 4.2-4.6L19 5.5Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',

  /* --- social --- */
  facebook: '<path d="M15.5 8.5h-2.2c-.5 0-.8.35-.8.85V11h3l-.4 3h-2.6v7H9.4v-7H7v-3h2.4V9c0-2.2 1.4-3.6 3.5-3.6h2.6v3.1Z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5V17M7.5 7.4v.1M11.5 17v-3.7a2.1 2.1 0 0 1 4.2 0V17M11.5 10.5V17"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.4 6.7v.1"/>',
  whatsapp: '<path d="M3.5 20.5 4.9 16A8.2 8.2 0 1 1 8 19.1l-4.5 1.4Z"/><path d="M9 9.2c.2 1 .7 2 1.5 2.9.8.8 1.8 1.4 2.8 1.6l1-1.2 1.9.9-.3 1.5c-1.7.5-3.7-.4-5.3-2-1.6-1.6-2.4-3.6-2-5.3l1.5-.3.9 1.9L9 9.2Z"/>'
};

/* Fill-style icons need no stroke */
const filled = new Set(['star', 'quote', 'facebook', 'bolt']);

function icon(name, opts = {}) {
  const p = paths[name];
  if (!p) throw new Error('Unknown icon: ' + name);
  const size = opts.size || 24;
  const cls = opts.class ? ` class="${opts.class}"` : '';
  const paint = filled.has(name)
    ? 'fill="currentColor" stroke="none"'
    : 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  return `<svg${cls} width="${size}" height="${size}" viewBox="0 0 24 24" ${paint} aria-hidden="true" focusable="false">${p}</svg>`;
}

module.exports = { icon, paths };
