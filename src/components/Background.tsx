import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

// Scroll-driven background: floating geometric particles, warm glow parallax,
// a scroll-progress bar, sticky-header state, and reveal-on-scroll flourishes.
// All client-side; respects prefers-reduced-motion.
export function Background() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Reveal + scroll-linked chrome. Re-runs on route change so freshly mounted
  // .reveal elements get picked up.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hdr = document.getElementById('hdr')
    const prog = document.getElementById('progress')
    const glows = document.getElementById('glows')

    const scanReveal = () => {
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in')
      })
    }
    const onScroll = () => {
      const y = window.pageYOffset || 0
      if (hdr) hdr.classList.toggle('scrolled', y > 24)
      if (prog) {
        const h = document.documentElement.scrollHeight - window.innerHeight
        prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'
      }
      if (glows && !reduce) glows.style.transform = `translateY(${y * -0.06}px)`
      scanReveal()
    }

    if (reduce) {
      document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in'))
    }
    const raf = requestAnimationFrame(() => requestAnimationFrame(scanReveal))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // Particle canvas (mount once).
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = document.getElementById('particles') as HTMLCanvasElement | null
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const COLORS = ['#b59e80', '#7a6855', '#724920', '#bac6da']
    let W = 0, H = 0, DPR = 1, raf = 0
    type P = { x: number; y: number; s: number; vx: number; vy: number; a: number; va: number; sides: number; alpha: number; c: string; par: number }
    let parts: P[] = []
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.width = window.innerWidth * DPR
      H = canvas.height = window.innerHeight * DPR
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    const seed = () => {
      parts = []
      const n = window.innerWidth < 640 ? 18 : 34
      for (let i = 0; i < n; i++)
        parts.push({
          x: Math.random() * W, y: Math.random() * H, s: (Math.random() * 6 + 3) * DPR,
          vx: (Math.random() - 0.5) * 0.14 * DPR, vy: (Math.random() - 0.5) * 0.14 * DPR - 0.05 * DPR,
          a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.006,
          sides: Math.floor(Math.random() * 4) + 3, alpha: Math.random() * 0.16 + 0.05,
          c: COLORS[Math.floor(Math.random() * COLORS.length)], par: Math.random() * 0.06 + 0.02,
        })
    }
    const poly = (p: P) => {
      const sc = window.pageYOffset || 0
      ctx.save()
      ctx.translate(p.x, (((p.y - sc * p.par * DPR) % H) + H) % H)
      ctx.rotate(p.a)
      ctx.globalAlpha = p.alpha
      ctx.strokeStyle = p.c
      ctx.lineWidth = 1 * DPR
      ctx.beginPath()
      for (let k = 0; k < p.sides; k++) {
        const ang = (k / p.sides) * Math.PI * 2
        const px = Math.cos(ang) * p.s, py = Math.sin(ang) * p.s
        k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }
    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.a += p.va
        if (p.x < -20) p.x = W + 20
        if (p.x > W + 20) p.x = -20
        if (p.y < -20) p.y = H + 20
        if (p.y > H + 20) p.y = -20
        poly(p)
      }
      if (!reduce && !document.hidden) raf = requestAnimationFrame(frame)
    }
    resize(); seed()
    if (reduce) parts.forEach(poly)
    else frame()
    const onResize = () => { resize(); seed() }
    const onVis = () => { if (!document.hidden && !reduce) { cancelAnimationFrame(raf); frame() } }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <>
      <div id="progress" />
      <div className="bg-glows" id="glows" aria-hidden="true">
        <span className="glow a" />
        <span className="glow b" />
        <span className="glow c" />
        <span className="glow d" />
      </div>
      <canvas id="particles" className="bg-canvas" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
    </>
  )
}
