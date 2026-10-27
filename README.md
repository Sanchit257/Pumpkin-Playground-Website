# Pumpkin Playground

Event site for **Pumpkin Playground**, a month-long, open-ended project sprint hosted by ACM at CSULB. Members build a project of their choice, submit it on [Devpost](https://pumpkin-playground.devpost.com), and vote on submissions.

Single-page React app: Hero, About, Inspiration, Schedule, FAQ, Footer.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`; design tokens in `src/index.css` `@theme`)
- Oxlint
- Vercel hosting, deployed from GitHub Actions

## Getting started

Requires Node 22 (see `.nvmrc`).

```sh
nvm use
npm ci
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |
| `npm run typecheck` | Run `tsc -b` |

## Project layout

```
src/
  content.ts      All site copy, links, schedule, FAQ
  App.tsx         Page section order
  components/     One file per section (Hero, About, Schedule, ...)
  index.css       Tailwind import + theme tokens + font faces
public/
  images/         Flyer, logos, OG image (WebP)
  fonts/          Self-hosted Miltonian Tattoo + Josefin Sans (OFL)
docs/
  figma-handoff.md          Values pulled from the Figma design
  superpowers/specs, plans  Design spec and build plan
```

## Editing content

All copy lives in `src/content.ts`, so most updates need no component changes:

- `SIGNUP_URL`, `DEVPOST_URL`, `ACM_URL`: external links.
- `about.cards`, `schedule`, `faq`, `navLinks`, `footerLinks`: lists rendered by their sections.
- An About card with an empty `body`, an FAQ entry with an empty question or answer, and a footer link with an empty `href` are hidden, so placeholders can stay until the copy is ready.

Page title, description, and Open Graph tags are in `index.html`.

## CI and deploys

- **`ci.yml`**: on every PR and push to `main`, runs lint, typecheck, and build. For PRs from this repo it deploys a Vercel preview and comments the URL on the PR.
- **`deploy-production.yml`**: on push to `main`, runs the same checks and deploys to Vercel production.

Deploy jobs need the repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. Without them, deploys are skipped and the checks still run.
