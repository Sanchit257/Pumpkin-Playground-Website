# Pumpkin Playground — Event Site Design

- **Date:** 2026-10-27
- **Status:** Approved by user (brainstorming session, pm pane)
- **Owner:** ACM at CSULB, Fall 2026
- **Repo:** github.com/WinstonTa/Pumpkin-Playground-Website (branch `main`)
- **Figma:** https://www.figma.com/design/GHOGFCB9OK42PCbFbEFkey/Pumpkin-Playground--ACM-Fall2026-?node-id=0-1 (file key `GHOGFCB9OK42PCbFbEFkey`)

## 1. Goal and timing

One-page event site whose job is to get CSULB students to sign up (Google Form) and submit on Devpost.

The event is already live: it started Oct 10, submissions close **Thursday Nov 5, 11:59 PM**, community voting Nov 6–8, then an award ceremony. Today is Oct 27. **Ship ASAP (target 2–3 days), polish after.** After Nov 5 the site still serves voting + ceremony info.

## 2. Stack (fixed)

- Vite + React 19 + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite` plugin, `@theme` tokens in CSS).
- npm, Node 22 LTS (`.nvmrc` + `engines`).
- No backend, no router, no CMS. Static build in `dist/`.
- Hosting: Vercel, team `acm-beach-hacks`, project `pumpkin-playground`.

## 3. Figma map

All frames live in section `1:63` "Desktop Layout" (1440 wide artboards). Mobile frame `1:5` is **empty**; no tablet frame. Responsive layouts below are designed in this spec, not in Figma.

| Site section | Figma frame | Notes |
|---|---|---|
| Navbar | `6:6` (repeated in every frame) | Pill bar: pumpkin icon + "Pumpkin Playground" wordmark, divider, About / Project Inspiration / Schedule / FAQ, "Devpost" at right (`8:265`) |
| Hero | `1:3` "Home (Landing Page)" | Title `7:31`, subtitle `7:34`, CTA `13:37`, flyer image `1:69`, decorative pumpkin `13:36`, leaves `13:45` |
| About | `7:38` | Heading, intro `8:81`, 3 cards `8:89` / `8:90` / `8:96` |
| Project Inspiration | `8:102` | Heading, body `12:5` |
| Schedule | `8:133` | 4 rows (`12:10`, `74:47`, `74:53`, `74:59`) |
| FAQ | `8:164` | Heading left, 5 rows right (`8:177`…`8:246`) |
| Footer | `8:195` → bar `8:208` | Wordmark, "by" ACM logo `8:252`, links Devpost / Instagram / Discord / LinkedIn |
| Palette | `1:67` | 8 swatches: cream, peach, 3 oranges, 3 browns. **No Figma variables exist**; hex values must be read from nodes. |

The Figma artboards are 1024 tall; that is artboard size, **not** a min-height rule. Sections size to content.

## 4. Architecture

```
src/
  main.tsx
  App.tsx            # renders sections in order
  index.css          # @import "tailwindcss"; @theme tokens (colors, fonts)
  content.ts         # ALL copy + URLs, typed
  components/
    Navbar.tsx
    Hero.tsx
    About.tsx
    Inspiration.tsx
    Schedule.tsx
    Faq.tsx
    Footer.tsx
    NumberBadge.tsx  # circled "01" badge shared by About / Schedule / FAQ
public/
  images/            # WebP exports from Figma
  favicon (pumpkin)
```

- Every component reads copy from `content.ts`; no copy hard-coded in JSX.
- **Hide-empty rule:** an item with an empty required field (card body, FAQ answer, link URL) is not rendered. A list whose items are all hidden hides its container. Exception: the **FAQ section** (and its navbar/mobile-menu link) is hidden entirely when it has zero visible items. All other sections always render (they have real copy).
- Colors and fonts are Tailwind `@theme` tokens named after their role (e.g. `--color-cream`, `--color-brown-dark`); components never use raw hex.
- Fonts: whatever the Figma text nodes use. Frontend confirms font family names via Figma `get_design_context`; load via Google Fonts if available there, else self-host. Do not substitute guesses.

## 5. Layout and responsive behavior

Breakpoints (Tailwind defaults): **mobile < 768px**, **tablet 768–1023px** (`md`), **desktop ≥ 1024px** (`lg`). Desktop matches Figma; mobile/tablet follow the rules below.

### Navbar
- Sticky at top on all sizes. Section links are in-page anchors: `#about`, `#inspiration`, `#schedule`, `#faq`; smooth scroll; sections have `scroll-margin-top` ≥ navbar height.
- Desktop/tablet: as Figma.
- Mobile: logo + wordmark + hamburger button. Button has `aria-expanded`, `aria-controls`, accessible label. Menu lists About, Project Inspiration, Schedule, FAQ, Devpost. Closes on Esc, on link click, and on outside click. Focus moves into the menu when opened and returns to the button when closed via Esc.

