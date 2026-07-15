# ExoCore Systems

Personal site for **Boye' Olufemi** — Operational Architect | Business Process Optimization & Intelligent Workflow Systems.

Automation studio that clears the busywork out of a business. Live prototype, "Nocturnal Bohemian Modernism" aesthetic.

## What's here

`index.html` — a self-contained static prototype of the full site. No build step, no dependencies. Open it in a browser or drop it on any static host.

It uses hash-based routing for three views:

- `#/` — **Hub** (homepage): hero, Functional Nucleus (Engine · Shield · Catalyst), the two ExoCore tracks, selected work, about, contact.
- `#/contractors` — **Track A** landing page (Home Services AI Employee). Off the main menu; sent via outreach.
- `#/agri` — **Track B** landing page (Internal Ops Platform for agri-procurement). Off the main menu.

Everything is inline: fonts (Google Fonts), the Afro-Bohemian hero art and textures (optimized JPEG data-URIs), the "EC" Woven Coin logo + SVG favicon, the canvas particle/glow motion layer, and the scroll-reveal flourishes. Motion respects `prefers-reduced-motion`.

## Interactions

- **Primary CTAs** scroll to the on-page intake forms (lead capture first).
- **Booking** is a secondary option in the contact area → `https://cal.com/boye-exocoresystems/30min`.
- **Forms** are prototype-only here; in production they post to an n8n intake webhook.

## Deploy

Any static host works:

- **Vercel** — import the repo, framework preset "Other", output = repo root.
- **GitHub Pages** — Settings → Pages → deploy from `main` / root.
- **Netlify / Cloudflare Pages** — drag-and-drop or connect the repo.

## Roadmap

Planned production build: port to **TanStack Start + Tailwind v4** with real `/contractors` and `/agri` routes, art moved to `/public` as WebP, a reusable `<Mark />` component, form actions wired to n8n, and Vercel config.

---

© 2026 ExoCore Systems · ExoCoreSystems.com
