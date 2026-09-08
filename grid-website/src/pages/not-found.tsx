import { ButtonLink, Shell } from '@/components/layout';

export function NotFound() {
  return (
    <Shell>
      <main
        id="main"
        className="flex min-h-[70vh] items-center justify-center px-5 pt-28 text-center"
      >
        <div>
          <p className="eyebrow text-[#a26e3e]">404 / Page not found</p>
          <h1 className="display-font mt-5 text-7xl">
            A different
            <br />
            <em>direction.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#183634]/60">
            The page you were looking for isn't here. Try the property listings
            or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Return home</ButtonLink>
            <ButtonLink href="/properties">Browse properties</ButtonLink>
          </div>
        </div>
      </main>
    </Shell>
  );
}
