/**
 * ---------------------------------------------------------------------------
 * GRID Property Advisors — site content
 * ---------------------------------------------------------------------------
 * This is the ONLY file you need to edit to put real business information on
 * the site. Anything left as an empty string ('') is treated as "not supplied
 * yet": the site hides that element instead of showing a broken link or an
 * obvious placeholder.
 *
 * Fill in the fields marked TODO and redeploy.
 * ---------------------------------------------------------------------------
 */

export interface ContactDetails {
  /** e.g. '+92 21 1234 5678' — shown as a tel: link. Leave '' to hide. */
  phone: string;
  /** Digits only, with country code, no + or spaces. e.g. '923001234567' */
  whatsapp: string;
  /** e.g. 'hello@gridpropertyadvisors.com' — shown as a mailto: link. */
  email: string;
  /** Street address lines. Leave the array empty to hide the address block. */
  addressLines: string[];
  city: string;
  /** Google Maps embed URL. Leave '' to hide the map. */
  mapEmbedUrl: string;
  /** e.g. 'Mon - Sat, 10:00 - 19:00'. Leave '' to hide. */
  hours: string;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  youtube: string;
  facebook: string;
}

/** One row of a developer payment plan. */
export interface Installment {
  /** e.g. 'Down payment', 'Installment 1', 'Handover' */
  label: string;
  /** e.g. 'Aug 2026' */
  due: string;
  /** e.g. '10%' */
  share: string;
  /** Amount in PKR. */
  amount: number;
}

export interface AreaBreakdown {
  unit: string;
  common: string;
  parking: string;
  total: string;
}

export interface Property {
  id: string;
  name: string;
  /** The development the unit sits in, e.g. 'Panorama Tower'. */
  project: string;
  location: string;
  type: 'Residential' | 'Commercial' | 'Plot/Land';
  purpose: 'Investment' | 'Buy' | 'Rent';
  developer: string;
  /** Developer's unit reference, e.g. 'PAN34343B'. Leave '' to hide. */
  reference: string;
  /** e.g. '30th Floor'. Leave '' to hide. */
  floor: string;
  /** Total price in PKR. Drives both the displayed price and price filtering. */
  priceValue: number;
  /** Short payment-plan summary shown on the card and in the spec table. */
  plan: string;
  /** e.g. 'December 2026'. Leave '' to hide. */
  handover: string;
  description: string;
  /** First image is the card/hero image. Paths are relative to /public. */
  images: string[];
  status: 'Available' | 'Limited' | 'Sold Out' | 'Coming Soon';
  /** '—' when not applicable (plots, commercial). */
  bedrooms: string;
  /** Headline area, e.g. '2,341.45'. Shown with 'sq ft'. */
  areaSqFt: string;
  /** Optional detailed area split shown on the detail page. */
  areaBreakdown?: AreaBreakdown;
  highlights: string[];
  /** Optional developer payment schedule, rendered as a table. */
  paymentPlan?: Installment[];
  featured: boolean;
}

/* -------------------------------------------------------------------------- */
/* Business details                                                            */
/* -------------------------------------------------------------------------- */

export const contact: ContactDetails = {
  // TODO: replace with GRID's real contact details.
  phone: '',
  whatsapp: '',
  email: '',
  addressLines: [],
  city: 'Karachi, Pakistan',
  mapEmbedUrl: '',
  hours: '',
};

export const socials: SocialLinks = {
  // TODO: replace with GRID's real profile URLs.
  instagram: '',
  linkedin: '',
  youtube: '',
  facebook: '',
};

export const company = {
  name: 'GRID Property Advisors',
  shortName: 'GRID',
  tagline: 'Smart Property Decisions. Lasting Value.',
  footerTagline: 'Smart Investments.\nTrusted Advice.',
  description:
    'GRID Property Advisors helps clients discover, evaluate and invest in selected real estate opportunities across Pakistan.',
  partnerLine: 'Authorized Sales Partner of Emaar Pakistan',
  /** Shown in the footer. Replace with GRID's approved legal wording. */
  legalNote:
    'Listing prices, areas and payment plans are provided by the developer and are subject to change and availability. Information on this website is for general guidance only and does not constitute an offer, valuation or financial advice.',
};

/** Brand marks. Light variants are used on dark backgrounds. */
export const logos = {
  mark: '/logo-mark.png',
  markLight: '/logo-mark-light.png',
  lockup: '/logo.png',
  lockupLight: '/logo-light.png',
};

/* -------------------------------------------------------------------------- */
/* Imagery — Emaar project renders supplied by the developer                   */
/* -------------------------------------------------------------------------- */

