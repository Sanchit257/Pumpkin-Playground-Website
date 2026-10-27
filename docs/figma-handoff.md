# Figma handoff — Pumpkin Playground

Source: Figma file `GHOGFCB9OK42PCbFbEFkey`, extracted 2026-10-27 via `get_design_context` (desktop frames are 1440×1024). Every value below is read from Figma; `MISSING` = Figma does not define it. Feeds plan tasks F2, F4–F8.

Reference screenshots (not in repo): `/tmp/pp-figma/{hero-1-3,navbar-6-6,about-7-38,inspiration-8-102,schedule-8-133,faq-8-164,footer-8-195}.png`

## 1. Palette → plan token names (`src/index.css` `@theme`)

Palette frame `1:67` is a single flattened vector (`3:87`); hex read from its SVG fills. No Figma variables/styles exist (`get_variable_defs` → `{}`).

| Token | Hex | Source | Used in designs for |
|---|---|---|---|
| `--color-cream` | `#F6ECDA` | swatch row 1 #1 | page background (all frames) |
| `--color-peach` | `#FFB688` | swatch row 1 #2 | footer wordmark "Pumpkin" |
| `--color-orange-soft` | `#ED9346` | swatch row 1 #3 | not used on frames |
| `--color-orange-burnt` | `#E06C36` | swatch row 1 #4 | not used on frames |
| `--color-rust` | `#A7481C` | swatch row 1 #5 | not used on frames (AA swap target, §6) |
| `--color-orange` | `#FF7D14` | swatch row 2 #1 | not used on frames |
| `--color-orange-bright` | `#FF5B00` | swatch row 2 #2 | section headings, hero/nav "Pumpkin" |
| `--color-brown-dark` | `#7C3C1A` | swatch row 2 #3 | body text, nav links, CTA fill, footer bar, badge ring, nav divider |
| `--color-card` | `#E6BA9E` | node `8:82` (not in palette) | About / Schedule / FAQ card fill |

Also used, outside palette: `#FFFFFF` (navbar pill fill, CTA label, footer text).

## 2. Typography

Both fonts on Google Fonts. Load only: `Miltonian+Tattoo` (400) and `Josefin+Sans:wght@400;700`, `&display=swap`.

- `--font-display: "Miltonian Tattoo", serif;` — weight 400 only
- `--font-body: "Josefin Sans", sans-serif;` — weights 400, 700

Line-height: Figma uses `normal` for every text node (no explicit value) → use `leading-normal` / browser default. Letter-spacing: none set.

| Style | Font | Weight | Size (desktop) | Color | Nodes |
|---|---|---|---|---|---|
| Hero title "Pumpkin" / "Playground" | display | 400 | 110px | orange-bright / brown-dark | `7:31` |
| Section heading (About, Project Inspiration, Schedule, FAQ) | display | 400 | 110px | orange-bright | `8:80`, `12:4`, `12:7`, `8:175` |
| Hero subtitle | body | 400 | 40px | brown-dark | `7:34` |
| CTA label | body | 700 | 32px | white | `7:37` |
| Section intro / Inspiration paragraph | body | 400 | 40px | brown-dark | `8:81`, `12:5` |
| Card title (About cards, Schedule title, FAQ question) | body | 400 | 40px | brown-dark | `8:88`, `12:14`, `8:182` |
| Card body (About) | body | 400 | 24px | brown-dark | `8:87` |
| Schedule body | body | 400 | 32px | brown-dark | `12:14` 2nd line |
| Number badge "01" | display | 400 | 32px | brown-dark | `8:86` |
| Nav wordmark "Pumpkin" | display | 400 | 32px | orange-bright | `4:90` |
| Nav wordmark "Playground" | body | 400 | 24px | brown-dark | `4:90` |
| Nav links + "Devpost" | body | 700 | 24px | brown-dark | `6:5`, `8:265` |
| Footer wordmark "Pumpkin" | display | 400 | 32px | peach | `8:258` |
| Footer wordmark "Playground", "by", links | body | 400 | 24px | white | `8:258`, `8:260`–`8:264` |

Mobile/tablet sizes: `MISSING` (mobile frame `1:5` is empty) — scale per spec §5.

## 3. Components: spacing, radii, shadows

