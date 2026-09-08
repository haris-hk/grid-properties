import { useMemo, useState } from 'react';
import { ArrowRight, Compass, Heart, Search, X } from 'lucide-react';
import { Link } from 'wouter';

import { SectionLabel, Shell } from '@/components/layout';
import { useFavorites } from '@/lib/use-favorites';
import {
  type Property,
  SHOW_SAMPLE_NOTICE,
  priceBands,
  properties,
  unique,
} from '@/content/site';

const ANY = {
  type: 'All types',
  purpose: 'All purposes',
  location: 'All locations',
  price: 'All price ranges',
  developer: 'All developers',
  bedrooms: 'Any bedrooms',
  status: 'All statuses',
} as const;

export function PropertyCard({
  property,
  favorite,
  onFavorite,
}: {
  property: Property;
  favorite: boolean;
  onFavorite: () => void;
}) {
  return (
    <article
      data-testid={`card-property-${property.id}`}
      className="group flex flex-col bg-[#f5f0e7]"
    >
      <div className="relative h-64 overflow-hidden bg-[#183634]">
        <img
          src={property.images[0]}
          alt={property.name}
          loading="lazy"
          className="img-lift h-full w-full object-cover opacity-90"
        />
        <div className="absolute left-4 top-4 bg-[#eee9df] px-2 py-1 text-[9px] font-bold uppercase tracking-[.12em]">
          {property.status}
        </div>
        <button
          type="button"
          aria-label={
            favorite ? `Remove ${property.name}` : `Save ${property.name}`
          }
          aria-pressed={favorite}
          data-testid={`button-favorite-${property.id}`}
          onClick={onFavorite}
          className={`absolute right-4 top-4 border p-2 transition-colors ${
            favorite
              ? 'border-[#d6a365] bg-[#d6a365] text-[#183634]'
              : 'border-white/50 bg-[#183634]/35 text-white hover:bg-[#d6a365] hover:text-[#183634]'
          }`}
        >
          <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="eyebrow text-[#a26e3e]">
          {property.type} · {property.purpose}
        </div>
        <h3 className="display-font mt-3 text-3xl">{property.name}</h3>
        <p className="mt-2 text-xs text-[#183634]/55">{property.location}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#183634]/15 py-4 text-xs">
          <span>
            <b className="block text-[#183634]/45">Price</b>
            {property.price}
          </span>
          <span>
            <b className="block text-[#183634]/45">Developer</b>
            {property.developer}
          </span>
        </div>
        <p className="mt-5 flex-1 text-xs leading-6 text-[#183634]/60">
          {property.description}
        </p>
        <Link
          href={`/properties/${property.id}`}
          data-testid={`link-property-${property.id}`}
          className="mt-6 inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#a26e3e]"
        >
          View Property <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  testId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  testId: string;
}) {
  return (
    <select
      value={value}
      aria-label={label}
      onChange={(event) => onChange(event.target.value)}
      data-testid={testId}
      className="border-b border-[#183634]/20 bg-transparent py-3 text-xs outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function Properties() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string>(ANY.type);
  const [purpose, setPurpose] = useState<string>(ANY.purpose);
  const [location, setLocation] = useState<string>(ANY.location);
  const [price, setPrice] = useState<string>(ANY.price);
  const [developer, setDeveloper] = useState<string>(ANY.developer);
  const [bedrooms, setBedrooms] = useState<string>(ANY.bedrooms);
  const [status, setStatus] = useState<string>(ANY.status);
  const [savedOnly, setSavedOnly] = useState(false);

  const { favorites, toggle } = useFavorites();

  // Filter options are derived from the listings, so adding a property in
  // src/content/site.ts automatically makes it filterable.
  const options = useMemo(
    () => ({
      types: [ANY.type, ...unique(properties.map((p) => p.type))],
      purposes: [ANY.purpose, ...unique(properties.map((p) => p.purpose))],
      locations: [ANY.location, ...unique(properties.map((p) => p.location))],
      prices: [ANY.price, ...priceBands.map((band) => band.label)],
      developers: [
        ANY.developer,
        ...unique(properties.map((p) => p.developer)),
      ],
      bedrooms: [ANY.bedrooms, ...unique(properties.map((p) => p.bedrooms))],
      statuses: [ANY.status, ...unique(properties.map((p) => p.status))],
    }),
    [],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const band = priceBands.find((entry) => entry.label === price);

    return properties.filter((property) => {
      const haystack =
        `${property.name} ${property.location} ${property.developer} ${property.type}`.toLowerCase();

      if (needle && !haystack.includes(needle)) return false;
      if (type !== ANY.type && property.type !== type) return false;
      if (purpose !== ANY.purpose && property.purpose !== purpose) return false;
      if (location !== ANY.location && property.location !== location)
        return false;
      if (developer !== ANY.developer && property.developer !== developer)
        return false;
      if (bedrooms !== ANY.bedrooms && property.bedrooms !== bedrooms)
        return false;
      if (status !== ANY.status && property.status !== status) return false;
      if (band && !(property.priceValue >= band.min && property.priceValue < band.max))
        return false;
      if (savedOnly && !favorites.includes(property.id)) return false;

      return true;
    });
  }, [
    query,
    type,
    purpose,
    location,
    price,
    developer,
    bedrooms,
    status,
    savedOnly,
    favorites,
  ]);

  const isFiltered =
    query !== '' ||
    type !== ANY.type ||
    purpose !== ANY.purpose ||
    location !== ANY.location ||
    price !== ANY.price ||
    developer !== ANY.developer ||
    bedrooms !== ANY.bedrooms ||
    status !== ANY.status ||
    savedOnly;

  function clearFilters() {
    setQuery('');
    setType(ANY.type);
    setPurpose(ANY.purpose);
    setLocation(ANY.location);
    setPrice(ANY.price);
    setDeveloper(ANY.developer);
    setBedrooms(ANY.bedrooms);
    setStatus(ANY.status);
    setSavedOnly(false);
  }

  return (
    <Shell>
      <main id="main" className="pt-28">
        <section className="bg-[#183634] px-5 py-20 text-[#eee9df] lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <SectionLabel light>Property discovery</SectionLabel>
            <h1 className="display-font mt-6 max-w-3xl text-6xl leading-[.95] sm:text-8xl">
              Find the <em className="text-[#d6a365]">Right</em> Property.
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/65">
              Selected opportunities across Pakistan, presented with the
              information available to GRID.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-12 lg:px-10 lg:py-20">
          {SHOW_SAMPLE_NOTICE && (
            <p
              data-testid="notice-sample-listings"
              className="mb-8 border-l-2 border-[#a26e3e] bg-[#f3e8d8] px-5 py-4 text-xs leading-6 text-[#183634]/75"
            >
              <b>Sample listings.</b> The properties below are placeholders used
              to demonstrate search, filtering and detail pages. Replace them in{' '}
              <code className="font-mono">src/content/site.ts</code> and set{' '}
              <code className="font-mono">SHOW_SAMPLE_NOTICE</code> to{' '}
              <code className="font-mono">false</code> before launch.
            </p>
          )}

          <div className="grid gap-3 border-y border-[#183634]/20 py-5 md:grid-cols-2 xl:grid-cols-[1.8fr_repeat(6,1fr)_auto]">
            <label className="flex items-center gap-3 border-b border-[#183634]/20 pb-3 xl:border-0 xl:pb-0">
              <Search size={16} className="text-[#a26e3e]" />
              <span className="sr-only">Search properties</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                data-testid="input-property-search"
                placeholder="Search by name, location or developer"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#183634]/45"
              />
            </label>
            <FilterSelect
              label="Property type"
              value={type}
              onChange={setType}
              options={options.types}
              testId="select-property-type"
            />
            <FilterSelect
              label="Purpose"
              value={purpose}
              onChange={setPurpose}
              options={options.purposes}
              testId="select-property-purpose"
            />
            <FilterSelect
              label="Location"
              value={location}
              onChange={setLocation}
              options={options.locations}
              testId="select-property-location"
            />
            <FilterSelect
              label="Price range"
              value={price}
              onChange={setPrice}
              options={options.prices}
              testId="select-property-price"
            />
            <FilterSelect
              label="Developer"
              value={developer}
              onChange={setDeveloper}
              options={options.developers}
              testId="select-property-developer"
            />
            <FilterSelect
              label="Bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
              options={options.bedrooms}
              testId="select-property-bedrooms"
            />
            <button
              type="button"
              data-testid="button-clear-filters"
              disabled={!isFiltered}
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 border border-[#183634]/25 px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] hover:border-[#a26e3e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear <X size={14} />
            </button>
          </div>

          <div className="mb-8 mt-10 flex flex-wrap items-center justify-between gap-4">
            <p data-testid="text-property-count" className="eyebrow text-[#a26e3e]">
              {filtered.length} listing{filtered.length === 1 ? '' : 's'} shown
            </p>
            <div className="flex items-center gap-4">
              <FilterSelect
                label="Status"
                value={status}
                onChange={setStatus}
                options={options.statuses}
                testId="select-property-status"
              />
              <button
                type="button"
                data-testid="button-saved-only"
                aria-pressed={savedOnly}
                onClick={() => setSavedOnly(!savedOnly)}
                className={`flex items-center gap-2 border px-4 py-2 text-[10px] font-bold uppercase tracking-[.12em] transition-colors ${
                  savedOnly
                    ? 'border-[#a26e3e] bg-[#a26e3e] text-[#eee9df]'
                    : 'border-[#183634]/25 hover:border-[#a26e3e]'
                }`}
              >
                <Heart size={13} fill={savedOnly ? 'currentColor' : 'none'} />
                Saved ({favorites.length})
              </button>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  favorite={favorites.includes(property.id)}
                  onFavorite={() => toggle(property.id)}
                />
              ))}
            </div>
          ) : (
            <div
              data-testid="empty-properties"
              className="border border-dashed border-[#183634]/30 px-6 py-24 text-center"
            >
              <Compass className="mx-auto text-[#a26e3e]" size={26} />
              <h2 className="display-font mt-5 text-4xl">
                No properties match this search.
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-[#183634]/55">
                Try clearing a filter, or tell us what you are looking for and
                we will come back with options.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  data-testid="button-empty-clear"
                  className="border border-[#183634]/30 px-5 py-3 text-[10px] font-bold uppercase tracking-[.13em] hover:border-[#a26e3e]"
                >
                  Clear filters
                </button>
                <Link
                  href="/contact"
                  className="bg-[#d6a365] px-5 py-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#183634]"
                >
                  Talk to an advisor
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </Shell>
  );
}