### Hero
- Desktop: text column left (title "Pumpkin" orange / "Playground" brown, subtitle, CTA), flyer image right, decorative pumpkin bottom-left, leaves right edge — per Figma `1:3`.
- Mobile: stacked — title, subtitle, CTA, then flyer. **CTA fully visible without scrolling at 375×667.**
- CTA is the most prominent interactive element on the page (largest button, brown fill per Figma).

### About
- Heading + intro paragraph, then 3 cards: 3 columns desktop, 1 column mobile (tablet: 1 or 3, whichever avoids text overflow).

### Project Inspiration
- Heading + paragraph; paragraph max line length readable on desktop (Figma width ~1246px is fine at 1440).

### Schedule
- Vertical list of 4 rows, full width up to Figma width (~950px). Badges numbered 01–04.

### FAQ
- Desktop: heading left, accordion list right (Figma `8:164`). Mobile: stacked.
- Each item is a `<button aria-expanded aria-controls>` toggling an answer region. Multiple can be open.

### Footer
- Brown bar per Figma: wordmark, "by" + ACM logo, link list. Mobile: wraps/stacks centered.

### Decorations
- Pumpkins, leaves: `alt=""`, `aria-hidden`, may shrink or hide on mobile; must never cause horizontal scroll or overlap text.

## 6. Content (`content.ts`)

Source of truth: Figma text, the event flyer, and the user. **Nothing invented.**

| Key | Value |
|---|---|
| Sign-up URL (hero CTA only) | `https://docs.google.com/forms/d/e/1FAIpQLScZSl2-FxtG2NfeamI6Y66CkE2i5l2mK9HaxBdjVd57IjkAag/viewform?usp=dialog` — user-provided 2026-10-27 |
| Devpost URL (nav "Devpost", footer "Devpost") | `https://pumpkin-playground.devpost.com` — external links open in new tab with `rel="noopener noreferrer"` |
| Hero title | "Pumpkin" / "Playground" |
| Hero subtitle | "Join the Playground!" (kept as Figma, user decision) |
| CTA label | "Join the Playground" |
| About intro | "Pumpkin Playground is a month-long, open-ended project sprint hosted by CSULB ACM, encouraging members to build projects of their choice, share their work, and vote on submissions." |
| About cards | Titles "General", "Most Useful", "Fall Theme"; **bodies empty → cards hidden** until filled |
| Project Inspiration body | Verbatim Figma `12:5`: "Pumpkin Playground was created with the intention of creating an environment where the creativity of anyone inexperienced within the field of Computer Science could allow their creativity to run wild. This project encourages newer programmers to explore their interests, experiment with new technologies, and share what they build without the pressure of a short time frame that a traditional hackathon creates. By encouraging collaboration, creativity, and learning through their own hands on project, we hope to help more inexperienced students discover what they’re capable of creating." |
| Schedule 01 | "First Day" — "Pumpkin Playground begins on October 10th." |
| Schedule 02 | "Final Day of Submission" — "Submissions due Thursday, Nov. 5th at 11:59 PM on Devpost." (fixes Figma copy bug "begins on Nov. 5th"; user approved) |
| Schedule 03 | "Voting Period" — "Community Vote takes place from Nov 6th-8th" |
| Schedule 04 | "Award Ceremony" — "Prizes will be handed out - Location TBD" |
| FAQ | 5 slots, **all empty → hidden** until Q + A both filled. Known intended questions (from Figma notes): when is judging, last day of submission, who's judging — answers not yet provided. |
| Footer links | Devpost (URL above); Instagram, Discord, LinkedIn: **URL empty → hidden**. Label typo "Instragram" fixed to "Instagram". |
| ACM logo link | URL empty → logo rendered unlinked |
| Page meta | `<title>Pumpkin Playground · ACM at CSULB</title>`, meta description from About intro, OG image = flyer, `lang="en"`, pumpkin favicon |

