import { defineNitroConfig } from 'nitropack/config'

/**
 * BUILD_PHASE=nitro is set ONLY when running the standalone Nitro build step.
 * During `vite build`, BUILD_PHASE is NOT set, so the renderer is excluded —
 * this prevents the Nitro Vite plugin from crashing with
 * "Cannot create property 'handler' on string".
 *
 * Static asset strategy:
 *   - Vite writes compiled CSS/JS to .vercel/output/static/assets/
 *   - Nitro standalone build then WIPES .vercel/output/static/ (replaces with public/)
 *   - package.json build script backs up .vercel/output/static/assets before
 *     Nitro runs and restores it after, so both public/ files AND compiled
 *     assets end up in the final .vercel/output/static/
 *
 * Renderer import path:
 *   node_modules/.nitro/vite/services/ssr/index.js is where TanStack Start's
 *   Vite plugin always writes the SSR server entry (both locally and on CI).
 *   dist/server/server.js is NOT reliably produced on fresh CI builds.
 */
const isNitroBuildPhase = process.env.BUILD_PHASE === 'nitro'

export default defineNitroConfig({
  preset: 'vercel',
  compatibilityDate: '2026-07-16',

  ...(isNitroBuildPhase
    ? {
        renderer: './server/renderer.mjs',
      }
    : {}),
})
