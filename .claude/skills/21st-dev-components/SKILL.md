---
name: 21st-dev-components
description: Add or replace a UI component in this portfolio using a component from 21st.dev (the shadcn-compatible community registry), adapted to the site's minimal design and colour tokens. Use when asked to "use a 21st.dev component", "add a component from 21st", or to upgrade a section (hero, projects, testimonials, contact, FAQ) with a ready-made component.
---

# 21st.dev components for this portfolio

21st.dev hosts React + Tailwind components that install through the shadcn CLI.
This repo is already shadcn-ready (`components.json`, alias `@/components/ui`, utils at `@/lib/utils`).

## 1. Find and install

1. Pick the component on https://21st.dev and open its page. The install command looks like:

   ```bash
   npx shadcn@latest add "https://21st.dev/r/<author>/<component>"
   ```

2. Run it from the repo root. Files land in `src/components/ui/`.
   - If the network blocks `21st.dev`, the host must be allowed in the session's network settings first. Don't hand-copy code from memory.
3. Install any npm dependencies the CLI asks for, then run `npm run lint` (tsc).

## 2. Adapt it to this site (required)

The site has one look. Every imported component must follow it:

- **Colours**: use the CSS variables from `src/index.css`, never raw hex or Tailwind palette colours:
  `--color-page-bg`, `--color-card-bg`, `--color-subtle-bg`, `--color-primary`, `--color-primary-light`,
  `--color-primary-border`, `--color-heading-text`, `--color-body-text`, `--color-border-subtle`.
  Apply them with `style={{ color: 'var(--color-primary)' }}` or `bg-[var(--color-card-bg)]`.
- **Section headings**: use `SectionHeader` from `src/components/ui/SectionHeader.tsx`. No ALL-CAPS eyebrow pills above headings.
- **Spacing**: sections use `py-20 sm:py-24` and `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, with `border-t` in `--color-border-subtle` between sections.
- **Cards**: `rounded-2xl border p-6`, no drop shadows and no gradient washes.
- **Type**: sentence case for buttons, nav and labels. Body text is `text-[15px]` or `text-base`, `leading-relaxed`.
- **Icons**: `lucide-react` v1. It has **no brand icons**; use `GithubIcon` / `LinkedinIcon` from `src/components/ui/BrandIcons.tsx`.
- **Motion**: no auto-scrolling carousels, marquees or hint text like "hover to pause". Only motion in response to a user action. Respect `prefers-reduced-motion`.
- **Copy**: plain and factual. No unverifiable claims ("guaranteed", "60%+ savings"), no "free consultation" sales language.
- **Images**: WebP in `public/`, with `width`/`height`, `loading="lazy"` below the fold and descriptive `alt` text.

## 3. Check before committing

1. `npm run lint && npm run build`
2. Screenshot desktop (1440px) and mobile (390px) with Playwright and check there's no horizontal overflow.
3. If the change touches the FAQ, keep `src/data/faq.ts` and the FAQPage JSON-LD in `index.html` identical. Google requires structured-data FAQs to match visible content.
