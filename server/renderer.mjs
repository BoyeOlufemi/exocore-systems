// Nitro renderer adapter for TanStack Start (SSR via Vercel serverless)
//
// Import path: node_modules/.nitro/vite/services/ssr/index.js
// This is where TanStack Start's Vite plugin outputs the compiled SSR server
// entry when the Nitro Vite plugin (preset: 'vercel') intercepts the build.
// Using dist/server/server.js fails on CI because that file is only produced
// locally by older build configs; the current build always writes here instead.
//
// No h3 imports: The top-level h3 package (h3@v6, used by nitro@3/nitro/vite)
// exposes a Node.js entry that does NOT export toWebRequest. Using #imports
// redirects there too. We build a Web Request directly from Node.js instead.
import serverEntry from '../node_modules/.nitro/vite/services/ssr/index.js'

/**
 * Plain async function — Nitro/H3 lazy loader requires typeof === 'function'.
 * Using defineEventHandler() returns an object which fails the type check.
 *
 * @param {import('h3').H3Event} event
 */
export default async function handler(event) {
  const req = event.node.req

  // Build the full URL from the incoming Node.js request
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers['host'] || 'localhost'
  const url = `${proto}://${host}${req.url}`

  // Copy headers
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v)
    } else if (value != null) {
      headers.set(key, value)
    }
  }

  // Only attach body for non-GET/HEAD methods
  let body = null
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = new ReadableStream({
      start(controller) {
        req.on('data', (chunk) => controller.enqueue(chunk))
        req.on('end', () => controller.close())
        req.on('error', (err) => controller.error(err))
      },
    })
  }

  const request = new Request(url, {
    method: req.method || 'GET',
    headers,
    body,
    // @ts-ignore duplex required for streaming bodies
    duplex: body ? 'half' : undefined,
  })

  return await serverEntry.fetch(request)
}
