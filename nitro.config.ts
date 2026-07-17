import { defineNitroConfig } from 'nitropack/config'

/**
 * BUILD_PHASE=nitro is set ONLY when running the standalone Nitro build step.
 * During `vite build`, BUILD_PHASE is NOT set, so the renderer is excluded.
 *
 * Why: The Nitro Vite plugin (nitro/vite) reads this config during `vite build`
 * and crashes with "Cannot create property 'handler' on string" when `renderer`
 * is a string. Excluding it during Vite build prevents the crash.
 */
const isNitroBuildPhase = process.env.BUILD_PHASE === 'nitro'

export default defineNitroConfig({
  preset: 'vercel',
  compatibilityDate: '2026-07-16',

  // Only copy compiled client assets during the standalone Nitro build.
  // During vite build, the Nitro Vite plugin places assets in .vercel/output/static automatically.
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
