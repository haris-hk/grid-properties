import { type ReactNode, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';

import { ErrorBoundary } from '@/components/error-boundary';
import { company } from '@/content/site';
import { About } from '@/pages/about';
import { Contact } from '@/pages/contact';
import { Developers } from '@/pages/developers';
import { Financing } from '@/pages/financing';
import { Home } from '@/pages/home';
import { NotFound } from '@/pages/not-found';
import { Properties } from '@/pages/properties';
import { PropertyDetail } from '@/pages/property-detail';

const PAGE_META: Record<string, [string, string]> = {
  '/': [
    `${company.name} | Smart Property Decisions`,
    company.description,
  ],
  '/properties': [
    `Properties | ${company.name}`,
    `Explore selected property opportunities across Pakistan with ${company.name}.`,
  ],
  '/developers': [
    `Developers | ${company.name}`,
    `Discover ${company.name}' relationships with selected developer partners.`,
  ],
  '/pm-home-financing': [
    `PM Home Financing | ${company.name}`,
    `Understand the Wazir-e-Azam Apna Ghar Program and the property guidance ${company.shortName} provides.`,
  ],
  '/about': [
    `About ${company.name}`,
    `Learn how ${company.name} guides property decisions with purpose.`,
  ],
  '/contact': [
    `Contact ${company.name}`,
    `Talk with ${company.name} about property, investment, Emaar, or home financing.`,
  ],
};

const PROPERTY_META: [string, string] = [
  `Property Detail | ${company.name}`,
  `Review property information and connect with ${company.name} for the next step.`,
];

const NOT_FOUND_META: [string, string] = [
  `Page not found | ${company.name}`,
  `That page could not be found. Browse selected property opportunities with ${company.name}.`,
];

function metaFor(location: string): [string, string] {
  if (PAGE_META[location]) return PAGE_META[location];
  if (/^\/properties\/[^/]+$/.test(location)) return PROPERTY_META;
  return NOT_FOUND_META;
}

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

/** Canonical URL is created on the fly so index.html carries no build-time URL. */
function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Keeps <title>/meta in sync with the route, and — the part that was missing —
 * resets scroll on navigation. Without this, clicking a listing from halfway
 * down the Properties page dropped you halfway down the detail page.
 */
function useRouteEffects(location: string) {
  useEffect(() => {
    const [title, description] = metaFor(location);

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', window.location.href);
    setCanonical(window.location.origin + window.location.pathname);
  }, [location]);

  useEffect(() => {
    // Anchor links within a page (#inquiry) should still work.
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  const [location] = useLocation();
  useRouteEffects(location);

  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/properties" component={Properties} />
        <Route path="/properties/:id" component={PropertyDetail} />
        <Route path="/developers" component={Developers} />
        <Route path="/pm-home-financing" component={Financing} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

export default function App() {
  return <Router />;
}
