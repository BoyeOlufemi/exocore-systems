import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

// Custom wrapper to fix Vite 6 compatibility bug in Nitro plugin.
// Nitro's `nitro:init` plugin accesses `this.meta` inside Vite's `config` hook,
// but `this` is `undefined` in Vite 6 because the hook runs before the plugin context is instantiated.
function safeNitro(options?: any) {
  const plugins = nitro(options)
  return plugins.map((p: any) => {
    if (p && p.name === 'nitro:init' && typeof p.config === 'function') {
      const originalConfig = p.config
      p.config = async function (this: any, config: any, configEnv: any) {
        const context = this || { meta: {} }
        return originalConfig.call(context, config, configEnv)
      }
    }
    return p
  })
}

// TanStack Start + Tailwind v4 + Vercel presets
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    safeNitro({
      preset: 'vercel',
    }),
  ],
})
