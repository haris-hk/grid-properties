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
  /** e.g. 'Mon – Sat, 10:00 – 19:00'. Leave '' to hide. */
  hours: string;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  youtube: string;
  facebook: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  type: 'Residential' | 'Commercial' | 'Plot/Land';
  purpose: 'Investment' | 'Buy' | 'Rent';
  developer: string;
  /** Free text, e.g. 'From PKR 4.2 Crore'. */
  price: string;
  /** Numeric value in PKR, used for range filtering. 0 = unknown. */
  priceValue: number;
  plan: string;
  description: string;
  /** First image is the card/hero image. */
  images: string[];
  status: 'Available' | 'Limited' | 'Sold Out' | 'Coming Soon';
  /** '—' when not applicable (plots, commercial). */
  bedrooms: string;
  areaSqFt: string;
  highlights: string[];
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
    'Information on this website is for general guidance only and does not constitute an offer, valuation or financial advice.',
};

/* -------------------------------------------------------------------------- */
/* Stock imagery — replace with GRID's own photography when available          */
/* -------------------------------------------------------------------------- */

export const images = {
  hero: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800',
  detail:
    'https://images.pexels.com/photos/7031606/pexels-photo-7031606.jpeg?auto=compress&cs=tinysrgb&w=1400',
  tower:
    'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1400',
  interior:
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
  waterfront:
    'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=1800',
  grid: 'https://images.pexels.com/photos/1486403/pexels-photo-1486403.jpeg?auto=compress&cs=tinysrgb&w=1200',
  plot: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1400',
  lobby:
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400',
};

/* -------------------------------------------------------------------------- */
/* Listings                                                                    */
/* -------------------------------------------------------------------------- */
/*                                                                             */
/* The three entries below are SAMPLE listings. They exist so the Properties    */
/* page, the filters and the detail pages have something real to work with —    */
/* they are not GRID inventory and they name no real developer or price.        */
/*                                                                             */
/* To go live:                                                                  */
/*   1. Replace these entries with GRID's approved listings.                    */
/*   2. Set SHOW_SAMPLE_NOTICE below to false.                                  */
/*                                                                             */
/* Filters (type, purpose, location, developer, bedrooms, status, price band)   */
/* are built from this array, so new listings become filterable automatically.  */

export const SHOW_SAMPLE_NOTICE = true;

export const properties: Property[] = [
  {
    id: 'sample-waterfront-apartments',
    name: 'Waterfront Apartments',
    location: 'Karachi',
    type: 'Residential',
    purpose: 'Investment',
    developer: 'Example Developer',
    price: 'Price on request',
    priceValue: 45000000,
    plan: 'Payment plan on request',
    description:
      'Sample listing. Sea-facing apartments in a gated development, shown here to demonstrate how a residential listing appears on the site.',
    images: [images.detail, images.interior, images.lobby],
    status: 'Available',
    bedrooms: '2-4',
    areaSqFt: '1,450 - 3,100',
    highlights: [
      'Replace with the approved highlights for this listing',
      'Each listing supports any number of highlight lines',
      'Handover and delivery notes belong here',
    ],
    featured: true,
  },
  {
    id: 'sample-commercial-units',
    name: 'Commercial Retail Units',
    location: 'Lahore',
    type: 'Commercial',
    purpose: 'Investment',
    developer: 'Example Developer',
    price: 'Price on request',
    priceValue: 32000000,
    plan: 'Payment plan on request',
    description:
      'Sample listing. Ground and mezzanine retail units, shown here to demonstrate how a commercial listing appears on the site.',
    images: [images.tower, images.grid, images.lobby],
    status: 'Limited',
    bedrooms: '\u2014',
    areaSqFt: '900 - 2,400',
    highlights: [
      'Replace with the approved highlights for this listing',
      'Rental or yield notes belong here',
      'Lease terms belong here',
    ],
    featured: true,
  },
  {
    id: 'sample-residential-plots',
    name: 'Residential Plots',
    location: 'Islamabad',
    type: 'Plot/Land',
    purpose: 'Buy',
    developer: 'Example Developer',
    price: 'Price on request',
    priceValue: 8500000,
    plan: 'Payment plan on request',
    description:
      'Sample listing. Residential plots across several precincts, shown here to demonstrate how a land listing appears on the site.',
    images: [images.plot, images.grid, images.hero],
    status: 'Available',
    bedrooms: '\u2014',
    areaSqFt: '125 - 500 sq yd',
    highlights: [
      'Replace with the approved highlights for this listing',
      'Transfer and documentation notes belong here',
      'Development timeline notes belong here',
    ],
    featured: false,
  },
];

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
  { label: 'Under 1 Crore', min: 0, max: 10000000 },
  { label: '1 – 3 Crore', min: 10000000, max: 30000000 },
  { label: '3 – 5 Crore', min: 30000000, max: 50000000 },
  { label: '5 Crore and above', min: 50000000, max: Number.POSITIVE_INFINITY },
];

export function unique(values: string[]): string[] {
  return [...new Set(values.filter((v) => v && v !== '—'))].sort();
}
