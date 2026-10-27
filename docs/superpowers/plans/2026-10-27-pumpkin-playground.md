# Pumpkin Playground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use **superpowers:executing-plans — inline execution in your own pane**. Do NOT use superpowers:subagent-driven-development and do NOT spawn subagents. Execute only your section's tasks, in order, checking off `- [ ]` steps. See "Required skills per worker" below.

**Goal:** Ship the one-page Pumpkin Playground event site (ACM at CSULB, Fall 2026) to Vercel production ASAP, with CI checks and per-PR preview deploys, without any action from the GitHub repo owner.

**Architecture:** Static Vite + React + TS single page; all copy in `src/content.ts`, one component per section, Tailwind v4 `@theme` tokens from the Figma palette. GitHub Actions runs lint/typecheck/build on PRs and `main`, then deploys with the Vercel CLI using repo secrets (no Vercel GitHub app).

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), ESLint (Vite template), npm, Node 22, GitHub Actions, Vercel CLI.

**Spec:** `/Users/kaydee/Developer/Pumpkin-Playground-Website/docs/superpowers/specs/2026-10-27-pumpkin-playground-design.md` — read it first; it is the source of truth for copy, layout and decisions.

## Global Constraints

- Repo: `/Users/kaydee/Developer/Pumpkin-Playground-Website`, remote `github.com/WinstonTa/Pumpkin-Playground-Website`, default branch `main`. User account `Ben2104` has push, **not admin**. Nothing in this plan may require the repo owner.
- Figma file key `GHOGFCB9OK42PCbFbEFkey`; frames: Hero `1:3`, About `7:38`, Inspiration `8:102`, Schedule `8:133`, FAQ `8:164`, Footer `8:195`/`8:208`, Navbar `6:6`, Palette `1:67`. Mobile frame is empty — responsive rules come from the spec §5.
- Sign-up URL (hero CTA "Join the Playground" only): `https://docs.google.com/forms/d/e/1FAIpQLScZSl2-FxtG2NfeamI6Y66CkE2i5l2mK9HaxBdjVd57IjkAag/viewform?usp=dialog`
- Devpost URL (nav "Devpost", footer "Devpost" only — not the CTA): `https://pumpkin-playground.devpost.com`
- **Never invent event facts.** Copy comes only from spec §6. Empty fields are hidden, never rendered as lorem ipsum or "TBD" placeholders (exception: "Location TBD" is real Figma copy in Schedule 04).
- Breakpoints: mobile `< 768px`, tablet `768–1023px` (`md:`), desktop `≥ 1024px` (`lg:`).
- WCAG 2.1 AA. If a Figma text color fails contrast, shift **that text only** to the nearest palette color that passes.
- Node 22 (`.nvmrc` = `22`), npm only (commit `package-lock.json`).
- Vercel team slug `acm-beach-hacks`, Team ID `team_QSOsa5Izvmxpjjc7Rg5zAkgs` (verify), project `pumpkin-playground`, Vercel account `sponsorship-9917`.
- **Shared checkout on `main`.** Workers commit locally with explicit paths (`git add <paths>`, never `git add -A` / `.`). Never `git checkout`/`switch` branches in the shared checkout. If `index.lock` exists, wait 5 s and retry.
- **Needs the user's explicit yes, every time:** `git push`, `gh secret set`, `gh pr merge`, any production deploy, any Vercel project setting change. Agents never print, log, or commit the Vercel token.
- Out of scope: countdown, animations beyond hover/focus, analytics, dark mode, CMS, unit test suite.

## Required skills per worker (inline, mandatory)

Every worker loads these **before its first task** and follows them exactly. Load by your agent's skill tool if it lists the skill; otherwise read the `SKILL.md` file at the absolute path below and follow it as instructions.

`SP=/Users/kaydee/.claude/plugins/cache/claude-plugins-official/superpowers/6.2.0/skills`

| Skill | Path | Who | When |
|---|---|---|---|
| superpowers:executing-plans | `$SP/executing-plans/SKILL.md` | frontend, devops, qa | start of work; drives task-by-task inline execution (**inline only — ignore its subagent suggestion**) |
| superpowers:verification-before-completion | `$SP/verification-before-completion/SKILL.md` | frontend, devops, qa | before marking any task done or sending any "done"/PASS message: run the AC commands, paste evidence |
| superpowers:systematic-debugging | `$SP/systematic-debugging/SKILL.md` | frontend, devops | any failing command, CI job, or deploy — root cause before fix, no guess-patching |
| superpowers:requesting-code-review | `$SP/requesting-code-review/SKILL.md` | frontend (after F9), devops (after D2) | self-review your diff against this plan's ACs before handing off (inline review, no subagent) |
| superpowers:receiving-code-review | `$SP/receiving-code-review/SKILL.md` | frontend, devops | when qa reports FAIL items — verify each before changing code |
| figma:figma-design-to-code | `/Users/kaydee/.claude/plugins/cache/claude-plugins-official/figma/2.2.81/skills/figma-design-to-code/SKILL.md` | frontend | before any `get_design_context` call (F2, F4–F8) |

Agent notes (checked 2026-10-27):
- **devops (Codex):** `~/.agents/skills/` already has executing-plans, verification-before-completion, systematic-debugging, requesting-code-review; use those or the paths above.
- **frontend (Cursor):** `~/.cursor/skills/` has **no** superpowers skills → read the `SKILL.md` files at the paths above directly.
- **qa (Claude Code):** use the `Skill` tool (`superpowers:executing-plans`, `superpowers:verification-before-completion`).

First line of every worker's first report to lead: `skills loaded: <list>`.

## Workers, ordering, dependencies

| ID | Owner | Task | Depends on |
|---|---|---|---|
| F1 | frontend | Scaffold Vite + React + TS + Tailwind | — |
| D1 | devops (+ user) | Vercel link, preview protection, repo secrets | — (parallel with F1) |
| D2 | devops | CI + deploy workflow | F1 committed |
| F2 | frontend | Design tokens, fonts, assets | F1 |
| F3 | frontend | `content.ts` + `NumberBadge` + `App` skeleton | F1 |
| D3 | devops (+ user yes) | Push branch `site-v1`, open PR, prove preview | D1, D2 |
| F4 | frontend | Navbar (sticky + mobile hamburger) | F2, F3 |
| F5 | frontend | Hero | F2, F3 |
| F6 | frontend | About + Project Inspiration | F2, F3 |
| F7 | frontend | Schedule + FAQ | F2, F3 |
| F8 | frontend | Footer + page meta + favicon | F2, F3 |
| F9 | frontend | Responsive/a11y/perf pass | F4–F8 |
| D4 | devops (+ user yes) | Push final commits to `site-v1` → fresh preview | F9 |
| Q1 | qa | Full checklist on preview URL | D4 |
| D5 | devops (+ user yes) | Merge PR → production deploy | Q1 PASS (or user waiver) |
| Q2 | qa | Production smoke + SEO Lighthouse | D5 |

