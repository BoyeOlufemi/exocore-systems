import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// TanStack Start + Tailwind v4.
// Plugin order matters: tanstackStart() MUST come before viteReact().
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    viteReact(),
    tailwindcss(),
  ],
})
