import { defineNitroConfig } from 'nitropack/config'

/**
 * BUILD_PHASE=nitro is set ONLY when running the standalone Nitro build step.
 * During `vite build`, BUILD_PHASE is NOT set, so the renderer is excluded.
 *
 * Why: The Nitro Vite plugin (nitro/vite) reads this config during `vite build`
 * and crashes with "Cannot create property 'handler' on string" when `renderer`
 * is a string. Excluding it during Vite build prevents the crash.
 *
 * The renderer imports from node_modules/.nitro/vite/services/ssr/index.js —
 * this is where TanStack Start's SSR server entry is written by the Vite build,
 * both locally and on Vercel CI (dist/server/server.js is NOT reliably produced).
 */
const isNitroBuildPhase = process.env.BUILD_PHASE === 'nitro'

export default defineNitroConfig({
  preset: 'vercel',
  compatibilityDate: '2026-07-16',

  ...(isNitroBuildPhase
    ? {
        publicAssets: [
          {
            dir: 'dist/client',
            baseURL: '/',
          },
        ],
        renderer: './server/renderer.mjs',
      }
    : {}),
})
