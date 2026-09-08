import { type ReactNode, useEffect, useState } from 'react';
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
  Youtube,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';

import {
  activeSocials,
  company,
  contact,
  hasEmail,
  hasPhone,
  hasWhatsApp,
  mailHref,
  telHref,
  whatsAppHref,
} from '@/content/site';

export const NAV_LINKS: Array<[string, string]> = [
  ['/', 'Home'],
  ['/properties', 'Properties'],
  ['/developers', 'Developers'],
  ['/pm-home-financing', 'PM Home Financing'],
  ['/about', 'About Us'],
  ['/contact', 'Contact Us'],
];

export function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`eyebrow flex items-center gap-3 ${light ? 'text-[#d6a365]' : 'text-[#a26e3e]'}`}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  inverted = false,
}: {
  href: string;
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <Link
      href={href}
      data-testid={`link-cta-${href.replaceAll('/', '') || 'home'}`}
      className={`group inline-flex w-fit items-center gap-5 px-5 py-4 text-[10px] font-bold uppercase tracking-[.14em] transition-all hover:gap-7 ${
        inverted
          ? 'border border-white/40 text-white hover:border-[#d6a365] hover:text-[#d6a365]'
          : 'bg-[#d6a365] text-[#183634] hover:bg-[#e4b87d]'
      }`}
    >
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}

function Wordmark({ tone }: { tone: 'light' | 'dark' }) {
  return (
    <>
      <span className="flex h-10 w-10 items-center justify-center border border-[#d6a365] font-mono text-xl font-medium text-[#d6a365]">
        G
      </span>
      <span className="leading-[.95]">
        <b className="block text-sm tracking-[.24em]">{company.shortName}</b>
        <small
          className={`text-[8px] tracking-[.18em] ${tone === 'dark' ? 'text-[#183634]/55' : 'text-white/60'}`}
        >
          PROPERTY ADVISORS
        </small>
      </span>
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isInnerPage = location !== '/';

  // Close the mobile menu whenever the route changes, and never leave the
  // page scroll-locked behind an open menu.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="bg-[#c98f51] px-5 py-2 text-center text-[10px] font-semibold tracking-[.15em] text-[#183634]">
        <span>GRID PROPERTY ADVISORS</span>
        <span className="mx-3 opacity-50">/</span>
        <span className="hidden sm:inline">{company.tagline}</span>
      </div>
      <header
        className={`absolute left-0 right-0 top-9 z-40 border-b ${
          isInnerPage
            ? 'border-[#183634]/15 text-[#183634]'
            : 'border-white/20 text-[#f6f0e5]'
        }`}
      >
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 lg:px-10">
          <Link
            href="/"
            data-testid="link-logo"
            aria-label={`${company.name} — home`}
            className="flex items-center gap-3"
          >
            <Wordmark tone={isInnerPage ? 'dark' : 'light'} />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.slice(1).map(([href, label]) => (
              <Link
                key={href}
                href={href}
                data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}
                aria-current={location === href ? 'page' : undefined}
                className={`text-[11px] font-semibold tracking-[.06em] transition-colors hover:text-[#d6a365] ${
                  location === href
                    ? 'text-[#d6a365]'
                    : isInnerPage
                      ? 'text-[#183634]/70'
                      : 'text-white/80'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              data-testid="link-header-advisor"
              className={`border px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] transition-colors hover:border-[#d6a365] hover:text-[#d6a365] ${
                isInnerPage ? 'border-[#183634]/30' : 'border-white/40'
              }`}
            >
              Talk to an Advisor
            </Link>
            <Link
              href="/properties"
              data-testid="link-header-properties"
              className="bg-[#d6a365] px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#183634] transition-transform hover:-translate-y-0.5"
            >
              Explore Properties
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            data-testid="button-mobile-menu"
            className={`border p-2 xl:hidden ${isInnerPage ? 'border-[#183634]/30' : 'border-white/40'}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-white/15 bg-[#183634] px-5 py-5 xl:hidden">
            {NAV_LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}
                className="block border-b border-white/10 py-4 text-sm tracking-wide text-white/85 last:border-0"
              >
                {label}
                <ArrowRight size={15} className="float-right text-[#d6a365]" />
              </Link>
            ))}
            <Link
              href="/contact"
              data-testid="link-mobile-advisor"
              className="mt-5 flex items-center justify-center gap-3 bg-[#d6a365] py-3 text-xs font-bold uppercase tracking-[.12em] text-[#183634]"
            >
              Talk to an Advisor <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

const SOCIAL_ICONS = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  facebook: Facebook,
} as const;