Parallelism: F1 ∥ D1. After F1: D2 ∥ F2 ∥ F3. After D2+D1: D3 (pipeline smoke on the scaffold, early, so CI/CD problems surface on day 1). F4–F8 can run in any order (one frontend agent → sequential). Fix loop: Q1 FAIL items → frontend/devops fix → D4 → Q1 re-run of failed IDs only.

Reporting: every worker reports **completed task IDs with AC evidence** or **blockers** to `lead-engineer` via `hc send lead-engineer "..."`. No progress chatter.

---

# Section A — frontend (Cursor agent)

### Task F1: Scaffold

**Files:**
- Delete: `index.html` (placeholder "Hello World") — replaced by Vite's
- Create: Vite react-ts template files at repo root (`package.json`, `package-lock.json`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `src/*`, `public/*`, `.gitignore`), `.nvmrc`
- Do NOT touch: `docs/`

**Produces:** npm scripts `dev`, `build`, `preview`, `lint`, `typecheck`; Tailwind wired via `src/index.css`.

- [x] **Step 1: Scaffold in a temp dir and copy in** (create-vite prompts on a non-empty dir)

```bash
REPO=/Users/kaydee/Developer/Pumpkin-Playground-Website
TMP=$(mktemp -d)
cd "$TMP" && npm create vite@latest app -- --template react-ts
rsync -a "$TMP/app/" "$REPO/"      # overwrites placeholder index.html; .git and docs/ untouched
cd "$REPO" && echo 22 > .nvmrc && npm install
npm install -D tailwindcss @tailwindcss/vite
```

- [x] **Step 2: Wire Tailwind** — `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace `src/index.css` entirely with:

```css
@import "tailwindcss";
```

Delete `src/App.css`, `src/assets/react.svg`, `public/vite.svg`; replace `src/App.tsx` with:

```tsx
export default function App() {
  return <main className="p-8 text-3xl font-bold">Pumpkin Playground</main>
}
```

- [x] **Step 3: Scripts, engines, gitignore** — in `package.json` add `"typecheck": "tsc -b"` to `scripts` and `"engines": { "node": ">=22" }`. Append to `.gitignore`:

```
.vercel
.env*
```

- [x] **Step 4: Verify**

```bash
npm run lint && npm run typecheck && npm run build && ls dist/index.html
npm run dev   # open http://localhost:5173 — big bold "Pumpkin Playground"
```

- [x] **Step 5: Commit**

```bash
git add -A -- . ':!docs'   # only scaffold files; docs/ is pm's
git status --short          # confirm no docs/ staged
git commit -m "chore: scaffold Vite + React + TS + Tailwind v4"
```

**Acceptance criteria:**
- **F1.1** `npm ci && npm run lint && npm run typecheck && npm run build` exits 0 from a clean clone.
- **F1.2** `package.json` has scripts `dev`, `build`, `preview`, `lint`, `typecheck`; `engines.node` `>=22`; `.nvmrc` contains `22`.
- **F1.3** A Tailwind utility class visibly applies in `npm run dev` (bold 3xl heading).
- **F1.4** `.gitignore` contains `.vercel` and `.env*`; placeholder "Hello World" is gone.
- **F1.5** After F1, tell devops: `hc send devops "F1 done: package.json scripts lint/typecheck/build exist, .nvmrc=22, committed on main"`.

---

### Task F2: Design tokens, fonts, assets

**Files:**
- Modify: `src/index.css`, `index.html` (font `<link>`s)
- Create: `public/images/*.webp`

**Produces:** Tailwind color utilities `bg-cream`, `text-brown-dark`, etc. and font utilities `font-display`, `font-body` (exact names below are fixed; hex/font values come from Figma).

- [ ] **Step 1: Pull exact values from Figma.** Load the `figma:figma-design-to-code` skill, then call `get_design_context` (file `GHOGFCB9OK42PCbFbEFkey`) on `1:3` (hero), `7:38` (about), `8:195` (footer), and `get_metadata`/`get_design_context` on palette `1:67`. Record the 8 palette hex values and every font family + weight used for: hero title, section headings, body text, nav links, CTA label, card titles.

- [ ] **Step 2: Write tokens** in `src/index.css` using these role names (fill hex from Step 1; palette order in Figma left→right, top→bottom):

```css
@import "tailwindcss";

@theme {
  --color-cream: #……;        /* page background, swatch 1 */
  --color-peach: #……;        /* swatch 2 */
  --color-orange-soft: #……;  /* swatch 3 */
  --color-orange-burnt: #……; /* swatch 4 */
  --color-rust: #……;         /* swatch 5 */
  --color-orange: #……;       /* swatch 6 */
  --color-orange-bright: #……;/* swatch 7, hero "Pumpkin" */
  --color-brown-dark: #……;   /* swatch 8, CTA fill, footer bar */
  --color-card: #……;         /* About/Schedule/FAQ card fill, from node 8:82 */

  --font-display: "<Figma heading font>", serif;
  --font-body: "<Figma body font>", sans-serif;
}

html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body { @apply bg-cream font-body text-brown-dark; }
```

The `#……` and `<Figma … font>` slots are **values you copy from Figma in Step 1**, not choices. If a font is not on Google Fonts, self-host the `.woff2` under `public/fonts/` with `@font-face` + `font-display: swap`.

- [ ] **Step 3: Load fonts** in `index.html` `<head>` (Google Fonts case): two `preconnect` links (`https://fonts.googleapis.com`, `https://fonts.gstatic.com` crossorigin) + one stylesheet link with only the weights used and `&display=swap`.

- [ ] **Step 4: Export images** with Figma `download_assets` (or the asset URLs returned by `get_design_context`), convert to WebP (`npx @squoosh/cli` or `cwebp -q 80`), save as:

| Figma node | File | Notes |
|---|---|---|
| `1:69` flyer | `public/images/flyer.webp` | export @2x, ≤ 250 KB |
| `13:36` pumpkin | `public/images/pumpkin.webp` | reused in all sections |
| `13:45` dry leaves | `public/images/leaves.webp` | |
| `4:89` nav pumpkin icon | `public/images/pumpkin-icon.svg` or `.webp` | also favicon source |
| `8:252` ACM logo | `public/images/acm-logo.webp` | |