Filling content later = edit `content.ts` only, one PR.

## 7. Accessibility

- Landmarks: `<header>` (navbar), `<main>`, `<section aria-labelledby>` per section, `<footer>`. Exactly one `<h1>` (hero title); section headings `<h2>`.
- Visible focus indicator on every interactive element. Logical tab order follows visual order.
- WCAG 2.1 AA contrast: 4.5:1 normal text, 3:1 large text (≥24px, or ≥18.66px bold).
- **Contrast decision (user approved):** if a Figma text color fails AA on its background (likely the bright orange headings on cream), frontend shifts **that text** to the nearest palette color that passes. Decorative / non-text uses keep the Figma color.
- `prefers-reduced-motion`: disable smooth scroll.
- All informational images have meaningful `alt` (flyer alt includes the date and "submit on Devpost"); decorative images `alt=""`.

## 8. Quality gates

- npm scripts: `dev`, `build`, `preview`, `lint` (ESLint flat config from Vite template), `typecheck` (`tsc -b --noEmit` or equivalent).
- CI (GitHub Actions) on pull requests and pushes to `main`: `npm ci` → `lint` → `typecheck` → `build`. No unit test suite (no logic beyond hide-empty filtering).
- Lighthouse (mobile preset, against preview URL): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- No horizontal scroll at 320, 375, 768, 1024, 1440 widths.

## 9. Deploy

**Constraint (user):** the user is a collaborator, not the repo owner, and CI/CD must ship without any action from the owner (WinstonTa). Therefore the Vercel GitHub App / Git integration is **not used** (installing it on a personal-account repo requires the owner).

**Approach: GitHub Actions deploys via Vercel CLI + repo secrets.**

Verified 2026-10-27 for GitHub account `Ben2104`: push access (not admin), token scopes include `repo` + `workflow`, `main` unprotected, repo Actions secrets API reachable (public-key read OK). `gh secret set` not yet exercised — first write is the real proof.

Vercel target: team **ACM-BeachHacks**, slug `acm-beach-hacks`, Team ID `team_QSOsa5Izvmxpjjc7Rg5zAkgs` (read from dashboard screenshot; verify against `.vercel/project.json` `orgId`), plan Hobby, member account `sponsorship-9917`. Local Vercel CLI is currently logged in as `ben2104`, which is **not** in this team.

Setup:
1. Token: created in the `sponsorship-9917` Vercel account (Account Settings → Tokens), scope **ACM-BeachHacks**, expiry ≥ end of event (after Nov 30, 2026). The user creates it; agents never see it in chat or logs.
2. Link: `vercel link --scope acm-beach-hacks --project pumpkin-playground` (run while CLI is logged in as `sponsorship-9917` or with `--token`). Produces `.vercel/project.json` (`orgId`, `projectId`). `.vercel/` is gitignored.
3. Secrets on `WinstonTa/Pumpkin-Playground-Website` via `gh secret set`: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Token value piped from the user's clipboard/stdin, never echoed.
4. Vercel project Git connection stays **off** (no double deploys).

Flow:
- **PR → `main`** (same-repo branches): CI checks, then `vercel pull --environment=preview` → `vercel build` → `vercel deploy --prebuilt`; preview URL posted/updated as a PR comment.
- **Push to `main`**: CI checks, then `vercel pull --environment=production` → `vercel build --prod` → `vercel deploy --prebuilt --prod`.
- Deploy jobs `needs:` the check job; a failed check never deploys.
- Fork PRs get no secrets → checks run, deploy job skipped (not failed).

Limits the user accepts: the repo owner can see secret names and can delete secrets/workflows at any time; Actions minutes are free for public repos.

**Every `git push`, PR merge to `main`, `gh secret set`, and production deploy requires the user's explicit yes.**

## 10. Out of scope

Countdown timer, animations beyond hover/focus states, analytics, dark mode, CMS, i18n, contact form, separate tablet/mobile Figma design work.

## 11. Open items (do not block ship)

- About card bodies, FAQ Q&A, award ceremony location, Instagram/Discord/LinkedIn URLs, ACM link URL — owner: user / ACM officers, via `content.ts` PR.
