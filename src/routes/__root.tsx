/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import appCss from '../styles/app.css?url'
import { Background } from '../components/Background'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: "ExoCore Systems | Boye' Olufemi" },
      {
        name: 'description',
        content:
          'ExoCore Systems builds custom automation and internal operations platforms that clear the busywork out of a business, so teams get hours back every week.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        {/* Enable reveal animations only when JS is available; content stays visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <HeadContent />
      </head>
      <body>
        <Background />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
