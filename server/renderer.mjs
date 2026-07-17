// Nitro renderer adapter for TanStack Start (SSR via Vercel serverless)
//
// Why no h3 imports: The top-level 'h3' package (used by nitro@3 / nitro/vite)
// exposes a different Node.js entry that does NOT export toWebRequest. Importing
// from '#imports' redirects there and causes a Rollup MISSING_EXPORT error.
// Solution: build a Web Request directly from the raw Node.js IncomingMessage.
import serverEntry from '../dist/server/server.js'

/**
 * Nitro renderer — plain async function so Nitro's H3 lazy loader
 * gets typeof === 'function' (required; defineEventHandler objects fail the check).
 *
 * @param {import('h3').H3Event} event
 */
export default async function handler(event) {
  const req = event.node.req
  const res = event.node.res

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
    // @ts-ignore duplex is required for streaming request bodies
    duplex: body ? 'half' : undefined,
  })

  // Call TanStack Start's fetch handler
  const response = await serverEntry.fetch(request)

  return response
}