export const images = {
  hero: '/listings/panorama-pool.jpg',
  detail: '/listings/panorama-living.jpg',
  tower: '/listings/views-tower.jpg',
  interior: '/listings/panorama-lobby.jpg',
  waterfront: '/listings/views-rooftop.jpg',
  grid: '/listings/views-pool.jpg',
  aerial: '/listings/oceanfront-aerial.jpg',
  lobby: '/listings/views-lobby.jpg',
  panoramaTower: '/listings/panorama-tower.jpg',
};

/* -------------------------------------------------------------------------- */
/* Listings                                                                    */
/* -------------------------------------------------------------------------- */
/*                                                                             */
/* Adding a listing: copy an entry, give it a unique `id` (it becomes the URL   */
/* at /properties/<id>), and fill in the fields. The Properties page builds     */
/* every filter — type, purpose, location, developer, bedrooms, status and      */
/* price band — from this array, so a new listing becomes searchable with no    */
/* other changes. `priceValue` is the plain number in PKR and drives both the   */
/* displayed price and the price-band filter.                                   */
/*                                                                             */
/* Set this to true if you ever put demo listings back in.                      */

export const SHOW_SAMPLE_NOTICE = false;

export const properties: Property[] = [
  {
    id: 'panorama-tower-2-bed-30th-floor',
    name: '2 Bedroom Apartment — 2B.5',
    project: 'Panorama Tower',
    location: 'Emaar Oceanfront, Karachi',
    type: 'Residential',
    purpose: 'Investment',
    developer: 'Emaar Pakistan',
    reference: 'PAN34343B',
    floor: '30th Floor',
    priceValue: 146208344,
    plan: '10% down payment, balance to handover in December 2026',
    handover: 'December 2026',
    description:
      'A sea-facing two bedroom apartment on the 30th floor of Panorama Tower at Emaar Oceanfront. The layout places the lounge, dining and master bedroom along the terrace, with the sea directly in front of the tower.',
    images: [
      '/listings/panorama-living.jpg',
      '/listings/panorama-pool.jpg',
      '/listings/panorama-lobby.jpg',
      '/listings/panorama-tower.jpg',
      '/listings/floorplan-panorama-2b5.jpg',
    ],
    status: 'Limited',
    bedrooms: '2',
    areaSqFt: '2,341.45',
    areaBreakdown: {
      unit: '1,844.45 sq ft',
      common: '369 sq ft',
      parking: '128 sq ft',
      total: '2,341.45 sq ft',
    },
    highlights: [
      'Sea-facing, with a 34’6" terrace running the width of the apartment',
      'Master bedroom and second bedroom both en-suite, plus a powder room',
      'Allocated parking and common area included in the assigned area',
      'Handover scheduled for December 2026',
    ],
    paymentPlan: [
      { label: 'Down payment', due: 'Aug 2026', share: '10%', amount: 14620834 },
      { label: 'Installment 1', due: 'Sep 2026', share: '23.3%', amount: 34115280 },
      { label: 'Installment 2', due: 'Oct 2026', share: '23.3%', amount: 34115280 },
      { label: 'Installment 3', due: 'Nov 2026', share: '23.3%', amount: 34115280 },
      { label: 'Handover', due: 'Dec 2026', share: '20%', amount: 29241669 },
    ],
    featured: true,
  },
  {
    id: 'panorama-tower-4-bed-38th-floor',
    name: '4 Bedroom Apartment — 4B.1',
    project: 'Panorama Tower',
    location: 'Emaar Oceanfront, Karachi',
    type: 'Residential',
    purpose: 'Investment',
    developer: 'Emaar Pakistan',
    reference: 'PAN383811',
    floor: '38th Floor',
    priceValue: 191829347,
    plan: '10% down payment, balance to handover in December 2026',
    handover: 'December 2026',
    description:
      'A four bedroom apartment high in Panorama Tower at Emaar Oceanfront, on the 38th floor. A larger family layout in the same tower, with the living space and principal bedrooms oriented toward the sea.',
    images: [
      '/listings/panorama-pool.jpg',
      '/listings/panorama-lobby.jpg',
      '/listings/panorama-living.jpg',
      '/listings/panorama-tower.jpg',
      '/listings/floorplan-panorama-4b1.jpg',
    ],
    status: 'Limited',
    bedrooms: '4',
    areaSqFt: '3,521',
    areaBreakdown: {
      unit: '2,721 sq ft',
      common: '544 sq ft',
      parking: '256 sq ft',
      total: '3,521 sq ft',
    },
    highlights: [
      'Four bedrooms on a high floor of Panorama Tower',
      'One of the larger layouts in the tower at 2,721 sq ft of unit area',
      'Allocated parking of 256 sq ft included',
      'Handover scheduled for December 2026',
    ],
    paymentPlan: [
      { label: 'Down payment', due: 'Aug 2026', share: '10%', amount: 19182935 },
      { label: 'Installment 1', due: 'Sep 2026', share: '23.3%', amount: 44760181 },
      { label: 'Installment 2', due: 'Oct 2026', share: '23.3%', amount: 44760181 },
      { label: 'Installment 3', due: 'Nov 2026', share: '23.3%', amount: 44760181 },
      { label: 'Handover', due: 'Dec 2026', share: '20%', amount: 38365869 },
    ],
    featured: true,
  },
  {
    id: 'the-views-tower-2-4-bed-30th-floor',
    name: '4 Bedroom Apartment — 4B.1',
    project: 'The Views Tower 2',
    location: 'Emaar Oceanfront, Karachi',
    type: 'Residential',
    purpose: 'Investment',
    developer: 'Emaar Pakistan',
    reference: 'V2303001',
    floor: '30th Floor',
    priceValue: 257829040,
    plan: '10% down payment, balance to handover in December 2026',
    handover: 'December 2026',
    description:
      'A four bedroom apartment on the 30th floor of The Views Tower 2 at Emaar Oceanfront, and the largest of the three units currently available through GRID at 3,711 sq ft of assigned area.',
    images: [
      '/listings/views-pool.jpg',
      '/listings/views-tower.jpg',
      '/listings/views-lobby.jpg',
      '/listings/views-rooftop.jpg',
      '/listings/floorplan-views-4b1.jpg',
    ],
    status: 'Limited',
    bedrooms: '4',
    areaSqFt: '3,711.09',
    areaBreakdown: {
      unit: '2,710 sq ft',
      common: '745.09 sq ft',
      parking: '256 sq ft',
      total: '3,711.09 sq ft',
    },
    highlights: [
      'The largest assigned area of the three units currently available',
      'Four bedrooms with a combined lounge and living space opening to the terrace',
      'Rooftop amenity deck and pool overlooking the sea',
      'Handover scheduled for December 2026',
    ],
    paymentPlan: [
      { label: 'Down payment', due: 'Aug 2026', share: '10%', amount: 25782904 },
      { label: 'Installment 1', due: 'Sep 2026', share: '23.3%', amount: 60160109 },
      { label: 'Installment 2', due: 'Oct 2026', share: '23.3%', amount: 60160109 },
      { label: 'Installment 3', due: 'Nov 2026', share: '23.3%', amount: 60160109 },
      { label: 'Handover', due: 'Dec 2026', share: '20%', amount: 51565808 },
    ],
    featured: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Formatting helpers                                                          */
/* -------------------------------------------------------------------------- */

/** 146208344 -> 'PKR 146,208,344' */
export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-US')}`;
}

/** 146208344 -> 'PKR 14.62 Crore' — the way prices are quoted in Pakistan. */
export function formatCrore(amount: number): string {
  if (amount <= 0) return 'Price on request';
  const crore = amount / 10000000;
  const value =
    crore >= 100 ? crore.toFixed(0) : crore >= 10 ? crore.toFixed(2) : crore.toFixed(2);
  return `PKR ${value} Crore`;
}

/* -------------------------------------------------------------------------- */
/* Derived helpers                                                             */
/* -------------------------------------------------------------------------- */

export const hasPhone = contact.phone.trim() !== '';
export const hasWhatsApp = contact.whatsapp.trim() !== '';
export const hasEmail = contact.email.trim() !== '';
export const hasAddress = contact.addressLines.length > 0;
export const hasMap = contact.mapEmbedUrl.trim() !== '';

export const telHref = hasPhone
  ? `tel:${contact.phone.replace(/[^\d+]/g, '')}`
  : '';
export const mailHref = hasEmail ? `mailto:${contact.email}` : '';

export function whatsAppHref(message: string): string {
  if (!hasWhatsApp) return '';
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const activeSocials = (
  [
    ['instagram', socials.instagram],
    ['linkedin', socials.linkedin],
    ['youtube', socials.youtube],
    ['facebook', socials.facebook],
  ] as const
).filter(([, url]) => url.trim() !== '');

/** Price bands offered in the Properties filter, in PKR. */
export const priceBands: Array<{ label: string; min: number; max: number }> = [
  { label: 'Under 5 Crore', min: 0, max: 50000000 },
  { label: '5 - 10 Crore', min: 50000000, max: 100000000 },
  { label: '10 - 15 Crore', min: 100000000, max: 150000000 },
  { label: '15 - 20 Crore', min: 150000000, max: 200000000 },
  { label: '20 Crore and above', min: 200000000, max: Number.POSITIVE_INFINITY },
];

export function unique(values: string[]): string[] {
  return [...new Set(values.filter((v) => v && v !== '—'))].sort();
}