function Footer() {
  const services: Array<[string, string]> = [
    ['/properties', 'Residential Properties'],
    ['/properties', 'Property Investment'],
    ['/properties', 'Commercial Real Estate'],
    ['/about', 'Overseas Pakistani Services'],
    ['/developers', 'Developer Project Sales'],
    ['/contact', 'Property Advisory'],
  ];

  return (
    <footer className="bg-[#132d2b] text-[#eee9df]">
      <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-16 lg:grid-cols-[1.4fr_.75fr_.75fr_1fr] lg:px-10 lg:py-24">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Wordmark tone="light" />
          </div>
          <p className="max-w-xs whitespace-pre-line font-serif text-2xl leading-tight text-[#d6a365]">
            {company.footerTagline}
          </p>

          <div className="mt-8 grid gap-2 text-xs leading-6 text-white/60">
            {contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <span>{contact.city}</span>
            {hasPhone && (
              <a
                href={telHref}
                data-testid="link-footer-phone"
                className="flex items-center gap-2 hover:text-[#d6a365]"
              >
                <Phone size={13} />
                {contact.phone}
              </a>
            )}
            {hasWhatsApp && (
              <a
                href={whatsAppHref(
                  `Hello ${company.shortName}, I would like to speak to an advisor.`,
                )}
                target="_blank"
                rel="noreferrer"
                data-testid="link-footer-whatsapp"
                className="flex items-center gap-2 hover:text-[#d6a365]"
              >
                <MessageCircle size={13} />
                WhatsApp
              </a>
            )}
            {hasEmail && (
              <a
                href={mailHref}
                data-testid="link-footer-email"
                className="flex items-center gap-2 hover:text-[#d6a365]"
              >
                <Mail size={13} />
                {contact.email}
              </a>
            )}
            {contact.hours !== '' && <span>{contact.hours}</span>}
          </div>
        </div>

        <div>
          <SectionLabel light>Navigate</SectionLabel>
          <div className="mt-6 grid gap-3 text-sm text-white/65">
            {NAV_LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}
                className="hover:text-[#d6a365]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel light>Services</SectionLabel>
          <div className="mt-6 grid gap-3 text-sm text-white/65">
            {services.map(([href, label]) => (
              <Link key={label} href={href} className="hover:text-[#d6a365]">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel light>Stay connected</SectionLabel>
          {activeSocials.length > 0 ? (
            <>
              <p className="mt-6 text-sm leading-6 text-white/60">
                Follow {company.shortName} for new listings and market notes.
              </p>
              <div className="mt-6 flex gap-2">
                {activeSocials.map(([key, url]) => {
                  const Icon = SOCIAL_ICONS[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={key}
                      data-testid={`link-social-${key}`}
                      className="border border-white/20 p-2 text-white/60 transition-colors hover:border-[#d6a365] hover:text-[#d6a365]"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm leading-6 text-white/60">
              Reach us directly through the contact page — we reply to every
              inquiry.
            </p>
          )}
          <Link
            href="/contact"
            className="link-line mt-6 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#d6a365]"
          >
            Contact us <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-3 px-5 py-6 text-[10px] leading-5 tracking-wide text-white/40 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <span>
            © {new Date().getFullYear()} {company.name.toUpperCase()}. All
            rights reserved.
          </span>
          <span className="max-w-xl">{company.legalNote}</span>
        </div>
      </div>
    </footer>
  );
}

/** Floating WhatsApp button — only rendered once a number is configured. */
function WhatsAppFab() {
  if (!hasWhatsApp) return null;
  return (
    <a
      href={whatsAppHref(
        `Hello ${company.shortName}, I found you through your website.`,
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-testid="link-whatsapp-fab"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#183634] text-[#d6a365] shadow-lg transition-transform hover:-translate-y-0.5"
    >
      <MessageCircle size={20} />
    </a>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="noise min-h-[100dvh] bg-[#eee9df] text-[#183634]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#183634] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
