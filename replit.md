# GRID Property Advisors

Premium property advisory website for discovering, evaluating, and inquiring about selected real estate opportunities across Pakistan.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/grid-property-advisors/src/App.tsx` — routed website experience, local property dataset, filters, galleries, and inquiry flows
- `artifacts/grid-property-advisors/src/index.css` — GRID visual system, typography, responsive utilities, and motion
- `artifacts/grid-property-advisors/index.html` — base SEO metadata and document shell
- `artifacts/grid-property-advisors/public/` — favicon and crawler metadata

## Architecture decisions

- The first release is frontend-only so inquiries remain honest: forms validate locally and explicitly state that no message has been sent without a backend or CRM connection.
- Missing source listings, brand assets, social URLs, legal text, and contact details are represented as editable placeholders rather than invented business information.
- Wouter provides client-side routes for the public site and the site uses local property data until approved listing data is connected.

## Product

The site presents GRID’s advisory positioning, services, Emaar Pakistan relationship, investment philosophy, PM Home Financing guidance, property discovery/filtering, property detail galleries, and validated inquiry paths.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