Also keep a 1200×630 crop/pad of the flyer as `public/images/og.png` for Open Graph.

- [ ] **Step 5: Verify** — temporarily render `<h1 className="font-display text-orange-bright">Pumpkin</h1>` in `App.tsx`, `npm run dev`, compare against Figma `1:3` title: same font, same color. Revert the temp line. `npm run build` passes.

- [ ] **Step 6: Commit**

```bash
git add src/index.css index.html public/images
git commit -m "feat: add Figma palette tokens, fonts, and image assets"
```

**Acceptance criteria:**
- **F2.1** `src/index.css` `@theme` defines all 9 color tokens above; each hex equals the Figma node fill (QA spot-checks 3).
- **F2.2** `--font-display` / `--font-body` match the Figma font families; fonts load with `display=swap` (no FOIT in DevTools).
- **F2.3** All 5 images exist under `public/images/` in WebP (icon may be SVG); `flyer.webp` ≤ 250 KB; total `public/images` ≤ 600 KB.
- **F2.4** No raw hex values in any `.tsx` file (`grep -rE '#[0-9a-fA-F]{3,6}' src --include=*.tsx` returns nothing).

---

### Task F3: `content.ts`, `NumberBadge`, App skeleton

**Files:**
- Create: `src/content.ts`, `src/components/NumberBadge.tsx`
- Modify: `src/App.tsx`

**Produces (exact exports, later tasks import these):**
- `SIGNUP_URL: string`, `DEVPOST_URL: string`, `ACM_URL: string`
- `hero: { titleTop: string; titleBottom: string; subtitle: string; cta: string }`
- `about: { intro: string; cards: Card[] }`, `visibleCards: Card[]`
- `inspiration: string`
- `schedule: ScheduleItem[]`
- `faq: FaqItem[]`, `visibleFaq: FaqItem[]`
- `navLinks: NavLink[]` (FAQ omitted when `visibleFaq` is empty)
- `footerLinks: NavLink[]`, `visibleFooterLinks: NavLink[]`
- `NumberBadge({ n }: { n: number })` renders zero-padded `01`, `02`…

- [ ] **Step 1: Write `src/content.ts`** — copy verbatim:

```ts
// All site copy. Empty strings = not provided yet → item is hidden (spec §4 hide-empty rule).
export type Card = { title: string; body: string }
export type ScheduleItem = { title: string; body: string }
export type FaqItem = { question: string; answer: string }
export type NavLink = { label: string; href: string }

export const SIGNUP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScZSl2-FxtG2NfeamI6Y66CkE2i5l2mK9HaxBdjVd57IjkAag/viewform?usp=dialog'
export const DEVPOST_URL = 'https://pumpkin-playground.devpost.com'
export const ACM_URL = ''

export const hero = {
  titleTop: 'Pumpkin',
  titleBottom: 'Playground',
  subtitle: 'Join the Playground!',
  cta: 'Join the Playground',
}

export const about = {
  intro:
    'Pumpkin Playground is a month-long, open-ended project sprint hosted by CSULB ACM, encouraging members to build projects of their choice, share their work, and vote on submissions.',
  cards: [
    { title: 'General', body: '' },
    { title: 'Most Useful', body: '' },
    { title: 'Fall Theme', body: '' },
  ] satisfies Card[],
}
export const visibleCards = about.cards.filter((c) => c.body)

export const inspiration =
  'Pumpkin Playground was created with the intention of creating an environment where the creativity of anyone inexperienced within the field of Computer Science could allow their creativity to run wild. This project encourages newer programmers to explore their interests, experiment with new technologies, and share what they build without the pressure of a short time frame that a traditional hackathon creates. By encouraging collaboration, creativity, and learning through their own hands on project, we hope to help more inexperienced students discover what they’re capable of creating.'

export const schedule: ScheduleItem[] = [
  { title: 'First Day', body: 'Pumpkin Playground begins on October 10th.' },
  { title: 'Final Day of Submission', body: 'Submissions due Thursday, Nov. 5th at 11:59 PM on Devpost.' },
  { title: 'Voting Period', body: 'Community Vote takes place from Nov 6th-8th' },
  { title: 'Award Ceremony', body: 'Prizes will be handed out - Location TBD' },
]

export const faq: FaqItem[] = [
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
]
export const visibleFaq = faq.filter((f) => f.question && f.answer)

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Project Inspiration', href: '#inspiration' },
  { label: 'Schedule', href: '#schedule' },
  ...(visibleFaq.length ? [{ label: 'FAQ', href: '#faq' }] : []),
]

export const footerLinks: NavLink[] = [
  { label: 'Devpost', href: DEVPOST_URL },
  { label: 'Instagram', href: '' },
  { label: 'Discord', href: '' },
  { label: 'LinkedIn', href: '' },
]
export const visibleFooterLinks = footerLinks.filter((l) => l.href)
```

- [ ] **Step 2: Write `src/components/NumberBadge.tsx`** (circled number from Figma `8:85`/`8:86`; style from Figma):

```tsx
export default function NumberBadge({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-brown-dark font-display text-lg md:size-[77px] md:text-2xl"
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}
```

- [ ] **Step 3: App skeleton** — `src/App.tsx` imports the section components (created in F4–F8) in order. Until each exists, keep it rendering only what exists; final form:

```tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Inspiration from './components/Inspiration'
import Schedule from './components/Schedule'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Inspiration />
        <Schedule />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Verify** `npm run lint && npm run typecheck && npm run build` pass.

- [ ] **Step 5: Commit** `git add src/content.ts src/components/NumberBadge.tsx src/App.tsx && git commit -m "feat: add content module and NumberBadge"`

**Acceptance criteria:**
- **F3.1** `src/content.ts` exports exactly the names in "Produces"; copy matches spec §6 character-for-character (QA diffs Schedule 02 and Inspiration).
- **F3.2** Setting one FAQ item's `question` + `answer` makes the FAQ nav link and section appear; clearing it hides both (QA toggles locally, then reverts).
- **F3.3** No section component contains hard-coded copy (all strings imported from `content.ts`), except `aria-label`s and alt text.

---

### Task F4: Navbar

**Files:** Create `src/components/Navbar.tsx`

**Consumes:** `navLinks`, `DEVPOST_URL` from `content.ts`.

**Design:** Figma `6:6` — pill bar (rounded-full, white/cream fill, shadow), pumpkin icon + two-line wordmark ("Pumpkin" orange-bright / "Playground" brown-dark), vertical divider, links, "Devpost" right-aligned. Sticky top with small top margin as in Figma.

- [ ] **Step 1: Implement** — behavior below is required; visual classes come from Figma:

```tsx
import { useEffect, useRef, useState } from 'react'
import { DEVPOST_URL, navLinks } from '../content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (!menuRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const links = [...navLinks, { label: 'Devpost', href: DEVPOST_URL }]
  const external = (href: string) =>
    href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-9">
      <nav aria-label="Main" className="relative mx-auto flex max-w-[1377px] items-center rounded-full bg-white px-6 py-3 shadow-md">
        <a href="#top" className="flex items-center gap-3">
          <img src="/images/pumpkin-icon.svg" alt="" width={47} height={47} />
          <span className="font-display leading-tight">
            <span className="block text-orange-bright">Pumpkin</span>
            <span className="block text-brown-dark">Playground</span>
          </span>
        </a>

        {/* md+: inline links */}
        <ul className="ml-6 hidden flex-1 items-center gap-10 border-l border-brown-dark pl-10 md:flex">
          {links.map((l) => (
            <li key={l.label} className={l.label === 'Devpost' ? 'ml-auto' : ''}>
              <a href={l.href} {...external(l.href)} className="font-semibold hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* < md: hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className="ml-auto grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
        {open && (
          <ul
            id="mobile-menu"
            ref={menuRef}
            className="absolute inset-x-0 top-full mt-2 flex flex-col rounded-3xl bg-white p-4 shadow-md md:hidden"
          >
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...external(l.href)}
                  className="block rounded-xl px-4 py-3 font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
```

Hero `<section>` gets `id="top"`. Every section gets `className="scroll-mt-32"` (≥ navbar height).

- [ ] **Step 2: Verify** in `npm run dev`: desktop 1440 matches Figma `6:6`; at 375 px only logo + hamburger show; Tab reaches hamburger, Enter opens, focus lands on "About", Esc closes and focus returns to button; clicking outside closes; clicking a link scrolls to the section with heading not hidden under the bar.

- [ ] **Step 3: Commit** `git add src/components/Navbar.tsx src/App.tsx && git commit -m "feat: add sticky navbar with mobile menu"`

**Acceptance criteria:**
- **F4.1** Navbar stays visible while scrolling at all widths.
- **F4.2** ≥ 768 px: About, Project Inspiration, Schedule, (FAQ only if visible), Devpost visible inline; matches Figma `6:6` layout.
- **F4.3** < 768 px: hamburger with `aria-expanded` (false→true), `aria-controls="mobile-menu"`, accessible name; opens menu listing the same links.
- **F4.4** Menu closes on Esc (focus returns to hamburger), on link click, and on outside click; on open, focus moves to first link.
- **F4.5** Anchor links scroll to sections; target heading fully visible below the sticky bar.
- **F4.6** Devpost link opens `https://pumpkin-playground.devpost.com` in a new tab with `rel="noopener noreferrer"`.

---

### Task F5: Hero

**Files:** Create `src/components/Hero.tsx`

**Consumes:** `hero`, `SIGNUP_URL`.

**Design:** Figma `1:3`. Desktop (`lg`): two columns — left: `<h1>` with "Pumpkin" (orange-bright) / "Playground" (brown-dark) in display font ~96–110 px; subtitle; CTA pill (brown-dark fill, cream text, ~380×94, shadow). Right: flyer image with drop shadow. Decorative pumpkin bottom-left, leaves top-right edge. Mobile: single column, text → CTA → flyer; decorations smaller or hidden.

- [ ] **Step 1: Implement.** Required structure:

```tsx
<section id="top" aria-labelledby="hero-title" className="relative scroll-mt-32 overflow-hidden ...">
  <h1 id="hero-title" className="font-display ...">
    <span className="block text-orange-bright">{hero.titleTop}</span>
    <span className="block text-brown-dark">{hero.titleBottom}</span>
  </h1>
  <p className="...">{hero.subtitle}</p>
  <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
     className="inline-flex min-h-14 items-center rounded-full bg-brown-dark px-8 text-xl font-semibold text-cream shadow-lg hover:brightness-110 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-orange-bright lg:min-h-[94px] lg:px-12 lg:text-3xl">
    {hero.cta}
  </a>
  <img src="/images/flyer.webp" width={611} height={791} fetchPriority="high"
       alt="Pumpkin Playground flyer: a chance to create and showcase a project of your interest. Submissions due Thursday November 5th, 11:59 PM on Devpost."
       className="h-auto w-full max-w-[611px] shadow-xl" />
  <img src="/images/pumpkin.webp" alt="" aria-hidden="true" ... />
  <img src="/images/leaves.webp" alt="" aria-hidden="true" ... />
</section>
```

- [ ] **Step 2: Verify** at 375×667 (DevTools device toolbar): CTA fully visible without scrolling. At 1440: side-by-side matches Figma `1:3` screenshot.

- [ ] **Step 3: Commit** `git add src/components/Hero.tsx src/App.tsx && git commit -m "feat: add hero section with sign-up CTA"`

**Acceptance criteria:**
- **F5.1** Exactly one `<h1>` on the page (the hero title).
- **F5.2** CTA is an `<a>` to `SIGNUP_URL` (the Google Form above, exact string), `target="_blank"`, `rel="noopener noreferrer"`, label "Join the Playground", height ≥ 48 px at all widths.
- **F5.3** CTA fully in viewport without scrolling at 375×667, 768×1024, 1440×900.
- **F5.4** CTA is the largest interactive element on the page and has a visible hover and focus-visible state.
- **F5.5** Flyer has descriptive alt incl. date and Devpost; decorations `alt=""` + `aria-hidden`.
- **F5.6** Desktop 1440 layout visually matches Figma `1:3` (two columns, title colors, CTA shape, flyer right).

---

### Task F6: About + Project Inspiration

**Files:** Create `src/components/About.tsx`, `src/components/Inspiration.tsx`

**Consumes:** `about`, `visibleCards`, `inspiration`, `NumberBadge`.

**Design:** About `7:38`: `<h2>` "About" display font orange, intro paragraph (max-w ~752 px), then cards (fill `card` token, rounded, `NumberBadge`, title, body) — `lg:grid-cols-3`, mobile 1 col. Inspiration `8:102`: `<h2>` "Project Inspiration", paragraph max-w ~1246 px. Decorations per Figma, `alt=""`.

- [ ] **Step 1: Implement.** About: `<section id="about" aria-labelledby="about-title" className="scroll-mt-32 ...">`; render the card grid only when `visibleCards.length > 0`; badge number = index in `visibleCards` + 1. Inspiration: `<section id="inspiration" aria-labelledby="inspiration-title" className="scroll-mt-32 ...">`.
- [ ] **Step 2: Verify** with current content: About shows heading + intro, **no cards, no empty grid gap**. Temporarily fill one card body → one card "01" renders → revert.
- [ ] **Step 3: Commit** `git add src/components/About.tsx src/components/Inspiration.tsx src/App.tsx && git commit -m "feat: add About and Project Inspiration sections"`

**Acceptance criteria:**
- **F6.1** Both sections are `<section>` with `id` (`about`, `inspiration`), `aria-labelledby` → their `<h2>`.
- **F6.2** Cards with empty body are not rendered; zero visible cards → no grid container in DOM.
- **F6.3** Cards: 3 columns at ≥ 1024 px, 1 column at < 768 px, no text overflow at 768 px.
- **F6.4** Copy matches spec §6 verbatim; desktop matches Figma `7:38` / `8:102` (heading color/font, paragraph width).

---

### Task F7: Schedule + FAQ

**Files:** Create `src/components/Schedule.tsx`, `src/components/Faq.tsx`

**Consumes:** `schedule`, `visibleFaq`, `NumberBadge`.

**Design:** Schedule `8:133`: `<h2>` "Schedule"; `<ol>` of 4 rows (card fill, rounded, shadow, max-w ~950 px), each: `NumberBadge n={i+1}`, bold title, body. FAQ `8:164`: desktop `lg:grid-cols-[auto_1fr]` heading left, list right (rows ~1000 px wide); mobile stacked.

- [ ] **Step 1: Schedule** — `<section id="schedule" aria-labelledby="schedule-title">`, `<ol>`; badges 01–04.
- [ ] **Step 2: FAQ** — return `null` when `visibleFaq.length === 0`. Otherwise:

```tsx
import { useState } from 'react'
import { visibleFaq } from '../content'
import NumberBadge from './NumberBadge'

export default function Faq() {
  const [open, setOpen] = useState<Set<number>>(new Set())
  if (visibleFaq.length === 0) return null
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-32 ...">
      <h2 id="faq-title" className="font-display ...">FAQ</h2>
      <ul className="...">
        {visibleFaq.map((f, i) => (
          <li key={f.question} className="rounded-2xl bg-card ...">
            <h3>
              <button type="button" aria-expanded={open.has(i)} aria-controls={`faq-a-${i}`}
                      onClick={() => toggle(i)} className="flex w-full items-center gap-6 p-5 text-left ...">
                <NumberBadge n={i + 1} />
                <span>{f.question}</span>
              </button>
            </h3>
            <div id={`faq-a-${i}`} hidden={!open.has(i)} className="px-5 pb-5 ...">{f.answer}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

Note: the hook runs before the early return — keep `useState` above `if (...) return null` (rules-of-hooks; lint enforces it).

- [ ] **Step 3: Verify** — Schedule shows 4 rows numbered 01–04 with spec copy. FAQ absent from DOM and nav. Temporarily fill one FAQ → nav "FAQ" appears, Enter/Space toggles answer, `aria-expanded` flips → revert.
- [ ] **Step 4: Commit** `git add src/components/Schedule.tsx src/components/Faq.tsx src/App.tsx && git commit -m "feat: add Schedule and FAQ sections"`

**Acceptance criteria:**
- **F7.1** Schedule renders 4 items in an `<ol>`, badges `01`–`04`, item 02 body exactly "Submissions due Thursday, Nov. 5th at 11:59 PM on Devpost."
- **F7.2** Schedule desktop matches Figma `8:133`; mobile rows wrap text without overflow at 320 px.
- **F7.3** With all FAQ empty: no `#faq` element, no FAQ nav link (desktop and mobile menu).
- **F7.4** With ≥ 1 filled FAQ: each question is a `<button>` with `aria-expanded`/`aria-controls`; Enter and Space toggle; multiple can be open; layout matches Figma `8:164` at desktop.

---

### Task F8: Footer + page meta + favicon

**Files:** Create `src/components/Footer.tsx`; Modify `index.html`; Create `public/favicon.svg` (or `.png`) from the pumpkin icon.

**Consumes:** `visibleFooterLinks`, `ACM_URL`.

**Design:** Figma `8:208`: full-width brown-dark bar ~193 px tall; left: pumpkin icon + wordmark, "by", ACM logo; then links (cream text). Mobile: stacked, centered.

- [ ] **Step 1: Footer** — `<footer>`; ACM logo `<img alt="ACM at CSULB">` wrapped in `<a href={ACM_URL} ...>` **only if** `ACM_URL` is non-empty; links from `visibleFooterLinks` (external → new tab + `rel="noopener noreferrer"`).
- [ ] **Step 2: `index.html` head** (replace Vite defaults):

```html
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pumpkin Playground · ACM at CSULB</title>
  <meta name="description" content="Pumpkin Playground is a month-long, open-ended project sprint hosted by CSULB ACM, encouraging members to build projects of their choice, share their work, and vote on submissions." />
  <meta name="theme-color" content="<cream hex from F2>" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta property="og:title" content="Pumpkin Playground · ACM at CSULB" />
  <meta property="og:description" content="A chance to create and showcase a project of your interest! Submissions due Thursday, Nov. 5th at 11:59 PM on Devpost." />
  <meta property="og:image" content="/images/og.png" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <!-- font links from F2 -->
</head>
```

(`og:description` uses flyer copy — real event copy, not invented. After D5 gives the production URL, devops/frontend makes `og:image` absolute.)

- [ ] **Step 3: Commit** `git add src/components/Footer.tsx index.html public/favicon.* src/App.tsx && git commit -m "feat: add footer, page meta, and favicon"`

**Acceptance criteria:**
- **F8.1** Footer shows Devpost link only (Instagram/Discord/LinkedIn hidden while URLs empty); label spelled "Instagram" if/when shown.
- **F8.2** ACM logo has alt "ACM at CSULB"; it is not a link while `ACM_URL` is empty.
- **F8.3** `<html lang="en">`, `<title>` = "Pumpkin Playground · ACM at CSULB", meta description present, favicon is the pumpkin, OG tags present.
- **F8.4** Footer desktop matches Figma `8:208`; mobile stacks without overflow at 320 px.

---

### Task F9: Responsive, a11y, perf pass

**Files:** any component/CSS from F4–F8.

- [ ] **Step 1: Width sweep** at 320, 375, 768, 1024, 1440 (DevTools): no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`), decorations never overlap text.
- [ ] **Step 2: Contrast.** Run `npm run build && npm run preview` then `npx lighthouse http://localhost:4173 --only-categories=accessibility --view`. For any `color-contrast` failure, switch that text's color to the nearest palette token that passes (spec §7); do not change non-text decoration colors. Re-run until 0 contrast failures. List every color swap in the commit message.
- [ ] **Step 3: Keyboard.** Tab through the whole page: every link/button reachable in visual order with a visible focus ring (add `focus-visible:outline` classes where missing).
- [ ] **Step 4: Perf.** `npx lighthouse http://localhost:4173 --form-factor=mobile --view` → Performance ≥ 90. Levers: flyer `fetchPriority="high"` + explicit width/height, `loading="lazy"` on all below-fold images, only used font weights.
- [ ] **Step 5: Final checks** `npm run lint && npm run typecheck && npm run build`.
- [ ] **Step 6: Commit** `git add src src/index.css index.html public && git commit -m "fix: responsive, contrast, and performance pass"` then `hc send lead-engineer "F1–F9 done on local main @ <sha>; ready for D4 push"`.

**Acceptance criteria:**
- **F9.1** No horizontal scroll at 320 / 375 / 768 / 1024 / 1440 px.
- **F9.2** Local Lighthouse (mobile): Accessibility ≥ 95 with 0 `color-contrast` failures; Performance ≥ 90; Best Practices ≥ 95.
- **F9.3** Every interactive element reachable by Tab in visual order with a visible focus indicator.
- **F9.4** All below-fold `<img>` have `loading="lazy"`; every `<img>` has width/height (no CLS > 0.1).
- **F9.5** `npm run lint`, `typecheck`, `build` pass.

---

# Section B — devops (Codex agent)

Rules: you never handle the Vercel token value; the user pastes it into their own terminal. Ask the user (through `lead-engineer`, or directly if they are in your pane) before every `gh secret set`, `git push`, `gh pr merge`, and Vercel setting change.

### Task D1: Vercel project link, preview access, repo secrets

**Files:** none committed (`.vercel/` is gitignored by F1; if F1 isn't done yet, add `.vercel` to `.gitignore` yourself first and tell frontend).

- [ ] **Step 1: User creates the token.** Ask the user to: log in to vercel.com as `sponsorship-9917` → Account Settings → Tokens → Create, scope **ACM-BeachHacks**, expiration ≥ 2026-11-30, name `gh-actions-pumpkin-playground`. User keeps it in their clipboard.

- [ ] **Step 2: User links the project** (CLI is currently logged in as `ben2104`, who is not in the team). User runs in the repo root, pasting the token when prompted (`read -s` keeps it out of history/screen):

```bash
cd /Users/kaydee/Developer/Pumpkin-Playground-Website
read -rs VT && vercel link --yes --scope acm-beach-hacks --project pumpkin-playground --token "$VT"
cat .vercel/project.json   # → {"projectId":"prj_…","orgId":"team_…",…}
```

If the project does not exist, `vercel link` creates it. Confirm `orgId` = `team_QSOsa5Izvmxpjjc7Rg5zAkgs`; if different, the screenshot transcription was wrong — trust `project.json`.

- [ ] **Step 3: Disable the Vercel Git connection and preview auth (user yes).** In Vercel → project `pumpkin-playground` → Settings: (a) Git: ensure no repository is connected (avoids double deploys); (b) Deployment Protection → Vercel Authentication → **Disabled** (otherwise preview URLs require a Vercel login and QA/Lighthouse cannot load them; site content is public anyway).

- [ ] **Step 4: Set repo secrets (user yes).** Same shell (still has `$VT`):

```bash
R=WinstonTa/Pumpkin-Playground-Website
printf %s "$VT" | gh secret set VERCEL_TOKEN -R "$R"
gh secret set VERCEL_ORG_ID     -R "$R" --body "$(jq -r .orgId .vercel/project.json)"
gh secret set VERCEL_PROJECT_ID -R "$R" --body "$(jq -r .projectId .vercel/project.json)"
unset VT
gh secret list -R "$R"
```

If the first `gh secret set` returns 403/404: **stop**, report blocker to lead-engineer ("collaborator cannot write secrets on personal repo; options: fork under user's account, or owner sets secrets") — do not attempt workarounds.

**Acceptance criteria:**
- **D1.1** `gh secret list -R WinstonTa/Pumpkin-Playground-Website` lists `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- **D1.2** `.vercel/project.json` exists locally, `orgId` starts with `team_` and is the ACM-BeachHacks team; `git status` does not show `.vercel/`.
- **D1.3** Vercel project `pumpkin-playground` exists in team `acm-beach-hacks`, has no Git repo connected, Vercel Authentication disabled.
- **D1.4** The token value never appears in any commit, file, shell history, or agent transcript.

---

### Task D2: CI + deploy workflow

**Files:** Create `.github/workflows/ci.yml`

**Consumes:** F1 scripts `lint`, `typecheck`, `build`; `.nvmrc`; D1 secrets.

- [ ] **Step 1: Pin the Vercel CLI version:** `npm view vercel version` → use that exact version as `VERCEL_CLI` below.

- [ ] **Step 2: Write `.github/workflows/ci.yml`:**

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  VERCEL_CLI: "<exact version from Step 1>"

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build

  deploy-preview:
    needs: check
    # Fork PRs have no secrets: skip instead of failing.
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
      - run: npm i -g vercel@${{ env.VERCEL_CLI }}
      - run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - id: deploy
        run: echo "url=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})" >> "$GITHUB_OUTPUT"
      - name: Comment preview URL
        env:
          GH_TOKEN: ${{ github.token }}
          URL: ${{ steps.deploy.outputs.url }}
          PR: ${{ github.event.pull_request.number }}
        run: |
          BODY="Preview: $URL (commit ${GITHUB_SHA::7})"
          gh pr comment "$PR" -R "$GITHUB_REPOSITORY" --edit-last --body "$BODY" \
            || gh pr comment "$PR" -R "$GITHUB_REPOSITORY" --body "$BODY"

  deploy-production:
    needs: check
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
      - run: npm i -g vercel@${{ env.VERCEL_CLI }}
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

- [ ] **Step 3: Validate locally** — `npx --yes actionlint .github/workflows/ci.yml` (or `docker run --rm -v "$PWD":/repo -w /repo rhysd/actionlint`) → no errors. Dry-run the deploy commands locally with the user's linked project: `vercel build` succeeds and produces `.vercel/output/` (do not deploy).

- [ ] **Step 4: Commit** `git add .github/workflows/ci.yml && git commit -m "ci: add checks and Vercel preview/production deploy"`

**Acceptance criteria:**
- **D2.1** Workflow triggers on `pull_request` → `main` and `push` → `main`.
- **D2.2** `check` job runs, in order: `npm ci`, `lint`, `typecheck`, `build`; both deploy jobs `needs: check`.
- **D2.3** Preview job runs only for same-repo PRs; production job only on push to `main`; production uses `--prod`, preview does not.
- **D2.4** Preview job posts/updates a PR comment containing the preview URL.
- **D2.5** Token referenced only as `${{ secrets.VERCEL_TOKEN }}`; actionlint clean; Vercel CLI version pinned.

---

### Task D3: Pipeline smoke — push branch, open PR, prove preview (user yes)

Shared checkout stays on `main`; push local `main` to a remote branch without switching:

- [ ] **Step 1 (user yes):**

```bash
git push origin HEAD:refs/heads/site-v1
gh pr create -R WinstonTa/Pumpkin-Playground-Website --base main --head site-v1 \
  --title "Pumpkin Playground site" \
  --body "Event site + CI/CD per docs/superpowers/specs/2026-10-27-pumpkin-playground-design.md. Do not merge until QA passes."
```

- [ ] **Step 2:** `gh pr checks site-v1 -R WinstonTa/Pumpkin-Playground-Website --watch` → `check` and `deploy-preview` green. Open the preview URL from the PR comment in a private window (no Vercel login) → page loads.
- [ ] **Step 3:** `hc send lead-engineer "D3 done: PR <url>, preview <url>, checks green"` (or blocker with the failing log excerpt).

**Acceptance criteria:**
- **D3.1** PR `site-v1 → main` exists; `check` job green.
- **D3.2** `deploy-preview` green; PR comment has a `*.vercel.app` URL.
- **D3.3** Preview URL returns HTTP 200 to an anonymous request: `curl -sI <url> | head -1` → `200`.
- **D3.4** `main` on GitHub is unchanged (still `201dbe3`) — no production deploy happened.

### Task D4: Update preview with final frontend (user yes)

- [ ] After F9: `git push origin HEAD:refs/heads/site-v1` → wait for checks → confirm the PR comment URL updated to the new commit → `hc send qa "Preview ready for Q1: <url> (commit <sha>)"` and `hc send lead-engineer "D4 done: <url>"`.

**Acceptance criteria:**
- **D4.1** PR head SHA equals local `main` HEAD; checks green; preview comment references that SHA.

### Task D5: Production (user yes, after Q1 PASS)

- [ ] **Step 1 (user yes):** merge with a **merge commit** (not squash — keeps local `main` fast-forwardable):

```bash
gh pr merge site-v1 -R WinstonTa/Pumpkin-Playground-Website --merge --delete-branch
git pull --ff-only origin main
```

- [ ] **Step 2:** `gh run watch -R WinstonTa/Pumpkin-Playground-Website` on the `push` run → `deploy-production` green. Get the production URL: `vercel ls pumpkin-playground --scope acm-beach-hacks --token …` (user) or the run log.
- [ ] **Step 3:** Report to lead + qa: `hc send qa "Production live: <url>, run Q2"`.

**Acceptance criteria:**
- **D5.1** `deploy-production` green on the merge commit; production URL returns 200 anonymously.
- **D5.2** Local `main` == `origin/main` after `--ff-only` pull.

---

# Section C — qa (report-only)

QA changes **no files** (temporary local content edits for F3.2/F6.2/F7.3–4 must be reverted with `git checkout -- src/content.ts` and never committed). Tools: Figma MCP `get_screenshot` (file `GHOGFCB9OK42PCbFbEFkey`) for reference; Chrome/DevTools device toolbar at 375×667 (mobile), 768×1024 (tablet), 1440×900 (desktop); `npx lighthouse`; `curl`; `gh`.

**Report format** (one message to `lead-engineer`, also to the owning worker for FAILs):

```
Q1 <PASS|FAIL> preview=<url> sha=<sha>
<ID> PASS|FAIL — evidence (one line: measured value / screenshot path / command output)
```

Screenshots go in `/tmp/pp-qa/` (not the repo).

### Task Q1: Preview checklist (after D4)

Each row maps 1:1 to a frontend/devops acceptance criterion.

| QA ID | Checks AC | How to verify | Pass when |
|---|---|---|---|
| Q-F1.1 | F1.1 | Fresh clone to `/tmp/pp-qa/clone`, `npm ci && npm run lint && npm run typecheck && npm run build` | all exit 0 |
| Q-F1.2 | F1.2 | inspect `package.json`, `.nvmrc` | scripts + engines + `22` present |
| Q-F1.3 | F1.3 | preview page styled (Tailwind applied) | non-default styling visible |
| Q-F1.4 | F1.4 | `.gitignore`; preview shows no "Hello World" | both true |
| Q-F1.5 | F1.5 | ask devops whether handoff received | yes |
| Q-F2.1 | F2.1 | compare 3 tokens (cream, brown-dark, orange-bright) to Figma node fills via `get_design_context` | exact hex match |
| Q-F2.2 | F2.2 | DevTools Computed font-family on h1 and body vs Figma | same family |
| Q-F2.3 | F2.3 | `ls -l public/images`; DevTools Network image sizes | WebP; flyer ≤ 250 KB; total ≤ 600 KB |
| Q-F2.4 | F2.4 | `grep -rE '#[0-9a-fA-F]{3,6}' src --include=*.tsx` | no matches |
| Q-F3.1 | F3.1 | diff Schedule 02 + Inspiration text on page vs spec §6 | identical |
| Q-F3.2 | F3.2 | locally fill one FAQ, `npm run dev`, check nav + section; revert | appears; disappears after revert |
| Q-F3.3 | F3.3 | `grep` components for string literals that are copy | none (aria/alt allowed) |
| Q-F4.1 | F4.1 | scroll to footer at 3 widths | navbar visible |
| Q-F4.2 | F4.2 | 1440 screenshot vs Figma `6:6` | links + Devpost present, layout matches |
| Q-F4.3 | F4.3 | 375: inspect hamburger attrs before/after click | `aria-expanded` false→true, `aria-controls`, accessible name |
| Q-F4.4 | F4.4 | keyboard: open, focus on first link, Esc → focus on button; outside click closes; link click closes | all 4 behaviors |
| Q-F4.5 | F4.5 | click each nav link | heading fully visible under bar |
| Q-F4.6 | F4.6 | inspect Devpost link | correct href, `_blank`, `noopener noreferrer` |
| Q-F5.1 | F5.1 | `document.querySelectorAll('h1').length` | `1` |
| Q-F5.2 | F5.2 | inspect CTA; measure height at 375/768/1440 | `<a>`, href = Google Form `SIGNUP_URL` (not Devpost), target/rel/label correct, ≥ 48 px |
| Q-F5.3 | F5.3 | load at 375×667, 768×1024, 1440×900 without scrolling | CTA bottom edge ≤ viewport height |
| Q-F5.4 | F5.4 | visual compare with other buttons; hover + Tab focus | largest; hover + focus ring visible |
| Q-F5.5 | F5.5 | inspect image alts | flyer alt has date + Devpost; decorations `alt=""` |
| Q-F5.6 | F5.6 | 1440 screenshot vs Figma `1:3` screenshot side by side | layout, colors, CTA, flyer match (minor spacing ok) |
| Q-F6.1 | F6.1 | inspect sections | `id` + `aria-labelledby` → `<h2>` |
| Q-F6.2 | F6.2 | DOM search for card grid with current content | absent |
| Q-F6.3 | F6.3 | locally fill 3 card bodies, check 1440/375/768; revert | 3 cols / 1 col / no overflow |
| Q-F6.4 | F6.4 | text diff + 1440 screenshot vs Figma `7:38`, `8:102` | match |
| Q-F7.1 | F7.1 | inspect `<ol>`, badges, item 02 text | 4 items, 01–04, exact text |
| Q-F7.2 | F7.2 | 1440 vs Figma `8:133`; 320 px | match; no overflow |
| Q-F7.3 | F7.3 | `document.getElementById('faq')`; nav + mobile menu | null; no FAQ link |
| Q-F7.4 | F7.4 | locally fill 2 FAQs; Enter/Space toggles; both open at once; revert | all true |
| Q-F8.1 | F8.1 | footer links | only Devpost |
| Q-F8.2 | F8.2 | ACM logo | alt "ACM at CSULB", not inside `<a>` |
| Q-F8.3 | F8.3 | view-source of preview | lang, title, description, favicon, OG tags |
| Q-F8.4 | F8.4 | 1440 vs Figma `8:208`; 320 px | match; no overflow |
| Q-F9.1 | F9.1 | at 320/375/768/1024/1440 run `document.documentElement.scrollWidth <= innerWidth` | `true` ×5 |
| Q-F9.2 | F9.2 | `npx lighthouse <preview> --form-factor=mobile --only-categories=performance,accessibility,best-practices --output=json --output-path=/tmp/pp-qa/lh-preview.json` | Perf ≥ 90, A11y ≥ 95 (0 contrast fails), BP ≥ 95 |
| Q-F9.3 | F9.3 | Tab through whole page | visual order, every focus visible |
| Q-F9.4 | F9.4 | inspect `<img>`s; Lighthouse CLS | lazy below fold; width/height set; CLS ≤ 0.1 |
| Q-F9.5 | F9.5 | = Q-D2.2 green run | green |
| Q-D1.1 | D1.1 | `gh secret list -R WinstonTa/Pumpkin-Playground-Website` | 3 names listed |
| Q-D1.2 | D1.2 | `jq .orgId .vercel/project.json`; `git status --short` | `team_…`; `.vercel` not shown |
| Q-D1.3 | D1.3 | ask user/devops for Vercel settings screenshot; anonymous preview load | no Git repo; preview loads without login |
| Q-D1.4 | D1.4 | `git log -p \| grep -iE 'vercel_token\|[A-Za-z0-9]{24}'` review; check repo files | no token value anywhere |
| Q-D2.1 | D2.1 | read `ci.yml` `on:` | PR + push to main |
| Q-D2.2 | D2.2 | read jobs; latest run log | steps in order; deploys `needs: check` |
| Q-D2.3 | D2.3 | read `if:` conditions + `--prod` flags | as specified |
| Q-D2.4 | D2.4 | PR conversation | comment with current preview URL |
| Q-D2.5 | D2.5 | `npx --yes actionlint`; grep for token literal | clean; secrets only via `secrets.` |
| Q-D3.1 | D3.1 | `gh pr view site-v1 -R …` + checks | PR open, `check` green |
| Q-D3.2 | D3.2 | `gh pr checks` + PR comment | preview green, URL present |
| Q-D3.3 | D3.3 | `curl -sI <preview> \| head -1` | `200` |
| Q-D3.4 | D3.4 | `git ls-remote origin main` before D5 | `201dbe3…` |
| Q-D4.1 | D4.1 | PR head SHA vs reported SHA; comment SHA | equal |

**SEO note:** Vercel preview deployments send `X-Robots-Tag: noindex`, so SEO is measured in Q2 on production, not here.

**Acceptance:** Q1 = PASS only if every row passes. Any FAIL → report to lead-engineer + owning worker with evidence; after fixes + D4, re-run only failed rows plus Q-F9.2.

### Task Q2: Production smoke (after D5)

| QA ID | Checks AC | How to verify | Pass when |
|---|---|---|---|
| Q-D5.1 | D5.1 | `gh run list -R …` latest push run; `curl -sI <prod> \| head -1` | `deploy-production` green; `200` |
| Q-D5.2 | D5.2 | `git rev-parse main origin/main` | equal |
| Q-SEO | spec §8 | `npx lighthouse <prod> --form-factor=mobile --only-categories=seo` | SEO ≥ 95 |
| Q-PROD-CTA | F5.2 on prod | click CTA on production at 375 | opens the Google Form (`SIGNUP_URL`) in new tab |
| Q-PROD-SMOKE | F9.2 on prod | Lighthouse perf/a11y/BP on prod | same thresholds as Q-F9.2 |

**Acceptance:** Q2 PASS → `hc send lead-engineer "Q2 PASS, production <url>"`.

---

## Self-review notes (pm)

- Spec coverage: §2 stack → F1; §3/§5 Figma + responsive → F2, F4–F9; §6 content → F3, F8; §7 a11y → F4, F5, F7, F9; §8 gates → D2, F9, Q1, Q2; §9 deploy → D1–D5; hide-empty incl. FAQ-section rule → F3, F6, F7, F8.
- Known risks: (1) `gh secret set` as non-admin collaborator unproven until D1 Step 4; (2) Vercel Hobby plan is for non-commercial use — fine for a student club event; (3) Team ID transcribed from screenshot — D1 Step 2 verifies.