| Element | Size | Radius | Shadow | Notes |
|---|---|---|---|---|
| Navbar pill `3:85` | 1377×100, left 31, top 37 | 50px (full) | `0 10px 8px 0 rgba(0,0,0,.25)` | fill white; icon 47×47 at x+31; wordmark x+91; divider x+249 |
| Nav divider `6:16` | 3px wide × 51px tall | — | — | brown-dark line → CSS `border-l-[3px]`, not an image |
| Nav links | About / Project Inspiration (wraps to 2 lines, box 199px) / Schedule / FAQ, centers ~190px apart | — | — | Devpost right-aligned, center x≈1296 |
| CTA `7:36` | 380×94 | 50px (full) | `4px 8px 4.9px 0 rgba(0,0,0,.25)` | fill brown-dark, label centered |
| Flyer `1:69` | 611×791 | 0 | `7px 14px 8px 1px rgba(0,0,0,.25)` | |
| About card `8:82` | 438×359, gap 31px, row starts x=31 | 10px | none | badge at (23,20); title top 115, left 33; body top 172, width 371 |
| Schedule row `12:11` | 950×126, rows 30px apart (top 344/500/656/818) | 10px | `9px 13px 10px 0 rgba(0,0,0,.25)` | badge (23,20); text left 122, top 33 |
| FAQ row `8:178` | 1000×115, rows 17px apart (step 132) | 10px | none | starts x=380 (heading left col); badge (23,20); question left 150 |
| Number badge `8:85` | 77×77 circle | full | — | 4px brown-dark stroke → CSS `rounded-full border-4`, not an image |
| Footer bar `8:209` | full width × 193 | 0 | none | fill brown-dark |

Spacing system / grid / auto-layout: `MISSING` (all frames use absolute positioning). Page side gutter on desktop: 62px (text left edge x=62).

## 4. Section layout notes (desktop 1440)

- **Hero `1:3`:** left column x=62: title top 209 (two lines), subtitle top 503, CTA top 583. Right: flyer x=756 top 178. Decor: leaves `13:45` 167px rotated −92° at right edge top 172 (partly off-canvas); pumpkin `13:36` 229px rotated 7.5° bottom-left, partly off-canvas (left −43).
- **About `7:38`:** heading top 213; intro top 344, width 752; 3 cards top 630. Decor: pumpkin top-right (186px, −14°), leaves left edge (110px) at top 540.
- **Inspiration `8:102`:** heading top 213 (single line, 110px); paragraph top 362, width 1246. Decor: leaves top-right (172px, −102°), pumpkin bottom-left (240px, 10°).
- **Schedule `8:133`:** heading top 213; 4 rows, left 62, width 950. Decor: pumpkin bottom-right (217px, −14°), leaves bottom-right (130px).
- **FAQ `8:164`:** heading left column (x=62, top 213); 5 rows right column x=380, top 227. Decor: pumpkin bottom-left (186px, 7°).
- **Footer `8:208`:** bar 193 tall. Row centered vertically: light pumpkin icon x=30, wordmark x=90, "by" x=254, ACM logo 93×93 x=298, then links Devpost x=473, Instagram 600, Discord 758, LinkedIn 877 (≈30–40px gaps).

## 5. Assets (exported, committed)

| Figma node | Name in Figma | File | Format / size |
|---|---|---|---|
| `1:69` | flyer | `public/images/flyer.webp` | WebP 1222×1581 (@2x of 611×791), 72 KB |
| `13:36` (also `13:38`–`13:40`, `14:46`) | pumpkin1 | `public/images/pumpkin.webp` | WebP 512×512, 12 KB |
| `13:45` (also `13:41`, `13:42`, `13:44`) | dryleaves | `public/images/leaves.webp` | WebP 512×512, 14 KB |
| `4:89` | pumpkin_nav_icon (black line) | `public/images/pumpkin-icon.webp` | WebP 512×512, 10 KB — Figma fill is raster PNG, no vector exists, so no SVG |
| `8:257` | pumpkin_nav_icon (light, footer) | `public/images/pumpkin-icon-light.webp` | WebP 512×512, 13 KB |
| `8:252` | ACM_logo | `public/images/acm-logo.webp` | WebP 482×481, 11 KB |
| `1:69` | flyer → OG | `public/images/og.png` | PNG 1200×630 (flyer fit to height, padded `#F6ECDA`), 220 KB |
| `4:89` | favicon | `public/favicon.png` | PNG 64×64, 3 KB (replaces Vite `favicon.svg` in F8) |
| `6:16` | Line 1 | — | not exported: CSS border |
| `8:85` etc. | Ellipse 1 | — | not exported: CSS circle border |

Total `public/images` ≈ 360 KB (≤ 600 KB).

## 6. Contrast (WCAG AA) — computed from the hex above

| Pair | Ratio | Verdict |
|---|---|---|
| orange-bright `#FF5B00` on cream (headings, hero "Pumpkin", 110px) | 2.66 | **FAIL** even large-text 3:1 |
| orange-bright on white (nav "Pumpkin", 32px = large) | 3.11 | pass (large) |
| brown-dark on cream | 7.12 | pass |
| brown-dark on card `#E6BA9E` | 4.72 | pass |
| white on brown-dark (CTA, footer) | 8.34 | pass |
| peach on brown-dark (footer "Pumpkin", 32px) | 4.88 | pass |
| orange-burnt `#E06C36` on cream | 2.82 | fail |
| rust `#A7481C` on cream | 5.00 | pass |

Per spec §7 rule (nearest palette color that passes): orange-bright text on cream → **`rust` #A7481C** is the nearest passing palette color (orange-burnt/orange/orange-soft all fail). Applies to the hero "Pumpkin" and the 4 section headings only; nav "Pumpkin" on white keeps orange-bright.
