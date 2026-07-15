# ExoCore Systems

Production site for **ExoCore Systems** / Boye&rsquo; Olufemi (Operational Architect), built with **TanStack Start** (React) + **Tailwind CSS v4**. Ported from the static prototype into real routes, `/public` WebP assets, and n8n-wired forms.

## Stack
- **TanStack Start** (SSR) + **TanStack Router** (file-based routing)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Vite 6**, **React 19**, **TypeScript**
- **Deploy:** Vercel

## Routes
- `/` — the hub: hero, the Functional Nucleus (Engine / Shield / Catalyst), the two tracks, selected work, about, contact.
- `/contractors` — **Track A** landing page (Home Services AI Employee). Off the main nav; send the link directly.
- `/agri` — **Track B** landing page (Internal Ops Platform for agri-procurement). Off the main nav.

## Getting started
```bash
npm install
npm run dev        # http://localhost:3000
```
The TanStack Router plugin generates `src/routeTree.gen.ts` automatically on first `dev`/`build`, so it is gitignored.

## Build & deploy
```bash
npm run build
```
On **Vercel**, import the repo — TanStack Start (Nitro) is auto-detected. Build command is `vite build`.

## Forms → n8n
The intake forms POST JSON to the webhook in `VITE_N8N_WEBHOOK_URL`. Copy `.env.example` to `.env` and set it, and add the same variable in Vercel (Project → Settings → Environment Variables). If it is unset, the forms still show a confirmation and simply do not post.

## Project structure
```
public/                favicon.svg + hero/mudcloth/medallion/headshot .webp
src/
  routes/
    __root.tsx         document shell: head, meta, fonts, favicon, layout
    index.tsx          hub
    contractors.tsx    Track A
    agri.tsx           Track B
  components/
    Mark.tsx           reusable "EC" Woven Coin mark
    Background.tsx     particles + glow parallax + scroll reveals
    Header.tsx         route-aware nav
    Footer.tsx
    IntakeForm.tsx     reusable form that posts to n8n
  styles/app.css       Tailwind v4 import, @theme tokens, full design system
  router.tsx
vite.config.ts         tanstackStart() before viteReact(), + tailwindcss()
```

## Design notes
- Aesthetic: "Nocturnal Bohemian Modernism" — warm-dark `#1f1a16`, cool `#bac6da` text, earthen accents (`#7a6855`, `#b59e80`, `#724920`).
- Reveal animations are gated behind an `html.js` class, so content is fully visible even if JavaScript fails to load.
- All motion respects `prefers-reduced-motion`.

---
© 2026 ExoCore Systems · ExoCoreSystems.com
