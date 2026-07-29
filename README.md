# ExoCore Systems

Personal site for **Boye' Olufemi** — Operational Architect | Business Process Optimization & Intelligent Workflow Systems.

Automation studio and operational-signal prototype for turning unstructured
requests into reviewable business actions.

## What's here

- `index.html` — self-contained ExoCore portfolio and service-site prototype.
- `receiver_api.py` — authenticated inbound-signal receiver.
- `mcp_server.py` — MCP tools for signal review and inventory operations.
- `exocore_storage.py` — locked, atomic prototype persistence.
- `siblings/prepflow-os/` — PrepFlow operational workflow demonstration.

The website and PrepFlow are separate prototypes in one repository. The website
communicates the studio offer; PrepFlow demonstrates the underlying pattern:

`unstructured request → structured signal → resource check → human decision → recorded action`

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

## Run the PrepFlow prototype

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
python receiver_api.py
```

Set a strong `EXOCORE_RECEIVER_TOKEN` and send it as a bearer token. The receiver
rejects oversized, unauthenticated, empty, and unsupported requests. Pending
signals are written atomically, and inventory deductions reject non-positive or
insufficient quantities instead of silently reducing inventory to zero.

Run the storage regression suite with:

```bash
python -m unittest discover -s tests -v
```

## Evidence and production boundary

This repository demonstrates portfolio presentation, AI-assisted signal
extraction, an MCP interface, and guarded local persistence. It is not a
multi-tenant production operations platform. Flat files remain appropriate only
for the local prototype; production work requires authenticated identities,
database transactions, idempotent events, audit records, monitoring, and
explicit human approval for consequential actions.

## Roadmap

Planned production build: port to **TanStack Start + Tailwind v4** with real `/contractors` and `/agri` routes, art moved to `/public` as WebP, a reusable `<Mark />` component, form actions wired to n8n, and Vercel config.

---

© 2026 ExoCore Systems · ExoCoreSystems.com
